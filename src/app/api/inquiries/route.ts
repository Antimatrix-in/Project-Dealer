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
    const mobileNumber = String(body.mobileNumber || body.mobile || body.phone || "").trim();
    const whatsappNumber = String(body.whatsappNumber || body.whatsapp || mobileNumber || body.phone || "").trim();
    const email = String(body.email || "").trim();
    const college = String(body.college || "").trim();
    const department = String(body.department || body.dept || body.degree || "").trim();
    const projectDomain = String(body.projectDomain || body.domain || body.category || "").trim();
    const customDomain = String(body.customDomain || body.otherDomain || "").trim();
    const projectTitle = String(body.projectTitle || (projectDomain ? `${projectDomain} Project Consultation` : body.requirement || "")).trim();
    const requirement = String(body.requirement || body.message || "").trim();
    const urgency = String(body.urgency || "1-2 Weeks").trim();
    const defaultSource = (body.projectDomain || body.department || body.college) ? "Project Enquiry" : "General Website Contact";
    const source = (String(body.source || defaultSource).trim()) as
      | "Project Enquiry"
      | "General Website Contact"
      | "Consultation Request";

    const hasHoneypot = Boolean(
      (body.website && String(body.website).trim().length > 0) ||
      (body.company_hp && String(body.company_hp).trim().length > 0)
    );

    // 3. Strict Server-Side Field Validation (skipped for honeypot bot trap)
    if (!hasHoneypot) {
      if (!name || name.length < 2) {
        return NextResponse.json(
          { error: "Please enter your full name (at least 2 characters)." },
          { status: 400 }
        );
      }

      if (!mobileNumber || !isValidPhone(mobileNumber)) {
        return NextResponse.json(
          { error: "Please enter a valid Mobile Number (8 to 16 numeric digits)." },
          { status: 400 }
        );
      }

      if (!whatsappNumber || !isValidPhone(whatsappNumber)) {
        return NextResponse.json(
          { error: "Please enter a valid WhatsApp Number (8 to 16 numeric digits)." },
          { status: 400 }
        );
      }

      if (!email || !isValidEmail(email)) {
        return NextResponse.json(
          { error: "Please enter a valid email address (e.g. student@college.edu)." },
          { status: 400 }
        );
      }

      // Specific mandatory validations for Project Enquiry
      if (source === "Project Enquiry") {
        if (!college || college.length < 2) {
          return NextResponse.json(
            { error: "Please enter your College Name." },
            { status: 400 }
          );
        }

        if (!department || department.length < 2) {
          return NextResponse.json(
            { error: "Please enter your Department / Branch." },
            { status: 400 }
          );
        }

        if (!projectDomain) {
          return NextResponse.json(
            { error: "Please select a Project Domain." },
            { status: 400 }
          );
        }

        if (projectDomain === "Other" && (!customDomain || customDomain.length < 2)) {
          return NextResponse.json(
            { error: "Please specify your custom project domain." },
            { status: 400 }
          );
        }
      }
    }

    // 4. Check for Repeated Identical Submissions within 2 minutes
    const effectiveDomain = projectDomain === "Other" ? customDomain : projectDomain;
    if (isDuplicateSubmission(whatsappNumber || mobileNumber, email, requirement || effectiveDomain)) {
      return NextResponse.json(
        {
          error: "We have already received an enquiry with these details recently. Our team will contact you shortly on WhatsApp."
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
      phone: whatsappNumber || mobileNumber,
      email,
      requirement: requirement || effectiveDomain,
      message: body.message,
      honeypot: body.website || body.company_hp,
      honeypotCompany: body.company_hp,
      renderedAt: Number(body._f_rendered_at || 0),
      captchaToken,
      clientIp: ip
    });

    // 7. Persist to storage with bot/spam classification and generated unique ID
    const saved = await saveInquiry({
      name,
      email,
      phone: mobileNumber,
      mobileNumber,
      whatsappNumber,
      college,
      department,
      degree: department,
      category: effectiveDomain,
      projectDomain: effectiveDomain,
      customDomain: projectDomain === "Other" ? customDomain : undefined,
      projectTitle: projectTitle || `${effectiveDomain} Project Consultation`,
      requirement,
      urgency,
      source,
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
        phone: whatsappNumber || mobileNumber,
        college,
        degree: department,
        category: effectiveDomain,
        projectTitle: projectTitle || `${effectiveDomain} Project`,
        requirement,
        urgency,
        message: body.message
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: `Project Enquiry [${saved.id}] received! Our academic coordinator will contact you on WhatsApp (${whatsappNumber}) within 2 hours.`,
        data: {
          id: saved.id,
          name: saved.name,
          projectDomain: saved.projectDomain,
          mobileNumber: saved.mobileNumber,
          whatsappNumber: saved.whatsappNumber,
          source: saved.source,
          status: saved.status,
          verificationStatus: saved.verificationStatus,
          createdAt: saved.createdAt
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
