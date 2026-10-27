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
    Code2: <Code2 className="w-6 h-6 text-[#FF6B00]" />,
    SlidersAdjust: <SlidersHorizontal className="w-6 h-6 text-[#FF8A00]" />,
    FileText: <FileText className="w-6 h-6 text-[#FF3D3D]" />,
    Presentation: <Presentation className="w-6 h-6 text-[#D90429]" />,
    GraduationCap: <GraduationCap className="w-6 h-6 text-[#FF6B00]" />,
    Server: <Server className="w-6 h-6 text-[#FF8A00]" />,
  };

  return (
    <section className="py-20 bg-[#FFF9F5] relative border-t border-[#FF6B00]/15">
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
              className="group relative rounded-2xl bg-white border border-slate-200 p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF6B00]/50 hover:shadow-xl hover:shadow-[#FF6B00]/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF1E8] border border-[#FF6B00]/20 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    {iconMap[srv.iconName]}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#FFF1E8] border border-[#FF6B00]/25 text-[#FF6B00]">
                    Service 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#101828] mb-2 group-hover:text-[#FF6B00] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs text-[#FF6B00] font-semibold mb-3">
                  {srv.shortDesc}
                </p>

                <p className="text-xs text-[#526581] leading-relaxed mb-4">
                  {srv.description}
                </p>

                <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-100">
                  {srv.deliverables.slice(0, 3).map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-[#101828]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00A86B] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() =>
                    openConsultationModal({
                      serviceTitle: srv.title,
                    })
                  }
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FFF9F5] hover:bg-gradient-to-r hover:from-[#FF6B00] hover:to-[#D90429] hover:text-white text-[#101828] font-bold text-xs border border-[#FF6B00]/20 hover:border-transparent transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs group/btn"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FF6B00] group-hover/btn:text-white" />
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
            className="inline-flex items-center gap-2 text-xs font-bold text-[#FF6B00] hover:text-[#D90429] transition-colors"
          >
            <span>View Detailed Deliverables &amp; Timelines for All Services &rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
