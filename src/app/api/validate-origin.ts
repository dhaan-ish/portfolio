import { NextResponse } from "next/server";

const ALLOWED_ORIGINS =
  process.env.NODE_ENV === "development"
    ? ["http://localhost:3000", "http://localhost:3001"]
    : ["https://dhaan-ish.vercel.app"];

export function validateOrigin(req: Request): NextResponse | null {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  const isAllowed =
    (origin && ALLOWED_ORIGINS.includes(origin)) ||
    (referer && ALLOWED_ORIGINS.some((o) => referer.startsWith(o)));

  if (!isAllowed) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}
