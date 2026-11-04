import json
import re
import os

STORE_PATH = os.path.join("src", "data", "projects-store.json")
CLEANED_PATH = os.path.join("scripts", "extracted_amds_50_cleaned.json")

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def build_metadata(code, title):
    t_lower = title.lower()

    # Specialized tech stack inference based on Data Science scope
    tech = ["Python 3.10", "Pandas", "NumPy"]
    if any(k in t_lower for k in ["mri", "segmentation", "unet", "vgg", "cnn", "convolutional", "retina", "hardnet"]):
        tech.extend(["PyTorch", "Torchvision", "OpenCV", "Scikit-Image", "Matplotlib"])
    elif any(k in t_lower for k in ["graph neural", "gnn"]):
        tech.extend(["PyTorch Geometric", "NetworkX", "Scikit-Learn", "Matplotlib"])
    elif any(k in t_lower for k in ["nlp", "text", "captioning", "disambiguation", "siamese"]):
        tech.extend(["HuggingFace Transformers", "NLTK / spaCy", "PyTorch", "FastAPI"])
    elif any(k in t_lower for k in ["gan", "generative adversarial"]):
        tech.extend(["PyTorch", "Torchvision", "CUDA", "Matplotlib"])
    elif any(k in t_lower for k in ["reinforcement learning", "optimization", "salp", "manta ray", "jellyfish", "red deer"]):
        tech.extend(["PyTorch", "Scikit-Learn", "SciPy", "Matplotlib"])
    else:
        tech.extend(["Scikit-Learn", "XGBoost", "LightGBM", "Seaborn", "Streamlit / Dash"])

    seen = set()
    unique_tech = []
    for item in tech:
        if item not in seen:
            seen.add(item)
            unique_tech.append(item)

    # Taglines
    if "mri" in t_lower or "segmentation" in t_lower:
        tagline = f"Biomedical Imaging & Deep Neural Segmentation • {code}"
    elif "nlp" in t_lower or "captioning" in t_lower:
        tagline = f"Clinical NLP & Multimodal Health Intelligence • {code}"
    elif "optimization" in t_lower:
        tagline = f"Metaheuristic Optimization & Machine Learning • {code}"
    elif "graph" in t_lower:
        tagline = f"Topological Graph Neural Representations in Python • {code}"
    else:
        tagline = f"Predictive Data Science & Feature Engineering • {code}"

    # Descriptions & Abstracts
    desc = f"An advanced data science research solution implementing '{title}' with end-to-end Python pipelines, automated feature engineering, and statistical validation."
    abstract = (
        f"This project implements '{title}' using state-of-the-art computational algorithms in Python. "
        f"High-dimensional biomedical datasets require robust preprocessing, noise filtering, feature selection, "
        f"and cross-validated statistical learning. The proposed system features reproducible data pipelines, "
        f"loss minimization, automated hyperparameter tuning, and interpretable metric dashboards. "
        f"Rigorous empirical evaluations on benchmark datasets demonstrate superior predictive accuracy, "
        f"low computational latency, and complete compliance with final year engineering review criteria."
    )
    problem = f"Conventional analytical frameworks in the domain of '{title}' suffer from high inter-annotator variance, class imbalance, and poor generalization on unseen test cohorts."
    solution = f"A modular Python data science framework incorporating specialized neural backbones, robust normalization, and automated cross-validation."

    # Modules
    if any(k in t_lower for k in ["mri", "image", "segmentation", "radiographs", "scan"]):
        modules = [
            {"name": "Module 1: Biomedical Image Ingestion & Standardization", "description": "Reads DICOM/NIfTI/PNG scans, normalizes pixel intensities, and performs data augmentation."},
            {"name": "Module 2: Feature Representation & Deep Architecture", "description": "Extracts spatial and frequency-domain representations using tailored neural backbones."},
            {"name": "Module 3: Loss Optimization & Model Training", "description": "Executes training with hybrid loss functions (Dice, Focal, Cross-Entropy) and learning rate scheduling."},
            {"name": "Module 4: Diagnostic Validation & Clinical Visualization", "description": "Computes IoU, Dice coefficients, confusion matrices, and renders segmentation overlays."}
        ]
    elif any(k in t_lower for k in ["nlp", "text", "captioning"]):
        modules = [
            {"name": "Module 1: Clinical Text Ingestion & Preprocessing", "description": "Tokenizes medical notes, performs acronym disambiguation, and removes stop words."},
            {"name": "Module 2: Multimodal Embedding & Semantic Encoding", "description": "Encodes visual and textual tokens into shared latent hyperspherical spaces."},
            {"name": "Module 3: Classification & Caption Generation", "description": "Generates descriptive diagnostic summaries using attention-based decoders."},
            {"name": "Module 4: Semantic Evaluation & Report Dashboard", "description": "Evaluates BLEU, ROUGE, and METEOR scores with an interactive clinician demo portal."}
        ]
    else:
        modules = [
            {"name": "Module 1: Data Ingestion & Statistical Preprocessing", "description": "Cleans raw clinical/sensor observations, handles missing entries, and scales feature vectors."},
            {"name": "Module 2: Feature Engineering & Selection", "description": "Extracts high-impact predictive covariates using mutual information and recursive elimination."},
            {"name": "Module 3: Ensemble Modeling & Optimization", "description": "Trains tuned predictive models with Bayesian hyperparameter optimization and cross-validation."},
            {"name": "Module 4: Performance Analytics & Explainability Dashboard", "description": "Computes ROC-AUC, F1-scores, SHAP feature attributions, and renders interactive plots."}
        ]

    docs = [
        "Standard Research Base Paper & Implementation Guide",
        "Comprehensive 65+ Page SRS and System Design Document",
        "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
        "High-Impact PPT Presentation (35 Slides with Visual Animations)",
        "Complete Clean Source Code with Python Setup Instructions",
        "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ]

    features = [
        "End-to-End Python Data Science Pipeline with Clean Modular Structure",
        "Advanced Feature Engineering and Dimensionality Reduction Techniques",
        "Rigorous Evaluation on Benchmark Cohorts with ROC-AUC & F1-Score Metrics",
        "Explainable AI (SHAP / Attention) for Model Interpretability",
        "Interactive Web Dashboard for Prediction, Verification, and Testing",
        "Complete University Final Year Project Deliverables & Base Paper"
    ]

    thumbnails = [
        "/images/projects/ai-chatbot.jpg",
        "/images/projects/ecommerce-platform.jpg",
        "/images/projects/student-attendance.jpg"
    ]
    code_num = int(code.replace("AMDS", ""))
    thumb = thumbnails[(code_num - 1) % len(thumbnails)]

    slug = f"{code.lower()}-{slugify(title)[:60].rstrip('-')}"

    return {
        "id": code,
        "projectCode": code,
        "domainCode": "AMDS",
        "domainName": "Data Science – Python",
        "slug": slug,
        "title": title,
        "category": "Data Science – Python",
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
        "featured": code in ["AMDS001", "AMDS002"],
        "thumbnail": thumb,
        "status": "Available",
        "createdAt": f"2026-10-{1 + (code_num % 28):02d}T10:00:00.000Z",
        "updatedAt": "2026-11-04T10:00:00.000Z"
    }

def reconcile():
    with open(STORE_PATH, "r", encoding="utf-8") as f:
        store = json.load(f)

    with open(CLEANED_PATH, "r", encoding="utf-8") as f:
        extracted = json.load(f)

    print(f"Store currently has {len(store)} projects.")
    print(f"Loaded {len(extracted)} extracted AMDS titles from catalogue.")

    # Preserve all non-AMDS projects (AMPY, AMJV, AMCY, AMDJ, and others)
    non_amds = [p for p in store if p.get("domainCode") != "AMDS" and not p.get("projectCode", "").startswith("AMDS")]
    print(f"Preserving {len(non_amds)} non-AMDS projects.")

    # Build all 50 AMDS projects
    amds_projects = []
    for item in extracted:
        code = item["code"]
        title = item["title"]
        p_obj = build_metadata(code, title)
        amds_projects.append(p_obj)

    print(f"Built {len(amds_projects)} official Data Science – Python projects (AMDS001 - AMDS050).")

    # Combine: maintain ordered sequence
    ampy_projects = [p for p in non_amds if p.get("domainCode") == "AMPY"]
    amjv_projects = [p for p in non_amds if p.get("domainCode") == "AMJV"]
    amcy_projects = [p for p in non_amds if p.get("domainCode") == "AMCY"]
    amdj_projects = [p for p in non_amds if p.get("domainCode") == "AMDJ"]
    other_projects = [p for p in non_amds if p.get("domainCode") not in ["AMPY", "AMJV", "AMCY", "AMDJ", "AMDS"]]

    final_store = ampy_projects + amjv_projects + amcy_projects + amdj_projects + amds_projects + other_projects

    print(f"Final store count: {len(final_store)} projects.")
    print(f"  AMPY: {len([p for p in final_store if p.get('domainCode') == 'AMPY'])}")
    print(f"  AMJV: {len([p for p in final_store if p.get('domainCode') == 'AMJV'])}")
    print(f"  AMCY: {len([p for p in final_store if p.get('domainCode') == 'AMCY'])}")
    print(f"  AMDJ: {len([p for p in final_store if p.get('domainCode') == 'AMDJ'])}")
    print(f"  AMDS: {len([p for p in final_store if p.get('domainCode') == 'AMDS'])}")
    print(f"  Others: {len([p for p in final_store if p.get('domainCode') not in ['AMPY', 'AMJV', 'AMCY', 'AMDJ', 'AMDS']])}")

    with open(STORE_PATH, "w", encoding="utf-8") as f:
        json.dump(final_store, f, indent=2, ensure_ascii=False)

    print("Successfully written to src/data/projects-store.json!")

if __name__ == "__main__":
    reconcile()

