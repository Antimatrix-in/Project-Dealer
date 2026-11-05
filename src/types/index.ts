export interface TechnicalDomain {
  sno: number;
  name: string;
  code: string;
  slug: string;
  status: "Active";
  description: string;
}

export interface TechnicalDomainWithCount extends TechnicalDomain {
  projectCount: number;
}

export const TECHNICAL_DOMAINS: TechnicalDomain[] = [
  { sno: 1, name: "Python Projects", code: "AMPY", slug: "AMPY", status: "Active", description: "Computer vision, automated recognition, AI edge solutions, and core Python applications." },
  { sno: 2, name: "Java Projects", code: "AMJV", slug: "AMJV", status: "Active", description: "Enterprise architectures, Spring Boot, cryptographically verifiable health records, and distributed systems." },
  { sno: 3, name: "Cyber Security", code: "AMCY", slug: "AMCY", status: "Active", description: "AI-driven intrusion detection, zero-day ransomware defense, network forensics, and cryptography." },
  { sno: 4, name: "Django – Python", code: "AMDJ", slug: "AMDJ", status: "Active", description: "Full-stack web applications, secure REST APIs, role-based portals, and enterprise Django workflows." },
  { sno: 5, name: "Data Science – Python", code: "AMDS", slug: "AMDS", status: "Active", description: "Predictive modeling, clinical NLP, multimodal health intelligence, and exploratory data pipelines." },
  { sno: 6, name: "Image Processing – MATLAB", code: "AMIM", slug: "AMIM", status: "Active", description: "Digital image enhancement, morphological segmentation, wavelets, and biomedical feature extraction." },
  { sno: 7, name: "Deep Learning", code: "AMDL", slug: "AMDL", status: "Active", description: "Convolutional neural networks, Vision Transformers, YOLO object tracking, and deep latent representations." },
  { sno: 8, name: "Artificial Intelligence", code: "AMAI", slug: "AMAI", status: "Active", description: "Context-aware conversational agents, generative multimodal frameworks, and intelligent reasoning engines." },
  { sno: 9, name: "Web Application – PHP", code: "AMPH", slug: "AMPH", status: "Active", description: "Secure LAMP stack web applications, transactional portals, dynamic CMS, and institutional management systems." },
  { sno: 10, name: "Android – Java", code: "AMAD", slug: "AMAD", status: "Active", description: "Native Android mobile applications, mesh communication, IoT device control, and location-based services." },
  { sno: 11, name: "Big Data – Python / Java", code: "AMBD", slug: "AMBD", status: "Active", description: "Distributed batch and stream processing with Apache Spark, Hadoop MapReduce, and large-scale analytics." },
  { sno: 12, name: "Image Processing – Python", code: "AMIP", slug: "AMIP", status: "Active", description: "OpenCV, scikit-image, real-time video filtering, medical scan enhancement, and automated defect detection." },
  { sno: 13, name: "Cloud Computing – Python / Java", code: "AMCC", slug: "AMCC", status: "Active", description: "Serverless microservices, auto-scaling Kubernetes clusters, distributed tracing, and multi-tenant cloud storage." },
  { sno: 14, name: "Data Mining – Python / Java", code: "AMDM", slug: "AMDM", status: "Active", description: "Association rule mining, clustering, anomaly detection in high-dimensional datasets, and customer profiling." },
  { sno: 15, name: "Blockchain – Python / Java / DotNet", code: "AMBC", slug: "AMBC", status: "Active", description: "Decentralized ledgers, smart contracts, tamper-proof audit trails, and distributed consensus mechanisms." },
  { sno: 16, name: "Machine Learning – Python", code: "AMML", slug: "AMML", status: "Active", description: "Supervised and unsupervised algorithms, Graph Neural Networks, gradient boosting, and fraud ring detection." }
];

export type TechnicalDomainCode = (typeof TECHNICAL_DOMAINS)[number]["code"];

export type ProjectCategory = 
  | "Python Projects"
  | "Java Projects"
  | "Cyber Security"
  | "Django – Python"
  | "Data Science – Python"
  | "Image Processing – MATLAB"
  | "Deep Learning"
  | "Artificial Intelligence"
  | "Web Application – PHP"
  | "Web Application - PHP"
  | "Android – Java"
  | "Android - Java"
  | "Big Data – Python / Java"
  | "Big Data – Python/Java"
  | "Big Data - Python / Java"
  | "Big Data - Python/Java"
  | "Image Processing – Python"
  | "Image Processing - Python"
  | "Cloud Computing – Python / Java"
  | "Cloud Computing – Python/Java"
  | "Cloud Computing - Python / Java"
  | "Cloud Computing - Python/Java"
  | "Data Mining – Python / Java"
  | "Data Mining – Python/Java"
  | "Data Mining - Python / Java"
  | "Data Mining - Python/Java"
  | "Blockchain – Python / Java / DotNet"
  | "Blockchain – Python/Java/DotNet"
  | "Blockchain - Python / Java / DotNet"
  | "Blockchain - Python/Java/DotNet"
  | "Machine Learning – Python"
  | "Machine Learning - Python"
  | "AI & Data Science"
  | "Machine Learning"
  | "Web Development"
  | "Mobile App Development"
  | "Cloud Computing"
  | "Data Analytics";

export const PROJECT_ENQUIRY_DOMAINS = [
  "Python Projects",
  "Java Projects",
  "Cyber Security",
  "Django – Python",
  "Data Science – Python",
  "Image Processing – MATLAB",
  "Deep Learning",
  "Artificial Intelligence",
  "Web Application – PHP",
  "Android – Java",
  "Big Data – Python / Java",
  "Big Data – Python/Java",
  "Image Processing – Python",
  "Cloud Computing – Python / Java",
  "Cloud Computing – Python/Java",
  "Data Mining – Python / Java",
  "Data Mining – Python/Java",
  "Blockchain – Python / Java / DotNet",
  "Blockchain – Python/Java/DotNet",
  "Machine Learning – Python",
  "Machine Learning - Python"
] as const;

export type ProjectEnquiryDomain = (typeof PROJECT_ENQUIRY_DOMAINS)[number];

export interface ProjectModule {
  name: string;
  description: string;
}

export interface Project {
  id: string;
  projectCode?: string;
  domainCode?: string;
  domainName?: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  tagline: string;
  description: string;
  abstract: string;
  problemStatement?: string;
  proposedSolution?: string;
  techStack: string[];
  features: string[];
  modules: ProjectModule[];
  documentationIncluded: string[];
  screenshots?: {
    title: string;
    caption: string;
    type: "dashboard" | "architecture" | "results" | "interface";
  }[];
  level: "UG Final Year" | "PG / M.Tech" | "Diploma / Mini Project";
  year: string;
  featured?: boolean;
  thumbnail?: string;
  status?: "Available" | "In Development";
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  iconName: string;
  deliverables: string[];
  highlights: string[];
}

export interface StudentReview {
  id: string;
  studentName: string;
  college: string;
  degree: string;
  projectTitle: string;
  category: ProjectCategory;
  rating: number;
  date: string;
  comment: string;
  avatarUrl?: string;
  verified: boolean;
}

export interface ProjectInquiry {
  name: string;
  email: string;
  phone: string;
  mobileNumber?: string;
  whatsappNumber?: string;
  college?: string;
  department?: string;
  degree?: string;
  category?: ProjectCategory | string;
  projectDomain?: string;
  customDomain?: string;
  domainName?: string;
  domainCode?: string;
  projectCode?: string;
  projectTitle?: string;
  enquiryType?: "Project Specific" | "General Domain";
  requirement?: string;
  message?: string;
  urgency?: "Immediate (1-3 days)" | "1-2 Weeks" | "1 Month" | "Flexible" | string;
  source?: "Project Enquiry" | "General Website Contact" | "Consultation Request" | "Custom Requirement";
}
