"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import SectionHeader from "@/components/common/SectionHeader";
import ProjectCard from "@/components/common/ProjectCard";
import { TechnicalDomainWithCount } from "@/lib/projects";
import { Project } from "@/types";
import {
  Search,
  X,
  FolderOpen,
  ArrowRight,
  Layers,
  ChevronRight,
  Cpu,
  Code2,
  Terminal,
  ShieldAlert,
  BrainCircuit,
  Eye,
  Server,
  Smartphone,
  Database,
  Cloud,
  FileCode,
  Network,
  Share2,
  Activity,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import CtaBanner from "@/components/home/CtaBanner";

interface ProjectsCatalogClientProps {
  initialCategory?: string;
  domains: TechnicalDomainWithCount[];
  allProjects: Project[];
}

// Icon helper for the 16 technical domains
function getDomainIcon(code: string) {
  switch (code.toUpperCase()) {
    case "AMPY":
      return <Terminal className="w-5 h-5 text-[#315C3D]" />;
    case "AMJV":
      return <Code2 className="w-5 h-5 text-[#315C3D]" />;
    case "AMCY":
      return <ShieldAlert className="w-5 h-5 text-[#315C3D]" />;
    case "AMDJ":
      return <Server className="w-5 h-5 text-[#315C3D]" />;
    case "AMDS":
      return <Activity className="w-5 h-5 text-[#315C3D]" />;
    case "AMIM":
      return <Eye className="w-5 h-5 text-[#315C3D]" />;
    case "AMDL":
      return <BrainCircuit className="w-5 h-5 text-[#315C3D]" />;
    case "AMAI":
      return <Cpu className="w-5 h-5 text-[#315C3D]" />;
    case "AMPH":
      return <FileCode className="w-5 h-5 text-[#315C3D]" />;
    case "AMAD":
      return <Smartphone className="w-5 h-5 text-[#315C3D]" />;
    case "AMBD":
      return <Database className="w-5 h-5 text-[#315C3D]" />;
    case "AMIP":
      return <Eye className="w-5 h-5 text-[#315C3D]" />;
    case "AMCC":
      return <Cloud className="w-5 h-5 text-[#315C3D]" />;
    case "AMDM":
      return <Share2 className="w-5 h-5 text-[#315C3D]" />;
    case "AMBC":
      return <Network className="w-5 h-5 text-[#315C3D]" />;
    case "AMML":
      return <BrainCircuit className="w-5 h-5 text-[#315C3D]" />;
    default:
      return <Layers className="w-5 h-5 text-[#315C3D]" />;
  }
}

export default function ProjectsCatalogClient({
  domains,
  allProjects
}: ProjectsCatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState<"domains" | "allProjects">("domains");

  // Filter projects if student types into search
  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allProjects;
    return allProjects.filter((p) => {
      const code = (p.projectCode || p.id || "").toLowerCase();
      const domainCode = (p.domainCode || "").toLowerCase();
      const title = (p.title || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();
      const tech = (p.techStack || []).some((t) => t.toLowerCase().includes(q));
      return code.includes(q) || domainCode.includes(q) || title.includes(q) || desc.includes(q) || tech;
    });
  }, [searchQuery, allProjects]);

  return (
    <div className="pt-32 sm:pt-36 pb-20 bg-[#F5F1E7] min-h-screen text-[#1F2A22]">
      {/* Hero Header */}
      <div className="relative py-16 bg-[#EEE9DC] border-b border-[#DDDCCF] mb-10 overflow-hidden">
        <div className="w-full max-w-[1780px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 relative z-10 text-center">
          <SectionHeader
            badge="Upwork Project Center Technical Repository"
            title="Browse Projects by"
            titleGradient="Technical Domain"
            subtitle="Explore our 16 official engineering technical domains. Select a domain below to browse verified final-year projects, source code, and IEEE documentation."
          />

          {/* Quick Breadcrumbs */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-[#667064]">
            <Link href="/" className="hover:text-[#315C3D] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#315C3D]">16 Technical Domains</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1780px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 space-y-8">
        {/* Search & Navigation Bar */}
        <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search by project code or title */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search across all projects by project code (e.g. AMPY001) or title..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim().length > 0) {
                  setActiveView("allProjects");
                }
              }}
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs font-medium text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D]"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveView("domains");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#667064] hover:text-[#202820]"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView("domains")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeView === "domains" && !searchQuery
                  ? "bg-[#315C3D] text-white shadow-xs"
                  : "bg-[#F5F1E7] text-[#202820] hover:bg-[#EEE9DC] border border-[#DDDCCF]"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>16 Technical Domains</span>
            </button>
            <button
              onClick={() => setActiveView("allProjects")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeView === "allProjects" || searchQuery
                  ? "bg-[#315C3D] text-white shadow-xs"
                  : "bg-[#F5F1E7] text-[#202820] hover:bg-[#EEE9DC] border border-[#DDDCCF]"
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              <span>All Projects ({allProjects.length})</span>
            </button>
          </div>
        </div>

        {/* SCREEN 1: TECHNICAL DOMAIN SELECTION (16 Domains Grid) */}
        {activeView === "domains" && !searchQuery && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#DDDCCF] pb-4">
              <div>
                <h2 className="text-xl font-black text-[#202820]">
                  Official Technical Domains
                </h2>
                <p className="text-xs text-[#667064] mt-0.5">
                  Select any domain card to view curated IEEE projects and technical implementation details.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF]">
                16 Verified Domains
              </span>
            </div>

            {/* 16 Domains 4-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {domains.map((domain) => {
                const hasProjects = domain.projectCount > 0;
                return (
                  <div
                    key={domain.code}
                    className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#D8DDCF] hover:border-[#285A3B] hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
                  >
                    {/* Top Badges */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-2xl bg-[#F5F1E7] border border-[#D8DDCF] group-hover:bg-[#DCE8D9] group-hover:border-[#285A3B]/30 transition-colors">
                          {getDomainIcon(domain.code)}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#F5F1E7] text-[#657166] border border-[#D8DDCF]">
                            #{domain.sno}
                          </span>
                          <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-md bg-[#DCE8D9] text-[#285A3B] border border-[#285A3B]/30">
                            {domain.code}
                          </span>
                        </div>
                      </div>

                      {/* Domain Name */}
                      <div>
                        <h3 className="text-base font-bold text-[#1F2A22] group-hover:text-[#285A3B] transition-colors leading-snug">
                          {domain.name}
                        </h3>
                        <p className="text-xs text-[#657166] mt-1.5 line-clamp-2 leading-relaxed">
                          {domain.description}
                        </p>
                      </div>
                    </div>

                    {/* Project Count & Action Button */}
                    <div className="pt-4 border-t border-[#D8DDCF] space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#657166] font-medium">Available Projects:</span>
                        {hasProjects ? (
                          <span className="font-bold text-[#285A3B] font-mono">
                            {domain.projectCount} {domain.projectCount === 1 ? "Project" : "Projects"}
                          </span>
                        ) : (
                          <span className="font-bold text-[#657166] font-mono">
                            0 Projects
                          </span>
                        )}
                      </div>

                      {/* Empty state notice for 0 projects */}
                      {!hasProjects && (
                        <p className="text-[11px] italic text-[#657166] bg-[#F5F1E7] p-2 rounded-xl border border-[#D8DDCF] text-center">
                          Projects for this domain will be available soon.
                        </p>
                      )}

                      {/* View Projects Button */}
                      <Link
                        href={`/projects/${domain.code}`}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                          hasProjects
                            ? "bg-[#285A3B] hover:bg-[#214930] text-white shadow-xs group-hover:translate-y-[-1px]"
                            : "bg-[#EEE9DC] hover:bg-[#D8DDCF] text-[#1F2A22]"
                        }`}
                      >
                        <span>View Projects</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SEARCH / ALL PROJECTS VIEW */}
        {(activeView === "allProjects" || searchQuery) && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#DDDCCF] pb-4">
              <div>
                <h2 className="text-xl font-black text-[#202820]">
                  {searchQuery ? `Search Results for "${searchQuery}"` : "All Verified Projects"}
                </h2>
                <p className="text-xs text-[#667064] mt-0.5">
                  Showing {filteredProjects.length} projects across our technical repository.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveView("domains");
                }}
                className="text-xs font-bold text-[#315C3D] hover:underline"
              >
                ← Back to 16 Domains
              </button>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="p-12 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-[#667064] mx-auto" />
                <h3 className="text-base font-bold text-[#202820]">No projects found</h3>
                <p className="text-xs text-[#667064] max-w-md mx-auto">
                  We could not find any projects matching &quot;{searchQuery}&quot;. Please try another search term or browse by domain.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveView("domains");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#315C3D] text-white text-xs font-bold mt-2 inline-block"
                >
                  View 16 Technical Domains
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-20">
        <CtaBanner />
      </div>
    </div>
  );
}
