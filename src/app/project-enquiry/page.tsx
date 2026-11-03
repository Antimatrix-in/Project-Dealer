"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import {
  ClipboardList,
  User,
  Phone,
  MessageCircle,
  Mail,
  GraduationCap,
  Building2,
  Layers,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Clock,
  Copy,
  Check,
  FileText,
  ChevronRight
} from "lucide-react";
import { PROJECT_ENQUIRY_DOMAINS } from "@/types";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/lib/whatsapp";

function ProjectEnquiryForm() {
  const searchParams = useSearchParams();
  const preselectedDomain = searchParams.get("domain") || "";
  const preselectedTitle = searchParams.get("title") || "";

  // Form State
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [sameAsMobile, setSameAsMobile] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [department, setDepartment] = useState("");
  const [projectDomain, setProjectDomain] = useState<string>(
    PROJECT_ENQUIRY_DOMAINS.includes(preselectedDomain as any) ? preselectedDomain : ""
  );
  const [customDomain, setCustomDomain] = useState("");
  const [projectTitle, setProjectTitle] = useState(preselectedTitle);
  const [requirements, setRequirements] = useState("");
  const [urgency, setUrgency] = useState("1-2 Weeks");

  // Honeypot & Bot Protection
  const [honeypot, setHoneypot] = useState("");
  const [honeypotCompany, setHoneypotCompany] = useState("");
  const [renderedAt, setRenderedAt] = useState<number>(0);

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    enquiryId: string;
    name: string;
    domain: string;
    whatsappNumber: string;
    createdAt: string;
  } | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

  // Sync WhatsApp number when "Same as Mobile" checkbox is toggled
  const handleSameAsMobileToggle = (checked: boolean) => {
    setSameAsMobile(checked);
    if (checked) {
      setWhatsappNumber(mobileNumber);
    }
  };

  const handleMobileChange = (val: string) => {
    setMobileNumber(val);
    if (sameAsMobile) {
      setWhatsappNumber(val);
    }
  };

  const handleCopyId = () => {
    if (successData?.enquiryId) {
      navigator.clipboard.writeText(successData.enquiryId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side validation
    const nameTrimmed = fullName.trim();
    if (!nameTrimmed || nameTrimmed.length < 2) {
      setErrorMessage("Please enter your full name (at least 2 characters).");
      return;
    }

    const cleanMobile = mobileNumber.replace(/\D/g, "");
    if (cleanMobile.length < 8 || cleanMobile.length > 16) {
      setErrorMessage("Please enter a valid 10-digit mobile contact number.");
      return;
    }

    const cleanWa = (sameAsMobile ? cleanMobile : whatsappNumber.replace(/\D/g, ""));
    if (cleanWa.length < 8 || cleanWa.length > 16) {
      setErrorMessage("Please enter a valid WhatsApp number (8 to 16 digits).");
      return;
    }

    const emailTrimmed = emailAddress.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
      setErrorMessage("Please enter a valid email address (e.g. student@college.edu).");
      return;
    }

    const collegeTrimmed = collegeName.trim();
    if (!collegeTrimmed || collegeTrimmed.length < 2) {
      setErrorMessage("Please enter your college / university name.");
      return;
    }

    const deptTrimmed = department.trim();
    if (!deptTrimmed || deptTrimmed.length < 2) {
      setErrorMessage("Please enter your academic department / branch.");
      return;
    }

    if (!projectDomain) {
      setErrorMessage("Please select a Project Domain from the dropdown.");
      return;
    }

    if (projectDomain === "Other" && (!customDomain.trim() || customDomain.trim().length < 2)) {
      setErrorMessage("Please specify your custom project domain in the text field provided.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Project Enquiry",
          name: nameTrimmed,
          mobileNumber: cleanMobile,
          whatsappNumber: cleanWa,
          email: emailTrimmed,
          college: collegeTrimmed,
          department: deptTrimmed,
          projectDomain,
          customDomain: projectDomain === "Other" ? customDomain.trim() : "",
          projectTitle: projectTitle.trim() || undefined,
          requirement: requirements.trim() || undefined,
          urgency,
          website: honeypot,
          company_hp: honeypotCompany,
          _f_rendered_at: renderedAt,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error || "Failed to submit project enquiry. Please check your details and try again.");
        setSubmitting(false);
        return;
      }

      // Celebrate success
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#315C3D", "#497A52", "#DCE8D9", "#202820"]
      });

      setSuccessData({
        enquiryId: result.data?.id || `PE-2026-${Date.now().toString().slice(-4)}`,
        name: nameTrimmed,
        domain: projectDomain === "Other" ? customDomain.trim() : projectDomain,
        whatsappNumber: cleanWa,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      setErrorMessage("Network error occurred while submitting your enquiry. Please check your internet connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E7] text-[#202820] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#667064]">
          <Link href="/" className="hover:text-[#315C3D] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/projects" className="hover:text-[#315C3D] transition-colors">Projects</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#315C3D] font-bold">Project Enquiry</span>
        </div>

        {/* Header Hero Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCE8D9] border border-[#DDDCCF] text-xs font-bold text-[#315C3D] font-mono">
              <ClipboardList className="w-3.5 h-3.5 text-[#315C3D]" />
              <span>AntiMatrix Academic Consultation • Direct Internal Desk</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black text-[#202820] tracking-tight">
              Final Year Engineering <span className="text-[#315C3D]">Project Enquiry</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-[#667064] leading-relaxed">
              Submit your engineering project requirements directly into the AntiMatrix technical workspace. 
              Our senior academic coordinator will review your syllabus and contact you directly on WhatsApp within 2 hours.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-[#202820]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#315C3D]" />
                IEEE Base Papers &amp; Full Code
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#315C3D]" />
                Zero Google Forms • 100% Internal
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#315C3D]" />
                Live Demo &amp; Viva Support
              </span>
            </div>
          </div>
        </div>

        {/* Success Confirmation State */}
        {successData ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFFFF] border border-[#315C3D]/30 shadow-lg space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-[#DCE8D9] border border-[#315C3D]/40 text-[#315C3D] flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#315C3D]">
                Enquiry Successfully Registered
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#202820]">
                Thank You, {successData.name}!
              </h2>
              <p className="text-xs sm:text-sm text-[#667064] max-w-xl mx-auto">
                Your project consultation has been received and logged directly in the AntiMatrix system database. 
                Our academic coordinator will reach out to your WhatsApp shortly.
              </p>
            </div>

            {/* Generated Unique Enquiry ID Badge */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#F5F1E7] border border-[#DDDCCF] max-w-md mx-auto space-y-2">
              <span className="text-[11px] font-mono text-[#667064] uppercase block">
                Your Unique Project Enquiry Reference ID:
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="text-xl sm:text-2xl font-mono font-black text-[#315C3D] tracking-wide">
                  {successData.enquiryId}
                </span>
                <button
                  onClick={handleCopyId}
                  className="p-2 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] border border-[#DDDCCF] text-[#315C3D] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                  title="Copy Reference ID"
                >
                  {copiedId ? <Check className="w-4 h-4 text-[#315C3D]" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <p className="text-[10px] text-[#667064]">
                Target Domain: <strong className="text-[#202820]">{successData.domain}</strong> • WhatsApp: <strong className="text-[#202820]">{successData.whatsappNumber}</strong>
              </p>
            </div>

            {/* Next Steps CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/91${successData.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello AntiMatrix, I have submitted Project Enquiry [${successData.enquiryId}] for "${successData.domain}". Please share documentation details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat Directly</span>
              </a>

              <Link
                href="/projects"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF] text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>Explore Project Catalog</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Main Project Enquiry Form */
          <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm space-y-8">
            
            {/* Error Message Alert */}
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-[#EEE9DC] border border-[#315C3D]/40 text-[#202820] text-xs flex items-start gap-3 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-[#315C3D] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold block">Submission Error</span>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            {/* SECTION 1: PERSONAL INFORMATION */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#DDDCCF]">
                <div className="w-7 h-7 rounded-lg bg-[#DCE8D9] text-[#315C3D] flex items-center justify-center text-xs font-bold font-mono">
                  1
                </div>
                <h2 className="text-base font-bold text-[#202820] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#315C3D]" />
                  <span>Personal Information</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Full Name */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-bold text-[#202820] flex items-center gap-1">
                    <span>Full Name</span>
                    <span className="text-[#315C3D]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aravind Swaminathan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#202820] flex items-center gap-1">
                    <span>Mobile Number</span>
                    <span className="text-[#315C3D]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={mobileNumber}
                      onChange={(e) => handleMobileChange(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-[#202820] flex items-center gap-1">
                      <span>WhatsApp Number</span>
                      <span className="text-[#315C3D]">*</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-[#315C3D] font-semibold select-none">
                      <input
                        type="checkbox"
                        checked={sameAsMobile}
                        onChange={(e) => handleSameAsMobileToggle(e.target.checked)}
                        className="rounded border-[#DDDCCF] text-[#315C3D] focus:ring-[#315C3D] accent-[#315C3D] cursor-pointer"
                      />
                      <span>Same as Mobile</span>
                    </label>
                  </div>
                  <div className="relative">
                    <MessageCircle className="w-4 h-4 text-[#315C3D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp active number"
                      value={whatsappNumber}
                      disabled={sameAsMobile}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors font-mono ${
                        sameAsMobile ? "bg-[#EEE9DC] opacity-80 cursor-not-allowed" : "bg-[#F5F1E7]"
                      }`}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-bold text-[#202820] flex items-center gap-1">
                    <span>Email Address</span>
                    <span className="text-[#315C3D]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="student@college.edu or personal email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: ACADEMIC INFORMATION */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#DDDCCF]">
                <div className="w-7 h-7 rounded-lg bg-[#DCE8D9] text-[#315C3D] flex items-center justify-center text-xs font-bold font-mono">
                  2
                </div>
                <h2 className="text-base font-bold text-[#202820] flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#315C3D]" />
                  <span>Academic Information</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* College Name */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#202820] flex items-center gap-1">
                    <span>College / Institution Name</span>
                    <span className="text-[#315C3D]">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. PSG Tech / SSN / CIT / VIT"
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors"
                    />
                  </div>
                </div>

                {/* Department */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#202820] flex items-center gap-1">
                    <span>Department / Branch</span>
                    <span className="text-[#315C3D]">*</span>
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. CSE, IT, AI & Data Science, ECE"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: PROJECT INFORMATION */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#DDDCCF]">
                <div className="w-7 h-7 rounded-lg bg-[#DCE8D9] text-[#315C3D] flex items-center justify-center text-xs font-bold font-mono">
                  3
                </div>
                <h2 className="text-base font-bold text-[#202820] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#315C3D]" />
                  <span>Project Domain &amp; Requirements</span>
                </h2>
              </div>

              <div className="space-y-4 text-xs">
                {/* Project Domain Dropdown */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#202820] flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <span>Project Domain</span>
                      <span className="text-[#315C3D]">*</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#667064]">11 Engineering Domains</span>
                  </label>
                  <select
                    required
                    value={projectDomain}
                    onChange={(e) => setProjectDomain(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] font-medium focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors cursor-pointer"
                  >
                    <option value="">-- Choose Target Project Domain --</option>
                    {PROJECT_ENQUIRY_DOMAINS.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Conditional "Other" Domain text field */}
                {projectDomain === "Other" && (
                  <div className="space-y-1.5 p-4 rounded-2xl bg-[#EEE9DC] border border-[#315C3D]/30 animate-in fade-in slide-in-from-top-1">
                    <label className="font-bold text-[#202820] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#315C3D]" />
                      <span>Specify Other Project Domain</span>
                      <span className="text-[#315C3D]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. IoT Embedded, Blockchain, Robotics, AR/VR"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors"
                      autoFocus
                    />
                  </div>
                )}

                {/* Project Title (Optional) */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#202820] flex items-center justify-between">
                    <span>Project Title / Working Topic (Optional)</span>
                    <span className="text-[11px] font-mono text-[#667064]">If already decided by university guide</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Multimodal Deep Learning for Real-Time Medical Analysis"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors"
                  />
                </div>

                {/* Specific Requirements / Message */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#202820] flex items-center justify-between">
                    <span>Specific Project Requirements &amp; Deliverables</span>
                    <span className="text-[11px] font-mono text-[#667064]">Base paper, PPT, Viva, Demo</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us any specific requirements (e.g. IEEE 2026 paper needed, PyTorch codebase, PPT presentation, 70-page report, upcoming review deadline)..."
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors resize-none"
                  />
                </div>

                {/* Review Deadline / Urgency */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#202820] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#315C3D]" />
                    <span>Expected Review Timeline</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["Immediate (1-3 days)", "1-2 Weeks", "1 Month", "Flexible"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setUrgency(opt)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          urgency === opt
                            ? "bg-[#315C3D] text-white border-[#315C3D] shadow-xs"
                            : "bg-[#F5F1E7] text-[#667064] border-[#DDDCCF] hover:bg-[#EEE9DC]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Hidden Honeypot fields for bot traps */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
              <input
                type="text"
                name="company_hp"
                tabIndex={-1}
                autoComplete="off"
                value={honeypotCompany}
                onChange={(e) => setHoneypotCompany(e.target.value)}
              />
            </div>

            {/* Submission Actions */}
            <div className="pt-4 border-t border-[#DDDCCF] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] text-[#667064] font-mono">
                <ShieldCheck className="w-4 h-4 text-[#315C3D]" />
                <span>Anti-Bot Protected • Safe University Submission</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <ClipboardList className="w-4 h-4" />
                <span>{submitting ? "Registering Enquiry..." : "Submit Project Enquiry"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Bottom Help Notice */}
        <div className="text-center text-xs text-[#667064] space-y-1">
          <p>
            Prefer direct instant messaging? Reach our Chennai engineering office on WhatsApp:{" "}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#315C3D] hover:underline font-mono"
            >
              {WHATSAPP_DISPLAY}
            </a>
          </p>
          <p className="text-[11px]">
            AntiMatrix guarantees complete project guidance, review presentation slides, source code demonstrations, and plagiarism compliance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProjectEnquiryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F5F1E7] flex items-center justify-center">
        <div className="p-8 rounded-2xl bg-white border border-[#DDDCCF] text-xs font-mono text-[#315C3D]">
          Loading Project Enquiry Portal...
        </div>
      </div>
    }>
      <ProjectEnquiryForm />
    </Suspense>
  );
}

