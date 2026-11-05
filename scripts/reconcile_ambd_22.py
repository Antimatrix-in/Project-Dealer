import json
import re

def slugify(text: str) -> str:
    s = text.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"(^-|-$)", "", s)
    return s[:75]

def get_thumbnail(index: int, title: str) -> str:
    t = title.lower()
    if any(k in t for k in ["medical", "health", "biomedical", "drug", "heart", "disease"]):
        return "/images/projects/cloud-storage.jpg"
    if any(k in t for k in ["block chain", "blockchain", "privacy", "security", "encryption", "authentication", "deduplication", "access control"]):
        return "/images/projects/network-monitor.jpg"
    if any(k in t for k in ["shop", "customer", "power", "electricity", "price", "air quality"]):
        return "/images/projects/data-analytics.jpg"
    if any(k in t for k in ["iot", "vehicular", "transportation", "vehicle"]):
        return "/images/projects/student-attendance.jpg"
    
    images = [
        "/images/projects/data-analytics.jpg",
        "/images/projects/network-monitor.jpg",
        "/images/projects/cloud-storage.jpg",
        "/images/projects/student-attendance.jpg",
        "/images/projects/ecommerce-platform.jpg"
    ]
    return images[index % len(images)]

def get_tech_stack(title: str) -> list:
    t = title.lower()
    base_stack = ["Apache Spark", "Hadoop HDFS", "Python 3.10", "Java 17", "PySpark"]
    
    if any(k in t for k in ["block chain", "blockchain"]):
        base_stack = ["Apache Spark", "Block chain / Hyperledger", "Python 3.10", "Java 17", "Cryptography (SHA-256)", "Hadoop HDFS", "FastAPI"]
    elif any(k in t for k in ["encryption", "privacy", "security", "authentication", "deduplication", "access control"]):
        base_stack = ["Apache Spark", "Java Cryptography Architecture (JCA)", "Python 3.10", "Hadoop HDFS", "OpenSSL / PyCryptodome", "FastAPI"]
    elif any(k in t for k in ["machine learning", "cnn", "decision tree", "svm", "forecast", "prediction"]):
        base_stack = ["Apache Spark MLlib", "Python 3.10", "Scikit-Learn", "Hadoop HDFS", "Pandas & NumPy", "Matplotlib / Seaborn"]
    elif any(k in t for k in ["iot", "vehicular", "transportation"]):
        base_stack = ["Apache Kafka", "Apache Spark Streaming", "Python 3.10", "Java 17", "Hadoop HDFS", "Mosquitto MQTT"]
    elif any(k in t for k in ["shop", "customer", "ecommerce"]):
        base_stack = ["Apache Spark", "Hadoop MapReduce", "Python 3.10", "MySQL / MongoDB", "PySpark", "Dash / Plotly"]
        
    return base_stack[:7]

def build_modules(title: str):
    t = title.lower()
    if any(k in t for k in ["block chain", "blockchain"]):
        return [
            {"name": "Module 1: Distributed Big Data Ingestion & Formatting", "description": "Ingests heterogeneous enterprise and sensory datasets into distributed Apache Hadoop HDFS / Spark partitions."},
            {"name": "Module 2: Block chain Ledger & Cryptographic Integrity", "description": "Constructs immutable distributed ledger blocks with SHA-256 Merkle tree verification and smart contract access validation."},
            {"name": "Module 3: Privacy-Preserving Consensus & Authentication", "description": "Implements conditional anonymity, verifiable proof-of-authority consensus, and zero-knowledge attribute verification."},
            {"name": "Module 4: Analytics Console & Audit Telemetry", "description": "Provides real-time audit trail monitoring, transaction latency telemetry, and administrative verification dashboards."}
        ]
    if any(k in t for k in ["encryption", "privacy", "security", "authentication", "access control", "deduplication"]):
        return [
            {"name": "Module 1: Big Data Partitioning & Distributed Storage", "description": "Ingests massive high-velocity data records into cluster nodes with fault-tolerant Hadoop HDFS replication."},
            {"name": "Module 2: Cryptographic Key Management & Access Authority", "description": "Generates hierarchical attribute authorizations, searchable encrypted indexes, and revocable identity tokens."},
            {"name": "Module 3: Outsourced Computation & Verifiable Decryption", "description": "Executes encrypted queries over cloud partitions without disclosing underlying plaintexts or search patterns."},
            {"name": "Module 4: Security Telemetry & Performance Dashboard", "description": "Evaluates encryption throughput, decryption overhead, query latency benchmarks, and breach prevention telemetry."}
        ]
    if any(k in t for k in ["machine learning", "cnn", "decision tree", "svm", "forecast", "prediction", "learning"]):
        return [
            {"name": "Module 1: Massive Dataset Preprocessing & Cleaning", "description": "Performs distributed missing-value imputation, outlier removal, and z-score normalization across Spark DataFrames."},
            {"name": "Module 2: Feature Engineering & Dimensionality Reduction", "description": "Extracts high-dimensional feature representations, multi-scale embeddings, and correlation matrices using Spark MLlib."},
            {"name": "Module 3: Distributed Model Training & Hyperparameter Tuning", "description": "Trains scalable classification and forecasting models using parallelized cross-validation and distributed loss optimization."},
            {"name": "Module 4: Model Evaluation & Predictive Analytics Dashboard", "description": "Renders real-time forecasting curves, confusion matrices, RMSE/ROC curves, and operational performance metrics."}
        ]
    return [
        {"name": "Module 1: Distributed Big Data Pipeline Ingestion", "description": "Configures automated batch and real-time streaming data ingestion into Apache Spark clusters and Hadoop storage."},
        {"name": "Module 2: Distributed MapReduce & Processing Core", "description": "Executes parallelized data aggregation, filtering, and cross-domain correlation operations across distributed compute nodes."},
        {"name": "Module 3: Scalable Query Optimization & Storage Engine", "description": "Indexes partitioned datasets using distributed caching and memory-optimized Apache Spark execution plans."},
        {"name": "Module 4: Executive Insights & Visual Reporting Console", "description": "Delivers interactive business intelligence charts, trend graphs, system throughput telemetry, and report exports."}
    ]

def reconcile():
    with open("src/data/projects-store.json", "r", encoding="utf-8") as f:
        existing_store = json.load(f)
    
    print(f"Current store count: {len(existing_store)}")
    
    with open("scripts/extracted_ambd_22.json", "r", encoding="utf-8") as f:
        catalogue_records = json.load(f)
        
    print(f"Loaded {len(catalogue_records)} extracted AMBD records.")
    
    # Filter out any existing AMBD records
    non_ambd = [p for p in existing_store if p.get("domainCode") != "AMBD" and not p.get("projectCode", "").startswith("AMBD")]
    print(f"Preserving {len(non_ambd)} non-AMBD projects.")
    
    reconciled_ambd = []
    
    for idx, item in enumerate(catalogue_records):
        code = item["code"]
        title = item["title"]
        slug = f"{code.lower()}-{slugify(title)}"
        
        tech_stack = get_tech_stack(title)
        modules = build_modules(title)
        thumbnail = get_thumbnail(idx, title)
        
        t = title.lower()
        tagline = f"Distributed Big Data Engineering & Apache Spark Architecture • {code}"
        if any(k in t for k in ["block chain", "blockchain"]):
            tagline = f"Big Data Security & Distributed Block chain Architecture • {code}"
        elif any(k in t for k in ["privacy", "encryption", "security", "access control"]):
            tagline = f"Cryptographic Big Data Privacy & Cloud Access Control • {code}"
        elif any(k in t for k in ["machine learning", "cnn", "svm", "forecast", "prediction"]):
            tagline = f"Scalable Big Data Machine Learning & Predictive Analytics • {code}"
            
        description = (
            f"An enterprise distributed Big Data project implementing '{title}' using Apache Spark, "
            f"Hadoop HDFS, Python, and Java ecosystems, complete with modular microservice pipeline design, "
            f"distributed query optimization, and exhaustive IEEE academic documentation."
        )
        
        abstract = (
            f"This project implements '{title}' within the domain of Big Data engineering and high-throughput "
            f"distributed computing. Modern enterprise and scientific infrastructures generate unprecedented volumes "
            f"of semi-structured data requiring fault-tolerant distributed ingestion, parallel processing, and stringent "
            f"security guarantees. Our system architecture leverages Apache Spark compute nodes and Hadoop Distributed "
            f"File System (HDFS) storage, orchestrating parallel worker pipelines that minimize disk I/O bottlenecks. "
            f"Empirical benchmark evaluations confirm resilient fault tolerance, linear horizontal scalability, and strict "
            f"compliance with IEEE standard base paper methodologies for final year engineering deliverables."
        )
        
        problem_statement = (
            f"Traditional centralized architectures fail to satisfy the volume, velocity, and security requirements "
            f"demanded by '{title}', resulting in high computational latency, single points of failure, and data exposure."
        )
        
        proposed_solution = (
            f"A horizontally scalable big data architecture combining Apache Spark, distributed Hadoop storage, and "
            f"cryptographic data verification to deliver high-throughput, fault-tolerant execution for '{title}'."
        )
        
        features = [
            "Distributed Cluster Ingestion with Apache Spark and Hadoop HDFS Partitioning",
            "High-Throughput Parallel Data Processing with In-Memory Caching",
            "Strict Security, Privacy Preservation, and Cryptographic Data Integrity",
            "Scalable Microservice Architecture with Python 3.10 and Java 17 Interoperability",
            "Interactive Web Analytics Console with Real-Time Telemetry & Throughput Metrics",
            "Comprehensive University Final Year Deliverables Aligned with IEEE Guidelines"
        ]
        
        doc_included = [
            "Standard Research Base Paper & Implementation Guide",
            "Comprehensive 65+ Page SRS and System Design Document",
            "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
            "High-Impact PPT Presentation (35 Slides with Visual Animations)",
            "Complete Clean Source Code with Spark & Hadoop Execution Scripts",
            "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
        ]
        
        level = "UG Final Year" if idx % 3 != 0 else "PG / M.Tech"
        featured = code in ["AMBD001", "AMBD004", "AMBD007", "AMBD011", "AMBD015", "AMBD019", "AMBD022"]
        
        proj = {
            "id": code,
            "projectCode": code,
            "domainCode": "AMBD",
            "domainName": "Big Data – Python / Java",
            "slug": slug,
            "title": title,
            "category": "Big Data – Python / Java",
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
        reconciled_ambd.append(proj)
        
    print(f"Generated {len(reconciled_ambd)} AMBD projects.")
    
    # Combined store
    final_store = non_ambd + reconciled_ambd
    print(f"Total projects in final store: {len(final_store)}")
    
    with open("src/data/projects-store.json", "w", encoding="utf-8") as f:
        json.dump(final_store, f, indent=2, ensure_ascii=False)
        
    print("Successfully wrote updated projects-store.json!")

if __name__ == "__main__":
    reconcile()

