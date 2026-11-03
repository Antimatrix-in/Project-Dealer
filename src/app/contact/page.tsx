"use client";

import React, { useState, useEffect } from "react";
import SectionHeader from "@/components/common/SectionHeader";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  Building2,
  ExternalLink,
  ClipboardList,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import confetti from "canvas-confetti";
import { PROJECT_CATEGORIES } from "@/data/projects";
import { getWhatsAppUrl, WHATSAPP_NUMBER, WHATSAPP_DISPLAY, GOOGLE_ENQUIRY_FORM_URL } from "@/lib/whatsapp";
import CtaBanner from "@/components/home/CtaBanner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    degree: "",
    category: "",
    requirement: "",
    message: "",
    urgency: "1-2 Weeks",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [renderedAt, setRenderedAt] = useState<number>(0);
  const [honeypot, setHoneypot] = useState("");
  const [honeypotCompany, setHoneypotCompany] = useState("");

  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage("Please enter your name (at least 2 characters).");
      return;
    }

    const digitsOnly = formData.phone.replace(/\D/g, "");
    if (digitsOnly.length < 8) {
      setErrorMessage("Please enter a valid WhatsApp or contact number (8-16 digits).");
      return;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          website: honeypot,
          company_hp: honeypotCompany,
          _f_rendered_at: renderedAt,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.6 },
            colors: ["#315C3D", "#497A52", "#DCE8D9", "#FFFFFF"],
          });
        } catch (e) {}
      } else {
        setErrorMessage(data.error || "Submission failed. Please check your entries.");
      }
    } catch (err) {
      setErrorMessage("Connection issue. Please try again or message us on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const url = getWhatsAppUrl({
      category: formData.category,
      projectTitle: formData.requirement,
      college: formData.college,
      department: formData.degree,
      requirements: formData.message || formData.requirement,
    });
    window.open(url, "_blank");
  };

  return (
    <div className="pt-28 pb-20 bg-[#F5F1E7] min-h-screen text-[#202820]">
      {/* Background Header */}
      <div className="relative py-16 bg-[#EEE9DC] border-b border-[#DDDCCF] mb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeader
            badge="AntiMatrix Support Cell"
            title="Need Help With Your"
            titleGradient="Project?"
            subtitle="Tell us about your project requirements and our team will contact you with the best solution."
          />
          {/* Top Quick Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] text-[#315C3D] font-bold text-xs shadow-xs border border-[#DDDCCF] hover:border-[#315C3D] transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#315C3D]" />
              <span>WhatsApp Now</span>
            </a>

            <a
              href={GOOGLE_ENQUIRY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white font-bold text-xs shadow-xs hover:shadow-md transition-all group border border-[#315C3D]"
            >
              <ClipboardList className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Fill Project Enquiry Form</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/80 ml-0.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Contact Information Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-xs space-y-3 hover:border-[#315C3D] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#DCE8D9] border border-[#DDDCCF] flex items-center justify-center text-[#315C3D]">
              <Phone className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#202820]">Call Support</h4>
            <p className="text-xs text-[#667064] leading-relaxed">
              Direct hotline for immediate project counseling.
            </p>
            <div className="pt-1">
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="text-xs font-mono font-bold text-[#315C3D] hover:underline block"
              >
                {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-xs space-y-3 hover:border-[#315C3D] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#DCE8D9] border border-[#DDDCCF] flex items-center justify-center text-[#315C3D]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#202820]">WhatsApp Helpline</h4>
            <p className="text-xs text-[#667064] leading-relaxed">
              Instant responses, base paper sharing, and screenshots.
            </p>
            <div className="pt-1">
              <button
                onClick={handleWhatsAppDirect}
                className="text-xs font-bold text-[#315C3D] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Chat on WhatsApp &rarr;</span>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-xs space-y-3 hover:border-[#315C3D] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#DCE8D9] border border-[#DDDCCF] flex items-center justify-center text-[#315C3D]">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#202820]">Email Desk</h4>
            <p className="text-xs text-[#667064] leading-relaxed">
              Send your synopsis drafts, problem statements, and requirements.
            </p>
            <div className="pt-1">
              <a
                href="mailto:projects@antimatrix.co.in"
                className="text-xs font-bold text-[#315C3D] hover:underline"
              >
                projects@antimatrix.co.in
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-xs space-y-3 hover:border-[#315C3D] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#DCE8D9] border border-[#DDDCCF] flex items-center justify-center text-[#315C3D]">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#202820]">Operating Hours</h4>
            <p className="text-xs text-[#667064] leading-relaxed">
              Mon - Sat: 9:00 AM - 9:00 PM IST
            </p>
            <p className="text-[11px] text-[#315C3D] font-medium">
              *Emergency review support during university exam weeks.
            </p>
          </div>
        </div>

        {/* Main Section: Contact Form + Headquarters & Map Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left Form (3 Cols) */}
          <div className="lg:col-span-3 p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-xs">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDDCCF]">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCE8D9] border border-[#DDDCCF] text-[#315C3D] font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-[#315C3D]" />
                  <span>Project Requirement Form</span>
                </div>
                <h3 className="text-2xl font-bold text-[#202820]">Send Us Your Project Details</h3>
                <p className="text-xs text-[#667064]">
                  Fill in the details below or open Google Forms to submit project requirements.
                </p>
              </div>

              {/* Project Enquiry (Google Form CTA) */}
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-all shadow-xs group shrink-0 border border-[#315C3D]"
              >
                <ClipboardList className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Project Enquiry</span>
                <ExternalLink className="w-3 h-3 text-white/80 ml-0.5" />
              </a>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#DCE8D9] border border-[#DDDCCF] text-[#315C3D] flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-[#202820]">Thank You, {formData.name}!</h4>
                <p className="text-sm text-[#667064] max-w-md mx-auto leading-relaxed">
                  Your project requirements have been transmitted to our engineering cell in Chennai, Tamil Nadu. Our domain mentors will call and message you on WhatsApp (<strong className="text-[#202820]">+91 91595 14326</strong>) within 15 minutes. You can also email synopsis files and base papers to{" "}
                  <a
                    href="mailto:projects@antimatrix.co.in"
                    className="text-[#315C3D] font-bold hover:underline"
                  >
                    projects@antimatrix.co.in
                  </a>.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="px-6 py-3 rounded-xl bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D] text-[#315C3D] font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#315C3D]" />
                    Follow Up on WhatsApp
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] text-[#202820] font-semibold text-xs border border-[#DDDCCF] cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Anti-Bot Honeypot Inputs (Hidden from human visitors) */}
                <div className="hidden opacity-0 pointer-events-none absolute -left-[9999px]" aria-hidden="true">
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

                {/* Error Alert Message */}
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#315C3D]/40 text-[#202820] text-xs flex items-start gap-2.5 shadow-xs animate-in fade-in duration-200">
                    <AlertCircle className="w-4 h-4 text-[#315C3D] shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#202820] mb-1">
                      Full Name <span className="text-[#315C3D]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Karthik Rajan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-[#202820] placeholder-stone-400 text-sm focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#202820] mb-1">
                      WhatsApp / Phone Number <span className="text-[#315C3D]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 91595 14326"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-[#202820] placeholder-stone-400 text-sm focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#202820] mb-1">
                      Email Address <span className="text-[#315C3D]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. student@college.edu"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-[#202820] placeholder-stone-400 text-sm focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#202820] mb-1">
                      College / University
                    </label>
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      placeholder="e.g. Anna University / SRM / VIT"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-[#202820] placeholder-stone-400 text-sm focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#202820] mb-1">
                      Degree &amp; Branch
                    </label>
                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      placeholder="e.g. B.E CSE / B.Tech IT / M.Tech"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-[#202820] placeholder-stone-400 text-sm focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#202820] mb-1">
                      Project Domain (10 Categories)
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-[#202820] text-sm focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D]"
                    >
                      <option value="" className="bg-white text-[#202820]">Select Domain...</option>
                      {PROJECT_CATEGORIES.map((c) => (
                        <option key={c} value={c} className="bg-white text-[#202820]">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202820] mb-1">
                    Project Requirement / Title Idea
                  </label>
                  <input
                    type="text"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    placeholder="e.g. Need Final Year Deep Learning X-Ray project with base paper & PPT"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-[#202820] placeholder-stone-400 text-sm focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#202820] mb-1">
                    Detailed Message or Guide Instructions
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe any specific guidelines, review deadlines, or tools requested by your college guide..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-[#202820] placeholder-stone-400 text-sm focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-[#315C3D]"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-white" />
                        <span>Submit Project Requirement</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="py-3.5 px-5 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] border border-[#DDDCCF] hover:border-[#315C3D] text-[#315C3D] text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 text-[#315C3D]" />
                    <span>WhatsApp Directly</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Headquarters & Map Preview (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Center Location Card */}
            <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#DDDCCF]">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#315C3D]" />
                  <h3 className="text-base font-bold text-[#202820]">AntiMatrix Project Center</h3>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DCE8D9] border border-[#DDDCCF] text-[#315C3D] font-mono">
                  <MapPin className="w-3 h-3 text-[#315C3D]" />
                  Chennai, Tamil Nadu
                </span>
              </div>
              <p className="text-xs font-semibold text-[#202820] leading-relaxed">
                Chennai, Tamil Nadu
              </p>
              <div className="text-xs text-[#667064] space-y-1">
                <p>📍 Location: Chennai, Tamil Nadu, India</p>
                <p>🚆 Remote &amp; Direct Mentorship Support Available</p>
              </div>
            </div>

            {/* Interactive Styled Google Maps Card */}
            <div className="rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] overflow-hidden shadow-xs relative group">
              <div className="w-full h-64 sm:h-72 relative bg-[#EEE9DC]">
                <iframe
                  title="AntiMatrix Project Center - Chennai, Tamil Nadu"
                  src="https://maps.google.com/maps?q=Chennai,+Tamil+Nadu&t=&z=12&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-3 left-3 z-10 pointer-events-none">
                  <div className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-xs border border-[#DDDCCF] shadow-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#315C3D] animate-pulse" />
                    <span className="text-xs font-bold text-[#202820]">Chennai, Tamil Nadu</span>
                  </div>
                </div>
              </div>
              <div className="p-3.5 bg-[#FFFFFF] border-t border-[#DDDCCF] flex items-center justify-between">
                <div className="text-left">
                  <p className="text-xs font-bold text-[#202820]">AntiMatrix Project Center</p>
                  <p className="text-[11px] text-[#315C3D] font-mono">Chennai, Tamil Nadu</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Chennai,+Tamil+Nadu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] border border-[#DDDCCF] hover:border-[#315C3D] text-[#202820] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#315C3D]" />
                </a>
              </div>
            </div>

            {/* Fast Response Badge */}
            <div className="p-4 rounded-2xl bg-[#DCE8D9] border border-[#DDDCCF] text-xs text-[#202820] flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#315C3D] shrink-0" />
              <span>
                Average response time on WhatsApp &amp; Phone is <strong className="text-[#315C3D] font-bold">under 15 minutes</strong> during working hours.
              </span>
            </div>
          </div>
        </div>

        {/* Dedicated WhatsApp & Project Assistance Section */}
        <div className="pt-10">
          <CtaBanner />
        </div>
      </div>
    </div>
  );
}
