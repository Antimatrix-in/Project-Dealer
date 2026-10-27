"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, MessageCircle, Sparkles, PhoneCall } from "lucide-react";
import confetti from "canvas-confetti";
import { PROJECT_CATEGORIES } from "@/data/projects";
import { getWhatsAppUrl, WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

interface ConsultationEventDetail {
  projectTitle?: string;
  category?: string;
  serviceTitle?: string;
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

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<ConsultationEventDetail>;
      if (customEvent.detail) {
        setFormData((prev) => ({
          ...prev,
          projectTitle: customEvent.detail.projectTitle || prev.projectTitle,
          category: customEvent.detail.category || prev.category,
          requirement: customEvent.detail.serviceTitle
            ? `Interested in service: ${customEvent.detail.serviceTitle}`
            : prev.requirement,
        }));
      }
      setSubmitted(false);
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
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FF6B00", "#FF3D3D", "#D90429", "#00A86B"],
          });
        } catch (e) {}
      }
    } catch (err) {
      console.error(err);
      setSubmitted(true);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white border border-[#FF6B00]/25 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#FF6B00]/15 bg-[#FFF9F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] flex items-center justify-center text-white font-bold shadow-md shadow-[#FF6B00]/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#101828]">Get Project Consultation</h3>
              <p className="text-xs text-[#FF6B00] font-semibold font-mono">AntiMatrix Engineering Center</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-[#FF6B00] hover:bg-[#FFF1E8]/50 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00A86B] shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-2xl font-bold text-[#101828]">Consultation Request Received!</h4>
              <p className="text-[#526581] max-w-md mx-auto text-sm leading-relaxed">
                Thank you, <span className="text-[#FF6B00] font-semibold">{formData.name}</span>. An AntiMatrix domain project mentor has received your details and will call / message you on WhatsApp (<strong>{WHATSAPP_DISPLAY}</strong>) within 15 minutes. You can also send documentation directly to{" "}
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
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#00A86B] hover:bg-[#00925C] text-white font-bold text-sm transition-all shadow-md shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat Instantly on WhatsApp
                </button>
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FFF9F5] border border-slate-200 text-[#101828] hover:bg-[#FFF1E8] text-sm font-semibold transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#FF6B00]" />
                  Call {WHATSAPP_DISPLAY}
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#FFF1E8] border border-[#FF6B00]/25 rounded-xl p-3 text-xs text-[#101828] flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-[#FF6B00]" />
                <span>100% verified project guidance, standard base paper review, and free synopsis preparation.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101828] mb-1">
                    Student Name <span className="text-[#FF3D3D]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Karthik Rajan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#101828] placeholder-slate-400 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#101828] mb-1">
                    WhatsApp Number <span className="text-[#FF3D3D]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 91595 14326"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#101828] placeholder-slate-400 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101828] mb-1">
                    Email Address <span className="text-[#FF3D3D]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. student@college.edu"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#101828] placeholder-slate-400 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#101828] mb-1">
                    College / University
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="e.g. Anna University / SRM / VIT / VTU"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#101828] placeholder-slate-400 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101828] mb-1">
                    Degree / Branch
                  </label>
                  <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    placeholder="e.g. B.E CSE / B.Tech IT / M.Tech / MCA"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#101828] placeholder-slate-400 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#101828] mb-1">
                    Target Domain
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#101828] text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  >
                    <option value="">Select Domain...</option>
                    {PROJECT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#101828] mb-1">
                  Specific Project Title or Topic Idea (If any)
                </label>
                <input
                  type="text"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleChange}
                  placeholder="e.g. Multimodal Medical AI Diagnosis or Leave Blank for Suggestions"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#101828] placeholder-slate-400 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#101828] mb-1">
                    Target Review Deadline
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#101828] text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  >
                    <option value="Immediate (1-3 days)">Urgent Review (1 - 3 Days)</option>
                    <option value="1-2 Weeks">1 - 2 Weeks</option>
                    <option value="1 Month">1 Month</option>
                    <option value="Flexible">Semester Project / Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#101828] mb-1">
                    Specific Requirements or Questions
                  </label>
                  <input
                    type="text"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    placeholder="e.g. Need code + base paper + PPT"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#101828] placeholder-slate-400 text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] hover:opacity-95 text-white font-bold text-sm shadow-md shadow-[#FF6B00]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
                  className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-emerald-50 border border-[#00A86B]/30 text-[#00A86B] hover:bg-emerald-100 text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#00A86B]" />
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
