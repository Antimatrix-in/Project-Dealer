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
    <section className="py-24 bg-[#080808] relative overflow-hidden border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-[#101010] text-white p-10 sm:p-16 text-center overflow-hidden shadow-2xl border border-[#2A2A2A]">
          {/* Subtle Ambient Background Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF7900]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF9500]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Need Help With Your{" "}
              <span className="text-gradient-orange">Project?</span>
            </h2>

            <p className="text-base sm:text-lg text-[#B8B8B8] font-medium max-w-2xl mx-auto">
              Tell us about your project requirements and our team will contact you with the best solution.
            </p>

            {/* Checklist */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-1 pb-3 text-xs sm:text-sm font-semibold text-white">
              {expertAssistance.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#161616] px-3.5 py-1.5 rounded-full border border-[#2A2A2A]">
                  <CheckCircle className="w-4 h-4 text-[#FF7900] shrink-0" />
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
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#161616] hover:bg-[#1D1D1D] text-white font-bold text-base transition-all duration-300 flex items-center justify-center gap-2.5 border border-[#2A2A2A] hover:border-[#FF7900]"
              >
                <MessageCircle className="w-5 h-5 text-[#FF7900]" />
                <span>WhatsApp Now</span>
              </a>

              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#FF4500] hover:opacity-95 text-white font-bold text-base transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-[#FF7900]/25 group"
              >
                <ClipboardList className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span>Fill Project Enquiry Form</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#161616] hover:bg-[#1D1D1D] text-white font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 border border-[#2A2A2A] hover:border-[#FF7900]"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 text-[#FF7900]" />
              </Link>
            </div>

            <p className="text-xs text-[#B8B8B8] font-mono pt-3">
              Direct WhatsApp Helpline: <span className="text-[#FF7900] font-bold">{WHATSAPP_DISPLAY}</span> • Instant Responses
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
