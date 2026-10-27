import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PROJECTS_DATA } from "@/data/projects";
import {
  ArrowLeft,
  Layers,
  Code2,
  FileCheck2,
  Presentation,
  CheckCircle2,
  Sparkles,
  Cpu,
  MonitorCheck,
  BookOpen,
  ArrowRight
} from "lucide-react";
import ProjectDetailActions from "./ProjectDetailActions";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

function findProject(paramId: string) {
  const decoded = decodeURIComponent(paramId).trim();
  const normalized = decoded.toLowerCase().replace(/[^a-z0-9]/g, "");

  // 1. Direct slug or id match
  let match = PROJECTS_DATA.find(
    (p) => p.slug === decoded || p.id === decoded
  );
  if (match) return match;

  // 2. Case-insensitive slug or id match
  match = PROJECTS_DATA.find(
    (p) =>
      p.slug.toLowerCase() === decoded.toLowerCase() ||
      p.id.toLowerCase() === decoded.toLowerCase()
  );
  if (match) return match;

  // 3. Normalized match
  match = PROJECTS_DATA.find((p) => {
    const pSlugNorm = p.slug.toLowerCase().replace(/[^a-z0-9]/g, "");
    const pIdNorm = p.id.toLowerCase().replace(/[^a-z0-9]/g, "");
    const pTitleNorm = p.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    const pCatNorm = p.category.toLowerCase().replace(/[^a-z0-9]/g, "");
    return (
      pSlugNorm === normalized ||
      pIdNorm === normalized ||
      pTitleNorm === normalized ||
      pCatNorm === normalized
    );
  });
  return match;
}

export async function generateStaticParams() {
  const ids = new Set<string>();
  PROJECTS_DATA.forEach((p) => {
    if (p.id) ids.add(p.id);
    if (p.slug) ids.add(p.slug);
  });
  return Array.from(ids).map((id) => ({ id }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = findProject(id);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} - AntiMatrix Project Center`,
    description: (project.abstract || project.description || project.tagline).slice(0, 160),
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = findProject(id);

  if (!project) {
    notFound();
  }

  const relatedProjects = PROJECTS_DATA.filter(
    (p) => p.category === project.category && p.id !== project.id && p.slug !== project.slug
  ).slice(0, 3);

  const projectImage =
    project.thumbnail ||
    (project.category === "Deep Learning" || project.category === "AI & Data Science"
      ? "/images/projects/plant-disease.jpg"
      : project.category === "Machine Learning" || project.category === "Data Analytics"
      ? "/images/projects/ai-chatbot.jpg"
      : project.category === "Python Projects" || project.category === "Mobile App Development"
      ? "/images/projects/student-attendance.jpg"
      : "/images/projects/ecommerce-platform.jpg");

  return (
    <div className="pt-28 pb-20 bg-[#080808] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb / Back button */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#B8B8B8] hover:text-[#FF7900] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-[#161616] border border-[#2A2A2A] text-white">
              {project.level}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#1D1D1D] border border-[#2A2A2A] text-[#FF7900] font-mono font-bold">
              {project.year}
            </span>
          </div>
        </div>

        {/* Top Header Banner Card with Project Preview Image */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#161616] border border-[#2A2A2A] shadow-xl mb-10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#1D1D1D] border border-[#2A2A2A] text-[#FF7900]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900]" />
                {project.category}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-[#B8B8B8] font-normal leading-relaxed">
                {project.tagline || project.description}
              </p>

              {/* Quick Action Buttons (Client Component) */}
              <div className="pt-2">
                <ProjectDetailActions projectTitle={project.title} category={project.category} />
              </div>
            </div>

            {/* Project Preview Image / Graphic */}
            <div className="lg:col-span-4">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#2A2A2A] shadow-md bg-[#101010] group">
                <Image
                  src={projectImage}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-[#2A2A2A]">
                    Live System Preview
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#FF7900] text-black font-bold">
                    {project.year}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Abstract, Features, Modules, Diagrams */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Abstract Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#161616] border border-[#2A2A2A] shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#2A2A2A]">
                <BookOpen className="w-5 h-5 text-[#FF7900]" />
                <h2 className="text-xl font-bold text-white">Project Abstract &amp; Technical Scope</h2>
              </div>
              <p className="text-sm text-[#B8B8B8] leading-relaxed font-normal whitespace-pre-line">
                {project.abstract}
              </p>

              {project.problemStatement && (
                <div className="mt-4 p-4 rounded-xl bg-[#1D1D1D] border border-[#2A2A2A] space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF7900] font-mono">
                    Problem Statement:
                  </h4>
                  <p className="text-xs text-[#B8B8B8] leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>
              )}

              {project.proposedSolution && (
                <div className="mt-3 p-4 rounded-xl bg-[#1D1D1D] border border-[#FF7900]/30 space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF9500] font-mono">
                    Proposed System Architecture:
                  </h4>
                  <p className="text-xs text-white leading-relaxed">
                    {project.proposedSolution}
                  </p>
                </div>
              )}
            </div>

            {/* Key Features Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#161616] border border-[#2A2A2A] shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#2A2A2A]">
                <Sparkles className="w-5 h-5 text-[#FF7900]" />
                <h2 className="text-xl font-bold text-white">Key Features &amp; Novelty</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#1D1D1D] border border-[#2A2A2A] flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FF7900] shrink-0 mt-0.5" />
                    <span className="text-xs text-white leading-normal font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Modules Breakdown */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#161616] border border-[#2A2A2A] shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#2A2A2A]">
                <Layers className="w-5 h-5 text-[#FF7900]" />
                <h2 className="text-xl font-bold text-white">Project Modules &amp; Workflow</h2>
              </div>
              <p className="text-xs text-[#B8B8B8]">
                Modular breakdown as required for Phase 1, Phase 2, and Final Review project submissions:
              </p>

              <div className="space-y-3 pt-2">
                {project.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#1D1D1D] border border-[#2A2A2A] hover:border-[#FF7900]/50 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">
                        {mod.name}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161616] text-[#FF7900] border border-[#2A2A2A]">
                        Module 0{idx + 1}
                      </span>
                    </div>
                    <p className="text-xs text-[#B8B8B8] leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Screenshots & Architecture Flow */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#161616] border border-[#2A2A2A] shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#2A2A2A]">
                <MonitorCheck className="w-5 h-5 text-[#FF7900]" />
                <h2 className="text-xl font-bold text-white">Screenshots &amp; Architecture Flow</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {(project.screenshots && project.screenshots.length > 0
                  ? project.screenshots
                  : [
                      {
                        title: "System Architecture Flow",
                        caption: `Complete modular block diagram and data pipeline for ${project.title}.`,
                        type: "architecture" as const,
                      },
                      {
                        title: "Interactive System Dashboard",
                        caption: "Live execution control panel showing real-time inputs, processing logs, and outputs.",
                        type: "dashboard" as const,
                      },
                      {
                        title: "Model Evaluation & Results",
                        caption: "Performance metrics, accuracy graphs, and comparative benchmark results.",
                        type: "results" as const,
                      },
                    ]
                ).map((screen, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#1D1D1D] border border-[#2A2A2A] space-y-2 group"
                  >
                    <div className="h-32 rounded-lg bg-[#101010] border border-[#2A2A2A] flex flex-col items-center justify-center p-3 text-center relative overflow-hidden transition-colors">
                      <Cpu className="w-8 h-8 text-[#FF7900] mb-2 group-hover:scale-110 transition-transform" />
                      <span className="font-mono text-xs font-semibold text-white z-10">
                        {screen.title}
                      </span>
                      <span className="text-[10px] text-[#FF9500] z-10 uppercase tracking-widest font-mono">
                        {screen.type} preview
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{screen.title}</h4>
                    <p className="text-[11px] text-[#B8B8B8] leading-relaxed line-clamp-2">
                      {screen.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Tech Stack, Documentation Deliverables, Mentor Support */}
          <div className="space-y-6">
            {/* Technologies Used Card */}
            <div className="p-6 rounded-3xl bg-[#161616] border border-[#2A2A2A] shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#2A2A2A]">
                <Code2 className="w-4 h-4 text-[#FF7900]" />
                <h3 className="text-base font-bold text-white">Technologies Used</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-[#1D1D1D] border border-[#2A2A2A] text-xs font-medium text-white font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Complete Documentation Included Card */}
            <div className="p-6 rounded-3xl bg-[#161616] border border-[#2A2A2A] shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#2A2A2A]">
                <FileCheck2 className="w-4 h-4 text-[#FF7900]" />
                <h3 className="text-base font-bold text-white">Documentation Included</h3>
              </div>
              <p className="text-xs text-[#B8B8B8]">
                Everything required for your university thesis submission is bundled:
              </p>
              <ul className="space-y-2.5 text-xs">
                {project.documentationIncluded.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white">
                    <CheckCircle2 className="w-4 h-4 text-[#FF7900] shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-[#2A2A2A]">
                <div className="p-3 rounded-xl bg-[#1D1D1D] border border-[#2A2A2A] text-[11px] text-white font-medium">
                  🛡️ <strong>Low Plagiarism Guarantee:</strong> Plagiarism similarity report included (Turnitin verified).
                </div>
              </div>
            </div>

            {/* Viva Guidance Card */}
            <div className="p-6 rounded-3xl bg-[#161616] border border-[#2A2A2A] shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <Presentation className="w-4 h-4 text-[#FF7900]" />
                <h3 className="text-base font-bold text-white">Viva Guidance</h3>
              </div>
              <p className="text-xs text-[#B8B8B8] leading-relaxed">
                Includes line-by-line algorithm walkthrough, mathematical derivations explanation, and 1-on-1 mock question drills before your exam.
              </p>
            </div>
          </div>
        </div>

        {/* Related Projects in Same Domain */}
        {relatedProjects.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#2A2A2A]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white">Related Projects</h3>
                <p className="text-xs sm:text-sm text-[#B8B8B8]">
                  More trending titles in {project.category}
                </p>
              </div>
              <Link
                href={`/projects?category=${encodeURIComponent(project.category)}`}
                className="text-xs font-bold text-[#FF7900] hover:text-[#FF9500] hover:underline flex items-center gap-1"
              >
                View all in domain <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <div
                  key={rel.id}
                  className="p-5 rounded-2xl bg-[#161616] border border-[#2A2A2A] hover:border-[#FF7900] shadow-xl transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1D1D1D] text-[#FF7900] border border-[#2A2A2A] mb-2 inline-block">
                      {rel.year}
                    </span>
                    <h4 className="text-sm font-bold text-white line-clamp-2 hover:text-[#FF7900]">
                      <Link href={`/projects/${rel.slug || rel.id}`}>{rel.title}</Link>
                    </h4>
                    <p className="text-xs text-[#B8B8B8] line-clamp-2 mt-1">
                      {rel.tagline}
                    </p>
                  </div>
                  <Link
                    href={`/projects/${rel.slug || rel.id}`}
                    id={`explore-rel-${rel.slug || rel.id}`}
                    className="pt-2 text-xs font-bold text-[#FF7900] hover:text-[#FF9500] flex items-center gap-1"
                  >
                    <span>Explore Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
