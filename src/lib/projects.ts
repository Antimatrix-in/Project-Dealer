import fs from "fs";
import path from "path";
import { TECHNICAL_DOMAINS, TechnicalDomain, Project } from "@/types";
import { PROJECTS_DATA as FALLBACK_PROJECTS } from "@/data/projects";

export { TECHNICAL_DOMAINS };

const PROJECTS_FILE = path.join(process.cwd(), "src", "data", "projects-store.json");

export interface TechnicalDomainWithCount extends TechnicalDomain {
  projectCount: number;
}

// Initial mapped projects from existing repository
export const INITIAL_PROJECTS: Project[] = [
  {
    id: "AMPY001",
    projectCode: "AMPY001",
    domainCode: "AMPY",
    domainName: "Python Projects",
    slug: "autonomous-drowsiness-distraction-detection",
    title: "AI-Powered Driver Drowsiness, Yawn & Distraction Monitoring System",
    category: "Python Projects",
    tagline: "Computer Vision Eye-Aspect-Ratio (EAR), Yawn Detection & Head Pose Estimation",
    description: "Real-time edge driver assistance system running at 60 FPS using facial landmark geometry to detect microsleep, prolonged eye closure, yawning frequency, and mobile phone distraction alerts.",
    abstract: "Drowsy driving and driver distraction remain leading contributors to vehicular fatalities worldwide. This project presents a low-latency, vision-based edge computing system deployed on CPU hardware that computes Eye Aspect Ratio (EAR), Mouth Aspect Ratio (MAR), and 3D head pose angles using 68 facial landmarks. When EAR drops below 0.22 for 20 consecutive frames, an auditory multi-frequency siren and visual alert are triggered.",
    problemStatement: "Inattentive and fatigued commercial and passenger vehicle drivers cause catastrophic collisions that cannot be prevented by traditional post-incident event recorders.",
    proposedSolution: "A lightweight facial geometry analyzer running MediaPipe/Dlib and OpenCV that issues pre-emptive audio alerts within 350 milliseconds of fatigue onset.",
    techStack: ["OpenCV", "MediaPipe", "Dlib", "Python 3.10", "Pygame", "NumPy", "Tkinter / CustomTkinter"],
    features: [
      "Real-time 60 FPS Facial Landmark Tracking with Dlib & MediaPipe",
      "Dynamic Eye Aspect Ratio (EAR) Thresholding with Adaptive Calibration",
      "Mouth Aspect Ratio (MAR) Measurement for Automated Yawn Counting",
      "3D Head Pose Orientation Estimation (Pitch, Yaw, Roll)",
      "Multi-Tone Audio Alarm & Visual HUD Alert Overlay",
      "Historical Session Analytics & Fatigue Risk Score Graphing"
    ],
    modules: [
      { name: "Module 1: Video Capture & Face Detection", description: "Streams camera feed, standardizes lighting, and isolates facial regions using high-speed SSD/Haar cascade classifiers." },
      { name: "Module 2: 68-Point Facial Landmark Alignment", description: "Extracts precise ocular coordinates (points 36-47) and oral contour points (points 48-67)." },
      { name: "Module 3: Geometry & Temporal Verification Engine", description: "Calculates Euclidean distances for EAR and MAR over consecutive temporal sliding windows." },
      { name: "Module 4: Alerting & Driver Safety Dashboard", description: "Emits buzzer frequencies, logs timestamped incidents, and displays driving scorecards." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Setup Instructions",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/student-attendance.jpg",
    status: "Available",
    createdAt: "2026-10-20T10:00:00.000Z",
    updatedAt: "2026-11-04T10:00:00.000Z"
  },
  {
    id: "AMPY002",
    projectCode: "AMPY002",
    domainCode: "AMPY",
    domainName: "Python Projects",
    slug: "student-attendance-system",
    title: "Student Attendance System: Real-Time Facial Recognition Attendance Tracker",
    category: "Python Projects",
    tagline: "FaceNet 128-D Embeddings, Anti-Spoofing Liveness & Automated ERP Reports",
    description: "Contactless classroom biometric attendance system using FaceNet deep embeddings and live blink challenge-response to prevent photographic spoofing with instant Excel/CSV report generation.",
    abstract: "Manual paper roll-calls waste valuable lecture hours and are prone to proxy marking. This project implements a secure, contactless facial recognition attendance tracker. Face crops are encoded into 128-dimensional hyperspherical vectors and compared against a pre-enrolled student database using Euclidean distance thresholds. An infrared/blink liveness detector prevents printed photo spoofing.",
    problemStatement: "Time theft, proxy attendance, and administrative paperwork in large engineering lecture halls.",
    proposedSolution: "Automated multi-face capture from a classroom webcam with real-time face matching, timestamping, and export to academic management portals.",
    techStack: ["OpenCV", "FaceNet", "Python", "SQLite", "Pandas", "CustomTkinter"],
    features: [
      "Multi-Face Simultaneous Detection and Identification",
      "Anti-Spoofing Blink & Motion Liveness Verification",
      "One-Click Student Face Enrollment with Webcam Capture",
      "Automated CSV/Excel Daily Attendance Export with Timestamps",
      "Attendance Percentage Analytics & Defaulter Alert Flagging"
    ],
    modules: [
      { name: "Module 1: Student Registration & Face Sampling", description: "Captures 30 facial samples per student under varying lighting conditions." },
      { name: "Module 2: Deep Metric Encoding", description: "Maps face crops into 128-D feature space via FaceNet deep neural network." },
      { name: "Module 3: Verification & Liveness Validation", description: "Performs Nearest Neighbor classification with eye-blink frequency checks." },
      { name: "Module 4: Attendance Logger & Reports", description: "Stores records into SQLite and generates automated teacher spreadsheets." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Setup Instructions",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/student-attendance.jpg",
    status: "Available",
    createdAt: "2026-10-21T10:00:00.000Z",
    updatedAt: "2026-11-04T10:00:00.000Z"
  },
  {
    id: "AMJV001",
    projectCode: "AMJV001",
    domainCode: "AMJV",
    domainName: "Java Projects",
    slug: "secure-health-records-blockchain-hybrid",
    title: "Enterprise Electronic Health Record System with Cryptographic Integrity Verification",
    category: "Java Projects",
    tagline: "Spring Boot 3, Microservices Architecture, SHA-256 Merkle Verification & Role-Based Access",
    description: "HIPAA-compliant hospital management and electronic health record (EHR) platform built with Java 21, Spring Boot 3, and immutable cryptographic audit trails.",
    abstract: "Healthcare institutions face stringent regulatory requirements regarding the confidentiality and integrity of digital patient dossiers. This project implements an enterprise-grade EHR system using Spring Boot microservices and Java 21. Each medical transaction, prescription update, and laboratory diagnosis is hashed into a SHA-256 Merkle tree root stored across distributed audit nodes.",
    problemStatement: "Tampering with electronic patient records, unauthorized medical record disclosures, and slow interoperability in healthcare networks.",
    proposedSolution: "A modular Spring Boot microservice suite with JWT role-based access control (RBAC), AES-256 column-level encryption, and cryptographic audit proofs.",
    techStack: ["Java 21", "Spring Boot 3.2", "Spring Security", "Hibernate / JPA", "PostgreSQL", "Docker", "Thymeleaf", "Tailwind CSS"],
    features: [
      "Role-Based Access Control (Physician, Nurse, Radiologist, Patient, Auditor)",
      "AES-GCM-256 Column-Level Encryption for Sensitive Health Identifiers (PHI)",
      "Cryptographic SHA-256 Merkle Audit Chain for Tamper-Proof Audit Logs",
      "HL7 / FHIR Standard-Compliant RESTful Data Exchange Interfaces",
      "Automated Appointment Scheduling, Prescriptions & Billing Generation",
      "High-Performance Spring Data JPA Queries with PostgreSQL Indexing"
    ],
    modules: [
      { name: "Module 1: Authentication & RBAC Gateway", description: "Manages stateless JWT session lifecycles and fine-grained endpoint authority." },
      { name: "Module 2: Clinical Data Ingestion & Encryption", description: "Encrypts diagnosis notes, vitals, and lab parameters prior to database persistence." },
      { name: "Module 3: Cryptographic Audit Trail Engine", description: "Calculates block hashes and Merkle proofs for historical modification verification." },
      { name: "Module 4: Provider & Patient Portal Interfaces", description: "Clean responsive dashboards for physicians and patients to view health histories." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Maven & Docker Setup",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/ecommerce-platform.jpg",
    status: "Available",
    createdAt: "2026-10-22T10:00:00.000Z",
    updatedAt: "2026-11-04T10:00:00.000Z"
  },
  {
    id: "AMCY001",
    projectCode: "AMCY001",
    domainCode: "AMCY",
    domainName: "Cyber Security",
    slug: "ai-zero-day-ransomware-intrusion-detection",
    title: "AI-Driven Zero-Day Ransomware & Network Intrusion Detection System (NIDS)",
    category: "Cyber Security",
    tagline: "Scapy Packet Dissection, Unsupervised Isolation Forests & MITRE ATT&CK Mapping",
    description: "Hybrid signature and behavioral network intrusion detection system capable of sniffing live promiscuous traffic, detecting port scans, DDoS floods, and zero-day encryption patterns.",
    abstract: "Modern ransomware payloads use evasive obfuscation and polymorphic binaries that easily bypass traditional static antivirus signatures. This project develops an AI-driven Network Intrusion Detection System (NIDS). Leveraging Scapy for deep packet inspection, the pipeline extracts flow-level telemetry (inter-arrival jitter, packet entropy, TCP flag anomalies).",
    problemStatement: "Organizations suffer catastrophic data extortion from polymorphic zero-day ransomware that evade static signature antivirus.",
    proposedSolution: "A real-time behavioral traffic analyzer that classifies anomalous packet bursts using Isolation Forests and XGBoost, issuing automated iptables firewall block rules.",
    techStack: ["Python", "Scapy", "XGBoost", "Isolation Forest", "Snort Rules", "ELK Stack", "React", "Docker"],
    features: [
      "Promiscuous Mode Packet Sniffing & Flow Feature Extraction with Scapy",
      "Dual-Engine Detection: Snort Rule Engine + Machine Learning Anomaly Classifier",
      "MITRE ATT&CK Enterprise Framework Tactic & Technique Tagging",
      "Automated Active Response via Dynamic iptables Firewall IP Quarantine",
      "Interactive Threat Intelligence Dashboard with Geographic Attack Maps",
      "Comprehensive PCAP Replay Benchmark Testing on CIC-IDS2017 Dataset"
    ],
    modules: [
      { name: "Module 1: Promiscuous Sniffer & Flow Aggregator", description: "Reassembles raw TCP/UDP streams and computes bidirectional flow statistics." },
      { name: "Module 2: Known Signature Matcher", description: "Evaluates packets against current Snort rule repositories for known exploits." },
      { name: "Module 3: AI Anomaly & Entropy Classifier", description: "Identifies abnormal statistical deviations indicative of encrypted beaconing." },
      { name: "Module 4: Incident Response & SOC Dashboard", description: "Dispatches SIEM webhook notifications and triggers automatic host isolation." }
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
    thumbnail: "/images/projects/ai-chatbot.jpg",
    status: "Available",
    createdAt: "2026-10-23T10:00:00.000Z",
    updatedAt: "2026-11-04T10:00:00.000Z"
  },
  {
    id: "AMDJ001",
    projectCode: "AMDJ001",
    domainCode: "AMDJ",
    domainName: "Django – Python",
    slug: "collaborative-cloud-ide-ai-copilot",
    title: "Browser-Based Collaborative Cloud IDE with Real-Time WebSockets & AI Pair Programmer",
    category: "Django – Python",
    tagline: "Django Channels, Operational Transformation (OT), Isolated Docker Sandboxing & AI Copilot",
    description: "Next-generation browser development environment built with Django and WebSockets allowing multi-user real-time code editing, in-browser code execution, and AI syntax recommendations.",
    abstract: "Remote software engineering teams require low-latency collaboration environments without cumbersome local toolchain installations. This project presents a cloud IDE leveraging Django Channels and WebSockets. Using Operational Transformation (OT), multiple developers can concurrently edit project files with deterministic cursor tracking and instant delta synchronization.",
    problemStatement: "Friction in developer onboarding, inconsistent development environments, and sluggish screen-sharing tools during pair programming interviews.",
    proposedSolution: "A browser-based cloud IDE with multi-user WebSockets editing, ephemeral containerized code runners, and integrated LLM code completion.",
    techStack: ["Django", "Django Channels", "Python", "Redis", "Monaco Editor", "Docker", "WebSockets", "PostgreSQL"],
    features: [
      "Sub-50ms Multi-User Concurrent Code Editing with Monaco Editor",
      "Isolated Sandboxed Execution for Python, JavaScript, C++, and Java",
      "Real-Time Video/Audio Chat and Cursor Attribution over WebRTC",
      "AI Code Explanation, Refactoring & Bug Detection Assistant",
      "Full Project File Tree Explorer with Upload and Download Capabilities",
      "Session Snapshotting & GitHub Repository Direct Export"
    ],
    modules: [
      { name: "Module 1: WebSocket State & Channels Layer", description: "Synchronizes document character buffers across clients via Redis Pub/Sub." },
      { name: "Module 2: Isolated Docker Code Runner", description: "Spawns ephemeral CPU/memory-restricted Linux containers to safely execute code." },
      { name: "Module 3: AI Code Assistant Integration", description: "Queries LLM endpoints for contextual code completions and inline docstrings." },
      { name: "Module 4: Project Management & Terminal HUD", description: "Renders virtual terminal output and file system modifications in real time." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Docker Compose Setup",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/ecommerce-platform.jpg",
    status: "Available",
    createdAt: "2026-10-24T10:00:00.000Z",
    updatedAt: "2026-11-04T10:00:00.000Z"
  },
  {
    id: "AMDS001",
    projectCode: "AMDS001",
    domainCode: "AMDS",
    domainName: "Data Science – Python",
    slug: "predictive-healthcare-churn-patient-analytics",
    title: "Hospital Operational Intelligence: Predictive Patient Flow & Readmission Analytics",
    category: "Data Science – Python",
    tagline: "LightGBM Gradient Boosting, SHAP Feature Attributions & Interactive Streamlit Intelligence",
    description: "End-to-end data science and clinical operations intelligence platform predicting 30-day hospital readmissions, emergency department surge probabilities, and bed allocation bottlenecks.",
    abstract: "Hospitals experience massive financial penalties and diminished care quality from unplanned 30-day patient readmissions. This project builds a clinical operational intelligence suite using Python, LightGBM, and SHAP. Analyzing electronic health records containing patient comorbidities, lab trends, and demographic indicators, the ensemble model achieves 0.88 ROC-AUC.",
    problemStatement: "Unexpected patient readmissions causing regulatory fines and emergency room bed shortages during seasonal peaks.",
    proposedSolution: "A machine learning predictive pipeline combining LightGBM, SMOTE class balancing, and SHAP interpretability to rank high-risk patients before discharge.",
    techStack: ["Python", "Pandas", "Scikit-Learn", "LightGBM", "Streamlit", "PostgreSQL", "SHAP", "Plotly"],
    features: [
      "High-Dimensional Clinical Data Cleaning, Normalization & Imputation",
      "Ensemble Gradient Boosted Trees (LightGBM) with Bayesian Hyperparameter Tuning",
      "SHAP Summary & Waterfall Plots for Clinician Model Transparency",
      "30-Day Readmission Risk Stratification Score (Low, Moderate, High, Severe)",
      "Interactive Executive Hospital Bed Management Simulation Dashboard",
      "Automated High-Risk Patient Discharge Recommendation Reports"
    ],
    modules: [
      { name: "Module 1: ETL Pipeline & Clinical Feature Engineering", description: "Aggregates ICD-10 diagnostic codes, medication counts, and prior admissions." },
      { name: "Module 2: Predictive Risk Classifier", description: "Trains tuned LightGBM and Random Forest ensembles with cross-validation." },
      { name: "Module 3: Explainability & Attribution Layer", description: "Computes local SHAP values showing exactly which symptoms drove the risk score." },
      { name: "Module 4: Healthcare Ops Streamlit Dashboard", description: "Provides interactive bed occupancy forecasts and readmission charts for hospital directors." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Python Virtualenv Setup",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/ai-chatbot.jpg",
    status: "Available",
    createdAt: "2026-10-25T10:00:00.000Z",
    updatedAt: "2026-11-04T10:00:00.000Z"
  },
  {
    id: "AMDL001",
    projectCode: "AMDL001",
    domainCode: "AMDL",
    domainName: "Deep Learning",
    slug: "yolov10-realtime-drone-aerial-surveillance",
    title: "Autonomous Aerial Drone Surveillance: YOLOv10 & DeepSORT for Crowd Tracking",
    category: "Deep Learning",
    tagline: "YOLOv10 Real-Time Object Detection, DeepSORT Multi-Object Tracking & Geofencing",
    description: "Autonomous aerial computer vision system processing 4K drone video feeds to detect pedestrians, track unique moving trajectories, identify stamped bottlenecks, and alert perimeter breaches.",
    abstract: "Large-scale public gatherings and critical infrastructure perimeters demand automated aerial surveillance. This project develops an end-to-end deep learning aerial tracking system. Utilizing YOLOv10 for end-to-end NMS-free object detection and DeepSORT for Kalman filter appearance feature tracking, the framework tracks hundreds of moving targets simultaneously from aerial angles.",
    problemStatement: "Manual monitoring of aerial drone feeds is cognitively overwhelming and fails to detect stampede precursors or perimeter intrusions in real time.",
    proposedSolution: "A real-time deep learning pipeline pairing YOLOv10 with DeepSORT to track crowd density, flow velocity, and restricted zone breaches automatically.",
    techStack: ["PyTorch", "YOLOv10", "DeepSORT", "OpenCV", "FastAPI", "WebSockets", "Docker", "Next.js"],
    features: [
      "NMS-Free YOLOv10 Architecture for Low-Latency Aerial Detection",
      "DeepSORT Re-Identification (ReID) Deep Embedding Cosine Similarity Matching",
      "Custom Polygonal Geofence Mapping with Instant Intrusion Alarms",
      "Crowd Density Heatmap Overlays & Sudden Surge Detection",
      "Automated Video Stream Telemetry with GPS Coordinate Mapping",
      "Web-Based Tactical Operations Dashboard with Real-Time Video Streaming"
    ],
    modules: [
      { name: "Module 1: Aerial Stream Ingestion & Preprocessing", description: "Decodes H.264/RTSP drone video feeds and standardizes resolution." },
      { name: "Module 2: YOLOv10 Target Detection Engine", description: "Predicts high-confidence bounding boxes for pedestrians, vehicles, and assets." },
      { name: "Module 3: DeepSORT Trajectory Tracker", description: "Assigns persistent IDs using Kalman filters and deep appearance features." },
      { name: "Module 4: Security Telemetry & Geofence Console", description: "Evaluates trajectory intersections against user-drawn perimeter polygons." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with GPU/CPU Run Scripts",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/plant-disease.jpg",
    status: "Available",
    createdAt: "2026-10-26T10:00:00.000Z",
    updatedAt: "2026-11-04T10:00:00.000Z"
  },
  {
    id: "AMDL002",
    projectCode: "AMDL002",
    domainCode: "AMDL",
    domainName: "Deep Learning",
    slug: "plant-disease-detection",
    title: "Plant Disease Detection: Deep Learning Leaf Scan & Classifier with Bounding Boxes",
    category: "Deep Learning",
    tagline: "Residual Networks, EfficientNet & Transfer Learning for 38 Crop Pathologies",
    description: "Deep learning leaf scan mobile and web classifier identifying 38 distinct plant diseases across 14 crop species with organic treatment recommendations.",
    abstract: "Agricultural output faces severe losses from undetected crop blights and fungal infections. This project implements a transfer learning vision pipeline using PyTorch, EfficientNet-B4, and ResNet-50 trained on 54,000+ leaf images from the PlantVillage dataset. The model identifies 38 crop disease classes with 98.4% validation accuracy.",
    problemStatement: "Delayed identification of crop blights leading to widespread yield destruction for smallholder farmers.",
    proposedSolution: "A deep learning mobile leaf scanner that delivers immediate pathology diagnosis and tailored fertilizer/pesticide dosage instructions.",
    techStack: ["PyTorch", "EfficientNet", "ResNet-50", "OpenCV", "FastAPI", "React", "Docker"],
    features: [
      "98.4% High-Accuracy Multiclass Crop Disease Classification",
      "Support for 14 Major Cash Crops (Tomato, Potato, Corn, Apple, Grape, etc.)",
      "Grad-CAM Heatmaps Highlighting Exact Leaf Lesions Driving the Prediction",
      "Organic and Chemical Treatment Recommendations Database",
      "Lightweight Quantized TFLite Model for Edge Mobile Deployment"
    ],
    modules: [
      { name: "Module 1: Leaf Image Normalization", description: "Performs background segmentation, color calibration, and CLAHE contrast enhancement." },
      { name: "Module 2: Deep Feature Extraction", description: "Processes leaf crops through pre-trained EfficientNet convolutional layers." },
      { name: "Module 3: Softmax Pathology Classifier", description: "Outputs top-3 disease probabilities with confidence scores." },
      { name: "Module 4: Agronomist Remedy Advisor", description: "Displays curative measures, preventive guidelines, and chemical safety data." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Model Weights",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/plant-disease.jpg",
    status: "Available",
    createdAt: "2026-10-27T10:00:00.000Z",
    updatedAt: "2026-11-04T10:00:00.000Z"
  },
  {
    id: "AMAI001",
    projectCode: "AMAI001",
    domainCode: "AMAI",
    domainName: "Artificial Intelligence",
    slug: "multimodal-medical-ai-diagnosis",
    title: "Multimodal Medical AI: Automated Chest Radiograph & EHR Diagnostic Assistant",
    category: "Artificial Intelligence",
    tagline: "Vision Transformers (ViT), BioBERT Clinical NLP & Cross-Attention Multimodal Fusion",
    description: "Clinical decision support framework combining chest X-ray radiograph embeddings from Vision Transformers with unstructured clinical notes processed by BioBERT.",
    abstract: "Single-modality AI models in healthcare fail to replicate the human radiologist's holistic workflow of inspecting both medical imagery and patient history. This project develops a unified multimodal transformer framework. Chest radiographs are processed using a pre-trained Vision Transformer (ViT-B/16), while physician clinical notes are tokenized using BioBERT. Cross-attention fusion layers combine latent vectors into a joint diagnostic representation.",
    problemStatement: "Diagnostic errors resulting from isolated image review without cross-referencing patient medical history and lab trends.",
    proposedSolution: "A cross-attention multimodal transformer fusing pixel-level radiographic attention with clinical NLP embeddings to generate differential diagnoses and Grad-CAM visual proofs.",
    techStack: ["PyTorch", "Transformers", "BioBERT", "ViT", "FastAPI", "Next.js", "Docker", "Grad-CAM"],
    features: [
      "Dual-Stream Vision Transformer & BioBERT Multimodal Fusion Architecture",
      "Grad-CAM Heatmaps Overlaying Pulmonary Lesions Directly on Radiographs",
      "Automated Clinical Report Generation with Structured Diagnostic Summaries",
      "Benchmark Evaluation on CheXpert and MIMIC-CXR Datasets",
      "Interactive Clinician Verification Portal with Real-Time Parameter Sliders",
      "DICOM Medical Imaging Format Parser and De-Identification Engine"
    ],
    modules: [
      { name: "Module 1: Multimodal Ingestion Pipeline", description: "Extracts pixel matrices from DICOM X-rays and tokenizes clinical notes." },
      { name: "Module 2: Visual & Textual Transformer Encoders", description: "Processes inputs through parallel ViT-B/16 and BioBERT encoders." },
      { name: "Module 3: Cross-Modal Attention Fusion", description: "Fuses latent representations to calculate joint diagnostic probabilities." },
      { name: "Module 4: Diagnostic Review Workstation", description: "Renders interactive heatmaps, probability confidence, and diagnostic draft reports." }
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
    thumbnail: "/images/projects/ai-chatbot.jpg",
    status: "Available",
    createdAt: "2026-10-28T10:00:00.000Z",
    updatedAt: "2026-11-04T10:00:00.000Z"
  },
  {
    id: "AMAI002",
    projectCode: "AMAI002",
    domainCode: "AMAI",
    domainName: "Artificial Intelligence",
    slug: "ai-chatbot",
    title: "AI Chatbot: Context-Aware Conversational Assistant with Vector Retrieval",
    category: "Artificial Intelligence",
    tagline: "Retrieval-Augmented Generation (RAG), ChromaDB Vector Index & Conversational Memory",
    description: "Enterprise domain question-answering assistant integrating dense vector search with large language models to answer complex queries strictly from verified PDF handbooks.",
    abstract: "Traditional chatbots suffer from hallucinated answers and poor domain precision. This project constructs an enterprise-grade Retrieval-Augmented Generation (RAG) assistant. Institutional documentation is chunked, converted into dense semantic vectors using OpenAI/HuggingFace embeddings, and indexed in ChromaDB. User queries trigger vector similarity searches, passing top-k chunks into a structured prompt.",
    problemStatement: "Hallucinations and outdated knowledge in generic customer-service language models.",
    proposedSolution: "A secure RAG architecture ensuring LLM answers cite verifiable source chunks from institutional knowledge repositories.",
    techStack: ["LangChain", "LLMs", "Vector DB (ChromaDB)", "Next.js", "Python FastAPI", "Docker"],
    features: [
      "Semantic Hybrid Vector Retrieval with Cosine Similarity Filtering",
      "Dynamic Conversational Memory with Context Summarization Buffer",
      "Source Citation Footnotes Linking Answers to Exact PDF Page Numbers",
      "Admin Knowledge Base Upload Portal with Automated Chunk Ingestion",
      "Guardrail Filtering to Prevent Jailbreak and Off-Topic Query Exploits"
    ],
    modules: [
      { name: "Module 1: Document Ingestion & Chunking", description: "Splits PDFs into 500-token chunks with 50-token semantic overlap." },
      { name: "Module 2: Embedding Generation & Indexing", description: "Generates high-dimensional vectors and stores them in ChromaDB." },
      { name: "Module 3: Query Retrieval & Prompt Assembly", description: "Retrieves top-k relevant chunks and builds a grounded contextual prompt." },
      { name: "Module 4: Chat Interface & Source Verification", description: "Streams LLM token responses with verifiable source citations." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Setup Instructions",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/ai-chatbot.jpg",
    status: "Available",
    createdAt: "2026-10-29T10:00:00.000Z",
    updatedAt: "2026-11-04T10:00:00.000Z"
  },
  {
    id: "AMPH001",
    projectCode: "AMPH001",
    domainCode: "AMPH",
    domainName: "Web Application – PHP",
    slug: "ecommerce-platform",
    title: "E-Commerce Platform with Stripe Checkout & Merchant Portal",
    category: "Web Application – PHP",
    tagline: "PHP 8, MVC Architecture, Secure Payment Gateways & Inventory Control",
    description: "Robust transactional e-commerce platform built with PHP 8 and MySQL, featuring multi-vendor product catalogs, real-time stock deductions, order tracking, and Stripe webhook payment verification.",
    abstract: "Modern digital retail businesses require reliable, customizable e-commerce architectures that operate independently of closed SaaS vendor lock-in. This project builds a complete, high-concurrency e-commerce suite in PHP 8 following strict MVC software architecture principles. Features include CSRF-protected customer checkout, asynchronous inventory reservation, and Stripe webhook reconciliation.",
    problemStatement: "Costly merchant transaction fees and rigid customization restrictions imposed by closed third-party e-commerce platforms.",
    proposedSolution: "A fast, modular self-hosted PHP/MySQL e-commerce ecosystem with automated order tracking, merchant inventory alerts, and secure gateway integrations.",
    techStack: ["PHP 8.2", "MySQL", "JavaScript", "Stripe API", "Tailwind CSS", "Apache / Nginx", "Docker"],
    features: [
      "Clean MVC Architecture with Separation of Concerns",
      "Stripe Payment Gateway Integration with Cryptographic Webhook Verification",
      "Real-Time Inventory Reservation to Prevent Double-Selling During Sales",
      "Merchant Admin Portal with Sales Metrics, Customer CRM, and Invoice PDFs",
      "Dynamic Product Filtering by Category, Price Range, and Rating",
      "Secure Password Hashing via Argon2id and Prepared SQL Statements"
    ],
    modules: [
      { name: "Module 1: Product Catalog & Category Taxonomy", description: "Manages product attributes, variants, imagery, and search indexes." },
      { name: "Module 2: Shopping Cart & Session Checkout", description: "Calculates taxes, shipping fees, and initiates secure payment intents." },
      { name: "Module 3: Stripe Webhook & Order Dispatch", description: "Processes payment receipts and updates fulfillment tracking statuses." },
      { name: "Module 4: Merchant Administration Dashboard", description: "Provides financial graphs, low-stock warnings, and order management." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Database SQL Dumps",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/ecommerce-platform.jpg",
    status: "Available",
    createdAt: "2026-10-30T10:00:00.000Z",
    updatedAt: "2026-11-04T10:00:00.000Z"
  },
  {
    id: "AMAD001",
    projectCode: "AMAD001",
    domainCode: "AMAD",
    domainName: "Android – Java",
    slug: "offline-first-disaster-emergency-mesh",
    title: "Off-Grid Disaster Emergency Relief & Mesh Communication Mobile Application",
    category: "Android – Java",
    tagline: "Android Java, Bluetooth Low Energy (BLE), Wi-Fi Direct Mesh & Offline GIS Mapping",
    description: "Decentralized disaster communication application built in native Android Java, allowing survivors and search-and-rescue squads to exchange SOS distress signals and GPS pins without cellular connectivity.",
    abstract: "Natural disasters (hurricanes, earthquakes, floods) frequently incapacitate cellular towers and municipal internet infrastructure. This project presents an offline-first emergency mesh communication system built in native Android Java. Devices discover nearby peers using Bluetooth Low Energy (BLE) advertisements and Wi-Fi Direct, forming an opportunistic ad-hoc mesh network.",
    problemStatement: "Total communication blackout during catastrophic infrastructure failure, stranding survivors without cellular signal.",
    proposedSolution: "A store-and-forward peer-to-peer mobile mesh network on Android devices that relays encrypted SOS packets hop-by-hop until reaching emergency first responders.",
    techStack: ["Java", "Android SDK", "Bluetooth Low Energy (BLE)", "Wi-Fi Direct", "SQLite / Room DB", "Leaflet / OsmDroid"],
    features: [
      "Zero-Internet Multi-Hop Mesh Relay via BLE and Wi-Fi Direct Protocols",
      "One-Touch Emergency SOS Broadcast with Offline GPS Coordinate Encoding",
      "Triage Medical Status Selector (Red: Critical, Yellow: Urgent, Green: Minor)",
      "Offline Vector Map Caching with Search and Rescue Waypoint Markers",
      "Cryptographically Signed Packet Forwarding to Prevent False Alarms",
      "Low-Power Ambient Battery Optimization for Multi-Day Survival Scenarios"
    ],
    modules: [
      { name: "Module 1: Peer Discovery & Mesh Linkage", description: "Scans for surrounding devices and negotiates peer-to-peer data channels." },
      { name: "Module 2: SOS Packet Serialization & Cryptography", description: "Packages vitals, timestamp, and location into compact binary payloads." },
      { name: "Module 3: Hop-by-Hop Store-and-Forward Router", description: "Buffers packets locally and relays them to newly encountered peer nodes." },
      { name: "Module 4: Tactical Map & Responder HUD", description: "Renders survivor triage clusters on offline topography layers." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Android Studio Project",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/student-attendance.jpg",
    status: "Available",
    createdAt: "2026-10-31T10:00:00.000Z",
    updatedAt: "2026-11-04T10:00:00.000Z"
  },
  {
    id: "AMCC001",
    projectCode: "AMCC001",
    domainCode: "AMCC",
    domainName: "Cloud Computing – Python/Java",
    slug: "serverless-microservices-autoscaling-kubernetes",
    title: "Cloud-Native Serverless Workflow Engine with Dynamic Auto-Scaling on Kubernetes",
    category: "Cloud Computing – Python/Java",
    tagline: "KEDA Event-Driven Autoscaling, OpenTelemetry Tracing, Istio Service Mesh & Docker",
    description: "Production-ready cloud microservices orchestration platform running on Kubernetes, featuring event-driven autoscaling (0 to N replicas), distributed tracing, and automated canary deployments.",
    abstract: "Modern cloud architectures struggle with over-provisioned idle compute costs during off-peak hours and severe latency spikes during unexpected user traffic surges. This project builds a cloud-native event-driven microservices platform on Kubernetes using KEDA, Istio, and OpenTelemetry. Microservices automatically scale down to zero replicas during quiet intervals.",
    problemStatement: "Prohibitive cloud infrastructure costs from fixed server allocations and lack of distributed tracing across asynchronous microservices.",
    proposedSolution: "A Kubernetes serverless architecture with event-driven scaling, service mesh mutual TLS, and sub-second distributed trace telemetry.",
    techStack: ["Kubernetes", "Docker", "Python", "Java", "KEDA", "Istio", "Prometheus", "Grafana", "Helm"],
    features: [
      "Scale-to-Zero and Instant Burst Scaling with KEDA & RabbitMQ/Kafka Triggers",
      "End-to-End Distributed Request Tracing with OpenTelemetry and Jaeger",
      "Automated Canary Traffic Splitting (90/10) via Istio VirtualServices",
      "Prometheus & Grafana Observability Dashboards with Golden Signals Telemetry",
      "Automated Infrastructure-as-Code Provisioning via Helm Charts and Terraform",
      "Multi-Tenant Namespace Resource Quotas & Network Isolation Policies"
    ],
    modules: [
      { name: "Module 1: Microservice Container Packaging", description: "Builds lightweight multi-stage Docker containers with non-root security contexts." },
      { name: "Module 2: Event-Driven Autoscaler (KEDA)", description: "Monitors message queue depths to dynamically scale pod replicas from 0 to 50." },
      { name: "Module 3: Service Mesh & mTLS Gateway", description: "Enforces mutual TLS encryption and intelligent traffic routing rules via Istio." },
      { name: "Module 4: Observability & Chaos Telemetry", description: "Gathers latency percentiles and simulates node failures to verify fault tolerance." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Helm & Kubernetes YAMLs",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/ecommerce-platform.jpg",
    status: "Available",
    createdAt: "2026-11-01T10:00:00.000Z",
    updatedAt: "2026-11-04T10:00:00.000Z"
  },
  {
    id: "AMML001",
    projectCode: "AMML001",
    domainCode: "AMML",
    domainName: "Machine Learning – Python",
    slug: "realtime-financial-fraud-detection",
    title: "Graph Neural Network & XGBoost Hybrid for Real-Time Financial Fraud Ring Detection",
    category: "Machine Learning – Python",
    tagline: "PyTorch Geometric, Relational Graph Convolution (R-GCN), Neo4j & Kafka Pipeline",
    description: "Enterprise fraud detection pipeline combining tabular gradient boosting with Graph Neural Networks (GNN) to uncover organized synthetic identity rings and laundering chains in sub-100ms.",
    abstract: "Organized financial fraud syndicates exploit traditional tabular machine learning systems by distributing transactions across dozens of seemingly unrelated accounts. This project engineers a hybrid Graph Neural Network and XGBoost fraud detection framework. Transaction networks are structured as heterogeneous graphs in Neo4j and processed using Relational Graph Convolutional Networks (R-GCN) in PyTorch Geometric.",
    problemStatement: "Coordinated fraud rings bypass traditional single-transaction anomaly detection by splitting amounts across colluding mule accounts.",
    proposedSolution: "A hybrid model fusing local tabular features (XGBoost) with deep graph topological embeddings (PyTorch Geometric) to detect collusive subgraphs in under 100 milliseconds.",
    techStack: ["Python 3.11", "PyTorch Geometric", "XGBoost", "Neo4j", "Apache Kafka", "FastAPI", "Next.js"],
    features: [
      "Heterogeneous Transaction Graph Construction with User, Account, and Device Nodes",
      "Relational Graph Convolutional Network (R-GCN) Neighbor Aggregation",
      "XGBoost Gradient Boosting on 70+ Tabular Velocity & Behavioral Features",
      "Real-Time Kafka Streaming Ingestion with Sub-100ms Inference Latency",
      "Interactive Fraud Ring Subgraph Visualizer with Node Risk Color-Coding",
      "Benchmarked on Real-World Credit Card & Financial AML Datasets"
    ],
    modules: [
      { name: "Module 1: Streaming Ingestion & Graph Loader", description: "Consumes transaction events from Kafka and updates Neo4j graph topologies." },
      { name: "Module 2: Graph Embedding Generator", description: "Extracts structural topological vectors using PyTorch Geometric R-GCN layers." },
      { name: "Module 3: Hybrid Fusion Classifier", description: "Combines graph embeddings with tabular XGBoost probability scores." },
      { name: "Module 4: Fraud Investigator Console", description: "Renders interactive node link diagrams and enables 1-click account freezes." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Docker Compose Setup",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/ai-chatbot.jpg",
    status: "Available",
    createdAt: "2026-11-02T10:00:00.000Z",
    updatedAt: "2026-11-04T10:00:00.000Z"
  }
];

/**
 * Read projects from local persistent storage or initialize with fallback
 */
export function readLocalProjects(): Project[] {
  try {
    if (fs.existsSync(PROJECTS_FILE)) {
      const raw = fs.readFileSync(PROJECTS_FILE, "utf-8");
      const list = JSON.parse(raw);
      if (Array.isArray(list) && list.length > 0) {
        return list;
      }
    }
  } catch (err) {
    console.warn("[PROJECTS] Error reading projects-store.json:", err);
  }

  // Initialize store if missing or empty
  writeLocalProjects(INITIAL_PROJECTS);
  return INITIAL_PROJECTS;
}

/**
 * Write projects atomically to local persistent storage
 */
export function writeLocalProjects(projects: Project[]): void {
  try {
    const dir = path.dirname(PROJECTS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), "utf-8");
  } catch (err) {
    console.error("[PROJECTS] Error writing projects-store.json:", err);
  }
}

/**
 * Get all 16 official technical domains with dynamic project counts
 */
export function getAllDomains(): TechnicalDomainWithCount[] {
  const projects = readLocalProjects();
  return TECHNICAL_DOMAINS.map((domain) => {
    const count = projects.filter(
      (p) =>
        (p.domainCode && p.domainCode.toUpperCase() === domain.code.toUpperCase()) ||
        (p.category && p.category.toLowerCase().trim() === domain.name.toLowerCase().trim())
    ).length;
    return {
      ...domain,
      projectCount: count
    };
  });
}

/**
 * Get a specific domain by domain code (e.g. "AMPY")
 */
export function getDomainByCode(code: string): TechnicalDomainWithCount | null {
  if (!code) return null;
  const upper = code.trim().toUpperCase();
  const domains = getAllDomains();
  return domains.find((d) => d.code === upper || d.slug.toUpperCase() === upper) || null;
}

/**
 * Get all projects currently in repository
 */
export function getAllProjects(): Project[] {
  return readLocalProjects();
}

/**
 * Get projects belonging strictly to a specific technical domain
 */
export function getProjectsByDomain(domainCode: string): Project[] {
  if (!domainCode) return [];
  const upper = domainCode.trim().toUpperCase();
  const domain = TECHNICAL_DOMAINS.find((d) => d.code === upper);
  const projects = readLocalProjects();

  return projects.filter((p) => {
    if (p.domainCode && p.domainCode.toUpperCase() === upper) return true;
    if (domain && p.category && p.category.toLowerCase().trim() === domain.name.toLowerCase().trim()) return true;
    return false;
  });
}

/**
 * Find project by Project Code, Slug, or ID
 */
export function findProject(identifier: string): Project | null {
  if (!identifier) return null;
  const trimmed = identifier.trim();
  const upper = trimmed.toUpperCase();
  const lower = trimmed.toLowerCase();
  const projects = readLocalProjects();

  // 1. Exact projectCode match (e.g. AMPY001)
  const byCode = projects.find((p) => p.projectCode && p.projectCode.toUpperCase() === upper);
  if (byCode) return byCode;

  // 2. Exact ID match
  const byId = projects.find((p) => p.id && p.id.toUpperCase() === upper);
  if (byId) return byId;

  // 3. Exact slug match
  const bySlug = projects.find((p) => p.slug && p.slug.toLowerCase() === lower);
  if (bySlug) return bySlug;

  // 4. Normalized matching
  const norm = lower.replace(/[^a-z0-9]/g, "");
  const byNorm = projects.find((p) => {
    const pCodeNorm = (p.projectCode || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const pIdNorm = (p.id || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const pSlugNorm = (p.slug || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const pTitleNorm = (p.title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    return pCodeNorm === norm || pIdNorm === norm || pSlugNorm === norm || pTitleNorm === norm;
  });
  if (byNorm) return byNorm;

  return null;
}

/**
 * Generate next available sequential project code: DOMAINCODE + 3-digit sequential number
 * Examples: AMPY001, AMPY002, AMJV001, AMDS001, AMML001
 * Sequential numbering is maintained independently for each domain.
 */
export function generateNextProjectCode(domainCode: string): string {
  const upper = domainCode.trim().toUpperCase();
  const existing = getProjectsByDomain(upper);

  let maxSeq = 0;
  const codeRegex = new RegExp(`^${upper}(\\d+)$`, "i");

  for (const proj of existing) {
    const code = proj.projectCode || proj.id;
    const match = code.match(codeRegex);
    if (match) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num > maxSeq) {
        maxSeq = num;
      }
    }
  }

  const nextSeq = maxSeq + 1;
  const nextCode = `${upper}${String(nextSeq).padStart(3, "0")}`;

  // Double check uniqueness across all projects
  const allProjects = readLocalProjects();
  if (allProjects.some((p) => (p.projectCode || p.id).toUpperCase() === nextCode.toUpperCase())) {
    // If collision, increment until unique
    let probe = nextSeq + 1;
    while (allProjects.some((p) => (p.projectCode || p.id).toUpperCase() === `${upper}${String(probe).padStart(3, "0")}`)) {
      probe++;
    }
    return `${upper}${String(probe).padStart(3, "0")}`;
  }

  return nextCode;
}

/**
 * Add a new project under one of the 16 official technical domains
 */
export async function createProject(data: {
  domainCode: string;
  title: string;
  tagline?: string;
  description: string;
  abstract?: string;
  problemStatement?: string;
  proposedSolution?: string;
  techStack?: string[];
  features?: string[];
  modules?: { name: string; description: string }[];
  documentationIncluded?: string[];
  level?: "UG Final Year" | "PG / M.Tech" | "Diploma / Mini Project";
  year?: string;
  featured?: boolean;
  thumbnail?: string;
}): Promise<Project> {
  const domain = getDomainByCode(data.domainCode);
  if (!domain) {
    throw new Error(`Invalid technical domain code: ${data.domainCode}. Must be one of the official 16 domains.`);
  }

  const projectCode = generateNextProjectCode(domain.code);
  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const newProject: Project = {
    id: projectCode,
    projectCode,
    domainCode: domain.code,
    domainName: domain.name,
    title: data.title.trim(),
    slug: slug || projectCode.toLowerCase(),
    category: domain.name as any,
    tagline: data.tagline?.trim() || `${domain.name} IEEE Implementation`,
    description: data.description.trim(),
    abstract: data.abstract?.trim() || data.description.trim(),
    problemStatement: data.problemStatement?.trim(),
    proposedSolution: data.proposedSolution?.trim(),
    techStack: data.techStack && data.techStack.length > 0 ? data.techStack : [domain.name.split(" ")[0]],
    features: data.features && data.features.length > 0 ? data.features : [
      "Complete Clean Working Source Code",
      "SRS and System Architecture Documentation",
      "High-Impact PPT Presentation for University Reviews",
      "Viva Voce Model Q&A Preparation Guide"
    ],
    modules: data.modules && data.modules.length > 0 ? data.modules : [
      { name: "Module 1: Data Ingestion & Setup", description: "Configuration, dependencies, and environment setup." },
      { name: "Module 2: Core Processing Engine", description: "Algorithm execution and model evaluation." },
      { name: "Module 3: User Interface & Verification", description: "Interactive testing dashboard and output validation." }
    ],
    documentationIncluded: data.documentationIncluded && data.documentationIncluded.length > 0 ? data.documentationIncluded : [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Setup Instructions",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: data.level || "UG Final Year",
    year: data.year || "2025-26 Edition",
    featured: Boolean(data.featured),
    thumbnail: data.thumbnail || "/images/projects/student-attendance.jpg",
    status: "Available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const list = readLocalProjects();
  list.unshift(newProject);
  writeLocalProjects(list);

  return newProject;
}

/**
 * Update an existing project
 */
export async function updateProject(projectCode: string, updates: Partial<Project>): Promise<Project | null> {
  const list = readLocalProjects();
  const upper = projectCode.trim().toUpperCase();
  const index = list.findIndex(
    (p) => (p.projectCode && p.projectCode.toUpperCase() === upper) || p.id.toUpperCase() === upper
  );

  if (index === -1) {
    return null;
  }

  const existing = list[index];
  const updated: Project = {
    ...existing,
    ...updates,
    id: existing.id,
    projectCode: existing.projectCode || existing.id,
    domainCode: updates.domainCode || existing.domainCode,
    domainName: updates.domainName || existing.domainName,
    updatedAt: new Date().toISOString()
  };

  list[index] = updated;
  writeLocalProjects(list);
  return updated;
}

