import json
import re
import os

STORE_PATH = os.path.join("src", "data", "projects-store.json")

OFFICIAL_AMCY_9 = [
    ("AMCY001", "A Multi-Order Distributed HOSVD with Its Incremental Computing for Big Services in Cyber-Physical-Social Systems"),
    ("AMCY002", "Event Detection Through Differential Pattern Mining in Cyber-Physical Systems"),
    ("AMCY003", "Scalable Uncertainty-Aware Truth Discovery in Big Data Social Sensing Applications for Cyber-Physical Systems"),
    ("AMCY004", "A Blockchain Based Access Control Framework for Cyber-Physical-Social System Big Data"),
    ("AMCY005", "Cloud-Based K-Closest Pairs Discovery in Dynamic Cyber-Physical-Social Systems"),
    ("AMCY006", "Blockchain Based Dynamic Spectrum Access of Non Real Time Data in Cyber Physical Social Systems"),
    ("AMCY007", "Cyber Physical Scheduling for Predictable Reliability of Inter Vehicle Communications"),
    ("AMCY008", "A Cloud Fog Edge Closed Loop Feedback Security Risk Prediction Method"),
    ("AMCY009", "PSDS–Proficient Security Over Distributed Storage A Method for Data Transmission in Clo")
]

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def build_metadata(code, title):
    t_lower = title.lower()

    # Tech stack inference based on specific CPSS / Cyber Security domain
    tech = ["Python 3.10", "Cryptography", "NetworkX"]
    if "blockchain" in t_lower:
        tech = ["Python", "Solidity", "Web3.py", "Ethereum / Ganache", "Smart Contracts", "Docker"]
    elif any(k in t_lower for k in ["hosvd", "tensor", "incremental"]):
        tech = ["Python", "NumPy", "SciPy", "TensorLy", "PySpark", "Matplotlib"]
    elif any(k in t_lower for k in ["differential pattern", "event detection"]):
        tech = ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "FastAPI"]
    elif any(k in t_lower for k in ["truth discovery", "uncertainty"]):
        tech = ["Python", "Scikit-Learn", "NumPy", "Pandas", "Probabilistic Graphical Models", "Flask"]
    elif any(k in t_lower for k in ["vehicle", "v2v", "v2x", "scheduling"]):
        tech = ["Python", "NS3 / SimPy", "NetworkX", "Scapy", "NumPy", "Matplotlib"]
    elif any(k in t_lower for k in ["cloud fog edge", "risk prediction"]):
        tech = ["Python", "PyTorch", "Scikit-Learn", "Docker", "FastAPI", "Prometheus"]
    elif any(k in t_lower for k in ["psds", "distributed storage"]):
        tech = ["Python", "Cryptography", "Bouncy Castle / PyCryptodome", "Socket", "MySQL", "Docker"]
    else:
        tech = ["Python", "Scikit-Learn", "NetworkX", "Scapy", "Pandas", "Docker"]

    # Tagline
    if "blockchain" in t_lower:
        tagline = f"Decentralized Blockchain & CPSS Big Data Security • {code}"
    elif "cloud fog edge" in t_lower:
        tagline = f"Multi-Tier Cloud-Fog-Edge Risk Modeling & Feedback Control • {code}"
    elif "vehicle" in t_lower:
        tagline = f"Vehicular V2X Network Reliability & Real-Time Scheduling • {code}"
    elif "hosvd" in t_lower:
        tagline = f"Distributed Tensor HOSVD & Big Service Decomposition • {code}"
    else:
        tagline = f"Cyber-Physical System Defense & Threat Intelligence • {code}"

    # Descriptions & Abstracts
    desc = f"An advanced cyber security implementation of '{title}' featuring mathematical verification, modular defense services, and comprehensive IEEE documentation."
    abstract = (
        f"This project implements '{title}' within the domain of Cyber-Physical-Social Systems (CPSS) and distributed cyber security. "
        f"Modern cyber-physical infrastructures face complex threats spanning sensor tampering, unauthorized data access, and latency degradation. "
        f"We develop a rigorous computational framework incorporating formalized security theorems, robust telemetry pipelines, "
        f"and incremental verification models. Comprehensive empirical evaluations confirm strong threat resilience, minimal computational overhead, "
        f"and deterministic quality-of-service guarantees suitable for university engineering evaluations."
    )
    problem = f"Conventional static security models applied to '{title}' fail to accommodate high-dimensional telemetry bursts, dynamic topology shifts, and zero-day attack vectors."
    solution = f"A resilient software pipeline utilizing distributed incremental computing, attribute-enforced trust mechanisms, and automated risk scoring."

    # Modules
    if "blockchain" in t_lower:
        modules = [
            {"name": "Module 1: CPSS Node Identity & Ledger Setup", "description": "Registers physical IoT and cyber entities with verifiable smart contract identities."},
            {"name": "Module 2: Decentralized Access Policy Formulation", "description": "Compiles attribute-based access predicates into tamper-proof on-chain smart contracts."},
            {"name": "Module 3: Consensus & Dynamic Authorization Engine", "description": "Validates transaction requests and dynamic resource requests with cryptographic proofs."},
            {"name": "Module 4: Security Audit & Ledger Analytics Dashboard", "description": "Visualizes access grants, denied attempts, gas consumption, and network throughput."}
        ]
    elif any(k in t_lower for k in ["cloud fog edge", "risk"]):
        modules = [
            {"name": "Module 1: Multi-Tier Telemetry Ingestion", "description": "Collects latency, packet entropy, and CPU metrics across Edge, Fog, and Cloud layers."},
            {"name": "Module 2: Closed-Loop Risk Prediction Engine", "description": "Executes predictive risk estimation using recurrent models to anticipate security anomalies."},
            {"name": "Module 3: Automated Mitigation & Feedback Control", "description": "Dynamically adjusts firewall filter rules and offloading thresholds to neutralize threats."},
            {"name": "Module 4: Incident Response & Threat Map Dashboard", "description": "Provides real-time interactive threat heatmaps, risk alerts, and operational analytics."}
        ]
    elif any(k in t_lower for k in ["vehicle", "v2v", "v2x"]):
        modules = [
            {"name": "Module 1: Inter-Vehicle Channel & Topology Modeler", "description": "Simulates vehicular ad-hoc motion vectors and packet propagation dynamics."},
            {"name": "Module 2: Predictable Real-Time Scheduling Engine", "description": "Allocates dedicated transmission slots minimizing collision probabilities and jitter."},
            {"name": "Module 3: Trust & Cryptographic Verification Service", "description": "Validates message authenticity and detects rogue beaconing or sybil injectors."},
            {"name": "Module 4: Safety Telemetry & Performance Console", "description": "Evaluates packet delivery ratio (PDR), deadline compliance, and latency metrics."}
        ]
    else:
        modules = [
            {"name": "Module 1: CPSS Telemetry Ingestion & Preprocessing", "description": "Standardizes multi-modal streaming data, handles noise, and normalizes feature dimensions."},
            {"name": "Module 2: Tensor Decomposition & Pattern Extractor", "description": "Executes core computational algorithms isolating anomalous behaviors and invariant structures."},
            {"name": "Module 3: Verification & Security Risk Assessor", "description": "Evaluates detection thresholds against simulated adversary perturbations."},
            {"name": "Module 4: Administration & Intelligence Dashboard", "description": "Provides comprehensive visualizations, alert logs, and system performance telemetry."}
        ]

    docs = [
        "Standard Research Base Paper & Implementation Guide",
        "Comprehensive 65+ Page SRS and System Design Document",
        "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
        "High-Impact PPT Presentation (35 Slides with Visual Animations)",
        "Complete Clean Source Code with Setup Instructions",
        "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ]

    features = [
        "Complete Working Python / Modern Software Architecture Implementation",
        "Mathematical Model & Cryptographic Verification Theorems Included",
        "Real-Time Anomaly Detection and Automated Incident Reporting",
        "Comprehensive Evaluation on Benchmark Datasets with Metric Visualizations",
        "Interactive Web Dashboard for Simulation, Testing and Demonstration",
        "Complete University Final Year Engineering Deliverables & Base Paper"
    ]

    thumbnails = [
        "/images/projects/ai-chatbot.jpg",
        "/images/projects/ecommerce-platform.jpg",
        "/images/projects/student-attendance.jpg"
    ]
    code_num = int(code.replace("AMCY", ""))
    thumb = thumbnails[(code_num - 1) % len(thumbnails)]

    slug = f"{code.lower()}-{slugify(title)[:60].rstrip('-')}"

    return {
        "id": code,
        "projectCode": code,
        "domainCode": "AMCY",
        "domainName": "Cyber Security",
        "slug": slug,
        "title": title,
        "category": "Cyber Security",
        "tagline": tagline,
        "description": desc,
        "abstract": abstract,
        "problemStatement": problem,
        "proposedSolution": solution,
        "techStack": tech,
        "features": features,
        "modules": modules,
        "documentationIncluded": docs,
        "level": "UG Final Year",
        "year": "2025-26 Edition",
        "featured": code == "AMCY001",
        "thumbnail": thumb,
        "status": "Available",
        "createdAt": f"2026-10-{10 + (code_num % 20):02d}T10:00:00.000Z",
        "updatedAt": "2026-11-04T10:00:00.000Z"
    }

def reconcile():
    with open(STORE_PATH, "r", encoding="utf-8") as f:
        store = json.load(f)

    print(f"Store currently has {len(store)} projects.")

    # Preserve all non-AMCY projects (107 AMPY, 19 AMJV, and others)
    non_amcy = [p for p in store if p.get("domainCode") != "AMCY" and not p.get("projectCode", "").startswith("AMCY")]
    print(f"Preserving {len(non_amcy)} non-AMCY projects.")

    # Build 9 official AMCY projects
    amcy_projects = []
    for code, title in OFFICIAL_AMCY_9:
        p_obj = build_metadata(code, title)
        amcy_projects.append(p_obj)

    print(f"Built {len(amcy_projects)} official Cyber Security projects (AMCY001 - AMCY009).")

    # Combine: maintain ordered sequence
    ampy_projects = [p for p in non_amcy if p.get("domainCode") == "AMPY"]
    amjv_projects = [p for p in non_amcy if p.get("domainCode") == "AMJV"]
    other_projects = [p for p in non_amcy if p.get("domainCode") not in ["AMPY", "AMJV", "AMCY"]]

    final_store = ampy_projects + amjv_projects + amcy_projects + other_projects

    print(f"Final store count: {len(final_store)} projects.")
    print(f"  AMPY: {len([p for p in final_store if p.get('domainCode') == 'AMPY'])}")
    print(f"  AMJV: {len([p for p in final_store if p.get('domainCode') == 'AMJV'])}")
    print(f"  AMCY: {len([p for p in final_store if p.get('domainCode') == 'AMCY'])}")
    print(f"  Others: {len([p for p in final_store if p.get('domainCode') not in ['AMPY', 'AMJV', 'AMCY']])}")

    with open(STORE_PATH, "w", encoding="utf-8") as f:
        json.dump(final_store, f, indent=2, ensure_ascii=False)

    print("Successfully written to src/data/projects-store.json!")

if __name__ == "__main__":
    reconcile()

