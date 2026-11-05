import json
import re

def slugify(text: str) -> str:
    s = text.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"(^-|-$)", "", s)
    return s[:75]

def get_thumbnail(index: int, title: str) -> str:
    t = title.lower()
    if any(k in t for k in ["medical", "health", "hospital", "doctor", "diabetes", "wbc"]):
        return "/images/projects/cloud-storage.jpg"
    if any(k in t for k in ["security", "privacy", "zero trust", "encryption", "blockchain", "block chain", "attack", "ddos", "access control", "authentication"]):
        return "/images/projects/network-monitor.jpg"
    if any(k in t for k in ["point cloud", "lidar", "radar", "3d", "antenna", "robot", "vehicle", "mobile", "fpga", "drone"]):
        return "/images/projects/student-attendance.jpg"
    if any(k in t for k in ["power", "energy", "schedule", "scheduling", "allocation", "pricing", "stock"]):
        return "/images/projects/data-analytics.jpg"
    
    images = [
        "/images/projects/ecommerce-platform.jpg",
        "/images/projects/cloud-storage.jpg",
        "/images/projects/network-monitor.jpg",
        "/images/projects/student-attendance.jpg",
        "/images/projects/data-analytics.jpg"
    ]
    return images[index % len(images)]

def get_tech_stack(title: str) -> list:
    t = title.lower()
    if any(k in t for k in ["point cloud", "lidar", "3d", "supervoxel"]):
        return ["Python 3.10", "PyTorch", "Open3D", "NumPy", "CUDA", "PointNet / SnowflakeNet", "Matplotlib"]
    if any(k in t for k in ["zero trust", "access control", "encryption", "privacy", "deduplication", "auditing", "searchable", "keyword search"]):
        return ["Java 17", "Python 3.10", "Java Cryptography Architecture (JCA)", "Docker", "Kubernetes", "OpenSSL / PyCryptodome"]
    if any(k in t for k in ["blockchain", "block chain"]):
        return ["Java 17", "Python 3.10", "Hyperledger Fabric / Smart Contracts", "Cryptography (SHA-256)", "Docker", "Kubernetes"]
    if any(k in t for k in ["federated learning", "gan", "cnn", "reinforcement learning", "lstm", "gru", "deep learning"]):
        return ["Python 3.10", "PyTorch", "TensorFlow", "Scikit-Learn", "NumPy", "Pandas", "Matplotlib"]
    if any(k in t for k in ["antenna", "mimo", "rf", "radar", "fpga", "accelerator"]):
        return ["Python 3.10", "MATLAB / SimuLink", "PyTorch", "NumPy", "SciPy", "Verilog / VHDL (FPGA)"]
    if any(k in t for k in ["scheduling", "allocation", "resource", "energy", "load balancing", "serverless", "multi-tenant"]):
        return ["Python 3.10", "Java 17", "Kubernetes", "Docker", "CloudSim / Simulator", "Prometheus & Grafana"]
    return ["Python 3.10", "Java 17", "Kubernetes", "Docker", "AWS / OpenStack", "Spring Boot / FastAPI"]

def build_modules(title: str):
    t = title.lower()
    if any(k in t for k in ["point cloud", "lidar", "3d"]):
        return [
            {"name": "Module 1: 3D Spatial Data Ingestion & Normalization", "description": "Loads raw LiDAR sensor frames and point cloud coordinates, normalizes spatial bounds, and removes noise outliers."},
            {"name": "Module 2: Topological Feature Extraction & Neighborhood Modeling", "description": "Constructs k-NN spatial graph representations, local geometric descriptors, and multi-scale semantic embeddings."},
            {"name": "Module 3: Deep Neural Segmentation / Classification Core", "description": "Processes point sequences using permutation-invariant deep networks with geometric loss functions."},
            {"name": "Module 4: Visualization, Reconstruction & Performance Console", "description": "Renders 3D interactive mesh reconstructions, boundary segmentations, and precision/recall evaluation graphs."}
        ]
    if any(k in t for k in ["zero trust", "access control", "privacy", "encryption", "deduplication", "auditing"]):
        return [
            {"name": "Module 1: Cloud Storage Partitioning & Tenant Isolation", "description": "Ingests enterprise data assets into encrypted cloud multi-tenant storage repositories with role boundaries."},
            {"name": "Module 2: Cryptographic Key Management & Access Authority", "description": "Issues fine-grained attribute-based encryption keys (CP-ABE), tokenized credentials, and revocation lists."},
            {"name": "Module 3: Verifiable Search & Outsourced Computation", "description": "Executes encrypted keyword queries and provable possession audits over cloud storage without revealing plaintexts."},
            {"name": "Module 4: Security Telemetry & Governance Dashboard", "description": "Renders real-time access logs, unauthorized probe alerts, encryption throughput, and compliance telemetry."}
        ]
    if any(k in t for k in ["scheduling", "allocation", "resource", "energy", "load balancing"]):
        return [
            {"name": "Module 1: Workload Profiling & Task Ingestion", "description": "Monitors heterogeneous virtual machine arrival queues, resource constraints, and deadline parameters."},
            {"name": "Module 2: Optimization Engine & Heuristic Solver", "description": "Calculates optimal task-to-node placement vectors using multi-objective algorithms to maximize energy efficiency."},
            {"name": "Module 3: Dynamic Migration & Execution Orchestrator", "description": "Dispatches containerized compute tasks across cluster nodes and initiates live VM migration during node congestion."},
            {"name": "Module 4: Cloud Infrastructure Telemetry & Metrics Console", "description": "Visualizes CPU/RAM utilization curves, SLA violation statistics, power consumption reductions, and latency metrics."}
        ]
    return [
        {"name": "Module 1: Cloud-Edge Telemetry & Data Ingestion", "description": "Configures distributed communication endpoints to stream structured and sensory payloads into cloud gateways."},
        {"name": "Module 2: Core Processing & Analytical Framework", "description": "Executes distributed analytical algorithms, neural inference models, and transaction validation routines."},
        {"name": "Module 3: Resilient Service Orchestration & Fault Tolerance", "description": "Manages horizontal auto-scaling, container replication, and automated failure recovery across cloud nodes."},
        {"name": "Module 4: Executive Insights & Monitoring Dashboard", "description": "Delivers real-time operational status graphs, performance indicators, security audit logs, and export tools."}
    ]

def reconcile():
    with open("src/data/projects-store.json", "r", encoding="utf-8") as f:
        existing_store = json.load(f)
    
    print(f"Current store count: {len(existing_store)}")
    
    with open("scripts/extracted_amcc_105.json", "r", encoding="utf-8") as f:
        catalogue_records = json.load(f)
        
    print(f"Loaded {len(catalogue_records)} extracted AMCC records.")
    
    # Filter out existing AMCC records (including the 1 old placeholder AMCC001)
    non_amcc = [p for p in existing_store if p.get("domainCode") != "AMCC" and not p.get("projectCode", "").startswith("AMCC")]
    print(f"Preserving {len(non_amcc)} non-AMCC projects.")
    
    reconciled_amcc = []
    
    featured_codes = {
        "AMCC001", "AMCC009", "AMCC018", "AMCC035", "AMCC041",
        "AMCC066", "AMCC079", "AMCC085", "AMCC086", "AMCC099", "AMCC105"
    }
    
    for idx, item in enumerate(catalogue_records):
        code = item["code"]
        title = item["title"]
        slug = f"{code.lower()}-{slugify(title)}"
        
        tech_stack = get_tech_stack(title)
        modules = build_modules(title)
        thumbnail = get_thumbnail(idx, title)
        
        t = title.lower()
        tagline = f"Cloud-Native Computing & Distributed Systems Architecture • {code}"
        if any(k in t for k in ["point cloud", "lidar", "3d"]):
            tagline = f"3D Point Cloud Processing & Spatial Cloud Vision • {code}"
        elif any(k in t for k in ["zero trust", "access control", "privacy", "encryption", "security"]):
            tagline = f"Cloud Security, Zero Trust & Cryptographic Storage • {code}"
        elif any(k in t for k in ["scheduling", "allocation", "resource", "energy"]):
            tagline = f"Cloud Resource Optimization & Energy-Efficient Scheduling • {code}"
        elif any(k in t for k in ["blockchain", "block chain"]):
            tagline = f"Distributed Blockchain & Cloud-Edge Decentralized Ledgers • {code}"
        elif any(k in t for k in ["mobile", "iot", "5g", "antenna"]):
            tagline = f"Mobile Edge Computing & 5G Next-Gen Wireless Telemetry • {code}"
            
        description = (
            f"An enterprise Cloud Computing and distributed systems engineering project implementing '{title}' "
            f"leveraging Python, Java, Docker, Kubernetes, and cloud virtualization architectures, engineered with "
            f"modular microservices, high-throughput pipelines, and exhaustive IEEE academic documentation."
        )
        
        abstract = (
            f"This project implements '{title}' within the domain of Cloud Computing, Distributed Architectures, and "
            f"Pervasive Network Systems. Modern cloud and edge infrastructures require scalable computing, resilient fault "
            f"tolerance, rigorous multi-tenant data confidentiality, and deterministic latency. Our architecture utilizes "
            f"distributed microservice containers, automated virtualization scaling, and secure data orchestration to achieve "
            f"optimal workload distribution. Extensive empirical benchmarking demonstrates robust horizontal scalability, "
            f"minimal compute overhead, and strict compliance with university final year engineering requirements and IEEE base paper standards."
        )
        
        problem_statement = (
            f"Centralized legacy infrastructure exhibits significant latency bottlenecks, inefficient compute resource allocation, "
            f"and vulnerabilities that prevent dependable execution of '{title}' at cloud scale."
        )
        
        proposed_solution = (
            f"A cloud-native, distributed computing framework combining container orchestration, optimized scheduling algorithms, "
            f"and end-to-end cryptographic verifiability tailored to '{title}'."
        )
        
        features = [
            "Distributed Multi-Tenant Cloud Architecture with Auto-Scaling Containers",
            "High-Throughput Task Scheduling and Resource Utilization Optimization",
            "Robust Data Confidentiality, Cryptographic Verification, and Tenant Isolation",
            "Cross-Platform Interoperability Utilizing Python 3.10 and Enterprise Java 17",
            "Interactive Web-Based Monitoring Console with Real-Time Telemetry and Metrics",
            "Comprehensive University Final Year Deliverables Aligned with IEEE Guidelines"
        ]
        
        doc_included = [
            "Standard Research Base Paper & Implementation Guide",
            "Comprehensive 65+ Page SRS and System Design Document",
            "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
            "High-Impact PPT Presentation (35 Slides with Visual Animations)",
            "Complete Clean Source Code with Cloud Execution & Setup Scripts",
            "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
        ]
        
        level = "UG Final Year" if idx % 2 == 0 else "PG / M.Tech"
        featured = code in featured_codes
        
        proj = {
            "id": code,
            "projectCode": code,
            "domainCode": "AMCC",
            "domainName": "Cloud Computing – Python / Java",
            "slug": slug,
            "title": title,
            "category": "Cloud Computing – Python / Java",
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
        reconciled_amcc.append(proj)
        
    print(f"Generated {len(reconciled_amcc)} AMCC projects.")
    
    # Combined store
    final_store = non_amcc + reconciled_amcc
    print(f"Total projects in final store: {len(final_store)}")
    
    with open("src/data/projects-store.json", "w", encoding="utf-8") as f:
        json.dump(final_store, f, indent=2, ensure_ascii=False)
        
    print("Successfully wrote updated projects-store.json!")

if __name__ == "__main__":
    reconcile()

