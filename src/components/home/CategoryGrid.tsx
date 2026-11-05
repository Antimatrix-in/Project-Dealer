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
    <section className="py-24 bg-[#F5F1E7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCE8D9] border border-[#D8DDCF] text-xs font-semibold text-[#285A3B] mb-4 shadow-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#285A3B] animate-pulse" />
            <span className="uppercase tracking-wider text-[11px] font-bold">16 Technical Domains</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F2A22] tracking-tight">
            Popular Project <span className="text-[#285A3B]">Categories</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#667064] leading-relaxed">
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
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="group relative rounded-[16px] bg-[#FFFFFF] border border-[#DDDCCF] shadow-xs hover:shadow-md hover:border-[#315C3D] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Top 40% Featured Technology Illustration */}
                  <div className="h-52 sm:h-56 w-full relative overflow-hidden rounded-t-[15px] border-b border-[#DDDCCF]">
                    <CategoryIllustration category={cat.name} />

                    {/* Floating Project Count Badge */}
                    <div className="absolute top-3 right-3 z-20">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#FFFFFF]/95 text-[#315C3D] shadow-xs border border-[#DDDCCF] backdrop-blur-xs">
                        {cat.count} Projects
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-5">
                    {/* Category Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#202820] group-hover:text-[#315C3D] transition-colors leading-snug mb-2">
                      <Link href={`/projects/${cat.slug}`}>
                        {cat.name}
                      </Link>
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-[#667064] leading-relaxed line-clamp-3 mb-4">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                {/* Explore Projects Button at Bottom */}
                <div className="px-5 pb-5 pt-0">
                  <Link
                    href={`/projects/${cat.slug}`}
                    id={`explore-category-${cat.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-all duration-200 flex items-center justify-between group/btn shadow-xs cursor-pointer border border-[#315C3D]"
                  >
                    <span>Explore Projects</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white group-hover/btn:translate-x-1 transition-all" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Action: View All 16 Technical Domains */}
        <div className="mt-14 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#285A3B] hover:bg-[#214930] text-white font-bold text-sm transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 border border-[#285A3B]"
          >
            <span>Browse All 16 Technical Domains</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}
