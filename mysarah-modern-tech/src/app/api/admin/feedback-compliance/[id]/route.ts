import { getAdminSession } from "@/lib/auth";
import { deleteFeedbackComplianceEntry } from "@/lib/feedback-service";
import { jsonNoStore } from "@/lib/api";
import { rejectCrossSiteRequest } from "@/lib/security";

export const runtime = "nodejs";

interface FeedbackParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: Request, { params }: FeedbackParams) {
  const blocked = rejectCrossSiteRequest(request);
  if (blocked) {
    blocked.headers.set("Cache-Control", "no-store, max-age=0");
    return blocked;
  }

  const session = await getAdminSession();

  if (!session) {
    return jsonNoStore({ error: "Unauthorized" }, 401);
  }

  try {
    const { id } = await params;
    const result = await deleteFeedbackComplianceEntry(id);

    if (!result) {
      return jsonNoStore({ error: "Entry not found." }, 404);
    }

    return jsonNoStore({ ok: true });
  } catch {
    return jsonNoStore({ error: "Unable to resolve entry." }, 500);
  }
}
