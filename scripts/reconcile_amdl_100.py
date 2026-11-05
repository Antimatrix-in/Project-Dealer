import json
import re
import os

STORE_PATH = os.path.join("src", "data", "projects-store.json")
EXTRACTED_PATH = os.path.join("scripts", "extracted_amdl_100.json")

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def build_metadata(code, title):
    t_lower = title.lower()

    # Specialized tech stack inference based on Deep Learning scope
    tech = ["Python 3.10", "PyTorch 2.2"]
    if any(k in t_lower for k in ["transformer", "vit", "signformer", "attention"]):
        tech.extend(["HuggingFace Transformers", "Torchvision", "CUDA", "FastAPI"])
    elif any(k in t_lower for k in ["voice", "sound", "speech", "audio"]):
        tech.extend(["Torchaudio", "Librosa", "SoundFile", "Scipy", "Streamlit"])
    elif any(k in t_lower for k in ["blockchain"]):
        tech.extend(["Solidity", "Web3.py", "Smart Contracts", "Docker"])
    elif any(k in t_lower for k in ["graph", "gnn"]):
        tech.extend(["PyTorch Geometric", "NetworkX", "Scikit-Learn"])
    elif any(k in t_lower for k in ["gan", "generative"]):
        tech.extend(["Torchvision", "CUDA", "Matplotlib", "FastAPI"])
    elif any(k in t_lower for k in ["lstm", "time series", "sequential", "driving"]):
        tech.extend(["TensorFlow / Keras", "Pandas", "Scikit-Learn", "Matplotlib"])
    else:
        tech.extend(["Torchvision", "OpenCV", "Scikit-Learn", "Matplotlib", "Docker"])

    seen = set()
    unique_tech = []
    for item in tech:
        if item not in seen:
            seen.add(item)
            unique_tech.append(item)

    # Taglines
    if any(k in t_lower for k in ["transformer", "vit", "signformer"]):
        tagline = f"Vision Transformer & Deep Self-Attention Architecture • {code}"
    elif any(k in t_lower for k in ["voice", "audio", "speech"]):
        tagline = f"Self-Supervised Audio Representations & Speech Modeling • {code}"
    elif any(k in t_lower for k in ["mri", "medical", "cancer", "tumor", "lung", "ct"]):
        tagline = f"Biomedical Deep Learning & Computer-Aided Diagnosis • {code}"
    elif any(k in t_lower for k in ["intrusion", "cyber", "smart grid", "power", "attack"]):
        tagline = f"Deep Neural Threat Intelligence & Anomaly Classification • {code}"
    elif any(k in t_lower for k in ["plant", "crop", "chlorosis", "wildfire"]):
        tagline = f"Precision Agriculture & Ecological Deep Learning • {code}"
    else:
        tagline = f"Advanced Deep Neural Network Architecture & Optimization • {code}"

    # Descriptions & Abstracts
    desc = f"An advanced engineering solution implementing '{title}' with state-of-the-art deep neural networks, modular pipelines, and comprehensive IEEE documentation."
    abstract = (
        f"This project implements '{title}' utilizing state-of-the-art deep learning architectures in PyTorch. "
        f"Complex high-dimensional data streams require robust feature representations, adaptive attention mechanisms, "
        f"and calibrated loss optimization. The framework integrates automated preprocessing, transfer learning backbones, "
        f"GPU-accelerated inference pipelines, and interpretable metric visualizers. Comprehensive empirical validation "
        f"on standardized benchmark datasets confirms superior generalization, computational efficiency, "
        f"and complete alignment with university final year engineering requirements."
    )
    problem = f"Conventional heuristic models in the domain of '{title}' suffer from manual feature engineering overhead, limited representation capacity, and vulnerability to distribution shifts."
    solution = f"An end-to-end deep learning framework incorporating multi-scale representation learning, regularized optimization, and interactive evaluation dashboards."

    # Modules
    if any(k in t_lower for k in ["voice", "audio", "speech"]):
        modules = [
            {"name": "Module 1: Audio Signal Preprocessing & Augmentation", "description": "Converts acoustic waveforms into mel-spectrograms and applies time-frequency masking."},
            {"name": "Module 2: Self-Supervised Acoustic Representation Engine", "description": "Extracts rich contextual embeddings using pre-trained audio foundation models."},
            {"name": "Module 3: Deep Classifier & Attention Pooling", "description": "Aggregates frame-level representations with multi-head attention into disorder probability scores."},
            {"name": "Module 4: Acoustic Analytics & Clinical Verification Dashboard", "description": "Visualizes spectrograms, pitch perturbations, and confusion matrices."}
        ]
    elif any(k in t_lower for k in ["transformer", "signformer", "vit"]):
        modules = [
            {"name": "Module 1: Video Frame Extraction & Tokenization", "description": "Extracts continuous video sequences, normalizes spatial dimensions, and generates patch embeddings."},
            {"name": "Module 2: Spatio-Temporal Self-Attention Backbone", "description": "Models inter-patch dependencies and temporal transitions across attention heads."},
            {"name": "Module 3: Sequence Classification & Loss Optimization", "description": "Executes cross-entropy training with label smoothing and AdamW weight decay."},
            {"name": "Module 4: Real-Time Inference & Demonstration GUI", "description": "Provides live camera stream classification with bounding box overlays and translation text."}
        ]
    elif any(k in t_lower for k in ["intrusion", "cyber", "grid", "power", "attack"]):
        modules = [
            {"name": "Module 1: Telemetry Stream Ingestion & Feature Engineering", "description": "Aggregates multi-node sensor telemetry, standardizes packet dynamics, and removes noise."},
            {"name": "Module 2: Bayesian Deep Feature Extractor", "description": "Quantifies epistemic and aleatoric uncertainties via variational inference layers."},
            {"name": "Module 3: Adversarial Detection & Anomaly Classifier", "description": "Identifies false data injections and cyber-physical intrusions with high precision."},
            {"name": "Module 4: Threat Intelligence & SCADA Console", "description": "Renders real-time security risk alerts, ROC-AUC curves, and defensive action triggers."}
        ]
    else:
        modules = [
            {"name": "Module 1: Dataset Preprocessing & Data Augmentation", "description": "Standardizes input distributions, applies affine transformations, and splits into stratified folds."},
            {"name": "Module 2: Deep Convolutional & Attention Backbone", "description": "Processes input features through pre-trained deep neural layers for invariant representation."},
            {"name": "Module 3: Loss Formulation & Optimization", "description": "Trains the model using task-specific loss functions with cosine annealing learning rate schedules."},
            {"name": "Module 4: Performance Evaluation & Interactive Dashboard", "description": "Calculates accuracy, F1-score, Grad-CAM heatmaps, and provides an interactive testing console."}
        ]

    docs = [
        "Standard Research Base Paper & Implementation Guide",
        "Comprehensive 65+ Page SRS and System Design Document",
        "UML & Neural Architecture Diagrams (Block, Dataflow, Sequence)",
        "High-Impact PPT Presentation (35 Slides with Visual Animations)",
        "Complete Clean PyTorch Source Code with Pretrained Weights & Run Scripts",
        "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ]

    features = [
        "State-of-the-Art Deep Neural Network Architecture Built with PyTorch",
        "GPU-Accelerated Training and Low-Latency CPU/Edge Inference Support",
        "Comprehensive Evaluation on Benchmark Datasets (Accuracy, F1, ROC-AUC)",
        "Explainable AI (Grad-CAM / Attention Maps) for Model Transparency",
        "Interactive Web Interface for Live Testing, Upload, and Demonstrations",
        "Complete IEEE Project Documentation and Viva Voce Preparation Package"
    ]

    thumbnails = [
        "/images/projects/ai-chatbot.jpg",
        "/images/projects/plant-disease.jpg",
        "/images/projects/ecommerce-platform.jpg",
        "/images/projects/student-attendance.jpg"
    ]
    code_num = int(code.replace("AMDL", ""))
    thumb = thumbnails[(code_num - 1) % len(thumbnails)]

    slug = f"{code.lower()}-{slugify(title)[:60].rstrip('-')}"

    return {
        "id": code,
        "projectCode": code,
        "domainCode": "AMDL",
        "domainName": "Deep Learning",
        "slug": slug,
        "title": title,
        "category": "Deep Learning",
        "tagline": tagline,
        "description": desc,
        "abstract": abstract,
        "problemStatement": problem,
        "proposedSolution": solution,
        "techStack": unique_tech,
        "features": features,
        "modules": modules,
        "documentationIncluded": docs,
        "level": "UG Final Year",
        "year": "2025-26 Edition",
        "featured": code in ["AMDL001", "AMDL002"],
        "thumbnail": thumb,
        "status": "Available",
        "createdAt": f"2026-10-{1 + (code_num % 28):02d}T10:00:00.000Z",
        "updatedAt": "2026-11-05T10:00:00.000Z"
    }

def reconcile():
    with open(STORE_PATH, "r", encoding="utf-8") as f:
        store = json.load(f)

    with open(EXTRACTED_PATH, "r", encoding="utf-8") as f:
        extracted = json.load(f)

    print(f"Store currently has {len(store)} projects.")
    print(f"Loaded {len(extracted)} extracted AMDL titles from catalogue.")

    # Preserve all non-AMDL projects
    non_amdl = [p for p in store if p.get("domainCode") != "AMDL" and not p.get("projectCode", "").startswith("AMDL")]
    print(f"Preserving {len(non_amdl)} non-AMDL projects.")

    # Build all 100 AMDL projects
    amdl_projects = []
    for item in extracted:
        code = item["code"]
        title = item["title"]
        p_obj = build_metadata(code, title)
        amdl_projects.append(p_obj)

    print(f"Built {len(amdl_projects)} official Deep Learning projects (AMDL001 - AMDL100).")

    # Combine: maintain ordered sequence
    ampy_projects = [p for p in non_amdl if p.get("domainCode") == "AMPY"]
    amjv_projects = [p for p in non_amdl if p.get("domainCode") == "AMJV"]
    amcy_projects = [p for p in non_amdl if p.get("domainCode") == "AMCY"]
    amdj_projects = [p for p in non_amdl if p.get("domainCode") == "AMDJ"]
    amds_projects = [p for p in non_amdl if p.get("domainCode") == "AMDS"]
    amim_projects = [p for p in non_amdl if p.get("domainCode") == "AMIM"]
    other_projects = [p for p in non_amdl if p.get("domainCode") not in ["AMPY", "AMJV", "AMCY", "AMDJ", "AMDS", "AMIM", "AMDL"]]

    final_store = ampy_projects + amjv_projects + amcy_projects + amdj_projects + amds_projects + amim_projects + amdl_projects + other_projects

    print(f"Final store count: {len(final_store)} projects.")
    print(f"  AMPY: {len([p for p in final_store if p.get('domainCode') == 'AMPY'])}")
    print(f"  AMJV: {len([p for p in final_store if p.get('domainCode') == 'AMJV'])}")
    print(f"  AMCY: {len([p for p in final_store if p.get('domainCode') == 'AMCY'])}")
    print(f"  AMDJ: {len([p for p in final_store if p.get('domainCode') == 'AMDJ'])}")
    print(f"  AMDS: {len([p for p in final_store if p.get('domainCode') == 'AMDS'])}")
    print(f"  AMIM: {len([p for p in final_store if p.get('domainCode') == 'AMIM'])}")
    print(f"  AMDL: {len([p for p in final_store if p.get('domainCode') == 'AMDL'])}")
    print(f"  Others: {len([p for p in final_store if p.get('domainCode') not in ['AMPY', 'AMJV', 'AMCY', 'AMDJ', 'AMDS', 'AMIM', 'AMDL']])}")

    with open(STORE_PATH, "w", encoding="utf-8") as f:
        json.dump(final_store, f, indent=2, ensure_ascii=False)

    print("Successfully written to src/data/projects-store.json!")

if __name__ == "__main__":
    reconcile()

