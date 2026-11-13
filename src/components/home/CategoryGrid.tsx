"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="py-24 bg-[#F4F6FA] relative">
      <div className="w-full max-w-[1780px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101D38] tracking-tight">
            Popular Project <span className="text-[#F58216]">Categories</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#263750] leading-relaxed">
            Choose from comprehensive project domains aligned with current university syllabi and emerging industry technology stacks.
          </p>
        </div>

        {/* 10 Modern Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categoryConfigs.map((cat, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="group relative rounded-2xl bg-[#FFFFFF] border border-[#DCE2EA] p-6 shadow-xs hover:shadow-md hover:border-[#F58216] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Category / Domain Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#101D38] group-hover:text-[#F58216] transition-colors leading-snug mb-3">
                    <Link href={`/projects/${cat.slug}`}>
                      {cat.name}
                    </Link>
                  </h3>

                  {/* Content / Description */}
                  <p className="text-xs sm:text-sm text-[#5A6B82] leading-relaxed mb-6 font-normal">
                    {cat.desc}
                  </p>
                </div>

                {/* Explore Projects Button at Bottom */}
                <div>
                  <Link
                    href={`/projects/${cat.slug}`}
                    id={`explore-category-${cat.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#101D38] hover:bg-[#1A2C50] text-white text-xs font-bold transition-all duration-200 flex items-center justify-between group/btn shadow-xs cursor-pointer border border-[#101D38]"
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#F58216] hover:bg-[#E0720F] text-white font-bold text-sm transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 border border-[#F58216]"
          >
            <span>Browse All 16 Technical Domains</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}
