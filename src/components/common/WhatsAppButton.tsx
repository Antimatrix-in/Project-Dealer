"use client";

import React, { useState } from "react";
import Link from "next/link";
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
        <div className="mb-3 w-84 sm:w-96 bg-[#FFFFFF] border border-[#DDDCCF] rounded-3xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#EEE9DC] border-b border-[#DDDCCF] text-[#202820] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#DCE8D9] border border-[#DDDCCF] flex items-center justify-center text-[#315C3D]">
                  <MessageCircle className="w-5 h-5 fill-[#315C3D]" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#315C3D] border-2 border-[#FFFFFF]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#202820]">AntiMatrix WhatsApp Desk</h4>
                <p className="text-[11px] text-[#667064] flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#315C3D] animate-pulse" />
                  Online: {WHATSAPP_DISPLAY}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-[#667064] hover:text-[#315C3D] hover:bg-[#DCE8D9] transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-[#FFFFFF] max-h-[75vh] overflow-y-auto">
            <div className="p-3 rounded-xl bg-[#EEE9DC] border border-[#DDDCCF] text-xs text-[#667064] leading-relaxed">
              👋 <strong className="text-[#202820]">Hello Student!</strong> Discuss your project requirements, domain selection, or viva guidance directly with our mentors.
            </div>

            {/* Direct Quick WhatsApp Action Button */}
            <button
              onClick={() => handleOpenWhatsApp()}
              className="w-full py-3 px-4 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Direct WhatsApp Chat ({WHATSAPP_DISPLAY})</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-auto text-white" />
            </button>

            {/* Google Form Project Enquiry Button inside popup */}
            <a
              href={GOOGLE_ENQUIRY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] border border-[#DDDCCF] hover:border-[#315C3D] text-[#315C3D] font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs group"
            >
              <ClipboardList className="w-4 h-4 text-[#315C3D] group-hover:scale-110 transition-transform" />
              <span>Fill Project Enquiry Google Form</span>
              <ExternalLink className="w-3.5 h-3.5 ml-auto text-[#667064]" />
            </a>

            {/* Toggle Detailed Form / Quick Inquiries */}
            <div className="flex items-center justify-between pt-1 border-t border-[#DDDCCF] text-[11px]">
              <button
                type="button"
                onClick={() => setShowDetailedForm(!showDetailedForm)}
                className="text-[#315C3D] hover:text-[#497A52] font-bold flex items-center gap-1 cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#315C3D]" />
                <span>{showDetailedForm ? "Show Quick Inquiries" : "Fill Project Requirements Form"}</span>
              </button>
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="text-[#667064] hover:text-[#315C3D] flex items-center gap-1 font-semibold font-mono"
              >
                <PhoneCall className="w-3 h-3 text-[#315C3D]" />
                <span>Call Hotline</span>
              </a>
            </div>

            {showDetailedForm ? (
              /* Full Template Form matching WhatsApp template */
              <form onSubmit={handleFormSubmit} className="pt-2 space-y-2 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-[#667064] uppercase tracking-wider mb-0.5 font-mono">
                    Project Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] focus:outline-none focus:border-[#315C3D]"
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
                  <label className="block text-[10px] font-bold text-[#667064] uppercase tracking-wider mb-0.5 font-mono">
                    Project Title / Topic Idea
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AI-Powered Healthcare Diagnosis"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-stone-400 focus:outline-none focus:border-[#315C3D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-[#667064] uppercase tracking-wider mb-0.5 font-mono">
                      College
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Anna Univ / SRM"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-stone-400 focus:outline-none focus:border-[#315C3D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#667064] uppercase tracking-wider mb-0.5 font-mono">
                      Department
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CSE / IT / AI-DS"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-stone-400 focus:outline-none focus:border-[#315C3D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#667064] uppercase tracking-wider mb-0.5 font-mono">
                    Specific Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Base paper, PPT, Complete Source Code & Viva handbook"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-stone-400 focus:outline-none focus:border-[#315C3D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                  <span>Send Requirements on WhatsApp</span>
                </button>
              </form>
            ) : (
              /* Quick Topic Suggestions */
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-[#667064] uppercase tracking-wider block font-mono">
                  Popular Topics:
                </span>
                {quickPrompts.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOpenWhatsApp({ category: item.cat, projectTitle: item.title })}
                    className="w-full text-left p-2.5 rounded-xl bg-[#F5F1E7] hover:bg-[#EEE9DC] border border-[#DDDCCF] hover:border-[#315C3D] text-xs text-[#667064] hover:text-[#202820] transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
                  >
                    <span className="line-clamp-1 font-medium">{item.label}</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#315C3D] shrink-0 ml-1.5" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Buttons Container: [ Project Enquiry ] + [ WhatsApp Us ] */}
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2.5">
        {/* Project Enquiry Floating Button */}
        <Link
          href="/project-enquiry"
          className="group flex items-center gap-2 px-4 py-3 rounded-full bg-[#315C3D] hover:bg-[#254930] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border border-[#315C3D] cursor-pointer font-bold text-xs"
          aria-label="Open Project Enquiry Desk"
        >
          <ClipboardList className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          <span className="whitespace-nowrap font-medium">Project Enquiry</span>
        </Link>

        {/* WhatsApp Floating Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-3.5 sm:p-4 rounded-full bg-[#315C3D] hover:bg-[#254930] text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center focus:outline-none border-2 border-[#497A52]"
          aria-label="Open WhatsApp Support"
        >
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#497A52] text-white font-extrabold text-[10px] flex items-center justify-center border border-white shadow-sm">
            1
          </span>
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold font-sans group-hover:pl-2 text-white">
            WhatsApp Us
          </span>
        </button>
      </div>
    </div>
  );
}
