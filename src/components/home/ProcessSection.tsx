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
      icon: <Compass className="w-5 h-5 text-[#FF6B00]" />,
      desc: "Browse our 10+ project domains or propose your own innovative concept. We assist you in selecting a high-impact, guide-approvable topic.",
      details: "Receive 3 curated project proposals with standard base papers, synopsis documents, and architectural feasibility checks for your college guide.",
    },
    {
      step: 2,
      title: "Discuss Requirements",
      shortTitle: "Scope & Architecture",
      icon: <MessageSquare className="w-5 h-5 text-[#FF8A00]" />,
      desc: "Connect with our domain tech leads to finalize feature specifications, tech stack dependencies, dataset choices, and university review dates.",
      details: "1-on-1 technical consultation call where we lock milestone dates, module deliverables, and custom feature additions based on your guide's input.",
    },
    {
      step: 3,
      title: "Development",
      shortTitle: "Coding & Validation",
      icon: <Code2 className="w-5 h-5 text-[#FF3D3D]" />,
      desc: "Our software engineers implement production-standard, clean source code, train ML/DL models, and integrate intuitive user interfaces.",
      details: "Continuous integration, local testing, model hyperparameter tuning for >95% accuracy, and modular comments for effortless viva explanation.",
    },
    {
      step: 4,
      title: "Documentation",
      shortTitle: "Reports & PPT",
      icon: <FileCheck2 className="w-5 h-5 text-[#D90429]" />,
      desc: "Our technical writers draft comprehensive 60-90 page project reports, authentic standard base paper reviews, UML diagrams, and viva presentations.",
      details: "Complete thesis formatted to your college syllabus with Turnitin/Urkund low plagiarism guarantee, SRS, system design, and testing chapters.",
    },
    {
      step: 5,
      title: "Project Delivery",
      shortTitle: "Live Demo & Viva Kit",
      icon: <PackageCheck className="w-5 h-5 text-[#00A86B]" />,
      desc: "Complete project handover with live AnyDesk remote setup, step-by-step code walkthrough, and 1-on-1 external viva defense coaching.",
      details: "Full source code package, pre-trained weights, viva Q&A handbook, video explanation, and on-demand assistance right until your final college review.",
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1E8] border border-[#FF6B00]/25 text-xs font-semibold text-[#FF6B00] mb-4 shadow-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
            <span className="uppercase tracking-wider text-[11px] font-bold">Transparent Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101828] tracking-tight">
            Our <span className="text-gradient-orange-red">Process</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#526581] leading-relaxed">
            A battle-tested 5-step roadmap ensuring stress-free project delivery on time.
          </p>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-200 via-[#FF6B00]/50 to-slate-200 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-5 gap-4 relative z-10">
              {steps.map((step) => {
                const isSelected = activeStep === step.step;
                return (
                  <div
                    key={step.step}
                    onClick={() => setActiveStep(step.step)}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 text-center flex flex-col items-center justify-between ${
                      isSelected
                        ? "bg-[#FFF9F5] border-[#FF6B00] shadow-md -translate-y-2 ring-1 ring-[#FF6B00]/20"
                        : "bg-white border-slate-200 hover:border-[#FF6B00]/40 hover:bg-[#FFF9F5]/50 shadow-xs"
                    }`}
                  >
                    {/* Step Number Circle */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-sm mb-4 transition-all ${
                        isSelected
                          ? "bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] text-white shadow-md ring-4 ring-[#FFF1E8]"
                          : "bg-slate-100 border border-slate-200 text-slate-700"
                      }`}
                    >
                      {step.step}
                    </div>

                    <div className="space-y-1 mb-2">
                      <h4
                        className={`text-base font-bold transition-colors ${
                          isSelected ? "text-[#FF6B00]" : "text-[#101828]"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#526581] line-clamp-3 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#526581]">
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
              className="mt-10 p-6 rounded-2xl bg-[#FFF9F5] border border-[#FF6B00]/25 flex items-center justify-between gap-6 shadow-xs"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#FF6B00]/20 flex items-center justify-center shadow-xs shrink-0">
                  {steps[activeStep - 1].icon}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B00]">
                    Step 0{activeStep} Breakdown:
                  </span>
                  <h4 className="text-lg font-bold text-[#101828]">
                    {steps[activeStep - 1].title} — {steps[activeStep - 1].shortTitle}
                  </h4>
                  <p className="text-sm text-[#526581] mt-1 max-w-2xl leading-relaxed">
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
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] hover:opacity-95 text-white font-bold text-xs whitespace-nowrap shadow-sm cursor-pointer flex items-center gap-2"
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
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                {step.step}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-[#101828]">{step.title}</h4>
                  <span className="text-[10px] text-[#FF6B00] font-mono font-bold">Phase {step.step}</span>
                </div>
                <p className="text-xs text-[#526581] leading-relaxed">
                  {step.desc}
                </p>
                <p className="text-xs text-slate-500 pt-1 font-medium">
                  {step.details}
                </p>
              </div>
            </div>
          ))}

          <div className="pt-4 text-center">
            <button
              onClick={() => openConsultationModal()}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
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
