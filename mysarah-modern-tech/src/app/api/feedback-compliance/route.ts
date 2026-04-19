import { createFeedbackCompliance } from "@/lib/feedback-service";
import { feedbackComplianceSchema, formatZodErrors } from "@/lib/validation";
import { jsonNoStore, parseJsonRequest } from "@/lib/api";
import { rejectCrossSiteRequest } from "@/lib/security";

export const runtime = "nodejs";

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

    const parsed = feedbackComplianceSchema.safeParse(parsedBody.data);

    if (!parsed.success) {
      const validation = formatZodErrors(parsed.error);
      return jsonNoStore({ error: validation.message, fieldErrors: validation.fieldErrors }, 400);
    }

    const entry = await createFeedbackCompliance(parsed.data);
    return jsonNoStore({ ok: true, data: { id: String(entry._id) } }, 201);
  } catch {
    return jsonNoStore({ error: "Unable to submit feedback/compliance request." }, 500);
  }
}
