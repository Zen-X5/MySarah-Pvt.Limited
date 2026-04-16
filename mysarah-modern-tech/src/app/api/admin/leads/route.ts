import { NextResponse } from "next/server";
import { getLeads } from "@/lib/lead-service";
import { getAdminSession } from "@/lib/auth";
import { rejectUntrustedOrigin } from "@/lib/security";
import { jsonNoStore } from "@/lib/api";

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
    const leads = await getLeads();
    return jsonNoStore({ ok: true, data: leads });
  } catch {
    return jsonNoStore({ error: "Unable to load leads." }, 500);
  }
}
