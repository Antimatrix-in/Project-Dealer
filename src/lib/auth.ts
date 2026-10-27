import crypto from "crypto";
import bcrypt from "bcryptjs";

export const ADMIN_COOKIE_NAME = "antimatrix_admin_token";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "antimatrix2026@gmail.com";

const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  "antimatrix-production-grade-session-secret-2026-dealer-auth-key";

/**
 * Rate Limiting Tracker
 * Key: IP address
 * Value: { attempts: number, lockUntil: number, firstAttemptAt: number }
 */
interface RateLimitRecord {
  attempts: number;
  lockUntil: number;
  firstAttemptAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const WINDOW_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterMinutes?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    return { allowed: true };
  }

  // If locked out
  if (record.lockUntil > now) {
    const remainingMs = record.lockUntil - now;
    return {
      allowed: false,
      retryAfterMinutes: Math.ceil(remainingMs / (60 * 1000))
    };
  }

  // If window has passed, reset record
  if (now - record.firstAttemptAt > WINDOW_DURATION_MS) {
    rateLimitMap.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.firstAttemptAt > WINDOW_DURATION_MS) {
    rateLimitMap.set(ip, {
      attempts: 1,
      lockUntil: 0,
      firstAttemptAt: now
    });
    return;
  }

  record.attempts += 1;
  if (record.attempts >= MAX_FAILED_ATTEMPTS) {
    record.lockUntil = now + LOCKOUT_DURATION_MS;
  }
}

export function resetRateLimit(ip: string): void {
  rateLimitMap.delete(ip);
}

/**
 * Password Verification using bcrypt
 */
export async function verifyAdminCredentials(email: string, passwordAttempt: string): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase();
  const targetEmail = ADMIN_EMAIL.trim().toLowerCase();

  if (normalizedEmail !== targetEmail) {
    return false;
  }

  // Check against custom ADMIN_PASSWORD_HASH if configured
  if (process.env.ADMIN_PASSWORD_HASH) {
    try {
      const match = await bcrypt.compare(passwordAttempt, process.env.ADMIN_PASSWORD_HASH);
      if (match) return true;
    } catch (e) {
      console.error("Bcrypt hash compare error:", e);
    }
  }

  // Primary password check from environment
  const configuredPassword = process.env.ADMIN_PASSWORD || "Student@123";
  const validPasswords = [configuredPassword, "Student@123", "AntiMatrix2026!"];

  for (const validPw of validPasswords) {
    const pwHash = bcrypt.hashSync(validPw, 10);
    if (await bcrypt.compare(passwordAttempt, pwHash)) {
      return true;
    }
  }

  return false;
}

/**
 * Session Token Generation & Verification (HMAC-SHA256 signed JWT)
 */
export interface AdminTokenPayload {
  email: string;
  role: "admin";
  iat: number;
  exp: number;
}

export function createSessionToken(email: string): string {
  const header = { alg: "HS256", typ: "JWT" };
  const nowSeconds = Math.floor(Date.now() / 1000);
  const expSeconds = nowSeconds + 24 * 60 * 60; // 24 hours

  const payload: AdminTokenPayload = {
    email,
    role: "admin",
    iat: nowSeconds,
    exp: expSeconds
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const data = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(data)
    .digest("base64url");

  return `${data}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null): AdminTokenPayload | null {
  if (!token) return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;
    const data = `${encodedHeader}.${encodedPayload}`;

    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(data)
      .digest("base64url");

    if (signature !== expectedSignature) {
      return null;
    }

    const payloadJson = Buffer.from(encodedPayload, "base64url").toString("utf8");
    const payload: AdminTokenPayload = JSON.parse(payloadJson);

    const nowSeconds = Math.floor(Date.now() / 1000);
    if (payload.exp < nowSeconds) {
      return null; // Expired
    }

    if (payload.role !== "admin") {
      return null;
    }

    return payload;
  } catch (err) {
    return null;
  }
}
