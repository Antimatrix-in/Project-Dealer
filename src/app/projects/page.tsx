"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SectionHeader from "@/components/common/SectionHeader";
import ProjectCard from "@/components/common/ProjectCard";
import { PROJECTS_DATA, PROJECT_CATEGORIES } from "@/data/projects";
import { Search, X, FolderOpen } from "lucide-react";
import { openConsultationModal } from "@/components/common/ConsultationModal";
import CtaBanner from "@/components/home/CtaBanner";

function ProjectsCatalog() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

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
    <div className="pt-28 pb-20 bg-[#080808] min-h-screen relative">
      {/* Background Header with Subtle Orange Decorative Glows */}
      <div className="relative py-16 bg-[#101010] border-b border-[#2A2A2A] mb-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#FF7900]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#FF9500]/10 rounded-full blur-3xl pointer-events-none" />

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
        <div className="p-6 rounded-3xl bg-[#161616] border border-[#2A2A2A] shadow-xl mb-8 space-y-5">
          {/* Main Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-[#B8B8B8] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by project title, keyword, or technology (e.g. PyTorch, YOLO, Spring Boot, Flutter, Kubernetes)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#1D1D1D] border border-[#2A2A2A] text-white placeholder-[#B8B8B8] text-sm focus:outline-none focus:border-[#FF7900] focus:ring-1 focus:ring-[#FF7900] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B8B8B8] hover:text-[#FF7900] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills (10 Categories) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-white font-bold uppercase tracking-wider font-mono">
              <span>Domain Filter (10 Categories):</span>
              <span className="text-[#FF7900]">
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
                      ? "bg-gradient-to-r from-[#FF7900] to-[#FF4500] text-white font-bold shadow-md shadow-[#FF7900]/20"
                      : "bg-[#1D1D1D] text-[#B8B8B8] hover:bg-[#252525] hover:text-[#FF7900] border border-[#2A2A2A]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Level & Reset Bar */}
          <div className="pt-2 border-t border-[#2A2A2A] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#B8B8B8] font-medium">Project Level:</span>
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    selectedLevel === lvl
                      ? "bg-[#1D1D1D] border border-[#FF7900] text-[#FF7900] font-bold"
                      : "bg-[#161616] text-[#B8B8B8] hover:text-white border border-[#2A2A2A]"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {(searchQuery || selectedCategory !== "All" || selectedLevel !== "All") && (
              <button
                onClick={handleReset}
                className="text-[#FF7900] hover:text-[#FF9500] font-bold flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Counter and Custom Project Request Callout */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
          <p className="text-[#B8B8B8]">
            Showing <strong className="text-white">{filteredProjects.length}</strong> verified projects
          </p>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#B8B8B8]">Have a custom topic or university guide requirement?</span>
            <button
              onClick={() => openConsultationModal()}
              className="text-[#FF7900] hover:text-[#FF9500] font-bold cursor-pointer underline"
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
          <div className="text-center py-20 rounded-3xl bg-[#161616] border border-[#2A2A2A] space-y-4 shadow-xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#1D1D1D] border border-[#2A2A2A] flex items-center justify-center text-[#FF7900]">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">No projects found for this query</h3>
            <p className="text-sm text-[#B8B8B8] max-w-md mx-auto">
              We frequently develop customized projects on request. Share your problem statement or guide&apos;s remarks with our mentors!
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-[#1D1D1D] hover:bg-[#252525] text-white text-xs font-semibold border border-[#2A2A2A] cursor-pointer"
              >
                Clear Search
              </button>
              <button
                onClick={() =>
                  openConsultationModal({
                    projectTitle: searchQuery || "Custom Idea",
                  })
                }
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#FF4500] text-white font-bold text-xs shadow-md cursor-pointer"
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

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-40 text-center text-[#B8B8B8]">
          Loading project catalog...
        </div>
      }
    >
      <ProjectsCatalog />
    </Suspense>
  );
}
