"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { TechnicalDomainWithCount } from "@/lib/projects";
import { Project } from "@/types";
import {
  ArrowLeft,
  Search,
  X,
  ChevronRight,
  ClipboardList,
  Eye,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  AlertCircle,
  FileCode2
} from "lucide-react";
import CtaBanner from "@/components/home/CtaBanner";
import { GOOGLE_ENQUIRY_FORM_URL } from "@/lib/whatsapp";
import { openConsultationModal } from "@/components/common/ConsultationModal";

interface DomainProjectsClientProps {
  domain: TechnicalDomainWithCount;
  projects: Project[];
}

export default function DomainProjectsClient({
  domain,
  projects
}: DomainProjectsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter ONLY within this selected domain
  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return projects;
    return projects.filter((p) => {
      const code = (p.projectCode || p.id || "").toLowerCase();
      const title = (p.title || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();
      const tech = (p.techStack || []).some((t) => t.toLowerCase().includes(q));
      return code.includes(q) || title.includes(q) || desc.includes(q) || tech;
    });
  }, [searchQuery, projects]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <div className="pt-32 sm:pt-36 pb-20 bg-[#F5F1E7] min-h-screen text-[#1F2A22]">
      {/* Top Header Bar */}
      <div className="relative py-14 bg-[#EEE9DC] border-b border-[#DDDCCF] mb-10 overflow-hidden">
        <div className="w-full max-w-[1780px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 relative z-10">
          {/* Breadcrumb Navigation & Back to Domains */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#667064]">
              <Link href="/" className="hover:text-[#315C3D] transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/projects" className="hover:text-[#315C3D] transition-colors">Projects</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#315C3D]">{domain.name}</span>
            </div>

            {/* Back to Domains button */}
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F5F1E7] border border-[#DDDCCF] text-xs font-bold text-[#202820] hover:text-[#315C3D] transition-all shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Domains</span>
            </Link>
          </div>

          {/* Domain Title & Metadata */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-mono font-black px-3 py-1 rounded-lg bg-[#315C3D] text-white tracking-wider">
                {domain.code}
              </span>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF]">
                Domain #{domain.sno}
              </span>
              <span className="text-xs font-mono font-semibold px-3 py-1 rounded-lg bg-[#FFFFFF] text-[#202820] border border-[#DDDCCF]">
                Total Projects: {projects.length}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-[#202820] tracking-tight">
              {domain.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#667064] max-w-3xl leading-relaxed">
              {domain.description} All projects under this technical domain include fully tested source code, IEEE base papers, and university review documentation.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1780px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 space-y-8">
        {/* Search Controls (within selected domain only) */}
        <div className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search within ${domain.name} by project code (e.g. ${domain.code}001) or title...`}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs font-medium text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D]"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#667064] hover:text-[#202820]"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-[#667064] font-mono">
            <span>
              Showing {filteredProjects.length} of {projects.length} {projects.length === 1 ? "Project" : "Projects"}
            </span>
            <button
              type="button"
              onClick={() =>
                openConsultationModal({
                  category: domain.name,
                  requirement: `Custom project requirement for domain ${domain.name} (${domain.code})`,
                })
              }
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EEE9DC] hover:bg-[#DCE8D9] text-[#202820] hover:text-[#315C3D] border border-[#DDDCCF] text-xs font-bold transition-all shadow-xs cursor-pointer font-sans"
              title="Request a Custom Project or Special Requirement"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#315C3D]" />
              <span>Request a Requirement</span>
            </button>
          </div>
        </div>

        {/* SCREEN 2: PROJECTS UNDER SELECTED DOMAIN */}
        {projects.length === 0 ? (
          /* Empty State for Domain with 0 Projects */
          <div className="p-12 sm:p-16 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F5F1E7] border border-[#DDDCCF] text-[#667064] flex items-center justify-center mx-auto">
              <FolderOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <span className="text-xs font-mono font-bold uppercase text-[#667064]">
                Domain Status • 0 Projects
              </span>
              <h2 className="text-xl font-bold text-[#202820]">
                Projects for this domain will be available soon.
              </h2>
              <p className="text-xs text-[#667064] leading-relaxed pt-1">
                No projects are currently listed under {domain.name} ({domain.code}). Projects for this domain will be available soon as they undergo review by our academic panel. You can submit a custom domain enquiry to request specific topics.
              </p>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() =>
                  openConsultationModal({
                    category: domain.name,
                    requirement: `Special requirement / custom project topic for ${domain.name} (${domain.code})`,
                  })
                }
                className="px-6 py-3 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Request a Requirement for {domain.code}
              </button>
              <Link
                href="/projects"
                className="px-6 py-3 rounded-xl bg-[#EEE9DC] hover:bg-[#DDDCCF] text-[#202820] font-bold text-xs transition-colors"
              >
                Explore Other Domains
              </Link>
            </div>
          </div>
        ) : filteredProjects.length === 0 ? (
          /* Empty Search Results within Domain */
          <div className="p-10 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-[#667064] mx-auto" />
            <h3 className="text-sm font-bold text-[#202820]">
              No projects in {domain.name} match &quot;{searchQuery}&quot;
            </h3>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleSearchChange("")}
                className="px-4 py-2 rounded-lg bg-[#EEE9DC] text-xs font-bold text-[#202820] hover:text-[#315C3D] cursor-pointer"
              >
                Clear search filter
              </button>
              <button
                type="button"
                onClick={() =>
                  openConsultationModal({
                    category: domain.name,
                    requirement: `Looking for: ${searchQuery} in ${domain.name} (${domain.code})`,
                  })
                }
                className="px-4 py-2 rounded-lg bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Request this Requirement
              </button>
            </div>
          </div>
        ) : (
          /* Projects Grid */
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProjects.map((project) => {
                const code = project.projectCode || project.id;
                const detailsUrl = `/projects/${domain.code}/${code}`;

                return (
                  <div
                    key={project.id}
                    className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-black px-2.5 py-1 rounded-md bg-[#DCE8D9] text-[#315C3D] border border-[#315C3D]/30">
                          {code}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-[#667064]">
                          {project.year || "2025-26 Edition"}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-base font-bold text-[#202820] group-hover:text-[#315C3D] transition-colors line-clamp-2 leading-snug">
                        {project.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-[#667064] line-clamp-3 leading-relaxed">
                        {project.description || project.tagline || "Complete final year IEEE aligned engineering project with source code and documentation."}
                      </p>

                      {/* Tech Stack Pills */}
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.techStack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-md bg-[#F5F1E7] border border-[#DDDCCF] text-[10px] text-[#202820] font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded-md bg-[#F5F1E7] text-[10px] text-[#667064]">
                              +{project.techStack.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons: View Details & Enquire */}
                    <div className="pt-4 border-t border-[#D8DDCF] grid grid-cols-2 gap-2.5">
                      <Link
                        href={detailsUrl}
                        className="w-full py-2.5 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] text-[#285A3B] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-[#D8DDCF]"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </Link>

                      <a
                        href={GOOGLE_ENQUIRY_FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl bg-[#285A3B] hover:bg-[#214930] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer border border-[#285A3B]"
                      >
                        <ClipboardList className="w-3.5 h-3.5" />
                        <span>Enquire</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-[#DDDCCF] bg-[#FFFFFF] text-xs font-bold text-[#202820] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EEE9DC] transition-colors cursor-pointer"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
                  const isNear = Math.abs(num - currentPage) <= 2;
                  const isEdge = num === 1 || num === totalPages;
                  if (!isNear && !isEdge) {
                    if (num === currentPage - 3 || num === currentPage + 3) {
                      return <span key={num} className="px-1 text-xs text-[#667064]">...</span>;
                    }
                    return null;
                  }
                  return (
                    <button
                      key={num}
                      onClick={() => setCurrentPage(num)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        currentPage === num
                          ? "bg-[#315C3D] text-white shadow-xs"
                          : "bg-[#FFFFFF] border border-[#DDDCCF] text-[#202820] hover:bg-[#EEE9DC]"
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-[#DDDCCF] bg-[#FFFFFF] text-xs font-bold text-[#202820] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EEE9DC] transition-colors cursor-pointer"
                >
                  Next
                </button>
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

function FolderOpen({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
    </svg>
  );
}

