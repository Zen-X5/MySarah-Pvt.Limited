import { NextResponse } from "next/server";

export const API_NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
  "X-Content-Type-Options": "nosniff",
} as const;

export function jsonNoStore<T>(body: T, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: API_NO_STORE_HEADERS,
  });
}

export async function parseJsonRequest<T>(request: Request) {
  try {
    return { ok: true as const, data: (await request.json()) as T };
  } catch {
    return {
      ok: false as const,
      response: jsonNoStore({ error: "Malformed JSON payload." }, 400),
    };
  }
}