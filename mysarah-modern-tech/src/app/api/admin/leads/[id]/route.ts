import { NextResponse } from "next/server";
import { deleteLead, updateLeadProgress } from "@/lib/lead-service";
import { getAdminSession } from "@/lib/auth";
import { formatZodErrors, updateLeadStatusSchema } from "@/lib/validation";
import { rejectCrossSiteRequest } from "@/lib/security";
import { jsonNoStore, parseJsonRequest } from "@/lib/api";

export const runtime = "nodejs";

interface LeadParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: LeadParams) {
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
    const parsedBody = await parseJsonRequest<unknown>(request);
    if (!parsedBody.ok) {
      return parsedBody.response;
    }

    const body = parsedBody.data;
    const parsed = updateLeadStatusSchema.safeParse(body);

    if (!parsed.success) {
      const validation = formatZodErrors(parsed.error);
      return jsonNoStore(
        { error: validation.message, fieldErrors: validation.fieldErrors },
        400,
      );
    }

    const { id } = await params;
    const result = await updateLeadProgress(id, parsed.data);
    if (!result) {
      return jsonNoStore({ error: "Lead not found." }, 404);
    }

    return jsonNoStore({ ok: true, data: result });
  } catch {
    return jsonNoStore({ error: "Unable to update lead." }, 500);
  }
}

export async function DELETE(request: Request, { params }: LeadParams) {
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
    const result = await deleteLead(id);

    if (!result) {
      return jsonNoStore({ error: "Lead not found." }, 404);
    }

    return jsonNoStore({ ok: true });
  } catch {
    return jsonNoStore({ error: "Unable to delete lead." }, 500);
  }
}
