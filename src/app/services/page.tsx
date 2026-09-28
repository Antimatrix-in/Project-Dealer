"use client";

import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import { SERVICES_DATA } from "@/data/services";
import {
  Code2,
  SlidersHorizontal,
  FileText,
  Presentation,
  GraduationCap,
  Server,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle
} from "lucide-react";
import { openConsultationModal } from "@/components/common/ConsultationModal";

export default function ServicesPage() {
  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-7 h-7 text-[#0B1F4D]" />,
    SlidersAdjust: <SlidersHorizontal className="w-7 h-7 text-[#F5A623]" />,
    FileText: <FileText className="w-7 h-7 text-[#0B1F4D]" />,
    Presentation: <Presentation className="w-7 h-7 text-[#F5A623]" />,
    GraduationCap: <GraduationCap className="w-7 h-7 text-[#0B1F4D]" />,
    Server: <Server className="w-7 h-7 text-[#F5A623]" />,
  };

  const serviceFaqs = [
    {
      q: "Can I get assistance if my college guide demands specific module changes?",
      a: "Yes! Our Project Customization service is specifically built for this. We analyze your guide's remarks and modify the code, algorithms, dataset, and documentation accordingly."
    },
    {
      q: "Will the project documentation pass our college Turnitin plagiarism check?",
      a: "Absolutely. All documentation prepared by AntiMatrix is strictly written from scratch, adhering to university formatting and guaranteed below 10-15% similarity thresholds as per university guidelines."
    },
    {
      q: "Do you provide remote setup assistance on my laptop?",
      a: "Yes. Our Technical Support team performs live remote desktop configuration via AnyDesk or Google Meet to ensure the database, runtime environment, and demo interfaces execute flawlessly on your personal machine."
    },
    {
      q: "How does the Viva Guidance work?",
      a: "We provide an exhaustive 100+ question viva booklet with technical explanations, mathematical foundations of the models, and 1-on-1 mock rehearsal drills simulating external examiner review."
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      {/* Background Header */}
      <div className="relative py-16 bg-[#F8FAFC] border-b border-slate-200 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeader
            badge="Comprehensive Academic Support"
            title="Complete Engineering"
            titleGradient="Project Services"
            subtitle="Everything you need from initial concept selection to source code implementation, thesis documentation, and final viva voce defense."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Grid (6 Core Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {SERVICES_DATA.map((srv, idx) => (
            <div
              key={srv.id}
              id={srv.id}
              className="group relative rounded-3xl bg-white border border-slate-200/90 p-7 shadow-[0_4px_20px_-4px_rgba(11,31,77,0.05)] hover:shadow-[0_16px_35px_-6px_rgba(11,31,77,0.1)] hover:border-[#F5A623]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Icon & Service Number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    {iconMap[srv.iconName]}
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#0B1F4D]">
                    Service 0{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-[#0B1F4D] transition-colors">
                  {srv.title}
                </h3>

                {/* Short Desc */}
                <p className="text-xs font-semibold text-[#D97706] mb-3">
                  {srv.shortDesc}
                </p>

                {/* Long Desc */}
                <p className="text-xs text-[#64748B] leading-relaxed mb-5">
                  {srv.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-[#0B1F4D] uppercase tracking-wider block font-mono">
                    Key Deliverables:
                  </span>
                  {srv.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-[#0F172A]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() =>
                    openConsultationModal({
                      serviceTitle: srv.title,
                    })
                  }
                  className="w-full py-3 px-4 rounded-xl bg-slate-50 hover:bg-[#0B1F4D] text-[#0B1F4D] hover:text-white font-bold text-xs border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs group/btn"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>Inquire for {srv.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Service FAQ Section */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#F8FAFC] border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 text-[#0B1F4D] mb-3 shadow-sm">
              <HelpCircle className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Common Inquiries</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">Frequently Asked Questions</h3>
            <p className="text-xs sm:text-sm text-[#64748B] mt-2">
              Everything you need to know about our project development and academic support workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {serviceFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2"
              >
                <h4 className="text-sm font-bold text-[#0F172A] flex items-start gap-2">
                  <span className="text-[#F5A623] font-mono font-bold">Q.</span>
                  {faq.q}
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
