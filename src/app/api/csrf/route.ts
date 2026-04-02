import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

export async function GET() {
  const token = randomBytes(32).toString("hex");

  const isProd = process.env.NODE_ENV === "production";

  const response = NextResponse.json({ csrfToken: token });

  // Set CSRF token as HttpOnly SameSite=Strict cookie
  response.cookies.set("csrf-token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  // Also set a session cookie with SameSite=Strict for extra protection
  response.cookies.set("session-active", "1", {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  return response;
}
