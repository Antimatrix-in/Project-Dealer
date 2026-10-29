"use client";

import React, { useState, useMemo } from "react";
import SectionHeader from "@/components/common/SectionHeader";
import ProjectCard from "@/components/common/ProjectCard";
import { PROJECTS_DATA, PROJECT_CATEGORIES } from "@/data/projects";
import { Search, X, FolderOpen } from "lucide-react";
import { openConsultationModal } from "@/components/common/ConsultationModal";
import CtaBanner from "@/components/home/CtaBanner";

interface ProjectsCatalogClientProps {
  initialCategory?: string;
}

export default function ProjectsCatalogClient({
  initialCategory = "All"
}: ProjectsCatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState("All");

  const categories = ["All", ...PROJECT_CATEGORIES];
  const levels = ["All", "UG Final Year", "PG / M.Tech"];

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" ||
        project.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesLevel =
        selectedLevel === "All" || project.level.includes(selectedLevel);

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.techStack.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLevel("All");
  };

  return (
    <div className="pt-28 pb-20 bg-[#F7F4E9] min-h-screen relative">
      {/* Background Header */}
      <div className="relative py-16 bg-[#EFEBDD] border-b border-[#DCDCCF] mb-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeader
            badge="Verified Project Repository"
            title="Explore Verified"
            titleGradient="Projects Catalog"
            subtitle="Browse verified and tested engineering projects across 10 modern domains with clean source code and complete thesis documentation."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar & Filters Control Center */}
        <div className="p-6 rounded-3xl bg-[#FFFDF7] border border-[#DCDCCF] shadow-xs mb-8 space-y-5">
          {/* Main Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-[#626B60] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by project title, keyword, or technology (e.g. PyTorch, YOLO, Spring Boot, Flutter, Kubernetes)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#F7F4E9] border border-[#DCDCCF] text-[#202820] placeholder-stone-400 text-sm focus:outline-none focus:border-[#244B35] focus:ring-1 focus:ring-[#244B35] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#626B60] hover:text-[#244B35] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills (10 Categories) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#202820] font-bold uppercase tracking-wider font-mono">
              <span>Domain Filter (10 Categories):</span>
              <span className="text-[#244B35]">
                {filteredProjects.length} Projects Available
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#244B35] text-white font-bold shadow-xs border border-[#244B35]"
                      : "bg-[#F7F4E9] text-[#626B60] hover:bg-[#EFEBDD] hover:text-[#202820] border border-[#DCDCCF]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Level & Reset Bar */}
          <div className="pt-2 border-t border-[#DCDCCF] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#626B60] font-medium">Project Level:</span>
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    selectedLevel === lvl
                      ? "bg-[#E4EBDD] border border-[#A9BFA3] text-[#244B35] font-bold"
                      : "bg-[#FFFDF7] text-[#626B60] hover:text-[#202820] border border-[#DCDCCF]"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {(searchQuery || selectedCategory !== "All" || selectedLevel !== "All") && (
              <button
                onClick={handleReset}
                className="text-[#244B35] hover:text-[#3F7650] font-bold flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Counter and Custom Project Request Callout */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
          <p className="text-[#626B60]">
            Showing <strong className="text-[#202820]">{filteredProjects.length}</strong> verified projects
          </p>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#626B60]">Have a custom topic or university guide requirement?</span>
            <button
              onClick={() => openConsultationModal()}
              className="text-[#244B35] hover:text-[#3F7650] font-bold cursor-pointer underline"
            >
              Request Custom Project &rarr;
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-3xl bg-[#FFFDF7] border border-[#DCDCCF] space-y-4 shadow-xs">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#E4EBDD] border border-[#A9BFA3] flex items-center justify-center text-[#244B35]">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#202820]">No projects found for this query</h3>
            <p className="text-sm text-[#626B60] max-w-md mx-auto">
              We frequently develop customized projects on request. Share your problem statement or guide&apos;s remarks with our mentors!
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-[#FFFDF7] hover:bg-[#EFEBDD] text-[#202820] text-xs font-semibold border border-[#DCDCCF] cursor-pointer"
              >
                Clear Search
              </button>
              <button
                onClick={() =>
                  openConsultationModal({
                    projectTitle: searchQuery || "Custom Idea",
                  })
                }
                className="px-5 py-2 rounded-xl bg-[#244B35] hover:bg-[#1D3D2B] text-white font-bold text-xs shadow-xs cursor-pointer border border-[#244B35]"
              >
                Inquire for Custom Topic
              </button>
            </div>
          </div>
        )}

        {/* Contact Section: Need Help With Your Project? */}
        <div className="pt-16">
          <CtaBanner />
        </div>
      </div>
    </div>
  );
}

