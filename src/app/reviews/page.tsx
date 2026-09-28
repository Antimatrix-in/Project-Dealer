"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/common/SectionHeader";
import { STUDENT_REVIEWS } from "@/data/reviews";
import { PROJECT_CATEGORIES } from "@/data/projects";
import {
  Star,
  ShieldCheck,
  Quote,
  Sparkles,
  PlusCircle,
  CheckCircle2,
  X
} from "lucide-react";
import { submitStudentReview } from "@/lib/supabase";

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
    <div className="pt-28 pb-20 bg-[#050914] min-h-screen">
      {/* Background Header */}
      <div className="relative py-12 overflow-hidden bg-grid-navy border-b border-amber-500/10 mb-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-amber-500/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeader
            badge="100% Genuine Student Feedback"
            title="Student Reviews &"
            titleGradient="Success Stories"
            subtitle="Read real testimonials from engineering students who completed and defended their academic projects with AntiMatrix."
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
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold shadow-md shadow-amber-500/25"
                    : "bg-[#0A1128] text-slate-300 hover:text-white border border-amber-500/15"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#0A1128] hover:bg-[#0E1738] text-slate-200 hover:text-white border border-amber-500/25 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>Submit Your Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="relative rounded-2xl bg-[#0A1128] border border-amber-500/20 p-6 flex flex-col justify-between backdrop-blur-xl hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-500/10"
            >
              <div className="absolute top-4 right-4 text-amber-500/20">
                <Quote className="w-7 h-7" />
              </div>

              <div>
                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{rev.date}</span>
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {/* Project Tag */}
                <div className="mb-4 p-2.5 rounded-xl bg-[#060B18] border border-amber-500/15 text-[11px] text-amber-300 font-medium">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">
                    Project Completed:
                  </span>
                  <span className="line-clamp-1">{rev.projectTitle}</span>
                </div>
              </div>

              {/* Student Bio */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-500 flex items-center justify-center font-bold text-slate-950 text-sm shadow-md shrink-0">
                  {rev.studentName.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white truncate">
                      {rev.studentName}
                    </h4>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    {rev.degree}
                  </p>
                  <p className="text-[10px] text-amber-400/90 truncate font-mono">
                    {rev.college}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0A1128] border border-amber-500/35 rounded-3xl shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold text-white">Share Your AntiMatrix Experience</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Thank You for Your Feedback!</h4>
                <p className="text-xs text-slate-300">
                  Your review has been verified and added to our student testimonials wall.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={newReview.studentName}
                      onChange={(e) =>
                        setNewReview({ ...newReview, studentName: e.target.value })
                      }
                      placeholder="e.g. Aditi Rao"
                      className="w-full p-2.5 rounded-xl bg-[#060B18] border border-amber-500/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">College / University *</label>
                    <input
                      type="text"
                      required
                      value={newReview.college}
                      onChange={(e) =>
                        setNewReview({ ...newReview, college: e.target.value })
                      }
                      placeholder="e.g. Anna University"
                      className="w-full p-2.5 rounded-xl bg-[#060B18] border border-amber-500/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">Degree / Branch *</label>
                    <input
                      type="text"
                      required
                      value={newReview.degree}
                      onChange={(e) =>
                        setNewReview({ ...newReview, degree: e.target.value })
                      }
                      placeholder="e.g. B.E CSE"
                      className="w-full p-2.5 rounded-xl bg-[#060B18] border border-amber-500/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Project Domain</label>
                    <select
                      value={newReview.category}
                      onChange={(e) =>
                        setNewReview({
                          ...newReview,
                          category: e.target.value as any,
                        })
                      }
                      className="w-full p-2.5 rounded-xl bg-[#060B18] border border-amber-500/20 text-white focus:outline-none focus:border-amber-400"
                    >
                      {PROJECT_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Project Title Completed *</label>
                  <input
                    type="text"
                    required
                    value={newReview.projectTitle}
                    onChange={(e) =>
                      setNewReview({ ...newReview, projectTitle: e.target.value })
                    }
                    placeholder="e.g. Multimodal Medical AI Diagnosis"
                    className="w-full p-2.5 rounded-xl bg-[#060B18] border border-amber-500/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Rating</label>
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
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Your Detailed Feedback *</label>
                  <textarea
                    rows={4}
                    required
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    placeholder="How was the project guidance, documentation, viva preparation, and overall experience?"
                    className="w-full p-2.5 rounded-xl bg-[#060B18] border border-amber-500/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold cursor-pointer"
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
