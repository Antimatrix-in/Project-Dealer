import { Project, ProjectCategory } from "@/types";

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "AI & Data Science",
  "Machine Learning",
  "Deep Learning",
  "Python Projects",
  "Java Projects",
  "Web Development",
  "Mobile App Development",
  "Cloud Computing",
  "Cyber Security",
  "Data Analytics"
];

export const PROJECTS_DATA: Project[] = [
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
    year: "Academic Year 2025-26",
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
    year: "Academic Year 2025-26",
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
    year: "Academic Year 2025-26",
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
      "Academic Defense PowerPoint Presentation (25 Slides)",
      "Executable Python Code with Virtualenv Setup",
      "Step-by-Step Installation & Video Execution Guide"
    ],
    level: "UG Final Year",
    year: "Academic Year 2025-26",
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
    year: "Academic Year 2025-26",
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
      "Full Academic Compliant Project Report",
      "Complete Software Requirements Specification (SRS)",
      "High-Definition PowerPoint Presentation (30+ Slides)",
      "Detailed Viva Voce Q&A Document covering WebSockets and CRDTs",
      "Production-ready Next.js & Node.js Source Code",
      "Complete Local Setup and Docker Deployment Manual"
    ],
    level: "UG Final Year",
    year: "Academic Year 2025-26",
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
      "Presentation Slides for Academic Defense (30 Slides)",
      "Complete Flutter and Dart Source Code with Android APK",
      "Hardware Testing & Ad-hoc Range Verification Guide"
    ],
    level: "UG Final Year",
    year: "Academic Year 2025-26",
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
    year: "Academic Year 2025-26",
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
      "Academic Defense PPT (30 Slides with Live Demonstration)",
      "Executable Detection Agent Source Code & Sample PCAPs"
    ],
    level: "UG Final Year",
    year: "Academic Year 2025-26",
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
    year: "Academic Year 2025-26",
    featured: true
  }
];
