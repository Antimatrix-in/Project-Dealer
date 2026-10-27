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
    <section className="py-24 bg-[#080808] relative border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161616] border border-[#2A2A2A] text-xs font-semibold text-[#FF7900] mb-4 shadow-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#FF7900] animate-pulse" />
            <span className="uppercase tracking-wider text-[11px] font-bold">
              Student Experiences
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Student <span className="text-gradient-orange">Reviews</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#B8B8B8] leading-relaxed">
            See how engineering &amp; computer science students achieved distinction in their final year college project reviews with AntiMatrix.
          </p>
        </div>

        {/* Interactive Modern Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-[#161616] border border-[#2A2A2A] p-8 sm:p-12 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute top-6 right-8 text-[#FF7900]/10 pointer-events-none">
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
                      <Star key={i} className="w-5 h-5 fill-[#FF7900] text-[#FF7900]" />
                    ))}
                    <span className="ml-2 font-mono text-xs font-bold text-[#FF7900]">
                      5.0 / 5.0
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF7900] bg-[#1D1D1D] px-2.5 py-1 rounded-full border border-[#2A2A2A]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Student Review
                  </span>
                </div>

                {/* Review Quote */}
                <blockquote className="text-base sm:text-xl text-white font-medium leading-relaxed italic">
                  &ldquo;{current.comment}&rdquo;
                </blockquote>

                {/* Project Delivered Box */}
                <div className="p-3.5 rounded-xl bg-[#1D1D1D] border border-[#2A2A2A] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B8B8B8]">
                      Project Delivered:
                    </span>
                    <span className="font-bold text-[#FF7900]">
                      {current.projectTitle}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-[#B8B8B8]">
                    {current.date}
                  </span>
                </div>

                {/* Student Profile Info */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF7900] to-[#FF4500] text-white flex items-center justify-center font-bold text-base shadow-sm">
                      {current.studentName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">
                        {current.studentName}
                      </h4>
                      <p className="text-xs text-[#B8B8B8]">
                        {current.degree} • <span className="font-semibold text-white">{current.college}</span>
                      </p>
                    </div>
                  </div>

                  {/* Carousel Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevReview}
                      className="p-2.5 rounded-xl border border-[#2A2A2A] hover:border-[#FF7900] bg-[#1D1D1D] text-white transition-colors cursor-pointer"
                      aria-label="Previous Review"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextReview}
                      className="p-2.5 rounded-xl border border-[#2A2A2A] hover:border-[#FF7900] bg-[#1D1D1D] text-white transition-colors cursor-pointer"
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
                  currentIndex === idx ? "w-6 bg-gradient-to-r from-[#FF7900] to-[#FF4500]" : "w-2 bg-[#2A2A2A] hover:bg-[#3A3A3A]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF7900] hover:text-[#FF9500] transition-colors"
            >
              <span>Explore all verified student reviews &amp; project outcomes &rarr;</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
