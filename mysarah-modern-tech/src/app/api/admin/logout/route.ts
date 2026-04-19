import { NextResponse } from "next/server";
import { authCookie } from "@/lib/auth";
import { rejectCrossSiteRequest } from "@/lib/security";
import { API_NO_STORE_HEADERS } from "@/lib/api";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const blocked = rejectCrossSiteRequest(request);
  if (blocked) {
    blocked.headers.set("Cache-Control", "no-store, max-age=0");
    return blocked;
  }

  // Use 303 so the browser follows the redirect with GET after a POST logout submit.
  const response = NextResponse.redirect(new URL("/admin/login", request.url), 303);
  response.cookies.set(authCookie.name, "", {
    ...authCookie.options,
    maxAge: 0,
  });
  for (const [header, value] of Object.entries(API_NO_STORE_HEADERS)) {
    response.headers.set(header, value);
  }
  return response;
}
