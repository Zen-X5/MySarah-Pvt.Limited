import { getAdminSession } from "@/lib/auth";
import { getFeedbackComplianceEntries } from "@/lib/feedback-service";
import { jsonNoStore } from "@/lib/api";
import { rejectUntrustedOrigin } from "@/lib/security";

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
    const entries = await getFeedbackComplianceEntries();
    return jsonNoStore({ ok: true, data: entries });
  } catch {
    return jsonNoStore({ error: "Unable to load feedback/compliance entries." }, 500);
  }
}
