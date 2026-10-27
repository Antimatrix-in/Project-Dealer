"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import CategoryIllustration from "./CategoryIllustration";

export default function CategoryGrid() {
  const categoryConfigs = [
    {
      name: "AI & Data Science",
      desc: "Multimodal Diagnostic Systems, Natural Language Processing, BioBERT, and Generative Transformers.",
      count: "45+"
    },
    {
      name: "Machine Learning",
      desc: "Graph Neural Networks, Anomaly Detection, Predictive Modeling, and Gradient Boosted Ensembles.",
      count: "50+"
    },
    {
      name: "Deep Learning",
      desc: "YOLOv10 Real-Time Drone Surveillance, 3D CNNs, Facial Mesh Landmarking, and Object Localization.",
      count: "38+"
    },
    {
      name: "Python Projects",
      desc: "Computer Vision Safety, MediaPipe Landmark Tracking, IoT Edge Controllers, and Desktop Systems.",
      count: "60+"
    },
    {
      name: "Java Projects",
      desc: "Enterprise Spring Boot 3 Microservices, Cryptographic Merkle Proofs, and High-Throughput REST APIs.",
      count: "35+"
    },
    {
      name: "Web Development",
      desc: "Next.js Full Stack, Real-Time WebSockets Collaboration, Cloud IDEs, and Responsive Web Portals.",
      count: "55+"
    },
    {
      name: "Mobile App Development",
      desc: "Flutter & React Native, Peer-to-Peer Bluetooth Mesh Networks, and On-Device Mobile AI Applications.",
      count: "30+"
    },
    {
      name: "Cloud Computing",
      desc: "Serverless Workflow Engines, Knative Event-Driven Compute, and Dynamic Auto-Scaling on Kubernetes.",
      count: "28+"
    },
    {
      name: "Cyber Security",
      desc: "Zero-Day Ransomware Detection, Network Intrusion Detection (NIDS), DPI, and SOC Security Portals.",
      count: "25+"
    },
    {
      name: "Data Analytics",
      desc: "Clinical Readmission Forecasters, Operational Intelligence Dashboards, ETL Pipelines, and SHAP Attributions.",
      count: "32+"
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1E8] border border-[#FF6B00]/25 text-xs font-semibold text-[#FF6B00] mb-4 shadow-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
            <span className="uppercase tracking-wider text-[11px] font-bold">10 Trending Domains</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101828] tracking-tight">
            Popular Project <span className="text-gradient-orange-red">Categories</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#526581] leading-relaxed">
            Choose from comprehensive project domains aligned with current university syllabi and emerging industry technology stacks.
          </p>
        </div>

        {/* 10 Modern Category Cards with Professional Technology Illustrations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categoryConfigs.map((cat, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative rounded-[16px] bg-white border border-slate-200/90 shadow-[0_4px_25px_-4px_rgba(255,107,0,0.06)] hover:shadow-[0_20px_35px_-8px_rgba(255,107,0,0.16)] hover:border-[#FF6B00]/60 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Top 40% Featured Technology Illustration with Official Logos */}
                  <div className="h-52 sm:h-56 w-full relative overflow-hidden rounded-t-[15px] border-b border-slate-100">
                    <CategoryIllustration category={cat.name} />

                    {/* Floating Project Count Badge */}
                    <div className="absolute top-3 right-3 z-20">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-white/95 text-[#101828] shadow-md border border-white/80 backdrop-blur-md">
                        {cat.count} Projects
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-5">
                    {/* Category Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#101828] group-hover:text-[#FF6B00] transition-colors leading-snug mb-2">
                      <Link href={`/projects?category=${encodeURIComponent(cat.name)}`}>
                        {cat.name}
                      </Link>
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-[#526581] leading-relaxed line-clamp-3 mb-4">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                {/* Explore Projects Button at Bottom */}
                <div className="px-5 pb-5 pt-0">
                  <Link
                    href={`/projects?category=${encodeURIComponent(cat.name)}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FFF9F5] hover:bg-gradient-to-r hover:from-[#FF6B00] hover:to-[#D90429] text-[#101828] hover:text-white border border-[#FF6B00]/25 hover:border-transparent text-xs font-bold transition-all duration-200 flex items-center justify-between group/btn shadow-xs cursor-pointer"
                  >
                    <span>Explore Projects</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FF6B00] group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
