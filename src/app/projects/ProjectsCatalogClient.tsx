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
      return <Terminal className="w-5 h-5 text-[#F58216]" />;
    case "AMJV":
      return <Code2 className="w-5 h-5 text-[#101D38]" />;
    case "AMCY":
      return <ShieldAlert className="w-5 h-5 text-[#101D38]" />;
    case "AMDJ":
      return <Server className="w-5 h-5 text-[#F58216]" />;
    case "AMDS":
      return <Activity className="w-5 h-5 text-[#101D38]" />;
    case "AMIM":
      return <Eye className="w-5 h-5 text-[#F58216]" />;
    case "AMDL":
      return <BrainCircuit className="w-5 h-5 text-[#101D38]" />;
    case "AMAI":
      return <Cpu className="w-5 h-5 text-[#101D38]" />;
    case "AMPH":
      return <FileCode className="w-5 h-5 text-[#F58216]" />;
    case "AMAD":
      return <Smartphone className="w-5 h-5 text-[#101D38]" />;
    case "AMBD":
      return <Database className="w-5 h-5 text-[#F58216]" />;
    case "AMIP":
      return <Eye className="w-5 h-5 text-[#101D38]" />;
    case "AMCC":
      return <Cloud className="w-5 h-5 text-[#F58216]" />;
    case "AMDM":
      return <Share2 className="w-5 h-5 text-[#101D38]" />;
    case "AMBC":
      return <Network className="w-5 h-5 text-[#F58216]" />;
    case "AMML":
      return <BrainCircuit className="w-5 h-5 text-[#101D38]" />;
    default:
      return <Layers className="w-5 h-5 text-[#F58216]" />;
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
    <div className="pt-32 sm:pt-36 pb-20 bg-[#F4F6FA] min-h-screen text-[#263750]">
      {/* Hero Header */}
      <div className="relative py-16 bg-white border-b border-[#DCE2EA] mb-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeader
            badge="UPWORKS Technical Repository"
            title="Browse Projects by"
            titleGradient="Technical Domain"
            subtitle="Explore our 16 official engineering technical domains. Select a domain below to browse verified final-year projects, source code, and IEEE documentation."
          />

          {/* Quick Breadcrumbs */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-[#5A6B82]">
            <Link href="/" className="hover:text-[#F58216] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#F58216]">16 Technical Domains</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search & Navigation Bar */}
        <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DCE2EA] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search by project code or title */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#5A6B82] absolute left-3.5 top-1/2 -translate-y-1/2" />
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
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#F4F6FA] border border-[#DCE2EA] text-xs font-medium text-[#101D38] placeholder-[#5A6B82] focus:outline-none focus:border-[#F58216] focus:ring-1 focus:ring-[#F58216]"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveView("domains");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#5A6B82] hover:text-[#101D38]"
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
                  ? "bg-[#101D38] text-white shadow-xs"
                  : "bg-[#F4F6FA] text-[#101D38] hover:bg-[#FFF5EB] border border-[#DCE2EA]"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>16 Technical Domains</span>
            </button>
            <button
              onClick={() => setActiveView("allProjects")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeView === "allProjects" || searchQuery
                  ? "bg-[#101D38] text-white shadow-xs"
                  : "bg-[#F4F6FA] text-[#101D38] hover:bg-[#FFF5EB] border border-[#DCE2EA]"
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#DCE2EA] pb-4">
              <div>
                <h2 className="text-xl font-black text-[#101D38]">
                  Official Technical Domains
                </h2>
                <p className="text-xs text-[#5A6B82] mt-0.5">
                  Select any domain card to view curated IEEE projects and technical implementation details.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#FFF5EB] text-[#F58216] border border-[#FED7AA]">
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
                    className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DCE2EA] hover:border-[#F58216] hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
                  >
                    {/* Top Badges */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-2xl bg-[#F4F6FA] border border-[#DCE2EA] group-hover:bg-[#FFF5EB] group-hover:border-[#FED7AA] transition-colors">
                          {getDomainIcon(domain.code)}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#F4F6FA] text-[#5A6B82] border border-[#DCE2EA]">
                            #{domain.sno}
                          </span>
                          <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-md bg-[#FFF5EB] text-[#F58216] border border-[#FED7AA]">
                            {domain.code}
                          </span>
                        </div>
                      </div>

                      {/* Domain Name */}
                      <div>
                        <h3 className="text-base font-bold text-[#101D38] group-hover:text-[#F58216] transition-colors leading-snug">
                          {domain.name}
                        </h3>
                        <p className="text-xs text-[#5A6B82] mt-1.5 line-clamp-2 leading-relaxed">
                          {domain.description}
                        </p>
                      </div>
                    </div>

                    {/* Project Count & Action Button */}
                    <div className="pt-4 border-t border-[#DCE2EA] space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#5A6B82] font-medium">Available Projects:</span>
                        {hasProjects ? (
                          <span className="font-bold text-[#F58216] font-mono">
                            {domain.projectCount} {domain.projectCount === 1 ? "Project" : "Projects"}
                          </span>
                        ) : (
                          <span className="font-bold text-[#5A6B82] font-mono">
                            0 Projects
                          </span>
                        )}
                      </div>

                      {/* Empty state notice for 0 projects */}
                      {!hasProjects && (
                        <p className="text-[11px] italic text-[#5A6B82] bg-[#F4F6FA] p-2 rounded-xl border border-[#DCE2EA] text-center">
                          Projects for this domain will be available soon.
                        </p>
                      )}

                      {/* View Projects Button */}
                      <Link
                        href={`/projects/${domain.code}`}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border ${
                          hasProjects
                            ? "bg-[#101D38] hover:bg-[#1A2C50] text-white border-[#101D38] shadow-xs group-hover:translate-y-[-1px]"
                            : "bg-[#F4F6FA] hover:bg-[#DCE2EA] text-[#101D38] border-[#DCE2EA]"
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
            <div className="flex items-center justify-between border-b border-[#DCE2EA] pb-4">
              <div>
                <h2 className="text-xl font-black text-[#101D38]">
                  {searchQuery ? `Search Results for "${searchQuery}"` : "All Verified Projects"}
                </h2>
                <p className="text-xs text-[#5A6B82] mt-0.5">
                  Showing {filteredProjects.length} projects across our technical repository.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveView("domains");
                }}
                className="text-xs font-bold text-[#F58216] hover:underline cursor-pointer"
              >
                ← Back to 16 Domains
              </button>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="p-12 rounded-3xl bg-[#FFFFFF] border border-[#DCE2EA] text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-[#5A6B82] mx-auto" />
                <h3 className="text-base font-bold text-[#101D38]">No projects found</h3>
                <p className="text-xs text-[#5A6B82] max-w-md mx-auto">
                  We could not find any projects matching &quot;{searchQuery}&quot;. Please try another search term or browse by domain.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveView("domains");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#101D38] hover:bg-[#1A2C50] text-white text-xs font-bold mt-2 inline-block cursor-pointer"
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
