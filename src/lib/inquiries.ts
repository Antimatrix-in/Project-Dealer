import fs from "fs";
import path from "path";
import { isSupabaseConfigured, supabase } from "./supabase";

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  college?: string;
  degree?: string;
  category?: string;
  projectTitle?: string;
  requirement?: string;
  urgency?: string;
  message?: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt: string;
}

const INQUIRIES_FILE = path.join(process.cwd(), "src", "data", "inquiries-store.json");

const SEED_INQUIRIES: ConsultationRequest[] = [
  {
    id: "inq-2026-001",
    name: "Aravind Swaminathan",
    email: "aravind.swami@gmail.com",
    phone: "+91 98401 23456",
    college: "PSG College of Technology, Coimbatore",
    degree: "B.E. Computer Science & Engineering",
    category: "AI & Data Science",
    projectTitle: "Multimodal Medical AI: Chest Radiograph & EHR Diagnostic Assistant",
    requirement: "Need working PyTorch ViT source code with Grad-CAM heatmap visualization and IEEE standard base paper.",
    urgency: "1 Week",
    status: "Pending",
    createdAt: "2026-10-26T09:15:00.000Z"
  },
  {
    id: "inq-2026-002",
    name: "Sneha Ramachandran",
    email: "sneha.ram@outlook.com",
    phone: "+91 97890 54321",
    college: "SSN College of Engineering, Chennai",
    degree: "B.Tech Information Technology",
    category: "Deep Learning",
    projectTitle: "Autonomous Aerial Drone Surveillance: YOLOv10 & DeepSORT",
    requirement: "Requires real-time webcam inference demonstration and 70-page thesis report with plagiarism check.",
    urgency: "2-3 Days",
    status: "In Progress",
    createdAt: "2026-10-25T14:30:00.000Z"
  },
  {
    id: "inq-2026-003",
    name: "Karthik Venkatesh",
    email: "karthik.v@citchennai.edu.in",
    phone: "+91 94441 98765",
    college: "Chennai Institute of Technology",
    degree: "B.E. Artificial Intelligence & Data Science",
    category: "Machine Learning",
    projectTitle: "Graph Neural Network & XGBoost Hybrid for Real-Time Fraud Detection",
    requirement: "Need complete Neo4j and Kafka pipeline setup with PPT slides for Phase 1 university review.",
    urgency: "1-2 Weeks",
    status: "Completed",
    createdAt: "2026-10-24T11:00:00.000Z"
  },
  {
    id: "inq-2026-004",
    name: "Pooja Balasubramanian",
    email: "pooja.bala@vit.ac.in",
    phone: "+91 96000 11223",
    college: "Vellore Institute of Technology (VIT)",
    degree: "M.Tech Software Engineering",
    category: "Cloud Computing",
    projectTitle: "Cloud-Native Serverless Workflow Engine on Kubernetes",
    requirement: "Looking for Helm charts, Knative event configuration, and viva preparation guide.",
    urgency: "Immediate",
    status: "Pending",
    createdAt: "2026-10-27T08:45:00.000Z"
  }
];

function readLocalInquiries(): ConsultationRequest[] {
  try {
    if (!fs.existsSync(INQUIRIES_FILE)) {
      const dir = path.dirname(INQUIRIES_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(SEED_INQUIRIES, null, 2), "utf8");
      return SEED_INQUIRIES;
    }
    const raw = fs.readFileSync(INQUIRIES_FILE, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : SEED_INQUIRIES;
  } catch (err) {
    console.error("Error reading inquiries file:", err);
    return SEED_INQUIRIES;
  }
}

function writeLocalInquiries(inquiries: ConsultationRequest[]): void {
  try {
    const dir = path.dirname(INQUIRIES_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing inquiries file:", err);
  }
}

export async function getAllInquiries(): Promise<ConsultationRequest[]> {
  // If Supabase is configured, attempt fetch first
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map((item: any) => ({
          id: String(item.id),
          name: item.student_name || item.name || "Student",
          email: item.email || "",
          phone: item.phone || "",
          college: item.college || "",
          degree: item.degree || "",
          category: item.category || "",
          projectTitle: item.project_title || item.projectTitle || "",
          requirement: item.requirement || item.message || "",
          urgency: item.urgency || "1-2 Weeks",
          status: (item.status === "completed" ? "Completed" : item.status === "in_progress" ? "In Progress" : "Pending") as any,
          createdAt: item.created_at || new Date().toISOString()
        }));
      }
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local store:", err);
    }
  }

  return readLocalInquiries();
}

export async function saveInquiry(inquiryData: Partial<ConsultationRequest>): Promise<ConsultationRequest> {
  const newRequest: ConsultationRequest = {
    id: `inq-${Date.now()}`,
    name: inquiryData.name || "Anonymous Student",
    email: inquiryData.email || "",
    phone: inquiryData.phone || "",
    college: inquiryData.college || "",
    degree: inquiryData.degree || "",
    category: inquiryData.category || "General",
    projectTitle: inquiryData.projectTitle || "Custom Project Consultation",
    requirement: inquiryData.requirement || inquiryData.message || "",
    urgency: inquiryData.urgency || "1-2 Weeks",
    status: "Pending",
    createdAt: new Date().toISOString()
  };

  // 1. Always save to persistent local store
  const current = readLocalInquiries();
  const updated = [newRequest, ...current];
  writeLocalInquiries(updated);

  // 2. Also save to Supabase if available
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("inquiries").insert([
        {
          student_name: newRequest.name,
          email: newRequest.email,
          phone: newRequest.phone,
          college: newRequest.college,
          degree: newRequest.degree,
          category: newRequest.category,
          project_title: newRequest.projectTitle,
          requirement: newRequest.requirement,
          urgency: newRequest.urgency,
          status: "Pending"
        }
      ]);
    } catch (err) {
      console.warn("Supabase sync failed:", err);
    }
  }

  return newRequest;
}

export async function updateInquiryStatus(id: string, newStatus: "Pending" | "In Progress" | "Completed"): Promise<boolean> {
  // Update local file
  const list = readLocalInquiries();
  const index = list.findIndex((item) => item.id === id);
  if (index !== -1) {
    list[index].status = newStatus;
    writeLocalInquiries(list);
  }

  // Update Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from("inquiries")
        .update({ status: newStatus.toLowerCase().replace(" ", "_") })
        .eq("id", id);
    } catch (err) {
      console.warn("Supabase update error:", err);
    }
  }

  return true;
}
