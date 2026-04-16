import { rejectCrossSiteRequest } from "@/lib/security";
import { jsonNoStore, parseJsonRequest } from "@/lib/api";
import { recordTrafficEvent } from "@/lib/traffic-service";
import { z } from "zod";

export const runtime = "nodejs";

const trafficEventSchema = z.object({
  sessionId: z.string().trim().min(8).max(80),
  eventType: z.enum(["page_view", "heartbeat"]),
  path: z.string().trim().max(240).optional(),
});

const burstMap = new Map<string, number>();

function shouldDropBurst(sessionId: string, eventType: string) {
  const key = `${sessionId}:${eventType}`;
  const now = Date.now();
  const last = burstMap.get(key) || 0;
  if (now - last < 10_000) {
    return true;
  }
  burstMap.set(key, now);
  return false;
}

export async function POST(request: Request) {
  const blocked = rejectCrossSiteRequest(request);
  if (blocked) {
    blocked.headers.set("Cache-Control", "no-store, max-age=0");
    return blocked;
  }

  try {
    const parsedBody = await parseJsonRequest<unknown>(request);
    if (!parsedBody.ok) {
      return parsedBody.response;
    }

    const parsed = trafficEventSchema.safeParse(parsedBody.data);
    if (!parsed.success) {
      return jsonNoStore({ error: "Invalid traffic payload." }, 400);
    }

    const { sessionId, eventType, path } = parsed.data;

    if (shouldDropBurst(sessionId, eventType)) {
      return jsonNoStore({ ok: true, dropped: true });
    }

    await recordTrafficEvent({
      sessionId,
      eventType,
      path,
      userAgent: request.headers.get("user-agent") || undefined,
    });

    return jsonNoStore({ ok: true });
  } catch {
    return jsonNoStore({ error: "Unable to record traffic event." }, 500);
  }
}
