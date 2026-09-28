"use client";

import React from "react";
import Link from "next/link";
import {
  BrainCircuit,
  Cpu,
  Eye,
  FileCode2,
  Coffee,
  Globe,
  Smartphone,
  Cloud,
  ShieldAlert,
  BarChart3,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { PROJECTS_DATA } from "@/data/projects";

export default function CategoryGrid() {
  const categoryConfigs = [
    {
      name: "AI & Data Science",
      icon: <BrainCircuit className="w-6 h-6 text-purple-600" />,
      iconBg: "bg-purple-50 border-purple-200",
      desc: "Multimodal Diagnostic Systems, Natural Language Processing, BioBERT, and Generative Transformers.",
      count: "45+"
    },
    {
      name: "Machine Learning",
      icon: <Cpu className="w-6 h-6 text-blue-600" />,
      iconBg: "bg-blue-50 border-blue-200",
      desc: "Graph Neural Networks, Anomaly Detection, Predictive Modeling, and Gradient Boosted Ensembles.",
      count: "50+"
    },
    {
      name: "Deep Learning",
      icon: <Eye className="w-6 h-6 text-indigo-600" />,
      iconBg: "bg-indigo-50 border-indigo-200",
      desc: "YOLOv10 Real-Time Drone Surveillance, 3D CNNs, Facial Mesh Landmarking, and Object Localization.",
      count: "38+"
    },
    {
      name: "Python Projects",
      icon: <FileCode2 className="w-6 h-6 text-emerald-600" />,
      iconBg: "bg-emerald-50 border-emerald-200",
      desc: "Computer Vision Safety, MediaPipe Landmark Tracking, IoT Edge Controllers, and Desktop Systems.",
      count: "60+"
    },
    {
      name: "Java Projects",
      icon: <Coffee className="w-6 h-6 text-orange-600" />,
      iconBg: "bg-orange-50 border-orange-200",
      desc: "Enterprise Spring Boot 3 Microservices, Cryptographic Merkle Proofs, and High-Throughput REST APIs.",
      count: "35+"
    },
    {
      name: "Web Development",
      icon: <Globe className="w-6 h-6 text-teal-600" />,
      iconBg: "bg-teal-50 border-teal-200",
      desc: "Next.js Full Stack, Real-Time WebSockets Collaboration, Cloud IDEs, and Responsive Web Portals.",
      count: "55+"
    },
    {
      name: "Mobile App Development",
      icon: <Smartphone className="w-6 h-6 text-sky-600" />,
      iconBg: "bg-sky-50 border-sky-200",
      desc: "Flutter & React Native, Peer-to-Peer Bluetooth Mesh Networks, and On-Device Mobile AI Applications.",
      count: "30+"
    },
    {
      name: "Cloud Computing",
      icon: <Cloud className="w-6 h-6 text-cyan-600" />,
      iconBg: "bg-cyan-50 border-cyan-200",
      desc: "Serverless Workflow Engines, Knative Event-Driven Compute, and Dynamic Auto-Scaling on Kubernetes.",
      count: "28+"
    },
    {
      name: "Cyber Security",
      icon: <ShieldAlert className="w-6 h-6 text-rose-600" />,
      iconBg: "bg-rose-50 border-rose-200",
      desc: "Zero-Day Ransomware Detection, Network Intrusion Detection (NIDS), DPI, and SOC Security Portals.",
      count: "25+"
    },
    {
      name: "Data Analytics",
      icon: <BarChart3 className="w-6 h-6 text-amber-600" />,
      iconBg: "bg-amber-50 border-amber-200",
      desc: "Clinical Readmission Forecasters, Operational Intelligence Dashboards, ETL Pipelines, and SHAP Attributions.",
      count: "32+"
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-[#0B1F4D] mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
            <span className="font-mono uppercase tracking-wider text-[11px] font-bold">10 Trending Domains</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Popular Project <span className="text-gradient-gold">Categories</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] leading-relaxed">
            Choose from comprehensive academic domains aligned with current university syllabi and emerging industry technology stacks.
          </p>
        </div>

        {/* 10 Modern Glassmorphism Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {categoryConfigs.map((cat, idx) => {
            const count = PROJECTS_DATA.filter((p) => p.category === cat.name).length || 5;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative rounded-2xl bg-white border border-slate-200/90 p-5 shadow-[0_4px_20px_-4px_rgba(11,31,77,0.04)] hover:shadow-[0_16px_35px_-6px_rgba(11,31,77,0.09)] hover:border-[#F5A623]/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${cat.iconBg} border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      {cat.icon}
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[#0B1F4D]">
                      {cat.count}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0F172A] mb-1.5 group-hover:text-[#0B1F4D] transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-[#64748B] leading-relaxed mb-4 line-clamp-3">
                    {cat.desc}
                  </p>
                </div>

                {/* Explore Button */}
                <Link
                  href={`/projects?category=${encodeURIComponent(cat.name)}`}
                  className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0B1F4D] group-hover:text-[#D97706] transition-colors"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
