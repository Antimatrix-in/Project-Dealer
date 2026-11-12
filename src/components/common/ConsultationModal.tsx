"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, MessageCircle, Sparkles, PhoneCall, ShieldCheck, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { PROJECT_CATEGORIES } from "@/data/projects";
import { getWhatsAppUrl, WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

interface ConsultationEventDetail {
  projectTitle?: string;
  category?: string;
  serviceTitle?: string;
  requirement?: string;
  source?: string;
}

export function openConsultationModal(details?: ConsultationEventDetail) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-consultation-modal", { detail: details || {} }));
  }
}

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Anti-bot metadata
  const [renderedAt, setRenderedAt] = useState<number>(0);
  const [honeypot, setHoneypot] = useState("");
  const [honeypotCompany, setHoneypotCompany] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    degree: "",
    category: "",
    projectTitle: "",
    requirement: "",
    urgency: "1-2 Weeks",
  });

  const [customSource, setCustomSource] = useState<string>("Custom Requirement");

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<ConsultationEventDetail>;
      if (customEvent.detail) {
        setCustomSource(customEvent.detail.source || "Custom Requirement");
        setFormData((prev) => ({
          ...prev,
          projectTitle: customEvent.detail.projectTitle || prev.projectTitle,
          category: customEvent.detail.category || prev.category,
          requirement:
            customEvent.detail.requirement ||
            (customEvent.detail.serviceTitle
              ? `Interested in service: ${customEvent.detail.serviceTitle}`
              : prev.requirement),
        }));
      } else {
        setCustomSource("Custom Requirement");
      }
      setSubmitted(false);
      setErrorMessage("");
      setHoneypot("");
      setHoneypotCompany("");
      setRenderedAt(Date.now());
      setIsOpen(true);
    };

    window.addEventListener("open-consultation-modal", handleOpen);
    return () => window.removeEventListener("open-consultation-modal", handleOpen);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Client-side quick checks
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage("Please enter your name (at least 2 characters).");
      return;
    }

    const digitsOnly = formData.phone.replace(/\D/g, "");
    if (digitsOnly.length < 8) {
      setErrorMessage("Please provide a valid contact number (8-16 digits).");
      return;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: customSource || "Custom Requirement",
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
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#101D38", "#F58216", "#FFF5EB", "#FFFFFF"],
          });
        } catch (e) {}
      } else {
        setErrorMessage(data.error || "Submission failed. Please check your entries.");
      }
    } catch (err: any) {
      setErrorMessage("Connection issue. Please try again or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const url = getWhatsAppUrl({
      category: formData.category,
      projectTitle: formData.projectTitle,
      college: formData.college,
      department: formData.degree,
      requirements: formData.requirement || `Target deadline: ${formData.urgency}`,
    });
    window.open(url, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#DCE2EA] rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1A2C50] bg-[#101D38] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F58216] flex items-center justify-center text-white font-bold shadow-xs">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Request a Requirement &amp; Consultation</h3>
              <p className="text-xs text-[#DCE2EA]">
                Submit custom project specifications, unique domain topics, or special requests directly to admin
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl text-[#DCE2EA] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto bg-white">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FFF5EB] border border-[#FED7AA] text-[#F58216] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-[#101D38]">Requirement Request Received!</h4>
              <p className="text-[#263750] max-w-md mx-auto text-sm leading-relaxed">
                Thank you, <span className="text-[#F58216] font-semibold">{formData.name}</span>. Your custom requirement has been submitted to UPWORKS and assigned to our domain review team. A project coordinator will contact you on WhatsApp (<strong>{WHATSAPP_DISPLAY}</strong>) within 15 minutes.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleWhatsAppDirect}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F58216] hover:bg-[#E0720F] text-white font-bold text-sm transition-all shadow-xs cursor-pointer border border-[#F58216]"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat Instantly on WhatsApp
                </button>
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FFFFFF] border border-[#DCE2EA] text-[#101D38] hover:text-[#F58216] hover:border-[#F58216] text-sm font-semibold transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#F58216]" />
                  Call {WHATSAPP_DISPLAY}
                </a>
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

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 shadow-xs animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{errorMessage}</span>
                </div>
              )}

              <div className="bg-[#FFF5EB] border border-[#FED7AA] rounded-xl p-3 text-xs text-[#F58216] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 text-[#F58216]" />
                  <span>100% verified project guidance, standard base paper review, and free synopsis preparation.</span>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] bg-white/80 px-2 py-0.5 rounded text-[#F58216] shrink-0 border border-[#FED7AA]">
                  <ShieldCheck className="w-3 h-3" />
                  Anti-Bot Protected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101D38] mb-1">
                    Student Name <span className="text-[#F58216]">*</span>
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
                  <label className="block text-xs font-semibold text-[#101D38] mb-1">
                    WhatsApp Number <span className="text-[#F58216]">*</span>
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
                  <label className="block text-xs font-semibold text-[#101D38] mb-1">
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
                  <label className="block text-xs font-semibold text-[#101D38] mb-1">
                    College / University
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="e.g. Anna University / SRM / VIT / VTU"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F6FA] border border-[#DCE2EA] text-[#101D38] placeholder-slate-400 text-sm focus:outline-none focus:border-[#F58216] focus:ring-1 focus:ring-[#F58216]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101D38] mb-1">
                    Degree / Branch
                  </label>
                  <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    placeholder="e.g. B.E CSE / B.Tech IT / M.Tech / MCA"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F6FA] border border-[#DCE2EA] text-[#101D38] placeholder-slate-400 text-sm focus:outline-none focus:border-[#F58216] focus:ring-1 focus:ring-[#F58216]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#101D38] mb-1">
                    Target Domain
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F6FA] border border-[#DCE2EA] text-[#101D38] text-sm focus:outline-none focus:border-[#F58216] focus:ring-1 focus:ring-[#F58216]"
                  >
                    <option value="" className="bg-[#FFFFFF]">Select Domain...</option>
                    {PROJECT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#FFFFFF]">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#101D38] mb-1">
                  Specific Project Title or Topic Idea (If any)
                </label>
                <input
                  type="text"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleChange}
                  placeholder="e.g. Multimodal Medical AI Diagnosis or Leave Blank for Suggestions"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F6FA] border border-[#DCE2EA] text-[#101D38] placeholder-slate-400 text-sm focus:outline-none focus:border-[#F58216] focus:ring-1 focus:ring-[#F58216]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101D38] mb-1">
                    Target Review Deadline
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F6FA] border border-[#DCE2EA] text-[#101D38] text-sm focus:outline-none focus:border-[#F58216] focus:ring-1 focus:ring-[#F58216]"
                  >
                    <option value="Immediate (1-3 days)" className="bg-[#FFFFFF]">Urgent Review (1 - 3 Days)</option>
                    <option value="1-2 Weeks" className="bg-[#FFFFFF]">1 - 2 Weeks</option>
                    <option value="1 Month" className="bg-[#FFFFFF]">1 Month</option>
                    <option value="Flexible" className="bg-[#FFFFFF]">Semester Project / Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#101D38] mb-1">
                    Specific Requirements or Questions
                  </label>
                  <input
                    type="text"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    placeholder="e.g. Need code + base paper + PPT"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F6FA] border border-[#DCE2EA] text-[#101D38] placeholder-slate-400 text-sm focus:outline-none focus:border-[#F58216] focus:ring-1 focus:ring-[#F58216]"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#F58216] hover:bg-[#E0720F] text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-[#F58216]"
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" />
                      Submit Consultation Request
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-[#FFFFFF] hover:bg-[#F4F6FA] border border-[#DCE2EA] hover:border-[#F58216] text-[#101D38] hover:text-[#F58216] text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#F58216]" />
                  WhatsApp Direct
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
