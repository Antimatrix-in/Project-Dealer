import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import { COMPANY_STATS } from "@/data/reviews";
import {
  Sparkles,
  Target,
  Compass,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  ArrowRight,
  MessageCircle
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us - AntiMatrix Academic Project Center",
  description: "Learn about AntiMatrix, our mission, vision, engineering mentors, and commitment to student academic project excellence.",
};

export default function AboutPage() {
  const expertiseAreas = [
    {
      title: "Generative AI & LLMs",
      desc: "Transformer fine-tuning, RAG pipelines, LangChain, multimodal vision-language agents, and BioBERT implementations."
    },
    {
      title: "Machine Learning & Deep Learning",
      desc: "YOLOv10 object detection, Graph Neural Networks, MediaPipe landmark tracking, and 3D point cloud processing."
    },
    {
      title: "Enterprise Full Stack Systems",
      desc: "Next.js App Router, Spring Boot 3 microservices, high-concurrency WebSockets, and real-time collaboration platforms."
    },
    {
      title: "Cloud & IoT Edge Networks",
      desc: "Docker containerization, Knative serverless, Raspberry Pi edge computer vision, and Bluetooth Low Energy mesh routing."
    },
    {
      title: "Cyber Security & Cryptography",
      desc: "Intrusion detection systems, behavioral heuristic anomaly detection, and cryptographic Merkle proof auditing."
    },
    {
      title: "Cross-Platform Mobile Apps",
      desc: "Flutter, React Native, offline-first SQLite architectures, on-device mobile neural networks, and GIS mapping."
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      {/* Background Header */}
      <div className="relative py-16 bg-[#F8FAFC] border-b border-slate-200 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeader
            badge="About AntiMatrix"
            title="Pioneering Academic"
            titleGradient="Project Excellence"
            subtitle="Bridging the gap between cutting-edge technology innovation and university academic project requirements."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Company Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 border border-slate-200 text-[#0B1F4D]">
              <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Founded by Engineers &amp; Academic Mentors</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Transforming Ideas into Real-World Academic Success
            </h2>

            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed font-normal">
              <strong className="text-[#0B1F4D]">AntiMatrix</strong> is an academic project development and research guidance center. Academic projects should not be a chore of blindly downloading broken internet code. Instead, they should be the ultimate showcase where students master genuine engineering practices, solid architectures, and confident technical defense.
            </p>

            <p className="text-sm text-[#64748B] leading-relaxed font-normal">
              Our team of former tech startup leads, research scholars, and full-stack architects has guided thousands of engineering candidates across B.E, B.Tech, M.Tech, and MCA programs to score distinction while understanding every line of code they present to external examiners.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-1">
                <span className="text-2xl font-bold font-mono text-[#0B1F4D]">100%</span>
                <p className="text-xs text-[#0F172A] font-bold">Plagiarism-Free Reports</p>
                <p className="text-[11px] text-[#64748B]">University standard compliant</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-1">
                <span className="text-2xl font-bold font-mono text-[#D97706]">24/7</span>
                <p className="text-xs text-[#0F172A] font-bold">Technical Support</p>
                <p className="text-[11px] text-[#64748B]">Remote AnyDesk support</p>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="relative">
            <div className="relative rounded-3xl bg-white border border-slate-200 p-8 shadow-[0_4px_25px_-4px_rgba(11,31,77,0.06)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B1F4D] text-[#F5A623] flex items-center justify-center font-bold">
                    AM
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">AntiMatrix Standards</h4>
                    <span className="text-[11px] text-[#D97706] font-mono">Academic Excellence Framework</span>
                  </div>
                </div>
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>

              <div className="space-y-4 text-xs text-[#64748B]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F172A] block font-bold">Academic Standard Compliance</strong>
                    Rigorous alignment with current university project guidelines and syllabus requirements.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F172A] block font-bold">Production Grade Code Quality</strong>
                    Modular design patterns, complete unit tests, and structured documentation.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F172A] block font-bold">Guaranteed Working Execution</strong>
                    Tested across diverse operating systems (Windows, Ubuntu, macOS) with virtual environments.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Counters Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F5A623]">
              Verified Track Record
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1">
              Impact by the Numbers
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-2 shadow-xs"
              >
                <div className="text-3xl sm:text-4xl font-black text-[#0B1F4D] font-mono">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-[#0F172A]">{stat.label}</div>
                <p className="text-[11px] text-[#64748B]">{stat.change}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm hover:border-[#F5A623]/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0B1F4D]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A]">Our Mission</h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-normal">
              To empower every engineering student with the tools, deep domain knowledge, and mentor guidance needed to build remarkable academic projects that inspire pride and earn top grades.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm hover:border-[#F5A623]/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#F5A623]">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A]">Our Vision</h3>
            <p className="text-sm text-[#64748B] leading-relaxed font-normal">
              To be the most trusted academic project guidance center, recognized for transforming complex emerging software concepts into accessible, practical learning experiences for student engineers.
            </p>
          </div>
        </div>

        {/* Our Expertise Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 border border-slate-200 text-[#0B1F4D] mb-2">
              <Cpu className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Technical Domain Mastery</span>
            </div>
            <h3 className="text-3xl font-extrabold text-[#0F172A]">Our Core Expertise</h3>
            <p className="text-sm text-[#64748B] mt-2">
              Covering the complete spectrum of modern computer science and engineering disciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseAreas.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-[#F5A623]/50 transition-all"
              >
                <div className="flex items-center gap-2 text-[#0B1F4D] text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{exp.title}</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed pl-6">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to connect */}
        <div className="text-center pt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-primary-gold text-white font-bold text-sm shadow-md transition-all"
          >
            <span>Speak with an AntiMatrix Mentor</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="https://wa.me/919876543210"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-sm hover:bg-emerald-100 transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp Project Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
}
