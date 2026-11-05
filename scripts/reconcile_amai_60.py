import json
import re

def slugify(text: str) -> str:
    s = text.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"(^-|-$)", "", s)
    return s[:75]

def get_thumbnail(index: int, title: str) -> str:
    t = title.lower()
    if any(k in t for k in ["power", "harmonic", "smart grid", "electricity"]):
        return "/images/projects/cloud-storage.jpg"
    if any(k in t for k in ["health", "medical", "patient", "drug", "seizure", "asthma", "prosthesis", "stroke", "rehabilitation"]):
        return "/images/projects/ai-chatbot.jpg"
    if any(k in t for k in ["vision", "image", "lidar", "gesture", "facial", "visual", "camera"]):
        return "/images/projects/ecommerce-platform.jpg"
    if any(k in t for k in ["security", "active directory", "robbery", "threat", "privacy"]):
        return "/images/projects/network-monitor.jpg"
    if any(k in t for k in ["agriculture", "farming", "crop"]):
        return "/images/projects/plant-disease.jpg"
    if any(k in t for k in ["fpga", "hardware", "satellite", "robot", "beamforming"]):
        return "/images/projects/portfolio-cms.jpg"
    
    images = [
        "/images/projects/ai-chatbot.jpg",
        "/images/projects/ecommerce-platform.jpg",
        "/images/projects/cloud-storage.jpg",
        "/images/projects/network-monitor.jpg",
        "/images/projects/plant-disease.jpg",
        "/images/projects/portfolio-cms.jpg"
    ]
    return images[index % len(images)]

def get_tech_stack(title: str) -> list:
    t = title.lower()
    stack = ["Python 3.10"]
    if "fpga" in t or "fpg" in t:
        return ["VHDL / Verilog", "Xilinx Vivado", "ModelSim", "Python", "NumPy", "FPGA Hardware Kit"]
    if any(k in t for k in ["transformer", "bert", "attention", "gpt", "bree-hd"]):
        stack.extend(["PyTorch 2.2", "HuggingFace Transformers", "Torchtext", "Scikit-Learn", "FastAPI", "Docker"])
    elif any(k in t for k in ["cnn", "convolutional", "vision", "image", "lidar", "gesture", "camera"]):
        stack.extend(["PyTorch", "Torchvision", "OpenCV", "Scikit-Learn", "Matplotlib", "Docker"])
    elif any(k in t for k in ["graph", "gcn", "stgl"]):
        stack.extend(["PyTorch Geometric (PyG)", "NetworkX", "DGL", "NumPy", "SciPy", "Docker"])
    elif any(k in t for k in ["swarm", "bee colony", "spider monkey", "genetic", "optimization", "algorithm"]):
        stack.extend(["NumPy", "SciPy", "DEAP Evolutionary Library", "Scikit-Learn", "Matplotlib", "Docker"])
    elif any(k in t for k in ["power", "harmonic", "smart grid", "electricity"]):
        stack.extend(["Python", "MATLAB Engine / PySim", "NumPy", "SciPy", "Scikit-Learn", "Pandas"])
    else:
        stack.extend(["PyTorch", "Scikit-Learn", "NumPy", "Pandas", "Matplotlib", "Docker"])
    return stack

def build_modules(title: str):
    t = title.lower()
    if "fpga" in t or "fpg" in t:
        return [
            {"name": "Module 1: Mathematical Approximation & Bit-True Modeling", "description": "Formulates piece-wise hyperbolic tangent approximations with double-precision IEEE-754 validation."},
            {"name": "Module 2: RTL Hardware Architecture Synthesis", "description": "Constructs pipelined datapath registers, LUT lookup tables, and multiplier-less shift adders in VHDL/Verilog."},
            {"name": "Module 3: Functional Simulation & Verification", "description": "Executes testbench vectors on ModelSim verifying low error bounds and latency timing closure."},
            {"name": "Module 4: FPGA Deployment & Resource Analysis Dashboard", "description": "Synthesizes bitstream on Xilinx Vivado and evaluates LUT/DSP slice utilization and max operating clock frequency."}
        ]
    if any(k in t for k in ["transformer", "nlp", "text", "translation", "hieroglyphic", "twitter", "threat"]):
        return [
            {"name": "Module 1: Multimodal / Text Preprocessing & Tokenization", "description": "Normalizes input representations, handles noise filtration, and executes subword tokenization."},
            {"name": "Module 2: Deep Transformer Backbone & Cross-Attention", "description": "Computes multi-head self-attention mechanisms and cross-modal embedding projections."},
            {"name": "Module 3: Loss Optimization & Adversarial Defense", "description": "Optimizes loss functions with gradient clipping, warm-up schedules, and regularization."},
            {"name": "Module 4: Inference Engine & Evaluation Dashboard", "description": "Renders real-time predictions, attention weights, precision-recall metrics, and web demo portal."}
        ]
    if any(k in t for k in ["graph", "gcn", "stgl"]):
        return [
            {"name": "Module 1: Graph Topology Construction & Feature Encoding", "description": "Extracts spatial skeletal joints and constructs dynamic adjacency matrices with temporal edges."},
            {"name": "Module 2: Spatial-Temporal GCN Backbone", "description": "Fuses spatial graph convolutions with temporal self-attention to capture multi-scale joint dynamics."},
            {"name": "Module 3: Loss Calibration & Optimization Engine", "description": "Trains the hybrid graph architecture with cross-entropy loss and cosine annealing learning rates."},
            {"name": "Module 4: Action Recognition & Visual Analytics Dashboard", "description": "Renders real-time action predictions, joint trajectory visualizers, and confusion matrices."}
        ]
    return [
        {"name": "Module 1: Telemetry & Benchmark Dataset Preprocessing", "description": "Standardizes feature distributions, addresses missing values, and establishes stratified folds."},
        {"name": "Module 2: Artificial Intelligence & Neural Core Engine", "description": "Constructs domain-tailored neural and optimization layers for robust latent representation extraction."},
        {"name": "Module 3: Model Calibration & Hyperparameter Tuning", "description": "Executes systematic cross-validation, loss regularization, and convergence optimization."},
        {"name": "Module 4: Performance Analytics & Web Demonstration Console", "description": "Provides intuitive UI for interactive predictions, ROC-AUC metric plots, and IEEE audit logs."}
    ]

def reconcile():
    with open("src/data/projects-store.json", "r", encoding="utf-8") as f:
        existing_store = json.load(f)
    
    print(f"Current store count: {len(existing_store)}")
    
    with open("scripts/extracted_amai_60.json", "r", encoding="utf-8") as f:
        catalogue_records = json.load(f)
        
    print(f"Loaded {len(catalogue_records)} extracted AMAI records.")
    
    # Filter out existing AMAI records
    non_amai = [p for p in existing_store if p.get("domainCode") != "AMAI" and not p.get("projectCode", "").startswith("AMAI")]
    print(f"Preserving {len(non_amai)} non-AMAI projects.")
    
    reconciled_amai = []
    
    for idx, item in enumerate(catalogue_records):
        code = item["code"]
        title = item["title"]
        slug = f"{code.lower()}-{slugify(title)}"
        
        tech_stack = get_tech_stack(title)
        modules = build_modules(title)
        thumbnail = get_thumbnail(idx, title)
        
        tagline = f"Artificial Intelligence IEEE Architecture • {code}"
        if "fpga" in title.lower() or "fpg" in title.lower():
            tagline = f"Very High Accuracy Hardware Synthesis & FPGA Architecture • {code}"
        elif "transformer" in title.lower():
            tagline = f"Transformer Attention & Deep Neural Reasoning • {code}"
        elif "graph" in title.lower() or "gcn" in title.lower():
            tagline = f"Spatial-Temporal Graph Convolutional Networks • {code}"
        elif "security" in title.lower():
            tagline = f"AI-Driven Threat Intelligence & Security Framework • {code}"
        elif "health" in title.lower() or "patient" in title.lower():
            tagline = f"Biomedical Intelligence & Clinical Decision System • {code}"
            
        description = f"An advanced engineering solution implementing '{title}' featuring state-of-the-art artificial intelligence models, modular software pipelines, and complete IEEE documentation."
        
        abstract = (
            f"This project implements '{title}' within the domain of Artificial Intelligence and advanced machine reasoning. "
            f"Modern engineering challenges demand adaptive intelligence, high-accuracy inference, and mathematically rigorous optimization. "
            f"Our framework integrates automated data pipelines, state-of-the-art neural and algorithmic architectures, low-latency execution pipelines, and explainable visual analytics. "
            f"Exhaustive empirical evaluations on standardized benchmark datasets demonstrate exceptional accuracy, minimal computational overhead, and provable robustness, "
            f"fully aligned with university final year engineering project standards and academic publication criteria."
        )
        
        problem_statement = f"Conventional heuristic methodologies addressing '{title}' suffer from manual parameter tuning, poor generalization across distribution shifts, and excessive computational latency."
        proposed_solution = f"A robust artificial intelligence architecture integrating specialized feature encoders, adaptive loss optimization, and interactive demonstration dashboards."
        
        features = [
            "Advanced Artificial Intelligence Architecture Built with Python / PyTorch",
            "GPU / Hardware Accelerated Training with Low-Latency Inference Pipeline",
            "Comprehensive Validation on Benchmark Datasets (Accuracy, F1-Score, ROC-AUC)",
            "Explainable AI and Interpretability Mechanisms for Model Verification",
            "Interactive Web-Based Demonstration Dashboard for Live Predictions",
            "Complete University Final Year Project Deliverables with IEEE Base Paper"
        ]
        
        documentation = [
            "Standard Research Base Paper & Implementation Guide",
            "Comprehensive 65+ Page SRS and System Design Document",
            "UML & Neural Architecture Diagrams (Block, Dataflow, Sequence)",
            "High-Impact PPT Presentation (35 Slides with Visual Animations)",
            "Complete Clean Source Code with Docker / Setup Scripts",
            "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
        ]
        
        day = (idx % 28) + 1
        created_at = f"2026-10-{day:02d}T10:00:00.000Z"
        
        record = {
            "id": code,
            "projectCode": code,
            "domainCode": "AMAI",
            "domainName": "Artificial Intelligence",
            "slug": slug,
            "title": title,
            "category": "Artificial Intelligence",
            "tagline": tagline,
            "description": description,
            "abstract": abstract,
            "problemStatement": problem_statement,
            "proposedSolution": proposed_solution,
            "techStack": tech_stack,
            "features": features,
            "modules": modules,
            "documentationIncluded": documentation,
            "level": "UG Final Year",
            "year": "2025-26 Edition",
            "featured": idx < 3 or (idx % 10 == 0),
            "thumbnail": thumbnail,
            "status": "Available",
            "createdAt": created_at,
            "updatedAt": "2026-11-05T10:00:00.000Z"
        }
        reconciled_amai.append(record)
        
    print(f"Built {len(reconciled_amai)} official AMAI projects (AMAI001 - AMAI060).")
    
    # Combine preserved projects + reconciled AMAI projects
    final_store = non_amai + reconciled_amai
    print(f"Final store count: {len(final_store)} projects.")
    
    # Verification breakdown
    counts = {}
    for p in final_store:
        d = p.get("domainCode", "UNKNOWN")
        counts[d] = counts.get(d, 0) + 1
        
    for d, c in sorted(counts.items()):
        print(f"  {d}: {c}")
        
    with open("src/data/projects-store.json", "w", encoding="utf-8") as f:
        json.dump(final_store, f, indent=2)
        
    print("Successfully updated src/data/projects-store.json!")

if __name__ == "__main__":
    reconcile()

