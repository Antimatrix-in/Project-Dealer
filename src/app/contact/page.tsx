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
  PhoneCall,
  ExternalLink
} from "lucide-react";
import confetti from "canvas-confetti";
import { PROJECT_CATEGORIES } from "@/data/projects";

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
            colors: ["#F59E0B", "#D97706", "#EAB308", "#10B981"],
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
    const text = encodeURIComponent(
      `Hi AntiMatrix! I want to discuss my academic project:\n` +
      `• Name: ${formData.name || "Student"}\n` +
      `• College: ${formData.college || "Engineering College"}\n` +
      `• Domain: ${formData.category || "Academic Project"}\n` +
      `• Requirements: ${formData.requirement || formData.message || "Need guidance"}`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <div className="pt-28 pb-20 bg-[#050914] min-h-screen">
      {/* Background Header */}
      <div className="relative py-12 overflow-hidden bg-grid-navy border-b border-amber-500/10 mb-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-amber-500/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeader
            badge="Get In Touch"
            title="Connect with Our"
            titleGradient="Project Mentors"
            subtitle="Schedule a free technical consultation, discuss your college guide's requirements, or request a live working project demonstration."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Contact Information Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#0A1128] border border-amber-500/20 space-y-3 hover:border-amber-400/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Phone className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Call Support</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct hotline for immediate academic counseling.
            </p>
            <div className="pt-1">
              <a
                href="tel:+919876543210"
                className="text-xs font-mono font-bold text-amber-400 hover:underline block"
              >
                +91 98765 43210
              </a>
              <a
                href="tel:+919876543211"
                className="text-xs font-mono font-bold text-amber-400 hover:underline block"
              >
                +91 98765 43211
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A1128] border border-amber-500/20 space-y-3 hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">WhatsApp Helpline</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instant responses, base paper sharing, and screenshots.
            </p>
            <div className="pt-1">
              <button
                onClick={handleWhatsAppDirect}
                className="text-xs font-bold text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Chat on WhatsApp &rarr;</span>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A1128] border border-amber-500/20 space-y-3 hover:border-yellow-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-yellow-950/60 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Email Desk</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Send your synopsis drafts, problem statements, and requirements.
            </p>
            <div className="pt-1">
              <a
                href="mailto:projects@antimatrix.tech"
                className="text-xs font-bold text-yellow-400 hover:underline"
              >
                projects@antimatrix.tech
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0A1128] border border-amber-500/20 space-y-3 hover:border-amber-400/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Operating Hours</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mon - Sat: 9:00 AM - 9:00 PM IST
            </p>
            <p className="text-[11px] text-amber-400 font-medium">
              *Emergency review support during university exam weeks.
            </p>
          </div>
        </div>

        {/* Main Section: Contact Form + Headquarters & Map Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left Form (3 Cols) */}
          <div className="lg:col-span-3 p-8 sm:p-10 rounded-3xl bg-[#0A1128] border border-amber-500/30 backdrop-blur-xl shadow-2xl">
            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 border border-amber-500/30 text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Project Requirement Form</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Send Us Your Project Details</h3>
              <p className="text-xs text-slate-400">
                Fill in the details below and an AntiMatrix domain mentor will get in touch with you shortly.
              </p>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-white">Thank You, {formData.name}!</h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Your project requirements have been transmitted to our academic engineering cell. We will call and message you on WhatsApp within 15 minutes.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Follow Up on WhatsApp
                  </button>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-[#060B18] hover:bg-[#0E1738] text-white font-semibold text-xs border border-white/10"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Karthik Rajan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-amber-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      WhatsApp / Phone Number <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-amber-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. student@college.edu"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-amber-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      College / University
                    </label>
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      placeholder="e.g. Anna University / SRM / VIT"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-amber-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Degree & Branch
                    </label>
                    <input
                      type="text"
                      name="degree"
                      value={formData.degree}
                      onChange={handleChange}
                      placeholder="e.g. B.E CSE / B.Tech IT / M.Tech"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-amber-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Project Domain (10 Categories)
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-amber-500/20 text-white text-sm focus:outline-none focus:border-amber-400"
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
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Project Requirement / Title Idea
                  </label>
                  <input
                    type="text"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    placeholder="e.g. Need Final Year Deep Learning X-Ray project with base paper & PPT"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-amber-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Detailed Message or Guide Instructions
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe any specific guidelines, review deadlines, or tools requested by your college guide..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060B18] border border-amber-500/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-slate-950" />
                        <span>Submit Project Requirement</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="py-3.5 px-5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/30 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Directly</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Google Maps Location & Center Details (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Center Location Card */}
            <div className="p-6 rounded-3xl bg-[#0A1128] border border-amber-500/20 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                <Building2 className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">AntiMatrix Project Center</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                AntiMatrix Tech Innovation Tower, Cyber IT Hub, Rajiv Gandhi Salai (OMR), Chennai, Tamil Nadu - 600096
              </p>
              <div className="text-xs text-slate-400 space-y-1">
                <p>📍 Landmark: Near IT Tech Park Metro & TIDEL Park</p>
                <p>🚆 5 mins from Taramani Railway Station</p>
              </div>
            </div>

            {/* Interactive Styled Google Maps Mockup Section */}
            <div className="rounded-3xl bg-[#0A1128] border border-amber-500/30 overflow-hidden shadow-2xl relative group">
              <div className="h-64 sm:h-72 w-full bg-[#060B18] relative flex flex-col items-center justify-center p-6 text-center">
                {/* Visual Map Grid Pattern */}
                <div className="absolute inset-0 bg-grid-navy opacity-50" />

                {/* Map Roads & Contours graphic mock */}
                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 50 Q 150 120 300 80 T 600 150" fill="none" stroke="#F59E0B" strokeWidth="3" />
                  <path d="M 50 0 Q 180 200 120 400" fill="none" stroke="#3B82F6" strokeWidth="2" />
                  <path d="M 200 300 Q 350 200 500 250" fill="none" stroke="#EAB308" strokeWidth="2" />
                </svg>

                {/* Center Pin Marker */}
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <div className="p-3 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-500 text-slate-950 shadow-xl shadow-amber-500/50">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="w-3 h-1.5 rounded-full bg-amber-400/40 blur-[1px] mt-1" />
                </div>

                <div className="relative z-10 mt-3 space-y-1">
                  <h4 className="text-sm font-bold text-white">AntiMatrix Cyber Tech Hub</h4>
                  <p className="text-[11px] text-amber-300 font-mono">OMR IT Corridor, Chennai</p>
                </div>

                <a
                  href="https://maps.google.com/?q=OMR+IT+Corridor+Chennai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-4 py-2 rounded-xl bg-[#0A1128] hover:bg-[#0E1738] border border-amber-500/25 text-white text-xs font-semibold z-10 flex items-center gap-1.5 shadow-md"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
              </div>
            </div>

            {/* Fast Response Badge */}
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/25 text-xs text-slate-300 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                Average response time on WhatsApp & Phone is <strong className="text-amber-300 font-bold">under 15 minutes</strong> during working hours.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
