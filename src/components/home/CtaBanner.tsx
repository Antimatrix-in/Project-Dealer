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
    <section className="py-24 bg-[#F4F6FA] relative overflow-hidden border-t border-[#DCE2EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-[#101D38] text-white p-10 sm:p-16 text-center overflow-hidden shadow-lg border border-[#1A2C50]">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Need Help With Your{" "}
              <span className="text-[#F58216]">Project?</span>
            </h2>

            <p className="text-base sm:text-lg text-[#DCE2EA] font-medium max-w-2xl mx-auto">
              Tell us about your project requirements and our team will contact you with the best solution.
            </p>

            {/* Checklist */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-1 pb-3 text-xs sm:text-sm font-semibold text-white">
              {expertAssistance.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#182848] px-3.5 py-1.5 rounded-full border border-[#263750] shadow-xs">
                  <CheckCircle className="w-4 h-4 text-[#F58216] shrink-0" />
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
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-[#F4F6FA] text-[#101D38] font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 border border-[#DCE2EA] shadow-xs"
              >
                <MessageCircle className="w-5 h-5 text-[#F58216]" />
                <span>WhatsApp Now</span>
              </a>

              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F58216] hover:bg-[#E0720F] text-white font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md border border-[#F58216] group"
              >
                <ClipboardList className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span>Fill Project Enquiry Form</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 border border-[#DCE2EA] shadow-xs"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 text-[#F58216]" />
              </Link>
            </div>

            <p className="text-xs text-[#DCE2EA]/80 font-mono pt-3">
              Direct WhatsApp Helpline: <span className="text-[#F58216] font-bold">{WHATSAPP_DISPLAY}</span> • Instant Responses
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
