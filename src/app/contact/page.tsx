"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(GOOGLE_ENQUIRY_FORM_URL, "_blank", "noopener,noreferrer");
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
    <div className="pt-32 sm:pt-36 pb-20 bg-[#F4F6FA] min-h-screen text-[#263750]">
      {/* Background Header */}
      <div className="relative py-16 bg-white border-b border-[#DCE2EA] mb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeader
            badge="UPWORKS Support Cell"
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F4F6FA] text-[#101D38] hover:text-[#F58216] font-bold text-xs shadow-xs border border-[#DCE2EA] hover:border-[#F58216] transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#F58216]" />
              <span>WhatsApp Now</span>
            </a>

            <a
              href={GOOGLE_ENQUIRY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F58216] hover:bg-[#E0720F] text-white font-bold text-xs shadow-xs hover:shadow-md transition-all group border border-[#F58216]"
            >
              <ClipboardList className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Fill Project Enquiry Form</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/80 ml-0.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1780px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 space-y-16">
        {/* Contact Information Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DCE2EA] shadow-xs space-y-3 hover:border-[#F58216] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#FFF5EB] border border-[#FED7AA] flex items-center justify-center text-[#F58216]">
              <Phone className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#101D38]">Call Support</h4>
            <p className="text-xs text-[#5A6B82] leading-relaxed">
              Direct hotline for immediate project counseling.
            </p>
            <div className="pt-1">
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="text-xs font-mono font-bold text-[#F58216] hover:underline block"
              >
                {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DCE2EA] shadow-xs space-y-3 hover:border-[#F58216] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#FFF5EB] border border-[#FED7AA] flex items-center justify-center text-[#F58216]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#101D38]">WhatsApp Helpline</h4>
            <p className="text-xs text-[#5A6B82] leading-relaxed">
              Instant responses, base paper sharing, and screenshots.
            </p>
            <div className="pt-1">
              <button
                onClick={handleWhatsAppDirect}
                className="text-xs font-bold text-[#F58216] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Chat on WhatsApp &rarr;</span>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DCE2EA] shadow-xs space-y-3 hover:border-[#F58216] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#FFF5EB] border border-[#FED7AA] flex items-center justify-center text-[#F58216]">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#101D38]">Email Desk</h4>
            <p className="text-xs text-[#5A6B82] leading-relaxed">
              Send your synopsis drafts, problem statements, and requirements.
            </p>
            <div className="pt-1">
              <a
                href="mailto:projects@antimatrix.co.in"
                className="text-xs font-bold text-[#F58216] hover:underline"
              >
                projects@antimatrix.co.in
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DCE2EA] shadow-xs space-y-3 hover:border-[#F58216] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#FFF5EB] border border-[#FED7AA] flex items-center justify-center text-[#F58216]">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#101D38]">Operating Hours</h4>
            <p className="text-xs text-[#5A6B82] leading-relaxed">
              Mon - Sat: 9:00 AM - 9:00 PM IST
            </p>
            <p className="text-[11px] text-[#F58216] font-medium">
              *Emergency review support during university exam weeks.
            </p>
          </div>
        </div>

        {/* Main Section: Contact Form + Headquarters & Map Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left Form (3 Cols) */}
          <div className="lg:col-span-3 p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#DCE2EA] shadow-xs">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCE2EA]">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF5EB] border border-[#FED7AA] text-[#F58216] font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-[#F58216]" />
                  <span>Project Requirement Form</span>
                </div>
                <h3 className="text-2xl font-bold text-[#101D38]">Send Us Your Project Details</h3>
                <p className="text-xs text-[#5A6B82]">
                  Fill in the contact form below or visit our dedicated Project Enquiry desk.
                </p>
              </div>

              {/* Project Enquiry (Google Form CTA) */}
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#101D38] hover:bg-[#1A2C50] text-white text-xs font-bold transition-all shadow-xs group shrink-0 border border-[#101D38]"
              >
                <ClipboardList className="w-4 h-4 text-[#F58216] group-hover:scale-110 transition-transform" />
                <span>Project Enquiry Form</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80 ml-0.5" />
              </a>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FFF5EB] border border-[#FED7AA] text-[#F58216] flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-[#101D38]">Thank You, {formData.name}!</h4>
                <p className="text-sm text-[#263750] max-w-md mx-auto leading-relaxed">
                  Your project requirements have been transmitted to our engineering cell in Chennai, Tamil Nadu. Our domain mentors will call and message you on WhatsApp (<strong className="text-[#101D38]">+91 91595 14326</strong>) within 15 minutes.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="px-6 py-3 rounded-xl bg-[#F58216] hover:bg-[#E0720F] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer border border-[#F58216]"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    Follow Up on WhatsApp
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F4F6FA] text-[#101D38] font-semibold text-xs border border-[#DCE2EA] cursor-pointer"
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
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 shadow-xs animate-in fade-in duration-200">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#101D38] mb-1">
                      Full Name <span className="text-[#F58216]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Karthik Rajan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F6FA] border border-[#DCE2EA] text-[#101D38] placeholder-slate-400 text-sm focus:outline-none focus:border-[#F58216] focus:ring-1 focus:ring-[#F58216]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#101D38] mb-1">
                      WhatsApp / Phone Number <span className="text-[#F58216]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 91595 14326"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F6FA] border border-[#DCE2EA] text-[#101D38] placeholder-slate-400 text-sm focus:outline-none focus:border-[#F58216] focus:ring-1 focus:ring-[#F58216]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#101D38] mb-1">
                      Email Address <span className="text-[#F58216]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. student@college.edu"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F6FA] border border-[#DCE2EA] text-[#101D38] placeholder-slate-400 text-sm focus:outline-none focus:border-[#F58216] focus:ring-1 focus:ring-[#F58216]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#101D38] mb-1">
                      College / University
                    </label>
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      placeholder="e.g. Anna University / SRM / VIT"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F6FA] border border-[#DCE2EA] text-[#101D38] placeholder-slate-400 text-sm focus:outline-none focus:border-[#F58216] focus:ring-1 focus:ring-[#F58216]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#101D38] mb-1">
                      Degree &amp; Branch
                    </label>
                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      placeholder="e.g. B.E CSE / B.Tech IT / M.Tech"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F6FA] border border-[#DCE2EA] text-[#101D38] placeholder-slate-400 text-sm focus:outline-none focus:border-[#F58216] focus:ring-1 focus:ring-[#F58216]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#101D38] mb-1">
                      Project Technical Domain (16 Domains)
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F6FA] border border-[#DCE2EA] text-[#101D38] text-sm focus:outline-none focus:border-[#F58216] focus:ring-1 focus:ring-[#F58216]"
                    >
                      <option value="" className="bg-white text-[#101D38]">Select Domain...</option>
                      {PROJECT_CATEGORIES.map((c) => (
                        <option key={c} value={c} className="bg-white text-[#101D38]">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101D38] mb-1">
                    Project Requirement / Title Idea
                  </label>
                  <input
                    type="text"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    placeholder="e.g. Need Final Year Deep Learning X-Ray project with base paper & PPT"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F6FA] border border-[#DCE2EA] text-[#101D38] placeholder-slate-400 text-sm focus:outline-none focus:border-[#F58216] focus:ring-1 focus:ring-[#F58216]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101D38] mb-1">
                    Detailed Message or Guide Instructions
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe any specific guidelines, review deadlines, or tools requested by your college guide..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F6FA] border border-[#DCE2EA] text-[#101D38] placeholder-slate-400 text-sm focus:outline-none focus:border-[#F58216] focus:ring-1 focus:ring-[#F58216]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={GOOGLE_ENQUIRY_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#F58216] hover:bg-[#E0720F] text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#F58216]"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>Submit Project Requirement</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="py-3.5 px-5 rounded-xl bg-[#FFFFFF] hover:bg-[#F4F6FA] border border-[#DCE2EA] hover:border-[#F58216] text-[#101D38] hover:text-[#F58216] text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 text-[#F58216]" />
                    <span>WhatsApp Directly</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Headquarters & Map Preview (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Center Location Card */}
            <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DCE2EA] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE2EA]">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#F58216]" />
                  <h3 className="text-base font-bold text-[#101D38]">UPWORKS</h3>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFF5EB] border border-[#FED7AA] text-[#F58216] font-mono">
                  <MapPin className="w-3 h-3 text-[#F58216]" />
                  Chennai, Tamil Nadu
                </span>
              </div>
              <p className="text-xs font-semibold text-[#101D38] leading-relaxed">
                Chennai, Tamil Nadu
              </p>
              <div className="text-xs text-[#5A6B82] space-y-1">
                <p>📍 Location: Chennai, Tamil Nadu, India</p>
                <p>🚆 Remote &amp; Direct Mentorship Support Available</p>
              </div>
            </div>

            {/* Interactive Styled Google Maps Card */}
            <div className="rounded-3xl bg-[#FFFFFF] border border-[#DCE2EA] overflow-hidden shadow-xs relative group">
              <div className="w-full h-64 sm:h-72 relative bg-[#F4F6FA]">
                <iframe
                  title="UPWORKS - Chennai, Tamil Nadu"
                  src="https://maps.google.com/maps?q=Chennai,+Tamil+Nadu&t=&z=12&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-3 left-3 z-10 pointer-events-none">
                  <div className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-xs border border-[#DCE2EA] shadow-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F58216] animate-pulse" />
                    <span className="text-xs font-bold text-[#101D38]">Chennai, Tamil Nadu</span>
                  </div>
                </div>
              </div>
              <div className="p-3.5 bg-[#FFFFFF] border-t border-[#DCE2EA] flex items-center justify-between">
                <div className="text-left">
                  <p className="text-xs font-bold text-[#101D38]">UPWORKS</p>
                  <p className="text-[11px] text-[#F58216] font-mono">Chennai, Tamil Nadu</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Chennai,+Tamil+Nadu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-[#F4F6FA] hover:bg-[#FFF5EB] border border-[#DCE2EA] hover:border-[#F58216] text-[#101D38] hover:text-[#F58216] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#F58216]" />
                </a>
              </div>
            </div>

            {/* Fast Response Badge */}
            <div className="p-4 rounded-2xl bg-[#FFF5EB] border border-[#FED7AA] text-xs text-[#101D38] flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#F58216] shrink-0" />
              <span>
                Average response time on WhatsApp &amp; Phone is <strong className="text-[#F58216] font-bold">under 15 minutes</strong> during working hours.
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
