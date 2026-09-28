"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/types";
import { ArrowRight, CheckCircle, ExternalLink, Cpu, Activity, ShieldCheck, Database, Smartphone } from "lucide-react";
import { openConsultationModal } from "./ConsultationModal";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Domain-specific visual badge & mock preview
  const getDomainGraphic = () => {
    switch (project.category) {
      case "AI & Data Science":
      case "Machine Learning":
      case "Deep Learning":
        return (
          <div className="h-36 rounded-xl bg-gradient-to-br from-[#0B1F4D] to-[#142A63] p-3 text-white flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center justify-between text-[11px] relative z-10">
              <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Model Inference Active
              </span>
              <span className="bg-amber-400/20 text-[#F5A623] px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                Acc: 98.6%
              </span>
            </div>
            <div className="relative z-10 my-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 border border-white/15 backdrop-blur-md text-xs font-mono">
                <Cpu className="w-4 h-4 text-[#F5A623]" />
                <span>PyTorch • ResNet/YOLO</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-300 font-mono relative z-10">
              <span>Input: 1080p Stream</span>
              <span>14ms Latency</span>
            </div>
          </div>
        );
      case "Cyber Security":
        return (
          <div className="h-36 rounded-xl bg-gradient-to-br from-[#1E1B4B] to-[#311042] p-3 text-white flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center justify-between text-[11px] relative z-10">
              <span className="font-mono text-rose-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Zero-Day NIDS Shield
              </span>
              <span className="bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded text-[10px] font-mono">
                DPI Active
              </span>
            </div>
            <div className="relative z-10 my-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 border border-white/15 backdrop-blur-md text-xs font-mono">
                <span>Packet Inspection Engine</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-300 font-mono relative z-10">
              <span>Threat Score: 0.001</span>
              <span>Firewall Linked</span>
            </div>
          </div>
        );
      case "Mobile App Development":
        return (
          <div className="h-36 rounded-xl bg-gradient-to-br from-[#0C4A6E] to-[#075985] p-3 text-white flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center justify-between text-[11px] relative z-10">
              <span className="font-mono text-sky-300 font-semibold flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5" />
                Flutter Cross-Platform
              </span>
              <span className="bg-sky-400/20 text-sky-200 px-2 py-0.5 rounded text-[10px] font-mono">
                60 FPS
              </span>
            </div>
            <div className="relative z-10 my-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 border border-white/15 backdrop-blur-md text-xs font-mono">
                <span>BLE Mesh Offline-First</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-300 font-mono relative z-10">
              <span>Android &amp; iOS</span>
              <span>Local SQLite Sync</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="h-36 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-3 text-white flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center justify-between text-[11px] relative z-10">
              <span className="font-mono text-amber-400 font-semibold flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" />
                Full Stack Architecture
              </span>
              <span className="bg-white/10 text-slate-200 px-2 py-0.5 rounded text-[10px] font-mono">
                Production Ready
              </span>
            </div>
            <div className="relative z-10 my-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 border border-white/15 backdrop-blur-md text-xs font-mono">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>REST API • Microservices</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-300 font-mono relative z-10">
              <span>University Standard Compliant</span>
              <span>100% Tested</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 p-5 shadow-[0_4px_20px_-4px_rgba(11,31,77,0.05)] hover:shadow-[0_18px_35px_-6px_rgba(11,31,77,0.1)] hover:border-[#F5A623]/60 transition-all duration-300">
      <div>
        {/* Mockup Screenshot Visual Header */}
        <div className="mb-4">
          {getDomainGraphic()}
        </div>

        {/* Top bar: Category badge & Year */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
            {project.category}
          </span>
          <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            {project.year}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#0B1F4D] transition-colors line-clamp-2 mb-2 leading-snug">
          <Link href={`/projects/${project.id}`}>
            {project.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-xs text-[#64748B] line-clamp-2 mb-3.5 leading-relaxed font-normal">
          {project.tagline || project.description}
        </p>

        {/* Technology Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200 font-mono"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-50 text-slate-500 border border-slate-200">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Key Deliverables Check */}
        <div className="grid grid-cols-2 gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-100 mb-4 text-[11px] text-[#0F172A]">
          <div className="flex items-center gap-1.5 truncate">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">Source Code</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">Base Paper</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">PPT &amp; Report</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">Viva Defense Kit</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
        <Link
          href={`/projects/${project.id}`}
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-bold text-xs text-center transition-all flex items-center justify-center gap-1.5"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
        </Link>
        <button
          onClick={() =>
            openConsultationModal({
              projectTitle: project.title,
              category: project.category,
            })
          }
          className="py-2.5 px-3.5 rounded-xl btn-primary-gold text-white font-bold text-xs shadow-sm transition-all cursor-pointer whitespace-nowrap"
        >
          Inquire
        </button>
      </div>
    </div>
  );
}
