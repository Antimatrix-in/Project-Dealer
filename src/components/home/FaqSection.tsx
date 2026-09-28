"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { openConsultationModal } from "@/components/common/ConsultationModal";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: "What deliverables are included with an academic project?",
      answer: "Every complete academic project includes 100% working and tested source code, standard reference base paper, 60-90 page project report/thesis formatted to your university's guidelines, project synopsis, standard SRS with UML diagrams, phase-specific PPT presentation slides, and an exhaustive 100+ question Viva Voce preparation handbook."
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
      question: "How fast can you deliver an academic project for an urgent review deadline?",
      answer: "For urgent submissions (Phase 0, Phase 1, or Final Review), we have pre-verified academic implementations ready for immediate same-day or 24-48 hour delivery with complete setup and walkthrough. Custom development typically spans 1 to 2 weeks with milestone reviews."
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
    <section className="py-24 bg-white relative border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-[#0B1F4D] mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
            <span className="font-mono uppercase tracking-wider text-[11px] font-bold">
              Got Questions?
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] leading-relaxed">
            Everything you need to know about our academic project development, university guidelines compliance, and viva guidance.
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
                    ? "bg-[#F8FAFC] border-[#F5A623] shadow-md"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-xs"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[#0B1F4D]">
                      0{idx + 1}
                    </span>
                    <h3 className={`text-base sm:text-lg font-bold transition-colors ${isOpen ? "text-[#0B1F4D]" : "text-[#0F172A]"}`}>
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#F5A623]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-slate-200/80 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help Card */}
        <div className="mt-12 p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#F5A623] shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0F172A]">Have a specific question not covered here?</h4>
              <p className="text-xs text-[#64748B]">Talk directly with an academic mentor on WhatsApp or schedule a call.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => openConsultationModal()}
              className="px-4 py-2.5 rounded-xl btn-primary-gold text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              Ask an Expert
            </button>
            <a
              href="https://wa.me/919876543210?text=Hi%20AntiMatrix!%20I%20have%20a%20question%20regarding%20academic%20projects."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
