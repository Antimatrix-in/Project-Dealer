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
    <section className="py-24 bg-[#080808] relative border-t border-[#2A2A2A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161616] border border-[#2A2A2A] text-xs font-semibold text-[#FF7900] mb-4 shadow-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#FF7900] animate-pulse" />
            <span className="uppercase tracking-wider text-[11px] font-bold">
              Got Questions?
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="text-gradient-orange">Questions</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#B8B8B8] leading-relaxed">
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
                    ? "bg-[#1D1D1D] border-[#FF7900] shadow-sm ring-1 ring-[#FF7900]/20"
                    : "bg-[#161616] border-[#2A2A2A] hover:border-[#FF7900]/50 shadow-xs"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#161616] border border-[#2A2A2A] text-[#FF7900]">
                      0{idx + 1}
                    </span>
                    <h3 className={`text-base sm:text-lg font-bold transition-colors ${isOpen ? "text-[#FF7900]" : "text-white"}`}>
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#FF7900]" : "text-[#B8B8B8]"
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#B8B8B8] leading-relaxed border-t border-[#2A2A2A] pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help Card */}
        <div className="mt-12 p-6 rounded-2xl bg-[#161616] border border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#1D1D1D] border border-[#2A2A2A] flex items-center justify-center text-[#FF7900] shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Have a specific question not covered here?</h4>
              <p className="text-xs text-[#B8B8B8]">Talk directly with a technical mentor on WhatsApp or schedule a call.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => openConsultationModal()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#FF4500] hover:opacity-90 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Ask an Expert
            </button>
            <a
              href={getWhatsAppUrl({ requirements: "General inquiry / project questions" })}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#1D1D1D] border border-[#2A2A2A] text-[#FF7900] text-xs font-bold hover:border-[#FF7900] transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#FF7900]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
