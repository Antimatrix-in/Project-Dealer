import React from "react";
import Image from "next/image";
import SectionHeader from "@/components/common/SectionHeader";
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
  title: "About Us – UPWORKS",
  description: "Learn about UPWORKS, our mission, vision, engineering mentors, and commitment to student project development excellence.",
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
    <div className="pt-32 sm:pt-36 pb-20 bg-[#F4F6FA] min-h-screen text-[#263750]">
      {/* Background Header */}
      <div className="relative py-16 bg-white border-b border-[#DCE2EA] mb-12 overflow-hidden">
        <div className="w-full max-w-[1780px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 relative z-10 text-center">
          <SectionHeader
            badge="About UPWORKS"
            title="Pioneering Modern"
            titleGradient="Project Excellence"
            subtitle="Bridging the gap between cutting-edge technology innovation and university project requirements."
          />
        </div>
      </div>

      <div className="w-full max-w-[1780px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 space-y-20">
        {/* Company Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FFF5EB] border border-[#FED7AA] text-[#F58216] font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#F58216]" />
              <span>Founded by Engineers &amp; Industry Mentors</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101D38] tracking-tight leading-tight">
              Transforming Ideas into Real-World Success
            </h2>

            <p className="text-sm sm:text-base text-[#263750] leading-relaxed font-normal">
              <strong className="text-[#101D38]">UPWORKS</strong> is a premier project development and research guidance center. Projects should not be a chore of blindly downloading broken internet code. Instead, they should be the ultimate showcase where students master genuine engineering practices, solid architectures, and confident technical defense.
            </p>

            <p className="text-sm sm:text-base text-[#263750] leading-relaxed font-normal">
              Our team of former tech startup leads, research scholars, and full-stack architects has guided thousands of engineering candidates across B.E, B.Tech, M.Tech, and MCA programs to score distinction while understanding every line of code they present to external examiners.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#DCE2EA] space-y-1 shadow-xs">
                <span className="text-2xl font-bold font-mono text-[#F58216]">100%</span>
                <p className="text-xs text-[#101D38] font-bold">Plagiarism-Free Reports</p>
                <p className="text-[11px] text-[#5A6B82]">University standard compliant</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#DCE2EA] space-y-1 shadow-xs">
                <span className="text-2xl font-bold font-mono text-[#101D38]">24/7</span>
                <p className="text-xs text-[#101D38] font-bold">Technical Support</p>
                <p className="text-[11px] text-[#5A6B82]">Remote AnyDesk support</p>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="relative">
            <div className="relative rounded-3xl bg-[#FFFFFF] border border-[#DCE2EA] p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#DCE2EA]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#DCE2EA] p-1 flex items-center justify-center shadow-xs">
                    <Image
                      src="/images/upworks-icon.png"
                      alt="UPWORKS Official Emblem"
                      width={32}
                      height={32}
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#101D38]">UPWORKS Standards</h4>
                    <span className="text-[11px] text-[#F58216] font-mono">Project Excellence Framework</span>
                  </div>
                </div>
                <ShieldCheck className="w-6 h-6 text-[#F58216]" />
              </div>

              <div className="space-y-4 text-xs text-[#263750]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#F58216] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#101D38] block font-bold">University Standard Compliance</strong>
                    Rigorous alignment with current university project guidelines and syllabus requirements.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#F58216] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#101D38] block font-bold">Production Grade Code Quality</strong>
                    Modular design patterns, complete unit tests, and structured documentation.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#F58216] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#101D38] block font-bold">Guaranteed Working Execution</strong>
                    Tested across diverse operating systems (Windows, Ubuntu, macOS) with virtual environments.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#DCE2EA] space-y-4 shadow-xs hover:border-[#F58216] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF5EB] border border-[#FED7AA] flex items-center justify-center text-[#F58216]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#101D38]">Our Mission</h3>
            <p className="text-sm text-[#263750] leading-relaxed font-normal">
              To empower every engineering student with the tools, deep domain knowledge, and mentor guidance needed to build remarkable projects that inspire pride and earn top grades.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#DCE2EA] space-y-4 shadow-xs hover:border-[#F58216] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF5EB] border border-[#FED7AA] flex items-center justify-center text-[#F58216]">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#101D38]">Our Vision</h3>
            <p className="text-sm text-[#263750] leading-relaxed font-normal">
              To be the most trusted project guidance center, recognized for transforming complex emerging software concepts into accessible, practical learning experiences for student engineers.
            </p>
          </div>
        </div>

        {/* Our Expertise Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF5EB] border border-[#FED7AA] text-[#F58216] mb-2 font-mono">
              <Cpu className="w-3.5 h-3.5 text-[#F58216]" />
              <span>Technical Domain Mastery</span>
            </div>
            <h3 className="text-3xl font-extrabold text-[#101D38]">Our Core Expertise</h3>
            <p className="text-sm text-[#5A6B82] mt-2">
              Covering the complete spectrum of modern computer science and engineering disciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseAreas.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DCE2EA] shadow-xs space-y-2 hover:border-[#F58216] transition-all"
              >
                <div className="flex items-center gap-2 text-[#101D38] text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#F58216] shrink-0" />
                  <span>{exp.title}</span>
                </div>
                <p className="text-xs text-[#5A6B82] leading-relaxed pl-6">
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
