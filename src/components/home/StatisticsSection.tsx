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
      icon: <FolderCheck className="w-6 h-6 text-[#244B35]" />,
    },
    {
      value: "1200+",
      label: "Happy Students",
      description: "From top engineering universities across India & abroad.",
      icon: <Users className="w-6 h-6 text-[#244B35]" />,
    },
    {
      value: "25+",
      label: "Project Domains",
      description: "From GenAI and Vision Transformers to Spring Microservices.",
      icon: <Layers className="w-6 h-6 text-[#244B35]" />,
    },
    {
      value: "99.8%",
      label: "Student Satisfaction",
      description: "Achieving outstanding grades in final college viva reviews.",
      icon: <Award className="w-6 h-6 text-[#244B35]" />,
    },
  ];

  return (
    <section className="py-14 bg-[#EFEBDD] border-y border-[#DCDCCF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative p-6 rounded-2xl bg-[#FFFDF7] border border-[#DCDCCF] shadow-xs hover:shadow-md hover:border-[#A9BFA3] transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#E4EBDD] border border-[#A9BFA3] flex items-center justify-center group-hover:scale-105 transition-transform">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#244B35] bg-[#E4EBDD] px-2 py-0.5 rounded-md border border-[#A9BFA3]">
                  Verified Metric
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-[#244B35] tracking-tight font-mono">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-[#202820]">
                  {stat.label}
                </div>
                <p className="text-xs text-[#626B60] leading-relaxed pt-1">
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
