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
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-[#080808] bg-radial-hero">
      {/* Subtle Background Grid & Orange Glows */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-60" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#FF7900]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#FF4500]/06 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Hero Headline, Subtitle, Trust Features & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Small Premium Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161616] border border-[#2A2A2A] shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#FF7900] animate-pulse shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-[1px] text-[#FFFFFF] font-mono">
                Trusted Project Center
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#FFFFFF] tracking-tight leading-[1.12]">
              Transform Your Ideas Into{" "}
              <span className="text-gradient-orange block sm:inline">
                Real-World Projects
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#B8B8B8] leading-relaxed max-w-xl font-normal">
              Expert guidance for AI, Machine Learning, Web Development, Mobile Applications, Python, Java, and Data Science Projects.
            </p>

            {/* Trust Features Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 pb-2">
              {trustFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#FFFFFF]">
                  <div className="w-4 h-4 rounded-full bg-[#1D1D1D] flex items-center justify-center text-[#FF7900] shrink-0 border border-[#FF7900]/30">
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
                className="px-7 py-3.5 rounded-xl bg-[#161616] hover:bg-[#1D1D1D] text-white hover:text-[#FF7900] border border-[#2A2A2A] hover:border-[#FF7900] font-bold text-sm shadow-md transition-all flex items-center gap-2.5"
              >
                <MessageCircle className="w-4 h-4 text-[#FF7900]" />
                <span>WhatsApp Us</span>
              </a>

              {/* Project Enquiry (Orange Gradient) */}
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#FF4500] hover:opacity-95 text-white font-bold text-sm shadow-[0_4px_18px_-2px_rgba(255,121,0,0.4)] hover:shadow-[0_6px_24px_-2px_rgba(255,121,0,0.6)] hover:-translate-y-0.5 transition-all flex items-center gap-2.5 group cursor-pointer border border-[#FF7900]/30"
              >
                <ClipboardList className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Project Enquiry</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Modern Laptop Mockup with Live AI Project Dashboard & Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative flex justify-center items-center mt-6 lg:mt-0"
          >
            {/* Floating Technology Pills */}
            <div className="absolute -top-6 left-2 sm:left-6 z-20 hidden sm:flex items-center gap-2">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="px-3 py-1.5 rounded-xl bg-[#161616] border border-[#2A2A2A] shadow-md flex items-center gap-1.5 text-xs font-bold text-[#FFFFFF]"
              >
                <span className="text-[#FF7900]">🐍</span> Python
              </motion.div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="px-3 py-1.5 rounded-xl bg-[#161616] border border-[#2A2A2A] shadow-md flex items-center gap-1.5 text-xs font-bold text-[#FFFFFF]"
              >
                <span className="text-[#FF9500]">⚛️</span> React
              </motion.div>
            </div>

            <div className="absolute -bottom-6 left-8 z-20 hidden sm:flex items-center gap-2">
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="px-3 py-1.5 rounded-xl bg-[#161616] border border-[#2A2A2A] shadow-md flex items-center gap-1.5 text-xs font-bold text-[#FFFFFF]"
              >
                <span className="text-[#FF7900]">☕</span> Java
              </motion.div>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="px-3 py-1.5 rounded-xl bg-[#161616] border border-[#2A2A2A] shadow-md flex items-center gap-1.5 text-xs font-bold text-[#FFFFFF]"
              >
                <span className="text-[#FF9500]">📱</span> Flutter
              </motion.div>
            </div>

            <div className="absolute -top-4 -right-2 sm:right-6 z-20">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="px-3 py-1.5 rounded-xl bg-[#161616] border border-[#FF7900]/40 shadow-md flex items-center gap-1.5 text-xs font-bold text-[#FF7900]"
              >
                <span>⚡</span> TensorFlow
              </motion.div>
            </div>

            <div className="absolute -bottom-4 right-4 z-20">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="px-3.5 py-1.5 rounded-xl bg-[#161616] text-white border border-[#FF7900]/40 shadow-lg flex items-center gap-1.5 text-xs font-bold"
              >
                <span className="text-[#FF7900]">🧠</span> AI/ML Engine
              </motion.div>
            </div>

            {/* REALISTIC MODERN LAPTOP MOCKUP WITH BLACK & ORANGE TECHNICAL DASHBOARD */}
            <div className="w-full max-w-[560px] relative">
              {/* Laptop Screen Bezel */}
              <div className="bg-[#101010] p-2.5 sm:p-3.5 rounded-t-2xl sm:rounded-t-3xl shadow-2xl border-4 border-[#161616] relative">
                {/* Camera dot */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#2A2A2A] ring-1 ring-[#1D1D1D]" />

                {/* Laptop Inner Screen */}
                <div className="bg-[#080808] rounded-lg sm:rounded-xl overflow-hidden text-slate-200 font-sans border border-[#2A2A2A] shadow-inner">
                  
                  {/* Window Title Bar */}
                  <div className="bg-[#101010] px-3 py-2 border-b border-[#2A2A2A] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF4500] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF7900] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#B8B8B8] inline-block" />
                      <span className="ml-2 text-[10px] text-[#B8B8B8] font-mono hidden sm:inline">
                        AntiMatrix Studio ~ AI Model Inspector v3.4
                      </span>
                    </div>

                    {/* Dashboard Tab Selector */}
                    <div className="flex items-center gap-1 bg-[#161616] border border-[#2A2A2A] p-0.5 rounded-md text-[10px] font-medium">
                      <button
                        onClick={() => setActiveTab("plant")}
                        className={`px-2 py-0.5 rounded transition-colors ${
                          activeTab === "plant" ? "bg-gradient-to-r from-[#FF7900] to-[#FF4500] text-white font-bold shadow-xs" : "text-[#B8B8B8] hover:text-white"
                        }`}
                      >
                        Plant AI
                      </button>
                      <button
                        onClick={() => setActiveTab("attendance")}
                        className={`px-2 py-0.5 rounded transition-colors ${
                          activeTab === "attendance" ? "bg-gradient-to-r from-[#FF7900] to-[#FF4500] text-white font-bold shadow-xs" : "text-[#B8B8B8] hover:text-white"
                        }`}
                      >
                        Face ID
                      </button>
                      <button
                        onClick={() => setActiveTab("chatbot")}
                        className={`px-2 py-0.5 rounded transition-colors ${
                          activeTab === "chatbot" ? "bg-gradient-to-r from-[#FF7900] to-[#FF4500] text-white font-bold shadow-xs" : "text-[#B8B8B8] hover:text-white"
                        }`}
                      >
                        LLM Bot
                      </button>
                    </div>
                  </div>

                  {/* Live Project Dashboard Content */}
                  <div className="p-3 sm:p-4 space-y-3 bg-[#080808]">
                    
                    {/* Top Stats Ribbon */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-lg bg-[#161616] border border-[#2A2A2A]">
                        <div className="text-[10px] text-[#B8B8B8] font-mono">Accuracy</div>
                        <div className="text-sm sm:text-base font-bold text-[#FF7900] font-mono">
                          {activeTab === "plant" ? "98.7%" : activeTab === "attendance" ? "99.4%" : "96.8%"}
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#161616] border border-[#2A2A2A]">
                        <div className="text-[10px] text-[#B8B8B8] font-mono">Latency</div>
                        <div className="text-sm sm:text-base font-bold text-[#FF9500] font-mono">
                          {activeTab === "plant" ? "14 ms" : activeTab === "attendance" ? "8 ms" : "24 ms"}
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#161616] border border-[#2A2A2A]">
                        <div className="text-[10px] text-[#B8B8B8] font-mono">Status</div>
                        <div className="text-sm sm:text-base font-bold text-white flex items-center justify-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7900] animate-ping" />
                          Live
                        </div>
                      </div>
                    </div>

                    {/* Middle Graphic Viewport: Simulated AI Visual Detection */}
                    <div className="relative h-40 sm:h-48 rounded-xl bg-[#101010] border border-[#2A2A2A] p-3 overflow-hidden flex flex-col justify-between">
                      {/* Grid background on viewport */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,121,0,0.08)_0%,transparent_70%)] pointer-events-none" />

                      {/* Top Overlay Badge */}
                      <div className="flex items-center justify-between text-[11px] relative z-10">
                        <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-[#FF7900]" />
                          {activeTab === "plant"
                            ? "Model: ResNet50-V2 Deep Ensemble"
                            : activeTab === "attendance"
                            ? "Model: FaceMesh Landmark Tracker"
                            : "Model: RAG Fine-Tuned Transformer"}
                        </span>
                        <span className="text-[10px] font-mono text-[#FF7900] bg-[#161616] border border-[#FF7900]/30 px-2 py-0.5 rounded-full">
                          Confidence: 99.2%
                        </span>
                      </div>

                      {/* Simulated Bounding Box Visualization */}
                      <div className="relative z-10 my-auto flex items-center justify-center">
                        <div className="w-48 sm:w-56 h-20 sm:h-24 border-2 border-dashed border-[#FF7900] rounded-lg p-2 bg-[#FF7900]/10 flex items-center justify-between relative">
                          <span className="absolute -top-2.5 left-2 px-1.5 bg-gradient-to-r from-[#FF7900] to-[#FF4500] text-white font-bold text-[9px] uppercase tracking-wider rounded shadow-xs">
                            {activeTab === "plant" ? "Target: Tomato Early Blight" : activeTab === "attendance" ? "Target: Student Verified (Roll: 104)" : "Intent: Student FAQ Query"}
                          </span>
                          <div className="space-y-0.5 text-[10px] text-[#B8B8B8]">
                            <p className="font-mono text-[#FF7900]">Class: Positive Match</p>
                            <p className="font-mono text-[#B8B8B8]">IoU Score: 0.942</p>
                            <p className="font-mono text-[#B8B8B8]">Feature Maps: 2048</p>
                          </div>
                          <div className="w-12 h-12 rounded-lg bg-[#161616] border border-[#FF7900]/50 flex items-center justify-center text-[#FF7900] font-bold text-xs">
                            <Cpu className="w-6 h-6 animate-pulse" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Visual Timeline */}
                      <div className="flex items-center justify-between text-[10px] text-[#B8B8B8] font-mono pt-1 border-t border-[#2A2A2A] relative z-10">
                        <span>Input: 1920x1080 Real-time</span>
                        <span className="text-[#FF7900]">Compute: Active</span>
                        <span>Weights: Loaded</span>
                      </div>
                    </div>

                    {/* Bottom Features checklist */}
                    <div className="flex items-center justify-between text-[10px] text-[#B8B8B8] px-1">
                      <span className="flex items-center gap-1 text-[#FFFFFF]">
                        <CheckCircle2 className="w-3 h-3 text-[#FF7900]" />
                        Full Code Provided
                      </span>
                      <span className="flex items-center gap-1 text-[#FFFFFF]">
                        <CheckCircle2 className="w-3 h-3 text-[#FF7900]" />
                        Synopsis &amp; Base Paper
                      </span>
                      <span className="flex items-center gap-1 text-[#FFFFFF]">
                        <CheckCircle2 className="w-3 h-3 text-[#FF7900]" />
                        Viva Q&amp;A Kit
                      </span>
                    </div>

                  </div>
                </div>
              </div>

              {/* Laptop Base */}
              <div className="h-3.5 sm:h-4 bg-gradient-to-r from-[#161616] via-[#222222] to-[#161616] border-t border-[#2A2A2A] rounded-b-xl shadow-lg relative flex justify-center">
                <div className="w-14 sm:w-20 h-1.5 bg-[#2A2A2A] rounded-b-md" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
