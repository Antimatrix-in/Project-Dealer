"use client";

import React from "react";
import { Sparkles, MessageCircle, MonitorPlay, PhoneCall } from "lucide-react";
import { openConsultationModal } from "@/components/common/ConsultationModal";

interface ProjectDetailActionsProps {
  projectTitle: string;
  category: string;
}

export default function ProjectDetailActions({
  projectTitle,
  category,
}: ProjectDetailActionsProps) {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi AntiMatrix! I want the demo, base paper, and pricing details for the project:\n"${projectTitle}" (${category}).\nPlease send the abstract and synopsis.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={() =>
          openConsultationModal({
            projectTitle,
            category,
          })
        }
        className="px-6 py-3.5 rounded-xl btn-primary-gold text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
      >
        <MonitorPlay className="w-4 h-4 text-white" />
        <span>Contact for Live Demo</span>
      </button>

      <button
        onClick={handleWhatsApp}
        className="px-6 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-700 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
      >
        <MessageCircle className="w-4 h-4 text-emerald-600" />
        <span>WhatsApp Inquiry</span>
      </button>

      <a
        href="tel:+919876543210"
        className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#0F172A] font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-xs"
      >
        <PhoneCall className="w-4 h-4 text-[#F5A623]" />
        <span>Call Desk</span>
      </a>

      <button
        onClick={() =>
          openConsultationModal({
            projectTitle: `Customization: ${projectTitle}`,
            category,
          })
        }
        className="px-5 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#0F172A] font-medium text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4 text-[#F5A623]" />
        <span>Request Customization</span>
      </button>
    </div>
  );
}
