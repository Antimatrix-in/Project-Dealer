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
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-[#101B30] text-white p-10 sm:p-16 text-center overflow-hidden shadow-2xl border border-[#FF6B00]/25">
          {/* Subtle Ambient Background Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B00]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF3D3D]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Need Help With Your{" "}
              <span className="text-gradient-orange-red">Project?</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-200 font-medium max-w-2xl mx-auto">
              Tell us about your project requirements and our team will contact you with the best solution.
            </p>

            {/* Checklist */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-1 pb-3 text-xs sm:text-sm font-semibold text-slate-100">
              {expertAssistance.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
                  <CheckCircle className="w-4 h-4 text-[#FF6B00] shrink-0" />
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
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#00A86B] hover:bg-[#00925C] text-white font-bold text-base transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/25"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>WhatsApp Now</span>
              </a>

              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] hover:opacity-95 text-white font-bold text-base transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-[#FF6B00]/25 group"
              >
                <ClipboardList className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span>Fill Project Enquiry Form</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 border border-white/15"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>

            <p className="text-xs text-slate-300 font-mono pt-3">
              Direct WhatsApp Helpline: <span className="text-[#FF8A00] font-bold">{WHATSAPP_DISPLAY}</span> • Instant Responses
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
