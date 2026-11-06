import React from "react";
import Image from "next/image";
import SectionHeader from "@/components/common/SectionHeader";
import { COMPANY_STATS } from "@/data/reviews";
import {
  Sparkles,
  Target,
  Compass,
  CheckCircle2,
  Cpu,
  ShieldCheck
} from "lucide-react";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata = {
  title: "About Us - AntiMatrix Project Center",
  description: "Learn about AntiMatrix, our mission, vision, engineering mentors, and commitment to student project excellence.",
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
    <div className="pt-32 sm:pt-36 pb-20 bg-[#F5F1E7] min-h-screen text-[#1F2A22]">
      {/* Background Header */}
      <div className="relative py-16 bg-[#EEE9DC] border-b border-[#DDDCCF] mb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeader
            badge="About AntiMatrix"
            title="Pioneering Modern"
            titleGradient="Project Excellence"
            subtitle="Bridging the gap between cutting-edge technology innovation and university project requirements."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Company Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#DCE8D9] border border-[#DDDCCF] text-[#315C3D] font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#315C3D]" />
              <span>Founded by Engineers &amp; Industry Mentors</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202820] tracking-tight leading-tight">
              Transforming Ideas into Real-World Success
            </h2>

            <p className="text-sm sm:text-base text-[#667064] leading-relaxed font-normal">
              <strong className="text-[#315C3D]">AntiMatrix</strong> is a premier project development and research guidance center. Projects should not be a chore of blindly downloading broken internet code. Instead, they should be the ultimate showcase where students master genuine engineering practices, solid architectures, and confident technical defense.
            </p>

            <p className="text-sm sm:text-base text-[#667064] leading-relaxed font-normal">
              Our team of former tech startup leads, research scholars, and full-stack architects has guided thousands of engineering candidates across B.E, B.Tech, M.Tech, and MCA programs to score distinction while understanding every line of code they present to external examiners.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] space-y-1 shadow-xs">
                <span className="text-2xl font-bold font-mono text-[#315C3D]">100%</span>
                <p className="text-xs text-[#202820] font-bold">Plagiarism-Free Reports</p>
                <p className="text-[11px] text-[#667064]">University standard compliant</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] space-y-1 shadow-xs">
                <span className="text-2xl font-bold font-mono text-[#497A52]">24/7</span>
                <p className="text-xs text-[#202820] font-bold">Technical Support</p>
                <p className="text-[11px] text-[#667064]">Remote AnyDesk support</p>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="relative">
            <div className="relative rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#DDDCCF]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#DDDCCF] p-1 flex items-center justify-center shadow-xs">
                    <Image
                      src="/images/antimatrix-icon.png"
                      alt="Anti-Matrix Official Logo"
                      width={32}
                      height={32}
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#202820]">AntiMatrix Standards</h4>
                    <span className="text-[11px] text-[#315C3D] font-mono">Project Excellence Framework</span>
                  </div>
                </div>
                <ShieldCheck className="w-6 h-6 text-[#315C3D]" />
              </div>

              <div className="space-y-4 text-xs text-[#667064]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#315C3D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#202820] block font-bold">University Standard Compliance</strong>
                    Rigorous alignment with current university project guidelines and syllabus requirements.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#315C3D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#202820] block font-bold">Production Grade Code Quality</strong>
                    Modular design patterns, complete unit tests, and structured documentation.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#315C3D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#202820] block font-bold">Guaranteed Working Execution</strong>
                    Tested across diverse operating systems (Windows, Ubuntu, macOS) with virtual environments.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Counters Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#EEE9DC] border border-[#DDDCCF] shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#315C3D]">
              Verified Track Record
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#202820] mt-1">
              Impact by the Numbers
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] text-center space-y-2 shadow-xs"
              >
                <div className="text-3xl sm:text-4xl font-black text-[#202820] font-mono">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-[#315C3D]">{stat.label}</div>
                <p className="text-[11px] text-[#667064]">{stat.change}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] space-y-4 shadow-xs hover:border-[#315C3D] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#DCE8D9] border border-[#DDDCCF] flex items-center justify-center text-[#315C3D]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#202820]">Our Mission</h3>
            <p className="text-sm text-[#667064] leading-relaxed font-normal">
              To empower every engineering student with the tools, deep domain knowledge, and mentor guidance needed to build remarkable projects that inspire pride and earn top grades.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] space-y-4 shadow-xs hover:border-[#315C3D] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#DCE8D9] border border-[#DDDCCF] flex items-center justify-center text-[#315C3D]">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#202820]">Our Vision</h3>
            <p className="text-sm text-[#667064] leading-relaxed font-normal">
              To be the most trusted project guidance center, recognized for transforming complex emerging software concepts into accessible, practical learning experiences for student engineers.
            </p>
          </div>
        </div>

        {/* Our Expertise Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCE8D9] border border-[#DDDCCF] text-[#315C3D] mb-2 font-mono">
              <Cpu className="w-3.5 h-3.5 text-[#315C3D]" />
              <span>Technical Domain Mastery</span>
            </div>
            <h3 className="text-3xl font-extrabold text-[#202820]">Our Core Expertise</h3>
            <p className="text-sm text-[#667064] mt-2">
              Covering the complete spectrum of modern computer science and engineering disciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseAreas.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-xs space-y-2 hover:border-[#315C3D] transition-all"
              >
                <div className="flex items-center gap-2 text-[#202820] text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#315C3D] shrink-0" />
                  <span>{exp.title}</span>
                </div>
                <p className="text-xs text-[#667064] leading-relaxed pl-6">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section: Need Help With Your Project? */}
        <div className="pt-8">
          <CtaBanner />
        </div>
      </div>
    </div>
  );
}
