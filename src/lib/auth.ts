import crypto from "crypto";
import bcrypt from "bcryptjs";

export const ADMIN_COOKIE_NAME = "antimatrix_admin_token";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "antimatrix2026";
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
  findAdminByIdentifier,
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
 * Supports username (e.g. "antimatrix2026") or email (e.g. "antimatrix2026@gmail.com")
 */
export async function verifyAdminCredentials(
  identifier: string,
  passwordAttempt: string
): Promise<AuthVerificationResult> {
  const normalized = (identifier || "").trim().toLowerCase();
  const rawAttempt = passwordAttempt || "";
  const trimmedAttempt = rawAttempt.trim();

  if (!normalized || !trimmedAttempt) {
    console.warn(`[AUTH] Login attempt failed: Empty username/email or password submitted.`);
    return { success: false, reason: "EMPTY_INPUT" };
  }

  // 1. Retrieve the administrator record from database/store by username or email
  let adminRecord = await findAdminByIdentifier(normalized);

  const targetUsername = (process.env.ADMIN_USERNAME || "antimatrix2026").trim().toLowerCase();
  const targetEmail = (process.env.ADMIN_EMAIL || "antimatrix2026@gmail.com").trim().toLowerCase();

  // If no record exists, verify if this matches the configured admin identity and initialize
  if (!adminRecord && (normalized === targetUsername || normalized === targetEmail)) {
    adminRecord = await ensureAdminAccount();
  }

  if (!adminRecord) {
    console.warn(`[AUTH] Login failed: No administrator account registered for "${normalized}".`);
    return { success: false, reason: "ACCOUNT_NOT_FOUND" };
  }

  // 2. Direct Environment Variable / Default Password Check (Render Environment Dashboard)
  const envPassword = (process.env.ADMIN_PASSWORD || process.env.EMAIL_PASSWORD || "").trim().replace(/^["']|["']$/g, "");
  const defaultPassword = "antimatrix2026@";
  const expectedPassword = envPassword || defaultPassword;

  const matchesExpected =
    (expectedPassword && (rawAttempt === expectedPassword || trimmedAttempt === expectedPassword));

  if (matchesExpected) {
    console.log(`[AUTH] Administrator "${normalized}" verified successfully.`);
    try {
      const hashValid = bcrypt.compareSync(trimmedAttempt, adminRecord.passwordHash);
      if (!hashValid) {
        await updateAdminPassword(adminRecord.email, trimmedAttempt);
      }
    } catch (e) {
      await updateAdminPassword(adminRecord.email, trimmedAttempt);
    }
    return {
      success: true,
      user: {
        email: adminRecord.email,
        role: "admin",
      },
    };
  }

  // 3. Fallback: Verify submitted password against stored bcrypt hash (both raw and trimmed)
  try {
    const isMatch =
      (await bcrypt.compare(rawAttempt, adminRecord.passwordHash)) ||
      (await bcrypt.compare(trimmedAttempt, adminRecord.passwordHash));
    if (isMatch) {
      console.log(`[AUTH] Administrator "${normalized}" authenticated successfully via stored hash.`);
      return {
        success: true,
        user: {
          email: adminRecord.email,
          role: "admin",
        },
      };
    }
  } catch (err) {
    console.warn(`[AUTH] Bcrypt comparison error for "${normalized}":`, err);
  }

  console.warn(`[AUTH] Login failed: Password mismatch for administrator "${normalized}".`);
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
