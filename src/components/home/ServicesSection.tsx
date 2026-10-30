"use client";

import React from "react";
import Link from "next/link";
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
  ArrowRight
} from "lucide-react";
import { openConsultationModal } from "@/components/common/ConsultationModal";

export default function ServicesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-6 h-6 text-[#315C3D]" />,
    SlidersAdjust: <SlidersHorizontal className="w-6 h-6 text-[#497A52]" />,
    FileText: <FileText className="w-6 h-6 text-[#315C3D]" />,
    Presentation: <Presentation className="w-6 h-6 text-[#497A52]" />,
    GraduationCap: <GraduationCap className="w-6 h-6 text-[#315C3D]" />,
    Server: <Server className="w-6 h-6 text-[#497A52]" />,
  };

  return (
    <section className="py-20 bg-[#F5F1E7] relative border-t border-[#DDDCCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="End-to-End Support"
          title="Our Core"
          titleGradient="Project Services"
          subtitle="Comprehensive assistance from source code implementation to standard documentation and viva defense."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((srv, idx) => (
            <div
              key={srv.id}
              className="group relative rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#315C3D] hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#DCE8D9] border border-[#DDDCCF] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {iconMap[srv.iconName]}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#DCE8D9] border border-[#DDDCCF] text-[#315C3D]">
                    Service 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#202820] mb-2 group-hover:text-[#315C3D] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs text-[#315C3D] font-semibold mb-3">
                  {srv.shortDesc}
                </p>

                <p className="text-xs text-[#667064] leading-relaxed mb-4">
                  {srv.description}
                </p>

                <div className="space-y-1.5 mb-6 pt-3 border-t border-[#DDDCCF]">
                  {srv.deliverables.slice(0, 3).map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-[#202820]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#315C3D] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#DDDCCF] flex items-center justify-between">
                <button
                  onClick={() =>
                    openConsultationModal({
                      serviceTitle: srv.title,
                    })
                  }
                  className="w-full py-2.5 px-4 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white font-bold text-xs border border-[#315C3D] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs group/btn"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Inquire for {srv.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#315C3D] hover:text-[#497A52] transition-colors"
          >
            <span>Explore All 6 Core Deliverables</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
