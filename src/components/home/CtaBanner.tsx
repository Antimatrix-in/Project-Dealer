"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, ArrowRight, CheckCircle, ClipboardList } from "lucide-react";
import { getWhatsAppUrl, WHATSAPP_DISPLAY, GOOGLE_ENQUIRY_FORM_URL } from "@/lib/whatsapp";

export default function CtaBanner() {
  const expertAssistance = [
    "Project Selection",
    "Project Development",
    "Documentation Support",
    "Viva Preparation",
    "Technical Guidance",
  ];

  const whatsAppUrl = getWhatsAppUrl({
    requirements: "Need assistance with Project selection & development",
  });

  return (
    <section className="py-24 bg-[#F7F4E9] relative overflow-hidden border-t border-[#DCDCCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-[#EFEBDD] text-[#202820] p-10 sm:p-16 text-center overflow-hidden shadow-xs border border-[#DCDCCF]">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202820] tracking-tight leading-tight">
              Need Help With Your{" "}
              <span className="text-[#244B35]">Project?</span>
            </h2>

            <p className="text-base sm:text-lg text-[#626B60] font-medium max-w-2xl mx-auto">
              Tell us about your project requirements and our team will contact you with the best solution.
            </p>

            {/* Checklist */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-1 pb-3 text-xs sm:text-sm font-semibold text-[#202820]">
              {expertAssistance.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#FFFDF7] px-3.5 py-1.5 rounded-full border border-[#DCDCCF] shadow-2xs">
                  <CheckCircle className="w-4 h-4 text-[#244B35] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons: [ WhatsApp Now ] [ Fill Project Enquiry Form ] [ Contact Us ] */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#FFFDF7] hover:bg-[#F7F4E9] text-[#244B35] font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 border border-[#DCDCCF] hover:border-[#244B35] shadow-xs"
              >
                <MessageCircle className="w-5 h-5 text-[#244B35]" />
                <span>WhatsApp Now</span>
              </a>

              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#244B35] hover:bg-[#1D3D2B] text-white font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xs hover:shadow-md border border-[#244B35] group"
              >
                <ClipboardList className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span>Fill Project Enquiry Form</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#FFFDF7] hover:bg-[#F7F4E9] text-[#202820] hover:text-[#244B35] font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 border border-[#DCDCCF] hover:border-[#244B35] shadow-xs"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 text-[#244B35]" />
              </Link>
            </div>

            <p className="text-xs text-[#626B60] font-mono pt-3">
              Direct WhatsApp Helpline: <span className="text-[#244B35] font-bold">{WHATSAPP_DISPLAY}</span> • Instant Responses
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
