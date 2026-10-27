import { ServiceItem } from "@/types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "project-development",
    title: "Project Development",
    shortDesc: "End-to-end implementation of customized projects with production-grade source code.",
    description: "We architect and develop final year and semester projects from scratch. Whether you require novel base paper implementations, custom research concepts, or system prototypes in AI, Machine Learning, Web, Cloud, or Mobile apps, our expert engineers deliver clean, modular, and fully functional systems.",
    iconName: "Code2",
    deliverables: [
      "100% Working & Tested Source Code",
      "Modular Architecture with Clean Code Standards",
      "Pretrained Weights, Datasets & Database Schemas",
      "Remote Desktop Installation & Code Walkthrough",
      "Continuous Revision Support until College Submission"
    ],
    highlights: ["Industry Standard Compatible", "Production Grade Code", "10 Tech Domains"]
  },
  {
    id: "project-customization",
    title: "Project Customization",
    shortDesc: "Modify existing base code, integrate new algorithms, change datasets, or add custom user modules.",
    description: "Already have a project idea, baseline code, or university guide's feedback demanding changes? We customize existing projects by adding novel algorithmic enhancements, integrating custom datasets, altering UI designs, and building unique features that satisfy your guide's specific evaluation criteria.",
    iconName: "SlidersAdjust",
    deliverables: [
      "Custom Module Addition & Logic Alterations",
      "Domain-Specific Dataset Integration & Preprocessing",
      "Algorithmic Enhancements & Comparative Analysis",
      "UI/UX Modernization & Mobile-Friendly Redesign",
      "Detailed Code Diff & Change-Log Explanations"
    ],
    highlights: ["Guide-Feedback Resolution", "Novel Enhancements", "Tailored to Your Syllabus"]
  },
  {
    id: "documentation-support",
    title: "Documentation Support",
    shortDesc: "Comprehensive reports following Anna University, VTU, and premier university formatting guidelines.",
    description: "Professional, publication-quality project documentation crafted by technical researchers. We prepare complete project reports, synopses, system requirements specifications (SRS), UML diagrams, and problem analyses formatted to pass university plagiarism and similarity checks.",
    iconName: "FileText",
    deliverables: [
      "Final Year Project Thesis / Report (60 - 100 Pages)",
      "Project Synopsis & Abstract as per University Format",
      "Standard SRS with Detailed Functional & Non-Functional Specs",
      "All UML Diagrams (Class, Use Case, Sequence, Activity, Component)",
      "Low Plagiarism Guarantee & Verification Report"
    ],
    highlights: ["Plagiarism-Free", "University Formatted", "100% Approval Record"]
  },
  {
    id: "ppt-preparation",
    title: "PPT Preparation",
    shortDesc: "High-impact presentation decks designed for Zeroth, Review 1, Review 2, and Final Defense.",
    description: "Deliver a stellar project review with visually compelling presentation slides. We design professional pitch decks featuring clear architectural diagrams, animated workflows, comparative performance graphs, and concise bullet points that impress external project evaluators.",
    iconName: "Presentation",
    deliverables: [
      "Phase 0, Phase 1, Phase 2 & Final Review Slide Decks",
      "Custom Graphic Diagrams & Architecture Infographics",
      "Structured Problem Statement, Methodology & Result Slides",
      "Speaker Notes & Slide-by-Slide Defense Script",
      "Fully Editable PowerPoint (.pptx) & High-Res PDF formats"
    ],
    highlights: ["Visually Engaging Slides", "Presenter Speaker Notes", "Review-Specific Formats"]
  },
  {
    id: "viva-guidance",
    title: "Viva Guidance",
    shortDesc: "1-on-1 mock viva sessions, comprehensive Q&A booklets, and algorithm logic explanations.",
    description: "Conquer your final project viva examination with absolute confidence. Our technical mentors provide in-depth code walkthroughs, explain every line of algorithm logic, and conduct realistic mock viva interviews covering the most frequently asked questions by external examiners.",
    iconName: "GraduationCap",
    deliverables: [
      "Comprehensive Viva Voce Q&A Booklet (100+ Curated Questions)",
      "Line-by-Line Code & Algorithm Logic Explanation Sessions",
      "Mock Viva Calls simulating External Examiner Review",
      "Mathematical & Theoretical Justifications of Chosen Models",
      "Guidance on Defending Project Limitations & Future Scope"
    ],
    highlights: ["Mock Viva Practice", "Code-Level Understanding", "Top Marks Strategy"]
  },
  {
    id: "technical-support",
    title: "Technical Support",
    shortDesc: "Remote desktop setup, environment configuration, database initialization, and bug fixes.",
    description: "Never worry about your project failing to run during the live review. We configure your laptop for seamless local execution and assist with database migrations, dependency resolution, and runtime verification so your college evaluators can test the project smoothly.",
    iconName: "Server",
    deliverables: [
      "Full Local Laptop Environment Setup via AnyDesk / TeamViewer",
      "Runtime Configuration (Python, Java, Node.js, Flutter, Docker)",
      "Database Schema Initialization & Sample Data Loading",
      "Live Public Demo Hosting or Localhost Setup",
      "Emergency Troubleshooting before College Project Reviews"
    ],
    highlights: ["Fail-Proof Local Setup", "AnyDesk Live Support", "Immediate Troubleshooting"]
  }
];

export const WHY_CHOOSE_US_ITEMS = [
  {
    id: "customized-projects",
    title: "Customized Projects",
    description: "Every project is tailored to your unique requirements, university syllabus guidelines, and guide preferences with zero copy-pasting.",
    icon: "Sparkles",
    badge: "Tailor-Made"
  },
  {
    id: "expert-guidance",
    title: "Expert Guidance",
    description: "Learn directly from senior software engineers and domain specialists who mentor you throughout your project lifecycle.",
    icon: "Award",
    badge: "Industry Mentors"
  },
  {
    id: "complete-documentation",
    title: "Complete Documentation",
    description: "Receive full university-standard project reports, synopsis, UML diagrams, and high-impact PPT slides with guaranteed low plagiarism.",
    icon: "BookCheck",
    badge: "Full Reports"
  },
  {
    id: "technical-support",
    title: "Technical Support",
    description: "Round-the-clock technical troubleshooting, live remote desktop setup, and bug fixes so you never get stuck before an exam.",
    icon: "Headphones",
    badge: "24/7 Support"
  },
  {
    id: "timely-delivery",
    title: "Timely Delivery",
    description: "Strict adherence to project review deadlines with staged incremental deliveries, leaving ample time for your personal practice.",
    icon: "Clock",
    badge: "100% On-Time"
  },
  {
    id: "affordable-solutions",
    title: "Affordable Solutions",
    description: "Transparent, student-friendly pricing structures with milestone installment payment options and all deliverables bundled together.",
    icon: "BadgeDollarSign",
    badge: "Student Friendly"
  }
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Choose Project",
    shortTitle: "Select Domain",
    description: "Explore our trending project catalog or share your custom topic idea with our consultation team.",
    details: "We analyze your syllabus requirements, technical interest, and feasibility to suggest optimal topics.",
    icon: "Search"
  },
  {
    step: 2,
    title: "Discuss Requirements",
    shortTitle: "Requirements & Scope",
    description: "Have a 1-on-1 strategy call with our domain mentor to finalize system modules, tech stack, and timeline.",
    details: "We draft a comprehensive project outline and submit synopsis points for your guide's immediate approval.",
    icon: "MessageSquareQuote"
  },
  {
    step: 3,
    title: "Development",
    shortTitle: "Core Development",
    description: "Our engineering team develops clean, modular code with regular milestone updates and progress demos.",
    details: "Models are trained, databases are architected, and responsive user interfaces are crafted with best practices.",
    icon: "Code"
  },
  {
    step: 4,
    title: "Documentation",
    shortTitle: "Reports & PPT",
    description: "We compile comprehensive project reports, UML diagrams, presentation slide decks, and viva Q&A sheets.",
    details: "All documentation is strictly formatted to your university's guidelines with plagiarism verification checks.",
    icon: "FileCheck"
  },
  {
    step: 5,
    title: "Final Delivery",
    shortTitle: "Delivery & Viva Mock",
    description: "Complete project handover, remote laptop installation, live code walkthrough, and mock viva prep.",
    details: "We rehearse defense questions with you until you are 100% confident to score the highest grade in your viva.",
    icon: "CheckCircle2"
  }
];
