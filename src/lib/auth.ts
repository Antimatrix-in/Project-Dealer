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

import {
  findAdminByEmail,
  ensureAdminAccount,
  updateAdminPassword,
  AdminAccount,
} from "./admin-store";

export interface AuthVerificationResult {
  success: boolean;
  reason?: "ACCOUNT_NOT_FOUND" | "INVALID_PASSWORD" | "EMPTY_INPUT";
  user?: {
    email: string;
    role: "admin";
  };
}

/**
 * Password Verification using the database administrator record & bcrypt
 */
export async function verifyAdminCredentials(
  email: string,
  passwordAttempt: string
): Promise<AuthVerificationResult> {
  const normalizedEmail = (email || "").trim().toLowerCase();

  if (!normalizedEmail || !passwordAttempt) {
    console.warn(`[AUTH] Login attempt failed: Empty email or password submitted.`);
    return { success: false, reason: "EMPTY_INPUT" };
  }

  // 1. Retrieve the administrator record from database/store
  let adminRecord = await findAdminByEmail(normalizedEmail);

  // If no record exists, verify if this matches the configured admin email and initialize
  const targetEmail = (process.env.ADMIN_EMAIL || "antimatrix2026@gmail.com")
    .trim()
    .toLowerCase();

  if (!adminRecord && normalizedEmail === targetEmail) {
    adminRecord = await ensureAdminAccount();
  }

  if (!adminRecord) {
    console.warn(`[AUTH] Login failed: No administrator account registered for "${normalizedEmail}".`);
    return { success: false, reason: "ACCOUNT_NOT_FOUND" };
  }

  // 2. Verify submitted password against stored bcrypt hash
  try {
    const isMatch = await bcrypt.compare(passwordAttempt, adminRecord.passwordHash);
    if (isMatch) {
      console.log(`[AUTH] Administrator "${normalizedEmail}" authenticated successfully via stored hash.`);
      return {
        success: true,
        user: {
          email: adminRecord.email,
          role: "admin",
        },
      };
    }
  } catch (err) {
    console.warn(`[AUTH] Bcrypt comparison error for "${normalizedEmail}":`, err);
  }

  // 3. Fallback: check if the owner configured a new password in environment variable
  const configuredPassword = process.env.ADMIN_PASSWORD || process.env.EMAIL_PASSWORD;
  if (configuredPassword && passwordAttempt === configuredPassword) {
    console.log(`[AUTH] Administrator "${normalizedEmail}" verified with configured environment credentials. Updating stored hash...`);
    await updateAdminPassword(normalizedEmail, passwordAttempt);
    return {
      success: true,
      user: {
        email: adminRecord.email,
        role: "admin",
      },
    };
  }

  console.warn(`[AUTH] Login failed: Password mismatch for administrator "${normalizedEmail}".`);
  return { success: false, reason: "INVALID_PASSWORD" };
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
