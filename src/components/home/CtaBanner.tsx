"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { openConsultationModal } from "@/components/common/ConsultationModal";

export default function CtaBanner() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-[#0B1F4D] text-white p-10 sm:p-16 text-center overflow-hidden shadow-2xl">
          {/* Subtle Ambient Background Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5A623]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-[#F5A623] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Free Topic Feasibility Check &amp; Synopsis Guidance</span>
            </div>

            {/* Exact Requested Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Need Help With Your{" "}
              <span className="text-gradient-gold">Academic Project?</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
              Connect with experienced project leads for instant guidance on topic selection, custom coding, standard documentation, and viva preparation.
            </p>

            {/* Exact Requested Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/919876543210?text=Hi%20AntiMatrix!%20I%20need%20help%20with%20my%20academic%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/25"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>WhatsApp Now</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-[#0B1F4D] font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 text-[#0B1F4D]" />
              </Link>
            </div>

            {/* Reassurance Checklist */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F5A623]" />
                Zero Obligation Consultation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F5A623]" />
                Guide Approval Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F5A623]" />
                Under 15-Min Response Time
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
