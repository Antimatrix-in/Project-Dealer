"use client";

import React from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import CtaBanner from "@/components/home/CtaBanner";

interface ServiceCard {
  number: string;
  title: string;
  description: string;
}

const SERVICES: ServiceCard[] = [
  {
    number: "01",
    title: "Project Development",
    description: "Complete academic projects with working source code and implementation support.",
  },
  {
    number: "02",
    title: "Project Customization",
    description: "Customize existing projects with new features, algorithms and functionality.",
  },
  {
    number: "03",
    title: "Documentation Support",
    description: "Get project reports, synopsis, SRS documents and UML diagrams.",
  },
  {
    number: "04",
    title: "AI & Machine Learning",
    description: "Develop practical AI, ML, Deep Learning and Data Science projects.",
  },
  {
    number: "05",
    title: "Web & Application Development",
    description: "Build responsive web applications and mobile applications.",
  },
  {
    number: "06",
    title: "Technical Mentorship",
    description: "Get installation guidance, code walkthroughs, debugging and project support.",
  },
];

const TECHNOLOGIES: string[] = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "OpenCV",
  "React / Next.js",
  "Node.js",
  "Java / Spring Boot",
  "Flutter",
  "FastAPI",
  "MongoDB",
  "PostgreSQL",
  "Docker",
];

const FAQS = [
  {
    q: "Can I get assistance if my college guide demands specific module changes?",
    a: "Yes. Our Project Customization service is designed to adapt code, algorithms, datasets, and reports to meet specific college advisor guidelines.",
  },
  {
    q: "Will the project documentation pass our college plagiarism checks?",
    a: "Yes. All project reports and documentation are crafted from scratch, adhering to university formatting and standard plagiarism thresholds.",
  },
  {
    q: "Do you provide remote setup assistance on student laptops?",
    a: "Yes. Our technical team assists with environment installation, dependencies, and database setup via remote desktop sessions.",
  },
  {
    q: "How does the Technical Mentorship and viva guidance work?",
    a: "We provide code walkthroughs, viva preparation questions, and architectural explanations to ensure you can confidently present your work.",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-16 bg-[#F4F6FA] min-h-screen text-[#263750]">
      {/* Page Heading */}
      <div className="py-12 sm:py-14 bg-white border-b border-[#DCE2EA] mb-10 sm:mb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F4F6FA] border border-[#DCE2EA] text-[#F58216] mb-3 font-mono">
            <span>UPWORKS SERVICES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101D38] tracking-tight">
            Our Services
          </h1>
          <div className="w-12 h-1 bg-[#F58216] mx-auto mt-3 mb-3.5 rounded-full" />
          <p className="text-sm sm:text-base text-[#5A6B82] max-w-2xl mx-auto leading-relaxed">
            Practical project development, customization and technical support for students.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Grid (6 Clean Minimal Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="bg-white rounded-2xl border border-[#DCE2EA] p-6 sm:p-7 flex flex-col justify-between hover:border-[#F58216] transition-colors"
            >
              <div>
                {/* Number & Accent Line */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#F58216] tracking-wider">
                    {service.number}
                  </span>
                  <div className="w-6 h-0.5 bg-[#F58216]/40 rounded-full" />
                </div>

                {/* Heading */}
                <h2 className="text-lg font-bold text-[#101D38] mb-2 tracking-tight">
                  {service.title}
                </h2>

                {/* Description (concise: 12-20 words) */}
                <p className="text-sm text-[#5A6B82] leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Action Button: Directly opens UPWORKS WhatsApp with service name */}
              <div className="pt-5 mt-6 border-t border-[#DCE2EA]">
                <a
                  href={getWhatsAppUrl({
                    category: service.title,
                    requirements: `Inquiry regarding ${service.title} service`,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F58216] hover:bg-[#E0720F] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-none"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Technologies Section (Clean minimal name grid) */}
        <div className="mt-16 pt-12 border-t border-[#DCE2EA]">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-lg font-bold text-[#101D38]">Supported Technologies</h3>
            <p className="text-xs text-[#5A6B82] mt-1">
              Active engineering across industry-standard stacks and frameworks.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
            {TECHNOLOGIES.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-white border border-[#DCE2EA] text-xs font-medium text-[#263750]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Minimal FAQ Section */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-white border border-[#DCE2EA]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-[#101D38]">Frequently Asked Questions</h3>
            <p className="text-xs text-[#5A6B82] mt-1.5">
              Answers to common queries regarding deliverables and technical support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-[#F4F6FA] border border-[#DCE2EA]"
              >
                <h4 className="text-xs sm:text-sm font-bold text-[#101D38] mb-1.5 flex items-start gap-2">
                  <span className="text-[#F58216] font-mono font-bold">Q.</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-[#5A6B82] leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="pt-12">
          <CtaBanner />
        </div>
      </div>
    </div>
  );
}
