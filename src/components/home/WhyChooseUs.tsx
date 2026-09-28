"use client";

import React from "react";
import {
  SlidersHorizontal,
  GraduationCap,
  FileText,
  Code2,
  Award,
  Headphones,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const cards = [
    {
      title: "Customized Projects",
      badge: "Bespoke Architecture",
      icon: <SlidersHorizontal className="w-6 h-6 text-[#F5A623]" />,
      desc: "Tailored to your specific university guidelines, college syllabus, and guide preferences with custom feature sets.",
      details: "Custom module integration, personalized algorithms, and flexible architecture tailored to your departmental review.",
    },
    {
      title: "Expert Guidance",
      badge: "Industry Mentors",
      icon: <GraduationCap className="w-6 h-6 text-[#0B1F4D]" />,
      desc: "Direct 1-on-1 mentorship from senior software engineers and domain specialists throughout your project lifecycle.",
      details: "Architecture design reviews, algorithm walkthroughs, and code review sessions before every college submission.",
    },
    {
      title: "Complete Documentation",
      badge: "Low Plagiarism Guaranteed",
      icon: <FileText className="w-6 h-6 text-[#F5A623]" />,
      desc: "Turnkey 60-90 page project reports, IEEE standard base paper reviews, synopsis, and UML architectural diagrams.",
      details: "Formatted specifically to your university thesis guidelines (Anna Univ, VTU, JNTU, SRM, VIT) with zero plagiarism anxiety.",
    },
    {
      title: "Source Code Included",
      badge: "Production Standard",
      icon: <Code2 className="w-6 h-6 text-[#0B1F4D]" />,
      desc: "Full unminified source code, clean directory structures, comprehensive comments, and single-click installation scripts.",
      details: "Includes all pre-trained model weights (.h5, .pt, .onnx), database migrations, and clean requirements.txt / pom.xml.",
    },
    {
      title: "Viva Preparation",
      badge: "High Distinction",
      icon: <Award className="w-6 h-6 text-[#F5A623]" />,
      desc: "Exhaustive viva voce question banks, external examiner question simulations, and polished PowerPoint slide decks.",
      details: "Mock defense sessions, algorithm explanation cue cards, and line-by-line code explanation to secure high distinction.",
    },
    {
      title: "Technical Support",
      badge: "Live Screen Share",
      icon: <Headphones className="w-6 h-6 text-[#0B1F4D]" />,
      desc: "Remote installation and environment setup assistance via AnyDesk, Google Meet, and instant WhatsApp support.",
      details: "Environment setup, dependency conflict resolution, and on-demand live run verification right on your laptop.",
    },
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-[#0B1F4D] mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
            <span className="font-mono uppercase tracking-wider text-[11px] font-bold">The AntiMatrix Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Why Choose <span className="text-gradient-gold">AntiMatrix</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] leading-relaxed">
            We provide a startup-grade technology foundation and academic defense ecosystem that guarantees seamless project completion.
          </p>
        </div>

        {/* 6 Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-2xl bg-white border border-slate-200/90 p-7 shadow-[0_4px_20px_-4px_rgba(11,31,77,0.05)] hover:shadow-[0_16px_35px_-6px_rgba(11,31,77,0.1)] hover:border-[#F5A623]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[#0B1F4D] font-mono">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0F172A] mb-2.5 group-hover:text-[#0B1F4D] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-[#0F172A] font-medium leading-relaxed mb-3">
                  {item.desc}
                </p>

                <p className="text-xs text-[#64748B] leading-relaxed">
                  {item.details}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% University Guide Compliant</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
