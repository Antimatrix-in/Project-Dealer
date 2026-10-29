"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  Check,
  Cpu,
  Activity,
  CheckCircle2,
  ClipboardList
} from "lucide-react";
import { motion } from "framer-motion";
import { getWhatsAppUrl, GOOGLE_ENQUIRY_FORM_URL } from "@/lib/whatsapp";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"plant" | "attendance" | "chatbot">("plant");

  const trustFeatures = [
    "Customized Projects",
    "Complete Documentation",
    "Source Code Included",
    "Viva Preparation",
    "Technical Support",
  ];

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-[#F7F4E9]">
      {/* Extremely subtle warm background grid */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Hero Headline, Subtitle, Trust Features & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Small Premium Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4EBDD] border border-[#A9BFA3] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#244B35] animate-pulse shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-[1px] text-[#244B35] font-mono">
                Trusted Project Center
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#202820] tracking-tight leading-[1.14]">
              Transform Your Ideas Into{" "}
              <span className="text-[#244B35] block sm:inline">
                Real-World Projects
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#626B60] leading-relaxed max-w-xl font-normal">
              Expert guidance for AI, Machine Learning, Web Development, Mobile Applications, Python, Java, and Data Science Projects.
            </p>

            {/* Trust Features Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 pb-2">
              {trustFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#202820]">
                  <div className="w-4 h-4 rounded-full bg-[#E4EBDD] flex items-center justify-center text-[#244B35] shrink-0 border border-[#A9BFA3]">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">
              {/* WhatsApp Us */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#FFFDF7] hover:bg-[#EFEBDD] text-[#244B35] hover:text-[#1D3D2B] border border-[#DCDCCF] hover:border-[#244B35] font-bold text-sm shadow-xs transition-all flex items-center gap-2.5"
              >
                <MessageCircle className="w-4 h-4 text-[#244B35]" />
                <span>WhatsApp Us</span>
              </a>

              {/* Project Enquiry (Forest Green) */}
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl bg-[#244B35] hover:bg-[#1D3D2B] text-white font-bold text-sm shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2.5 group cursor-pointer border border-[#244B35]"
              >
                <ClipboardList className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Project Enquiry</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Modern Laptop Mockup with Live AI Project Dashboard & Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 relative flex justify-center items-center mt-6 lg:mt-0"
          >
            {/* Floating Technology Pills */}
            <div className="absolute -top-6 left-2 sm:left-6 z-20 hidden sm:flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-xl bg-[#FFFDF7] border border-[#DCDCCF] shadow-sm flex items-center gap-1.5 text-xs font-bold text-[#202820]">
                <span className="text-[#244B35]">🐍</span> Python
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-[#FFFDF7] border border-[#DCDCCF] shadow-sm flex items-center gap-1.5 text-xs font-bold text-[#202820]">
                <span className="text-[#3F7650]">⚛️</span> React
              </div>
            </div>

            <div className="absolute -bottom-6 left-8 z-20 hidden sm:flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-xl bg-[#FFFDF7] border border-[#DCDCCF] shadow-sm flex items-center gap-1.5 text-xs font-bold text-[#202820]">
                <span className="text-[#244B35]">☕</span> Java
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-[#FFFDF7] border border-[#DCDCCF] shadow-sm flex items-center gap-1.5 text-xs font-bold text-[#202820]">
                <span className="text-[#3F7650]">📱</span> Flutter
              </div>
            </div>

            <div className="absolute -top-4 -right-2 sm:right-6 z-20">
              <div className="px-3 py-1.5 rounded-xl bg-[#FFFDF7] border border-[#A9BFA3] shadow-sm flex items-center gap-1.5 text-xs font-bold text-[#244B35]">
                <span>⚡</span> TensorFlow
              </div>
            </div>

            <div className="absolute -bottom-4 right-4 z-20">
              <div className="px-3.5 py-1.5 rounded-xl bg-[#FFFDF7] text-[#244B35] border border-[#A9BFA3] shadow-sm flex items-center gap-1.5 text-xs font-bold">
                <span>🧠</span> AI/ML Engine
              </div>
            </div>

            {/* MODERN LAPTOP MOCKUP WITH CLEAN TECHNICAL DASHBOARD */}
            <div className="w-full max-w-[560px] relative">
              {/* Laptop Screen Bezel */}
              <div className="bg-[#EFEBDD] p-2.5 sm:p-3.5 rounded-t-2xl sm:rounded-t-3xl shadow-xl border border-[#DCDCCF] relative">
                {/* Camera dot */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#626B60] ring-1 ring-[#DCDCCF]" />

                {/* Laptop Inner Screen */}
                <div className="bg-[#FFFDF7] rounded-lg sm:rounded-xl overflow-hidden font-sans border border-[#DCDCCF] shadow-xs">
                  
                  {/* Window Title Bar */}
                  <div className="bg-[#EFEBDD] px-3 py-2 border-b border-[#DCDCCF] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#A9BFA3] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3F7650] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#244B35] inline-block" />
                      <span className="ml-2 text-[10px] text-[#626B60] font-mono hidden sm:inline">
                        AntiMatrix Studio ~ AI Model Inspector v3.4
                      </span>
                    </div>

                    {/* Dashboard Tab Selector */}
                    <div className="flex items-center gap-1 bg-[#FFFDF7] border border-[#DCDCCF] p-0.5 rounded-md text-[10px] font-medium">
                      <button
                        onClick={() => setActiveTab("plant")}
                        className={`px-2 py-0.5 rounded transition-colors ${
                          activeTab === "plant" ? "bg-[#244B35] text-white font-bold" : "text-[#626B60] hover:text-[#202820]"
                        }`}
                      >
                        Plant AI
                      </button>
                      <button
                        onClick={() => setActiveTab("attendance")}
                        className={`px-2 py-0.5 rounded transition-colors ${
                          activeTab === "attendance" ? "bg-[#244B35] text-white font-bold" : "text-[#626B60] hover:text-[#202820]"
                        }`}
                      >
                        Face ID
                      </button>
                      <button
                        onClick={() => setActiveTab("chatbot")}
                        className={`px-2 py-0.5 rounded transition-colors ${
                          activeTab === "chatbot" ? "bg-[#244B35] text-white font-bold" : "text-[#626B60] hover:text-[#202820]"
                        }`}
                      >
                        LLM Bot
                      </button>
                    </div>
                  </div>

                  {/* Live Project Dashboard Content */}
                  <div className="p-3 sm:p-4 space-y-3 bg-[#FFFDF7]">
                    
                    {/* Top Stats Ribbon */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-lg bg-[#F7F4E9] border border-[#DCDCCF]">
                        <div className="text-[10px] text-[#626B60] font-mono">Accuracy</div>
                        <div className="text-sm sm:text-base font-bold text-[#244B35] font-mono">
                          {activeTab === "plant" ? "98.7%" : activeTab === "attendance" ? "99.4%" : "96.8%"}
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#F7F4E9] border border-[#DCDCCF]">
                        <div className="text-[10px] text-[#626B60] font-mono">Latency</div>
                        <div className="text-sm sm:text-base font-bold text-[#3F7650] font-mono">
                          {activeTab === "plant" ? "14 ms" : activeTab === "attendance" ? "8 ms" : "24 ms"}
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#F7F4E9] border border-[#DCDCCF]">
                        <div className="text-[10px] text-[#626B60] font-mono">Status</div>
                        <div className="text-sm sm:text-base font-bold text-[#202820] flex items-center justify-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#244B35] animate-ping" />
                          Live
                        </div>
                      </div>
                    </div>

                    {/* Middle Graphic Viewport: Simulated AI Visual Detection */}
                    <div className="relative h-40 sm:h-48 rounded-xl bg-[#F7F4E9] border border-[#DCDCCF] p-3 overflow-hidden flex flex-col justify-between">
                      {/* Top Overlay Badge */}
                      <div className="flex items-center justify-between text-[11px] relative z-10">
                        <span className="font-semibold text-[#202820] flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-[#244B35]" />
                          {activeTab === "plant"
                            ? "Model: ResNet50-V2 Deep Ensemble"
                            : activeTab === "attendance"
                            ? "Model: FaceMesh Landmark Tracker"
                            : "Model: RAG Fine-Tuned Transformer"}
                        </span>
                        <span className="text-[10px] font-mono text-[#244B35] bg-[#E4EBDD] border border-[#A9BFA3] px-2 py-0.5 rounded-full">
                          Confidence: 99.2%
                        </span>
                      </div>

                      {/* Simulated Bounding Box Visualization */}
                      <div className="relative z-10 my-auto flex items-center justify-center">
                        <div className="w-48 sm:w-56 h-20 sm:h-24 border-2 border-dashed border-[#244B35] rounded-lg p-2 bg-[#E4EBDD]/60 flex items-center justify-between relative">
                          <span className="absolute -top-2.5 left-2 px-1.5 bg-[#244B35] text-white font-bold text-[9px] uppercase tracking-wider rounded shadow-xs">
                            {activeTab === "plant" ? "Target: Tomato Early Blight" : activeTab === "attendance" ? "Target: Student Verified (Roll: 104)" : "Intent: Student FAQ Query"}
                          </span>
                          <div className="space-y-0.5 text-[10px] text-[#626B60]">
                            <p className="font-mono text-[#244B35] font-semibold">Class: Positive Match</p>
                            <p className="font-mono text-[#626B60]">IoU Score: 0.942</p>
                            <p className="font-mono text-[#626B60]">Feature Maps: 2048</p>
                          </div>
                          <div className="w-10 h-10 rounded-lg bg-[#FFFDF7] border border-[#A9BFA3] flex items-center justify-center text-[#244B35] font-bold text-xs shadow-xs">
                            <Cpu className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Visual Timeline */}
                      <div className="flex items-center justify-between text-[10px] text-[#626B60] font-mono pt-1 border-t border-[#DCDCCF] relative z-10">
                        <span>Input: 1920x1080 Real-time</span>
                        <span className="text-[#244B35] font-semibold">Compute: Active</span>
                        <span>Weights: Loaded</span>
                      </div>
                    </div>

                    {/* Bottom Features checklist */}
                    <div className="flex items-center justify-between text-[10px] text-[#626B60] px-1">
                      <span className="flex items-center gap-1 text-[#202820]">
                        <CheckCircle2 className="w-3 h-3 text-[#244B35]" />
                        Full Code Provided
                      </span>
                      <span className="flex items-center gap-1 text-[#202820]">
                        <CheckCircle2 className="w-3 h-3 text-[#244B35]" />
                        Synopsis &amp; Base Paper
                      </span>
                      <span className="flex items-center gap-1 text-[#202820]">
                        <CheckCircle2 className="w-3 h-3 text-[#244B35]" />
                        Viva Q&amp;A Kit
                      </span>
                    </div>

                  </div>
                </div>
              </div>

              {/* Laptop Base */}
              <div className="h-3.5 sm:h-4 bg-[#EFEBDD] border-t border-[#DCDCCF] rounded-b-xl shadow-md relative flex justify-center">
                <div className="w-14 sm:w-20 h-1.5 bg-[#DCDCCF] rounded-b-md" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
