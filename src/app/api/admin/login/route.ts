import { NextResponse } from "next/server";
import {
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
  verifyAdminCredentials,
  createSessionToken,
  ADMIN_COOKIE_NAME
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    // 1. Rate limiting check
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Please wait ${rateCheck.retryAfterMinutes || 15} minutes before trying again.`
        },
        { status: 429 }
      );
    }

    // 2. Validate input
    const body = await request.json().catch(() => null);
    if (!body || !body.email || !body.password) {
      return NextResponse.json(
        { error: "Email address and password are required." },
        { status: 400 }
      );
    }

    const { email, password } = body;

    // 3. Verify credentials
    const isValid = await verifyAdminCredentials(String(email), String(password));
    if (!isValid) {
      recordFailedAttempt(ip);
      return NextResponse.json(
        { error: "Invalid administrator credentials. Please check your email and password." },
        { status: 401 }
      );
    }

    // 4. Successful authentication - reset rate limit and issue token
    resetRateLimit(ip);
    const token = createSessionToken(email.trim().toLowerCase());

    const response = NextResponse.json(
      {
        success: true,
        message: "Administrator authenticated successfully.",
        redirectUrl: "/admin/dashboard"
      },
      { status: 200 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  } catch (err: any) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
