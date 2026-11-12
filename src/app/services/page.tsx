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
import CtaBanner from "@/components/home/CtaBanner";

export default function ServicesPage() {
  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-7 h-7 text-[#315C3D]" />,
    SlidersAdjust: <SlidersHorizontal className="w-7 h-7 text-[#497A52]" />,
    FileText: <FileText className="w-7 h-7 text-[#315C3D]" />,
    Presentation: <Presentation className="w-7 h-7 text-[#497A52]" />,
    GraduationCap: <GraduationCap className="w-7 h-7 text-[#315C3D]" />,
    Server: <Server className="w-7 h-7 text-[#497A52]" />,
  };

  const serviceFaqs = [
    {
      q: "Can I get assistance if my college guide demands specific module changes?",
      a: "Yes! Our Project Customization service is specifically built for this. We analyze your guide's remarks and modify the code, algorithms, dataset, and documentation accordingly."
    },
    {
      q: "Will the project documentation pass our college Turnitin plagiarism check?",
      a: "Absolutely. All documentation prepared by Upwork Project Center is strictly written from scratch, adhering to university formatting and guaranteed below 10-15% similarity thresholds as per university guidelines."
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
    <div className="pt-32 sm:pt-36 pb-20 bg-[#F5F1E7] min-h-screen text-[#1F2A22]">
      {/* Background Header */}
      <div className="relative py-16 bg-[#EEE9DC] border-b border-[#DDDCCF] mb-12 overflow-hidden">
        <div className="w-full max-w-[1780px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 relative z-10 text-center">
          <SectionHeader
            badge="Comprehensive Project Support"
            title="Complete Engineering"
            titleGradient="Project Services"
            subtitle="Everything you need from initial concept selection to source code implementation, thesis documentation, and final viva voce defense."
          />
        </div>
      </div>

      <div className="w-full max-w-[1780px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        {/* Services Grid (6 Core Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {SERVICES_DATA.map((srv, idx) => (
            <div
              key={srv.id}
              id={srv.id}
              className="group relative rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] p-7 shadow-xs hover:border-[#315C3D] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Icon & Service Number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#DCE8D9] border border-[#DDDCCF] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {iconMap[srv.iconName]}
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#DCE8D9] border border-[#DDDCCF] text-[#315C3D]">
                    Service 0{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#202820] mb-2 group-hover:text-[#315C3D] transition-colors">
                  {srv.title}
                </h3>

                {/* Short Desc */}
                <p className="text-xs font-semibold text-[#315C3D] mb-3">
                  {srv.shortDesc}
                </p>

                {/* Long Desc */}
                <p className="text-xs text-[#667064] leading-relaxed mb-5">
                  {srv.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 mb-6 pt-4 border-t border-[#DDDCCF]">
                  <span className="text-[11px] font-bold text-[#202820] uppercase tracking-wider block font-mono">
                    Key Deliverables:
                  </span>
                  {srv.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-[#202820]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#315C3D] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#DDDCCF]">
                <button
                  onClick={() =>
                    openConsultationModal({
                      serviceTitle: srv.title,
                    })
                  }
                  className="w-full py-3 px-4 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs border border-[#315C3D] group/btn"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Inquire for {srv.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Service FAQ Section */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#EEE9DC] border border-[#DDDCCF] shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#DCE8D9] border border-[#DDDCCF] text-[#315C3D] mb-3 shadow-xs font-mono">
              <HelpCircle className="w-3.5 h-3.5 text-[#315C3D]" />
              <span>Common Inquiries</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#202820]">Frequently Asked Questions</h3>
            <p className="text-xs sm:text-sm text-[#667064] mt-2">
              Everything you need to know about our project development and technical support workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {serviceFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-xs space-y-2"
              >
                <h4 className="text-sm font-bold text-[#202820] flex items-start gap-2">
                  <span className="text-[#315C3D] font-mono font-bold">Q.</span>
                  {faq.q}
                </h4>
                <p className="text-xs text-[#667064] leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section: Need Help With Your Project? */}
        <div className="pt-12">
          <CtaBanner />
        </div>
      </div>
    </div>
  );
}
