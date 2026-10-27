"use client";

import React from "react";
import {
  TensorFlowLogo,
  PyTorchLogo,
  OpenAILogo,
  PandasLogo,
  ScikitLearnLogo,
  XGBoostLogo,
  NumPyLogo,
  YoloLogo,
  OpenCVLogo,
  PythonLogo,
  FastAPILogo,
  FlaskLogo,
  DjangoLogo,
  JavaLogo,
  SpringBootLogo,
  HibernateLogo,
  ReactLogo,
  NextjsLogo,
  NodejsLogo,
  TailwindLogo,
  FlutterLogo,
  ReactNativeLogo,
  FirebaseLogo,
  AWSLogo,
  DockerLogo,
  KubernetesLogo,
  KaliLinuxLogo,
  WiresharkLogo,
  OWASPLogo,
  PowerBILogo,
  TableauLogo,
} from "@/components/common/TechLogos";

interface CategoryIllustrationProps {
  category: string;
}

export default function CategoryIllustration({ category }: CategoryIllustrationProps) {
  switch (category) {
    case "AI & Data Science":
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#101B30] via-[#142A63] to-[#0D152F] flex flex-col justify-between p-3 select-none">
          {/* Subtle Background Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#FF6B00_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
          
          {/* Main Dark-Tech Graphic Viewport */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <svg className="w-full h-full max-w-[260px] max-h-[110px]" viewBox="0 0 260 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="aiChartFill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Neural Synapse Network */}
              <g stroke="rgba(255,255,255,0.2)" strokeWidth="1.2">
                <line x1="25" y1="35" x2="55" y2="20" />
                <line x1="25" y1="35" x2="40" y2="70" />
                <line x1="55" y1="20" x2="85" y2="40" />
                <line x1="40" y1="70" x2="75" y2="80" />
                <line x1="85" y1="40" x2="75" y2="80" />
                <line x1="85" y1="40" x2="115" y2="55" />
                <line x1="55" y1="20" x2="60" y2="50" stroke="#FF6B00" strokeWidth="1.5" />
                <line x1="60" y1="50" x2="75" y2="80" stroke="#FF6B00" strokeWidth="1.5" />
              </g>

              <circle cx="25" cy="35" r="4.5" fill="#60A5FA" />
              <circle cx="55" cy="20" r="4" fill="#FF6B00" />
              <circle cx="40" cy="70" r="3.5" fill="#93C5FD" />
              <circle cx="85" cy="40" r="5" fill="#FF6B00" />
              <circle cx="75" cy="80" r="4.5" fill="#60A5FA" />

              {/* Center Pulsing AI Core */}
              <circle cx="60" cy="50" r="7" fill="#FF6B00" fillOpacity="0.25" />
              <circle cx="60" cy="50" r="4" fill="#FF6B00" />
              <circle cx="60" cy="50" r="1.5" fill="#FFFFFF" />

              {/* Connecting Bridge to Dashboard */}
              <path d="M115 55 C 128 55, 128 40, 138 40" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Analytics Dashboard Card */}
              <g transform="translate(138, 12)">
                <rect width="114" height="84" rx="7" fill="#0E1E3D" fillOpacity="0.9" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <rect x="8" y="8" width="50" height="5" rx="2.5" fill="#60A5FA" fillOpacity="0.7" />
                <text x="64" y="12.5" fill="#10B981" fontSize="5" fontWeight="bold" fontFamily="monospace">99.2% ACC</text>

                {/* Sparkline Chart */}
                <path d="M 8 60 Q 25 30, 45 48 T 85 28 T 106 24 L 106 68 L 8 68 Z" fill="url(#aiChartFill)" />
                <path d="M 8 60 Q 25 30, 45 48 T 85 28 T 106 24" fill="none" stroke="#FF6B00" strokeWidth="1.6" />
                <circle cx="106" cy="24" r="2.5" fill="#FF6B00" />

                <rect x="8" y="73" width="22" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
                <rect x="34" y="73" width="28" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
                <rect x="66" y="73" width="38" height="3" rx="1.5" fill="#FF6B00" fillOpacity="0.7" />
              </g>
            </svg>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950/85 border border-slate-700/70 backdrop-blur-md shadow-lg shadow-black/30 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#FF6F00]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(255,111,0,0.5)] group-hover/pill:scale-110 transition-transform">
                  <TensorFlowLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">TensorFlow</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#EE4C2C]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(238,76,44,0.5)] group-hover/pill:scale-110 transition-transform">
                  <PyTorchLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">PyTorch</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#10A37F]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(16,163,127,0.5)] group-hover/pill:scale-110 transition-transform">
                  <OpenAILogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">OpenAI</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#FFD43B]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(255,212,59,0.5)] group-hover/pill:scale-110 transition-transform">
                  <PandasLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Pandas</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Machine Learning":
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A101D] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:18px_18px] opacity-20" />

          {/* Main Predictive Chart Graphic */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <svg className="w-full h-full max-w-[260px] max-h-[110px]" viewBox="0 0 260 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="mlConfidenceBand" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              <line x1="25" y1="92" x2="240" y2="92" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <line x1="25" y1="12" x2="25" y2="92" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

              {/* Shaded Confidence Band */}
              <path d="M 30 75 Q 80 65, 130 45 T 230 20 L 230 45 Q 180 65, 130 72 T 30 88 Z" fill="url(#mlConfidenceBand)" />

              {/* Regression Curve */}
              <path d="M 30 82 Q 80 66, 130 54 T 230 30" fill="none" stroke="#FF6B00" strokeWidth="2.2" strokeLinecap="round" />

              {/* Scatter Points */}
              <circle cx="45" cy="78" r="2.5" fill="#38BDF8" />
              <circle cx="65" cy="70" r="3" fill="#FF6B00" />
              <circle cx="90" cy="68" r="2.5" fill="#38BDF8" />
              <circle cx="115" cy="58" r="3" fill="#34D399" />
              <circle cx="140" cy="52" r="2.5" fill="#38BDF8" />
              <circle cx="170" cy="42" r="3" fill="#34D399" />
              <circle cx="200" cy="35" r="2.5" fill="#38BDF8" />
              <circle cx="225" cy="28" r="3" fill="#FF6B00" />

              {/* Floating Prediction Overlay Box */}
              <g transform="translate(135, 12)">
                <rect width="102" height="36" rx="6" fill="#1E293B" fillOpacity="0.9" stroke="rgba(245,166,35,0.4)" strokeWidth="1" />
                <text x="8" y="14" fill="#FF6B00" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">● Model Forecast</text>
                <text x="8" y="25" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" fontFamily="monospace">Acc: 98.7% (R² 0.94)</text>
              </g>
            </svg>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950/85 border border-slate-700/70 backdrop-blur-md shadow-lg shadow-black/30 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#F89939]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(248,153,57,0.5)] group-hover/pill:scale-110 transition-transform">
                  <ScikitLearnLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Scikit-Learn</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#22C55E]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(34,197,94,0.5)] group-hover/pill:scale-110 transition-transform">
                  <XGBoostLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">XGBoost</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#FF6F00]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(255,111,0,0.5)] group-hover/pill:scale-110 transition-transform">
                  <TensorFlowLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">TensorFlow</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#4D77CF]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(77,119,207,0.5)] group-hover/pill:scale-110 transition-transform">
                  <NumPyLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">NumPy</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Deep Learning":
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#0D1127] via-[#1A183D] to-[#0A0D1F] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[radial-gradient(#818CF8_1px,transparent_1px)] [background-size:14px_14px] opacity-15" />

          {/* Main Neural Network & Computer Vision Graphics */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <svg className="w-full h-full max-w-[260px] max-h-[110px]" viewBox="0 0 260 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Neural Network Nodes */}
              <circle cx="25" cy="25" r="4.5" fill="#818CF8" />
              <circle cx="25" cy="55" r="4.5" fill="#818CF8" />
              <circle cx="25" cy="85" r="4.5" fill="#818CF8" />

              <circle cx="65" cy="20" r="4.5" fill="#C084FC" />
              <circle cx="65" cy="45" r="4.5" fill="#C084FC" />
              <circle cx="65" cy="70" r="4.5" fill="#C084FC" />
              <circle cx="65" cy="95" r="4.5" fill="#C084FC" />

              <circle cx="105" cy="35" r="4.5" fill="#FF6B00" />
              <circle cx="105" cy="65" r="4.5" fill="#FF6B00" />
              <circle cx="105" cy="95" r="4.5" fill="#FF6B00" />

              <g stroke="rgba(255,255,255,0.12)" strokeWidth="1">
                <line x1="25" y1="25" x2="65" y2="20" />
                <line x1="25" y1="25" x2="65" y2="45" />
                <line x1="25" y1="55" x2="65" y2="45" />
                <line x1="25" y1="55" x2="65" y2="70" />
                <line x1="25" y1="85" x2="65" y2="70" />
                <line x1="25" y1="85" x2="65" y2="95" />
                <line x1="65" y1="20" x2="105" y2="35" stroke="#818CF8" strokeWidth="1.2" />
                <line x1="65" y1="45" x2="105" y2="65" stroke="#FF6B00" strokeWidth="1.4" />
                <line x1="65" y1="70" x2="105" y2="65" />
                <line x1="65" y1="95" x2="105" y2="95" stroke="#C084FC" strokeWidth="1.2" />
              </g>

              {/* Computer Vision Frame */}
              <g transform="translate(142, 10)">
                <rect width="98" height="88" rx="7" fill="#141933" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                
                {/* Bounding Box Brackets */}
                <path d="M 20 30 L 12 30 L 12 38" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
                <path d="M 78 30 L 86 30 L 86 38" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
                <path d="M 12 65 L 12 73 L 20 73" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
                <path d="M 86 65 L 86 73 L 78 73" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />

                <rect x="12" y="20" width="65" height="9" rx="2.5" fill="#FF6B00" />
                <text x="15" y="26.5" fill="#0F172A" fontSize="5.5" fontWeight="bold" fontFamily="monospace">YOLOv10: 99.4%</text>

                <circle cx="49" cy="52" r="14" stroke="rgba(245,166,35,0.5)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="49" cy="52" r="3.5" fill="#FF6B00" fillOpacity="0.8" />
              </g>
            </svg>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950/85 border border-slate-700/70 backdrop-blur-md shadow-lg shadow-black/30 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#EE4C2C]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(238,76,44,0.5)] group-hover/pill:scale-110 transition-transform">
                  <PyTorchLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">PyTorch</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#FF6F00]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(255,111,0,0.5)] group-hover/pill:scale-110 transition-transform">
                  <TensorFlowLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">TensorFlow</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#E11D48]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(225,29,72,0.5)] group-hover/pill:scale-110 transition-transform">
                  <YoloLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">YOLO</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#3B82F6]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(59,130,246,0.5)] group-hover/pill:scale-110 transition-transform">
                  <OpenCVLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">OpenCV</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Python Projects":
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#0B1528] via-[#10233D] to-[#0A1220] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E3A5F_1px,transparent_1px),linear-gradient(to_bottom,#1E3A5F_1px,transparent_1px)] bg-[size:18px_18px] opacity-15" />

          {/* Code IDE Window Mockup */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <div className="w-full max-w-[245px] h-[98px] rounded-lg bg-[#0F1C31] border border-slate-700/80 shadow-lg overflow-hidden flex flex-col">
              <div className="bg-[#0A1322] px-3 py-1.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="ml-2 text-[8.5px] font-mono text-slate-400">app_detector.py</span>
                </div>
                <span className="text-[7.5px] font-mono text-[#FF6B00] bg-[#FF6B00]/10 px-1.5 py-0.5 rounded">Python 3.11</span>
              </div>

              <div className="p-2 font-mono text-[8.5px] leading-relaxed text-slate-300 space-y-0.5">
                <p>
                  <span className="text-[#FF6B00] font-bold">import</span> cv2, torch, fastapi
                </p>
                <p>
                  <span className="text-[#38BDF8]">model</span> = torch.load(<span className="text-[#34D399]">&apos;best_weights.pt&apos;</span>)
                </p>
                <p>
                  <span className="text-[#FF6B00] font-bold">def</span> <span className="text-[#60A5FA]">detect_stream</span>(frame): <span className="text-[#FF6B00]">return</span> model(frame)
                </p>
              </div>

              <div className="mt-auto bg-[#080E1A] px-2.5 py-0.5 border-t border-slate-800/80 flex items-center justify-between text-[7.5px] font-mono text-emerald-400">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  FastAPI Server Active • 60 FPS
                </span>
                <span className="text-slate-500">12ms</span>
              </div>
            </div>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950/85 border border-slate-700/70 backdrop-blur-md shadow-lg shadow-black/30 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#3776AB]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(55,118,171,0.5)] group-hover/pill:scale-110 transition-transform">
                  <PythonLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Python</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#009688]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(0,150,136,0.5)] group-hover/pill:scale-110 transition-transform">
                  <FastAPILogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">FastAPI</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-slate-400/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] group-hover/pill:scale-110 transition-transform">
                  <FlaskLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Flask</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#44B78B]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(68,183,139,0.5)] group-hover/pill:scale-110 transition-transform">
                  <DjangoLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Django</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Java Projects":
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#121B2F] via-[#1E2538] to-[#171424] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[radial-gradient(#FF6B00_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

          {/* Microservices Topology Architecture SVG */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <svg className="w-full h-full max-w-[260px] max-h-[110px]" viewBox="0 0 260 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(85, 8)">
                <rect width="90" height="24" rx="5" fill="#1E293B" stroke="#FF6B00" strokeWidth="1.3" />
                <text x="45" y="15" fill="#FF6B00" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">API Gateway :8080</text>
              </g>

              <path d="M 130 32 L 70 56" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M 130 32 L 190 56" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M 70 76 L 130 92" stroke="#34D399" strokeWidth="1.2" />
              <path d="M 190 76 L 130 92" stroke="#34D399" strokeWidth="1.2" />

              <g transform="translate(25, 54)">
                <rect width="90" height="24" rx="5" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.2" />
                <text x="45" y="15" fill="#38BDF8" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Spring Auth Service</text>
              </g>

              <g transform="translate(145, 54)">
                <rect width="90" height="24" rx="5" fill="#1E293B" stroke="#C084FC" strokeWidth="1.2" />
                <text x="45" y="15" fill="#C084FC" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Kafka Event Service</text>
              </g>

              <g transform="translate(85, 84)">
                <rect width="90" height="22" rx="5" fill="#0B1322" stroke="#34D399" strokeWidth="1.2" />
                <text x="45" y="14" fill="#34D399" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Hibernate ORM / DB</text>
              </g>
            </svg>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950/85 border border-slate-700/70 backdrop-blur-md shadow-lg shadow-black/30 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#E76F00]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(231,111,0,0.5)] group-hover/pill:scale-110 transition-transform">
                  <JavaLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Java 21</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#6DB33F]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(109,179,63,0.5)] group-hover/pill:scale-110 transition-transform">
                  <SpringBootLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Spring Boot</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#FF6B00]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(245,166,35,0.5)] group-hover/pill:scale-110 transition-transform">
                  <HibernateLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Hibernate</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Web Development":
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#091C36] via-[#112F58] to-[#0A162B] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:15px_15px] opacity-15" />

          {/* Browser Window Mockup */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <div className="w-full max-w-[245px] h-[98px] rounded-lg bg-[#0F1E38] border border-slate-700/80 shadow-xl overflow-hidden flex flex-col">
              <div className="bg-[#0A1528] px-3 py-1 border-b border-slate-800 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                </div>
                <div className="flex-1 max-w-[130px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[7.5px] font-mono text-slate-400 truncate">
                  https://modern-saas.app
                </div>
              </div>

              <div className="p-2 space-y-1.5">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <div className="w-10 h-2 rounded bg-gradient-to-r from-[#FF6B00] to-amber-600" />
                  <div className="flex gap-1">
                    <div className="w-6 h-1.5 rounded bg-slate-700" />
                    <div className="w-6 h-1.5 rounded bg-slate-700" />
                    <div className="w-8 h-1.5 rounded bg-sky-500" />
                  </div>
                </div>

                <div className="p-1.5 rounded bg-gradient-to-r from-sky-950/70 to-indigo-950/70 border border-sky-800/40 space-y-0.5">
                  <div className="w-24 h-2 rounded bg-slate-200" />
                  <div className="w-16 h-1.5 rounded bg-slate-400" />
                </div>

                <div className="grid grid-cols-3 gap-1 pt-0.5">
                  <div className="h-4 rounded bg-slate-800 border border-slate-700/60" />
                  <div className="h-4 rounded bg-slate-800 border border-slate-700/60" />
                  <div className="h-4 rounded bg-slate-800 border border-slate-700/60" />
                </div>
              </div>
            </div>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950/85 border border-slate-700/70 backdrop-blur-md shadow-lg shadow-black/30 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#61DAFB]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(97,218,251,0.5)] group-hover/pill:scale-110 transition-transform">
                  <ReactLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">React</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-white/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] group-hover/pill:scale-110 transition-transform">
                  <NextjsLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Next.js</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#339933]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(51,153,51,0.5)] group-hover/pill:scale-110 transition-transform">
                  <NodejsLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Node.js</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#38BDF8]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(56,189,248,0.5)] group-hover/pill:scale-110 transition-transform">
                  <TailwindLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Tailwind</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Mobile App Development":
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#081B34] via-[#0E2C52] to-[#0A162B] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

          {/* Smartphone UI Mockup */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <div className="w-[120px] h-[100px] rounded-xl bg-[#091426] border-2 border-slate-600 shadow-2xl p-1.5 flex flex-col justify-between relative overflow-hidden">
              <div className="w-8 h-2 bg-black rounded-full mx-auto mb-1 flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-slate-800" />
              </div>

              <div className="flex-1 space-y-1 px-0.5">
                <div className="flex items-center justify-between">
                  <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#FF6B00] to-amber-500" />
                  <div className="w-8 h-1.5 rounded bg-slate-700" />
                </div>

                <div className="p-1.5 rounded bg-gradient-to-r from-sky-600 to-indigo-600 text-white space-y-0.5 shadow-sm">
                  <div className="w-6 h-1 rounded bg-white/60" />
                  <div className="w-10 h-2 rounded bg-white" />
                </div>

                <div className="grid grid-cols-2 gap-1">
                  <div className="h-3 rounded bg-slate-800" />
                  <div className="h-3 rounded bg-slate-800" />
                </div>
              </div>
            </div>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950/85 border border-slate-700/70 backdrop-blur-md shadow-lg shadow-black/30 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#02569B]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(2,86,155,0.5)] group-hover/pill:scale-110 transition-transform">
                  <FlutterLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Flutter</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#61DAFB]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(97,218,251,0.5)] group-hover/pill:scale-110 transition-transform">
                  <ReactNativeLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">React Native</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#FFA000]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(255,160,0,0.5)] group-hover/pill:scale-110 transition-transform">
                  <FirebaseLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Firebase</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Cloud Computing":
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#081E38] via-[#0E345D] to-[#061426] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[radial-gradient(#06B6D4_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

          {/* Cloud Infrastructure Topology SVG */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <svg className="w-full h-full max-w-[260px] max-h-[110px]" viewBox="0 0 260 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(95, 8)">
                <path d="M 22 28 A 12 12 0 0 1 38 16 A 16 16 0 0 1 64 20 A 10 10 0 0 1 72 30 L 16 30 A 7 7 0 0 1 22 28 Z" fill="#0284C7" fillOpacity="0.4" stroke="#38BDF8" strokeWidth="1.4" />
                <text x="44" y="26" fill="#FFFFFF" fontSize="5.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">KUBERNETES</text>
              </g>

              <path d="M 115 42 L 50 64" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M 139 42 L 139 64" stroke="#FF6B00" strokeWidth="1.4" />
              <path d="M 163 42 L 220 64" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" />

              <g transform="translate(20, 64)">
                <rect width="64" height="34" rx="4" fill="#0C1D36" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <rect x="6" y="6" width="38" height="3.5" rx="1.75" fill="#38BDF8" />
                <circle cx="54" cy="8" r="1.8" fill="#34D399" />
                <rect x="6" y="14" width="38" height="3.5" rx="1.75" fill="#38BDF8" />
                <circle cx="54" cy="16" r="1.8" fill="#34D399" />
                <rect x="6" y="22" width="38" height="3.5" rx="1.75" fill="#38BDF8" />
                <circle cx="54" cy="24" r="1.8" fill="#34D399" />
              </g>

              <g transform="translate(98, 64)">
                <rect width="68" height="34" rx="4" fill="#0C1D36" stroke="#FF6B00" strokeWidth="1.2" />
                <rect x="6" y="6" width="42" height="3.5" rx="1.75" fill="#FF6B00" />
                <circle cx="58" cy="8" r="1.8" fill="#34D399" />
                <rect x="6" y="14" width="42" height="3.5" rx="1.75" fill="#FF6B00" />
                <circle cx="58" cy="16" r="1.8" fill="#34D399" />
                <rect x="6" y="22" width="42" height="3.5" rx="1.75" fill="#FF6B00" />
                <circle cx="58" cy="24" r="1.8" fill="#34D399" />
              </g>

              <g transform="translate(176, 64)">
                <rect width="64" height="34" rx="4" fill="#0C1D36" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <rect x="6" y="6" width="38" height="3.5" rx="1.75" fill="#38BDF8" />
                <circle cx="54" cy="8" r="1.8" fill="#34D399" />
                <rect x="6" y="14" width="38" height="3.5" rx="1.75" fill="#38BDF8" />
                <circle cx="54" cy="16" r="1.8" fill="#34D399" />
                <rect x="6" y="22" width="38" height="3.5" rx="1.75" fill="#38BDF8" />
                <circle cx="54" cy="24" r="1.8" fill="#34D399" />
              </g>
            </svg>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950/85 border border-slate-700/70 backdrop-blur-md shadow-lg shadow-black/30 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#FF9900]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(255,153,0,0.5)] group-hover/pill:scale-110 transition-transform">
                  <AWSLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">AWS</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#2496ED]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,150,237,0.5)] group-hover/pill:scale-110 transition-transform">
                  <DockerLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Docker</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#326CE5]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(50,108,229,0.5)] group-hover/pill:scale-110 transition-transform">
                  <KubernetesLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Kubernetes</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Cyber Security":
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#1C0D24] via-[#2A102A] to-[#120718] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[radial-gradient(#F43F5E_1px,transparent_1px)] [background-size:15px_15px] opacity-15" />

          {/* Security Operations Radar & Shield SVG */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <svg className="w-full h-full max-w-[260px] max-h-[110px]" viewBox="0 0 260 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="65" cy="55" r="38" stroke="rgba(244,63,94,0.15)" strokeWidth="1" />
              <circle cx="65" cy="55" r="25" stroke="rgba(244,63,94,0.25)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="65" cy="55" r="12" stroke="rgba(244,63,94,0.35)" strokeWidth="1" />

              <line x1="65" y1="12" x2="65" y2="98" stroke="rgba(244,63,94,0.15)" strokeWidth="1" />
              <line x1="22" y1="55" x2="108" y2="55" stroke="rgba(244,63,94,0.15)" strokeWidth="1" />

              {/* Shield Graphic */}
              <g transform="translate(48, 36)">
                <path d="M 17 0 L 32 6 C 32 24, 17 34, 17 34 C 17 34, 2 24, 2 6 Z" fill="#E11D48" fillOpacity="0.3" stroke="#FF6B00" strokeWidth="1.8" />
                <rect x="12" y="16" width="10" height="9" rx="1.5" fill="#FF6B00" />
                <path d="M 14 16 L 14 12 C 14 10, 20 10, 20 12 L 20 16" stroke="#FF6B00" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              </g>

              {/* SOC Telemetry Box */}
              <g transform="translate(132, 14)">
                <rect width="114" height="80" rx="7" fill="#180B22" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <rect x="8" y="8" width="65" height="6" rx="2.5" fill="#F43F5E" fillOpacity="0.4" />
                <text x="11" y="13" fill="#F43F5E" fontSize="5" fontWeight="bold" fontFamily="monospace">NIDS ENCRYPTION SHIELD</text>

                <text x="8" y="28" fill="#34D399" fontSize="6.5" fontWeight="bold" fontFamily="monospace">✔ Threat Level: 0</text>
                <text x="8" y="40" fill="#E2E8F0" fontSize="6.5" fontFamily="monospace">✔ AES-256 Protocol</text>
                <text x="8" y="52" fill="#E2E8F0" fontSize="6.5" fontFamily="monospace">✔ DPI Firewall: Active</text>

                <rect x="8" y="60" width="98" height="11" rx="2.5" fill="#0C0514" stroke="#FF6B00" strokeWidth="0.8" />
                <text x="12" y="68" fill="#FF6B00" fontSize="5.5" fontFamily="monospace">Packets: 4,821/s Verified</text>
              </g>
            </svg>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950/85 border border-slate-700/70 backdrop-blur-md shadow-lg shadow-black/30 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#268BEE]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(38,139,238,0.5)] group-hover/pill:scale-110 transition-transform">
                  <KaliLinuxLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Kali Linux</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#167EC4]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(22,126,196,0.5)] group-hover/pill:scale-110 transition-transform">
                  <WiresharkLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Wireshark</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#FF6B00]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(245,166,35,0.5)] group-hover/pill:scale-110 transition-transform">
                  <OWASPLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">OWASP</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Data Analytics":
    default:
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#121927] via-[#1A2338] to-[#0E1524] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[radial-gradient(#FF6B00_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

          {/* Business Intelligence Visualizer SVG */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <svg className="w-full h-full max-w-[260px] max-h-[110px]" viewBox="0 0 260 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="biBarGold" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B00" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="biBarCyan" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
              </defs>

              <g transform="translate(25, 14)">
                <line x1="0" y1="75" x2="105" y2="75" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="0" y1="50" x2="105" y2="50" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="0" y1="25" x2="105" y2="25" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 2" />

                <rect x="8" y="38" width="10" height="37" rx="2.5" fill="url(#biBarCyan)" />
                <rect x="24" y="24" width="10" height="51" rx="2.5" fill="url(#biBarGold)" />
                <rect x="40" y="46" width="10" height="29" rx="2.5" fill="url(#biBarCyan)" />
                <rect x="56" y="16" width="10" height="59" rx="2.5" fill="url(#biBarGold)" />
                <rect x="72" y="32" width="10" height="43" rx="2.5" fill="url(#biBarCyan)" />

                <polyline points="13,35 29,21 45,42 61,13 77,28" fill="none" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="61" cy="13" r="2.5" fill="#34D399" />
              </g>

              {/* Donut Chart / KPI Box */}
              <g transform="translate(145, 14)">
                <rect width="98" height="78" rx="7" fill="#18233C" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <circle cx="49" cy="34" r="20" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
                <circle cx="49" cy="34" r="20" stroke="#FF6B00" strokeWidth="5" strokeDasharray="98 130" strokeLinecap="round" transform="rotate(-90 49 34)" />
                <text x="49" y="37.5" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">84%</text>

                <text x="49" y="63" fill="#38BDF8" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">BI Growth: +42.6%</text>
                <rect x="22" y="68" width="54" height="2.5" rx="1.25" fill="#34D399" />
              </g>
            </svg>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950/85 border border-slate-700/70 backdrop-blur-md shadow-lg shadow-black/30 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#F2C811]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(242,200,17,0.5)] group-hover/pill:scale-110 transition-transform">
                  <PowerBILogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Power BI</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#E97627]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(233,118,39,0.5)] group-hover/pill:scale-110 transition-transform">
                  <TableauLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Tableau</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#3776AB]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(55,118,171,0.5)] group-hover/pill:scale-110 transition-transform">
                  <PythonLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-slate-200 font-mono">Python</span>
              </div>
            </div>
          </div>
        </div>
      );
  }
}


