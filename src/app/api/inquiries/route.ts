import { NextResponse } from "next/server";
import { saveInquiry } from "@/lib/inquiries";
import { submitProjectInquiry } from "@/lib/supabase";
import {
  checkInquiryRateLimit,
  isDuplicateSubmission,
  isValidEmail,
  isValidPhone,
  verifyTurnstileToken,
  analyzeInquirySubmission
} from "@/lib/bot-protection";

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    // 1. IP Rate Limiting
    const rateCheck = checkInquiryRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many submissions from this connection. Please wait ${rateCheck.retryAfterMinutes || 10} minutes before submitting another inquiry.`
        },
        { status: 429 }
      );
    }

    // 2. Parse request payload
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid form payload." },
        { status: 400 }
      );
    }

    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "").trim();
    const college = String(body.college || "").trim();
    const degree = String(body.degree || "").trim();
    const category = String(body.category || "").trim();
    const projectTitle = String(body.projectTitle || body.requirement || "").trim();
    const requirement = String(body.requirement || body.message || "").trim();
    const urgency = String(body.urgency || "1-2 Weeks").trim();

    // 3. Strict Server-Side Field Validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!phone || !isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid WhatsApp or contact phone number (8 to 16 digits)." },
        { status: 400 }
      );
    }

    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address (e.g. student@college.edu)." },
        { status: 400 }
      );
    }

    // 4. Check for Repeated Identical Submissions within 2 minutes
    if (isDuplicateSubmission(phone, email, requirement)) {
      return NextResponse.json(
        {
          error: "We have already received an inquiry with these details recently. Our team will contact you shortly on WhatsApp / Phone."
        },
        { status: 429 }
      );
    }

    // 5. Cloudflare Turnstile CAPTCHA Verification (if configured on Render)
    const captchaToken = String(body.cf_turnstile_response || body.captcha_token || "").trim();
    if (process.env.TURNSTILE_SECRET_KEY) {
      const turnstileResult = await verifyTurnstileToken(captchaToken, ip);
      if (!turnstileResult.success) {
        return NextResponse.json(
          { error: "CAPTCHA verification failed. Please complete the security check and try again." },
          { status: 400 }
        );
      }
    }

    // 6. Multi-Layer Bot, Honeypot & Behaviour Analysis
    const botAnalysis = await analyzeInquirySubmission({
      name,
      phone,
      email,
      requirement,
      message: body.message,
      honeypot: body.website || body.company_hp,
      honeypotCompany: body.company_hp,
      renderedAt: Number(body._f_rendered_at || 0),
      captchaToken,
      clientIp: ip
    });

    // 6. Persist to storage with bot/spam classification
    const saved = await saveInquiry({
      name,
      email,
      phone,
      college,
      degree,
      category,
      projectTitle: projectTitle || "Custom Project Consultation",
      requirement,
      urgency,
      status: botAnalysis.verificationStatus === "Spam" ? "Spam" : botAnalysis.verificationStatus === "Suspicious" ? "Suspicious" : "New",
      verificationStatus: botAnalysis.verificationStatus,
      spamScore: botAnalysis.spamScore,
      botSignals: botAnalysis.botSignals,
      clientIp: ip
    });

    // Sync to Supabase only if not confirmed spam
    if (botAnalysis.verificationStatus !== "Spam") {
      await submitProjectInquiry({
        name,
        email,
        phone,
        college,
        degree,
        category,
        projectTitle,
        requirement,
        urgency,
        message: body.message
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Consultation inquiry received! Our academic coordinator will contact you on WhatsApp / Phone within 2 hours.",
        data: {
          id: saved.id,
          name: saved.name,
          verificationStatus: saved.verificationStatus
        }
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Inquiry submission error:", err);
    return NextResponse.json(
      { error: "Internal Server Error processing inquiry.", details: err?.message },
      { status: 500 }
    );
  }
}
