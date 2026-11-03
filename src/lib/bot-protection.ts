import crypto from "crypto";

export interface BotAnalysisResult {
  isBot: boolean;
  spamScore: number; // 0 to 100
  verificationStatus: "Verified" | "Suspicious" | "Spam";
  botSignals: string[];
}

interface RateLimitRecord {
  count: number;
  firstTimestamp: number;
}

// In-memory IP rate limiter (Sliding window: max 5 requests per 10 minutes)
const ipRateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// In-memory duplicate submission cache (Key: hash of phone+email+requirement, TTL: 2 minutes)
const duplicateSubmissionsMap = new Map<string, number>();
const DUPLICATE_WINDOW_MS = 2 * 60 * 1000; // 2 minutes

// Known spam keywords (phishing, SEO spam, crypto scams, essay mills)
const SPAM_KEYWORDS = [
  "cialis",
  "viagra",
  "casino",
  "poker",
  "cryptocurrency investment",
  "crypto trading bot",
  "fast cash",
  "essay writing service",
  "buy backlinks",
  "seo ranking boost",
  "weight loss gummies",
  "whatsapp blasting",
  "telegram spam"
];

/**
 * Validates standard email address format (RFC 5322 compatible regex)
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed) && trimmed.length <= 120 && trimmed.includes(".");
}

/**
 * Validates phone numbers (must contain between 8 and 16 numeric digits)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== "string") return false;
  const digitsOnly = phone.replace(/\D/g, "");
  return digitsOnly.length >= 8 && digitsOnly.length <= 16;
}

/**
 * Checks IP rate limiting
 */
export function checkInquiryRateLimit(ip: string): { allowed: boolean; remainingRequests: number; retryAfterMinutes?: number } {
  const now = Date.now();
  const record = ipRateLimitMap.get(ip);

  if (!record) {
    ipRateLimitMap.set(ip, { count: 1, firstTimestamp: now });
    return { allowed: true, remainingRequests: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  // Window expired, reset
  if (now - record.firstTimestamp > RATE_LIMIT_WINDOW_MS) {
    ipRateLimitMap.set(ip, { count: 1, firstTimestamp: now });
    return { allowed: true, remainingRequests: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const remainingMs = record.firstTimestamp + RATE_LIMIT_WINDOW_MS - now;
    return {
      allowed: false,
      remainingRequests: 0,
      retryAfterMinutes: Math.ceil(remainingMs / (60 * 1000))
    };
  }

  record.count += 1;
  return { allowed: true, remainingRequests: MAX_REQUESTS_PER_WINDOW - record.count };
}

/**
 * Checks for repeated identical submissions within 2 minutes
 */
export function isDuplicateSubmission(phone: string, email: string, requirement: string): boolean {
  const normalized = `${phone.replace(/\D/g, "")}_${email.trim().toLowerCase()}_${(requirement || "").trim().toLowerCase()}`;
  const signature = crypto.createHash("sha256").update(normalized).digest("hex");
  const now = Date.now();
  const previousTime = duplicateSubmissionsMap.get(signature);

  if (previousTime && now - previousTime < DUPLICATE_WINDOW_MS) {
    return true;
  }

  duplicateSubmissionsMap.set(signature, now);

  // Periodically cleanup expired cache entries
  if (duplicateSubmissionsMap.size > 200) {
    for (const [k, ts] of duplicateSubmissionsMap.entries()) {
      if (now - ts > DUPLICATE_WINDOW_MS) {
        duplicateSubmissionsMap.delete(k);
      }
    }
  }

  return false;
}

/**
 * Verify Cloudflare Turnstile token with Cloudflare API
 */
export async function verifyTurnstileToken(token: string, remoteIp: string): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    // If not configured in Render environment, bypass external verification gracefully
    return { success: true };
  }

  if (!token) {
    return { success: false, error: "Missing Turnstile verification token" };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    formData.append("remoteip", remoteIp);

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    const result = await response.json();
    return { success: Boolean(result.success) };
  } catch (err: any) {
    console.warn("Turnstile API call error:", err);
    // On network failure to Cloudflare API, allow graceful degradation
    return { success: true };
  }
}

/**
 * Comprehensive Multi-Layer Bot & Spam Detection Analyzer
 */
export async function analyzeInquirySubmission(data: {
  name: string;
  phone: string;
  email?: string;
  requirement?: string;
  message?: string;
  honeypot?: string;
  honeypotCompany?: string;
  renderedAt?: number;
  captchaToken?: string;
  clientIp: string;
}): Promise<BotAnalysisResult> {
  const botSignals: string[] = [];
  let spamScore = 0;

  // 1. Honeypot Check: Hidden input fields that humans never see or touch
  if (data.honeypot && data.honeypot.trim().length > 0) {
    spamScore += 85;
    botSignals.push("Honeypot field (website) filled by automated bot");
  }
  if (data.honeypotCompany && data.honeypotCompany.trim().length > 0) {
    spamScore += 85;
    botSignals.push("Honeypot field (company) filled by automated bot");
  }

  // 2. Minimum Form Submission Time Check
  // A genuine human filling out name, email, phone, college, and requirements takes >= 3 seconds.
  // Bots execute headless scripts and post forms in < 1.5 seconds.
  if (data.renderedAt && typeof data.renderedAt === "number") {
    const elapsedMs = Date.now() - data.renderedAt;
    if (elapsedMs > 0 && elapsedMs < 2500) {
      spamScore += 65;
      botSignals.push(`Form submitted too fast (${(elapsedMs / 1000).toFixed(1)}s < 2.5s)`);
    }
  }

  // 3. Cloudflare Turnstile / CAPTCHA Verification
  if (process.env.TURNSTILE_SECRET_KEY) {
    const turnstileResult = await verifyTurnstileToken(data.captchaToken || "", data.clientIp);
    if (!turnstileResult.success) {
      spamScore += 75;
      botSignals.push("Cloudflare Turnstile CAPTCHA verification failed");
    }
  }

  // 4. Content Pattern & Spam Links Analysis
  const fullText = `${data.name} ${data.requirement || ""} ${data.message || ""}`.toLowerCase();

  // Check for external spam links in requirement/message
  const urlMatches = fullText.match(/https?:\/\/[^\s]+/g);
  if (urlMatches && urlMatches.length > 2) {
    spamScore += 45;
    botSignals.push(`Multiple external URLs in submission (${urlMatches.length} links)`);
  }

  // Check for known marketing/bot spam keywords
  for (const keyword of SPAM_KEYWORDS) {
    if (fullText.includes(keyword)) {
      spamScore += 50;
      botSignals.push(`Detected marketing/spam phrase: "${keyword}"`);
      break;
    }
  }

  // 5. Repetitive Gibberish or Script-like Name Pattern
  if (/^[a-zA-Z]{12,}$/.test(data.name) && !/[aeiouy]{2}/i.test(data.name)) {
    spamScore += 35;
    botSignals.push("Suspicious consonant-heavy random character string in Name");
  }

  // Determine Final Verification Status
  const isBot = spamScore >= 60;
  let verificationStatus: "Verified" | "Suspicious" | "Spam" = "Verified";

  if (spamScore >= 80) {
    verificationStatus = "Spam";
  } else if (spamScore >= 50) {
    verificationStatus = "Suspicious";
  } else {
    verificationStatus = "Verified";
  }

  return {
    isBot,
    spamScore,
    verificationStatus,
    botSignals
  };
}

