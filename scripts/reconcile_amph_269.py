import json
import re

def slugify(text: str) -> str:
    s = text.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"(^-|-$)", "", s)
    return s[:75]

def get_thumbnail(index: int, title: str) -> str:
    t = title.lower()
    if any(k in t for k in ["cart", "shop", "ecommerce", "selling", "payment", "sales", "billing"]):
        return "/images/projects/ecommerce-platform.jpg"
    if any(k in t for k in ["student", "school", "exam", "college", "recruitment", "placement", "academic", "attendance", "learning"]):
        return "/images/projects/ai-chatbot.jpg"
    if any(k in t for k in ["hospital", "health", "doctor", "blood", "medical", "vaccination", "patient"]):
        return "/images/projects/cloud-storage.jpg"
    if any(k in t for k in ["security", "password", "crypto", "gate", "dns", "visitor", "complaint"]):
        return "/images/projects/network-monitor.jpg"
    if any(k in t for k in ["agri", "farm", "crop", "weather", "water"]):
        return "/images/projects/plant-disease.jpg"
    
    images = [
        "/images/projects/ecommerce-platform.jpg",
        "/images/projects/cloud-storage.jpg",
        "/images/projects/network-monitor.jpg",
        "/images/projects/ai-chatbot.jpg",
        "/images/projects/plant-disease.jpg",
        "/images/projects/portfolio-cms.jpg"
    ]
    return images[index % len(images)]

def get_tech_stack(title: str) -> list:
    t = title.lower()
    stack = ["PHP 8.2", "MySQL 8.0", "Apache / Nginx", "JavaScript", "HTML5 / CSS3", "Tailwind CSS", "Docker"]
    if any(k in t for k in ["payment", "stripe", "razorpay", "billing"]):
        stack.insert(3, "Stripe / Payment Gateway API")
    if any(k in t for k in ["qr", "generator", "sms", "email", "alert"]):
        stack.insert(3, "PHPMailer & Twilio API")
    if any(k in t for k in ["security", "crypto", "password"]):
        stack.insert(3, "Argon2id & OpenSSL Crypto")
    return stack[:7]

def build_modules(title: str):
    t = title.lower()
    if any(k in t for k in ["payment", "billing", "shop", "cart", "selling", "e-learning with payment"]):
        return [
            {"name": "Module 1: User Identity & Role-Based Access Control", "description": "Manages customer, merchant, and admin authentication with secure session tokens and Argon2id hashing."},
            {"name": "Module 2: Transaction Catalog & Cart Management", "description": "Processes inventory items, calculates taxes, updates cart states, and generates unique order receipts."},
            {"name": "Module 3: Secure Payment Gateway & Webhook Engine", "description": "Handles payment processing, validates cryptographic signatures, and issues automated email/SMS invoices."},
            {"name": "Module 4: Financial Analytics & Operations Dashboard", "description": "Visualizes revenue trends, transaction logs, order status tracking, and audit trail reports."}
        ]
    if any(k in t for k in ["student", "school", "exam", "recruitment", "placement", "attendance", "hostel"]):
        return [
            {"name": "Module 1: Institutional Roster & Enrollment Management", "description": "Registers students, assigns institutional IDs, and structures academic departmental taxonomies."},
            {"name": "Module 2: Academic Record & Evaluation Pipeline", "description": "Tracks course grades, attendance logs, scheduling timetables, and performance benchmarks."},
            {"name": "Module 3: Student & Placement / Examination Portal", "description": "Provides secure interactive portals for students to view notices, submit applications, and download records."},
            {"name": "Module 4: Administrative Reporting & Export Console", "description": "Generates institutional PDF reports, automated status alerts, and CSV analytics for faculty."}
        ]
    if any(k in t for k in ["hospital", "doctor", "blood", "medical", "vaccination", "patient", "health"]):
        return [
            {"name": "Module 1: Patient Registration & Electronic Medical Records", "description": "Ingests demographic records, medical histories, and manages confidential health profiles."},
            {"name": "Module 2: Appointment Scheduler & Doctor Allocation", "description": "Coordinates clinician availability slots, department assignments, and booking queues."},
            {"name": "Module 3: Diagnostic Prescription & Inventory Tracking", "description": "Records physician orders, prescription medicines, and monitors laboratory/blood unit stocks."},
            {"name": "Module 4: Healthcare Administration & Audit Workstation", "description": "Generates patient discharge summaries, billing logs, and administrative compliance metrics."}
        ]
    return [
        {"name": "Module 1: User Authentication & Role Hierarchy", "description": "Authenticates user roles, protects sessions against CSRF/XSS, and enforces granular permissions."},
        {"name": "Module 2: Core Data Processing & Entity Management", "description": "Executes relational CRUD operations with prepared PDO SQL statements and relational constraints."},
        {"name": "Module 3: Business Logic & Workflow Automation", "description": "Coordinates task lifecycles, automated validation triggers, and notifications."},
        {"name": "Module 4: Administrative Dashboard & Reporting Console", "description": "Renders real-time telemetry, operational metrics, activity audit logs, and PDF/CSV export tools."}
    ]

def reconcile():
    with open("src/data/projects-store.json", "r", encoding="utf-8") as f:
        existing_store = json.load(f)
    
    print(f"Current store count: {len(existing_store)}")
    
    with open("scripts/extracted_amph_269.json", "r", encoding="utf-8") as f:
        catalogue_records = json.load(f)
        
    print(f"Loaded {len(catalogue_records)} extracted AMPH records.")
    
    # Filter out existing AMPH records
    non_amph = [p for p in existing_store if p.get("domainCode") != "AMPH" and not p.get("projectCode", "").startswith("AMPH")]
    print(f"Preserving {len(non_amph)} non-AMPH projects.")
    
    reconciled_amph = []
    
    for idx, item in enumerate(catalogue_records):
        code = item["code"]
        title = item["title"]
        slug = f"{code.lower()}-{slugify(title)}"
        
        tech_stack = get_tech_stack(title)
        modules = build_modules(title)
        thumbnail = get_thumbnail(idx, title)
        
        t = title.lower()
        tagline = f"PHP 8 MVC Architecture & Enterprise Web Platform • {code}"
        if any(k in t for k in ["payment", "billing", "shop", "ecommerce", "selling"]):
            tagline = f"PHP Transactional Web Architecture & Secure Billing • {code}"
        elif any(k in t for k in ["student", "school", "exam", "placement", "recruitment"]):
            tagline = f"Institutional Web Portal & PHP Student Management System • {code}"
        elif any(k in t for k in ["hospital", "doctor", "blood", "medical"]):
            tagline = f"Healthcare Enterprise Web Application & Clinical Telemetry • {code}"
        elif any(k in t for k in ["security", "password", "crypto", "auth"]):
            tagline = f"Cryptographic Web Security & Authentication System • {code}"
            
        description = f"An enterprise PHP web application implementing '{title}' with clean MVC software architecture, relational MySQL database schemas, and complete IEEE project documentation."
        
        abstract = (
            f"This project implements '{title}' utilizing enterprise PHP 8 and relational MySQL database infrastructure. "
            f"Modern digital organizations require robust, low-latency web platforms that ensure rigorous transactional consistency, "
            f"role-based security protocols, and intuitive user experiences. Our system adheres to standardized MVC software design patterns, "
            f"incorporating prepared PDO statements to eliminate SQL injection vulnerabilities, CSRF token validation, and responsive mobile-first interfaces. "
            f"Comprehensive testing under simulated operational loads confirms high data throughput, deterministic request handling, and complete alignment "
            f"with university final year engineering project deliverables and IEEE academic standards."
        )
        
        problem_statement = f"Conventional legacy workflows addressing '{title}' suffer from manual record keeping errors, decentralized data silos, security vulnerabilities, and lack of real-time administrative oversight."
        proposed_solution = f"A centralized web application engineered with PHP 8 and MySQL that delivers automated workflows, role-based access control, and real-time administrative dashboards."
        
        features = [
            "Modern PHP 8 MVC Architecture with Clean Separation of Concerns",
            "Relational MySQL Schema with Foreign Key Integrity & Optimized Indexes",
            "Prepared PDO SQL Statements Defending Against Injection Vulnerabilities",
            "Role-Based Access Control (RBAC) with CSRF and XSS Security Protection",
            "Interactive Web Dashboard with Real-Time Filtering and Data Analytics",
            "Complete University Final Year Project Deliverables with IEEE Base Paper"
        ]
        
        documentation = [
            "Standard Research Base Paper & Implementation Guide",
            "Comprehensive 65+ Page SRS and System Design Document",
            "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
            "High-Impact PPT Presentation (35 Slides with Visual Animations)",
            "Complete Clean Source Code with Database SQL Schema Dumps",
            "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
        ]
        
        day = (idx % 28) + 1
        created_at = f"2026-10-{day:02d}T10:00:00.000Z"
        
        record = {
            "id": code,
            "projectCode": code,
            "domainCode": "AMPH",
            "domainName": "Web Application - PHP",
            "slug": slug,
            "title": title,
            "category": "Web Application - PHP",
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
            "featured": idx < 3 or (idx % 25 == 0),
            "thumbnail": thumbnail,
            "status": "Available",
            "createdAt": created_at,
            "updatedAt": "2026-11-05T10:00:00.000Z"
        }
        reconciled_amph.append(record)
        
    print(f"Built {len(reconciled_amph)} official AMPH projects (AMPH001 - AMPH269).")
    
    # Combine preserved projects + reconciled AMPH projects
    final_store = non_amph + reconciled_amph
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
