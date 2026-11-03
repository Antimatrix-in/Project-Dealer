import fs from "fs";
import path from "path";
import { isSupabaseConfigured, supabase } from "./supabase";

export type InquiryStatus =
  | "New"
  | "Pending"
  | "Verified"
  | "In Progress"
  | "Completed"
  | "Suspicious"
  | "Spam";

export type VerificationStatus = "Verified" | "Suspicious" | "Spam" | "Unverified";

export type EnquirySource = "Project Enquiry" | "General Website Contact" | "Consultation Request";

export const PROJECT_ENQUIRY_DOMAINS = [
  "AI & Data Science",
  "Machine Learning",
  "Deep Learning",
  "Python Projects",
  "Java Projects",
  "Web Development",
  "Mobile App Development",
  "Cloud Computing",
  "Cyber Security",
  "Data Analytics",
  "Other"
] as const;

export type ProjectEnquiryDomain = (typeof PROJECT_ENQUIRY_DOMAINS)[number];

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  mobileNumber?: string;
  whatsappNumber?: string;
  college?: string;
  department?: string;
  degree?: string;
  category?: string;
  projectDomain?: string;
  customDomain?: string;
  projectTitle?: string;
  requirement?: string;
  urgency?: string;
  message?: string;
  source: EnquirySource;
  status: InquiryStatus;
  verificationStatus: VerificationStatus;
  isSpam?: boolean;
  spamScore?: number;
  botSignals?: string[];
  clientIp?: string;
  createdAt: string;
}

export type ProjectEnquiry = ConsultationRequest;

const INQUIRIES_FILE = path.join(process.cwd(), "src", "data", "inquiries-store.json");

const SEED_INQUIRIES: ConsultationRequest[] = [
  {
    id: "inq-2026-001",
    name: "Aravind Swaminathan",
    email: "aravind.swami@gmail.com",
    phone: "+91 98401 23456",
    mobileNumber: "+91 98401 23456",
    whatsappNumber: "+91 98401 23456",
    college: "PSG College of Technology, Coimbatore",
    department: "Computer Science & Engineering",
    degree: "B.E. Computer Science & Engineering",
    category: "AI & Data Science",
    projectDomain: "AI & Data Science",
    projectTitle: "Multimodal Medical AI: Chest Radiograph & EHR Diagnostic Assistant",
    requirement: "Need working PyTorch ViT source code with Grad-CAM heatmap visualization and IEEE standard base paper.",
    urgency: "1 Week",
    source: "Consultation Request",
    status: "Pending",
    verificationStatus: "Verified",
    spamScore: 0,
    botSignals: [],
    createdAt: "2026-10-26T09:15:00.000Z"
  },
  {
    id: "inq-2026-002",
    name: "Sneha Ramachandran",
    email: "sneha.ram@outlook.com",
    phone: "+91 97890 54321",
    mobileNumber: "+91 97890 54321",
    whatsappNumber: "+91 97890 54321",
    college: "SSN College of Engineering, Chennai",
    department: "Information Technology",
    degree: "B.Tech Information Technology",
    category: "Deep Learning",
    projectDomain: "Deep Learning",
    projectTitle: "Autonomous Aerial Drone Surveillance: YOLOv10 & DeepSORT",
    requirement: "Requires real-time webcam inference demonstration and 70-page thesis report with plagiarism check.",
    urgency: "2-3 Days",
    source: "Consultation Request",
    status: "In Progress",
    verificationStatus: "Verified",
    spamScore: 0,
    botSignals: [],
    createdAt: "2026-10-25T14:30:00.000Z"
  },
  {
    id: "inq-2026-003",
    name: "Karthik Venkatesh",
    email: "karthik.v@citchennai.edu.in",
    phone: "+91 94441 98765",
    mobileNumber: "+91 94441 98765",
    whatsappNumber: "+91 94441 98765",
    college: "Chennai Institute of Technology",
    department: "Artificial Intelligence & Data Science",
    degree: "B.E. Artificial Intelligence & Data Science",
    category: "Machine Learning",
    projectDomain: "Machine Learning",
    projectTitle: "Graph Neural Network & XGBoost Hybrid for Real-Time Fraud Detection",
    requirement: "Need complete Neo4j and Kafka pipeline setup with PPT slides for Phase 1 university review.",
    urgency: "1-2 Weeks",
    source: "Consultation Request",
    status: "Completed",
    verificationStatus: "Verified",
    spamScore: 0,
    botSignals: [],
    createdAt: "2026-10-24T11:00:00.000Z"
  },
  {
    id: "inq-2026-004",
    name: "Pooja Balasubramanian",
    email: "pooja.bala@vit.ac.in",
    phone: "+91 96000 11223",
    mobileNumber: "+91 96000 11223",
    whatsappNumber: "+91 96000 11223",
    college: "Vellore Institute of Technology (VIT)",
    department: "Software Engineering",
    degree: "M.Tech Software Engineering",
    category: "Cloud Computing",
    projectDomain: "Cloud Computing",
    projectTitle: "Cloud-Native Serverless Workflow Engine on Kubernetes",
    requirement: "Looking for Helm charts, Knative event configuration, and viva preparation guide.",
    urgency: "Immediate",
    source: "Consultation Request",
    status: "Pending",
    verificationStatus: "Verified",
    spamScore: 0,
    botSignals: [],
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
    if (!Array.isArray(data)) return SEED_INQUIRIES;

    // Ensure all existing records have source, whatsappNumber, and verificationStatus preserved
    return data.map((item) => ({
      ...item,
      source: item.source || (item.id && item.id.startsWith("PE-") ? "Project Enquiry" : "Consultation Request"),
      mobileNumber: item.mobileNumber || item.phone || "",
      whatsappNumber: item.whatsappNumber || item.phone || "",
      department: item.department || item.degree || "",
      projectDomain: item.projectDomain || item.category || "General",
      verificationStatus: item.verificationStatus || (item.status === "Spam" ? "Spam" : item.status === "Suspicious" ? "Suspicious" : "Verified"),
      spamScore: typeof item.spamScore === "number" ? item.spamScore : 0,
      botSignals: Array.isArray(item.botSignals) ? item.botSignals : [],
    }));
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
          mobileNumber: item.mobile_number || item.phone || "",
          whatsappNumber: item.whatsapp_number || item.phone || "",
          college: item.college || "",
          department: item.department || item.degree || "",
          degree: item.degree || item.department || "",
          category: item.category || item.project_domain || "General",
          projectDomain: item.project_domain || item.category || "General",
          projectTitle: item.project_title || item.projectTitle || "",
          requirement: item.requirement || item.message || "",
          urgency: item.urgency || "1-2 Weeks",
          source: (item.source || (String(item.id).startsWith("PE-") ? "Project Enquiry" : "Consultation Request")) as EnquirySource,
          status: (item.status === "completed" ? "Completed" : item.status === "in_progress" ? "In Progress" : item.status === "spam" ? "Spam" : "Pending") as any,
          verificationStatus: (item.verification_status || item.verificationStatus || (item.status === "spam" ? "Spam" : "Verified")) as any,
          spamScore: item.spam_score || 0,
          botSignals: item.bot_signals || [],
          clientIp: item.client_ip || undefined,
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
  const source: EnquirySource = inquiryData.source || "Project Enquiry";
  const verificationStatus = inquiryData.verificationStatus || (inquiryData.status === "Spam" ? "Spam" : inquiryData.status === "Suspicious" ? "Suspicious" : "Verified");
  const initialStatus: InquiryStatus = inquiryData.status || (verificationStatus === "Spam" ? "Spam" : verificationStatus === "Suspicious" ? "Suspicious" : "New");

  let id = inquiryData.id;
  if (!id) {
    if (source === "Project Enquiry") {
      id = `PE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    } else {
      id = `inq-${Date.now()}`;
    }
  }

  const phone = inquiryData.phone || inquiryData.mobileNumber || inquiryData.whatsappNumber || "";
  const mobileNumber = inquiryData.mobileNumber || phone;
  const whatsappNumber = inquiryData.whatsappNumber || phone;
  const department = inquiryData.department || inquiryData.degree || "";
  const projectDomain = inquiryData.projectDomain || inquiryData.category || "General";

  const newRequest: ConsultationRequest = {
    id,
    name: inquiryData.name || "Anonymous Student",
    email: inquiryData.email || "",
    phone,
    mobileNumber,
    whatsappNumber,
    college: inquiryData.college || "",
    department,
    degree: inquiryData.degree || department,
    category: projectDomain,
    projectDomain,
    customDomain: inquiryData.customDomain || "",
    projectTitle: inquiryData.projectTitle || (projectDomain ? `${projectDomain} Project Consultation` : "Custom Project"),
    requirement: inquiryData.requirement || inquiryData.message || "",
    urgency: inquiryData.urgency || "1-2 Weeks",
    source,
    status: initialStatus,
    verificationStatus,
    spamScore: inquiryData.spamScore ?? 0,
    botSignals: inquiryData.botSignals || [],
    clientIp: inquiryData.clientIp || "",
    createdAt: new Date().toISOString()
  };

  // 1. Always save to persistent local store
  const current = readLocalInquiries();
  const updated = [newRequest, ...current.filter((i) => i.id !== id)];
  writeLocalInquiries(updated);

  // 2. Also save to Supabase if available
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("inquiries").insert([
        {
          student_name: newRequest.name,
          email: newRequest.email,
          phone: newRequest.whatsappNumber || newRequest.phone,
          college: newRequest.college,
          degree: newRequest.department || newRequest.degree,
          category: newRequest.projectDomain || newRequest.category,
          project_title: newRequest.projectTitle,
          requirement: newRequest.requirement,
          urgency: newRequest.urgency,
          status: newRequest.status
        }
      ]);
    } catch (err) {
      console.warn("Supabase sync failed:", err);
    }
  }

  return newRequest;
}

export async function updateInquiryStatus(
  id: string,
  newStatus: InquiryStatus,
  newVerificationStatus?: VerificationStatus
): Promise<boolean> {
  // Update local file
  const list = readLocalInquiries();
  const index = list.findIndex((item) => item.id === id);
  if (index !== -1) {
    list[index].status = newStatus;
    if (newVerificationStatus) {
      list[index].verificationStatus = newVerificationStatus;
    } else if (newStatus === "Spam") {
      list[index].verificationStatus = "Spam";
    } else if (newStatus === "Suspicious") {
      list[index].verificationStatus = "Suspicious";
    } else if (newStatus === "Verified" || newStatus === "Completed" || newStatus === "In Progress") {
      list[index].verificationStatus = "Verified";
    }
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
