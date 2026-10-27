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
    Code2: <Code2 className="w-6 h-6 text-[#FF7900]" />,
    SlidersAdjust: <SlidersHorizontal className="w-6 h-6 text-[#FF9500]" />,
    FileText: <FileText className="w-6 h-6 text-[#FF7900]" />,
    Presentation: <Presentation className="w-6 h-6 text-[#FF9500]" />,
    GraduationCap: <GraduationCap className="w-6 h-6 text-[#FF7900]" />,
    Server: <Server className="w-6 h-6 text-[#FF9500]" />,
  };

  return (
    <section className="py-20 bg-[#080808] relative border-t border-[#2A2A2A]">
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
              className="group relative rounded-2xl bg-[#161616] border border-[#2A2A2A] p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF7900] hover:shadow-xl hover:shadow-[#FF7900]/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1D1D1D] border border-[#2A2A2A] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    {iconMap[srv.iconName]}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#1D1D1D] border border-[#2A2A2A] text-[#FF7900]">
                    Service 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#FFFFFF] mb-2 group-hover:text-[#FF7900] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs text-[#FF7900] font-semibold mb-3">
                  {srv.shortDesc}
                </p>

                <p className="text-xs text-[#B8B8B8] leading-relaxed mb-4">
                  {srv.description}
                </p>

                <div className="space-y-1.5 mb-6 pt-3 border-t border-[#2A2A2A]">
                  {srv.deliverables.slice(0, 3).map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-[#FFFFFF]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7900] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#2A2A2A] flex items-center justify-between">
                <button
                  onClick={() =>
                    openConsultationModal({
                      serviceTitle: srv.title,
                    })
                  }
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1D1D1D] hover:bg-gradient-to-r hover:from-[#FF7900] hover:to-[#FF4500] hover:text-white text-[#FFFFFF] font-bold text-xs border border-[#2A2A2A] hover:border-transparent transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs group/btn"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FF7900] group-hover/btn:text-white" />
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
            className="inline-flex items-center gap-2 text-xs font-bold text-[#FF7900] hover:text-[#FF9500] transition-colors"
          >
            <span>View Detailed Deliverables &amp; Timelines for All Services &rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
