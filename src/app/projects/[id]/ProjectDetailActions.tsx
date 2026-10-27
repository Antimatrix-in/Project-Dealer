"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, MessageCircle, MonitorPlay, PhoneCall, ClipboardList, Mail } from "lucide-react";
import { openConsultationModal } from "@/components/common/ConsultationModal";
import { getWhatsAppUrl, WHATSAPP_NUMBER, WHATSAPP_DISPLAY, GOOGLE_ENQUIRY_FORM_URL } from "@/lib/whatsapp";

interface ProjectDetailActionsProps {
  projectTitle: string;
  category: string;
}

export default function ProjectDetailActions({
  projectTitle,
  category,
}: ProjectDetailActionsProps) {
  const whatsAppUrl = getWhatsAppUrl({
    category,
    projectTitle,
    requirements: "Need complete working source code, base paper, report, and viva guidance",
  });

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Primary WhatsApp Action */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="project-detail-whatsapp"
        className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer shadow-[#FF6B00]/25"
      >
        <MessageCircle className="w-4 h-4 text-white" />
        <span>Inquire on WhatsApp</span>
      </a>

      {/* Project Enquiry Button */}
      <button
        onClick={() =>
          openConsultationModal({
            projectTitle,
            category,
          })
        }
        id="project-detail-enquiry"
        className="px-5 py-3 rounded-xl bg-[#FFF1E8] hover:bg-[#FFE3D4] border border-[#FF6B00]/30 text-[#FF6B00] font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
      >
        <ClipboardList className="w-4 h-4 text-[#FF6B00]" />
        <span>Project Enquiry</span>
      </button>

      {/* Contact Us Page Link */}
      <Link
        href="/contact"
        id="project-detail-contact"
        className="px-5 py-3 rounded-xl bg-white hover:bg-[#FFF9F5] border border-slate-200 text-[#101828] hover:text-[#FF6B00] font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
      >
        <Mail className="w-4 h-4 text-[#FF6B00]" />
        <span>Contact Us</span>
      </Link>

      {/* Request Live Demo */}
      <button
        onClick={() =>
          openConsultationModal({
            projectTitle: `Live Demo: ${projectTitle}`,
            category,
          })
        }
        className="px-4 py-3 rounded-xl bg-white hover:bg-[#FFF9F5] border border-slate-200 text-[#526581] hover:text-[#101828] font-medium text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
      >
        <MonitorPlay className="w-4 h-4 text-[#526581]" />
        <span>Request Demo</span>
      </button>

      {/* Call Desk */}
      <a
        href={`tel:+${WHATSAPP_NUMBER}`}
        className="px-4 py-3 rounded-xl bg-white hover:bg-[#FFF9F5] border border-slate-200 text-[#526581] hover:text-[#101828] font-medium text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-xs"
      >
        <PhoneCall className="w-4 h-4 text-[#526581]" />
        <span>Call ({WHATSAPP_DISPLAY})</span>
      </a>
    </div>
  );
}
