"use client";

import React, { useState } from "react";
import {
  Compass,
  MessageSquare,
  Code2,
  FileCheck2,
  PackageCheck,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { openConsultationModal } from "@/components/common/ConsultationModal";

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      step: 1,
      title: "Choose Project",
      shortTitle: "Domain Selection",
      icon: <Compass className="w-5 h-5 text-[#244B35]" />,
      desc: "Browse our 10+ project domains or propose your own innovative concept. We assist you in selecting a high-impact, guide-approvable topic.",
      details: "Receive 3 curated project proposals with standard base papers, synopsis documents, and architectural feasibility checks for your college guide.",
    },
    {
      step: 2,
      title: "Discuss Requirements",
      shortTitle: "Scope & Architecture",
      icon: <MessageSquare className="w-5 h-5 text-[#3F7650]" />,
      desc: "Connect with our domain tech leads to finalize feature specifications, tech stack dependencies, dataset choices, and university review dates.",
      details: "1-on-1 technical consultation call where we lock milestone dates, module deliverables, and custom feature additions based on your guide's input.",
    },
    {
      step: 3,
      title: "Development",
      shortTitle: "Coding & Validation",
      icon: <Code2 className="w-5 h-5 text-[#244B35]" />,
      desc: "Our software engineers implement production-standard, clean source code, train ML/DL models, and integrate intuitive user interfaces.",
      details: "Continuous integration, local testing, model hyperparameter tuning for >95% accuracy, and modular comments for effortless viva explanation.",
    },
    {
      step: 4,
      title: "Documentation",
      shortTitle: "Reports & PPT",
      icon: <FileCheck2 className="w-5 h-5 text-[#3F7650]" />,
      desc: "Our technical writers draft comprehensive 60-90 page project reports, authentic standard base paper reviews, UML diagrams, and viva presentations.",
      details: "Complete thesis formatted to your college syllabus with Turnitin/Urkund low plagiarism guarantee, SRS, system design, and testing chapters.",
    },
    {
      step: 5,
      title: "Project Delivery",
      shortTitle: "Live Demo & Viva Kit",
      icon: <PackageCheck className="w-5 h-5 text-[#244B35]" />,
      desc: "Complete project handover with live AnyDesk remote setup, step-by-step code walkthrough, and 1-on-1 external viva defense coaching.",
      details: "Full source code package, pre-trained weights, viva Q&A handbook, video explanation, and on-demand assistance right until your final college review.",
    },
  ];

  return (
    <section className="py-24 bg-[#F7F4E9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4EBDD] border border-[#A9BFA3] text-xs font-semibold text-[#244B35] mb-4 shadow-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#244B35] animate-pulse" />
            <span className="uppercase tracking-wider text-[11px] font-bold">Transparent Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#202820] tracking-tight">
            Our <span className="text-[#244B35]">Process</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#626B60] leading-relaxed">
            A battle-tested 5-step roadmap ensuring stress-free project delivery on time.
          </p>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#DCDCCF] -translate-y-1/2 z-0" />

            <div className="grid grid-cols-5 gap-4 relative z-10">
              {steps.map((step) => {
                const isSelected = activeStep === step.step;
                return (
                  <div
                    key={step.step}
                    onClick={() => setActiveStep(step.step)}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 text-center flex flex-col items-center justify-between ${
                      isSelected
                        ? "bg-[#FFFDF7] border-[#244B35] shadow-md -translate-y-1.5 ring-1 ring-[#244B35]/20"
                        : "bg-[#FFFDF7] border-[#DCDCCF] hover:border-[#A9BFA3] hover:bg-[#EFEBDD] shadow-xs"
                    }`}
                  >
                    {/* Step Number Circle */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-sm mb-4 transition-all ${
                        isSelected
                          ? "bg-[#244B35] text-white shadow-xs ring-4 ring-[#E4EBDD]"
                          : "bg-[#EFEBDD] border border-[#DCDCCF] text-[#202820]"
                      }`}
                    >
                      {step.step}
                    </div>

                    <div className="space-y-1 mb-2">
                      <h4
                        className={`text-base font-bold transition-colors ${
                          isSelected ? "text-[#244B35]" : "text-[#202820]"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#626B60] line-clamp-3 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#DCDCCF] w-full flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#626B60]">
                      {step.icon}
                      <span>{step.shortTitle}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Step Detailed Showcase Panel */}
          {steps.find((s) => s.step === activeStep) && (
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-10 p-6 rounded-2xl bg-[#FFFDF7] border border-[#DCDCCF] flex items-center justify-between gap-6 shadow-xs"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#E4EBDD] border border-[#A9BFA3] flex items-center justify-center shadow-xs shrink-0">
                  {steps[activeStep - 1].icon}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#244B35]">
                    Step 0{activeStep} Breakdown:
                  </span>
                  <h4 className="text-lg font-bold text-[#202820]">
                    {steps[activeStep - 1].title} — {steps[activeStep - 1].shortTitle}
                  </h4>
                  <p className="text-sm text-[#626B60] mt-1 max-w-2xl leading-relaxed">
                    {steps[activeStep - 1].details}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  openConsultationModal({
                    serviceTitle: `Step ${activeStep}: ${steps[activeStep - 1].title}`,
                  })
                }
                className="px-5 py-3 rounded-xl bg-[#244B35] hover:bg-[#1D3D2B] text-white font-bold text-xs whitespace-nowrap shadow-xs cursor-pointer flex items-center gap-2 border border-[#244B35]"
              >
                <span>Initiate Step {activeStep}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="space-y-4 lg:hidden">
          {steps.map((step) => (
            <div
              key={step.step}
              className="p-5 rounded-2xl bg-[#FFFDF7] border border-[#DCDCCF] shadow-xs flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-full bg-[#244B35] text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                {step.step}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-[#202820]">{step.title}</h4>
                  <span className="text-[10px] text-[#244B35] font-mono font-bold">Phase {step.step}</span>
                </div>
                <p className="text-xs text-[#626B60] leading-relaxed">
                  {step.desc}
                </p>
                <p className="text-xs text-[#626B60]/80 pt-1 font-medium">
                  {step.details}
                </p>
              </div>
            </div>
          ))}

          <div className="pt-4 text-center">
            <button
              onClick={() => openConsultationModal()}
              className="w-full py-3.5 px-6 rounded-xl bg-[#244B35] hover:bg-[#1D3D2B] text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer border border-[#244B35]"
            >
              <Sparkles className="w-4 h-4 text-white" />
              Start Your Project Journey
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
