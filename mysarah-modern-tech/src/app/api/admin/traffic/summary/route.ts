import { getAdminSession } from "@/lib/auth";
import { jsonNoStore } from "@/lib/api";
import { rejectUntrustedOrigin } from "@/lib/security";
import { getTrafficSummary } from "@/lib/traffic-service";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const blocked = rejectUntrustedOrigin(request);
  if (blocked) {
    blocked.headers.set("Cache-Control", "no-store, max-age=0");
    return blocked;
  }

  const session = await getAdminSession();
  if (!session) {
    return jsonNoStore({ error: "Unauthorized" }, 401);
  }

  try {
    const data = await getTrafficSummary();
    return jsonNoStore({ ok: true, data });
  } catch {
    return jsonNoStore({ error: "Unable to load traffic summary." }, 500);
  }
}
