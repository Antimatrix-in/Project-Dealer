"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types";
import { ArrowRight, CheckCircle, ClipboardList } from "lucide-react";
import { GOOGLE_ENQUIRY_FORM_URL } from "@/lib/whatsapp";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Map category to preview image or fallback
  const getProjectImage = () => {
    if (project.thumbnail) {
      return project.thumbnail;
    }
    // Category image fallbacks
    switch (project.category) {
      case "Deep Learning":
      case "AI & Data Science":
        return "/images/projects/plant-disease.jpg";
      case "Machine Learning":
      case "Data Analytics":
        return "/images/projects/ai-chatbot.jpg";
      case "Python Projects":
      case "Mobile App Development":
        return "/images/projects/student-attendance.jpg";
      default:
        return "/images/projects/ecommerce-platform.jpg";
    }
  };

  const projectImage = getProjectImage();
  const projectSlug = project.slug || project.id;

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-[#161616] border border-[#2A2A2A] p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.6)] hover:shadow-[0_18px_35px_-6px_rgba(255,121,0,0.15)] hover:border-[#FF7900] transition-all duration-300">
      <div>
        {/* Project Image */}
        <Link
          href={`/projects/${projectSlug}`}
          className="relative aspect-video w-full rounded-xl overflow-hidden mb-4 bg-[#1D1D1D] block group/img border border-[#2A2A2A]"
          aria-label={`Explore ${project.title}`}
        >
          <Image
            src={projectImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
            className="object-cover group-hover/img:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
        </Link>

        {/* Top bar: Category badge & Year */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#1D1D1D] text-[#FF7900] border border-[#FF7900]/30 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900]" />
            {project.category}
          </span>
          <span className="text-[11px] font-mono font-medium text-[#B8B8B8] bg-[#1D1D1D] px-2 py-0.5 rounded border border-[#2A2A2A]">
            {project.year}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#FFFFFF] group-hover:text-[#FF7900] transition-colors line-clamp-2 mb-2 leading-snug">
          <Link href={`/projects/${projectSlug}`}>
            {project.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-xs text-[#B8B8B8] line-clamp-2 mb-3.5 leading-relaxed font-normal">
          {project.tagline || project.description}
        </p>

        {/* Technology Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#1D1D1D] text-[#B8B8B8] border border-[#2A2A2A] font-mono"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#1D1D1D] text-[#B8B8B8] border border-[#2A2A2A]">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Key Deliverables Check */}
        <div className="grid grid-cols-2 gap-1.5 p-2.5 rounded-xl bg-[#1D1D1D] border border-[#2A2A2A] mb-4 text-[11px] text-[#B8B8B8]">
          <div className="flex items-center gap-1.5 truncate">
            <CheckCircle className="w-3.5 h-3.5 text-[#FF7900] shrink-0" />
            <span className="truncate">Source Code</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <CheckCircle className="w-3.5 h-3.5 text-[#FF7900] shrink-0" />
            <span className="truncate">Base Paper</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <CheckCircle className="w-3.5 h-3.5 text-[#FF7900] shrink-0" />
            <span className="truncate">PPT &amp; Report</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <CheckCircle className="w-3.5 h-3.5 text-[#FF7900] shrink-0" />
            <span className="truncate">Viva Defense Kit</span>
          </div>
        </div>
      </div>

      {/* Buttons: [ Explore Projects ] [ Enquire Now ] */}
      <div className="pt-3 border-t border-[#2A2A2A] flex items-center gap-2">
        <Link
          href={`/projects/${projectSlug}`}
          id={`explore-btn-${projectSlug}`}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#161616] hover:bg-[#1D1D1D] text-[#FFFFFF] hover:text-[#FF7900] border border-[#2A2A2A] hover:border-[#FF7900] font-bold text-xs text-center transition-all flex items-center justify-center gap-1.5 group/btn cursor-pointer shadow-xs"
        >
          <span>Explore Projects</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#FF7900] group-hover/btn:translate-x-0.5 transition-all" />
        </Link>
        <a
          href={GOOGLE_ENQUIRY_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#FF4500] hover:opacity-95 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 group/btn cursor-pointer border border-[#FF7900]/30 whitespace-nowrap"
        >
          <ClipboardList className="w-3.5 h-3.5 text-white group-hover/btn:scale-110 transition-transform" />
          <span>Enquire Now</span>
        </a>
      </div>
    </div>
  );
}
