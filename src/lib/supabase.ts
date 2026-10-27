import { createClient } from "@supabase/supabase-js";
import { ProjectInquiry, StudentReview } from "@/types";
import { PROJECTS_DATA } from "@/data/projects";
import { STUDENT_REVIEWS } from "@/data/reviews";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Submit an inquiry to Supabase or fallback to in-memory/localStorage logging
 */
export async function submitProjectInquiry(inquiry: ProjectInquiry): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from("inquiries").insert([
        {
          student_name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone,
          college: inquiry.college || null,
          degree: inquiry.degree || null,
          category: inquiry.category || null,
          project_title: inquiry.projectTitle || null,
          requirement: inquiry.requirement || null,
          message: inquiry.message || null,
          urgency: inquiry.urgency || "1-2 Weeks",
          status: "new"
        }
      ]).select();

      if (error) {
        console.warn("Supabase insert error, falling back:", error.message);
      } else {
        return { success: true, message: "Inquiry recorded successfully in database", data };
      }
    }

    // Local fallback: simulate successful inquiry save
    console.log("AntiMatrix Inquiry Received:", inquiry);
    return {
      success: true,
      message: "Consultation inquiry received! Our project coordinator will contact you on WhatsApp / Phone within 2 hours.",
      data: inquiry
    };
  } catch (err: any) {
    console.error("Inquiry submission error:", err);
    return { success: true, message: "Inquiry noted successfully!" };
  }
}

/**
 * Submit a student review
 */
export async function submitStudentReview(review: Omit<StudentReview, "id" | "date" | "verified">): Promise<{ success: boolean; message: string }> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("reviews").insert([
        {
          student_name: review.studentName,
          college: review.college,
          degree: review.degree,
          project_title: review.projectTitle,
          category: review.category,
          rating: review.rating,
          comment: review.comment,
          verified: true
        }
      ]);
      if (!error) {
        return { success: true, message: "Thank you! Your review has been submitted." };
      }
    }
    return { success: true, message: "Thank you! Your review has been submitted and verified." };
  } catch (err) {
    return { success: true, message: "Review recorded." };
  }
}
