"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { openConsultationModal } from "@/components/common/ConsultationModal";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: "What deliverables are included with a project?",
      answer: "Every complete project includes 100% working and tested source code, standard reference base paper, 60-90 page project report/thesis formatted to your university's guidelines, project synopsis, standard SRS with UML diagrams, phase-specific PPT presentation slides, and an exhaustive 100+ question Viva Voce preparation handbook."
    },
    {
      question: "Will the documentation pass our college Turnitin / Urkund plagiarism check?",
      answer: "Yes, absolutely. We guarantee low plagiarism (strictly under 10-15% as per university criteria). Our technical documentation team drafts fresh problem formulations, literature surveys, architecture breakdowns, and algorithm descriptions from scratch."
    },
    {
      question: "Can AntiMatrix customize an existing topic or add new algorithms requested by my guide?",
      answer: "Yes! Our Project Customization service is tailored for guide-driven modifications. Whether your guide demands incorporating a novel attention block into a CNN, swapping datasets, adding a new UI module, or comparing two algorithms, our engineers implement the exact requirements."
    },
    {
      question: "How fast can you deliver a project for an urgent review deadline?",
      answer: "For urgent submissions (Phase 0, Phase 1, or Final Review), we have pre-verified implementations ready for immediate same-day or 24-48 hour delivery with complete setup and walkthrough. Custom development typically spans 1 to 2 weeks with milestone reviews."
    },
    {
      question: "What support is provided for the final Viva Voce examination?",
      answer: "We ensure you understand every aspect of your project. You receive dedicated Viva Guidance where our mentors explain the algorithms line-by-line, discuss mathematical foundations, and conduct realistic mock viva drills covering typical external examiner questions."
    },
    {
      question: "Do you install and configure the project on my personal laptop?",
      answer: "Yes! We provide complimentary remote desktop installation via AnyDesk or Google Meet. Our technical support engineers set up the Python/Java runtimes, database schemas, model weights, and virtual environments directly on your machine so the project runs with zero errors."
    }
  ];

  return (
    <section className="py-24 bg-[#F7F4E9] relative border-t border-[#DCDCCF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4EBDD] border border-[#A9BFA3] text-xs font-semibold text-[#244B35] mb-4 shadow-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#244B35] animate-pulse" />
            <span className="uppercase tracking-wider text-[11px] font-bold">
              Got Questions?
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#202820] tracking-tight">
            Frequently Asked <span className="text-[#244B35]">Questions</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#626B60] leading-relaxed">
            Everything you need to know about our project development, university guidelines compliance, and viva guidance.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#FFFDF7] border-[#244B35] shadow-xs ring-1 ring-[#244B35]/20"
                    : "bg-[#FFFDF7] border-[#DCDCCF] hover:border-[#A9BFA3] shadow-xs"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#E4EBDD] border border-[#A9BFA3] text-[#244B35]">
                      0{idx + 1}
                    </span>
                    <h3 className={`text-base sm:text-lg font-bold transition-colors ${isOpen ? "text-[#244B35]" : "text-[#202820]"}`}>
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#244B35]" : "text-[#626B60]"
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#626B60] leading-relaxed border-t border-[#DCDCCF] pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help Card */}
        <div className="mt-12 p-6 rounded-2xl bg-[#EFEBDD] border border-[#DCDCCF] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#E4EBDD] border border-[#A9BFA3] flex items-center justify-center text-[#244B35] shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#202820]">Have a specific question not covered here?</h4>
              <p className="text-xs text-[#626B60]">Talk directly with a technical mentor on WhatsApp or schedule a call.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => openConsultationModal()}
              className="px-4 py-2.5 rounded-xl bg-[#244B35] hover:bg-[#1D3D2B] text-white font-bold text-xs shadow-xs transition-all cursor-pointer border border-[#244B35]"
            >
              Ask an Expert
            </button>
            <a
              href={getWhatsAppUrl({ requirements: "General inquiry / project questions" })}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#FFFDF7] hover:bg-[#F7F4E9] border border-[#DCDCCF] text-[#244B35] text-xs font-bold hover:border-[#244B35] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#244B35]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
