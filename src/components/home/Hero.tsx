"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  Play,
  Check,
  Cpu,
  Activity,
  CheckCircle2,
  X,
  ExternalLink,
  ClipboardList
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { openConsultationModal } from "@/components/common/ConsultationModal";
import { getWhatsAppUrl, GOOGLE_ENQUIRY_FORM_URL } from "@/lib/whatsapp";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"plant" | "attendance" | "chatbot">("plant");
  const [showDemoModal, setShowDemoModal] = useState(false);

  const trustFeatures = [
    "Customized Projects",
    "Complete Documentation",
    "Source Code Included",
    "Viva Preparation",
    "Technical Support",
  ];

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-[#FFF9F5] bg-radial-hero">
      {/* Subtle SaaS Background Grid & Warm Theme 07 Glows */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-80" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#FF6B00]/12 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#FF3D3D]/08 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#D90429]/05 rounded-full blur-[140px] pointer-events-none" />

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#FF6B00]/25 shadow-[0_2px_10px_-2px_rgba(255,107,0,0.12)]">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-[1px] text-[#101828] font-mono">
                Trusted Project Center
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#101828] tracking-tight leading-[1.12]">
              Transform Your Ideas Into{" "}
              <span className="text-gradient-orange-red block sm:inline">
                Real-World Projects
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#526581] leading-relaxed max-w-xl font-normal">
              Expert guidance for AI, Machine Learning, Web Development, Mobile Applications, Python, Java, and Data Science Projects.
            </p>

            {/* Trust Features Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 pb-2">
              {trustFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#101828]">
                  <div className="w-4 h-4 rounded-full bg-[#FFF1E8] flex items-center justify-center text-[#FF6B00] shrink-0 border border-[#FF6B00]/25">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              {/* WhatsApp Us */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl bg-[#00A86B] hover:bg-[#00925C] text-white font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2.5 shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>WhatsApp Us</span>
              </a>

              {/* Project Enquiry (Approved Orange-Red Gradient) */}
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] hover:opacity-95 text-white font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2.5 group cursor-pointer border border-[#FF3D3D]/30 shadow-[#FF6B00]/20"
              >
                <ClipboardList className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Project Enquiry</span>
              </a>

              <button
                onClick={() => setShowDemoModal(true)}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#FFF1E8]/40 border border-slate-200 hover:border-[#FF6B00]/40 text-[#101828] font-semibold text-sm transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-[#FF6B00] fill-[#FF6B00]" />
                <span>Watch Demo</span>
              </button>
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
                className="px-3 py-1.5 rounded-xl bg-white/95 border border-slate-200 shadow-md flex items-center gap-1.5 text-xs font-bold text-[#101828]"
              >
                <span>🐍</span> Python
              </motion.div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="px-3 py-1.5 rounded-xl bg-white/95 border border-slate-200 shadow-md flex items-center gap-1.5 text-xs font-bold text-cyan-700"
              >
                <span>⚛️</span> React
              </motion.div>
            </div>

            <div className="absolute -bottom-6 left-8 z-20 hidden sm:flex items-center gap-2">
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="px-3 py-1.5 rounded-xl bg-white/95 border border-slate-200 shadow-md flex items-center gap-1.5 text-xs font-bold text-[#D90429]"
              >
                <span>☕</span> Java
              </motion.div>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="px-3 py-1.5 rounded-xl bg-white/95 border border-slate-200 shadow-md flex items-center gap-1.5 text-xs font-bold text-sky-700"
              >
                <span>💙</span> Flutter
              </motion.div>
            </div>

            <div className="absolute -top-4 -right-2 sm:right-6 z-20">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="px-3 py-1.5 rounded-xl bg-white/95 border border-[#FF6B00]/40 shadow-md flex items-center gap-1.5 text-xs font-bold text-[#FF6B00]"
              >
                <span>⚡</span> TensorFlow
              </motion.div>
            </div>

            <div className="absolute -bottom-4 right-4 z-20">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="px-3.5 py-1.5 rounded-xl bg-[#101B30] text-white border border-[#FF6B00]/30 shadow-lg flex items-center gap-1.5 text-xs font-bold"
              >
                <span>🧠</span> AI/ML Engine
              </motion.div>
            </div>

            {/* REALISTIC MODERN LAPTOP MOCKUP WITH THEME 07 TECHNICAL DASHBOARD */}
            <div className="w-full max-w-[560px] relative">
              {/* Laptop Screen Bezel */}
              <div className="bg-[#101B30] p-2.5 sm:p-3.5 rounded-t-2xl sm:rounded-t-3xl shadow-2xl border-4 border-[#070D1A] relative">
                {/* Camera dot */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-700 ring-1 ring-slate-800" />

                {/* Laptop Inner Screen */}
                <div className="bg-[#0B1222] rounded-lg sm:rounded-xl overflow-hidden text-slate-200 font-sans border border-slate-700/60 shadow-inner">
                  
                  {/* macOS Window Title Bar */}
                  <div className="bg-[#101B30] px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A00] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B] inline-block" />
                      <span className="ml-2 text-[10px] text-slate-400 font-mono hidden sm:inline">
                        AntiMatrix Studio ~ AI Model Inspector v3.4
                      </span>
                    </div>

                    {/* Dashboard Tab Selector */}
                    <div className="flex items-center gap-1 bg-[#1A2845] p-0.5 rounded-md text-[10px] font-medium">
                      <button
                        onClick={() => setActiveTab("plant")}
                        className={`px-2 py-0.5 rounded transition-colors ${
                          activeTab === "plant" ? "bg-gradient-to-r from-[#FF6B00] to-[#FF3D3D] text-white font-bold shadow-xs" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Plant AI
                      </button>
                      <button
                        onClick={() => setActiveTab("attendance")}
                        className={`px-2 py-0.5 rounded transition-colors ${
                          activeTab === "attendance" ? "bg-gradient-to-r from-[#FF6B00] to-[#FF3D3D] text-white font-bold shadow-xs" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Face ID
                      </button>
                      <button
                        onClick={() => setActiveTab("chatbot")}
                        className={`px-2 py-0.5 rounded transition-colors ${
                          activeTab === "chatbot" ? "bg-gradient-to-r from-[#FF6B00] to-[#FF3D3D] text-white font-bold shadow-xs" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        LLM Bot
                      </button>
                    </div>
                  </div>

                  {/* Live Project Dashboard Content */}
                  <div className="p-3 sm:p-4 space-y-3 bg-[#0B1222]">
                    
                    {/* Top Stats Ribbon */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-lg bg-[#101B30] border border-slate-800">
                        <div className="text-[10px] text-slate-400 font-mono">Accuracy</div>
                        <div className="text-sm sm:text-base font-bold text-[#00A86B] font-mono">
                          {activeTab === "plant" ? "98.7%" : activeTab === "attendance" ? "99.4%" : "96.8%"}
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#101B30] border border-slate-800">
                        <div className="text-[10px] text-slate-400 font-mono">Latency</div>
                        <div className="text-sm sm:text-base font-bold text-[#FF8A00] font-mono">
                          {activeTab === "plant" ? "14 ms" : activeTab === "attendance" ? "8 ms" : "24 ms"}
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#101B30] border border-slate-800">
                        <div className="text-[10px] text-slate-400 font-mono">Status</div>
                        <div className="text-sm sm:text-base font-bold text-sky-400 flex items-center justify-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] animate-ping" />
                          Live
                        </div>
                      </div>
                    </div>

                    {/* Middle Graphic Viewport: Simulated AI Visual Detection */}
                    <div className="relative h-40 sm:h-48 rounded-xl bg-gradient-to-br from-[#070D1A] to-[#101B30] border border-slate-800 p-3 overflow-hidden flex flex-col justify-between">
                      {/* Grid background on viewport */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)] pointer-events-none" />

                      {/* Top Overlay Badge */}
                      <div className="flex items-center justify-between text-[11px] relative z-10">
                        <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-[#FF6B00]" />
                          {activeTab === "plant"
                            ? "Model: ResNet50-V2 Deep Ensemble"
                            : activeTab === "attendance"
                            ? "Model: FaceMesh Landmark Tracker"
                            : "Model: RAG Fine-Tuned Transformer"}
                        </span>
                        <span className="text-[10px] font-mono text-[#00A86B] bg-emerald-950/80 border border-[#00A86B]/30 px-2 py-0.5 rounded-full">
                          Confidence: 99.2%
                        </span>
                      </div>

                      {/* Simulated Bounding Box Visualization */}
                      <div className="relative z-10 my-auto flex items-center justify-center">
                        <div className="w-48 sm:w-56 h-20 sm:h-24 border-2 border-dashed border-[#FF6B00] rounded-lg p-2 bg-[#FF6B00]/10 flex items-center justify-between relative">
                          <span className="absolute -top-2.5 left-2 px-1.5 bg-gradient-to-r from-[#FF6B00] to-[#FF3D3D] text-white font-bold text-[9px] uppercase tracking-wider rounded shadow-xs">
                            {activeTab === "plant" ? "Target: Tomato Early Blight" : activeTab === "attendance" ? "Target: Student Verified (Roll: 104)" : "Intent: Student FAQ Query"}
                          </span>
                          <div className="space-y-0.5 text-[10px] text-slate-300">
                            <p className="font-mono text-[#00A86B]">Class: Positive Match</p>
                            <p className="font-mono text-slate-400">IoU Score: 0.942</p>
                            <p className="font-mono text-slate-400">Feature Maps: 2048</p>
                          </div>
                          <div className="w-12 h-12 rounded-lg bg-[#FF6B00]/20 border border-[#FF6B00]/50 flex items-center justify-center text-[#FF6B00] font-bold text-xs">
                            <Cpu className="w-6 h-6 animate-pulse" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Visual Timeline */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800/80 relative z-10">
                        <span>Input: 1920x1080 Real-time</span>
                        <span className="text-[#FF8A00]">GPU Compute: Active</span>
                        <span>Weights: Loaded</span>
                      </div>
                    </div>

                    {/* Bottom Features checklist */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
                      <span className="flex items-center gap-1 text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-[#00A86B]" />
                        Full Code Provided
                      </span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-[#00A86B]" />
                        Synopsis &amp; Base Paper
                      </span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-[#00A86B]" />
                        Viva Q&amp;A Kit
                      </span>
                    </div>

                  </div>
                </div>
              </div>

              {/* Laptop Base (Aluminum Notch) */}
              <div className="h-3.5 sm:h-4 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 rounded-b-xl shadow-lg relative flex justify-center">
                <div className="w-14 sm:w-20 h-1.5 bg-slate-500 rounded-b-md" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* WATCH DEMO INTERACTIVE MODAL */}
      <AnimatePresence>
        {showDemoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="p-5 border-b border-slate-200 bg-[#FFF9F5] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#D90429] text-white flex items-center justify-center">
                    <Play className="w-4 h-4 fill-white text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#101828]">Live Project Demo Walkthrough</h3>
                    <p className="text-xs text-[#526581]">Real-Time Execution &amp; University Standard Deliverables</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDemoModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="rounded-2xl bg-[#101B30] text-slate-200 p-4 font-mono text-xs space-y-2 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                    <span>$ python app.py --mode production</span>
                    <span className="text-[#00A86B]">● RUNNING</span>
                  </div>
                  <p className="text-emerald-300">&gt; Loading PyTorch deep neural model checkpoints...</p>
                  <p className="text-slate-300">&gt; Initializing CUDA Tensor Cores: NVIDIA RTX Verified</p>
                  <p className="text-slate-300">&gt; Starting FastAPI REST Backend on http://127.0.0.1:8000</p>
                  <p className="text-[#FF8A00]">&gt; Model Accuracy: 98.7% on Benchmark Test Split</p>
                  <p className="text-slate-400">&gt; Complete SRS, Project Report (PDF/Word), PPT slides &amp; Viva Handbook generated.</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#FFF9F5] border border-[#FF6B00]/15">
                    <p className="font-bold text-[#101828] mb-1">What You Get in Demo:</p>
                    <ul className="space-y-1 text-[#526581]">
                      <li>• Live screen share run of source code</li>
                      <li>• Explanation of algorithms &amp; architecture</li>
                      <li>• Verification against base paper</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FFF9F5] border border-[#FF6B00]/15">
                    <p className="font-bold text-[#101828] mb-1">Guaranteed Deliverables:</p>
                    <ul className="space-y-1 text-[#526581]">
                      <li>• Complete source code + dependencies</li>
                      <li>• 60-90 page formatted documentation</li>
                      <li>• High-impact review PPT slides</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setShowDemoModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowDemoModal(false);
                      openConsultationModal({ projectTitle: "Live Project Demo Request" });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                  >
                    <span>Request Live 1-on-1 Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
