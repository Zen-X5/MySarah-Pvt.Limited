import { NextResponse } from "next/server";
import { createLead } from "@/lib/lead-service";
import { sendLeadEmail } from "@/lib/mailer";
import { leadSchema } from "@/lib/validation";

const ipHits = new Map<string, { count: number; time: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const existing = ipHits.get(ip);

  if (!existing || now - existing.time > 60_000) {
    ipHits.set(ip, { count: 1, time: now });
    return false;
  }

  existing.count += 1;
  return existing.count > 15;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
    }

    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request data." }, { status: 400 });
    }

    const lead = await createLead(parsed.data);
    await sendLeadEmail(parsed.data);

    return NextResponse.json({ ok: true, data: { id: String(lead._id) } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
