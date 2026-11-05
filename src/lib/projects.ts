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
    slug: "amjv001-attribute-based-storage-supporting-secure-deduplication",
    title: "Attribute-Based Storage Supporting Secure Deduplication Of Encrypted Data In Cloud",
    category: "Java Projects",
    tagline: "Java Cloud Security & Enterprise Architecture • AMJV001",
    description: "An enterprise Java implementation of 'Attribute-Based Storage Supporting Secure Deduplication Of Encrypted Data In Cloud' featuring robust security protocols, modular services, and comprehensive IEEE documentation.",
    abstract: "This project implements 'Attribute-Based Storage Supporting Secure Deduplication Of Encrypted Data In Cloud' using enterprise Java architecture. Cloud computing and distributed systems demand provable confidentiality, access control, and storage verification. Our framework integrates standardized cryptographic primitives, client-server service orchestration, and rigorous performance benchmarking. Experimental results demonstrate minimal computational overhead, high throughput, and robust defense against security adversaries in academic and industrial evaluations.",
    problemStatement: "Conventional architectures in the domain of cloud storage suffer from vulnerability to eavesdropping, untrusted storage nodes, and computational bottlenecks during duplicate ciphertext detection.",
    proposedSolution: "A resilient Java software platform utilizing ciphertext-policy attribute-based encryption (CP-ABE), client-side deduplication token generation, and automated integrity validation.",
    techStack: ["Java 17", "Spring Boot 3", "Bouncy Castle Crypto API", "Hibernate / JPA", "MySQL", "Docker"],
    features: [
      "Attribute-Based Encryption (CP-ABE) Access Control Mechanism",
      "Secure Deduplication Protocol for Zero-Knowledge Redundant Block Pruning",
      "Client-Side Proof of Ownership Token Generation",
      "Dynamic User Attribute Revocation and Re-Encryption",
      "Interactive Java Spring Boot Cloud Storage Dashboard",
      "Complete IEEE Project Documentation and SRS Included"
    ],
    modules: [
      { name: "Module 1: User & Key Management Authority", description: "Generates public/private key pairs and manages attribute-based credentials." },
      { name: "Module 2: Data Chunking, Hashing & Encryption", description: "Splits uploaded files into discrete blocks, computes SHA/Merkle roots, and encrypts payloads." },
      { name: "Module 3: Deduplication Token Verification Engine", description: "Verifies cross-user file ownership without revealing plaintext contents to cloud servers." },
      { name: "Module 4: Secure Cloud Storage & Management Console", description: "Provides intuitive web portal for auditing logs, user revocation, and deduplication reports." }
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
    slug: "amcy001-a-multi-order-distributed-hosvd-incremental-computing",
    title: "A Multi-Order Distributed HOSVD with Its Incremental Computing for Big Services in Cyber-Physical-Social Systems",
    category: "Cyber Security",
    tagline: "Distributed Tensor HOSVD & Big Service Decomposition • AMCY001",
    description: "An advanced cyber security implementation of 'A Multi-Order Distributed HOSVD with Its Incremental Computing for Big Services in Cyber-Physical-Social Systems' featuring mathematical verification, modular defense services, and comprehensive IEEE documentation.",
    abstract: "This project implements 'A Multi-Order Distributed HOSVD with Its Incremental Computing for Big Services in Cyber-Physical-Social Systems' within the domain of Cyber-Physical-Social Systems (CPSS) and distributed cyber security. Modern cyber-physical infrastructures face complex threats spanning sensor tampering, unauthorized data access, and latency degradation. We develop a rigorous computational framework incorporating formalized security theorems, robust telemetry pipelines, and incremental verification models. Comprehensive empirical evaluations confirm strong threat resilience, minimal computational overhead, and deterministic quality-of-service guarantees suitable for university engineering evaluations.",
    problemStatement: "Conventional static security models applied to big services in CPSS fail to accommodate high-dimensional telemetry bursts, dynamic topology shifts, and zero-day attack vectors.",
    proposedSolution: "A resilient software pipeline utilizing distributed incremental tensor decomposition (HOSVD), attribute-enforced trust mechanisms, and automated risk scoring.",
    techStack: ["Python", "NumPy", "SciPy", "TensorLy", "PySpark", "Matplotlib", "Docker"],
    features: [
      "Multi-Order Distributed High-Order Singular Value Decomposition (HOSVD)",
      "Incremental Computing Engine for Streaming Big Service Telemetry",
      "Robust Anomaly Classification across Cyber-Physical-Social Topologies",
      "Scalable PySpark / Distributed Processing Pipeline",
      "Interactive Performance Visualizer Contrasting Decomposition Latency and Accuracy",
      "Complete University Final Year Engineering Deliverables & IEEE Base Paper"
    ],
    modules: [
      { name: "Module 1: CPSS Telemetry Ingestion & Preprocessing", description: "Standardizes multi-modal streaming data, handles noise, and normalizes feature dimensions." },
      { name: "Module 2: Distributed HOSVD Tensor Engine", description: "Executes core tensor decomposition isolating anomalous behaviors and invariant structures." },
      { name: "Module 3: Incremental Updating & Security Classifier", description: "Updates decomposition incrementally without recomputing entire history." },
      { name: "Module 4: Performance Analytics & Verification Dashboard", description: "Provides comprehensive visualizations, alert logs, and system performance telemetry." }
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
    createdAt: "2026-10-23T10:00:00.000Z",
    updatedAt: "2026-11-04T10:00:00.000Z"
  },
  {
    id: "AMDJ001",
    projectCode: "AMDJ001",
    domainCode: "AMDJ",
    domainName: "Django – Python",
    slug: "amdj001-airline-management-system",
    title: "Airline Management System",
    category: "Django – Python",
    tagline: "Full-Stack Django Architecture & Role-Based Workflows • AMDJ001",
    description: "A production-ready full-stack Django web application implementing 'Airline Management System' with clean MVC architecture, relational database models, and role-based access control.",
    abstract: "This project implements 'Airline Management System' utilizing the high-level Python Django web framework. Web applications in this domain require structured data persistence, robust user session authentication, automated form validation, and responsive user interfaces. The system features an MVC architectural design, ORM data modeling, CSRF-protected request pipelines, and comprehensive administrative reporting. Rigorous end-to-end verification confirms high usability, data integrity, and complete deliverable compliance for final year engineering reviews.",
    problemStatement: "Conventional manual airline reservation, seat allocation, and flight dispatch workflows suffer from double-booking risks, lack of real-time flight telemetry, and slow customer notifications.",
    proposedSolution: "A modular Django web platform featuring relational ORM modeling, granular user authorization (Passenger, Flight Attendant, Dispatcher, Administrator), and automated ticket reporting dashboards.",
    techStack: ["Python 3.10", "Django 5.0", "Django REST Framework", "ReportLab PDF", "PostgreSQL", "Tailwind CSS"],
    features: [
      "Real-Time Flight Search, Seat Availability Matrix, and Ticket Booking",
      "Dynamic Schedule Management & Flight Crew Allocation Console",
      "Automated PDF Boarding Pass Generation with Verifiable QR Codes",
      "Role-Based Access Control (Passenger, Staff, Admin)",
      "Secure Transaction History and Booking Cancellation Workflows",
      "Complete University Final Year Project Deliverables & Base Paper"
    ],
    modules: [
      { name: "Module 1: User Authentication & Passenger Portal", description: "Handles registration, session management, and passenger profile management." },
      { name: "Module 2: Flight Catalog & Schedule Matrix", description: "Renders searchable flights with dynamic pricing and seat availability calculations." },
      { name: "Module 3: Reservation, Booking & Boarding Pass Engine", description: "Manages seat reservation logic, ticket dispatch, and automated PDF boarding pass generation." },
      { name: "Module 4: Flight Operations & Admin Console", description: "Provides airline operational summaries, route analytics, and crew scheduling controls." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Django Setup Instructions",
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
    slug: "amds001-a-machine-learning-optimization-framework-early-diagnosis",
    title: "A Machine Learning and Optimization Framework for the Early Diagnosis of Bovine Respiratory Disease",
    category: "Data Science – Python",
    tagline: "Predictive Data Science & Feature Engineering • AMDS001",
    description: "An advanced data science research solution implementing 'A Machine Learning and Optimization Framework for the Early Diagnosis of Bovine Respiratory Disease' with end-to-end Python pipelines, automated feature engineering, and statistical validation.",
    abstract: "This project implements 'A Machine Learning and Optimization Framework for the Early Diagnosis of Bovine Respiratory Disease' using state-of-the-art computational algorithms in Python. High-dimensional biomedical datasets require robust preprocessing, noise filtering, feature selection, and cross-validated statistical learning. The proposed system features reproducible data pipelines, loss minimization, automated hyperparameter tuning, and interpretable metric dashboards. Rigorous empirical evaluations on benchmark datasets demonstrate superior predictive accuracy, low computational latency, and complete compliance with final year engineering review criteria.",
    problemStatement: "Conventional veterinary diagnostic methods for bovine respiratory disease suffer from delayed laboratory response, subjective symptom assessments, and high livestock mortality.",
    proposedSolution: "A multi-modal feature engineering pipeline combining metaheuristic feature selection, ensemble gradient boosting (XGBoost/LightGBM), and real-time herd telemetry dashboards.",
    techStack: ["Python 3.10", "Pandas", "NumPy", "Scikit-Learn", "XGBoost", "LightGBM", "Seaborn", "Streamlit"],
    features: [
      "Early Diagnostic Predictive Modeling with Multi-Modal Sensor Observations",
      "Metaheuristic Optimization for Covariate Feature Selection",
      "Rigorous Cross-Validation with ROC-AUC & Precision-Recall Metrics",
      "Explainable AI (SHAP) for Feature Importance Attributions",
      "Interactive Streamlit Prediction & Risk Stratification Dashboard",
      "Complete University Final Year Project Deliverables & Base Paper"
    ],
    modules: [
      { name: "Module 1: Veterinary Telemetry Ingestion & Cleaning", description: "Aggregates temperature, vital signs, and audio bioacoustics, handling sensor noise and missing records." },
      { name: "Module 2: Feature Selection & Metaheuristic Optimization", description: "Isolates the most predictive biomarkers minimizing collinearity and dimensionality." },
      { name: "Module 3: Diagnostic Classification Engine", description: "Trains tuned LightGBM and Random Forest classifiers with stratified cross-validation." },
      { name: "Module 4: Risk Analytics & Herd Dashboard", description: "Renders patient-level risk curves, SHAP explanation plots, and downloadable summary sheets." }
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
    slug: "amdl001-a-bayesian-deep-learning-approach-with-convolutional-feature",
    title: "A Bayesian Deep Learning Approach With Convolutional Feature Engineering to Discriminate Cyber-Physical Intrusions in Smart Grid Systems",
    category: "Deep Learning",
    tagline: "Deep Neural Threat Intelligence & Anomaly Classification • AMDL001",
    description: "An advanced engineering solution implementing 'A Bayesian Deep Learning Approach With Convolutional Feature Engineering to Discriminate Cyber-Physical Intrusions in Smart Grid Systems' with state-of-the-art deep neural networks, modular pipelines, and comprehensive IEEE documentation.",
    abstract: "This project implements 'A Bayesian Deep Learning Approach With Convolutional Feature Engineering to Discriminate Cyber-Physical Intrusions in Smart Grid Systems' utilizing state-of-the-art deep learning architectures in PyTorch. Complex high-dimensional data streams require robust feature representations, adaptive attention mechanisms, and calibrated loss optimization. The framework integrates automated preprocessing, transfer learning backbones, GPU-accelerated inference pipelines, and interpretable metric visualizers. Comprehensive empirical validation on standardized benchmark datasets confirms superior generalization, computational efficiency, and complete alignment with university final year engineering requirements.",
    problemStatement: "Conventional heuristic models in the domain of 'A Bayesian Deep Learning Approach With Convolutional Feature Engineering to Discriminate Cyber-Physical Intrusions in Smart Grid Systems' suffer from manual feature engineering overhead, limited representation capacity, and vulnerability to distribution shifts.",
    proposedSolution: "An end-to-end deep learning framework incorporating multi-scale representation learning, regularized optimization, and interactive evaluation dashboards.",
    techStack: ["Python 3.10", "PyTorch 2.2", "Torchvision", "OpenCV", "Scikit-Learn", "Matplotlib", "Docker"],
    features: [
      "State-of-the-Art Deep Neural Network Architecture Built with PyTorch",
      "GPU-Accelerated Training and Low-Latency CPU/Edge Inference Support",
      "Comprehensive Evaluation on Benchmark Datasets (Accuracy, F1, ROC-AUC)",
      "Explainable AI (Grad-CAM / Attention Maps) for Model Transparency",
      "Interactive Web Interface for Live Testing, Upload, and Demonstrations",
      "Complete IEEE Project Documentation and Viva Voce Preparation Package"
    ],
    modules: [
      { name: "Module 1: Telemetry Stream Ingestion & Feature Engineering", description: "Aggregates multi-node sensor telemetry, standardizes packet dynamics, and removes noise." },
      { name: "Module 2: Bayesian Deep Feature Extractor", description: "Quantifies epistemic and aleatoric uncertainties via variational inference layers." },
      { name: "Module 3: Adversarial Detection & Anomaly Classifier", description: "Identifies false data injections and cyber-physical intrusions with high precision." },
      { name: "Module 4: Threat Intelligence & SCADA Console", description: "Renders real-time security risk alerts, ROC-AUC curves, and defensive action triggers." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML & Neural Architecture Diagrams (Block, Dataflow, Sequence)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean PyTorch Source Code with Pretrained Weights & Run Scripts",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/ai-chatbot.jpg",
    status: "Available",
    createdAt: "2026-10-02T10:00:00.000Z",
    updatedAt: "2026-11-05T10:00:00.000Z"
  },
  {
    id: "AMDL002",
    projectCode: "AMDL002",
    domainCode: "AMDL",
    domainName: "Deep Learning",
    slug: "amdl002-a-deep-learning-based-brain-age-prediction-model-for-preterm",
    title: "A Deep Learning-Based Brain Age Prediction Model for Preterm Infants via Neonatal MRI",
    category: "Deep Learning",
    tagline: "Biomedical Deep Learning & Computer-Aided Diagnosis • AMDL002",
    description: "An advanced engineering solution implementing 'A Deep Learning-Based Brain Age Prediction Model for Preterm Infants via Neonatal MRI' with state-of-the-art deep neural networks, modular pipelines, and comprehensive IEEE documentation.",
    abstract: "This project implements 'A Deep Learning-Based Brain Age Prediction Model for Preterm Infants via Neonatal MRI' utilizing state-of-the-art deep learning architectures in PyTorch. Complex high-dimensional data streams require robust feature representations, adaptive attention mechanisms, and calibrated loss optimization. The framework integrates automated preprocessing, transfer learning backbones, GPU-accelerated inference pipelines, and interpretable metric visualizers. Comprehensive empirical validation on standardized benchmark datasets confirms superior generalization, computational efficiency, and complete alignment with university final year engineering requirements.",
    problemStatement: "Conventional heuristic models in the domain of 'A Deep Learning-Based Brain Age Prediction Model for Preterm Infants via Neonatal MRI' suffer from manual feature engineering overhead, limited representation capacity, and vulnerability to distribution shifts.",
    proposedSolution: "An end-to-end deep learning framework incorporating multi-scale representation learning, regularized optimization, and interactive evaluation dashboards.",
    techStack: ["Python 3.10", "PyTorch 2.2", "Torchvision", "OpenCV", "Scikit-Learn", "Matplotlib", "Docker"],
    features: [
      "State-of-the-Art Deep Neural Network Architecture Built with PyTorch",
      "GPU-Accelerated Training and Low-Latency CPU/Edge Inference Support",
      "Comprehensive Evaluation on Benchmark Datasets (Accuracy, F1, ROC-AUC)",
      "Explainable AI (Grad-CAM / Attention Maps) for Model Transparency",
      "Interactive Web Interface for Live Testing, Upload, and Demonstrations",
      "Complete IEEE Project Documentation and Viva Voce Preparation Package"
    ],
    modules: [
      { name: "Module 1: Dataset Preprocessing & Data Augmentation", description: "Standardizes input distributions, applies affine transformations, and splits into stratified folds." },
      { name: "Module 2: Deep Convolutional & Attention Backbone", description: "Processes input features through pre-trained deep neural layers for invariant representation." },
      { name: "Module 3: Loss Formulation & Optimization", description: "Trains the model using task-specific loss functions with cosine annealing learning rate schedules." },
      { name: "Module 4: Performance Evaluation & Interactive Dashboard", description: "Calculates accuracy, F1-score, Grad-CAM heatmaps, and provides an interactive testing console." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML & Neural Architecture Diagrams (Block, Dataflow, Sequence)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean PyTorch Source Code with Pretrained Weights & Run Scripts",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/plant-disease.jpg",
    status: "Available",
    createdAt: "2026-10-03T10:00:00.000Z",
    updatedAt: "2026-11-05T10:00:00.000Z"
  },
  {
    id: "AMAI001",
    projectCode: "AMAI001",
    domainCode: "AMAI",
    domainName: "Artificial Intelligence",
    slug: "amai001-a-comprehensive-review-of-harmonic-issues-and-estimation",
    title: "A Comprehensive Review of Harmonic Issues and Estimation Techniques in Power System Networks Based on Traditional and Artificial Intelligence Machine Learning",
    category: "Artificial Intelligence",
    tagline: "Artificial Intelligence IEEE Architecture • AMAI001",
    description: "An advanced engineering solution implementing 'A Comprehensive Review of Harmonic Issues and Estimation Techniques in Power System Networks Based on Traditional and Artificial Intelligence Machine Learning' featuring state-of-the-art artificial intelligence models, modular software pipelines, and complete IEEE documentation.",
    abstract: "This project implements 'A Comprehensive Review of Harmonic Issues and Estimation Techniques in Power System Networks Based on Traditional and Artificial Intelligence Machine Learning' within the domain of Artificial Intelligence and advanced machine reasoning. Modern engineering challenges demand adaptive intelligence, high-accuracy inference, and mathematically rigorous optimization. Our framework integrates automated data pipelines, state-of-the-art neural and algorithmic architectures, low-latency execution pipelines, and explainable visual analytics. Exhaustive empirical evaluations on standardized benchmark datasets demonstrate exceptional accuracy, minimal computational overhead, and provable robustness, fully aligned with university final year engineering project standards and academic publication criteria.",
    problemStatement: "Conventional heuristic methodologies addressing harmonic issues suffer from manual parameter tuning, poor generalization across distribution shifts, and excessive computational latency.",
    proposedSolution: "A robust artificial intelligence architecture integrating specialized feature encoders, adaptive loss optimization, and interactive demonstration dashboards.",
    techStack: ["Python 3.10", "MATLAB Engine / PySim", "NumPy", "SciPy", "Scikit-Learn", "Pandas"],
    features: [
      "Advanced Artificial Intelligence Architecture Built with Python / PyTorch",
      "GPU / Hardware Accelerated Training with Low-Latency Inference Pipeline",
      "Comprehensive Validation on Benchmark Datasets (Accuracy, F1-Score, ROC-AUC)",
      "Explainable AI and Interpretability Mechanisms for Model Verification",
      "Interactive Web-Based Demonstration Dashboard for Live Predictions",
      "Complete University Final Year Project Deliverables with IEEE Base Paper"
    ],
    modules: [
      { name: "Module 1: Telemetry & Benchmark Dataset Preprocessing", description: "Standardizes feature distributions, addresses missing values, and establishes stratified folds." },
      { name: "Module 2: Artificial Intelligence & Neural Core Engine", description: "Constructs domain-tailored neural and optimization layers for robust latent representation extraction." },
      { name: "Module 3: Model Calibration & Hyperparameter Tuning", description: "Executes systematic cross-validation, loss regularization, and convergence optimization." },
      { name: "Module 4: Performance Analytics & Web Demonstration Console", description: "Provides intuitive UI for interactive predictions, ROC-AUC metric plots, and IEEE audit logs." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML & Neural Architecture Diagrams (Block, Dataflow, Sequence)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Docker / Setup Scripts",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/cloud-storage.jpg",
    status: "Available",
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-11-05T10:00:00.000Z"
  },
  {
    id: "AMAI002",
    projectCode: "AMAI002",
    domainCode: "AMAI",
    domainName: "Artificial Intelligence",
    slug: "amai002-a-cross-lingual-hybrid-neural-network-with-interaction-en",
    title: "A Cross-Lingual Hybrid Neural Network With Interaction Enhancement for Grading Short-Answer Texts",
    category: "Artificial Intelligence",
    tagline: "Artificial Intelligence IEEE Architecture • AMAI002",
    description: "An advanced engineering solution implementing 'A Cross-Lingual Hybrid Neural Network With Interaction Enhancement for Grading Short-Answer Texts' featuring state-of-the-art artificial intelligence models, modular software pipelines, and complete IEEE documentation.",
    abstract: "This project implements 'A Cross-Lingual Hybrid Neural Network With Interaction Enhancement for Grading Short-Answer Texts' within the domain of Artificial Intelligence and advanced machine reasoning. Modern engineering challenges demand adaptive intelligence, high-accuracy inference, and mathematically rigorous optimization. Our framework integrates automated data pipelines, state-of-the-art neural and algorithmic architectures, low-latency execution pipelines, and explainable visual analytics. Exhaustive empirical evaluations on standardized benchmark datasets demonstrate exceptional accuracy, minimal computational overhead, and provable robustness, fully aligned with university final year engineering project standards and academic publication criteria.",
    problemStatement: "Conventional heuristic methodologies addressing cross-lingual grading suffer from manual parameter tuning, poor generalization across distribution shifts, and excessive computational latency.",
    proposedSolution: "A robust artificial intelligence architecture integrating specialized feature encoders, adaptive loss optimization, and interactive demonstration dashboards.",
    techStack: ["Python 3.10", "PyTorch", "Scikit-Learn", "NumPy", "Pandas", "Matplotlib", "Docker"],
    features: [
      "Advanced Artificial Intelligence Architecture Built with Python / PyTorch",
      "GPU / Hardware Accelerated Training with Low-Latency Inference Pipeline",
      "Comprehensive Validation on Benchmark Datasets (Accuracy, F1-Score, ROC-AUC)",
      "Explainable AI and Interpretability Mechanisms for Model Verification",
      "Interactive Web-Based Demonstration Dashboard for Live Predictions",
      "Complete University Final Year Project Deliverables with IEEE Base Paper"
    ],
    modules: [
      { name: "Module 1: Telemetry & Benchmark Dataset Preprocessing", description: "Standardizes feature distributions, addresses missing values, and establishes stratified folds." },
      { name: "Module 2: Artificial Intelligence & Neural Core Engine", description: "Constructs domain-tailored neural and optimization layers for robust latent representation extraction." },
      { name: "Module 3: Model Calibration & Hyperparameter Tuning", description: "Executes systematic cross-validation, loss regularization, and convergence optimization." },
      { name: "Module 4: Performance Analytics & Web Demonstration Console", description: "Provides intuitive UI for interactive predictions, ROC-AUC metric plots, and IEEE audit logs." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML & Neural Architecture Diagrams (Block, Dataflow, Sequence)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Docker / Setup Scripts",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/ai-chatbot.jpg",
    status: "Available",
    createdAt: "2026-10-02T10:00:00.000Z",
    updatedAt: "2026-11-05T10:00:00.000Z"
  },
  {
    id: "AMPH001",
    projectCode: "AMPH001",
    domainCode: "AMPH",
    domainName: "Web Application - PHP",
    slug: "amph001-web-based-graphical-password-authentication-system",
    title: "Web based Graphical Password Authentication System",
    category: "Web Application - PHP",
    tagline: "Cryptographic Web Security & Authentication System • AMPH001",
    description: "An enterprise PHP web application implementing 'Web based Graphical Password Authentication System' with clean MVC software architecture, relational MySQL database schemas, and complete IEEE project documentation.",
    abstract: "This project implements 'Web based Graphical Password Authentication System' utilizing enterprise PHP 8 and relational MySQL database infrastructure. Modern digital organizations require robust, low-latency web platforms that ensure rigorous transactional consistency, role-based security protocols, and intuitive user experiences. Our system adheres to standardized MVC software design patterns, incorporating prepared PDO statements to eliminate SQL injection vulnerabilities, CSRF token validation, and responsive mobile-first interfaces. Comprehensive testing under simulated operational loads confirms high data throughput, deterministic request handling, and complete alignment with university final year engineering project deliverables and IEEE academic standards.",
    problemStatement: "Conventional legacy workflows addressing 'Web based Graphical Password Authentication System' suffer from manual record keeping errors, decentralized data silos, security vulnerabilities, and lack of real-time administrative oversight.",
    proposedSolution: "A centralized web application engineered with PHP 8 and MySQL that delivers automated workflows, role-based access control, and real-time administrative dashboards.",
    techStack: ["PHP 8.2", "MySQL 8.0", "Argon2id & OpenSSL Crypto", "Apache / Nginx", "JavaScript", "HTML5 / CSS3", "Tailwind CSS"],
    features: [
      "Modern PHP 8 MVC Architecture with Clean Separation of Concerns",
      "Relational MySQL Schema with Foreign Key Integrity & Optimized Indexes",
      "Prepared PDO SQL Statements Defending Against Injection Vulnerabilities",
      "Role-Based Access Control (RBAC) with CSRF and XSS Security Protection",
      "Interactive Web Dashboard with Real-Time Filtering and Data Analytics",
      "Complete University Final Year Project Deliverables with IEEE Base Paper"
    ],
    modules: [
      { name: "Module 1: User Authentication & Role Hierarchy", description: "Authenticates user roles, protects sessions against CSRF/XSS, and enforces granular permissions." },
      { name: "Module 2: Core Data Processing & Entity Management", description: "Executes relational CRUD operations with prepared PDO SQL statements and relational constraints." },
      { name: "Module 3: Business Logic & Workflow Automation", description: "Coordinates task lifecycles, automated validation triggers, and notifications." },
      { name: "Module 4: Administrative Dashboard & Reporting Console", description: "Renders real-time telemetry, operational metrics, activity audit logs, and PDF/CSV export tools." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Database SQL Schema Dumps",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/network-monitor.jpg",
    status: "Available",
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-11-05T10:00:00.000Z"
  },
  {
    id: "AMAD001",
    projectCode: "AMAD001",
    domainCode: "AMAD",
    domainName: "Android – Java",
    slug: "amad001-codetracker-a-lightweight-approach-to-track-and-protect",
    title: "CodeTracker: A Lightweight Approach to Track and Protect Authorization Codes in SMS Messages",
    category: "Android – Java",
    tagline: "Mobile Threat Defense & Android Cryptographic Security • AMAD001",
    description: "A native Android Java mobile application implementing 'CodeTracker: A Lightweight Approach to Track and Protect Authorization Codes in SMS Messages' with modular architecture, robust SQLite / Room local storage, and comprehensive IEEE documentation.",
    abstract: "This project implements 'CodeTracker: A Lightweight Approach to Track and Protect Authorization Codes in SMS Messages' within the domain of native Android Java mobile computing and pervasive systems. Mobile devices demand low-power execution, responsive material user interfaces, resilient background services, and offline data persistence. Our framework is built using native Android SDK components, utilizing structured Activity / Fragment lifecycles, Room ORM SQLite database schemas, and asynchronous multi-threaded background workers. Comprehensive testing across diverse Android OS API levels confirms high frame-rate rendering, deterministic battery-conserving execution, and full alignment with university final year engineering requirements and IEEE base paper benchmarks.",
    problemStatement: "Conventional mobile architectures addressing SMS authorization codes suffer from lack of protection against malicious background interceptors, data leakage, and insecure credential exposure.",
    proposedSolution: "A native Android application utilizing device-level BroadcastReceivers, cryptographic token verification, and secure local storage to track and protect authorization codes.",
    techStack: ["Java 17", "Android SDK", "Android Studio", "Android Keystore & Cryptographic API", "SQLite / Room DB", "XML Layouts", "Retrofit"],
    features: [
      "Native Android Java Implementation Built with Android Studio & Modern SDK",
      "Responsive Material Design User Interface with Smooth Navigation Lifecycles",
      "Offline-First Data Architecture Using SQLite / Room Database Persistence",
      "Asynchronous Background Processing and Real-Time Push Notification Engine",
      "Robust Hardware Sensor & Location Integration (GPS / Camera / Accelerometer)",
      "Complete University Final Year Project Deliverables with IEEE Base Paper"
    ],
    modules: [
      { name: "Module 1: Telemetry Ingestion & Intercept Authority", description: "Monitors incoming SMS / application events using registered Android BroadcastReceivers." },
      { name: "Module 2: Threat Detection & Cryptographic Defense", description: "Executes cryptographic token verification and heuristic behavior analysis against malicious payloads." },
      { name: "Module 3: Emergency Dispatch & Notification Protocol", description: "Dispatches instant SOS distress alerts with encrypted location coordinates to pre-configured contacts." },
      { name: "Module 4: Security Telemetry & Configuration Console", description: "Renders security logs, threat detection statistics, and customizable permission controls." }
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Android Studio Project & Gradle Scripts",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/network-monitor.jpg",
    status: "Available",
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-11-05T10:00:00.000Z"
  },
  {
    id: "AMBD001",
    projectCode: "AMBD001",
    domainCode: "AMBD",
    domainName: "Big Data – Python / Java",
    slug: "ambd001-affirm-provably-forward-privacy-for-searchable-encryption",
    title: "AFFIRM: Provably Forward Privacy for Searchable Encryption in Cooperative Intelligent Transportation System",
    category: "Big Data – Python / Java",
    tagline: "Cryptographic Big Data Privacy & Cloud Access Control • AMBD001",
    description: "An enterprise distributed Big Data project implementing 'AFFIRM: Provably Forward Privacy for Searchable Encryption in Cooperative Intelligent Transportation System' using Apache Spark, Hadoop HDFS, Python, and Java ecosystems, complete with modular microservice pipeline design, distributed query optimization, and exhaustive IEEE academic documentation.",
    abstract: "This project implements 'AFFIRM: Provably Forward Privacy for Searchable Encryption in Cooperative Intelligent Transportation System' within the domain of Big Data engineering and high-throughput distributed computing. Modern enterprise and scientific infrastructures generate unprecedented volumes of semi-structured data requiring fault-tolerant distributed ingestion, parallel processing, and stringent security guarantees. Our system architecture leverages Apache Spark compute nodes and Hadoop Distributed File System (HDFS) storage, orchestrating parallel worker pipelines that minimize disk I/O bottlenecks. Empirical benchmark evaluations confirm resilient fault tolerance, linear horizontal scalability, and strict compliance with IEEE standard base paper methodologies for final year engineering deliverables.",
    problemStatement: "Traditional centralized architectures fail to satisfy the volume, velocity, and security requirements demanded by 'AFFIRM: Provably Forward Privacy for Searchable Encryption in Cooperative Intelligent Transportation System', resulting in high computational latency, single points of failure, and data exposure.",
    proposedSolution: "A horizontally scalable big data architecture combining Apache Spark, distributed Hadoop storage, and cryptographic data verification to deliver high-throughput, fault-tolerant execution for 'AFFIRM: Provably Forward Privacy for Searchable Encryption in Cooperative Intelligent Transportation System'.",
    techStack: ["Apache Spark", "Java Cryptography Architecture (JCA)", "Python 3.10", "Hadoop HDFS", "OpenSSL / PyCryptodome", "FastAPI"],
    features: [
      "Distributed Cluster Ingestion with Apache Spark and Hadoop HDFS Partitioning",
      "High-Throughput Parallel Data Processing with In-Memory Caching",
      "Strict Security, Privacy Preservation, and Cryptographic Data Integrity",
      "Scalable Microservice Architecture with Python 3.10 and Java 17 Interoperability",
      "Interactive Web Analytics Console with Real-Time Telemetry & Throughput Metrics",
      "Comprehensive University Final Year Deliverables Aligned with IEEE Guidelines"
    ],
    modules: [
      {"name": "Module 1: Big Data Partitioning & Distributed Storage", "description": "Ingests massive high-velocity data records into cluster nodes with fault-tolerant Hadoop HDFS replication."},
      {"name": "Module 2: Cryptographic Key Management & Access Authority", "description": "Generates hierarchical attribute authorizations, searchable encrypted indexes, and revocable identity tokens."},
      {"name": "Module 3: Outsourced Computation & Verifiable Decryption", "description": "Executes encrypted queries over cloud partitions without disclosing underlying plaintexts or search patterns."},
      {"name": "Module 4: Security Telemetry & Performance Dashboard", "description": "Evaluates encryption throughput, decryption overhead, query latency benchmarks, and breach prevention telemetry."}
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Spark & Hadoop Execution Scripts",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/network-monitor.jpg",
    status: "Available",
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-11-05T10:00:00.000Z"
  },
  {
    id: "AMIP001",
    projectCode: "AMIP001",
    domainCode: "AMIP",
    domainName: "Image Processing – Python",
    slug: "amip001-real-time-smile-detection-using-integrated-ml-model",
    title: "Real-time Smile Detection using Integrated ML Model",
    category: "Image Processing – Python",
    tagline: "Computer Vision & Facial Landmark Smile Classification • AMIP001",
    description: "An advanced real-time computer vision project implementing 'Real-time Smile Detection using Integrated ML Model' using OpenCV, Dlib facial landmark detectors, and integrated machine learning classifiers with IEEE base paper standards and interactive UI.",
    abstract: "This project implements 'Real-time Smile Detection using Integrated ML Model' within the domain of Image Processing using Python and Computer Vision. Facial expression recognition requires robust detection under varying lighting and pose conditions. Our framework uses OpenCV video capture pipelines, Dlib 68-point facial landmark geometry, and integrated machine learning models to detect subtle lip corner curvature changes in real-time. Benchmark evaluations show sub-30ms latency, high frame-rate throughput, and complete alignment with university final year engineering requirements.",
    problemStatement: "Traditional facial expression systems struggle with lighting variability, head rotation, and computational lag in real-time edge processing.",
    proposedSolution: "A lightweight facial landmark extraction pipeline coupled with an integrated machine learning classifier that tracks lip coordinates and computes dynamic curvature ratios at 60 FPS.",
    techStack: ["OpenCV", "Python 3.10", "Dlib", "Scikit-Learn", "NumPy", "Tkinter / CustomTkinter"],
    features: [
      "Real-Time 60 FPS Video Stream Ingestion and Facial Region Tracking",
      "68-Point Facial Landmark Localization with Lip Curvature Metric Extraction",
      "Integrated Machine Learning Classifier with High Sensitivity and Specificity",
      "Dynamic Calibration Adapting to Varying Ambient Lighting Conditions",
      "Interactive Real-Time Visual HUD Overlay and Metric Logging Dashboard",
      "Complete University Final Year Deliverables Aligned with IEEE Guidelines"
    ],
    modules: [
      {"name": "Module 1: Video Capture & Face Detection", "description": "Streams webcam video, normalizes illumination, and isolates face bounding boxes using Haar cascades and SSD."},
      {"name": "Module 2: Facial Landmark & Lip Coordinate Extraction", "description": "Extracts 68 facial landmarks and isolates oral contour coordinates (points 48-67)."},
      {"name": "Module 3: Feature Engineering & Integrated ML Classification", "description": "Computes normalized mouth width-to-height and corner elevation ratios, fed into an ensemble classifier."},
      {"name": "Module 4: Real-Time HUD & Analytics Dashboard", "description": "Overlays smile confidence percentage, logs emotion duration statistics, and generates session reports."}
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Python Source Code with Setup Instructions",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/network-monitor.jpg",
    status: "Available",
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-11-05T10:00:00.000Z"
  },
  {
    id: "AMCC001",
    projectCode: "AMCC001",
    domainCode: "AMCC",
    domainName: "Cloud Computing – Python / Java",
    slug: "amcc001-a-comprehensive-framework-for-migrating-to-zero-trust-architecture",
    title: "A Comprehensive Framework for Migrating to Zero Trust Architecture",
    category: "Cloud Computing – Python / Java",
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
    id: "AMDM001",
    projectCode: "AMDM001",
    domainCode: "AMDM",
    domainName: "Data Mining – Python / Java",
    slug: "amdm001-structured-ranking-method-based-feature-selection-in-data-mining",
    title: "Structured Ranking Method Based Feature Selection in Data Mining",
    category: "Data Mining – Python / Java",
    tagline: "High-Dimensional Feature Selection & Structured Ranking Algorithms • AMDM001",
    description: "An advanced Data Mining and statistical pattern discovery project implementing 'Structured Ranking Method Based Feature Selection in Data Mining' using Python, Scikit-Learn, and structured ranking optimizations with comprehensive IEEE documentation.",
    abstract: "This project implements 'Structured Ranking Method Based Feature Selection in Data Mining' within the domain of Data Mining and Knowledge Discovery. High-dimensional feature spaces present severe curse-of-dimensionality challenges, noisy attributes, and excessive computational overhead. Our system architecture leverages structured feature ranking, mutual information metrics, and sparsity-inducing regularization to identify the most salient discriminative feature subsets. Comprehensive empirical validation on benchmark datasets demonstrates substantial dimensionality reduction, improved classification accuracy, and complete alignment with university final year engineering requirements and IEEE base paper standards.",
    problemStatement: "High-dimensional datasets contain redundant and irrelevant features that degrade predictive accuracy and induce computational bottlenecks.",
    proposedSolution: "A structured ranking framework combining filter-wrapper feature selection and convex optimization to extract compact, highly discriminative attribute subsets.",
    techStack: ["Python 3.10", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Flask"],
    features: [
      "High-Dimensional Dataset Preprocessing and Outlier Filtering",
      "Structured Ranking Feature Selection with Mutual Information Optimization",
      "Dynamic Sparsity Constraints for Optimal Feature Subset Extraction",
      "Comparative Performance Benchmarking Across Standard Classifiers",
      "Interactive Feature Importance Visualization and Correlation Heatmaps",
      "Comprehensive University Final Year Deliverables Aligned with IEEE Guidelines"
    ],
    modules: [
      {"name": "Module 1: High-Dimensional Data Ingestion & Preprocessing", "description": "Loads tabular and structured datasets, handles missing values, and normalizes variance."},
      {"name": "Module 2: Structured Ranking & Feature Scoring Core", "description": "Computes relevance scores, redundancy penalties, and graph-structured ranking vectors."},
      {"name": "Module 3: Subset Optimization & Predictive Modeling", "description": "Selects top-ranked feature subsets and trains cross-validated predictive models."},
      {"name": "Module 4: Performance Evaluation & Visual Dashboard", "description": "Renders ROC curves, confusion matrices, feature importance rankings, and export tools."}
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Python Source Code with Requirements and Execution Scripts",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/data-analytics.jpg",
    status: "Available",
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-11-05T10:00:00.000Z"
  },
  {
    id: "AMBC001",
    projectCode: "AMBC001",
    domainCode: "AMBC",
    domainName: "Blockchain – Python / Java / DotNet",
    slug: "ambc001-bank-automation-system-in-cloud-computing",
    title: "Bank automation system in cloud computing",
    category: "Blockchain – Python / Java / DotNet",
    tagline: "Decentralized Financial Automation & Tamper-Proof Cloud Ledgers • AMBC001",
    description: "An enterprise banking automation and distributed ledger platform implementing 'Bank automation system in cloud computing' leveraging smart contracts, multi-tier transactional security, and verifiable cloud records with complete IEEE documentation.",
    abstract: "This project implements 'Bank automation system in cloud computing' within the domain of Blockchain, Decentralized Financial Architectures, and Cloud Computing. Traditional banking infrastructures face data tampering, single points of failure, and reconciliation delays. Our system integrates distributed blockchain consensus with cloud-hosted banking microservices, enforcing smart contract rules for customer account verification, automated fund settlements, and cryptographic audit logs. Comprehensive benchmark validation demonstrates immutable transaction logging, zero double-spending, and full alignment with university final year engineering requirements and IEEE base paper standards.",
    problemStatement: "Centralized banking databases are prone to unauthorized modifications, data breaches, and lack of verifiable cross-institutional audit trails.",
    proposedSolution: "A decentralized banking automation architecture combining cloud microservices with smart contract execution and SHA-256 Merkle tree verification for 'Bank automation system in cloud computing'.",
    techStack: ["Java 17", "Python 3.10", "Hyperledger Fabric / Ethereum", "Web3j", "Spring Boot", "Docker", "MySQL"],
    features: [
      "Decentralized Core Banking Automation with Smart Contract Validation",
      "Tamper-Proof Transaction Logging with Cryptographic Merkle Proofs",
      "Multi-Role Access Control for Account Holders, Tellers, and System Auditors",
      "Real-Time Cross-Branch Fund Transfer and Liquidity Settlement",
      "Interactive Web Banking Portal with Live Transaction Explorer",
      "Comprehensive University Final Year Deliverables Aligned with IEEE Guidelines"
    ],
    modules: [
      {"name": "Module 1: User Identity & Account Enrollment", "description": "Authenticates customers and administrators using cryptographic keypairs and role permissions."},
      {"name": "Module 2: Smart Contract & Transaction Processing Core", "description": "Executes atomic financial transactions and validates account balance states on the distributed ledger."},
      {"name": "Module 3: Block chain Consensus & Ledger Storage", "description": "Mints verified transaction blocks into an immutable chain with consensus validation."},
      {"name": "Module 4: Banking Dashboard & Audit Explorer", "description": "Renders real-time transaction history, block verification status, and audit reports."}
    ],
    documentationIncluded: [
      "Standard Research Base Paper & Implementation Guide",
      "Comprehensive 65+ Page SRS and System Design Document",
      "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
      "High-Impact PPT Presentation (35 Slides with Visual Animations)",
      "Complete Clean Source Code with Smart Contracts and Deployment Scripts",
      "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ],
    level: "UG Final Year",
    year: "2025-26 Edition",
    featured: true,
    thumbnail: "/images/projects/network-monitor.jpg",
    status: "Available",
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-11-05T10:00:00.000Z"
  },
  {
    id: "AMML001",
    projectCode: "AMML001",
    domainCode: "AMML",
    domainName: "Machine Learning – Python",
    slug: "amml001-diagnosis-of-cardiovascular-disorder-by-ct-images-using-machine-learning-technique",
    title: "Diagnosis of cardiovascular disorder by CT images using Machine learning technique",
    category: "Machine Learning – Python",
    tagline: "Biomedical CT Image Analysis & Machine Learning Classification • AMML001",
    description: "An advanced biomedical machine learning engineering project implementing 'Diagnosis of cardiovascular disorder by CT images using Machine learning technique' utilizing high-resolution computed tomography analysis, automated segmentation, and supervised classifiers in Python, complete with IEEE documentation.",
    abstract: "This project implements 'Diagnosis of cardiovascular disorder by CT images using Machine learning technique' within the domain of Medical Image Computing and Machine Learning in Python. Early diagnosis of cardiovascular disorders from chest CT scans requires reliable image preprocessing, anatomical feature extraction, and high-sensitivity classification. Our framework provides end-to-end automated slice selection, texture and morphological descriptor computation, and calibrated ensemble learning. Rigorous validation on benchmark clinical datasets achieves high diagnostic sensitivity, low false-positive rates, and complete compliance with IEEE final year project standards.",
    problemStatement: "Manual interpretation of high-dimensional cardiovascular CT scans is time-consuming and prone to inter-observer variability, necessitating automated, objective diagnostic assistance.",
    proposedSolution: "An automated clinical machine learning pipeline extracting radiomic and morphological descriptors from CT images, coupled with optimized ensemble classifiers for high-accuracy cardiovascular disorder detection.",
    techStack: ["Python 3.11", "Scikit-Learn", "OpenCV", "SimpleITK", "XGBoost", "NumPy", "Pandas", "FastAPI"],
    features: [
      "Automated Cardiac CT Scan Preprocessing and Slice Normalization",
      "Radiomic and Morphological Feature Extraction from Ventricular Regions",
      "Optimized Machine Learning Classification with Cross-Validation",
      "Multi-Metric Evaluation (Sensitivity, Specificity, ROC-AUC)",
      "Interactive Diagnostic Assistant UI for Medical Professionals",
      "Complete IEEE Project Deliverables, Base Paper & Viva Guide"
    ],
    modules: [
      { name: "Module 1: CT Scan Normalization & ROI Extraction", description: "Standardizes Hounsfield units, filters noise, and isolates cardiovascular regions." },
      { name: "Module 2: Radiomic Feature Engineering", description: "Extracts texture, shape, and intensity distribution vectors." },
      { name: "Module 3: Supervised Classification Engine", description: "Trains tuned machine learning classifiers for cardiovascular disorder risk scoring." },
      { name: "Module 4: Clinical Analytics & Report Generation", description: "Provides interactive diagnostic visualizations, confusion matrices, and PDF summary exports." }
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
    thumbnail: "/images/projects/data-analytics.jpg",
    status: "Available",
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-11-05T10:00:00.000Z"
  }
];

let cachedProjects: Project[] | null = null;
let cachedMtime: number = 0;

/**
 * Read projects from local persistent storage or initialize with fallback
 */
export function readLocalProjects(): Project[] {
  try {
    if (fs.existsSync(PROJECTS_FILE)) {
      const stats = fs.statSync(PROJECTS_FILE);
      if (cachedProjects && cachedMtime === stats.mtimeMs) {
        return cachedProjects;
      }
      const raw = fs.readFileSync(PROJECTS_FILE, "utf-8");
      const list = JSON.parse(raw);
      if (Array.isArray(list) && list.length > 0) {
        cachedProjects = list;
        cachedMtime = stats.mtimeMs;
        return list;
      }
    }
  } catch (err) {
    console.warn("[PROJECTS] Error reading projects-store.json:", err);
  }

  // Initialize store if missing or empty
  writeLocalProjects(INITIAL_PROJECTS);
  cachedProjects = INITIAL_PROJECTS;
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
    cachedProjects = projects;
    try {
      cachedMtime = fs.statSync(PROJECTS_FILE).mtimeMs;
    } catch {
      cachedMtime = Date.now();
    }
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

