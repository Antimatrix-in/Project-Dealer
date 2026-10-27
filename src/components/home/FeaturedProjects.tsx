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
    <section className="py-24 bg-white relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1E8] border border-[#FF6B00]/25 text-xs font-semibold text-[#FF6B00] mb-4 shadow-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
            <span className="uppercase tracking-wider text-[11px] font-bold">
              Verified Project Repository
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101828] tracking-tight">
            Featured <span className="text-gradient-orange-red">Projects</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#526581] leading-relaxed">
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
                  ? "bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] text-white shadow-md border border-transparent font-bold"
                  : "bg-white text-[#101828] hover:bg-[#FFF1E8] hover:text-[#FF6B00] border border-slate-200"
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] hover:opacity-95 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-[#FF3D3D]/30 group cursor-pointer shadow-[#FF6B00]/20"
          >
            <ClipboardList className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span>Project Enquiry</span>
          </a>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-[#FFF1E8]/50 border border-slate-200 text-[#101828] font-bold text-sm transition-all hover:border-[#FF6B00]/40 hover:shadow-md group"
          >
            <span>Explore All Projects in Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#FF6B00] group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
