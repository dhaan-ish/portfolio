import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ALLOWED_ORIGINS =
  process.env.NODE_ENV === "development"
    ? ["http://localhost:3000", "http://localhost:3001"]
    : ["https://dhaan-ish.vercel.app"];

export async function validateRequest(req: Request): Promise<NextResponse | null> {
  // --- Option 1: Origin check ---
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  const isOriginAllowed =
    (origin && ALLOWED_ORIGINS.includes(origin)) ||
    (referer && ALLOWED_ORIGINS.some((o) => referer.startsWith(o)));

  if (!isOriginAllowed) {
    return NextResponse.json({ error: "Forbidden: invalid origin" }, { status: 403 });
  }

  // --- Option 2: Secret header ---
  const internalKey = req.headers.get("x-internal-key");
  if (internalKey !== process.env.INTERNAL_KEY) {
    return NextResponse.json({ error: "Forbidden: invalid key" }, { status: 403 });
  }

  // --- Option 3: CSRF double-submit + SameSite cookie ---
  const cookieStore = await cookies();
  const csrfCookie = cookieStore.get("csrf-token")?.value;
  const sessionCookie = cookieStore.get("session-active")?.value;
  const csrfHeader = req.headers.get("x-csrf-token");

  if (!sessionCookie) {
    return NextResponse.json({ error: "Forbidden: no session" }, { status: 403 });
  }

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return NextResponse.json({ error: "Forbidden: CSRF mismatch" }, { status: 403 });
  }

  return null;
}
