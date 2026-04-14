import { NextResponse } from "next/server";
import { adminLoginSchema } from "@/lib/validation";
import { authCookie, createAdminToken, verifyAdminCredentials } from "@/lib/auth";
import { clearLoginRateLimit, getClientIp, isLoginRateLimited, rejectCrossSiteRequest } from "@/lib/security";
import { formatZodErrors } from "@/lib/validation";
import { parseJsonRequest } from "@/lib/api";

export async function POST(request: Request) {
  const blocked = rejectCrossSiteRequest(request);
  if (blocked) {
    return blocked;
  }

  try {
    const ip = getClientIp(request);
    if (isLoginRateLimited(ip)) {
      return NextResponse.json({ error: "Too many login attempts. Try again later." }, { status: 429 });
    }

    const parsedBody = await parseJsonRequest<unknown>(request);
    if (!parsedBody.ok) {
      return parsedBody.response;
    }

    const body = parsedBody.data;
    const parsed = adminLoginSchema.safeParse(body);

    if (!parsed.success) {
      const validation = formatZodErrors(parsed.error);
      return NextResponse.json(
        { error: validation.message, fieldErrors: validation.fieldErrors },
        { status: 400 },
      );
    }

    const { username, password } = parsed.data;
    const valid = await verifyAdminCredentials(username, password);

    if (!valid) {
      return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
    }

    clearLoginRateLimit(ip);

    const token = createAdminToken({ username });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(authCookie.name, token, authCookie.options);
    return response;
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
