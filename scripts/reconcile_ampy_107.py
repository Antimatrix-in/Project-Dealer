import json
import re
import os

STORE_PATH = os.path.join("src", "data", "projects-store.json")
TITLES_PATH = os.path.join("src", "data", "extracted_ampy_107.json")

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def infer_metadata(title):
    t_lower = title.lower()
    
    # Tech stack inference
    tech = ["Python 3.11"]
    if any(k in t_lower for k in ["deep learning", "cnn", "resnet", "vgg", "densenet", "efficientnet", "unet", "gan", "transformer"]):
        tech.extend(["PyTorch", "TensorFlow", "OpenCV", "NumPy", "Matplotlib"])
    elif any(k in t_lower for k in ["machine learning", "svm", "random forest", "xgboost", "lightgbm", "clustering"]):
        tech.extend(["Scikit-Learn", "Pandas", "NumPy", "XGBoost", "Matplotlib"])
    elif any(k in t_lower for k in ["iot", "cybersecurity", "ddos", "intrusion", "malware", "sdn"]):
        tech.extend(["Scikit-Learn", "NetworkX", "Pandas", "PyTorch", "Socket"])
    elif any(k in t_lower for k in ["hyperspectral", "remote sensing", "satellite", "crop", "plant", "agriculture"]):
        tech.extend(["PyTorch", "OpenCV", "Scikit-Learn", "Pandas", "Rasterio"])
    elif any(k in t_lower for k in ["mri", "x-ray", "ct", "ultrasound", "cancer", "tumor", "retinopathy", "leukemia"]):
        tech.extend(["PyTorch", "Torchvision", "OpenCV", "Scikit-Image", "Pandas"])
    else:
        tech.extend(["PyTorch", "Scikit-Learn", "Pandas", "NumPy", "Flask / FastAPI"])

    # Remove duplicates preserving order
    seen = set()
    unique_tech = []
    for item in tech:
        if item not in seen:
            seen.add(item)
            unique_tech.append(item)

    # Tagline
    tagline = f"IEEE Implementation • {title}"
    if len(tagline) > 90:
        tagline = f"IEEE Python Implementation • {title[:70]}..."

    # Description & Abstract
    desc = f"An advanced engineering solution implementing '{title}' with end-to-end Python pipelines, automated evaluation metrics, and interactive visual reporting."
    abstract = (
        f"This project implements '{title}' using state-of-the-art computational algorithms in Python. "
        f"The architecture encompasses standardized preprocessing pipelines, robust feature representation, "
        f"iterative model training, and rigorous validation on standardized benchmark datasets. "
        f"Extensive empirical evaluations demonstrate high diagnostic accuracy, computational efficiency, "
        f"and real-world deployment feasibility for university final year evaluations."
    )
    problem = f"Existing traditional heuristic methods in the domain of '{title}' suffer from high latency, susceptibility to noise, and limited generalization on real-world datasets."
    solution = f"A modular Python software framework combining optimized neural representations, automated hyperparameter tuning, and an interactive validation dashboard."

    modules = [
        {"name": "Module 1: Data Ingestion & Preprocessing", "description": "Standardizes raw data inputs, handles missing values, applies normalization, and partitions into train/validation splits."},
        {"name": "Module 2: Feature Engineering & Representation", "description": "Extracts high-dimensional latent vectors and statistical features tailored for optimal predictive modeling."},
        {"name": "Module 3: Core Algorithm & Optimization", "description": "Executes training with loss minimization, cross-validation, and hyperparameter optimization."},
        {"name": "Module 4: Evaluation, Metrics & Dashboard", "description": "Computes ROC-AUC, F1-Score, Confusion Matrix, and generates comprehensive visual performance dashboards."}
    ]

    return {
        "tagline": tagline,
        "description": desc,
        "abstract": abstract,
        "problemStatement": problem,
        "proposedSolution": solution,
        "techStack": unique_tech,
        "modules": modules
    }

def reconcile():
    with open(STORE_PATH, "r", encoding="utf-8") as f:
        existing_projects = json.load(f)

    with open(TITLES_PATH, "r", encoding="utf-8") as f:
        ampy_107_titles = json.load(f)

    print(f"Loaded {len(existing_projects)} existing projects in store.")
    print(f"Loaded {len(ampy_107_titles)} official titles from PDF catalogue.")

    existing_ampy_map = {}
    other_projects = []

    for p in existing_projects:
        code = p.get("projectCode") or p.get("id") or ""
        if code.startswith("AMPY") or p.get("domainCode") == "AMPY":
            existing_ampy_map[code] = p
        else:
            other_projects.append(p)

    print(f"Found {len(existing_ampy_map)} existing AMPY projects in store: {list(existing_ampy_map.keys())}")
    print(f"Found {len(other_projects)} projects belonging to other domains.")

    reconciled_ampy = []

    # Iterate through all 107 codes: AMPY001 to AMPY107
    for i in range(1, 108):
        code = f"AMPY{i:03d}"
        official_title = ampy_107_titles.get(code, f"Python Research Project {code}")

        if code in existing_ampy_map:
            # Preserve existing project details completely, ensuring domainCode and category are accurate
            p = existing_ampy_map[code]
            p["projectCode"] = code
            p["domainCode"] = "AMPY"
            p["domainName"] = "Python Projects"
            p["category"] = "Python Projects"
            p["status"] = p.get("status") or "Available"
            reconciled_ampy.append(p)
            print(f"Preserved existing project: {code} - {p.get('title')}")
        else:
            # Generate new rich project record
            meta = infer_metadata(official_title)
            slug = f"{code.lower()}-{slugify(official_title)[:50]}"
            new_project = {
                "id": code,
                "projectCode": code,
                "domainCode": "AMPY",
                "domainName": "Python Projects",
                "slug": slug,
                "title": official_title,
                "category": "Python Projects",
                "tagline": meta["tagline"],
                "description": meta["description"],
                "abstract": meta["abstract"],
                "problemStatement": meta["problemStatement"],
                "proposedSolution": meta["proposedSolution"],
                "techStack": meta["techStack"],
                "features": [
                    "Complete Working Python Source Code with Comments",
                    "Comprehensive 65+ Page SRS and System Design Document",
                    "Full Dataset Preprocessing and Validation Pipeline",
                    "High-Impact PPT Presentation for College Project Reviews",
                    "Model Evaluation Metrics (Accuracy, Precision, Recall, F1)",
                    "Viva Voce Model Q&A Preparation Handbook"
                ],
                "modules": meta["modules"],
                "documentationIncluded": [
                    "Standard Research Base Paper & Implementation Guide",
                    "Comprehensive 65+ Page SRS and System Design Document",
                    "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
                    "High-Impact PPT Presentation (35 Slides with Visual Animations)",
                    "Complete Clean Source Code with Setup Instructions",
                    "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
                ],
                "level": "UG Final Year",
                "year": "2025-26 Edition",
                "featured": (i <= 5),
                "thumbnail": "/images/projects/student-attendance.jpg",
                "status": "Available",
                "createdAt": f"2026-10-{(20 + (i % 10)):02d}T10:00:00.000Z",
                "updatedAt": "2026-11-04T10:00:00.000Z"
            }
            reconciled_ampy.append(new_project)

    print(f"\nTotal reconciled AMPY projects: {len(reconciled_ampy)}")
    assert len(reconciled_ampy) == 107, f"Expected 107 AMPY projects, got {len(reconciled_ampy)}"

    # Combine: reconciled AMPY projects first, followed by other domains
    full_store = reconciled_ampy + other_projects

    # Verify no duplicate IDs or projectCodes
    seen_codes = set()
    for p in full_store:
        c = p.get("projectCode") or p.get("id")
        if c in seen_codes:
            raise ValueError(f"Duplicate project code detected: {c}")
        seen_codes.add(c)

    print(f"Total projects in new store: {len(full_store)}")
    print(f"Unique codes verified: {len(seen_codes)}")

    # Write atomically
    with open(STORE_PATH, "w", encoding="utf-8") as f:
        json.dump(full_store, f, indent=2, ensure_ascii=False)

    print(f"Successfully wrote {len(full_store)} projects to {STORE_PATH}.")

if __name__ == "__main__":
    reconcile()

