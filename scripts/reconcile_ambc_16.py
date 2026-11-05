import json
import re

def slugify(text: str) -> str:
    s = text.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"(^-|-$)", "", s)
    return s[:75]

def get_thumbnail(index: int, title: str) -> str:
    t = title.lower()
    if any(k in t for k in ["healthcare", "medical", "vaccination", "covid"]):
        return "/images/projects/cloud-storage.jpg"
    if any(k in t for k in ["vehicle", "energy", "library", "fake product", "food"]):
        return "/images/projects/student-attendance.jpg"
    if any(k in t for k in ["bank", "cloud", "portal", "transaction"]):
        return "/images/projects/ecommerce-platform.jpg"
    
    images = [
        "/images/projects/network-monitor.jpg",
        "/images/projects/cloud-storage.jpg",
        "/images/projects/student-attendance.jpg",
        "/images/projects/ecommerce-platform.jpg"
    ]
    return images[index % len(images)]

def get_tech_stack(title: str) -> list:
    t = title.lower()
    if any(k in t for k in ["healthcare", "medical", "vaccination", "covid"]):
        return ["Java 17", "Python 3.10", "Hyperledger Fabric", "Web3j", "IPFS", "SHA-256 Cryptography", "Spring Boot"]
    if any(k in t for k in ["bank", "payment", "transaction", "energy"]):
        return ["C# .NET 8", "Python 3.10", "Ethereum / Solidity", "Nethereum", "Docker", "SQL Server"]
    if any(k in t for k in ["vehicle", "edge", "fog", "iot"]):
        return ["Python 3.10", "Java 17", "Hyperledger Fabric", "Web3.py", "MQTT", "Docker", "FastAPI"]
    if any(k in t for k in ["fake product", "food", "library"]):
        return ["Python 3.10", "Solidity", "Web3.py", "QR Code Generation", "Flask", "Bootstrap / React"]
    return ["Python 3.10", "Java 17", "C# .NET 8", "Hyperledger Fabric", "Solidity", "Web3.py", "Docker"]

def build_modules(title: str):
    t = title.lower()
    if any(k in t for k in ["healthcare", "medical", "certificate", "vaccination", "covid"]):
        return [
            {"name": "Module 1: Identity Registration & Role Authority", "description": "Enrolls healthcare practitioners, laboratories, and patients with decentralized cryptographic keypairs."},
            {"name": "Module 2: Medical Record Hashing & IPFS Off-Chain Storage", "description": "Encrypts diagnostic records and uploads encrypted payloads to decentralized IPFS with SHA-256 root hashes."},
            {"name": "Module 3: Smart Contract Access & Verification Protocol", "description": "Enforces patient consent policies and authorizes medical certificate verification on-chain."},
            {"name": "Module 4: Healthcare Portal & Audit Explorer", "description": "Delivers a responsive interface for certificate verification, credential issuance, and immutable audit logs."}
        ]
    if any(k in t for k in ["fake product", "food", "supply"]):
        return [
            {"name": "Module 1: Manufacturer Ingestion & Product Tagging", "description": "Registers authentic manufacturer items and generates cryptographically signed unique QR barcodes."},
            {"name": "Module 2: Supply Chain Block chain State Transitions", "description": "Records ownership handovers across distributors and retailers into immutable distributed blocks."},
            {"name": "Module 3: Consumer Verification & Counterfeit Detection", "description": "Enables end-users to scan QR codes and verify genuine manufacturer signatures against the ledger."},
            {"name": "Module 4: Provenance Explorer & Analytics Console", "description": "Renders chronological supply chain journey paths, counterfeit alerts, and product analytics."}
        ]
    return [
        {"name": "Module 1: Decentralized Identity & Wallet Management", "description": "Authenticates participants and manages public/private key cryptographic signatures."},
        {"name": "Module 2: Smart Contract & Transaction Modeling Core", "description": "Executes domain-specific business logic, validation rules, and atomic state updates on-chain."},
        {"name": "Module 3: Block chain Consensus & Distributed Ledger", "description": "Bundles transactions into Merkle trees and achieves Byzantine fault-tolerant consensus across peer nodes."},
        {"name": "Module 4: Interactive Web Explorer & Telemetry Dashboard", "description": "Visualizes block heights, transaction latencies, gas consumption, and tamper-proof audit trails."}
    ]

def reconcile():
    with open("src/data/projects-store.json", "r", encoding="utf-8") as f:
        existing_store = json.load(f)
    
    print(f"Current store count: {len(existing_store)}")
    
    with open("scripts/extracted_ambc_16.json", "r", encoding="utf-8") as f:
        catalogue_records = json.load(f)
        
    print(f"Loaded {len(catalogue_records)} extracted AMBC records.")
    
    # Filter out any existing AMBC records
    non_ambc = [p for p in existing_store if p.get("domainCode") != "AMBC" and not p.get("projectCode", "").startswith("AMBC")]
    print(f"Preserving {len(non_ambc)} non-AMBC projects.")
    
    reconciled_ambc = []
    
    for idx, item in enumerate(catalogue_records):
        code = item["code"]
        title = item["title"]
        slug = f"{code.lower()}-{slugify(title)}"
        
        tech_stack = get_tech_stack(title)
        modules = build_modules(title)
        thumbnail = get_thumbnail(idx, title)
        
        t = title.lower()
        tagline = f"Decentralized Ledger Technology & Smart Contracts • {code}"
        if any(k in t for k in ["healthcare", "medical", "vaccination", "covid"]):
            tagline = f"Decentralized Healthcare & Cryptographic EMR Verification • {code}"
        elif any(k in t for k in ["fake product", "food"]):
            tagline = f"Supply Chain Provenance & Counterfeit Prevention • {code}"
        elif any(k in t for k in ["bank", "energy", "transaction"]):
            tagline = f"High-Throughput Financial Ledgers & Consensus Protocols • {code}"
            
        description = (
            f"An enterprise decentralized Blockchain engineering project implementing '{title}' "
            f"utilizing smart contracts, cryptographic hashing, and peer-to-peer consensus across Python, Java, "
            f"and .NET environments, engineered with comprehensive IEEE academic documentation."
        )
        
        abstract = (
            f"This project implements '{title}' within the domain of Blockchain, Decentralized Distributed Systems, "
            f"and Cryptographic Protocols. Centralized architectures suffer from single points of failure, unauthorized data "
            f"tampering, and non-transparent audit trails. Our system architecture leverages immutable smart contracts, SHA-256 "
            f"Merkle tree verification, and decentralized peer-to-peer consensus to guarantee data authenticity and non-repudiation. "
            f"Extensive empirical benchmarking across throughput and latency metrics proves resilient tamper resistance, zero double-spending, "
            f"and complete alignment with university final year engineering requirements and IEEE base paper standards."
        )
        
        problem_statement = (
            f"Centralized systems addressing '{title}' are vulnerable to unauthorized ledger alterations, single-entity control, "
            f"and a lack of cryptographically verifiable provenance."
        )
        
        proposed_solution = (
            f"A decentralized, fault-tolerant blockchain framework utilizing immutable distributed ledgers, verifiable smart contracts, "
            f"and role-based cryptographic access control tailored to '{title}'."
        )
        
        features = [
            "Immutable Distributed Ledger Architecture with Cryptographic Merkle Proofs",
            "Automated Smart Contract Execution with Rigorous Multi-Tier Validation",
            "Decentralized Identity Authentication with Public/Private Key Cryptography",
            "Cross-Platform Interoperability Spanning Python, Java 17, and C# .NET 8",
            "Interactive Web Explorer with Live Block Heights and Transaction Verification",
            "Comprehensive University Final Year Deliverables Aligned with IEEE Guidelines"
        ]
        
        doc_included = [
            "Standard Research Base Paper & Implementation Guide",
            "Comprehensive 65+ Page SRS and System Design Document",
            "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
            "High-Impact PPT Presentation (35 Slides with Visual Animations)",
            "Complete Clean Source Code with Smart Contracts and Deployment Scripts",
            "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
        ]
        
        level = "UG Final Year" if idx % 2 == 0 else "PG / M.Tech"
        featured = code in ["AMBC001", "AMBC002", "AMBC005", "AMBC008", "AMBC011", "AMBC012", "AMBC016"]
        
        proj = {
            "id": code,
            "projectCode": code,
            "domainCode": "AMBC",
            "domainName": "Blockchain – Python / Java / DotNet",
            "slug": slug,
            "title": title,
            "category": "Blockchain – Python / Java / DotNet",
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
        reconciled_ambc.append(proj)
        
    print(f"Generated {len(reconciled_ambc)} AMBC projects.")
    
    # Combined store
    final_store = non_ambc + reconciled_ambc
    print(f"Total projects in final store: {len(final_store)}")
    
    with open("src/data/projects-store.json", "w", encoding="utf-8") as f:
        json.dump(final_store, f, indent=2, ensure_ascii=False)
        
    print("Successfully wrote updated projects-store.json!")

if __name__ == "__main__":
    reconcile()

