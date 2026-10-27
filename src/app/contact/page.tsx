"use client";

import React, { useState } from "react";
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
  ClipboardList
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.6 },
            colors: ["#FF6B00", "#FF3D3D", "#D90429", "#00A86B"],
          });
        } catch (e) {}
      }
    } catch (err) {
      setSubmitted(true);
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
    <div className="pt-28 pb-20 bg-[#FFF9F5] min-h-screen">
      {/* Background Header */}
      <div className="relative py-16 bg-[#FFF1E8]/70 border-b border-[#FF6B00]/15 mb-12 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#FF6B00]/08 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#FF3D3D]/06 rounded-full blur-3xl pointer-events-none" />

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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00A86B] hover:bg-[#00925C] text-white font-bold text-xs shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>WhatsApp Now</span>
            </a>

            <a
              href={GOOGLE_ENQUIRY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] hover:opacity-95 text-white font-bold text-xs shadow-sm transition-all hover:scale-105 active:scale-95 group border border-[#FF3D3D]/30"
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
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-[#FF6B00]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#FFF1E8] border border-[#FF6B00]/25 flex items-center justify-center text-[#FF6B00]">
              <Phone className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#101828]">Call Support</h4>
            <p className="text-xs text-[#526581] leading-relaxed">
              Direct hotline for immediate project counseling.
            </p>
            <div className="pt-1">
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="text-xs font-mono font-bold text-[#FF6B00] hover:underline block"
              >
                {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-[#00A86B]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-[#00A86B]/30 flex items-center justify-center text-[#00A86B]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#101828]">WhatsApp Helpline</h4>
            <p className="text-xs text-[#526581] leading-relaxed">
              Instant responses, base paper sharing, and screenshots.
            </p>
            <div className="pt-1">
              <button
                onClick={handleWhatsAppDirect}
                className="text-xs font-bold text-[#00A86B] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Chat on WhatsApp &rarr;</span>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-[#FF3D3D]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#FFF1E8] border border-[#FF3D3D]/25 flex items-center justify-center text-[#FF3D3D]">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#101828]">Email Desk</h4>
            <p className="text-xs text-[#526581] leading-relaxed">
              Send your synopsis drafts, problem statements, and requirements.
            </p>
            <div className="pt-1">
              <a
                href="mailto:projects@antimatrix.co.in"
                className="text-xs font-bold text-[#FF6B00] hover:underline"
              >
                projects@antimatrix.co.in
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-[#FF6B00]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#FFF9F5] border border-slate-200 flex items-center justify-center text-[#101828]">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#101828]">Operating Hours</h4>
            <p className="text-xs text-[#526581] leading-relaxed">
              Mon - Sat: 9:00 AM - 9:00 PM IST
            </p>
            <p className="text-[11px] text-[#FF6B00] font-medium">
              *Emergency review support during university exam weeks.
            </p>
          </div>
        </div>

        {/* Main Section: Contact Form + Headquarters & Map Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left Form (3 Cols) */}
          <div className="lg:col-span-3 p-8 sm:p-10 rounded-3xl bg-white border border-[#FF6B00]/20 shadow-[0_4px_25px_-4px_rgba(255,107,0,0.06)]">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF1E8] border border-[#FF6B00]/25 text-[#FF6B00] font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>Project Requirement Form</span>
                </div>
                <h3 className="text-2xl font-bold text-[#101828]">Send Us Your Project Details</h3>
                <p className="text-xs text-[#526581]">
                  Fill in the details below or open Google Forms to submit project requirements.
                </p>
              </div>

              {/* Project Enquiry (Google Form CTA) */}
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] hover:opacity-95 text-white text-xs font-bold transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 group shrink-0 border border-[#FF3D3D]/30"
              >
                <ClipboardList className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Project Enquiry</span>
                <ExternalLink className="w-3 h-3 text-white/80 ml-0.5" />
              </a>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-[#00A86B] flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-[#101828]">Thank You, {formData.name}!</h4>
                <p className="text-sm text-[#526581] max-w-md mx-auto leading-relaxed">
                  Your project requirements have been transmitted to our engineering cell in Chennai, Tamil Nadu. Our domain mentors will call and message you on WhatsApp (<strong>+91 91595 14326</strong>) within 15 minutes. You can also email synopsis files and base papers to{" "}
                  <a
                    href="mailto:projects@antimatrix.co.in"
                    className="text-[#00A86B] font-bold hover:underline"
                  >
                    projects@antimatrix.co.in
                  </a>.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="px-6 py-3 rounded-xl bg-[#00A86B] hover:bg-[#00925C] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Follow Up on WhatsApp
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-[#FFF9F5] hover:bg-[#FFF1E8] text-[#101828] font-semibold text-xs border border-slate-200"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#101828] mb-1">
                      Full Name <span className="text-[#FF3D3D]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Karthik Rajan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-slate-200 text-[#101828] placeholder-slate-400 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#101828] mb-1">
                      WhatsApp / Phone Number <span className="text-[#FF3D3D]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 91595 14326"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-slate-200 text-[#101828] placeholder-slate-400 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#101828] mb-1">
                      Email Address <span className="text-[#FF3D3D]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. student@college.edu"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-slate-200 text-[#101828] placeholder-slate-400 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#101828] mb-1">
                      College / University
                    </label>
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      placeholder="e.g. Anna University / SRM / VIT"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-slate-200 text-[#101828] placeholder-slate-400 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#101828] mb-1">
                      Degree &amp; Branch
                    </label>
                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      placeholder="e.g. B.E CSE / B.Tech IT / M.Tech"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-slate-200 text-[#101828] placeholder-slate-400 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#101828] mb-1">
                      Project Domain (10 Categories)
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-slate-200 text-[#101828] text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] focus:bg-white"
                    >
                      <option value="">Select Domain...</option>
                      {PROJECT_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101828] mb-1">
                    Project Requirement / Title Idea
                  </label>
                  <input
                    type="text"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    placeholder="e.g. Need Final Year Deep Learning X-Ray project with base paper & PPT"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-slate-200 text-[#101828] placeholder-slate-400 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101828] mb-1">
                    Detailed Message or Guide Instructions
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe any specific guidelines, review deadlines, or tools requested by your college guide..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F5] border border-slate-200 text-[#101828] placeholder-slate-400 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] focus:bg-white"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] hover:opacity-95 text-white font-bold text-sm shadow-md shadow-[#FF6B00]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
                    className="py-3.5 px-5 rounded-xl bg-emerald-50 border border-[#00A86B]/30 text-[#00A86B] hover:bg-emerald-100 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#00A86B]" />
                    <span>WhatsApp Directly</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Headquarters & Map Preview (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Center Location Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#FF6B00]/20 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#FF6B00]" />
                  <h3 className="text-base font-bold text-[#101828]">AntiMatrix Project Center</h3>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFF1E8] border border-[#FF6B00]/25 text-[#FF6B00] font-mono">
                  <MapPin className="w-3 h-3 text-[#FF6B00]" />
                  Chennai, Tamil Nadu
                </span>
              </div>
              <p className="text-xs font-semibold text-[#101828] leading-relaxed">
                Chennai, Tamil Nadu
              </p>
              <div className="text-xs text-[#526581] space-y-1">
                <p>📍 Location: Chennai, Tamil Nadu, India</p>
                <p>🚆 Remote &amp; Direct Mentorship Support Available</p>
              </div>
            </div>

            {/* Interactive Styled Google Maps Card */}
            <div className="rounded-3xl bg-white border border-[#FF6B00]/20 overflow-hidden shadow-xs relative group">
              <div className="w-full h-64 sm:h-72 relative bg-slate-100">
                <iframe
                  title="AntiMatrix Project Center - Chennai, Tamil Nadu"
                  src="https://maps.google.com/maps?q=Chennai,+Tamil+Nadu&t=&z=12&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute top-3 left-3 z-10 pointer-events-none">
                  <div className="px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm border border-slate-200 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse" />
                    <span className="text-xs font-bold text-[#101828]">Chennai, Tamil Nadu</span>
                  </div>
                </div>
              </div>
              <div className="p-3.5 bg-[#FFF9F5] border-t border-[#FF6B00]/15 flex items-center justify-between">
                <div className="text-left">
                  <p className="text-xs font-bold text-[#101828]">AntiMatrix Project Center</p>
                  <p className="text-[11px] text-[#FF6B00] font-mono">Chennai, Tamil Nadu</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Chennai,+Tamil+Nadu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#FFF1E8] border border-slate-200 text-[#101828] hover:text-[#FF6B00] text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#FF6B00]" />
                </a>
              </div>
            </div>

            {/* Fast Response Badge */}
            <div className="p-4 rounded-2xl bg-[#FFF1E8] border border-[#FF6B00]/25 text-xs text-[#101828] flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#FF6B00] shrink-0" />
              <span>
                Average response time on WhatsApp &amp; Phone is <strong className="text-[#FF6B00] font-bold">under 15 minutes</strong> during working hours.
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
