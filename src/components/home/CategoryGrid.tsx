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
      slug: "ai-data-science",
      desc: "Multimodal Diagnostic Systems, Natural Language Processing, BioBERT, and Generative Transformers.",
      count: "45+"
    },
    {
      name: "Machine Learning",
      slug: "machine-learning",
      desc: "Graph Neural Networks, Anomaly Detection, Predictive Modeling, and Gradient Boosted Ensembles.",
      count: "50+"
    },
    {
      name: "Deep Learning",
      slug: "deep-learning",
      desc: "YOLOv10 Real-Time Drone Surveillance, 3D CNNs, Facial Mesh Landmarking, and Object Localization.",
      count: "38+"
    },
    {
      name: "Python Projects",
      slug: "python-projects",
      desc: "Computer Vision Safety, MediaPipe Landmark Tracking, IoT Edge Controllers, and Desktop Systems.",
      count: "60+"
    },
    {
      name: "Java Projects",
      slug: "java-projects",
      desc: "Enterprise Spring Boot 3 Microservices, Cryptographic Merkle Proofs, and High-Throughput REST APIs.",
      count: "35+"
    },
    {
      name: "Web Development",
      slug: "web-development",
      desc: "Next.js Full Stack, Real-Time WebSockets Collaboration, Cloud IDEs, and Responsive Web Portals.",
      count: "55+"
    },
    {
      name: "Mobile App Development",
      slug: "mobile-app-development",
      desc: "Flutter & React Native, Peer-to-Peer Bluetooth Mesh Networks, and On-Device Mobile AI Applications.",
      count: "30+"
    },
    {
      name: "Cloud Computing",
      slug: "cloud-computing",
      desc: "Serverless Workflow Engines, Knative Event-Driven Compute, and Dynamic Auto-Scaling on Kubernetes.",
      count: "28+"
    },
    {
      name: "Cyber Security",
      slug: "cyber-security",
      desc: "Zero-Day Ransomware Detection, Network Intrusion Detection (NIDS), DPI, and SOC Security Portals.",
      count: "25+"
    },
    {
      name: "Data Analytics",
      slug: "data-analytics",
      desc: "Clinical Readmission Forecasters, Operational Intelligence Dashboards, ETL Pipelines, and SHAP Attributions.",
      count: "32+"
    }
  ];

  return (
    <section className="py-24 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1D1D1D] border border-[#FF7900]/30 text-xs font-semibold text-[#FF7900] mb-4 shadow-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#FF7900] animate-pulse" />
            <span className="uppercase tracking-wider text-[11px] font-bold">10 Trending Domains</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFFFFF] tracking-tight">
            Popular Project <span className="text-gradient-orange">Categories</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#B8B8B8] leading-relaxed">
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
                className="group relative rounded-[16px] bg-[#161616] border border-[#2A2A2A] shadow-[0_4px_25px_-4px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_35px_-8px_rgba(255,121,0,0.18)] hover:border-[#FF7900] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Top 40% Featured Technology Illustration */}
                  <div className="h-52 sm:h-56 w-full relative overflow-hidden rounded-t-[15px] border-b border-[#2A2A2A]">
                    <CategoryIllustration category={cat.name} />

                    {/* Floating Project Count Badge */}
                    <div className="absolute top-3 right-3 z-20">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#161616]/95 text-[#FF7900] shadow-md border border-[#2A2A2A] backdrop-blur-md">
                        {cat.count} Projects
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-5">
                    {/* Category Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#FFFFFF] group-hover:text-[#FF7900] transition-colors leading-snug mb-2">
                      <Link href={`/projects/${cat.slug}`}>
                        {cat.name}
                      </Link>
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-[#B8B8B8] leading-relaxed line-clamp-3 mb-4">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                {/* Explore Projects Button at Bottom */}
                <div className="px-5 pb-5 pt-0">
                  <Link
                    href={`/projects/${cat.slug}`}
                    id={`explore-category-${cat.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#1D1D1D] hover:bg-[#222222] text-[#FFFFFF] hover:text-[#FF7900] border border-[#2A2A2A] hover:border-[#FF7900] text-xs font-bold transition-all duration-200 flex items-center justify-between group/btn shadow-xs cursor-pointer"
                  >
                    <span>Explore Projects</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FF7900] group-hover/btn:translate-x-1 transition-all" />
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
