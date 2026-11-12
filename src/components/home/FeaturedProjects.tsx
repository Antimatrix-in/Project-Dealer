"use client";

import React, { useState } from "react";
import Link from "next/link";
import ProjectCard from "@/components/common/ProjectCard";
import { PROJECTS_DATA, PROJECT_CATEGORIES } from "@/data/projects";
import { ArrowRight, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import { GOOGLE_ENQUIRY_FORM_URL } from "@/lib/whatsapp";

export default function FeaturedProjects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...PROJECT_CATEGORIES];

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS_DATA.slice(0, 6)
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory).slice(0, 6);

  return (
    <section className="py-24 bg-[#F4F6FA] relative border-t border-[#DCE2EA]">
      <div className="w-full max-w-[1780px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF5EB] border border-[#FED7AA] text-xs font-semibold text-[#F58216] mb-4 shadow-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#F58216] animate-pulse" />
            <span className="uppercase tracking-wider text-[11px] font-bold">
              Verified Project Repository
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101D38] tracking-tight">
            Featured <span className="text-[#F58216]">Projects</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#263750] leading-relaxed">
            Handpicked final year implementations with complete source code, standard base papers, documentation, and live demo access.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#101D38] text-white shadow-xs border border-[#101D38] font-bold"
                  : "bg-[#FFFFFF] text-[#5A6B82] hover:bg-[#FFF5EB] hover:text-[#101D38] border border-[#DCE2EA]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={GOOGLE_ENQUIRY_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#F58216] hover:bg-[#E0720F] text-white font-bold text-sm transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 border border-[#F58216] group cursor-pointer"
          >
            <ClipboardList className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span>Project Enquiry</span>
          </a>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F4F6FA] border border-[#101D38] text-[#101D38] hover:text-[#F58216] hover:border-[#F58216] font-bold text-sm transition-all group"
          >
            <span>Explore All Projects in Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#101D38] group-hover:text-[#F58216] group-hover:translate-x-1.5 transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
}
