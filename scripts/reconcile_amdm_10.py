import json
import re

def slugify(text: str) -> str:
    s = text.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"(^-|-$)", "", s)
    return s[:75]

def get_thumbnail(index: int, title: str) -> str:
    t = title.lower()
    if any(k in t for k in ["heart", "diabetes", "medical", "disease"]):
        return "/images/projects/cloud-storage.jpg"
    if any(k in t for k in ["block chain", "blockchain", "secure", "payment"]):
        return "/images/projects/network-monitor.jpg"
    if any(k in t for k in ["crop", "yield", "agri"]):
        return "/images/projects/plant-disease.jpg"
    if any(k in t for k in ["student", "twitter", "sentiment", "election", "social"]):
        return "/images/projects/ai-chatbot.jpg"
    
    images = [
        "/images/projects/data-analytics.jpg",
        "/images/projects/ecommerce-platform.jpg",
        "/images/projects/network-monitor.jpg",
        "/images/projects/cloud-storage.jpg"
    ]
    return images[index % len(images)]

def get_tech_stack(title: str) -> list:
    t = title.lower()
    if any(k in t for k in ["hadoop"]):
        return ["Python 3.10", "Apache Hadoop HDFS", "MapReduce", "PySpark", "Java 17", "Pandas", "Matplotlib"]
    if any(k in t for k in ["block chain", "blockchain"]):
        return ["Python 3.10", "Block chain / Hyperledger", "Java 17", "Cryptography (SHA-256)", "FastAPI", "SQLite"]
    if any(k in t for k in ["fuzzy", "sentiment", "twitter", "social"]):
        return ["Python 3.10", "NLTK / SpaCy", "Scikit-Learn", "Fuzzy-Rough Set Logic", "Pandas", "Matplotlib"]
    if any(k in t for k in ["process mining", "deep neural"]):
        return ["Python 3.10", "PyTorch / TensorFlow", "PM4Py (Process Mining)", "Scikit-Learn", "Pandas", "NumPy"]
    if any(k in t for k in ["heart", "diabetes", "crop"]):
        return ["Python 3.10", "Scikit-Learn", "XGBoost", "Pandas", "NumPy", "Matplotlib", "Flask"]
    return ["Python 3.10", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"]

def build_modules(title: str):
    t = title.lower()
    if any(k in t for k in ["sentiment", "twitter", "social"]):
        return [
            {"name": "Module 1: Social Media Stream Ingestion & Cleaning", "description": "Gathers social media text feeds, filters stopwords and URLs, and tokenizes textual utterances."},
            {"name": "Module 2: Linguistic Feature Extraction & Vectorization", "description": "Generates TF-IDF representations, sentiment polarity scores, and fuzzy membership matrices."},
            {"name": "Module 3: Fuzzy-Rough Set Classification Core", "description": "Applies rough set upper and lower approximation bounds to classify complex sentiment patterns."},
            {"name": "Module 4: Opinion Analytics & Predictive Dashboard", "description": "Visualizes sentiment trends, election/product forecasting curves, and statistical breakdowns."}
        ]
    if any(k in t for k in ["process mining", "business process"]):
        return [
            {"name": "Module 1: Event Log Parsing & Trace Extraction", "description": "Ingests XES/CSV transactional logs and extracts activity sequences, case IDs, and timestamps."},
            {"name": "Module 2: Process Discovery & Graph Modeling", "description": "Constructs directly-follows graphs and Petri nets capturing business execution paths."},
            {"name": "Module 3: Deep Neural Outcome Predictor", "description": "Trains recurrent neural networks over event prefixes to forecast process completion and bottlenecks."},
            {"name": "Module 4: Operational Workflow Console", "description": "Displays process flowcharts, remaining-time estimates, anomaly alerts, and export reports."}
        ]
    if any(k in t for k in ["block chain", "payment"]):
        return [
            {"name": "Module 1: Payment Transaction Ingestion & Validation", "description": "Captures online payment instructions and verifies digital signatures with cryptographic credentials."},
            {"name": "Module 2: Block chain Ledger & Consensus Engine", "description": "Records verified payment batches into immutable blocks with Merkle tree integrity proofs."},
            {"name": "Module 3: Fraud Mining & Anomaly Detection", "description": "Applies transaction pattern mining to identify anomalous velocity and double-spending attempts."},
            {"name": "Module 4: Settlement Telemetry & Audit Dashboard", "description": "Renders real-time transaction throughput, ledger audit trails, and merchant settlement logs."}
        ]
    return [
        {"name": "Module 1: Data Ingestion & Exploratory Analysis", "description": "Loads domain datasets, resolves missing values, and evaluates statistical attribute distributions."},
        {"name": "Module 2: Pattern Discovery & Feature Engineering", "description": "Applies association rule mining, ranking heuristics, and correlation filters to extract salient signals."},
        {"name": "Module 3: Predictive Classification & Ensemble Modeling", "description": "Trains supervised and ensemble classifiers with cross-validation and hyperparameter tuning."},
        {"name": "Module 4: Evaluation Metrics & Insights Dashboard", "description": "Renders confusion matrices, ROC/AUC curves, prediction scorecards, and exportable reports."}
    ]

def reconcile():
    with open("src/data/projects-store.json", "r", encoding="utf-8") as f:
        existing_store = json.load(f)
    
    print(f"Current store count: {len(existing_store)}")
    
    with open("scripts/extracted_amdm_10.json", "r", encoding="utf-8") as f:
        catalogue_records = json.load(f)
        
    print(f"Loaded {len(catalogue_records)} extracted AMDM records.")
    
    # Filter out any existing AMDM records
    non_amdm = [p for p in existing_store if p.get("domainCode") != "AMDM" and not p.get("projectCode", "").startswith("AMDM")]
    print(f"Preserving {len(non_amdm)} non-AMDM projects.")
    
    reconciled_amdm = []
    
    for idx, item in enumerate(catalogue_records):
        code = item["code"]
        title = item["title"]
        slug = f"{code.lower()}-{slugify(title)}"
        
        tech_stack = get_tech_stack(title)
        modules = build_modules(title)
        thumbnail = get_thumbnail(idx, title)
        
        t = title.lower()
        tagline = f"Knowledge Discovery & Data Mining Architecture • {code}"
        if any(k in t for k in ["heart", "diabetes"]):
            tagline = f"Clinical Data Mining & Medical Predictive Analytics • {code}"
        elif any(k in t for k in ["block chain", "blockchain", "payment"]):
            tagline = f"Decentralized Transaction Security & Mining Protocols • {code}"
        elif any(k in t for k in ["crop", "yield"]):
            tagline = f"Agri-Tech Predictive Modeling & Machine Learning • {code}"
        elif any(k in t for k in ["sentiment", "twitter"]):
            tagline = f"Social Media Opinion Mining & Text Analytics • {code}"
            
        description = (
            f"An advanced Data Mining and Knowledge Discovery engineering project implementing '{title}' "
            f"using Python, Java, Scikit-Learn, and statistical pattern extraction algorithms, designed with modular "
            f"pipeline architecture, robust data validation, and exhaustive IEEE academic documentation."
        )
        
        abstract = (
            f"This project implements '{title}' within the domain of Data Mining, Pattern Discovery, and Machine Learning. "
            f"Extracting actionable intelligence from structured and semi-structured datasets demands robust outlier filtering, "
            f"discriminative feature modeling, and scalable classification pipelines. Our architecture combines advanced data "
            f"preprocessing, statistical ranking heuristics, and ensemble classifiers to achieve high predictive fidelity. "
            f"Comprehensive empirical validation across standardized benchmark datasets proves superior precision, robust "
            f"generalization, and full compliance with university final year engineering requirements and IEEE base paper standards."
        )
        
        problem_statement = (
            f"Conventional manual analyses and rudimentary statistical heuristics fail to extract hidden relational patterns "
            f"in complex datasets for '{title}', leading to inaccurate forecasts and delayed decision-making."
        )
        
        proposed_solution = (
            f"An automated, end-to-end data mining framework combining structured feature engineering, pattern extraction algorithms, "
            f"and cross-validated predictive models tailored specifically to '{title}'."
        )
        
        features = [
            "Comprehensive Multi-Format Dataset Ingestion and Preprocessing Pipeline",
            "Advanced Association Rule Mining, Feature Ranking, and Outlier Filtering",
            "High-Accuracy Ensemble Predictive Modeling with Cross-Validation",
            "Interactive Data Mining Visualization and Model Evaluation Dashboard",
            "Exportable Operational Reports (ROC, Precision-Recall, Confusion Matrix)",
            "Comprehensive University Final Year Deliverables Aligned with IEEE Guidelines"
        ]
        
        doc_included = [
            "Standard Research Base Paper & Implementation Guide",
            "Comprehensive 65+ Page SRS and System Design Document",
            "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
            "High-Impact PPT Presentation (35 Slides with Visual Animations)",
            "Complete Clean Source Code with Python & Java Execution Scripts",
            "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
        ]
        
        level = "UG Final Year" if idx % 2 == 0 else "PG / M.Tech"
        featured = code in ["AMDM001", "AMDM002", "AMDM004", "AMDM007", "AMDM010"]
        
        proj = {
            "id": code,
            "projectCode": code,
            "domainCode": "AMDM",
            "domainName": "Data Mining – Python / Java",
            "slug": slug,
            "title": title,
            "category": "Data Mining – Python / Java",
            "tagline": tagline,
            "description": description,
            "abstract": abstract,
            "problemStatement": problem_statement,
            "proposedSolution": proposed_solution,
            "techStack": tech_stack,
            "features": features,
            "modules": modules,
            "documentationIncluded": doc_included,
            "level": level,
            "year": "2025-26 Edition",
            "featured": featured,
            "thumbnail": thumbnail,
            "status": "Available",
            "createdAt": "2026-10-01T10:00:00.000Z",
            "updatedAt": "2026-11-05T10:00:00.000Z"
        }
        reconciled_amdm.append(proj)
        
    print(f"Generated {len(reconciled_amdm)} AMDM projects.")
    
    # Combined store
    final_store = non_amdm + reconciled_amdm
    print(f"Total projects in final store: {len(final_store)}")
    
    with open("src/data/projects-store.json", "w", encoding="utf-8") as f:
        json.dump(final_store, f, indent=2, ensure_ascii=False)
        
    print("Successfully wrote updated projects-store.json!")

if __name__ == "__main__":
    reconcile()

