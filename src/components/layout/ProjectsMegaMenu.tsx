"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BrainCircuit,
  Cpu,
  Eye,
  FileCode2,
  Coffee,
  Globe,
  Smartphone,
  Cloud,
  ShieldAlert,
  BarChart3,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight
} from "lucide-react";
import {
  PROJECT_CATEGORIES,
  DROPDOWN_FEATURED_PROJECTS,
  DOMAIN_DETAILS,
  CATEGORY_SLUG_MAP
} from "@/data/projects";
import { ProjectCategory } from "@/types";
import { openConsultationModal } from "@/components/common/ConsultationModal";

interface ProjectsMegaMenuProps {
  onClose: () => void;
}

export default function ProjectsMegaMenu({ onClose }: ProjectsMegaMenuProps) {
  const categoryIcons: Partial<Record<ProjectCategory, React.ReactNode>> = {
    "Python Projects": <FileCode2 className="w-4 h-4 text-[#497A52]" />,
    "Java Projects": <Coffee className="w-4 h-4 text-[#315C3D]" />,
    "Cyber Security": <ShieldAlert className="w-4 h-4 text-[#315C3D]" />,
    "Django – Python": <Globe className="w-4 h-4 text-[#497A52]" />,
    "Data Science – Python": <BarChart3 className="w-4 h-4 text-[#315C3D]" />,
    "Image Processing – MATLAB": <Eye className="w-4 h-4 text-[#497A52]" />,
    "Deep Learning": <Eye className="w-4 h-4 text-[#315C3D]" />,
    "Artificial Intelligence": <BrainCircuit className="w-4 h-4 text-[#315C3D]" />,
    "Web Application – PHP": <Globe className="w-4 h-4 text-[#497A52]" />,
    "Android – Java": <Smartphone className="w-4 h-4 text-[#315C3D]" />,
    "Big Data – Python / Java": <Cpu className="w-4 h-4 text-[#497A52]" />,
    "Big Data – Python/Java": <Cpu className="w-4 h-4 text-[#497A52]" />,
    "Big Data - Python / Java": <Cpu className="w-4 h-4 text-[#497A52]" />,
    "Image Processing – Python": <Eye className="w-4 h-4 text-[#315C3D]" />,
    "Image Processing - Python": <Eye className="w-4 h-4 text-[#315C3D]" />,
    "Cloud Computing – Python / Java": <Cloud className="w-4 h-4 text-[#497A52]" />,
    "Cloud Computing – Python/Java": <Cloud className="w-4 h-4 text-[#497A52]" />,
    "Cloud Computing - Python / Java": <Cloud className="w-4 h-4 text-[#497A52]" />,
    "Data Mining – Python / Java": <BarChart3 className="w-4 h-4 text-[#315C3D]" />,
    "Data Mining – Python/Java": <BarChart3 className="w-4 h-4 text-[#315C3D]" />,
    "Data Mining - Python / Java": <BarChart3 className="w-4 h-4 text-[#315C3D]" />,
    "Blockchain – Python / Java / DotNet": <Layers className="w-4 h-4 text-[#497A52]" />,
    "Blockchain – Python/Java/DotNet": <Layers className="w-4 h-4 text-[#497A52]" />,
    "Blockchain - Python / Java / DotNet": <Layers className="w-4 h-4 text-[#497A52]" />,
    "Machine Learning – Python": <Cpu className="w-4 h-4 text-[#315C3D]" />,
    "Machine Learning - Python": <Cpu className="w-4 h-4 text-[#315C3D]" />,
    "AI & Data Science": <BrainCircuit className="w-4 h-4 text-[#315C3D]" />,
    "Machine Learning": <Cpu className="w-4 h-4 text-[#497A52]" />,
    "Web Development": <Globe className="w-4 h-4 text-[#497A52]" />,
    "Mobile App Development": <Smartphone className="w-4 h-4 text-[#315C3D]" />,
    "Cloud Computing": <Cloud className="w-4 h-4 text-[#497A52]" />,
    "Data Analytics": <BarChart3 className="w-4 h-4 text-[#497A52]" />,
  };

  return (
    <div
      className="absolute top-full left-1/2 -translate-x-[36%] mt-3 w-[920px] max-w-[95vw] bg-[#FFFFFF] rounded-2xl border border-[#DDDCCF] shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150"
      role="menu"
      aria-label="Projects Menu"
    >
      {/* 1. Header Bar with Official AntiMatrix Logo */}
      <div className="px-6 py-3.5 bg-[#EEE9DC] border-b border-[#DDDCCF] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2 group transition-opacity hover:opacity-90"
          >
            <div className="relative h-7 w-auto flex items-center">
              <Image
                src="/images/anti-matrix-logo.png"
                alt="Anti-Matrix Official Logo"
                width={140}
                height={30}
                className="h-6 w-auto object-contain"
                priority
              />
            </div>
          </Link>
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[#DDDCCF]">
            <span className="text-xs font-semibold text-[#202820]">
              Project Center
            </span>
            <span className="text-[#DDDCCF]">•</span>
            <span className="text-[11px] text-[#667064] font-medium">
              Curated Tech &amp; Industry Frameworks
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#DCE8D9] border border-[#DDDCCF] text-[#315C3D] text-[11px] font-semibold font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#315C3D] animate-pulse" />
            2025-26 Edition
          </span>
        </div>
      </div>

      {/* Main Dual Panel Body */}
      <div className="grid grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#DDDCCF]">
        {/* Left Side: 10 Project Domains (cols 7) */}
        <div className="col-span-12 md:col-span-7 p-5 bg-[#FFFFFF]">
          <div className="flex items-center justify-between mb-3.5 px-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF]">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#202820] font-mono">
                  16 Technical Domains
                </h3>
                <p className="text-[11px] text-[#667064]">
                  Official AntiMatrix Engineering Catalog
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono font-semibold text-[#315C3D] bg-[#DCE8D9] px-2 py-0.5 rounded-md border border-[#DDDCCF]">
              16 Domains
            </span>
          </div>

          {/* 16 Domains 2-Column Grid */}
          <div className="grid grid-cols-2 gap-1.5 max-h-[380px] overflow-y-auto pr-1">
            {PROJECT_CATEGORIES.map((category) => {
              const details = DOMAIN_DETAILS[category];
              const domainCode = CATEGORY_SLUG_MAP[category];
              return (
                <Link
                  key={category}
                  href={domainCode ? `/projects/${domainCode}` : `/projects`}
                  onClick={onClose}
                  className="group flex items-start gap-2.5 p-2 rounded-xl border border-transparent hover:border-[#315C3D] hover:bg-[#EEE9DC] transition-all duration-150"
                >
                  <div className="p-2 rounded-lg bg-[#F5F1E7] border border-[#DDDCCF] text-[#315C3D] group-hover:bg-[#315C3D] group-hover:text-white transition-colors shrink-0 mt-0.5">
                    {categoryIcons[category] || <Layers className="w-4 h-4 text-[#315C3D]" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#202820] group-hover:text-[#315C3D] transition-colors truncate">
                        {category}
                      </span>
                      <ChevronRight className="w-3 h-3 text-[#667064] group-hover:text-[#315C3D] group-hover:translate-x-0.5 transition-all shrink-0 ml-1 opacity-0 group-hover:opacity-100" />
                    </div>
                    <span className="block text-[10px] text-[#667064] transition-colors font-mono truncate">
                      {details?.tag || "Source Code & PPT"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Side: Featured Projects with Thumbnails (cols 5) */}
        <div className="col-span-12 md:col-span-5 p-5 bg-[#EEE9DC] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5 px-1">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#315C3D]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#202820] font-mono">
                  Featured Projects
                </h3>
              </div>
              <span className="text-[10px] font-bold text-[#315C3D] bg-[#DCE8D9] border border-[#DDDCCF] px-2 py-0.5 rounded-full">
                High Distinction
              </span>
            </div>

            {/* 4 Example Projects Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {DROPDOWN_FEATURED_PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="group bg-[#FFFFFF] rounded-xl border border-[#DDDCCF] overflow-hidden shadow-xs hover:border-[#315C3D] transition-all duration-200 flex flex-col"
                >
                  {/* Thumbnail Image */}
                  <Link
                    href={proj.href}
                    onClick={onClose}
                    className="relative aspect-video w-full overflow-hidden bg-[#F5F1E7] block"
                  >
                    <Image
                      src={proj.thumbnail}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 200px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Project Details */}
                  <div className="p-2.5 flex-1 flex flex-col justify-between gap-1.5">
                    <div>
                      <Link
                        href={proj.href}
                        onClick={onClose}
                        className="text-[11px] font-bold text-[#202820] group-hover:text-[#315C3D] transition-colors line-clamp-1 block"
                        title={proj.title}
                      >
                        {proj.title}
                      </Link>
                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {proj.techStack.slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#F5F1E7] text-[#667064] border border-[#DDDCCF]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View Project Button */}
                    <Link
                      href={proj.href}
                      onClick={onClose}
                      className="mt-1 inline-flex items-center justify-between text-[11px] font-bold text-[#315C3D] hover:text-[#497A52] pt-1 border-t border-[#DDDCCF] group-hover:border-[#315C3D]/40 transition-colors"
                    >
                      <span>View Project</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#DDDCCF] text-[11px] text-[#667064] flex items-center justify-between">
            <span>Includes Code, PPT, SRS &amp; Viva Prep</span>
            <span className="font-semibold text-[#315C3D]">100% University Verified</span>
          </div>
        </div>
      </div>

      {/* 5. Bottom Bar: "Request a Custom Requirement" + "View All Projects →" */}
      <div className="px-6 py-3 bg-[#EEE9DC] border-t border-[#DDDCCF] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-[#667064]">
          <span className="font-semibold text-[#202820]">Need a custom topic?</span>
          <button
            type="button"
            onClick={() => {
              onClose();
              openConsultationModal({ requirement: "Custom Project / Special Requirement" });
            }}
            className="text-[#285A3B] hover:text-[#214930] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Request a Custom Requirement</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

        <Link
          href="/projects"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#285A3B] hover:bg-[#214930] text-white text-xs font-bold shadow-xs hover:shadow transition-all group shrink-0"
        >
          <span>View All Projects</span>
          <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
