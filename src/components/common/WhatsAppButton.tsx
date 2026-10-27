"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  X,
  Sparkles,
  Send,
  PhoneCall,
  ArrowUpRight,
  GraduationCap,
  ClipboardList,
  ExternalLink
} from "lucide-react";
import {
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  getWhatsAppUrl,
  GOOGLE_ENQUIRY_FORM_URL
} from "@/lib/whatsapp";
import { PROJECT_CATEGORIES } from "@/data/projects";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetailedForm, setShowDetailedForm] = useState(false);
  const [category, setCategory] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [requirements, setRequirements] = useState("");

  const handleOpenWhatsApp = (customParams?: {
    category?: string;
    projectTitle?: string;
    college?: string;
    department?: string;
    requirements?: string;
  }) => {
    const url = getWhatsAppUrl({
      category: customParams?.category ?? category,
      projectTitle: customParams?.projectTitle ?? projectTitle,
      college: customParams?.college ?? college,
      department: customParams?.department ?? department,
      requirements: customParams?.requirements ?? requirements,
    });
    window.open(url, "_blank");
    setIsOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleOpenWhatsApp({
      category,
      projectTitle,
      college,
      department,
      requirements,
    });
  };

  const quickPrompts = [
    { label: "AI & Data Science Project", cat: "AI & Data Science", title: "Multimodal AI Diagnostic System" },
    { label: "Machine Learning / Deep Learning", cat: "Deep Learning", title: "Real-Time Object Detection / Vision Transformer" },
    { label: "Python / Computer Vision Project", cat: "Python Projects", title: "Driver Drowsiness / Landmark Tracker" },
    { label: "Java / Spring Boot Microservices", cat: "Java Projects", title: "Enterprise Cryptographic Audit System" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-84 sm:w-96 bg-white border border-[#FF6B00]/25 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#00A86B] via-[#00925C] to-teal-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                  <MessageCircle className="w-5 h-5 fill-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-300 border-2 border-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">AntiMatrix WhatsApp Desk</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Online: {WHATSAPP_DISPLAY}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-[#FFF9F5] max-h-[75vh] overflow-y-auto">
            <div className="p-3 rounded-xl bg-white border border-[#FF6B00]/15 text-xs text-[#101828] leading-relaxed shadow-2xs">
              👋 <strong className="text-[#FF6B00]">Hello Student!</strong> Discuss your project requirements, domain selection, or viva guidance directly with our mentors.
            </div>

            {/* Direct Quick WhatsApp Action Button */}
            <button
              onClick={() => handleOpenWhatsApp()}
              className="w-full py-3 px-4 rounded-xl bg-[#00A86B] hover:bg-[#00925C] text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Direct WhatsApp Chat ({WHATSAPP_DISPLAY})</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-auto text-emerald-200" />
            </button>

            {/* Google Form Project Enquiry Button inside popup */}
            <a
              href={GOOGLE_ENQUIRY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] hover:opacity-95 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs group"
            >
              <ClipboardList className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Fill Project Enquiry Google Form</span>
              <ExternalLink className="w-3.5 h-3.5 ml-auto text-white/80" />
            </a>

            {/* Toggle Detailed Form / Quick Inquiries */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[11px]">
              <button
                type="button"
                onClick={() => setShowDetailedForm(!showDetailedForm)}
                className="text-[#FF6B00] hover:text-[#D90429] font-bold flex items-center gap-1 cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>{showDetailedForm ? "Show Quick Inquiries" : "Fill Project Requirements Form"}</span>
              </button>
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="text-[#526581] hover:text-[#FF6B00] flex items-center gap-1 font-semibold font-mono"
              >
                <PhoneCall className="w-3 h-3 text-[#FF6B00]" />
                <span>Call Hotline</span>
              </a>
            </div>

            {showDetailedForm ? (
              /* Full Template Form matching WhatsApp template */
              <form onSubmit={handleFormSubmit} className="pt-2 space-y-2 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-[#526581] uppercase tracking-wider mb-0.5">
                    Project Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#101828] focus:outline-none focus:border-[#FF6B00]"
                  >
                    <option value="">Select Category...</option>
                    {PROJECT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#526581] uppercase tracking-wider mb-0.5">
                    Project Title / Topic Idea
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AI-Powered Healthcare Diagnosis"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#101828] placeholder-slate-400 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-[#526581] uppercase tracking-wider mb-0.5">
                      College
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anna Univ / SRM"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#101828] placeholder-slate-400 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#526581] uppercase tracking-wider mb-0.5">
                      Department
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CSE / IT / AI-DS"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#101828] placeholder-slate-400 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#526581] uppercase tracking-wider mb-0.5">
                    Specific Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Base paper, PPT, Complete Source Code & Viva handbook"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#101828] placeholder-slate-400 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#00A86B] hover:bg-[#00925C] text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                  <span>Send Requirements on WhatsApp</span>
                </button>
              </form>
            ) : (
              /* Quick Topic Suggestions */
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-[#526581] uppercase tracking-wider block font-mono">
                  Popular Topics:
                </span>
                {quickPrompts.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOpenWhatsApp({ category: item.cat, projectTitle: item.title })}
                    className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-[#FFF1E8] border border-slate-200 hover:border-[#FF6B00]/40 text-xs text-[#101828] hover:text-[#FF6B00] transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
                  >
                    <span className="line-clamp-1 font-medium">{item.label}</span>
                    <Sparkles className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF6B00] shrink-0 ml-1.5" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Buttons Container: [ Project Enquiry ] + [ WhatsApp Us ] */}
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2.5">
        {/* Project Enquiry Floating Button with Approved Orange-Red Gradient */}
        <a
          href={GOOGLE_ENQUIRY_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] hover:opacity-95 text-white shadow-xl shadow-[#FF6B00]/30 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white cursor-pointer font-bold text-xs"
          aria-label="Open Project Enquiry Google Form"
        >
          <ClipboardList className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          <span className="whitespace-nowrap font-medium">Project Enquiry</span>
          <ExternalLink className="w-3 h-3 text-white/80 opacity-80" />
        </a>

        {/* WhatsApp Floating Button with Success Green #00A86B */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-3.5 sm:p-4 rounded-full bg-[#00A86B] hover:bg-[#00925C] text-white shadow-xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center focus:outline-none border-2 border-white"
          aria-label="Open WhatsApp Support"
        >
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF6B00] text-white font-extrabold text-[10px] flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
            1
          </span>
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold font-sans group-hover:pl-2">
            WhatsApp Us
          </span>
        </button>
      </div>
    </div>
  );
}
