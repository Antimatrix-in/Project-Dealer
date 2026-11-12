"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types";
import {
  ArrowLeft,
  ChevronRight,
  ClipboardList,
  MessageCircle,
  BookOpen,
  Sparkles,
  Layers,
  Cpu,
  CheckCircle2,
  FileCheck2,
  Presentation,
  ShieldCheck,
  Check
} from "lucide-react";
import { getWhatsAppUrl, GOOGLE_ENQUIRY_FORM_URL } from "@/lib/whatsapp";
import { openConsultationModal } from "@/components/common/ConsultationModal";
import CtaBanner from "@/components/home/CtaBanner";

interface ProjectDetailContentProps {
  project: Project;
}

export default function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const code = project.projectCode || project.id;
  const domainCode = project.domainCode || "AMPY";
  const domainName = project.domainName || project.category;

  const whatsAppUrl = getWhatsAppUrl({
    category: domainName,
    projectTitle: `[${code}] ${project.title}`,
    requirements: "Need complete working source code, base paper, report, and viva guidance",
  });

  const projectImage =
    project.thumbnail ||
    (domainCode === "AMDL" || domainCode === "AMAI"
      ? "/images/projects/plant-disease.jpg"
      : domainCode === "AMML" || domainCode === "AMDS"
      ? "/images/projects/ai-chatbot.jpg"
      : domainCode === "AMPY" || domainCode === "AMAD"
      ? "/images/projects/student-attendance.jpg"
      : "/images/projects/ecommerce-platform.jpg");

  return (
    <div className="pt-32 sm:pt-36 pb-20 bg-[#F5F1E7] min-h-screen text-[#1F2A22]">
      <div className="w-full max-w-[1780px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 relative z-10 space-y-8">
        
        {/* Navigation Breadcrumbs & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#667064]">
            <Link href="/" className="hover:text-[#315C3D] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/projects" className="hover:text-[#315C3D] transition-colors">Projects</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/projects/${domainCode}`} className="hover:text-[#315C3D] transition-colors">{domainName}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#315C3D] font-mono font-bold">{code}</span>
          </div>

          <Link
            href={`/projects/${domainCode}`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] border border-[#DDDCCF] text-xs font-bold text-[#202820] hover:text-[#315C3D] transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to {domainName} ({domainCode})</span>
          </Link>
        </div>

        {/* Hero Card with Key Project Metadata */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Details & Action Buttons */}
            <div className="lg:col-span-8 space-y-4">
              {/* Domain & Project Code Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-black px-3 py-1 rounded-lg bg-[#315C3D] text-white tracking-wider">
                  {code}
                </span>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF]">
                  Domain: {domainName} ({domainCode})
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-[#F5F1E7] text-[#202820] border border-[#DDDCCF]">
                  {project.level || "UG Final Year"}
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-[#F5F1E7] text-[#667064] border border-[#DDDCCF]">
                  {project.year || "2025-26 Edition"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#202820] tracking-tight leading-tight">
                {project.title}
              </h1>

              {/* Tagline / Short Description */}
              <p className="text-sm sm:text-base text-[#667064] leading-relaxed">
                {project.tagline || project.description}
              </p>

              {/* PROMINENT ACTION BUTTONS */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                {/* 1. Enquire About This Project (Opens Google Form directly) */}
                <a
                  href={GOOGLE_ENQUIRY_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#285A3B] hover:bg-[#214930] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all flex items-center gap-2 border border-[#285A3B] cursor-pointer"
                >
                  <ClipboardList className="w-4 h-4 text-white" />
                  <span>Enquire About This Project</span>
                </a>

                {/* 2. WhatsApp Inquire */}
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] text-[#285A3B] font-bold text-xs sm:text-sm border border-[#D8DDCF] hover:border-[#285A3B] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#285A3B]" />
                  <span>Inquire on WhatsApp</span>
                </a>

                {/* 3. Request a Requirement / Custom Modification */}
                <button
                  type="button"
                  onClick={() =>
                    openConsultationModal({
                      projectTitle: project.title,
                      category: domainName,
                      requirement: `Custom requirement for project ${code}: ${project.title}`,
                    })
                  }
                  className="px-6 py-3.5 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] text-[#1F2A22] hover:text-[#285A3B] font-bold text-xs sm:text-sm border border-[#D8DDCF] hover:border-[#285A3B] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#285A3B]" />
                  <span>Request a Requirement</span>
                </button>
              </div>
            </div>

            {/* Right Col: Graphic Preview */}
            <div className="lg:col-span-4">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#DDDCCF] shadow-xs bg-[#EEE9DC]">
                <Image
                  src={projectImage}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs border border-white/20">
                    {code}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#315C3D] text-white font-bold">
                    Verified Project
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main 2-Column Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Abstract Section */}
            {project.abstract && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#DDDCCF]">
                  <BookOpen className="w-5 h-5 text-[#315C3D]" />
                  <h2 className="text-lg sm:text-xl font-bold text-[#202820]">
                    Project Abstract &amp; Technical Scope
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-[#667064] leading-relaxed whitespace-pre-line font-normal">
                  {project.abstract}
                </p>

                {project.problemStatement && (
                  <div className="mt-4 p-4 rounded-xl bg-[#EEE9DC] border border-[#DDDCCF] space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#315C3D] font-mono">
                      Problem Statement:
                    </h4>
                    <p className="text-xs text-[#667064] leading-relaxed">
                      {project.problemStatement}
                    </p>
                  </div>
                )}

                {project.proposedSolution && (
                  <div className="mt-3 p-4 rounded-xl bg-[#DCE8D9] border border-[#DDDCCF] space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#315C3D] font-mono">
                      Proposed Solution &amp; Architecture:
                    </h4>
                    <p className="text-xs text-[#202820] leading-relaxed">
                      {project.proposedSolution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#DDDCCF]">
                  <Sparkles className="w-5 h-5 text-[#315C3D]" />
                  <h2 className="text-lg sm:text-xl font-bold text-[#202820]">
                    Key Features &amp; Implementation Highlights
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#315C3D] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#202820] font-medium leading-normal">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modules Breakdown */}
            {project.modules && project.modules.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#DDDCCF]">
                  <Layers className="w-5 h-5 text-[#315C3D]" />
                  <h2 className="text-lg sm:text-xl font-bold text-[#202820]">
                    Project Modules &amp; Workflow
                  </h2>
                </div>
                <p className="text-xs text-[#667064]">
                  Structured modular breakdown aligned with university final-year Phase 1, Phase 2, and Final Review requirements:
                </p>

                <div className="space-y-3 pt-1">
                  {project.modules.map((mod, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-[#202820]">
                        {mod.name}
                      </h4>
                      <p className="text-xs text-[#667064] leading-relaxed">
                        {mod.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Technologies, Deliverables, Enquire Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Enquiry CTA Card */}
            <div className="p-6 rounded-3xl bg-[#EEE9DC] border border-[#D8DDCF] shadow-xs space-y-4 text-center">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#285A3B] block">
                Interested In This Project?
              </span>
              <h3 className="text-base font-black text-[#1F2A22]">
                Reserve {code} for Your College Review
              </h3>
              <p className="text-xs text-[#657166] leading-relaxed">
                Click below to open the official Google Enquiry Form directly.
              </p>
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#285A3B] hover:bg-[#214930] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#285A3B]"
              >
                <ClipboardList className="w-4 h-4" />
                <span>Enquire About {code}</span>
              </a>
            </div>

            {/* Technologies Used (Tech Stack) */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-[#DDDCCF]">
                  <Cpu className="w-4 h-4 text-[#315C3D]" />
                  <h3 className="text-sm font-bold text-[#202820]">Technologies Used</h3>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs font-semibold text-[#202820]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Included Documentation Deliverables */}
            <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-[#DDDCCF]">
                <FileCheck2 className="w-4 h-4 text-[#315C3D]" />
                <h3 className="text-sm font-bold text-[#202820]">Included Deliverables</h3>
              </div>
              <ul className="space-y-2 pt-1 text-xs text-[#202820]">
                {(project.documentationIncluded && project.documentationIncluded.length > 0
                  ? project.documentationIncluded
                  : [
                      "IEEE Format Base Paper & Research Summary",
                      "Complete Working Source Code & Virtualenv Setup",
                      "65+ Page SRS and System Design Documentation",
                      "UML Activity, Sequence & Class Architecture Diagrams",
                      "High-Impact PowerPoint Presentation for Reviews",
                      "Viva Voce Model Q&A Preparation Handbook"
                    ]
                ).map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-3.5 h-3.5 text-[#315C3D] shrink-0 mt-0.5" />
                    <span className="leading-tight">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <CtaBanner />
      </div>
    </div>
  );
}

