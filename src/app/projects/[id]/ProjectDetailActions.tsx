"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, MonitorPlay, PhoneCall, ClipboardList, Mail } from "lucide-react";
import { openConsultationModal } from "@/components/common/ConsultationModal";
import { getWhatsAppUrl, WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

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
        className="px-5 py-3 rounded-xl bg-[#244B35] hover:bg-[#1D3D2B] text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer border border-[#244B35]"
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
        className="px-5 py-3 rounded-xl bg-[#FFFDF7] hover:bg-[#EFEBDD] border border-[#DCDCCF] hover:border-[#244B35] text-[#244B35] font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
      >
        <ClipboardList className="w-4 h-4 text-[#244B35]" />
        <span>Project Enquiry</span>
      </button>

      {/* Contact Us Page Link */}
      <Link
        href="/contact"
        id="project-detail-contact"
        className="px-5 py-3 rounded-xl bg-[#FFFDF7] hover:bg-[#EFEBDD] border border-[#DCDCCF] hover:border-[#244B35] text-[#202820] hover:text-[#244B35] font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
      >
        <Mail className="w-4 h-4 text-[#244B35]" />
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
        className="px-4 py-3 rounded-xl bg-[#FFFDF7] hover:bg-[#EFEBDD] border border-[#DCDCCF] hover:border-[#244B35] text-[#626B60] hover:text-[#202820] font-medium text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
      >
        <MonitorPlay className="w-4 h-4 text-[#244B35]" />
        <span>Request Demo</span>
      </button>

      {/* Call Desk */}
      <a
        href={`tel:+${WHATSAPP_NUMBER}`}
        className="px-4 py-3 rounded-xl bg-[#FFFDF7] hover:bg-[#EFEBDD] border border-[#DCDCCF] hover:border-[#244B35] text-[#626B60] hover:text-[#202820] font-medium text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-xs"
      >
        <PhoneCall className="w-4 h-4 text-[#244B35]" />
        <span>Call ({WHATSAPP_DISPLAY})</span>
      </a>
    </div>
  );
}
