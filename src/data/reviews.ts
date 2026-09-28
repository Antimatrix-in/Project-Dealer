import { StudentReview } from "@/types";

export const STUDENT_REVIEWS: StudentReview[] = [
  {
    id: "rev-1",
    studentName: "Karthik Subramanian",
    college: "College of Engineering, Guindy (Anna University)",
    degree: "B.E. Computer Science & Engineering",
    projectTitle: "Multimodal Medical AI: Automated Chest X-Ray Diagnostic Assistant",
    category: "AI & Data Science",
    rating: 5,
    date: "March 2026",
    comment: "AntiMatrix saved my final year project! My college guide was very strict about having a genuine deep learning implementation with explainable heatmaps. The team not only provided flawless PyTorch code with Grad-CAM but also spent 3 hours over Google Meet explaining every single mathematical concept. I scored an 'O' grade in my final viva!",
    verified: true
  },
  {
    id: "rev-2",
    studentName: "Priyanka Sharma",
    college: "Vellore Institute of Technology (VIT), Chennai",
    degree: "B.Tech Information Technology",
    projectTitle: "Graph Neural Network & XGBoost Hybrid for Real-Time Financial Fraud Detection",
    category: "Machine Learning",
    rating: 5,
    date: "February 2026",
    comment: "The level of engineering at AntiMatrix is unmatched. Most project centers just download generic GitHub repos, but AntiMatrix gave us a clean, production-grade microservices codebase with Kafka and Neo4j. The PPT was so impressive that our external examiner asked if we were submitting a patent!",
    verified: true
  },
  {
    id: "rev-3",
    studentName: "Mohammed Farhan",
    college: "SRM Institute of Science and Technology, Kattankulathur",
    degree: "B.Tech Software Engineering",
    projectTitle: "Browser-Based Collaborative Cloud IDE with AI Pair Programmer",
    category: "Web Development",
    rating: 5,
    date: "April 2026",
    comment: "Exceptional service from day one. They delivered the complete Next.js and Monaco Editor code two weeks ahead of my review deadline. The documentation was so well formatted according to our college template that our guide approved it in the first review itself without any corrections.",
    verified: true
  },
  {
    id: "rev-4",
    studentName: "Ananya Deshmukh",
    college: "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    degree: "M.Tech Data Science",
    projectTitle: "Explainable Deep Learning Architecture for Cross-Platform Fake News Analysis",
    category: "AI & Data Science",
    rating: 5,
    date: "January 2026",
    comment: "As an M.Tech student, expectations were very high regarding research novelty and base paper compliance. AntiMatrix helped formulate novel attention weighting on RoBERTa and provided a 75-page thesis with less than 6% Turnitin similarity. Totally recommended for PG scholars!",
    verified: true
  },
  {
    id: "rev-5",
    studentName: "Rahul Ranganathan",
    college: "PSG College of Technology, Coimbatore",
    degree: "B.E. Electronics & Communication",
    projectTitle: "AI-Powered Driver Drowsiness, Yawn & Distraction Monitoring System",
    category: "Python Projects",
    rating: 5,
    date: "March 2026",
    comment: "The hardware and computer vision integration with Raspberry Pi worked out-of-the-box. AntiMatrix did a live AnyDesk session the night before my review to verify camera FPS and alarm triggers. Their 24/7 technical assistance is genuinely real.",
    verified: true
  },
  {
    id: "rev-6",
    studentName: "Siddharth Verma",
    college: "BMS College of Engineering, Bengaluru (VTU)",
    degree: "B.E. Information Science",
    projectTitle: "Enterprise Electronic Health Record System with Cryptographic Integrity",
    category: "Java Projects",
    rating: 5,
    date: "February 2026",
    comment: "Their Java Spring Boot and Cryptographic Merkle tree architecture was crystal clear. The viva question bank they provided included exactly the 5 questions our external professor asked. Couldn't have cleared my final review with distinction without them!",
    verified: true
  },
  {
    id: "rev-7",
    studentName: "Divya Nair",
    college: "Amrita School of Engineering, Coimbatore",
    degree: "B.Tech Artificial Intelligence",
    projectTitle: "Off-Grid Disaster Emergency Relief & Mesh Communication Mobile App",
    category: "Mobile App Development",
    rating: 5,
    date: "March 2026",
    comment: "The Bluetooth Low Energy (BLE) multi-hop mesh demo stunned our department panel. The Flutter UI was sleek, responsive, and worked 100% offline without wifi. Fantastic mentoring team!",
    verified: true
  },
  {
    id: "rev-8",
    studentName: "Venkatesh Prasad",
    college: "SSN College of Engineering, Chennai",
    degree: "B.Tech Information Technology",
    projectTitle: "Smart Campus Surveillance: Real-Time Weapon & Activity Detection",
    category: "Python Projects",
    rating: 5,
    date: "January 2026",
    comment: "Highly professional team with transparent milestone pricing. They helped us resolve RTSP streaming lag and provided clean video recordings for our college exhibition booth. 10/10 service!",
    verified: true
  }
];

export const COMPANY_STATS = [
  { label: "Projects Completed", value: "500+", icon: "FolderCheck", change: "+120 this academic year" },
  { label: "Happy Students Mentored", value: "1,200+", icon: "Users", change: "Across 45+ premier colleges" },
  { label: "Technology Domains", value: "15+", icon: "Cpu", change: "AI, ML, Cloud, Web, Mobile, IoT" },
  { label: "Viva Success Rate", value: "99.8%", icon: "CheckCircle", change: "A+ & O grade track record" }
];
