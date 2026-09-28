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
    <section className="py-24 bg-[#F8FAFC] relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-[#0B1F4D] mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
            <span className="font-mono uppercase tracking-wider text-[11px] font-bold">
              Student Experiences
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Student <span className="text-gradient-gold">Reviews</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#64748B] leading-relaxed">
            See how engineering &amp; computer science students achieved distinction in their final year college project reviews with AntiMatrix.
          </p>
        </div>

        {/* Interactive Modern Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-[0_4px_25px_-4px_rgba(11,31,77,0.06)] overflow-hidden">
            <div className="absolute top-6 right-8 text-slate-100 pointer-events-none">
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
                      <Star key={i} className="w-5 h-5 fill-[#F5A623] text-[#F5A623]" />
                    ))}
                    <span className="ml-2 font-mono text-xs font-bold text-[#D97706]">
                      5.0 / 5.0
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Student Review
                  </span>
                </div>

                {/* Review Quote */}
                <blockquote className="text-base sm:text-xl text-[#0F172A] font-medium leading-relaxed italic">
                  &ldquo;{current.comment}&rdquo;
                </blockquote>

                {/* Project Delivered Box */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Project Delivered:
                    </span>
                    <span className="font-bold text-[#0B1F4D]">
                      {current.projectTitle}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-500">
                    {current.date}
                  </span>
                </div>

                {/* Student Profile Info */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0B1F4D] to-[#142A63] text-white flex items-center justify-center font-bold text-base shadow-sm">
                      {current.studentName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#0F172A]">
                        {current.studentName}
                      </h4>
                      <p className="text-xs text-[#64748B]">
                        {current.degree} • <span className="font-semibold text-[#0B1F4D]">{current.college}</span>
                      </p>
                    </div>
                  </div>

                  {/* Carousel Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevReview}
                      className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                      aria-label="Previous Review"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextReview}
                      className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
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
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-6 bg-[#0B1F4D]" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1F4D] hover:text-[#D97706] transition-colors"
            >
              <span>Explore all verified student reviews &amp; project outcomes &rarr;</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
