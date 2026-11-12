"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types";
import { ArrowRight, ClipboardList } from "lucide-react";
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
    <div className="group relative flex flex-col justify-between rounded-2xl bg-[#FFFFFF] border border-[#DCE2EA] p-5 shadow-xs hover:shadow-md hover:border-[#F58216] transition-all duration-300">
      <div>
        {/* Project Image */}
        <Link
          href={`/projects/${projectSlug}`}
          className="relative aspect-video w-full rounded-xl overflow-hidden mb-4 bg-[#F4F6FA] block group/img border border-[#DCE2EA]"
          aria-label={`Explore ${project.title}`}
        >
          <Image
            src={projectImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
            className="object-cover group-hover/img:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Domain Title */}
        <h3 className="text-lg sm:text-xl font-bold text-[#101D38] group-hover:text-[#F58216] transition-colors line-clamp-1 mb-4 leading-snug">
          <Link href={`/projects/${projectSlug}`}>
            {project.title}
          </Link>
        </h3>
      </div>

      {/* Buttons: [ Explore Projects ] [ Enquire ] */}
      <div className="pt-3 border-t border-[#DCE2EA] flex items-center gap-2">
        <Link
          href={`/projects/${projectSlug}`}
          id={`explore-btn-${projectSlug}`}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#101D38] hover:bg-[#1A2C50] text-white font-bold text-xs text-center transition-all flex items-center justify-center gap-1.5 group/btn cursor-pointer shadow-xs border border-[#101D38]"
        >
          <span>Explore Projects</span>
          <ArrowRight className="w-3.5 h-3.5 text-white group-hover/btn:translate-x-0.5 transition-all" />
        </Link>
        <a
          href={GOOGLE_ENQUIRY_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F4F6FA] text-[#101D38] border border-[#DCE2EA] hover:border-[#F58216] hover:text-[#F58216] font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 group/btn cursor-pointer whitespace-nowrap"
        >
          <ClipboardList className="w-3.5 h-3.5 text-[#F58216] group-hover/btn:scale-110 transition-transform" />
          <span>Enquire</span>
        </a>
      </div>
    </div>
  );
}
