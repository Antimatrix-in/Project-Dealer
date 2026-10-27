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
      icon: <FolderCheck className="w-6 h-6 text-[#FF7900]" />,
    },
    {
      value: "1200+",
      label: "Happy Students",
      description: "From top engineering universities across India & abroad.",
      icon: <Users className="w-6 h-6 text-[#FF7900]" />,
    },
    {
      value: "25+",
      label: "Project Domains",
      description: "From GenAI and Vision Transformers to Spring Microservices.",
      icon: <Layers className="w-6 h-6 text-[#FF7900]" />,
    },
    {
      value: "99.8%",
      label: "Student Satisfaction",
      description: "Achieving outstanding grades in final college viva reviews.",
      icon: <Award className="w-6 h-6 text-[#FF7900]" />,
    },
  ];

  return (
    <section className="py-14 bg-[#101010] border-y border-[#2A2A2A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-6 rounded-2xl bg-[#161616] border border-[#2A2A2A] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.6)] hover:shadow-[0_12px_30px_-6px_rgba(255,121,0,0.15)] hover:border-[#FF7900] transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#1D1D1D] border border-[#2A2A2A] flex items-center justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF7900] bg-[#1D1D1D] px-2 py-0.5 rounded-md border border-[#2A2A2A]">
                  Verified Metric
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-[#FF7900] tracking-tight font-mono">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-[#FFFFFF]">
                  {stat.label}
                </div>
                <p className="text-xs text-[#B8B8B8] leading-relaxed pt-1">
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
