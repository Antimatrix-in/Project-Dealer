"use client";

import React from "react";
import { FolderCheck, Users, Layers, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function StatisticsSection() {
  const stats = [
    {
      value: "500+",
      label: "Projects Delivered",
      description: "Across AI, Web, Cloud & Core Computer Science domains.",
      icon: <FolderCheck className="w-6 h-6 text-[#FF6B00]" />,
    },
    {
      value: "1200+",
      label: "Happy Students",
      description: "From top engineering universities across India & abroad.",
      icon: <Users className="w-6 h-6 text-[#FF3D3D]" />,
    },
    {
      value: "25+",
      label: "Project Domains",
      description: "From GenAI and Vision Transformers to Spring Microservices.",
      icon: <Layers className="w-6 h-6 text-[#FF8A00]" />,
    },
    {
      value: "99.8%",
      label: "Student Satisfaction",
      description: "Achieving outstanding grades in final college viva reviews.",
      icon: <Award className="w-6 h-6 text-[#00A86B]" />,
    },
  ];

  return (
    <section className="py-14 bg-[#FFF9F5] border-y border-[#FF6B00]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(255,107,0,0.05)] hover:shadow-[0_12px_30px_-6px_rgba(255,107,0,0.12)] hover:border-[#FF6B00]/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#FFF1E8] border border-[#FF6B00]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF6B00] bg-[#FFF1E8] px-2 py-0.5 rounded-md border border-[#FF6B00]/20">
                  Verified Metric
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-[#101828] tracking-tight font-mono">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-[#101828]">
                  {stat.label}
                </div>
                <p className="text-xs text-[#526581] leading-relaxed pt-1">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
