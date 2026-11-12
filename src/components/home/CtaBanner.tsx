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
    <section className="py-24 bg-[#F5F1E7] relative overflow-hidden border-t border-[#DDDCCF]">
      <div className="w-full max-w-[1780px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 relative z-10">
        <div className="relative rounded-3xl bg-[#EEE9DC] text-[#202820] p-10 sm:p-16 text-center overflow-hidden shadow-xs border border-[#DDDCCF]">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#202820] tracking-tight leading-tight">
              Need Help With Your{" "}
              <span className="text-[#315C3D]">Project?</span>
            </h2>

            <p className="text-base sm:text-lg text-[#667064] font-medium max-w-2xl mx-auto">
              Tell us about your project requirements and our team will contact you with the best solution.
            </p>

            {/* Checklist */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-1 pb-3 text-xs sm:text-sm font-semibold text-[#202820]">
              {expertAssistance.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#FFFFFF] px-3.5 py-1.5 rounded-full border border-[#DDDCCF] shadow-2xs">
                  <CheckCircle className="w-4 h-4 text-[#315C3D] shrink-0" />
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
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] text-[#285A3B] font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 border border-[#D8DDCF] hover:border-[#285A3B] shadow-xs"
              >
                <MessageCircle className="w-5 h-5 text-[#285A3B]" />
                <span>WhatsApp Now</span>
              </a>

              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#285A3B] hover:bg-[#214930] text-white font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xs hover:shadow-md border border-[#285A3B] group"
              >
                <ClipboardList className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span>Fill Project Enquiry Form</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] text-[#1F2A22] hover:text-[#285A3B] font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 border border-[#D8DDCF] hover:border-[#285A3B] shadow-xs"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 text-[#285A3B]" />
              </Link>
            </div>

            <p className="text-xs text-[#667064] font-mono pt-3">
              Direct WhatsApp Helpline: <span className="text-[#315C3D] font-bold">{WHATSAPP_DISPLAY}</span> • Instant Responses
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
