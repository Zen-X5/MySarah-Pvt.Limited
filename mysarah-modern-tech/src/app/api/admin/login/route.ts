import { NextResponse } from "next/server";
import { adminLoginSchema } from "@/lib/validation";
import { authCookie, createAdminToken, verifyAdminCredentials } from "@/lib/auth";
import { clearLoginRateLimit, getClientIp, isLoginRateLimited, rejectCrossSiteRequest } from "@/lib/security";
import { formatZodErrors } from "@/lib/validation";
import { API_NO_STORE_HEADERS, jsonNoStore, parseJsonRequest } from "@/lib/api";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const blocked = rejectCrossSiteRequest(request);
  if (blocked) {
    blocked.headers.set("Cache-Control", "no-store, max-age=0");
    return blocked;
  }

  try {
    const ip = getClientIp(request);
    if (isLoginRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many login attempts. Try again later." },
        {
          status: 429,
          headers: {
            ...API_NO_STORE_HEADERS,
            "Retry-After": "600",
          },
        },
      );
    }

    const parsedBody = await parseJsonRequest<unknown>(request);
    if (!parsedBody.ok) {
      return parsedBody.response;
    }

    const body = parsedBody.data;
    const parsed = adminLoginSchema.safeParse(body);

    if (!parsed.success) {
      const validation = formatZodErrors(parsed.error);
      return jsonNoStore(
        { error: validation.message, fieldErrors: validation.fieldErrors },
        400,
      );
    }

    const { username, password } = parsed.data;
    const valid = await verifyAdminCredentials(username, password);

    if (!valid) {
      return jsonNoStore({ error: "Invalid username or password." }, 401);
    }

    clearLoginRateLimit(ip);

    const token = createAdminToken({ username });
    const response = jsonNoStore({ ok: true });
    response.cookies.set(authCookie.name, token, authCookie.options);
    return response;
  } catch {
    return jsonNoStore({ error: "Server error." }, 500);
  }
}
