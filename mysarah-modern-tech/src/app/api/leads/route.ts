import { NextResponse } from "next/server";
import { createLead } from "@/lib/lead-service";
import { sendLeadEmail } from "@/lib/mailer";
import { formatZodErrors, leadSchema } from "@/lib/validation";
import { rejectCrossSiteRequest } from "@/lib/security";
import { API_NO_STORE_HEADERS, jsonNoStore, parseJsonRequest } from "@/lib/api";

export const runtime = "nodejs";

const ipHits = new Map<string, { count: number; time: number }>();

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;
const MAX_JSON_BYTES = 600_000;
const IDEMPOTENCY_TTL_MS = 5 * 60_000;

const idempotencyCache = new Map<string, {
  status: number;
  body: { ok: true; data: { id: string }; warning: string | null };
  expiresAt: number;
}>();

function pruneRateLimitMap(now: number) {
  for (const [ip, value] of ipHits.entries()) {
    if (now - value.time > RATE_LIMIT_WINDOW_MS) {
      ipHits.delete(ip);
    }
  }
}

function pruneIdempotencyCache(now: number) {
  for (const [key, value] of idempotencyCache.entries()) {
    if (value.expiresAt <= now) {
      idempotencyCache.delete(key);
    }
  }
}

function normalizeIdempotencyKey(raw: string | null) {
  const normalized = (raw || "").trim();
  if (!normalized) {
    return null;
  }

  return normalized.slice(0, 120);
}

function isRateLimited(ip: string) {
  const now = Date.now();
  if (ipHits.size > 5000) {
    pruneRateLimitMap(now);
  }

  const existing = ipHits.get(ip);

  if (!existing || now - existing.time > RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, time: now });
    return false;
  }

  existing.count += 1;
  return existing.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const blocked = rejectCrossSiteRequest(request);
  if (blocked) {
    blocked.headers.set("Cache-Control", "no-store, max-age=0");
    return blocked;
  }

  try {
    const now = Date.now();

    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > MAX_JSON_BYTES) {
      return jsonNoStore({ error: "Payload too large." }, 413);
    }

    if (idempotencyCache.size > 5000) {
      pruneIdempotencyCache(now);
    }

    const idempotencyKey = normalizeIdempotencyKey(
      request.headers.get("x-idempotency-key") || request.headers.get("idempotency-key"),
    );

    if (idempotencyKey) {
      const cached = idempotencyCache.get(idempotencyKey);
      if (cached && cached.expiresAt > now) {
        return NextResponse.json(cached.body, {
          status: cached.status,
          headers: {
            ...API_NO_STORE_HEADERS,
            "x-idempotent-replay": "1",
          },
        });
      }
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        {
          status: 429,
          headers: {
            ...API_NO_STORE_HEADERS,
            "Retry-After": "60",
          },
        },
      );
    }

    const parsedBody = await parseJsonRequest<unknown>(request);
    if (!parsedBody.ok) {
      return parsedBody.response;
    }

    const body = parsedBody.data;
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      const validation = formatZodErrors(parsed.error);
      return jsonNoStore(
        { error: validation.message, fieldErrors: validation.fieldErrors },
        400,
      );
    }

    const lead = await createLead(parsed.data);
    let emailWarning: string | null = null;

    // Lead creation is the primary action. Email alerts are best-effort only.
    try {
      await sendLeadEmail(parsed.data);
    } catch (emailError) {
      console.warn("[api/leads] email notification failed", emailError);
      emailWarning = "Lead saved, but email notification failed.";
    }

    const responseBody = { ok: true as const, data: { id: String(lead._id) }, warning: emailWarning };

    if (idempotencyKey) {
      idempotencyCache.set(idempotencyKey, {
        status: 201,
        body: responseBody,
        expiresAt: now + IDEMPOTENCY_TTL_MS,
      });
    }

    return jsonNoStore(responseBody, 201);
  } catch (error) {
    console.error("[api/leads] failed", error);

    const message = process.env.NODE_ENV === "development"
      ? error instanceof Error
        ? error.message
        : "Unknown server error."
      : "Server error.";

    return jsonNoStore({ error: message }, 500);
  }
}
