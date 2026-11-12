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
  ArrowRight,
  MessageCircle
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function ServicesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-6 h-6 text-[#F58216]" />,
    SlidersAdjust: <SlidersHorizontal className="w-6 h-6 text-[#F58216]" />,
    FileText: <FileText className="w-6 h-6 text-[#F58216]" />,
    Presentation: <Presentation className="w-6 h-6 text-[#F58216]" />,
    GraduationCap: <GraduationCap className="w-6 h-6 text-[#F58216]" />,
    Server: <Server className="w-6 h-6 text-[#F58216]" />,
  };

  return (
    <section className="py-20 bg-white relative border-t border-[#DCE2EA]">
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
              className="group relative rounded-2xl bg-[#FFFFFF] border border-[#DCE2EA] p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F58216] hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF5EB] border border-[#F58216]/25 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {iconMap[srv.iconName]}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#FFF5EB] border border-[#F58216]/25 text-[#F58216]">
                    Service 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#101D38] mb-2 group-hover:text-[#F58216] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs text-[#F58216] font-semibold mb-3">
                  {srv.shortDesc}
                </p>

                <p className="text-xs text-[#263750] leading-relaxed mb-4">
                  {srv.description}
                </p>

                <div className="space-y-1.5 mb-6 pt-3 border-t border-[#DCE2EA]">
                  {srv.deliverables.slice(0, 3).map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-[#263750]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F58216] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#DCE2EA] flex items-center justify-between">
                <a
                  href={getWhatsAppUrl({
                    category: srv.title,
                    requirements: `Inquiry regarding ${srv.title} service`,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#101D38] hover:bg-[#1A2C50] text-white font-bold text-xs border border-[#101D38] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs group/btn"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#F58216]" />
                  <span>Inquire for {srv.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#101D38] hover:text-[#F58216] transition-colors"
          >
            <span>Explore All 6 Core Deliverables</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
