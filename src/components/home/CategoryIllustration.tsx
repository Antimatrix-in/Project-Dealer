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
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F5F1E7] to-[#EEE9DC] flex flex-col justify-between p-3 select-none">
          {/* Subtle Background Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#315C3D_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
          
          {/* Main Dark-Tech Graphic Viewport */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <svg className="w-full h-full max-w-[260px] max-h-[110px]" viewBox="0 0 260 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="aiChartFill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#315C3D" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#315C3D" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Neural Synapse Network */}
              <g stroke="#DDDCCF" strokeWidth="1.2">
                <line x1="25" y1="35" x2="55" y2="20" />
                <line x1="25" y1="35" x2="40" y2="70" />
                <line x1="55" y1="20" x2="85" y2="40" />
                <line x1="40" y1="70" x2="75" y2="80" />
                <line x1="85" y1="40" x2="75" y2="80" />
                <line x1="85" y1="40" x2="115" y2="55" />
                <line x1="55" y1="20" x2="60" y2="50" stroke="#315C3D" strokeWidth="1.5" />
                <line x1="60" y1="50" x2="75" y2="80" stroke="#315C3D" strokeWidth="1.5" />
              </g>

              <circle cx="25" cy="35" r="4.5" fill="#667064" />
              <circle cx="55" cy="20" r="4" fill="#315C3D" />
              <circle cx="40" cy="70" r="3.5" fill="#667064" />
              <circle cx="85" cy="40" r="5" fill="#497A52" />
              <circle cx="75" cy="80" r="4.5" fill="#667064" />

              {/* Center Pulsing AI Core */}
              <circle cx="60" cy="50" r="7" fill="#315C3D" fillOpacity="0.25" />
              <circle cx="60" cy="50" r="4" fill="#315C3D" />
              <circle cx="60" cy="50" r="1.5" fill="#FFFFFF" />

              {/* Connecting Bridge to Dashboard */}
              <path d="M115 55 C 128 55, 128 40, 138 40" stroke="#315C3D" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Analytics Dashboard Card */}
              <g transform="translate(138, 12)">
                <rect width="114" height="84" rx="7" fill="#FFFFFF" fillOpacity="0.95" stroke="#DDDCCF" strokeWidth="1" />
                <rect x="8" y="8" width="50" height="5" rx="2.5" fill="#667064" fillOpacity="0.7" />
                <text x="64" y="12.5" fill="#315C3D" fontSize="5" fontWeight="bold" fontFamily="monospace">99.2% ACC</text>

                {/* Sparkline Chart */}
                <path d="M 8 60 Q 25 30, 45 48 T 85 28 T 106 24 L 106 68 L 8 68 Z" fill="url(#aiChartFill)" />
                <path d="M 8 60 Q 25 30, 45 48 T 85 28 T 106 24" fill="none" stroke="#315C3D" strokeWidth="1.6" />
                <circle cx="106" cy="24" r="2.5" fill="#315C3D" />

                <rect x="8" y="73" width="22" height="3" rx="1.5" fill="#DDDCCF" />
                <rect x="34" y="73" width="28" height="3" rx="1.5" fill="#DDDCCF" />
                <rect x="66" y="73" width="38" height="3" rx="1.5" fill="#315C3D" fillOpacity="0.7" />
              </g>
            </svg>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#EEE9DC]/90 border border-[#DDDCCF] backdrop-blur-md shadow-lg shadow-black/40 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <TensorFlowLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">TensorFlow</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <PyTorchLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">PyTorch</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <OpenAILogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">OpenAI</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <PandasLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Pandas</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Machine Learning":
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F5F1E7] to-[#EEE9DC] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#DDDCCF_1px,transparent_1px),linear-gradient(to_bottom,#DDDCCF_1px,transparent_1px)] bg-[size:18px_18px] opacity-25" />

          {/* Main Predictive Chart Graphic */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <svg className="w-full h-full max-w-[260px] max-h-[110px]" viewBox="0 0 260 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="mlConfidenceBand" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#315C3D" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#315C3D" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              <line x1="25" y1="92" x2="240" y2="92" stroke="#DDDCCF" strokeWidth="1" />
              <line x1="25" y1="12" x2="25" y2="92" stroke="#DDDCCF" strokeWidth="1" />

              {/* Shaded Confidence Band */}
              <path d="M 30 75 Q 80 65, 130 45 T 230 20 L 230 45 Q 180 65, 130 72 T 30 88 Z" fill="url(#mlConfidenceBand)" />

              {/* Regression Curve */}
              <path d="M 30 82 Q 80 66, 130 54 T 230 30" fill="none" stroke="#315C3D" strokeWidth="2.2" strokeLinecap="round" />

              {/* Scatter Points */}
              <circle cx="45" cy="78" r="2.5" fill="#667064" />
              <circle cx="65" cy="70" r="3" fill="#315C3D" />
              <circle cx="90" cy="68" r="2.5" fill="#667064" />
              <circle cx="115" cy="58" r="3" fill="#497A52" />
              <circle cx="140" cy="52" r="2.5" fill="#667064" />
              <circle cx="170" cy="42" r="3" fill="#315C3D" />
              <circle cx="200" cy="35" r="2.5" fill="#667064" />
              <circle cx="225" cy="28" r="3" fill="#497A52" />

              {/* Floating Prediction Overlay Box */}
              <g transform="translate(135, 12)">
                <rect width="102" height="36" rx="6" fill="#FFFFFF" fillOpacity="0.95" stroke="#DDDCCF" strokeWidth="1" />
                <text x="8" y="14" fill="#315C3D" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">● Model Forecast</text>
                <text x="8" y="25" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" fontFamily="monospace">Acc: 98.7% (R² 0.94)</text>
              </g>
            </svg>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#EEE9DC]/90 border border-[#DDDCCF] backdrop-blur-md shadow-lg shadow-black/40 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <ScikitLearnLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Scikit-Learn</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <XGBoostLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">XGBoost</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <TensorFlowLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">TensorFlow</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <NumPyLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">NumPy</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Deep Learning":
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F5F1E7] to-[#EEE9DC] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[radial-gradient(#315C3D_1px,transparent_1px)] [background-size:14px_14px] opacity-15" />

          {/* Main Neural Network & Computer Vision Graphics */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <svg className="w-full h-full max-w-[260px] max-h-[110px]" viewBox="0 0 260 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Neural Network Nodes */}
              <circle cx="25" cy="25" r="4.5" fill="#667064" />
              <circle cx="25" cy="55" r="4.5" fill="#667064" />
              <circle cx="25" cy="85" r="4.5" fill="#667064" />

              <circle cx="65" cy="20" r="4.5" fill="#667064" />
              <circle cx="65" cy="45" r="4.5" fill="#667064" />
              <circle cx="65" cy="70" r="4.5" fill="#667064" />
              <circle cx="65" cy="95" r="4.5" fill="#667064" />

              <circle cx="105" cy="35" r="4.5" fill="#315C3D" />
              <circle cx="105" cy="65" r="4.5" fill="#315C3D" />
              <circle cx="105" cy="95" r="4.5" fill="#315C3D" />

              <g stroke="rgba(255,255,255,0.12)" strokeWidth="1">
                <line x1="25" y1="25" x2="65" y2="20" />
                <line x1="25" y1="25" x2="65" y2="45" />
                <line x1="25" y1="55" x2="65" y2="45" />
                <line x1="25" y1="55" x2="65" y2="70" />
                <line x1="25" y1="85" x2="65" y2="70" />
                <line x1="25" y1="85" x2="65" y2="95" />
                <line x1="65" y1="20" x2="105" y2="35" stroke="#667064" strokeWidth="1.2" />
                <line x1="65" y1="45" x2="105" y2="65" stroke="#315C3D" strokeWidth="1.4" />
                <line x1="65" y1="70" x2="105" y2="65" />
                <line x1="65" y1="95" x2="105" y2="95" stroke="#497A52" strokeWidth="1.2" />
              </g>

              {/* Computer Vision Frame */}
              <g transform="translate(142, 10)">
                <rect width="98" height="88" rx="7" fill="#FFFFFF" stroke="#DDDCCF" strokeWidth="1" />
                
                {/* Bounding Box Brackets */}
                <path d="M 20 30 L 12 30 L 12 38" stroke="#315C3D" strokeWidth="2" strokeLinecap="round" />
                <path d="M 78 30 L 86 30 L 86 38" stroke="#315C3D" strokeWidth="2" strokeLinecap="round" />
                <path d="M 12 65 L 12 73 L 20 73" stroke="#315C3D" strokeWidth="2" strokeLinecap="round" />
                <path d="M 86 65 L 86 73 L 78 73" stroke="#315C3D" strokeWidth="2" strokeLinecap="round" />

                <rect x="12" y="20" width="65" height="9" rx="2.5" fill="#315C3D" />
                <text x="15" y="26.5" fill="#202820" fontSize="5.5" fontWeight="bold" fontFamily="monospace">YOLOv10: 99.4%</text>

                <circle cx="49" cy="52" r="14" stroke="#315C3D" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="49" cy="52" r="3.5" fill="#315C3D" fillOpacity="0.8" />
              </g>
            </svg>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#EEE9DC]/90 border border-[#DDDCCF] backdrop-blur-md shadow-lg shadow-black/40 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <PyTorchLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">PyTorch</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <TensorFlowLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">TensorFlow</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <YoloLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">YOLO</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <OpenCVLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">OpenCV</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Python Projects":
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F5F1E7] to-[#EEE9DC] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#DDDCCF_1px,transparent_1px),linear-gradient(to_bottom,#DDDCCF_1px,transparent_1px)] bg-[size:18px_18px] opacity-20" />

          {/* Code IDE Window Mockup */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <div className="w-full max-w-[245px] h-[98px] rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] shadow-lg overflow-hidden flex flex-col">
              <div className="bg-[#202820] px-3 py-1.5 border-b border-[#DDDCCF] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#315C3D]" />
                  <span className="w-2 h-2 rounded-full bg-[#667064]" />
                  <span className="w-2 h-2 rounded-full bg-[#202820]" />
                  <span className="ml-2 text-[8.5px] font-mono text-[#667064]">app_detector.py</span>
                </div>
                <span className="text-[7.5px] font-mono text-[#315C3D] bg-[#315C3D]/10 px-1.5 py-0.5 rounded border border-[#315C3D]/20">Python 3.11</span>
              </div>

              <div className="p-2 font-mono text-[8.5px] leading-relaxed text-[#667064] space-y-0.5">
                <p>
                  <span className="text-[#315C3D] font-bold">import</span> cv2, torch, fastapi
                </p>
                <p>
                  <span className="text-white">model</span> = torch.load(<span className="text-[#497A52]">&apos;best_weights.pt&apos;</span>)
                </p>
                <p>
                  <span className="text-[#315C3D] font-bold">def</span> <span className="text-white">detect_stream</span>(frame): <span className="text-[#315C3D]">return</span> model(frame)
                </p>
              </div>

              <div className="mt-auto bg-[#202820] px-2.5 py-0.5 border-t border-[#DDDCCF] flex items-center justify-between text-[7.5px] font-mono text-[#315C3D]">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#315C3D] animate-pulse" />
                  FastAPI Server Active • 60 FPS
                </span>
                <span className="text-[#667064]">12ms</span>
              </div>
            </div>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#EEE9DC]/90 border border-[#DDDCCF] backdrop-blur-md shadow-lg shadow-black/40 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <PythonLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Python</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <FastAPILogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">FastAPI</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <FlaskLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Flask</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <DjangoLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Django</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Java Projects":
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F5F1E7] to-[#EEE9DC] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[radial-gradient(#315C3D_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

          {/* Microservices Topology Architecture SVG */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <svg className="w-full h-full max-w-[260px] max-h-[110px]" viewBox="0 0 260 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(85, 8)">
                <rect width="90" height="24" rx="5" fill="#FFFFFF" stroke="#315C3D" strokeWidth="1.3" />
                <text x="45" y="15" fill="#315C3D" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">API Gateway :8080</text>
              </g>

              <path d="M 130 32 L 70 56" stroke="#DDDCCF" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M 130 32 L 190 56" stroke="#DDDCCF" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M 70 76 L 130 92" stroke="#497A52" strokeWidth="1.2" />
              <path d="M 190 76 L 130 92" stroke="#497A52" strokeWidth="1.2" />

              <g transform="translate(25, 54)">
                <rect width="90" height="24" rx="5" fill="#FFFFFF" stroke="#DDDCCF" strokeWidth="1.2" />
                <text x="45" y="15" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Spring Auth Service</text>
              </g>

              <g transform="translate(145, 54)">
                <rect width="90" height="24" rx="5" fill="#FFFFFF" stroke="#DDDCCF" strokeWidth="1.2" />
                <text x="45" y="15" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Kafka Event Service</text>
              </g>

              <g transform="translate(85, 84)">
                <rect width="90" height="22" rx="5" fill="#EEE9DC" stroke="#315C3D" strokeWidth="1.2" />
                <text x="45" y="14" fill="#315C3D" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Hibernate ORM / DB</text>
              </g>
            </svg>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#EEE9DC]/90 border border-[#DDDCCF] backdrop-blur-md shadow-lg shadow-black/40 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <JavaLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Java 21</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <SpringBootLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Spring Boot</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <HibernateLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Hibernate</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Web Development":
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F5F1E7] to-[#EEE9DC] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[radial-gradient(#315C3D_1px,transparent_1px)] [background-size:15px_15px] opacity-15" />

          {/* Browser Window Mockup */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <div className="w-full max-w-[245px] h-[98px] rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] shadow-xl overflow-hidden flex flex-col">
              <div className="bg-[#202820] px-3 py-1 border-b border-[#DDDCCF] flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#315C3D]" />
                  <span className="w-2 h-2 rounded-full bg-[#667064]" />
                  <span className="w-2 h-2 rounded-full bg-[#202820]" />
                </div>
                <div className="flex-1 max-w-[130px] px-2 py-0.5 rounded bg-[#DCE8D9] border border-[#DDDCCF] text-[7.5px] font-mono text-[#667064] truncate">
                  https://modern-saas.app
                </div>
              </div>

              <div className="p-2 space-y-1.5">
                <div className="flex items-center justify-between pb-1 border-b border-[#DDDCCF]">
                  <div className="w-10 h-2 rounded bg-gradient-to-r from-[#315C3D] to-[#315C3D]" />
                  <div className="flex gap-1">
                    <div className="w-6 h-1.5 rounded bg-[#DDDCCF]" />
                    <div className="w-6 h-1.5 rounded bg-[#DDDCCF]" />
                    <div className="w-8 h-1.5 rounded bg-[#315C3D]" />
                  </div>
                </div>

                <div className="p-1.5 rounded bg-[#DCE8D9] border border-[#DDDCCF] space-y-0.5">
                  <div className="w-24 h-2 rounded bg-white" />
                  <div className="w-16 h-1.5 rounded bg-[#667064]" />
                </div>

                <div className="grid grid-cols-3 gap-1 pt-0.5">
                  <div className="h-4 rounded bg-[#DCE8D9] border border-[#DDDCCF]" />
                  <div className="h-4 rounded bg-[#DCE8D9] border border-[#DDDCCF]" />
                  <div className="h-4 rounded bg-[#DCE8D9] border border-[#DDDCCF]" />
                </div>
              </div>
            </div>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#EEE9DC]/90 border border-[#DDDCCF] backdrop-blur-md shadow-lg shadow-black/40 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <ReactLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">React</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <NextjsLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Next.js</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <NodejsLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Node.js</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <TailwindLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Tailwind</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Mobile App Development":
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F5F1E7] to-[#EEE9DC] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[radial-gradient(#315C3D_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

          {/* Smartphone UI Mockup */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <div className="w-[120px] h-[100px] rounded-xl bg-[#FFFFFF] border-2 border-[#DDDCCF] shadow-2xl p-1.5 flex flex-col justify-between relative overflow-hidden">
              <div className="w-8 h-2 bg-black rounded-full mx-auto mb-1 flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-[#DDDCCF]" />
              </div>

              <div className="flex-1 space-y-1 px-0.5">
                <div className="flex items-center justify-between">
                  <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#315C3D] to-[#497A52]" />
                  <div className="w-8 h-1.5 rounded bg-[#DDDCCF]" />
                </div>

                <div className="p-1.5 rounded bg-[#DCE8D9] border border-[#DDDCCF] text-white space-y-0.5 shadow-sm">
                  <div className="w-6 h-1 rounded bg-[#667064]" />
                  <div className="w-10 h-2 rounded bg-white" />
                </div>

                <div className="grid grid-cols-2 gap-1">
                  <div className="h-3 rounded bg-[#DCE8D9]" />
                  <div className="h-3 rounded bg-[#DCE8D9]" />
                </div>
              </div>
            </div>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#EEE9DC]/90 border border-[#DDDCCF] backdrop-blur-md shadow-lg shadow-black/40 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <FlutterLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Flutter</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <ReactNativeLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">React Native</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <FirebaseLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Firebase</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Cloud Computing":
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F5F1E7] to-[#EEE9DC] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[radial-gradient(#315C3D_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

          {/* Cloud Infrastructure Topology SVG */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <svg className="w-full h-full max-w-[260px] max-h-[110px]" viewBox="0 0 260 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(95, 8)">
                <path d="M 22 28 A 12 12 0 0 1 38 16 A 16 16 0 0 1 64 20 A 10 10 0 0 1 72 30 L 16 30 A 7 7 0 0 1 22 28 Z" fill="#FFFFFF" stroke="#315C3D" strokeWidth="1.4" />
                <text x="44" y="26" fill="#FFFFFF" fontSize="5.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">KUBERNETES</text>
              </g>

              <path d="M 115 42 L 50 64" stroke="#667064" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M 139 42 L 139 64" stroke="#315C3D" strokeWidth="1.4" />
              <path d="M 163 42 L 220 64" stroke="#667064" strokeWidth="1.2" strokeDasharray="3 3" />

              <g transform="translate(20, 64)">
                <rect width="64" height="34" rx="4" fill="#FFFFFF" stroke="#DDDCCF" strokeWidth="1" />
                <rect x="6" y="6" width="38" height="3.5" rx="1.75" fill="#667064" />
                <circle cx="54" cy="8" r="1.8" fill="#315C3D" />
                <rect x="6" y="14" width="38" height="3.5" rx="1.75" fill="#667064" />
                <circle cx="54" cy="16" r="1.8" fill="#315C3D" />
                <rect x="6" y="22" width="38" height="3.5" rx="1.75" fill="#667064" />
                <circle cx="54" cy="24" r="1.8" fill="#315C3D" />
              </g>

              <g transform="translate(98, 64)">
                <rect width="68" height="34" rx="4" fill="#FFFFFF" stroke="#315C3D" strokeWidth="1.2" />
                <rect x="6" y="6" width="42" height="3.5" rx="1.75" fill="#315C3D" />
                <circle cx="58" cy="8" r="1.8" fill="#497A52" />
                <rect x="6" y="14" width="42" height="3.5" rx="1.75" fill="#315C3D" />
                <circle cx="58" cy="16" r="1.8" fill="#497A52" />
                <rect x="6" y="22" width="42" height="3.5" rx="1.75" fill="#315C3D" />
                <circle cx="58" cy="24" r="1.8" fill="#497A52" />
              </g>

              <g transform="translate(176, 64)">
                <rect width="64" height="34" rx="4" fill="#FFFFFF" stroke="#DDDCCF" strokeWidth="1" />
                <rect x="6" y="6" width="38" height="3.5" rx="1.75" fill="#667064" />
                <circle cx="54" cy="8" r="1.8" fill="#315C3D" />
                <rect x="6" y="14" width="38" height="3.5" rx="1.75" fill="#667064" />
                <circle cx="54" cy="16" r="1.8" fill="#315C3D" />
                <rect x="6" y="22" width="38" height="3.5" rx="1.75" fill="#667064" />
                <circle cx="54" cy="24" r="1.8" fill="#315C3D" />
              </g>
            </svg>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#EEE9DC]/90 border border-[#DDDCCF] backdrop-blur-md shadow-lg shadow-black/40 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <AWSLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">AWS</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <DockerLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Docker</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <KubernetesLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Kubernetes</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Cyber Security":
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F5F1E7] to-[#EEE9DC] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[radial-gradient(#315C3D_1px,transparent_1px)] [background-size:15px_15px] opacity-15" />

          {/* Security Operations Radar & Shield SVG */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <svg className="w-full h-full max-w-[260px] max-h-[110px]" viewBox="0 0 260 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="65" cy="55" r="38" stroke="rgba(36,75,53,0.15)" strokeWidth="1" />
              <circle cx="65" cy="55" r="25" stroke="rgba(255,121,0,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="65" cy="55" r="12" stroke="rgba(255,121,0,0.4)" strokeWidth="1" />

              <line x1="65" y1="12" x2="65" y2="98" stroke="#DDDCCF" strokeWidth="1" />
              <line x1="22" y1="55" x2="108" y2="55" stroke="#DDDCCF" strokeWidth="1" />

              {/* Shield Graphic */}
              <g transform="translate(48, 36)">
                <path d="M 17 0 L 32 6 C 32 24, 17 34, 17 34 C 17 34, 2 24, 2 6 Z" fill="#FFFFFF" stroke="#315C3D" strokeWidth="1.8" />
                <rect x="12" y="16" width="10" height="9" rx="1.5" fill="#315C3D" />
                <path d="M 14 16 L 14 12 C 14 10, 20 10, 20 12 L 20 16" stroke="#315C3D" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              </g>

              {/* SOC Telemetry Box */}
              <g transform="translate(132, 14)">
                <rect width="114" height="80" rx="7" fill="#FFFFFF" stroke="#DDDCCF" strokeWidth="1" />
                <rect x="8" y="8" width="65" height="6" rx="2.5" fill="#315C3D" fillOpacity="0.25" />
                <text x="11" y="13" fill="#315C3D" fontSize="5" fontWeight="bold" fontFamily="monospace">NIDS ENCRYPTION SHIELD</text>

                <text x="8" y="28" fill="#315C3D" fontSize="6.5" fontWeight="bold" fontFamily="monospace">✔ Threat Level: 0</text>
                <text x="8" y="40" fill="#FFFFFF" fontSize="6.5" fontFamily="monospace">✔ AES-256 Protocol</text>
                <text x="8" y="52" fill="#667064" fontSize="6.5" fontFamily="monospace">✔ DPI Firewall: Active</text>

                <rect x="8" y="60" width="98" height="11" rx="2.5" fill="#EEE9DC" stroke="#315C3D" strokeWidth="0.8" />
                <text x="12" y="68" fill="#315C3D" fontSize="5.5" fontFamily="monospace">Packets: 4,821/s Verified</text>
              </g>
            </svg>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#EEE9DC]/90 border border-[#DDDCCF] backdrop-blur-md shadow-lg shadow-black/40 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <KaliLinuxLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Kali Linux</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <WiresharkLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Wireshark</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <OWASPLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">OWASP</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "Data Analytics":
    default:
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F5F1E7] to-[#EEE9DC] flex flex-col justify-between p-3 select-none">
          <div className="absolute inset-0 bg-[radial-gradient(#315C3D_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

          {/* Business Intelligence Visualizer SVG */}
          <div className="w-full flex-1 flex items-center justify-center relative z-10 pt-1 pb-1">
            <svg className="w-full h-full max-w-[260px] max-h-[110px]" viewBox="0 0 260 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="biBarGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#315C3D" />
                  <stop offset="100%" stopColor="#315C3D" />
                </linearGradient>
                <linearGradient id="biBarCharcoal" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#667064" />
                  <stop offset="100%" stopColor="#DDDCCF" />
                </linearGradient>
              </defs>

              <g transform="translate(25, 14)">
                <line x1="0" y1="75" x2="105" y2="75" stroke="#DDDCCF" strokeWidth="1" />
                <line x1="0" y1="50" x2="105" y2="50" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="0" y1="25" x2="105" y2="25" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 2" />

                <rect x="8" y="38" width="10" height="37" rx="2.5" fill="url(#biBarCharcoal)" />
                <rect x="24" y="24" width="10" height="51" rx="2.5" fill="url(#biBarGreen)" />
                <rect x="40" y="46" width="10" height="29" rx="2.5" fill="url(#biBarCharcoal)" />
                <rect x="56" y="16" width="10" height="59" rx="2.5" fill="url(#biBarGreen)" />
                <rect x="72" y="32" width="10" height="43" rx="2.5" fill="url(#biBarCharcoal)" />

                <polyline points="13,35 29,21 45,42 61,13 77,28" fill="none" stroke="#315C3D" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="61" cy="13" r="2.5" fill="#315C3D" />
              </g>

              {/* Donut Chart / KPI Box */}
              <g transform="translate(145, 14)">
                <rect width="98" height="78" rx="7" fill="#FFFFFF" stroke="#DDDCCF" strokeWidth="1" />
                <circle cx="49" cy="34" r="20" stroke="#DDDCCF" strokeWidth="5" />
                <circle cx="49" cy="34" r="20" stroke="#315C3D" strokeWidth="5" strokeDasharray="98 130" strokeLinecap="round" transform="rotate(-90 49 34)" />
                <text x="49" y="37.5" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">84%</text>

                <text x="49" y="63" fill="#315C3D" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">BI Growth: +42.6%</text>
                <rect x="22" y="68" width="54" height="2.5" rx="1.25" fill="#315C3D" />
              </g>
            </svg>
          </div>

          {/* Integrated Tech Logos Dock */}
          <div className="relative z-20 w-full mt-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#EEE9DC]/90 border border-[#DDDCCF] backdrop-blur-md shadow-lg shadow-black/40 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <PowerBILogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Power BI</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <TableauLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Tableau</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/70 transition-all shrink-0 group/pill">
                <div className="filter drop-shadow-[0_0_6px_rgba(36,75,53,0.3)] group-hover/pill:scale-110 transition-transform">
                  <PythonLogo size={14} />
                </div>
                <span className="text-[10px] font-semibold text-[#667064] font-mono">Python</span>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
