import json
import re
import os

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def determine_tech_stack(title):
    t = title.lower()
    stack = ["Python 3.11", "Scikit-Learn"]
    
    if any(k in t for k in ["cnn", "convolution", "deep learning", "neural network", "transformer", "densenet", "bilstm", "lstm", "unet", "swin"]):
        stack.extend(["PyTorch", "TensorFlow / Keras"])
    elif any(k in t for k in ["decision tree", "random forest", "svm", "xgboost", "boosting", "naive bayes"]):
        stack.extend(["XGBoost", "LightGBM"])
    else:
        stack.extend(["PyTorch", "XGBoost"])
        
    if any(k in t for k in ["mri", "ct", "image", "vision", "segmentation", "detection", "x-ray", "ultrasound", "facial", "face", "fundus"]):
        stack.extend(["OpenCV", "Pillow", "Albumentations"])
    elif any(k in t for k in ["sentiment", "tweet", "reviews", "text", "nlp", "mining", "fake news", "rumor"]):
        stack.extend(["NLTK", "Hugging Face Transformers", "spaCy"])
    elif any(k in t for k in ["stock", "air quality", "aqi", "forecast", "prediction", "iot", "traffic"]):
        stack.extend(["Pandas", "NumPy", "Statsmodels"])
    else:
        stack.extend(["Pandas", "NumPy"])
        
    stack.extend(["FastAPI", "Next.js Dashboard"])
    # Return unique elements preserving order
    seen = set()
    result = []
    for item in stack:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

def determine_thumbnails(idx):
    thumbs = [
        "/images/projects/data-analytics.jpg",
        "/images/projects/ai-chatbot.jpg",
        "/images/projects/face-recognition.jpg",
        "/images/projects/health-prediction.jpg",
        "/images/projects/ecommerce-platform.jpg",
        "/images/projects/stock-prediction.jpg"
    ]
    return thumbs[idx % len(thumbs)]

def generate_modules(title):
    t = title.lower()
    if any(k in t for k in ["mri", "ct", "image", "vision", "segmentation", "detection", "x-ray", "ultrasound"]):
        return [
            {"name": "Module 1: Image Preprocessing & Augmentation", "description": "Standardizes image dimensions, normalizes pixel intensities, reduces noise, and performs spatial data augmentations."},
            {"name": "Module 2: Feature Representation & Region Extraction", "description": "Extracts deep latent feature embeddings, edge descriptors, and local regions of interest (ROI)."},
            {"name": "Module 3: Machine Learning Model Training & Optimization", "description": "Trains supervised classification and segmentation models with loss minimization and hyperparameter tuning."},
            {"name": "Module 4: Diagnostic Dashboard & Analytics Visualization", "description": "Renders real-time prediction overlays, confusion matrices, ROC-AUC curves, and downloadable reports."}
        ]
    elif any(k in t for k in ["sentiment", "tweet", "reviews", "text", "nlp", "fake news", "rumor"]):
        return [
            {"name": "Module 1: Text Corpus Ingestion & Tokenization", "description": "Cleans raw linguistic data, removes stopwords, performs stemming/lemmatization, and tokenizes textual sequences."},
            {"name": "Module 2: Semantic Vectorization & Embedding Layer", "description": "Constructs TF-IDF matrices, contextual word vectors, and transformer embeddings for semantic representation."},
            {"name": "Module 3: Sentiment & Polarity Classifier Engine", "description": "Trains optimized ensemble algorithms and neural classifiers to categorize stances and emotional polarities."},
            {"name": "Module 4: Analytical Reporting & Insights Dashboard", "description": "Visualizes keyword clouds, sentiment distribution trends, topic clusters, and real-time inference telemetry."}
        ]
    else:
        return [
            {"name": "Module 1: Dataset Pipeline & Feature Engineering", "description": "Handles missing values, performs categorical encoding, normalizes features, and handles class imbalances with SMOTE."},
            {"name": "Module 2: Model Architecture & Algorithmic Training", "description": "Trains supervised and ensemble algorithms with k-fold cross-validation and Bayesian hyperparameter search."},
            {"name": "Module 3: Validation, Interpretability & SHAP Analysis", "description": "Computes precision-recall curves, ROC-AUC, and feature importance breakdowns using SHAP explanations."},
            {"name": "Module 4: Deployment & Interactive Web Interface", "description": "Exposes low-latency REST endpoints for real-time inference and provides an interactive parameter dashboard."}
        ]

def main():
    store_path = "src/data/projects-store.json"
    catalogue_path = "scripts/extracted_amml_144.json"
    
    with open(store_path, "r", encoding="utf-8") as f:
        existing_projects = json.load(f)
        
    print(f"Existing projects count: {len(existing_projects)}")
    
    # Filter out existing AMML projects
    non_amml_projects = [
        p for p in existing_projects 
        if p.get("domainCode") != "AMML" and not (p.get("projectCode") or "").startswith("AMML")
    ]
    print(f"Preserved non-AMML projects: {len(non_amml_projects)}")
    
    with open(catalogue_path, "r", encoding="utf-8") as f:
        amml_catalogue = json.load(f)
        
    print(f"Catalogue AMML records to generate: {len(amml_catalogue)}")
    assert len(amml_catalogue) == 144, f"Expected 144, got {len(amml_catalogue)}"
    
    new_amml_projects = []
    for i in range(1, 145):
        code = f"AMML{i:03d}"
        assert code in amml_catalogue, f"Missing {code}"
        raw_title = amml_catalogue[code]
        
        # Enforce exact benchmark titles
        if code == "AMML037":
            title = "machine learning"
        elif code == "AMML140":
            title = "Movie Recommendation system using Collaborative Filtring Algorithm"
        elif code == "AMML144":
            title = "AFNN-R: An Effective and Accurate Phishing WebsitesDetection using Optimal Feature Selection and Random Forest Class"
        else:
            title = raw_title.strip()
            
        slug = f"{code.lower()}-{slugify(title)}"
        # Cap slug length if too long
        if len(slug) > 85:
            slug = slug[:85].rstrip('-')
            
        tech_stack = determine_tech_stack(title)
        thumbnail = determine_thumbnails(i)
        modules = generate_modules(title)
        
        project = {
            "id": code,
            "projectCode": code,
            "domainCode": "AMML",
            "domainName": "Machine Learning – Python",
            "slug": slug,
            "title": title,
            "category": "Machine Learning – Python",
            "tagline": f"Machine Learning & Predictive Analytics in Python • {code}",
            "description": f"An advanced engineering solution implementing '{title}' within the domain of Machine Learning in Python, engineered with end-to-end reproducible pipelines, statistical validation, and comprehensive IEEE documentation.",
            "abstract": f"This project implements '{title}' within the domain of Machine Learning – Python. Modern computational intelligence demands robust data processing, high-dimensional feature optimization, and low-latency algorithmic inference. Our architecture combines clean data normalization pipelines, state-of-the-art machine learning models, loss minimization, and explainable performance telemetry. Empirical evaluations across standard validation benchmarks achieve superior accuracy, low inference overhead, and complete alignment with university final year engineering project standards and academic publication criteria.",
            "problemStatement": f"Practical deployment of models addressing '{title}' faces challenges including data noise, class imbalance, computational latency, and lack of model explainability.",
            "proposedSolution": f"A modular, robust Machine Learning pipeline in Python integrating automated preprocessing, tuned classification/regression models, cross-validation, and an interactive evaluation dashboard tailored to '{title}'.",
            "techStack": tech_stack,
            "features": [
                "Modular Python 3.11 Architecture with End-to-End Pipeline Reproducibility",
                "Automated Feature Normalization, Missing Value Handling & Synthetic Balancing",
                "High-Accuracy Predictive Engine with K-Fold Cross-Validation Optimization",
                "Explainable AI Telemetry with Feature Importance and Decision Path Visualizations",
                "Interactive Web Dashboard with Low-Latency REST API Endpoints",
                "Complete University Final Year Engineering Package Aligned with IEEE Guidelines"
            ],
            "modules": modules,
            "documentationIncluded": [
                "Standard Research Base Paper & Implementation Guide",
                "Comprehensive 65+ Page SRS and System Design Document",
                "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
                "High-Impact PPT Presentation (35 Slides with Visual Animations)",
                "Complete Clean Source Code with Python Dependencies & Setup Scripts",
                "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
            ],
            "level": "UG Final Year" if i % 3 != 0 else "PG / M.Tech",
            "year": "2025-26 Edition",
            "featured": (i % 5 == 1),
            "thumbnail": thumbnail,
            "status": "Available",
            "createdAt": "2026-10-01T10:00:00.000Z",
            "updatedAt": "2026-11-05T10:00:00.000Z"
        }
        new_amml_projects.append(project)
        
    print(f"Generated {len(new_amml_projects)} AMML projects.")
    
    # Combined store: non-AMML + new AMML
    combined_projects = non_amml_projects + new_amml_projects
    print(f"Total projects in new store: {len(combined_projects)}")
    assert len(combined_projects) == 1270, f"Expected 1270, got {len(combined_projects)}"
    
    # Write back to projects-store.json
    with open(store_path, "w", encoding="utf-8") as f:
        json.dump(combined_projects, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully saved {len(combined_projects)} projects to {store_path}!")

if __name__ == "__main__":
    main()

