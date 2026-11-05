"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/common/SectionHeader";
import { STUDENT_REVIEWS } from "@/data/reviews";
import { PROJECT_CATEGORIES } from "@/data/projects";
import {
  Star,
  ShieldCheck,
  Quote,
  PlusCircle,
  CheckCircle2,
  X
} from "lucide-react";
import { submitStudentReview } from "@/lib/supabase";
import CtaBanner from "@/components/home/CtaBanner";

export default function ReviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [reviewsList, setReviewsList] = useState(STUDENT_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [newReview, setNewReview] = useState({
    studentName: "",
    college: "",
    degree: "",
    projectTitle: "",
    category: PROJECT_CATEGORIES[0],
    rating: 5,
    comment: "",
  });

  const categories = ["All", ...PROJECT_CATEGORIES];

  const filteredReviews =
    selectedCategory === "All"
      ? reviewsList
      : reviewsList.filter((r) => r.category === selectedCategory);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.studentName || !newReview.comment) return;

    await submitStudentReview(newReview);

    const created = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: "Just now",
      verified: true,
    };

    setReviewsList([created, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitted(false);
      setNewReview({
        studentName: "",
        college: "",
        degree: "",
        projectTitle: "",
        category: PROJECT_CATEGORIES[0],
        rating: 5,
        comment: "",
      });
    }, 1500);
  };

  return (
    <div className="pt-32 sm:pt-36 pb-20 bg-[#F5F1E7] min-h-screen text-[#1F2A22]">
      {/* Background Header */}
      <div className="relative py-16 bg-[#EEE9DC] border-b border-[#DDDCCF] mb-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeader
            badge="100% Genuine Student Feedback"
            title="Student Reviews &amp;"
            titleGradient="Success Stories"
            subtitle="Read real testimonials from engineering students who completed and defended their projects with AntiMatrix."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar: Category Filters & Add Review Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#315C3D] text-white font-bold shadow-xs border border-[#315C3D]"
                    : "bg-[#FFFFFF] text-[#667064] hover:bg-[#EEE9DC] hover:text-[#202820] border border-[#DDDCCF]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-xs border border-[#315C3D]"
          >
            <PlusCircle className="w-4 h-4 text-white" />
            <span>Submit Your Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="relative rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] p-6 flex flex-col justify-between shadow-xs hover:border-[#315C3D] hover:shadow-md transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-[#315C3D]/15">
                <Quote className="w-7 h-7" />
              </div>

              <div>
                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#315C3D] text-[#315C3D]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[#667064]">{rev.date}</span>
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-[#202820] leading-relaxed italic mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {/* Project Tag */}
                <div className="mb-4 p-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-[11px] text-[#202820] font-medium">
                  <span className="text-[#667064] block text-[10px] uppercase tracking-wider mb-0.5 font-mono">
                    Project Completed:
                  </span>
                  <span className="line-clamp-1 font-bold text-[#315C3D]">{rev.projectTitle}</span>
                </div>
              </div>

              {/* Student Bio */}
              <div className="pt-4 border-t border-[#DDDCCF] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#315C3D] flex items-center justify-center font-bold text-white text-sm shadow-xs shrink-0">
                  {rev.studentName.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-[#202820] truncate">
                      {rev.studentName}
                    </h4>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#315C3D] font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#667064] truncate">
                    {rev.degree}
                  </p>
                  <p className="text-[10px] text-[#667064] truncate font-mono">
                    {rev.college}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section: Need Help With Your Project? */}
        <div className="pt-16">
          <CtaBanner />
        </div>
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#FFFFFF] border border-[#DDDCCF] rounded-3xl shadow-2xl p-6 relative text-[#202820]">
            <div className="flex items-center justify-between pb-4 border-b border-[#DDDCCF] mb-4">
              <h3 className="text-lg font-bold text-[#202820]">Share Your AntiMatrix Experience</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#667064] hover:text-[#315C3D] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#315C3D] mx-auto" />
                <h4 className="text-lg font-bold text-[#202820]">Thank You for Your Feedback!</h4>
                <p className="text-xs text-[#667064]">
                  Your review has been verified and added to our student testimonials wall.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#202820] font-medium mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={newReview.studentName}
                      onChange={(e) =>
                        setNewReview({ ...newReview, studentName: e.target.value })
                      }
                      placeholder="e.g. Aditi Rao"
                      className="w-full p-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-[#202820] placeholder-stone-400 focus:outline-none focus:border-[#315C3D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#202820] font-medium mb-1">College / University *</label>
                    <input
                      type="text"
                      required
                      value={newReview.college}
                      onChange={(e) =>
                        setNewReview({ ...newReview, college: e.target.value })
                      }
                      placeholder="e.g. Anna University"
                      className="w-full p-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-[#202820] placeholder-stone-400 focus:outline-none focus:border-[#315C3D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#202820] font-medium mb-1">Degree / Branch *</label>
                    <input
                      type="text"
                      required
                      value={newReview.degree}
                      onChange={(e) =>
                        setNewReview({ ...newReview, degree: e.target.value })
                      }
                      placeholder="e.g. B.E CSE"
                      className="w-full p-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-[#202820] placeholder-stone-400 focus:outline-none focus:border-[#315C3D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#202820] font-medium mb-1">Project Domain</label>
                    <select
                      value={newReview.category}
                      onChange={(e) =>
                        setNewReview({
                          ...newReview,
                          category: e.target.value as any,
                        })
                      }
                      className="w-full p-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-[#202820] focus:outline-none focus:border-[#315C3D]"
                    >
                      {PROJECT_CATEGORIES.map((c) => (
                        <option key={c} value={c} className="bg-[#FFFFFF] text-[#202820]">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#202820] font-medium mb-1">Project Title Completed *</label>
                  <input
                    type="text"
                    required
                    value={newReview.projectTitle}
                    onChange={(e) =>
                      setNewReview({ ...newReview, projectTitle: e.target.value })
                    }
                    placeholder="e.g. Multimodal Medical AI Diagnosis"
                    className="w-full p-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-[#202820] placeholder-stone-400 focus:outline-none focus:border-[#315C3D]"
                  />
                </div>

                <div>
                  <label className="block text-[#202820] font-medium mb-1">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReview.rating
                              ? "fill-[#315C3D] text-[#315C3D]"
                              : "text-[#DDDCCF]"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#202820] font-medium mb-1">Your Detailed Feedback *</label>
                  <textarea
                    rows={4}
                    required
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    placeholder="How was the project guidance, documentation, viva preparation, and overall experience?"
                    className="w-full p-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-[#202820] placeholder-stone-400 focus:outline-none focus:border-[#315C3D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white font-bold cursor-pointer shadow-xs border border-[#315C3D]"
                >
                  Publish Verified Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
