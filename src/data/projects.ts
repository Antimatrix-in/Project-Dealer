import { Project, ProjectCategory } from "@/types";

export const PROJECT_CATEGORIES: ProjectCategory[] = [
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
  "Big Data – Python/Java",
  "Image Processing – Python",
  "Cloud Computing – Python/Java",
  "Data Mining – Python/Java",
  "Blockchain – Python/Java/DotNet",
  "Machine Learning – Python"
];

export const CATEGORY_SLUG_MAP: Record<string, string> = {
  "Python Projects": "AMPY",
  "Java Projects": "AMJV",
  "Cyber Security": "AMCY",
  "Django – Python": "AMDJ",
  "Data Science – Python": "AMDS",
  "Image Processing – MATLAB": "AMIM",
  "Deep Learning": "AMDL",
  "Artificial Intelligence": "AMAI",
  "Web Application – PHP": "AMPH",
  "Android – Java": "AMAD",
  "Big Data – Python/Java": "AMBD",
  "Image Processing – Python": "AMIP",
  "Cloud Computing – Python/Java": "AMCC",
  "Data Mining – Python/Java": "AMDM",
  "Blockchain – Python/Java/DotNet": "AMBC",
  "Machine Learning – Python": "AMML",
  "Machine Learning - Python": "AMML",
  // Legacy aliases
  "AI & Data Science": "AMAI",
  "Machine Learning": "AMML",
  "Web Development": "AMDJ",
  "Mobile App Development": "AMAD",
  "Cloud Computing": "AMCC",
  "Data Analytics": "AMDS",
  // Hyphenated slug aliases
  "ai-data-science": "AMAI",
  "machine-learning": "AMML",
  "deep-learning": "AMDL",
  "python-projects": "AMPY",
  "java-projects": "AMJV",
  "web-development": "AMPH",
  "mobile-app-development": "AMAD",
  "cloud-computing": "AMCC",
  "cyber-security": "AMCY",
  "data-analytics": "AMDS",
  "data-science": "AMDS",
  "django": "AMDJ",
  "big-data": "AMBD",
  "blockchain": "AMBC",
  "image-processing-matlab": "AMIM",
  "image-processing-python": "AMIP",
  "data-mining": "AMDM"
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "ai-data-science",
    slug: "ai-data-science",
    title: "AI & Data Science",
    category: "AI & Data Science",
    tagline: "Multimodal AI Architectures, Large Language Models, Clinical Decision Support & Transformer Systems",
    description: "End-to-end AI & Data Science project framework featuring Vision Transformers (ViT), BioBERT clinical NLP, Generative AI retrieval pipelines, and explainable AI heatmaps.",
    abstract: "Artificial Intelligence and Data Science represent the vanguard of engineering research. This project domain provides complete, IEEE-aligned implementations combining modern deep transformer models with multimodal feature extraction. Evaluated against real-world benchmark datasets, our solutions deliver high predictive accuracy, explainable attention maps (Grad-CAM/SHAP), and production-grade REST APIs suitable for university final year and master's submissions.",
    problemStatement: "Bridging the gap between theoretical AI concepts and functional, low-latency applications that integrate multimodal datasets and explainable inference.",
    proposedSolution: "A unified transformer pipeline with dual-stream multimodal attention, robust preprocessing, automated hyperparameter tuning, and a responsive web dashboard.",
    techStack: ["PyTorch", "Python 3.11", "Transformers", "BioBERT", "FastAPI", "Next.js", "Docker", "PostgreSQL"],
    features: [
      "Dual-stream Multimodal Attention & Transformer Models",
      "Grad-CAM Visual Heatmaps for Model Explainability",
      "LLM-powered Automated Diagnostic & Summary Generation",
      "Robust Preprocessing & Feature Imputation Pipeline",
      "Real-Time Web Dashboard with Interactive Inference",
      "Complete IEEE Format Base Paper & Plagiarism Report"
    ],
    modules: [
      { name: "Module 1: Data Ingestion & Sanitization", description: "Processes multimodal image and textual records with CLAHE enhancement, normalization, and tokenization." },
      { name: "Module 2: Feature Extraction & Cross-Attention", description: "Extracts deep latent embeddings using transformer backbones with cross-modal fusion layers." },
      { name: "Module 3: Classification & Explainability Engine", description: "Multi-class predictive modeling with Grad-CAM and SHAP attribution overlays." },
      { name: "Module 4: Web Application & Inference Dashboard", description: "Responsive Next.js user interface with FastAPI backend for live parameter testing." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Docker Setup",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/ai-chatbot.jpg"
  },
  {
    id: "machine-learning",
    slug: "machine-learning",
    title: "Machine Learning",
    category: "Machine Learning",
    tagline: "Graph Neural Networks, Ensemble Boosting Classifiers, Anomaly Detection & Predictive Modeling",
    description: "High-accuracy Machine Learning project architecture utilizing Graph Convolutional Networks (GCN), XGBoost, LightGBM, and automated feature engineering for relational anomaly detection.",
    abstract: "Machine learning engineering requires rigorous feature extraction, imbalance mitigation, and cross-validation across complex tabular and relational graph datasets. This project framework pioneers a hybrid architecture combining GNN relational topological embeddings with gradient-boosted decision trees. Delivering sub-50ms inference latency, it solves challenging real-world tasks such as fraud ring detection, customer churn forecasting, and credit risk scoring.",
    problemStatement: "Standard machine learning approaches fail on skewed, high-dimensional datasets and struggle to capture relational interactions among interconnected entities.",
    proposedSolution: "A hybrid framework integrating relational graph convolution with ensemble gradient boosting, automated SMOTE balancing, and SHAP explainability.",
    techStack: ["Python", "Scikit-Learn", "PyTorch Geometric", "XGBoost", "LightGBM", "Pandas", "FastAPI", "Neo4j"],
    features: [
      "Heterogeneous Graph Modeling for Relational Entities",
      "Sub-50ms Low-Latency Inference with ONNX Runtime",
      "Adaptive Class Balancing & Focal Loss Optimization",
      "Interactive 2D/3D Network Visualization Dashboard",
      "TreeExplainer & SHAP Regulatory Audit Generation",
      "Automated Alert Triggers & Anomaly Scorer"
    ],
    modules: [
      { name: "Module 1: Ingestion & Feature Engineering", description: "Automated scaling, encoding, missing value imputation, and synthetic oversampling." },
      { name: "Module 2: Graph Convolution & Topological Encoding", description: "Learns structural neighborhood embeddings using multi-layer Relational GCN." },
      { name: "Module 3: Hybrid Scoring & Classification Ensemble", description: "Blends graph embeddings with tabular metrics through tuned XGBoost and LightGBM models." },
      { name: "Module 4: Risk Analytics & Investigation Portal", description: "Interactive frontend providing metric charts, confusion matrices, and decision tree breakdowns." }
    ],
    documentationIncluded: [
      "Standard Peer-Reviewed Base Paper",
      "Complete 70-Page Final Year Project Report & Thesis",
      "Full Software Requirements Specification (SRS)",
      "Viva Voce Preparation Guide with Algorithm Complexities",
      "Professional 30-Slide Defense PowerPoint Presentation",
      "Clean Python Source Code & Synthetic Tabular Datasets"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/ai-chatbot.jpg"
  },
  {
    id: "deep-learning",
    slug: "deep-learning",
    title: "Deep Learning",
    category: "Deep Learning",
    tagline: "YOLOv10 Real-Time Vision, Autonomous Aerial Surveillance, 3D CNNs & Edge AI",
    description: "Cutting-edge Deep Learning computer vision platform implementing anchor-free YOLOv10 object detection, DeepSORT trajectory tracking, and real-time GPU video inference.",
    abstract: "Deep learning computer vision applications demand high frame-rate inference, occlusion resilience, and precision localization. This comprehensive project suite features state-of-the-art convolutional and attention-based architectures (YOLOv10, ResNet, U-Net) optimized for real-time video feeds. Complete with pre-trained weights, edge deployment configurations, and tensor optimization, it delivers 55+ FPS on commodity hardware.",
    problemStatement: "High computational complexity and real-time processing bottlenecks in computer vision models deployed on resource-constrained academic setups.",
    proposedSolution: "An anchor-free deep convolutional network with coordinate attention and Kalman-filter tracking, accelerated via TensorRT and CUDA.",
    techStack: ["PyTorch", "YOLOv10", "TensorFlow", "DeepSORT", "OpenCV", "CUDA", "FastAPI", "Next.js"],
    features: [
      "Anchor-Free YOLOv10 Real-Time Object Detection",
      "DeepSORT Kalman-Filter Multi-Object Trajectory Tracking",
      "55+ FPS Optimized Pipeline on Standard CPU/GPU",
      "Automated Bounding Box Annotation & Confidence Heatmaps",
      "Webcam & RTSP Video Stream Ingestion Support",
      "Complete Thesis, Source Code & Viva Defense Q&A"
    ],
    modules: [
      { name: "Module 1: Video Ingestion & Frame Normalization", description: "Captures RTSP/webcam frames, resizes, and performs CLAHE contrast adjustments." },
      { name: "Module 2: Convolutional Backbone & Head Inference", description: "Extracts multi-scale spatial features through coordinate attention blocks for bounding box regression." },
      { name: "Module 3: Trajectory Association & DeepSORT Tracking", description: "Maintains unique object IDs across occlusions using Kalman filtering and cosine feature distance." },
      { name: "Module 4: Real-Time Web Dashboard", description: "Displays live annotated video playback with FPS counters, detection logs, and alert triggers." }
    ],
    documentationIncluded: [
      "Standard Peer-Reviewed Research Base Paper",
      "Complete 75-Page Project Thesis & Documentation",
      "Full System Architecture & UML Flow Diagrams",
      "Comprehensive Viva Voce Handbook with Math Proofs",
      "35-Slide Professional PowerPoint Presentation",
      "Ready-to-Run Python Codebase with Pre-Trained Weights"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/plant-disease.jpg"
  },
  {
    id: "python-projects",
    slug: "python-projects",
    title: "Python Projects",
    category: "Python Projects",
    tagline: "Computer Vision Safety, MediaPipe Landmark Tracking, IoT Automation & Desktop GUIs",
    description: "Practical Python applications combining OpenCV, MediaPipe facial landmark mesh algorithms, automated alert sounders, and modern graphical interfaces.",
    abstract: "Our Python project domain delivers modular, PEP8-compliant applications designed for immediate execution and high-impact viva demonstrations. Focusing on real-time computer vision, safety automation, and desktop GUI engineering, each system is crafted with intuitive controls, SQLite databases, and comprehensive documentation conforming to university guidelines.",
    problemStatement: "Engineering students require robust, reproducible Python applications with automated setup and zero driver or environment compatibility issues.",
    proposedSolution: "Self-contained Python applications using MediaPipe and OpenCV with automated virtual environment initialization and standalone execution support.",
    techStack: ["Python 3.11", "OpenCV", "MediaPipe", "PyQt6", "FastAPI", "SQLite", "NumPy", "Matplotlib"],
    features: [
      "Real-Time Facial Landmark Mesh & Eye Aspect Ratio (EAR)",
      "Automated Drowsiness & Yawn Alert Sound Triggers",
      "Interactive PyQt6 Desktop GUI with Live Camera Feed",
      "CSV & SQLite Attendance and Incident Log Export",
      "Zero-Dependency Standalone Packaging Configuration",
      "60+ Page University Thesis Report with Flowcharts"
    ],
    modules: [
      { name: "Module 1: Camera Feed & Video Stream Capture", description: "Manages webcam capture, frame buffers, and real-time display synchronization." },
      { name: "Module 2: Facial Landmark Extraction & Geometric Analysis", description: "Tracks 468 3D facial landmarks and calculates EAR and MAR fatigue metrics." },
      { name: "Module 3: Alert Trigger & Audio Dispatch", description: "Activates audible sirens and visual warnings when thresholds exceed safety limits." },
      { name: "Module 4: Logging & Analytics Dashboard", description: "Records timestamped session data into SQLite with exportable summary charts." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & System Blueprint",
      "65-Page Project Thesis with Code Walkthrough",
      "UML Activity, Sequence, and Component Diagrams",
      "Viva Voce Q&A Handbook (80+ Questions)",
      "High-Quality PPT Defense Presentation (30 Slides)",
      "Clean Python Source Code with Setup Scripts"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/student-attendance.jpg"
  },
  {
    id: "java-projects",
    slug: "java-projects",
    title: "Java Projects",
    category: "Java Projects",
    tagline: "Enterprise Spring Boot 3 Microservices, Cryptographic Integrity & Cloud REST APIs",
    description: "Industry-standard enterprise Java applications featuring Spring Boot 3, Spring Security, JWT authentication, Hibernate/JPA, and cryptographic audit proofs.",
    abstract: "Enterprise Java forms the backbone of global banking and corporate infrastructure. This project framework exposes students to production software engineering patterns: layered MVC design, asynchronous worker pools, Docker containerization, and cryptographic data integrity verification. Each project includes complete database schemas, Swagger REST documentation, and unit test suites.",
    problemStatement: "University evaluators expect enterprise-scale architecture demonstrating transactional consistency, role-based security, and cryptographic audit capabilities.",
    proposedSolution: "A scalable Spring Boot 3 microservices backend with JWT security, PostgreSQL persistence, and tamper-evident SHA-256 Merkle tree verification.",
    techStack: ["Java 21", "Spring Boot 3", "Spring Security", "Hibernate / JPA", "PostgreSQL", "React", "Docker", "Maven"],
    features: [
      "Modular Layered Architecture (Controller, Service, Repository, DTO)",
      "Stateless JWT Authentication with Role-Based Access Control (RBAC)",
      "Cryptographic Merkle Proofs for Tamper-Evident Record Verification",
      "Interactive Swagger OpenAPI 3.0 API Documentation",
      "Asynchronous Email & Notification Processing Engine",
      "Exhaustive Viva Guide Covering OOPs, Collections & Spring Internals"
    ],
    modules: [
      { name: "Module 1: Security & Identity Gateway", description: "Handles user signup, BCrypt hashing, JWT issuance, and RBAC authorization filters." },
      { name: "Module 2: Business Logic & Service Tier", description: "Implements transactional domain logic with strict data transfer object (DTO) validation." },
      { name: "Module 3: Cryptographic Integrity & Audit Logger", description: "Constructs SHA-256 Merkle chains for every record change to guarantee non-repudiation." },
      { name: "Module 4: React Admin & Client Portal", description: "Modern responsive web portal for record management, audit tracking, and reporting." }
    ],
    documentationIncluded: [
      "Standard Academic Base Paper & System Specifications",
      "Complete 75-Page Project Report & Thesis Documentation",
      "Full Database ER Diagrams and UML Blueprints",
      "Viva Voce Preparation Manual for Java & Spring",
      "30-Slide Professional PowerPoint Presentation",
      "Complete Maven Project Source Code with Docker Compose"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/ecommerce-platform.jpg"
  },
  {
    id: "web-development",
    slug: "web-development",
    title: "Web Development",
    category: "Web Development",
    tagline: "Full-Stack Next.js 16, Real-Time WebSockets Collaboration, Cloud IDEs & Responsive Portals",
    description: "Modern full-stack web applications featuring Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, real-time WebSockets, and Supabase cloud databases.",
    abstract: "Contemporary web engineering demands high performance, server-side rendering, responsive aesthetics, and real-time bidirectional synchronization. Our Web Development project domain provides complete full-stack web systems featuring modern component libraries, clean REST and WebSocket architectures, optimistic UI updates, and frictionless cloud deployment configurations.",
    problemStatement: "Evaluators reject outdated basic PHP/HTML projects in favor of modern responsive full-stack architectures with live multi-user features.",
    proposedSolution: "A cutting-edge Next.js 16 and TypeScript full-stack platform with real-time WebSocket communication, server actions, and cloud database persistence.",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "WebSockets", "Supabase", "Prisma", "Node.js"],
    features: [
      "Full-Stack SSR & App Router Architecture with Turbopack",
      "Real-Time Multi-User Collaboration via WebSockets",
      "Secure OAuth & Role-Based Authorization Workflows",
      "Theme 10 Neutral Sand Green Professional Responsive UI",
      "Integrated Payment & Order Processing Gateway",
      "Complete 75-Page Thesis & Software Requirements Specification"
    ],
    modules: [
      { name: "Module 1: Authentication & User Profile Hub", description: "Manages session tokens, OAuth providers, and profile configuration." },
      { name: "Module 2: Dynamic Catalog & Product Management Tier", description: "Server-side cached catalog with instantaneous faceted filtering and search." },
      { name: "Module 3: Real-Time Synchronization Engine", description: "WebSocket channels for live collaboration, notifications, and event broadcasts." },
      { name: "Module 4: Analytics & Admin Management Console", description: "Executive portal with revenue charts, user management, and audit logs." }
    ],
    documentationIncluded: [
      "Standard Peer-Reviewed Base Paper",
      "75-Page Project Thesis & Requirements Specification",
      "Database Schema Diagrams & UML System Models",
      "Viva Voce Handbook on Next.js, React & Modern Web",
      "30-Slide High-Impact PowerPoint Presentation",
      "Production-Ready Next.js & TypeScript Codebase"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/ecommerce-platform.jpg"
  },
  {
    id: "mobile-app-development",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    category: "Mobile App Development",
    tagline: "Cross-Platform Flutter & React Native, Peer-to-Peer Mesh Networks & On-Device AI",
    description: "Cross-platform iOS and Android mobile applications featuring Flutter, offline-first local SQLite caching, Bluetooth Low Energy (BLE) peer mesh, and automated cloud sync.",
    abstract: "Mobile development requires robust state management, offline resilience, and cross-platform fidelity. This project domain provides complete mobile solutions built with Flutter and React Native. Highlights include decentralized Bluetooth mesh communication for emergency disaster relief, background GPS telemetry, and on-device machine learning inference.",
    problemStatement: "Mobile applications often fail when disconnected from cellular coverage, highlighting the need for off-grid peer-to-peer communication.",
    proposedSolution: "An offline-first Flutter application utilizing BLE mesh topology to relay packets across peer devices without internet connectivity.",
    techStack: ["Flutter", "Dart", "React Native", "Firebase", "SQLite", "Bluetooth Low Energy", "Provider", "REST API"],
    features: [
      "Cross-Platform Codebase Compiling to Android & iOS",
      "Offline-First SQLite Local Caching with Auto-Sync",
      "Decentralized Bluetooth Mesh Multi-Hop Messaging",
      "Interactive Offline Map Caching & Route Plotting",
      "Push Notification Gateway with Firebase Cloud Messaging",
      "Complete Thesis, APK Binary & Source Code Included"
    ],
    modules: [
      { name: "Module 1: BLE Mesh Radio & Peer Discovery Engine", description: "Scans, pairs, and routes encrypted packets across neighboring mobile nodes." },
      { name: "Module 2: Offline Data Store & Transaction Queue", description: "Queues messages locally in SQLite and synchronizes when internet is restored." },
      { name: "Module 3: Mapping & Geospatial Telemetry", description: "Plots emergency beacons and safe-zone coordinates on vector map tiles." },
      { name: "Module 4: Emergency SOS & Broadcast Interface", description: "One-tap high-priority distress broadcast with audio-visual alarms." }
    ],
    documentationIncluded: [
      "Standard Base Paper on Mesh Networks & Mobile AI",
      "Complete 70-Page Final Year Project Report & Thesis",
      "UML Class, State Machine, and Architecture Diagrams",
      "Viva Voce Q&A Manual on Flutter & Mobile Architectures",
      "30-Slide Defense PowerPoint Presentation",
      "Full Flutter/Dart Source Code & Installable APK File"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/student-attendance.jpg"
  },
  {
    id: "cloud-computing",
    slug: "cloud-computing",
    title: "Cloud Computing",
    category: "Cloud Computing",
    tagline: "Serverless Workflow Engines, Knative Event Compute & Kubernetes Auto-Scaling",
    description: "Cloud-native distributed systems platform implementing Kubernetes custom controllers, dynamic Horizontal Pod Autoscalers (HPA), serverless compute, and Prometheus monitoring.",
    abstract: "Cloud computing projects highlight the power of elasticity, fault tolerance, and container orchestration. This project framework deploys custom Kubernetes operators and Knative serverless workflows that scale from zero to hundreds of microservice replicas in response to incoming traffic bursts, verified with Prometheus metrics and Grafana dashboards.",
    problemStatement: "Academic institutions require realistic demonstrations of dynamic elasticity and microservice resilience that can be reproduced locally.",
    proposedSolution: "A lightweight Kubernetes cluster deployment using Docker and Minikube with simulated load generation and real-time auto-scaling.",
    techStack: ["Kubernetes", "Docker", "Knative", "Golang", "Python", "Prometheus", "Grafana", "Helm"],
    features: [
      "Dynamic Scale-to-Zero Event-Driven Function Scaling",
      "Custom Kubernetes Controller & Custom Resource Definitions (CRDs)",
      "Real-Time Prometheus Metric Scraping & Grafana Dashboards",
      "Automated Health Checks & Self-Healing Pod Recovery",
      "Infrastructure as Code (IaC) with Helm & Dockerfiles",
      "Exhaustive Viva Voce Guide on Cloud & Distributed Systems"
    ],
    modules: [
      { name: "Module 1: Containerization & Cluster Orchestration", description: "Dockerizes microservices and defines Kubernetes Pods, Deployments, and Services." },
      { name: "Module 2: Custom Controller & Autoscaler", description: "Monitors queue lengths and dynamically scales pod replicas via Kubernetes API." },
      { name: "Module 3: Serverless Event Router", description: "Directs incoming HTTP and event requests to cold/hot container instances." },
      { name: "Module 4: Prometheus & Grafana Observability Portal", description: "Visualizes CPU utilization, memory consumption, latency, and scaling events." }
    ],
    documentationIncluded: [
      "Standard IEEE Base Paper on Cloud Autoscaling",
      "70-Page Comprehensive Project Report & Thesis",
      "Kubernetes Architecture & Cluster Topology Blueprints",
      "Viva Voce Defense Guide on Microservices & Cloud",
      "30-Slide Professional PowerPoint Presentation",
      "Ready-to-Deploy Helm Charts, Manifests & Source Code"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/ecommerce-platform.jpg"
  },
  {
    id: "cyber-security",
    slug: "cyber-security",
    title: "Cyber Security",
    category: "Cyber Security",
    tagline: "AI-Driven Zero-Day Ransomware Detection, Deep Packet Inspection & SOC Intrusion Security",
    description: "Enterprise defensive cybersecurity system implementing AI-powered Network Intrusion Detection (NIDS), ransomware heuristic canary detection, and Security Operations Center (SOC) dashboards.",
    abstract: "Modern cybersecurity threats bypass conventional signature-based antivirus solutions. This project integrates machine learning anomaly detection with deep packet inspection (DPI) to identify zero-day ransomware, SQL injections, and distributed port scans. Featuring an interactive SOC dashboard, it automatically quarantines malicious IPs and logs forensic audit evidence.",
    problemStatement: "Signature-based security tools cannot detect zero-day cyber attacks and heuristic malware mutations in real time.",
    proposedSolution: "A hybrid heuristic and AI anomaly detection engine inspecting network packets and system calls, with automated firewall quarantine triggers.",
    techStack: ["Python", "Scapy", "Suricata", "PyTorch", "Elasticsearch", "FastAPI", "Next.js", "Docker"],
    features: [
      "Real-Time Deep Packet Inspection (DPI) for HTTP, DNS & TCP",
      "Behavioral Zero-Day Ransomware Canary Trap System",
      "Interactive SOC Security Analyst Incident Portal",
      "Automated IP Quarantine & Firewall Rule Injection",
      "MITRE ATT&CK Framework Threat Mapping Matrix",
      "Comprehensive Thesis, Source Code & Turnitin Verification"
    ],
    modules: [
      { name: "Module 1: Packet Sniffer & Flow Aggregator", description: "Captures live traffic via Scapy and computes bidirectional network flow statistical vectors." },
      { name: "Module 2: AI Intrusion Classification Engine", description: "Evaluates network flows against neural anomaly models to detect port scans, DDoS, and exploits." },
      { name: "Module 3: Canary File & Ransomware Watchdog", description: "Monitors sensitive honeypot files for rapid entropy spikes and mass modification attempts." },
      { name: "Module 4: SOC Alert & Mitigation Interface", description: "Real-time web dashboard displaying threat alerts, geographic IP origins, and blocklist controls." }
    ],
    documentationIncluded: [
      "Standard Peer-Reviewed Base Paper & Threat Models",
      "75-Page Project Thesis & Requirements Specification",
      "Network Topology & Security Architecture Diagrams",
      "Viva Voce Handbook on Network Security & Cryptography",
      "35-Slide Defense PowerPoint Presentation",
      "Complete Python & Next.js Source Code with PCAP Datasets"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/plant-disease.jpg"
  },
  {
    id: "data-analytics",
    slug: "data-analytics",
    title: "Data Analytics",
    category: "Data Analytics",
    tagline: "Hospital Operational Intelligence, Predictive Patient Flow & Executive BI Dashboards",
    description: "End-to-end data analytics and business intelligence platform featuring automated ETL data pipelines, LightGBM readmission forecasting, and interactive drill-down executive dashboards.",
    abstract: "Transforming vast unstructured institutional records into actionable predictive intelligence is critical for modern operations. This project domain delivers scalable data cleaning pipelines, statistical cohort survival analysis, and predictive machine learning models (LightGBM, SHAP). Students present compelling visual insights backed by mathematical rigor and interactive charts.",
    problemStatement: "Static reports fail to deliver predictive foresight, leaving hospital and business operations vulnerable to patient flow bottlenecks and readmission penalties.",
    proposedSolution: "An automated data pipeline integrating missing-value imputation, predictive readmission scoring, SHAP risk attributions, and interactive drill-down dashboards.",
    techStack: ["Python", "Pandas", "Polars", "LightGBM", "SHAP", "PostgreSQL", "Next.js", "Tailwind CSS"],
    features: [
      "Automated High-Performance ETL & Data Cleaning Pipeline",
      "Predictive Patient Flow & Readmission Risk Scoring",
      "Interactive Cohort Survival & Retention Curve Graphs",
      "Feature Importance & SHAP Values Explanation Matrix",
      "Exportable Executive PDF & CSV Intelligence Reports",
      "Comprehensive 70-Page Thesis with Statistical Proofs"
    ],
    modules: [
      { name: "Module 1: Automated Data Ingestion & Sanitization", description: "Loads multi-table healthcare/business datasets, handles missing values, and detects statistical outliers." },
      { name: "Module 2: Feature Engineering & Cohort Segmentation", description: "Derives length-of-stay ratios, historical visit frequencies, and comorbidity indices." },
      { name: "Module 3: Predictive Modeling & Explainability", description: "Trains calibrated LightGBM classifiers with SHAP attribution explanations for individual risk factors." },
      { name: "Module 4: Executive BI Visualization Dashboard", description: "Interactive dashboard featuring drill-down filters, risk gauges, and PDF summary exports." }
    ],
    documentationIncluded: [
      "Standard Peer-Reviewed Research Base Paper",
      "Complete 70-Page Final Year Project Thesis & Report",
      "Database Schema Diagrams & System Flowcharts",
      "Exhaustive Viva Voce Preparation Guide for Analytics",
      "30-Slide Professional PowerPoint Presentation",
      "Clean Python & Next.js Source Code with Sample Datasets"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/ai-chatbot.jpg"
  },
  {
    id: "aids-01",
    slug: "multimodal-medical-ai-diagnosis",
    title: "Multimodal Medical AI: Automated Chest Radiograph & EHR Diagnostic Assistant",
    category: "AI & Data Science",
    tagline: "Deep Learning transformer-based clinical decision support combining visual imaging with patient health records.",
    description: "An advanced healthcare diagnostic platform that fuses computer vision (DenseNet/Vision Transformers) and NLP (BioBERT) to analyze chest radiographs along with patient clinical histories, generating explainable diagnostic heatmaps and clinical summaries.",
    abstract: "Medical diagnosis frequently necessitates combining visual evidence from radiographs with historical textual medical observations. This project introduces a dual-stream multimodal deep learning architecture capable of cross-attentive fusion between radiographic features and unstructured clinician notes. Evaluated against benchmark medical datasets, the model achieves a 94.6% AUC-ROC score across 14 thoracic pathologies while generating Grad-CAM visual explanations to assist clinicians during urgent triage.",
    problemStatement: "Clinicians experience cognitive fatigue and diagnostic delays due to fragmented siloed data where radiographs and patient electronic health records are reviewed in separate interfaces without automated correlation.",
    proposedSolution: "A unified multimodal AI pipeline utilizing cross-modal attention maps that simultaneously highlights radiological abnormalities on the scan and identifies correlating biomarker notes from medical text records.",
    techStack: ["PyTorch", "Python 3.11", "Vision Transformer", "BioBERT", "FastAPI", "Next.js", "Docker", "PostgreSQL"],
    features: [
      "Dual-stream Multimodal Attention Network",
      "Grad-CAM Visual Heatmap Generation for Explainable AI",
      "Automated Medical Report Generation using LLM Prompt Tuning",
      "HIPAA-compliant de-identification data pipeline",
      "Interactive Clinician Dashboard with DICOM preview support",
      "Comparative Disease Severity Progression Analyzer"
    ],
    modules: [
      { name: "Module 1: Multimodal Data Ingestion & Sanitization", description: "Ingests DICOM radiological scans and EHR text records, applying anonymization, CLAHE contrast enhancement, and tokenization." },
      { name: "Module 2: Feature Extraction & Cross-Attention Encoder", description: "Extracts visual embeddings via ViT-Base and contextual clinical embeddings via BioBERT, followed by a multi-head cross-attention layer." },
      { name: "Module 3: Diagnostic Classification & Grad-CAM Engine", description: "Computes multi-label classification logits across 14 pulmonary pathologies and generates pixel-level attention overlays." },
      { name: "Module 4: Web Application & Clinician Decision Interface", description: "Modern web dashboard built with Next.js and FastAPI, providing real-time inference, PDF summary export, and audit trails." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Docker Setup",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "PG / M.Tech",
    year: "2025-26 Edition",
    featured: true
  },
  {
    id: "ml-01",
    slug: "realtime-financial-fraud-detection",
    title: "Graph Neural Network & XGBoost Hybrid for Real-Time Financial Fraud Ring Detection",
    category: "Machine Learning",
    tagline: "Graph-based relational anomaly detection detecting sybil networks and fraudulent digital payment rings.",
    description: "An ultra-low-latency transaction monitoring framework combining Graph Convolutional Networks (GCN) with gradient-boosted decision trees to uncover organized payment rings and money laundering syndicates.",
    abstract: "Traditional rule-based fraud detection systems suffer from high false-positive rates and fail to identify sophisticated multi-hop mule account transactions. This project pioneers a hybrid topology combining GNN structural embeddings with transaction-level feature engineering. By modeling transactions as heterogeneous bipartite graphs, our architecture captures subtle topological anomalies and temporal money flow patterns with sub-50ms inference latency.",
    problemStatement: "Financial institutions lose billions annually to coordinated fraud networks that deliberately distribute small-value transactions across hundreds of newly opened mule accounts to evade standard per-transaction thresholds.",
    proposedSolution: "A real-time hybrid graph neural network that analyzes graph neighborhood topology alongside temporal transaction characteristics to identify circular money movement and synthetic identity rings.",
    techStack: ["PyTorch Geometric", "XGBoost", "Python", "Apache Kafka", "Neo4j", "FastAPI", "React", "Tailwind CSS"],
    features: [
      "Heterogeneous Graph Modeling for Accounts, Cards, and Devices",
      "Sub-50ms Inference Pipeline with ONNX Runtime",
      "Adaptive SMOTE & focal loss handling extreme class imbalance (99.8:0.2)",
      "Interactive 3D Fraud Network Visualization using Neo4j",
      "SHAP & TreeExplainer automated regulatory audit logs",
      "Automated Account Freeze & Alert Notification Gateway"
    ],
    modules: [
      { name: "Module 1: Streaming Transaction Ingestion & Graph Builder", description: "Consumes transactions from Kafka streams and constructs dynamic transaction subgraphs in Neo4j." },
      { name: "Module 2: Structural Embedding via Relational GCN", description: "Aggregates topological neighborhood features to compute latent fraud propensity vectors." },
      { name: "Module 3: Hybrid Scoring & Classification", description: "Blends GNN embeddings with tabular transaction metrics through a tuned XGBoost ensemble." },
      { name: "Module 4: Risk Ops Dashboard & Investigation Tool", description: "Analyst portal providing interactive graph traversal, SHAP explanation charts, and rule management." }
    ],
    documentationIncluded: [
      "Standard Peer-Reviewed Base Paper",
      "Complete 70-Page Final Year Project Report & Thesis",
      "Full Software Requirements Specification (SRS)",
      "Viva Voce Preparation Guide with Algorithm Complexities",
      "Professional 30-Slide Defense PowerPoint Presentation",
      "Plug-and-play Python Source Code & Synthetic Transaction Dataset"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true
  },
  {
    id: "dl-01",
    slug: "yolov10-realtime-drone-aerial-surveillance",
    title: "Autonomous Aerial Drone Surveillance: YOLOv10 & DeepSORT for Crowd Tracking",
    category: "Deep Learning",
    tagline: "High-altitude object detection and multi-target trajectory estimation with occlusion recovery.",
    description: "An edge-deployable deep learning surveillance platform utilizing YOLOv10 and DeepSORT multi-object tracking to detect unauthorized vehicle incursions, crowd stampede anomalies, and suspicious perimeter loitering from low-altitude drone video feeds.",
    abstract: "Aerial footage captured by UAVs presents significant challenges including severe scale variations, rapid motion blur, and arbitrary object orientations. This project deploys an end-to-end deep convolutional architecture featuring anchor-free YOLOv10 with coordinate attention blocks. Coupled with a Kalman-filter-enhanced DeepSORT tracking algorithm, the model achieves 58 FPS on embedded NVIDIA Jetson platforms while maintaining continuous ID persistence across occlusions.",
    techStack: ["PyTorch", "YOLOv10", "DeepSORT", "OpenCV", "CUDA", "FastAPI", "NVIDIA Jetson"],
    features: [
      "Anchor-Free YOLOv10 Architecture with Coordinate Attention",
      "Real-time Multi-Object Trajectory Tracking with DeepSORT",
      "Drone Flight Telemetry Overlay & GPS Bounding Box Projection",
      "Crowd Density Heatmap & Stampede Anomaly Early Warning",
      "Optimized TensorRT Execution with 4x Speedup"
    ],
    modules: [
      { name: "Module 1: UAV Video Stream & Frame Normalization", description: "Stabilizes high-altitude video feeds and corrects lens distortion." },
      { name: "Module 2: Small-Object Detection via YOLOv10", description: "Localizes humans and vehicles in challenging down-sampled aerial viewpoints." },
      { name: "Module 3: Multi-Target Trajectory Association", description: "Assigns persistent IDs using appearance embeddings and cosine distance metrics." },
      { name: "Module 4: Incident Dispatch Console", description: "Web-based ground station displaying alert zones and trajectory playbacks." }
    ],
    documentationIncluded: [
      "Standard Remote Sensing Research Base Paper",
      "Full 65-Page Project Thesis with Mathematical Models",
      "SRS Document with Hardware Requirements",
      "Defense Presentation Deck (30 Slides)",
      "Source Code with Pre-trained Model Weights & Drone Dataset"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true
  },
  {
    id: "py-01",
    slug: "autonomous-drowsiness-distraction-detection",
    title: "AI-Powered Driver Drowsiness, Yawn & Distraction Monitoring System",
    category: "Python Projects",
    tagline: "Edge-deployable computer vision safety system with eye aspect ratio and head pose estimation.",
    description: "An intelligent in-cabin driver monitoring system utilizing OpenCV, MediaPipe facial landmarks, and lightweight CNNs to detect micro-sleep, prolonged eye closure, yawning, and phone distractions in real time.",
    abstract: "Driver fatigue and mobile phone distractions remain primary causes of highway collisions worldwide. This project implements a real-time computer vision system that computes Eye Aspect Ratio (EAR) and Mouth Aspect Ratio (MAR) across 468 3D facial landmarks. When consecutive frame thresholds are violated, the system triggers progressive acoustic alerts and records incident telemetry with low power consumption suitable for Raspberry Pi deployment.",
    techStack: ["Python", "OpenCV", "MediaPipe", "TensorFlow Lite", "PyQt5", "SQLite", "Raspberry Pi", "Twilio API"],
    features: [
      "Real-time 468-point 3D Facial Mesh Landmark Tracking",
      "Blink Frequency & Micro-Sleep Duration Calculator (EAR)",
      "Yawn Detection with Adaptive Mouth Aspect Ratio (MAR)",
      "Head Pose Estimation for Distraction Angle Detection (Yaw/Pitch/Roll)",
      "Multi-level Acoustic Alarm & Emergency SMS Dispatch",
      "Offline Analytics Suite for Fleet Management Reports"
    ],
    modules: [
      { name: "Module 1: Video Capture & Face Detection", description: "Captures infrared and RGB camera frames and localizes face ROI under varying illumination." },
      { name: "Module 2: Landmark Geometric Analysis (EAR & MAR)", description: "Calculates euclidean distances between eye and mouth landmark coordinates in real-time." },
      { name: "Module 3: Temporal Windowing & Alarm Logic", description: "Tracks consecutive threshold violations to differentiate voluntary blinks from micro-sleep episodes." },
      { name: "Module 4: Desktop GUI & Fleet Log Management", description: "PyQt5 control console for calibration, driver profile management, and trip safety reports." }
    ],
    documentationIncluded: [
      "Standard Comparative Analysis Base Paper",
      "Full Project Synopsis & 55-Page Project Report",
      "System Architecture, Data Flow, and State Diagrams",
      "Project Defense PowerPoint Presentation (25 Slides)",
      "Executable Python Code with Virtualenv Setup",
      "Step-by-Step Installation & Video Execution Guide"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true
  },
  {
    id: "java-01",
    slug: "secure-health-records-blockchain-hybrid",
    title: "Enterprise Electronic Health Record System with Cryptographic Integrity Verification",
    category: "Java Projects",
    tagline: "Microservices-based EHR system using Spring Boot, Hibernate, and SHA-256 Merkle proof auditing.",
    description: "An enterprise-grade Java web application providing role-based access control, cryptographic Merkle tree audit logging, and medical file storage for hospitals, doctors, and patients.",
    abstract: "Ensuring patient privacy and tamper-proof medical records across multi-hospital networks is critical for modern digital healthcare. This project develops a high-performance Spring Boot microservices platform featuring OAuth2/JWT security, AES-256 record encryption, and an immutable Merkle tree audit ledger. Even database administrators cannot alter patient medical histories without triggering cryptographic validation failures.",
    techStack: ["Java 21", "Spring Boot 3", "Spring Security", "Hibernate", "PostgreSQL", "React", "Docker", "Flyway"],
    features: [
      "Granular Role-Based Access Control (Admin, Doctor, Nurse, Patient, Auditor)",
      "AES-256 GCM Record-Level Encryption with Key Rotation",
      "Cryptographic Merkle Tree Audit Ledger for Tamper Detection",
      "Standard Healthcare REST API Support",
      "Prescription Management with Drug Interaction Warnings",
      "PDF Medical Summary Generation with Verifiable QR Signatures"
    ],
    modules: [
      { name: "Module 1: Authentication & Authorization Microservice", description: "Handles multi-factor authentication, JWT token issuance, and Spring Security method-level authorization." },
      { name: "Module 2: Patient Record & Clinical Data Service", description: "Manages encrypted patient histories, diagnoses, lab orders, and vital signs." },
      { name: "Module 3: Cryptographic Merkle Audit Engine", description: "Generates cryptographic proofs for every write operation and verifies historical ledger integrity." },
      { name: "Module 4: Enterprise Web Portal & Auditor Interface", description: "Modern dashboard allowing patients to grant temporary access consents and auditors to verify proofs." }
    ],
    documentationIncluded: [
      "Standard Architecture Specification Base Paper",
      "Complete 75-Page Project Thesis with Code Snippets",
      "Full UML Diagrams (12 Standard Diagrams)",
      "Viva Voce Preparation Kit with Java/Spring Boot Concept Reviews",
      "Comprehensive Slide Deck for Final Year Presentation",
      "Maven Project Source Code with Docker Compose and Mock DB Seeds"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true
  },
  {
    id: "web-01",
    slug: "collaborative-cloud-ide-ai-copilot",
    title: "Browser-Based Collaborative Cloud IDE with Real-Time WebSockets & AI Pair Programmer",
    category: "Web Development",
    tagline: "Next-generation developer platform supporting CRDT real-time collaboration and sandboxed code execution.",
    description: "A full-featured web-based IDE featuring Monaco editor, operational transformation/Yjs CRDT for live multiplayer coding, sandboxed Docker code execution containers, and an integrated local LLM code assistant.",
    abstract: "Remote software teams and student developers need frictionless development environments without local compiler configuration hurdles. This project builds a high-performance web-based IDE running directly in modern web browsers. Featuring conflict-free replicated data types (CRDTs), interactive terminal sessions via WebSockets, and isolated Docker container sandboxing, users can write, collaborate, and execute Python, Java, and C++ code with zero client setup.",
    techStack: ["Next.js", "TypeScript", "Node.js", "Socket.io", "Monaco Editor", "Yjs CRDT", "Docker Engine", "Tailwind CSS"],
    features: [
      "Monaco Editor with Syntax Highlighting, Autocomplete & Multi-Cursor Support",
      "Real-Time Multiplayer Coding via Yjs CRDT and WebSockets",
      "Secure Sandboxed Polyglot Code Execution (Python, JS, Java, C++)",
      "Interactive Web Terminal with xterm.js",
      "Integrated AI Code Completion and Error Explainer Assistant",
      "Session Recording & Playback for Lab Demonstrations"
    ],
    modules: [
      { name: "Module 1: Real-time Collaboration Engine", description: "Synchronizes document states across active peers using Yjs and WebSockets with conflict resolution." },
      { name: "Module 2: Code Execution Worker & Sandbox Manager", description: "Dispatches compilation jobs to resource-constrained Docker containers with CPU/memory quotas." },
      { name: "Module 3: AI Code Assistant Integration", description: "Streams code explanations, automated unit test generation, and bug fix suggestions." },
      { name: "Module 4: User Management & Project Workspace Storage", description: "Manages GitHub repository import, file tree structures, and project persistence." }
    ],
    documentationIncluded: [
      "Full Standard Compliant Project Report",
      "Complete Software Requirements Specification (SRS)",
      "High-Definition PowerPoint Presentation (30+ Slides)",
      "Detailed Viva Voce Q&A Document covering WebSockets and CRDTs",
      "Production-ready Next.js & Node.js Source Code",
      "Complete Local Setup and Docker Deployment Manual"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true
  },
  {
    id: "app-01",
    slug: "offline-first-disaster-emergency-mesh",
    title: "Off-Grid Disaster Emergency Relief & Mesh Communication Mobile Application",
    category: "Mobile App Development",
    tagline: "Peer-to-peer Bluetooth mesh SOS networking with offline maps and triage resource coordination.",
    description: "A resilient cross-platform mobile application enabling civilians and disaster response teams to exchange SOS alerts, GPS coordinates, and medical supplies requests during cellular tower outages using Bluetooth Low Energy (BLE) mesh networks.",
    abstract: "Natural disasters frequently destroy telecommunication infrastructure, leaving survivors unable to call for emergency help. This project creates an offline-first mobile application leveraging peer-to-peer BLE mesh protocols. SOS signals hop automatically across nearby survivor devices until reaching an emergency responder terminal, while vector maps rendered locally provide navigation to shelters and food distribution points.",
    techStack: ["Flutter", "Dart", "Bluetooth Low Energy (BLE)", "SQLite", "OpenStreetMap", "Node.js", "Firebase"],
    features: [
      "Decentralized Multi-Hop BLE Mesh Relay (Up to 7 Hops)",
      "One-Tap Panic Button with Auto-Generated Medical & GPS Payload",
      "100% Offline Vector Map Navigation with Shelter POIs",
      "Victim Triage Status Management (Immediate, Delayed, Minor)",
      "Low Battery Optimization Mode for Extended Survivability",
      "Automated Cloud Sync Gateway upon Internet Reconnection"
    ],
    modules: [
      { name: "Module 1: BLE Mesh Protocol & Node Discovery", description: "Discovers neighboring devices and establishes encrypted ad-hoc peer-to-peer packet relays." },
      { name: "Module 2: SOS Packet Serialization & Cryptography", description: "Compresses GPS coordinates, survivor count, and urgent triage tags into compact binary packets." },
      { name: "Module 3: Offline GIS Mapping & Spatial Routing", description: "Renders vector map tiles from local storage and calculates foot paths to nearest aid posts." },
      { name: "Module 4: First Responder Rescue Command Console", description: "Dedicated dashboard for incident commanders showing live clustered heatmaps of active SOS beacons." }
    ],
    documentationIncluded: [
      "Communications Systems Research Base Paper",
      "Comprehensive 60-Page Project Report and Synopsis",
      "Full System Flowcharts, Activity & Sequence Diagrams",
      "Presentation Slides for Project Defense (30 Slides)",
      "Complete Flutter and Dart Source Code with Android APK",
      "Hardware Testing & Ad-hoc Range Verification Guide"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true
  },
  {
    id: "cloud-01",
    slug: "serverless-microservices-autoscaling-kubernetes",
    title: "Cloud-Native Serverless Workflow Engine with Dynamic Auto-Scaling on Kubernetes",
    category: "Cloud Computing",
    tagline: "Knative and OpenFaaS event-driven compute engine with predictive traffic load balancing.",
    description: "An enterprise cloud infrastructure project that provides intelligent auto-scaling of containerized microservices from zero to thousands of instances based on predictive machine learning traffic models.",
    abstract: "Cloud cost optimization requires agile scaling mechanisms that eliminate idle resource waste without introducing request latency spikes. This research implements a Kubernetes Knative event-driven architecture integrated with an ARIMA-LSTM predictive scaling agent. The system dynamically spins up and downsizes microservices, reducing cloud computing expenses by 42% while preserving sub-100ms response latencies during abrupt traffic surges.",
    techStack: ["Kubernetes", "Knative", "Docker", "Go", "Python", "Prometheus", "Grafana", "AWS EKS"],
    features: [
      "Scale-to-Zero Serverless Function Cold-Start Optimizer",
      "Predictive Auto-scaler using Temporal Traffic Forecasters",
      "Distributed OpenTelemetry Tracing and Prometheus Metrics",
      "Fault-Tolerance Chaos Engineering Test Suite",
      "Interactive Multi-Cluster Admin Control Console"
    ],
    modules: [
      { name: "Module 1: Ingress Gateway & Event Router", description: "Dispatches incoming HTTP requests to active serverless execution pods." },
      { name: "Module 2: Predictive Scaling Agent", description: "Forecasts impending request loads and scales deployment replicas proactively." },
      { name: "Module 3: Telemetry & Observability Exporter", description: "Scrapes CPU, memory, and latency metrics into Prometheus timeseries databases." },
      { name: "Module 4: Infrastructure Automation Scripts", description: "Terraform and Helm charts for turnkey deployment to AWS, GCP, or Minikube." }
    ],
    documentationIncluded: [
      "Standard Cloud Computing Reference Base Paper",
      "Full 65-Page Project Thesis & Architecture Manual",
      "Kubernetes Manifests & Helm Chart Documentation",
      "Viva Voce Guide on Cloud Containers & Microservices",
      "Ready-to-Deploy Go & Python Source Code"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true
  },
  {
    id: "cyber-01",
    slug: "ai-zero-day-ransomware-intrusion-detection",
    title: "AI-Driven Zero-Day Ransomware & Network Intrusion Detection System (NIDS)",
    category: "Cyber Security",
    tagline: "Behavioral heuristic analysis and transformer-based payload inspection for enterprise defense.",
    description: "A proactive cybersecurity defensive suite that monitors network packet streams and OS syscall sequences to identify unseen zero-day ransomware, lateral movement, and data exfiltration before encryption begins.",
    abstract: "Modern ransomware variants easily evade signature-based antivirus scanners by employing polymorphic obfuscation. This project develops an intelligent intrusion detection and automated neutralization framework utilizing bidirectional LSTM sequence decoders trained on system call sequences and deep packet inspection (DPI) streams. Achieving a 99.4% detection rate on benchmark security datasets, the agent halts malicious processes in under 80 milliseconds.",
    techStack: ["Python", "C++", "PyTorch", "Scapy", "Suricata", "Elasticsearch", "Kibana", "FastAPI"],
    features: [
      "Real-Time Kernel System Call Heuristic Interceptor",
      "Deep Packet Inspection (DPI) for Command-and-Control Beacons",
      "Automated Honey-File Decoy & Instant Process Termination",
      "Threat Matrix Taxonomy Mapping",
      "SOC Incident Command Center with Live Threat Geo-Map"
    ],
    modules: [
      { name: "Module 1: Kernel Event Hook & Packet Capture", description: "Monitors file modification rates, entropy spikes, and raw network sockets." },
      { name: "Module 2: Deep Learning Threat Classifier", description: "Evaluates tokenized syscall sequences using a bidirectional LSTM model." },
      { name: "Module 3: Automated Containment & Rollback", description: "Kills flagged PIDs, isolates network interfaces, and restores shadow copies." },
      { name: "Module 4: SOC Dashboard & Forensics Exporter", description: "Generates actionable incident forensics reports and PCAP dumps." }
    ],
    documentationIncluded: [
      "Information Forensics & Security Research Base Paper",
      "Full 70-Page Final Year Project Report and Security Specs",
      "Viva Voce Q&A on Cryptography, Malware & Network Security",
      "Project Defense PPT (30 Slides with Live Demonstration)",
      "Executable Detection Agent Source Code & Sample PCAPs"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true
  },
  {
    id: "analytics-01",
    slug: "predictive-healthcare-churn-patient-analytics",
    title: "Hospital Operational Intelligence: Predictive Patient Flow & Readmission Analytics",
    category: "Data Analytics",
    tagline: "Interactive executive decision dashboard with predictive bed occupancy and 30-day readmission risk models.",
    description: "An enterprise data analytics platform that processes electronic health records, emergency room intake logs, and clinical biomarkers to forecast ICU bed shortages and flag high-risk patient readmissions using LightGBM and PowerBI/Plotly Dashboards.",
    abstract: "Hospital administrators struggle with resource misallocations, severe bed wait times, and avoidable 30-day readmissions. This project builds a high-throughput clinical data analytics and cohort discovery pipeline. Using automated feature engineering on patient demographic, diagnostic, and laboratory datasets, our ensemble LightGBM and SHAP explainability model predicts 30-day readmission risk with an 88.5% precision score, enabling proactive clinical intervention.",
    techStack: ["Python", "Pandas", "LightGBM", "SHAP", "FastAPI", "React", "Chart.js", "PostgreSQL"],
    features: [
      "Automated Clinical Cohort Discovery & Feature Engineering",
      "30-Day Hospital Readmission Risk Scoring with SHAP Attributions",
      "Predictive Emergency Department Wait-Time & Bed Allocation",
      "Dynamic Executive Healthcare KPI Dashboard",
      "Automated Regulatory Clinical Summary Exporter"
    ],
    modules: [
      { name: "Module 1: Clinical Data Lake & ETL Pipeline", description: "Cleanses, normalizes, and imputes missing lab values from millions of patient records." },
      { name: "Module 2: Risk Scoring & Predictive Machine Learning", description: "Trains calibrated LightGBM ensembles and extracts risk factor importance." },
      { name: "Module 3: Interactive Visual Intelligence Portal", description: "Executive dashboard displaying real-time hospital occupancy heatmaps and risk alerts." },
      { name: "Module 4: Automated Clinical Summary Generator", description: "Exports patient risk profiles with recommended care protocols." }
    ],
    documentationIncluded: [
      "Big Data Analytics Research Base Paper",
      "Comprehensive 60-Page Project Documentation & Data Dictionaries",
      "Viva Voce Handbook on Data Analytics, ETL & Machine Learning",
      "Presentation Slide Deck for Project Defense",
      "Python Data Science Source Code with Jupyter Notebooks"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true
  },
  {
    id: "dl-plant-disease",
    slug: "plant-disease-detection",
    title: "Plant Disease Detection",
    category: "Deep Learning",
    tagline: "Autonomous crop leaf anomaly diagnosis and severity segmentation with YOLOv10 & ResNet.",
    description: "An AI-powered agricultural diagnosis platform utilizing deep convolutional neural networks and YOLOv10 object detection to localize and classify plant leaf diseases with 98.7% accuracy in real-time field environments.",
    abstract: "Early plant disease detection is pivotal for safeguarding food security and preventing catastrophic agricultural yield losses. This project proposes a hybrid vision architecture incorporating YOLOv10 and a fine-tuned ResNet-50 backbone with spatial attention. Deployed via a modern dashboard and mobile-responsive interface, the system achieves sub-20ms inference latency, providing farmers and agronomists with instant disease classification, confidence scores, and targeted treatment recommendations.",
    problemStatement: "Traditional manual crop inspection requires rare agricultural pathology expertise, leading to delayed disease identification and widespread crop degradation.",
    proposedSolution: "An automated edge-ready computer vision solution providing instant disease detection, bounding-box localization, and actionable organic/chemical fungicide treatment advisories.",
    techStack: ["PyTorch", "YOLOv10", "OpenCV", "FastAPI", "Next.js", "Python", "Docker"],
    features: [
      "Real-time multi-leaf lesion detection and bounding box localization",
      "Classification of 38+ plant disease classes across major staple crops",
      "Confidence score calibration with Grad-CAM visual heatmaps",
      "Automated multilingual treatment & organic remedy recommendation",
      "Weather-correlated disease outbreak risk forecasting"
    ],
    modules: [
      { name: "Module 1: Leaf Image Preprocessing & Augmentation", description: "Standardizes illumination, removes background noise, and applies CLAHE contrast optimization." },
      { name: "Module 2: YOLOv10 Disease Detection Engine", description: "Performs single-pass bounding box inference to pinpoint disease lesion clusters." },
      { name: "Module 3: Severity Index & Diagnostic Classifier", description: "Calculates infected leaf area percentage and classifies pathological severity." },
      { name: "Module 4: Web Application & Agronomist Dashboard", description: "Interactive dashboard for image upload, real-time webcam scan, and PDF diagnostic report export." }
    ],
    documentationIncluded: [
      "Peer-Reviewed Agricultural Computer Vision Base Paper",
      "Comprehensive 65-Page Project Dissertation & SRS",
      "Detailed UML Architecture & Data Flow Diagrams",
      "Viva Voce Q&A Defense Guide with Deep Learning Theory",
      "Complete Source Code with Pretrained Weights and PlantVillage Dataset",
      "Step-by-Step Execution Guide & Video Demo"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/plant-disease.jpg"
  },
  {
    id: "aids-ai-chatbot",
    slug: "ai-chatbot",
    title: "AI Chatbot",
    category: "AI & Data Science",
    tagline: "Enterprise context-aware conversational AI assistant with RAG retrieval and vector embeddings.",
    description: "A production-ready conversational AI platform leveraging Large Language Models, LangChain orchestration, and Milvus/Pinecone vector databases to deliver hallucination-free, domain-specific query resolution.",
    abstract: "Conventional chatbots depend on rigid rule-based decision trees that fail when queried on nuanced institutional knowledge. This project presents a Retrieval-Augmented Generation (RAG) agent capable of ingesting vast unstructured PDF, docx, and syllabus repositories. Utilizing hybrid semantic search combining BM25 with dense vector embeddings and re-ranking, the chatbot delivers grounded, citation-backed answers with sub-second latency.",
    problemStatement: "Organizations and educational institutions struggle with repetitive student/customer queries and high support desk workloads.",
    proposedSolution: "A secure, private RAG pipeline with prompt guardrails that answers queries strictly using verified institutional documentation.",
    techStack: ["LangChain", "LLMs", "Vector DB", "FastAPI", "Next.js", "Python", "Tailwind CSS"],
    features: [
      "Semantic hybrid vector search with dense retrieval & BM25 sparse re-ranking",
      "Document ingestion pipeline supporting PDF, TXT, DOCX, and web URLs",
      "Contextual multi-turn conversational memory with session management",
      "Hallucination mitigation via source citation attribution",
      "Admin analytics panel tracking query sentiment and token costs"
    ],
    modules: [
      { name: "Module 1: Document Parsing & Vector Chunking", description: "Extracts text from documents and builds dense semantic embeddings using text-embedding-3-small." },
      { name: "Module 2: Vector Store & Retrieval Engine", description: "Performs similarity search using HNSW indexing and applies Cross-Encoder re-ranking." },
      { name: "Module 3: Prompt Orchestrator & LLM Synthesis", description: "Constructs contextual prompts and streams responses with citation metadata." },
      { name: "Module 4: Next.js Chat Interface & Analytics", description: "Modern responsive chat interface with markdown formatting, syntax highlighting, and feedback logging." }
    ],
    documentationIncluded: [
      "Research Base Paper on Retrieval-Augmented Generation",
      "Complete 70-Page Final Year Project Report and Thesis",
      "Full System Architecture & Sequence Diagrams",
      "Viva Voce Handbook covering LLM Architecture, Transformers & RAG",
      "Ready-to-Deploy Full Stack Source Code with Docker Compose",
      "Defense Presentation Deck (30 Slides)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/ai-chatbot.jpg"
  },
  {
    id: "py-student-attendance",
    slug: "student-attendance-system",
    title: "Student Attendance System",
    category: "Python Projects",
    tagline: "Automated contactless biometric facial recognition attendance tracker with anti-spoofing.",
    description: "An intelligent campus attendance management solution that captures live classroom video feeds, identifies registered students using FaceNet deep embeddings, and logs automated attendance with liveness anti-spoofing detection.",
    abstract: "Manual paper roll-calls waste significant lecture time and remain vulnerable to proxy attendance fraud. This research presents a high-throughput automated attendance monitoring system utilizing MTCNN face localization and 128-dimensional FaceNet embeddings. Featuring active blink and texture-based liveness verification, the system accurately detects multiple faces simultaneously within 50ms per frame, syncing logs directly with university databases.",
    problemStatement: "Classroom attendance tracking wastes instructional time and is prone to human error and proxy attendance.",
    proposedSolution: "An automated computer vision camera system that registers student presence seamlessly upon classroom entry.",
    techStack: ["OpenCV", "FaceNet", "Python", "SQLite", "Flask", "React", "Tkinter"],
    features: [
      "Simultaneous multi-face detection and recognition from live classroom cameras",
      "Blink & micro-motion liveness verification to prevent photo/screen spoofing",
      "Automated attendance logging with timestamp, course code, and section",
      "Automated WhatsApp/SMS alerts for consecutive absentees",
      "Interactive faculty analytics dashboard with Excel/CSV export"
    ],
    modules: [
      { name: "Module 1: Face Registration & Dataset Builder", description: "Captures multi-angle facial portraits and normalizes illumination for each student." },
      { name: "Module 2: Feature Extraction & Embedding Matcher", description: "Computes deep FaceNet vectors and matches against student database using Euclidean distance." },
      { name: "Module 3: Anti-Spoofing & Liveness Verifier", description: "Analyzes eye aspect ratio changes and texture gradients to discard static 2D photos." },
      { name: "Module 4: Faculty Management Portal", description: "Web-based portal for generating monthly attendance percentages and automated defaulter lists." }
    ],
    documentationIncluded: [
      "Standard Biometrics & Pattern Recognition Base Paper",
      "60-Page Project Documentation with SRS and ER Diagrams",
      "UML Activity, Sequence, and Component Diagrams",
      "Viva Voce Preparation Guide on Computer Vision & Machine Learning",
      "Clean Python Codebase with Student Enrollment Scripts",
      "Step-by-Step Setup Guide with Demonstration Video"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/student-attendance.jpg"
  },
  {
    id: "web-ecommerce-platform",
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    category: "Web Development",
    tagline: "Modern full-stack SaaS e-commerce store with Stripe payment gateway, inventory management & analytics.",
    description: "A production-grade e-commerce application featuring server-side rendering with Next.js App Router, Stripe checkout, role-based admin inventory controls, order tracking, and real-time sales analytics.",
    abstract: "Modern digital commerce demands lightning-fast page loads, resilient transactional security, and frictionless checkout flows. This project implements a scalable full-stack e-commerce architecture built with Next.js 15, PostgreSQL, and Stripe Elements. Featuring optimistic UI updates, automated invoice generation, and elastic product search with faceted filters, the platform achieves a 99 Lighthouse performance rating.",
    problemStatement: "Small-to-medium retailers struggle with high commission fees on third-party marketplaces and lack customizable, high-performance web storefronts.",
    proposedSolution: "An independent, scalable e-commerce infrastructure supporting turnkey payment processing, inventory tracking, and merchant insights.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL", "Node.js", "Prisma"],
    features: [
      "Server-side rendered product catalog with instant category filtering and search",
      "Secure end-to-end checkout with Stripe Webhooks and payment intent validation",
      "Customer authentication with OAuth, order history, and shipment tracking",
      "Merchant backoffice dashboard with inventory alerts and revenue graphs",
      "Responsive design with mobile-first cart drawer and micro-animations"
    ],
    modules: [
      { name: "Module 1: Product Catalog & Search Filter Engine", description: "Delivers cached server-rendered product feeds with price, category, and rating filters." },
      { name: "Module 2: Shopping Cart & Order Lifecycle", description: "Manages state synchronization, tax calculation, and persistent checkout carts." },
      { name: "Module 3: Secure Stripe Payment Gateway", description: "Integrates Stripe payment intents, 3D Secure verification, and automated receipt dispatch." },
      { name: "Module 4: Merchant Analytics & Stock Control", description: "Provides real-time dashboards for stock replenishment, gross sales, and customer churn." }
    ],
    documentationIncluded: [
      "Modern Web Engineering & Cloud Architecture Base Paper",
      "Complete 75-Page Project Thesis & Software Requirements Specification",
      "Comprehensive Database Schema & UML Diagrams",
      "Viva Voce Handbook on Next.js, REST APIs, and Secure Transactions",
      "Production-ready Next.js Codebase with Mock Database Seeds",
      "Deployment Manual for Vercel and Supabase"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/ecommerce-platform.jpg"
  }
];

export interface DropdownFeaturedProject {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  techStack: string[];
  thumbnail: string;
  href: string;
}

export const DROPDOWN_FEATURED_PROJECTS: DropdownFeaturedProject[] = [
  {
    id: "dl-plant-disease",
    slug: "plant-disease-detection",
    title: "Plant Disease Detection",
    category: "Deep Learning",
    description: "Deep learning leaf scan & disease classifier with bounding boxes.",
    techStack: ["PyTorch", "YOLOv10", "CNN", "FastAPI"],
    thumbnail: "/images/projects/plant-disease.jpg",
    href: "/projects/plant-disease-detection"
  },
  {
    id: "aids-ai-chatbot",
    slug: "ai-chatbot",
    title: "AI Chatbot",
    category: "AI & Data Science",
    description: "Context-aware conversational assistant with vector retrieval.",
    techStack: ["LangChain", "LLMs", "Vector DB", "Next.js"],
    thumbnail: "/images/projects/ai-chatbot.jpg",
    href: "/projects/ai-chatbot"
  },
  {
    id: "py-student-attendance",
    slug: "student-attendance-system",
    title: "Student Attendance System",
    category: "Python Projects",
    description: "Real-time facial recognition attendance tracker with analytics.",
    techStack: ["OpenCV", "FaceNet", "Python", "SQLite"],
    thumbnail: "/images/projects/student-attendance.jpg",
    href: "/projects/student-attendance-system"
  },
  {
    id: "web-ecommerce-platform",
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "Full-stack modern store with Stripe checkout & merchant portal.",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
    thumbnail: "/images/projects/ecommerce-platform.jpg",
    href: "/projects/ecommerce-platform"
  }
];

export const DOMAIN_DETAILS: Record<string, { shortDesc: string; tag: string }> = {
  "Python Projects": {
    shortDesc: "OpenCV, MediaPipe & Edge IoT Systems",
    tag: "OpenCV • MediaPipe"
  },
  "Java Projects": {
    shortDesc: "Enterprise Spring Boot & Microservices",
    tag: "Spring • Security"
  },
  "Cyber Security": {
    shortDesc: "Zero-Day Ransomware & Network IDS",
    tag: "IDS • Forensics"
  },
  "Django – Python": {
    shortDesc: "Full-Stack Django, Channels & WebSockets",
    tag: "Django • Channels"
  },
  "Data Science – Python": {
    shortDesc: "Predictive Intelligence & Healthcare AI",
    tag: "Pandas • LightGBM"
  },
  "Image Processing – MATLAB": {
    shortDesc: "Wavelets, Biomedical Segmentation & Filter Grids",
    tag: "MATLAB • Wavelets"
  },
  "Deep Learning": {
    shortDesc: "Computer Vision, YOLO & CNN Models",
    tag: "Vision • YOLO"
  },
  "Artificial Intelligence": {
    shortDesc: "Vision Transformers, RAG & LLM Agents",
    tag: "ViT • BioBERT"
  },
  "Web Application – PHP": {
    shortDesc: "LAMP Architecture, Stripe & Portal Engine",
    tag: "PHP 8 • MySQL"
  },
  "Android – Java": {
    shortDesc: "Native Android, BLE Mesh & Offline SOS",
    tag: "Android • BLE"
  },
  "Big Data – Python / Java": {
    shortDesc: "Apache Spark, Hadoop & Streaming Data",
    tag: "Spark • Hadoop"
  },
  "Big Data – Python/Java": {
    shortDesc: "Apache Spark, Hadoop & Streaming Data",
    tag: "Spark • Hadoop"
  },
  "Big Data - Python / Java": {
    shortDesc: "Apache Spark, Hadoop & Streaming Data",
    tag: "Spark • Hadoop"
  },
  "Image Processing – Python": {
    shortDesc: "OpenCV, Scikit-Image & Defect Detection",
    tag: "OpenCV • SciPy"
  },
  "Image Processing - Python": {
    shortDesc: "OpenCV, Scikit-Image & Defect Detection",
    tag: "OpenCV • SciPy"
  },
  "Cloud Computing – Python / Java": {
    shortDesc: "Kubernetes, Docker & Serverless Autoscaling",
    tag: "K8s • Serverless"
  },
  "Cloud Computing – Python/Java": {
    shortDesc: "Kubernetes, Docker & Serverless Autoscaling",
    tag: "K8s • Serverless"
  },
  "Cloud Computing - Python / Java": {
    shortDesc: "Kubernetes, Docker & Serverless Autoscaling",
    tag: "K8s • Serverless"
  },
  "Data Mining – Python / Java": {
    shortDesc: "Association Rules, Clustering & Apriori",
    tag: "Clustering • Mining"
  },
  "Data Mining – Python/Java": {
    shortDesc: "Association Rules, Clustering & Apriori",
    tag: "Clustering • Mining"
  },
  "Data Mining - Python / Java": {
    shortDesc: "Association Rules, Clustering & Apriori",
    tag: "Clustering • Mining"
  },
  "Blockchain – Python / Java / DotNet": {
    shortDesc: "Distributed Consensus, Merkle Trees & Audits",
    tag: "Smart Contract • Ledger"
  },
  "Blockchain – Python/Java/DotNet": {
    shortDesc: "Distributed Consensus, Merkle Trees & Audits",
    tag: "Smart Contract • Ledger"
  },
  "Blockchain - Python / Java / DotNet": {
    shortDesc: "Distributed Consensus, Merkle Trees & Audits",
    tag: "Smart Contract • Ledger"
  },
  "Machine Learning – Python": {
    shortDesc: "Graph Networks, Fraud & Anomaly Detection",
    tag: "GNN • XGBoost"
  },
  "Machine Learning - Python": {
    shortDesc: "Graph Networks, Fraud & Anomaly Detection",
    tag: "GNN • XGBoost"
  },
  // Legacy aliases
  "AI & Data Science": {
    shortDesc: "Transformers, GenAI & NLP Pipelines",
    tag: "PyTorch • NLP"
  },
  "Machine Learning": {
    shortDesc: "Graph Networks, Fraud & Anomaly Detection",
    tag: "GNN • XGBoost"
  },
  "Web Development": {
    shortDesc: "Modern Next.js, React & Full-Stack Apps",
    tag: "Next.js • Node"
  },
  "Mobile App Development": {
    shortDesc: "Cross-Platform Flutter & Offline Mesh Apps",
    tag: "Flutter • BLE"
  },
  "Cloud Computing": {
    shortDesc: "Kubernetes, Docker & Serverless Scaling",
    tag: "K8s • Serverless"
  },
  "Data Analytics": {
    shortDesc: "Predictive Dashboards & Cohort Intelligence",
    tag: "Pandas • LightGBM"
  }
};

