export type ProjectCategory = 
  | "AI & Data Science"
  | "Machine Learning"
  | "Deep Learning"
  | "Python Projects"
  | "Java Projects"
  | "Web Development"
  | "Mobile App Development"
  | "Cloud Computing"
  | "Cyber Security"
  | "Data Analytics";

export interface ProjectModule {
  name: string;
  description: string;
}

export interface Project {
  id: string;
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
  college?: string;
  degree?: string;
  category?: ProjectCategory | string;
  projectTitle?: string;
  requirement?: string;
  message?: string;
  urgency?: "Immediate (1-3 days)" | "1-2 Weeks" | "1 Month" | "Flexible";
}
