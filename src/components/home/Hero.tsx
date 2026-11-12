"use client";

import React from "react";
import {
  MessageCircle,
  Check,
  ClipboardList
} from "lucide-react";
import { motion } from "framer-motion";
import { getWhatsAppUrl, GOOGLE_ENQUIRY_FORM_URL } from "@/lib/whatsapp";

export default function Hero() {
  const trustFeatures = [
    "Customized Projects",
    "Complete Documentation",
    "Source Code Included",
    "Viva Preparation",
    "Technical Support",
  ];

  return (
    <section className="relative pt-36 pb-20 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28 overflow-hidden bg-[#F4F6FA]">
      {/* Subtle background grid and soft ambient glow */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#F58216]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center flex flex-col items-center space-y-6 sm:space-y-7"
        >
          {/* Small Premium Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF5EB] border border-[#F58216]/30 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#F58216] animate-pulse shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-[1.2px] text-[#F58216] font-mono">
              UPWORKS • Project Development Services
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#101D38] tracking-tight leading-[1.12] max-w-4xl mx-auto">
            Transform Your Ideas Into{" "}
            <span className="text-[#F58216] block sm:inline">
              Real-World Projects
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[#263750] leading-relaxed max-w-2xl mx-auto font-normal">
            Expert guidance for AI, Machine Learning, Web Development, Mobile Applications, Python, Java, and Data Science Projects.
          </p>

          {/* Trust Features Checklist (Pill Badges) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-4xl xl:max-w-5xl mx-auto pt-1 pb-2">
            {trustFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#DCE2EA] text-xs font-semibold text-[#101D38] shadow-2xs hover:border-[#F58216] transition-colors"
              >
                <div className="w-4 h-4 rounded-full bg-[#FFF5EB] flex items-center justify-center text-[#F58216] shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Hero CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            {/* Project Enquiry (Primary Orange Button) */}
            <a
              href={GOOGLE_ENQUIRY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F58216] hover:bg-[#E0720F] text-white font-bold text-sm shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 group cursor-pointer border border-[#F58216]"
            >
              <ClipboardList className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Project Enquiry</span>
            </a>

            {/* WhatsApp Us (Secondary White/Navy Button) */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F4F6FA] text-[#101D38] hover:text-[#101D38] border border-[#101D38] font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#F58216]" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
