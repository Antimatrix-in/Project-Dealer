"use client";

import React, { useState } from "react";
import Link from "next/link";
import { STUDENT_REVIEWS } from "@/data/reviews";
import { Star, ShieldCheck, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StudentReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? STUDENT_REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === STUDENT_REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const current = STUDENT_REVIEWS[currentIndex];

  return (
    <section className="py-24 bg-[#F4F6FA] relative border-t border-[#DCE2EA]">
      <div className="w-full max-w-[1780px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101D38] tracking-tight">
            Student <span className="text-[#F58216]">Reviews</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#263750] leading-relaxed">
            See how engineering &amp; computer science students achieved distinction in their final year college project reviews with UPWORKS.
          </p>
        </div>

        {/* Interactive Modern Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-[#FFFFFF] border border-[#DCE2EA] p-8 sm:p-12 shadow-xs overflow-hidden">
            <div className="absolute top-6 right-8 text-[#F58216]/15 pointer-events-none">
              <Quote className="w-24 h-24 stroke-[1]" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 space-y-6"
              >
                {/* Rating Stars & Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#F58216] text-[#F58216]" />
                    ))}
                    <span className="ml-2 font-mono text-xs font-bold text-[#F58216]">
                      5.0 / 5.0
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#F58216] bg-[#FFF5EB] px-2.5 py-1 rounded-lg border border-[#FED7AA]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Student Review
                  </span>
                </div>

                {/* Review Quote */}
                <blockquote className="text-base sm:text-xl text-[#101D38] font-medium leading-relaxed italic">
                  &ldquo;{current.comment}&rdquo;
                </blockquote>

                {/* Project Delivered Box */}
                <div className="p-3.5 rounded-xl bg-[#F4F6FA] border border-[#DCE2EA] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5A6B82]">
                      Project Delivered:
                    </span>
                    <span className="font-bold text-[#101D38]">
                      {current.projectTitle}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-[#5A6B82]">
                    {current.date}
                  </span>
                </div>

                {/* Student Profile Info */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#101D38] text-white flex items-center justify-center font-bold text-base shadow-xs">
                      {current.studentName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#101D38]">
                        {current.studentName}
                      </h4>
                      <p className="text-xs text-[#5A6B82]">
                        {current.degree} • <span className="font-semibold text-[#101D38]">{current.college}</span>
                      </p>
                    </div>
                  </div>

                  {/* Carousel Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevReview}
                      className="p-2.5 rounded-xl border border-[#DCE2EA] hover:border-[#F58216] bg-[#FFFFFF] hover:bg-[#F4F6FA] text-[#101D38] transition-colors cursor-pointer"
                      aria-label="Previous Review"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextReview}
                      className="p-2.5 rounded-xl border border-[#DCE2EA] hover:border-[#F58216] bg-[#FFFFFF] hover:bg-[#F4F6FA] text-[#101D38] transition-colors cursor-pointer"
                      aria-label="Next Review"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {STUDENT_REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? "w-6 bg-[#F58216]" : "w-2 bg-[#DCE2EA] hover:bg-[#FED7AA]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F58216] hover:text-[#E0720F] transition-colors"
            >
              <span>Explore all verified student reviews &amp; project outcomes &rarr;</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
