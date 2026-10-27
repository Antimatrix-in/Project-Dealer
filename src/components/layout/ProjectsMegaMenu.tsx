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
  DOMAIN_DETAILS
} from "@/data/projects";
import { ProjectCategory } from "@/types";

interface ProjectsMegaMenuProps {
  onClose: () => void;
}

export default function ProjectsMegaMenu({ onClose }: ProjectsMegaMenuProps) {
  const categoryIcons: Record<ProjectCategory, React.ReactNode> = {
    "AI & Data Science": <BrainCircuit className="w-4 h-4 text-[#FF7900]" />,
    "Machine Learning": <Cpu className="w-4 h-4 text-[#FF9500]" />,
    "Deep Learning": <Eye className="w-4 h-4 text-[#FF7900]" />,
    "Python Projects": <FileCode2 className="w-4 h-4 text-[#FF9500]" />,
    "Java Projects": <Coffee className="w-4 h-4 text-[#FF7900]" />,
    "Web Development": <Globe className="w-4 h-4 text-[#FF9500]" />,
    "Mobile App Development": <Smartphone className="w-4 h-4 text-[#FF7900]" />,
    "Cloud Computing": <Cloud className="w-4 h-4 text-[#FF9500]" />,
    "Cyber Security": <ShieldAlert className="w-4 h-4 text-[#FF7900]" />,
    "Data Analytics": <BarChart3 className="w-4 h-4 text-[#FF9500]" />,
  };

  return (
    <div
      className="absolute top-full left-1/2 -translate-x-[36%] mt-3 w-[920px] max-w-[95vw] bg-[#161616] rounded-2xl border border-[#2A2A2A] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_4px_20px_-4px_rgba(255,121,0,0.15)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150"
      role="menu"
      aria-label="Projects Menu"
    >
      {/* 1. Header Bar with Official AntiMatrix Logo */}
      <div className="px-6 py-3.5 bg-[#101010] border-b border-[#2A2A2A] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2 group transition-opacity hover:opacity-90"
          >
            <div className="relative h-7 w-auto flex items-center">
              <Image
                src="/images/antimatrix-logo-clean.png"
                alt="AntiMatrix"
                width={120}
                height={28}
                className="h-6 w-auto object-contain brightness-0 invert"
                priority
              />
            </div>
          </Link>
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[#2A2A2A]">
            <span className="text-xs font-semibold text-[#FFFFFF]">
              Project Center
            </span>
            <span className="text-[#2A2A2A]">•</span>
            <span className="text-[11px] text-[#B8B8B8] font-medium">
              Curated Tech & Industry Frameworks
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1D1D1D] border border-[#FF7900]/40 text-[#FF7900] text-[11px] font-semibold font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900] animate-pulse" />
            2025-26 Edition
          </span>
        </div>
      </div>

      {/* Main Dual Panel Body */}
      <div className="grid grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#2A2A2A]">
        {/* Left Side: 10 Project Domains (cols 7) */}
        <div className="col-span-12 md:col-span-7 p-5 bg-[#161616]">
          <div className="flex items-center justify-between mb-3.5 px-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#1D1D1D] text-[#FF7900] border border-[#2A2A2A]">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF] font-mono">
                  10 Project Domains
                </h3>
                <p className="text-[11px] text-[#B8B8B8]">
                  Select your department or specialization
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono font-semibold text-[#FF7900] bg-[#1D1D1D] px-2 py-0.5 rounded-md border border-[#2A2A2A]">
              10 Domains
            </span>
          </div>

          {/* 10 Domains 2-Column Grid */}
          <div className="grid grid-cols-2 gap-1.5">
            {PROJECT_CATEGORIES.map((category) => {
              const details = DOMAIN_DETAILS[category];
              return (
                <Link
                  key={category}
                  href={`/projects?category=${encodeURIComponent(category)}`}
                  onClick={onClose}
                  className="group flex items-start gap-2.5 p-2 rounded-xl border border-transparent hover:border-[#FF7900] hover:bg-[#1D1D1D] transition-all duration-150"
                >
                  <div className="p-2 rounded-lg bg-[#1D1D1D] border border-[#2A2A2A] text-[#FF7900] group-hover:bg-[#FF7900] group-hover:text-[#080808] transition-colors shrink-0 mt-0.5">
                    {categoryIcons[category]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#FFFFFF] group-hover:text-[#FF7900] transition-colors truncate">
                        {category}
                      </span>
                      <ChevronRight className="w-3 h-3 text-[#B8B8B8] group-hover:text-[#FF7900] group-hover:translate-x-0.5 transition-all shrink-0 ml-1 opacity-0 group-hover:opacity-100" />
                    </div>
                    <span className="block text-[10px] text-[#B8B8B8] transition-colors font-mono truncate">
                      {details?.tag || "Source Code & PPT"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Side: Featured Projects with Thumbnails (cols 5) */}
        <div className="col-span-12 md:col-span-5 p-5 bg-[#101010] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5 px-1">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF7900]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF] font-mono">
                  Featured Projects
                </h3>
              </div>
              <span className="text-[10px] font-bold text-[#FF7900] bg-[#1D1D1D] border border-[#FF7900]/30 px-2 py-0.5 rounded-full">
                High Distinction
              </span>
            </div>

            {/* 4 Example Projects Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {DROPDOWN_FEATURED_PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="group bg-[#161616] rounded-xl border border-[#2A2A2A] overflow-hidden shadow-xs hover:border-[#FF7900] transition-all duration-200 flex flex-col"
                >
                  {/* Thumbnail Image */}
                  <Link
                    href={proj.href}
                    onClick={onClose}
                    className="relative aspect-video w-full overflow-hidden bg-[#1D1D1D] block"
                  >
                    <Image
                      src={proj.thumbnail}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 200px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>

                  {/* Project Details */}
                  <div className="p-2.5 flex-1 flex flex-col justify-between gap-1.5">
                    <div>
                      <Link
                        href={proj.href}
                        onClick={onClose}
                        className="text-[11px] font-bold text-[#FFFFFF] group-hover:text-[#FF7900] transition-colors line-clamp-1 block"
                        title={proj.title}
                      >
                        {proj.title}
                      </Link>
                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {proj.techStack.slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#1D1D1D] text-[#B8B8B8] border border-[#2A2A2A]"
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
                      className="mt-1 inline-flex items-center justify-between text-[11px] font-bold text-[#FF7900] hover:text-[#FF9500] pt-1 border-t border-[#2A2A2A] group-hover:border-[#FF7900]/30 transition-colors"
                    >
                      <span>View Project</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#2A2A2A] text-[11px] text-[#B8B8B8] flex items-center justify-between">
            <span>Includes Code, PPT, SRS &amp; Viva Prep</span>
            <span className="font-semibold text-[#FF7900]">100% University Verified</span>
          </div>
        </div>
      </div>

      {/* 5. Bottom Bar: "View All Projects →" */}
      <div className="px-6 py-3 bg-[#101010] border-t border-[#2A2A2A] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-[#B8B8B8]">
          <span className="font-semibold text-[#FFFFFF]">Ready to start?</span>
          <span className="hidden sm:inline text-[#B8B8B8]">
            Explore 100+ UG/PG titles, documentation &amp; live demos.
          </span>
        </div>

        <Link
          href="/projects"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#FF4500] hover:opacity-95 text-white text-xs font-bold shadow-xs hover:shadow transition-all group shrink-0"
        >
          <span>View All Projects</span>
          <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
