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
      icon: <Compass className="w-5 h-5 text-[#F5A623]" />,
      desc: "Browse our 10+ academic domains or propose your own innovative concept. We assist you in selecting a high-impact, guide-approvable topic.",
      details: "Receive 3 curated project proposals with standard base papers, synopsis documents, and architectural feasibility checks for your college guide.",
    },
    {
      step: 2,
      title: "Discuss Requirements",
      shortTitle: "Scope & Architecture",
      icon: <MessageSquare className="w-5 h-5 text-[#0B1F4D]" />,
      desc: "Connect with our domain tech leads to finalize feature specifications, tech stack dependencies, dataset choices, and university review dates.",
      details: "1-on-1 technical consultation call where we lock milestone dates, module deliverables, and custom feature additions based on your guide's input.",
    },
    {
      step: 3,
      title: "Development",
      shortTitle: "Coding & Validation",
      icon: <Code2 className="w-5 h-5 text-[#F5A623]" />,
      desc: "Our software engineers implement production-standard, clean source code, train ML/DL models, and integrate intuitive user interfaces.",
      details: "Continuous integration, local testing, model hyperparameter tuning for >95% accuracy, and modular comments for effortless viva explanation.",
    },
    {
      step: 4,
      title: "Documentation",
      shortTitle: "Reports & PPT",
      icon: <FileCheck2 className="w-5 h-5 text-[#0B1F4D]" />,
      desc: "Our technical writers draft comprehensive 60-90 page project reports, IEEE standard base paper reviews, UML diagrams, and viva presentations.",
      details: "Complete thesis formatted to your college syllabus with Turnitin/Urkund low plagiarism guarantee, SRS, system design, and testing chapters.",
    },
    {
      step: 5,
      title: "Project Delivery",
      shortTitle: "Live Demo & Viva Kit",
      icon: <PackageCheck className="w-5 h-5 text-emerald-600" />,
      desc: "Complete project handover with live AnyDesk remote setup, step-by-step code walkthrough, and 1-on-1 external viva defense coaching.",
      details: "Full source code package, pre-trained weights, viva Q&A handbook, video explanation, and on-demand assistance right until your final college review.",
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-[#0B1F4D] mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
            <span className="font-mono uppercase tracking-wider text-[11px] font-bold">Transparent Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Our <span className="text-gradient-gold">Process</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] leading-relaxed">
            A battle-tested 5-step roadmap ensuring stress-free academic project delivery on time.
          </p>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-200 via-[#F5A623]/50 to-slate-200 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-5 gap-4 relative z-10">
              {steps.map((step) => {
                const isSelected = activeStep === step.step;
                return (
                  <div
                    key={step.step}
                    onClick={() => setActiveStep(step.step)}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 text-center flex flex-col items-center justify-between ${
                      isSelected
                        ? "bg-[#F8FAFC] border-[#F5A623] shadow-lg -translate-y-2"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 shadow-sm"
                    }`}
                  >
                    {/* Step Number Circle */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-sm mb-4 transition-all ${
                        isSelected
                          ? "btn-primary-gold text-white shadow-md ring-4 ring-amber-100"
                          : "bg-slate-100 border border-slate-200 text-slate-700"
                      }`}
                    >
                      {step.step}
                    </div>

                    <div className="space-y-1 mb-2">
                      <h4
                        className={`text-base font-bold transition-colors ${
                          isSelected ? "text-[#0B1F4D]" : "text-[#0F172A]"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#64748B] line-clamp-3 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-500">
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
              className="mt-10 p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 flex items-center justify-between gap-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs shrink-0">
                  {steps[activeStep - 1].icon}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F5A623]">
                    Step 0{activeStep} Breakdown:
                  </span>
                  <h4 className="text-lg font-bold text-[#0F172A]">
                    {steps[activeStep - 1].title} — {steps[activeStep - 1].shortTitle}
                  </h4>
                  <p className="text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
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
                className="px-5 py-3 rounded-xl btn-primary-gold text-white font-bold text-xs whitespace-nowrap shadow-sm cursor-pointer flex items-center gap-2"
              >
                <span>Initiate Step {activeStep}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="space-y-4 lg:hidden">
          {steps.map((step) => (
            <div
              key={step.step}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-full btn-primary-gold text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                {step.step}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-[#0F172A]">{step.title}</h4>
                  <span className="text-[10px] text-[#F5A623] font-mono font-bold">Phase {step.step}</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
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
              className="w-full py-3.5 px-6 rounded-xl btn-primary-gold text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Start Your Project Journey
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
