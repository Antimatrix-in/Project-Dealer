"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const cards = [
    {
      title: "Customized Projects",
      badge: "Bespoke Architecture",
      image: "/images/features/customized-projects.jpg",
      imageAlt: "Students discussing software project planning and architecture in modern tech lab",
      desc: "Tailored to your specific university guidelines, college syllabus, and guide preferences with custom feature sets.",
      details: "Custom module integration, personalized algorithms, and flexible architecture tailored to your departmental review.",
      benefits: [
        "Guide-specific module customizations",
        "Personalized algorithms & custom datasets",
        "100% university syllabus compliance"
      ]
    },
    {
      title: "Expert Guidance",
      badge: "Industry Mentors",
      image: "/images/features/expert-guidance.jpg",
      imageAlt: "Software engineering mentor helping student with coding and project review",
      desc: "Direct 1-on-1 mentorship from senior software engineers and domain specialists throughout your project lifecycle.",
      details: "Architecture design reviews, algorithm walkthroughs, and code review sessions before every college submission.",
      benefits: [
        "1-on-1 direct mentor code walkthroughs",
        "System architecture & logic reviews",
        "Pre-submission rehearsal sessions"
      ]
    },
    {
      title: "Complete Documentation",
      badge: "Low Plagiarism Guaranteed",
      image: "/images/features/complete-documentation.jpg",
      imageAlt: "Project documentation workspace with bound thesis book and UML diagrams",
      desc: "Turnkey 60-90 page project reports, authentic standard base paper reviews, synopsis, and UML architectural diagrams.",
      details: "Formatted specifically to your university thesis guidelines (Anna Univ, VTU, JNTU, SRM, VIT) with zero plagiarism anxiety.",
      benefits: [
        "60-90 page thesis report (Word & PDF)",
        "Standard base paper & synopsis included",
        "Complete UML class & sequence diagrams"
      ]
    },
    {
      title: "Source Code Included",
      badge: "Production Standard",
      image: "/images/features/source-code.jpg",
      imageAlt: "Modern developer desk displaying VS Code editor with clean source code",
      desc: "Full unminified source code, clean directory structures, comprehensive comments, and single-click installation scripts.",
      details: "Includes all pre-trained model weights (.h5, .pt, .onnx), database migrations, and clean requirements.txt / pom.xml.",
      benefits: [
        "Clean, well-commented source code",
        "Pre-trained weights & dataset packages",
        "Single-click dependency setup scripts"
      ]
    },
    {
      title: "Viva Preparation",
      badge: "High Distinction",
      image: "/images/features/viva-preparation.jpg",
      imageAlt: "Student presenting project viva defense in front of examiners in conference auditorium",
      desc: "Exhaustive viva voce question banks, external examiner question simulations, and polished PowerPoint slide decks.",
      details: "Mock defense sessions, algorithm explanation cue cards, and line-by-line code explanation to secure high distinction.",
      benefits: [
        "Exhaustive viva voce Q&A handbook",
        "Professional presentation slide deck (PPT)",
        "Examiner defense simulation & cue cards"
      ]
    },
    {
      title: "Technical Support",
      badge: "Live Screen Share",
      image: "/images/features/technical-support.jpg",
      imageAlt: "Support engineer providing remote technical developer assistance via screen share",
      desc: "Remote installation and environment setup assistance via AnyDesk, Google Meet, and instant WhatsApp support.",
      details: "Environment setup, dependency conflict resolution, and on-demand live run verification right on your laptop.",
      benefits: [
        "AnyDesk / Google Meet remote setup",
        "Environment & dependency troubleshooting",
        "Direct WhatsApp instant mentor helpline"
      ]
    },
  ];

  return (
    <section className="py-24 bg-[#EFEBDD] border-y border-[#DCDCCF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4EBDD] border border-[#A9BFA3] text-xs font-semibold text-[#244B35] mb-4 shadow-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#244B35] animate-pulse" />
            <span className="uppercase tracking-wider text-[11px] font-bold">The AntiMatrix Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#202820] tracking-tight">
            Why Choose <span className="text-[#244B35]">AntiMatrix</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#626B60] leading-relaxed">
            We provide a startup-grade technology foundation and viva defense ecosystem that guarantees seamless project completion.
          </p>
        </div>

        {/* 6 Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group relative rounded-[16px] bg-[#FFFDF7] border border-[#DCDCCF] shadow-xs hover:shadow-md hover:border-[#A9BFA3] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden h-full"
            >
              <div className="flex flex-col flex-1">
                {/* Banner Image */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-[#EFEBDD]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={idx < 3}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF7] via-transparent to-transparent pointer-events-none" />

                  {/* Floating Badge */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFFDF7]/95 text-[#244B35] font-mono shadow-xs border border-[#DCDCCF] backdrop-blur-xs">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#202820] mb-2.5 group-hover:text-[#244B35] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#202820] font-medium leading-relaxed mb-2.5">
                    {item.desc}
                  </p>

                  <p className="text-xs text-[#626B60] leading-relaxed mb-5">
                    {item.details}
                  </p>

                  {/* Benefits Checklist */}
                  <div className="mt-auto pt-4 border-t border-[#DCDCCF] space-y-2">
                    {item.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs font-semibold text-[#626B60]">
                        <CheckCircle2 className="w-4 h-4 text-[#244B35] shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
