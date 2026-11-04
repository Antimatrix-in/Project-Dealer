import json
import re
import os

STORE_PATH = os.path.join("src", "data", "projects-store.json")
EXTRACTED_PATH = os.path.join("scripts", "extracted_amdj_81.json")

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def build_metadata(code, title):
    t_lower = title.lower()

    # Clean any trailing page numbers if present
    if title.endswith(" Page 3"):
        title = title[:-7].strip()
    elif title.endswith(" Page 4"):
        title = title[:-7].strip()

    # Specialized tech stack inference based on Django project scope
    tech = ["Python 3.10", "Django 5.0"]
    if any(k in t_lower for k in ["blockchain"]):
        tech.extend(["Solidity", "Web3.py", "SQLite / PostgreSQL", "Bootstrap 5"])
    elif any(k in t_lower for k in ["chatbot"]):
        tech.extend(["NLP / NLTK", "Django Channels", "WebSockets", "Tailwind CSS"])
    elif any(k in t_lower for k in ["ecommerce", "shopping", "food ordering", "store"]):
        tech.extend(["Stripe / Razorpay API", "Django ORM", "PostgreSQL", "Tailwind CSS"])
    elif any(k in t_lower for k in ["cloud", "server", "data security", "data recovery"]):
        tech.extend(["Cryptography / PyCryptodome", "Django REST Framework", "Docker", "MySQL"])
    elif any(k in t_lower for k in ["crop", "prediction"]):
        tech.extend(["Scikit-Learn", "Pandas", "NumPy", "Django ORM", "Matplotlib"])
    elif any(k in t_lower for k in ["exam", "voting", "airline", "railway"]):
        tech.extend(["Django REST Framework", "ReportLab PDF", "PostgreSQL", "Tailwind CSS"])
    else:
        tech.extend(["Django ORM", "SQLite / PostgreSQL", "HTML5 / Tailwind CSS", "JavaScript"])

    # Remove duplicates preserving order
    seen = set()
    unique_tech = []
    for item in tech:
        if item not in seen:
            seen.add(item)
            unique_tech.append(item)

    # Taglines
    if "management" in t_lower or "system" in t_lower:
        tagline = f"Full-Stack Django Architecture & Role-Based Workflows • {code}"
    elif "security" in t_lower or "cloud" in t_lower or "blockchain" in t_lower:
        tagline = f"Secure Cloud & Cryptographic Django Framework • {code}"
    elif "chatbot" in t_lower:
        tagline = f"Interactive AI Conversational Web Interface in Django • {code}"
    elif "prediction" in t_lower:
        tagline = f"Machine Learning & Predictive Django Analytics • {code}"
    else:
        tagline = f"Modular Django Web Architecture & ORM Services • {code}"

    # Descriptions & Abstracts
    desc = f"A production-ready full-stack Django web application implementing '{title}' with clean MVC architecture, relational database models, and role-based access control."
    abstract = (
        f"This project implements '{title}' utilizing the high-level Python Django web framework. "
        f"Web applications in this domain require structured data persistence, robust user session authentication, "
        f"automated form validation, and responsive user interfaces. The system features an MVC architectural design, "
        f"ORM data modeling, CSRF-protected request pipelines, and comprehensive administrative reporting. "
        f"Rigorous end-to-end verification confirms high usability, data integrity, and complete deliverable compliance for final year engineering reviews."
    )
    problem = f"Conventional non-standardized workflows in the context of '{title}' suffer from manual record discrepancies, vulnerable data access, and lack of real-time auditability."
    solution = f"A modular Django web platform featuring relational ORM modeling, granular user authorization, and automated reporting dashboards."

    # Modules
    if any(k in t_lower for k in ["ecommerce", "shopping", "food", "airline", "railway", "booking"]):
        modules = [
            {"name": "Module 1: User Authentication & Profile Portal", "description": "Handles registration, session management, and role-based permissions."},
            {"name": "Module 2: Catalog & Dynamic Listing Service", "description": "Renders searchable, filterable items with real-time availability checking."},
            {"name": "Module 3: Booking, Cart & Transaction Dispatch", "description": "Manages order placement, reservation logic, and status lifecycle updates."},
            {"name": "Module 4: Admin Reporting & Inventory Console", "description": "Provides analytical dashboards, exportable PDF/Excel summaries, and inventory logs."}
        ]
    elif any(k in t_lower for k in ["cloud", "security", "blockchain", "recovery"]):
        modules = [
            {"name": "Module 1: Authentication & Identity Management", "description": "Enforces secure multi-role logins, password hashing, and token validation."},
            {"name": "Module 2: Cryptographic Encryption & Chunking Service", "description": "Executes data encryption, hashing, and access verification routines."},
            {"name": "Module 3: Distributed Storage & Protocol Engine", "description": "Coordinates secure client-server data dispatch and integrity validation."},
            {"name": "Module 4: Security Telemetry & Audit Dashboard", "description": "Monitors access violations, audit logs, and resource usage metrics."}
        ]
    else:
        modules = [
            {"name": "Module 1: Role-Based User Authentication", "description": "Manages administrator, staff, and student/client access privileges."},
            {"name": "Module 2: Core Data Management & Processing", "description": "Executes CRUD workflows, form validations, and database relational mappings."},
            {"name": "Module 3: Search, Filter & Notification Engine", "description": "Enables rapid indexing, custom queries, and automated notification triggers."},
            {"name": "Module 4: Analytics & Administrative Dashboard", "description": "Renders key operational metrics, charts, and downloadable compliance summaries."}
        ]

    docs = [
        "Standard Research Base Paper & Implementation Guide",
        "Comprehensive 65+ Page SRS and System Design Document",
        "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
        "High-Impact PPT Presentation (35 Slides with Visual Animations)",
        "Complete Clean Source Code with Django Setup Instructions",
        "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ]

    features = [
        "Full-Stack Python Django Framework with Clean Relational ORM Architecture",
        "Granular Role-Based Access Control (Admin, Staff, and Client Portals)",
        "Automated Form Validation with Built-In CSRF & SQL Injection Protection",
        "Interactive Dashboards with Dynamic Data Filtering and Search",
        "Exportable PDF/Excel Reports and System Audit Logs",
        "Complete University Final Year Project Deliverables & Base Paper"
    ]

    thumbnails = [
        "/images/projects/ecommerce-platform.jpg",
        "/images/projects/student-attendance.jpg",
        "/images/projects/ai-chatbot.jpg"
    ]
    code_num = int(code.replace("AMDJ", ""))
    thumb = thumbnails[(code_num - 1) % len(thumbnails)]

    slug = f"{code.lower()}-{slugify(title)[:60].rstrip('-')}"

    return {
        "id": code,
        "projectCode": code,
        "domainCode": "AMDJ",
        "domainName": "Django – Python",
        "slug": slug,
        "title": title,
        "category": "Django – Python",
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
        "featured": code in ["AMDJ001", "AMDJ002"],
        "thumbnail": thumb,
        "status": "Available",
        "createdAt": f"2026-10-{1 + (code_num % 28):02d}T10:00:00.000Z",
        "updatedAt": "2026-11-04T10:00:00.000Z"
    }

def reconcile():
    with open(STORE_PATH, "r", encoding="utf-8") as f:
        store = json.load(f)

    with open(EXTRACTED_PATH, "r", encoding="utf-8") as f:
        extracted = json.load(f)

    print(f"Store currently has {len(store)} projects.")
    print(f"Loaded {len(extracted)} extracted AMDJ titles from catalogue.")

    # Preserve all non-AMDJ projects (AMPY, AMJV, AMCY, and others)
    non_amdj = [p for p in store if p.get("domainCode") != "AMDJ" and not p.get("projectCode", "").startswith("AMDJ")]
    print(f"Preserving {len(non_amdj)} non-AMDJ projects.")

    # Build all 81 AMDJ projects
    amdj_projects = []
    for item in extracted:
        code = item["code"]
        title = item["title"]
        # Clean specific page number tails
        if code == "AMDJ027" and "Page 3" in title:
            title = "Eshop Ecommerce Shopping"
        elif code == "AMDJ054" and "Page 4" in title:
            title = "Online Food Ordering System"

        p_obj = build_metadata(code, title)
        amdj_projects.append(p_obj)

    print(f"Built {len(amdj_projects)} official Django – Python projects (AMDJ001 - AMDJ081).")

    # Combine: maintain ordered sequence
    ampy_projects = [p for p in non_amdj if p.get("domainCode") == "AMPY"]
    amjv_projects = [p for p in non_amdj if p.get("domainCode") == "AMJV"]
    amcy_projects = [p for p in non_amdj if p.get("domainCode") == "AMCY"]
    other_projects = [p for p in non_amdj if p.get("domainCode") not in ["AMPY", "AMJV", "AMCY", "AMDJ"]]

    final_store = ampy_projects + amjv_projects + amcy_projects + amdj_projects + other_projects

    print(f"Final store count: {len(final_store)} projects.")
    print(f"  AMPY: {len([p for p in final_store if p.get('domainCode') == 'AMPY'])}")
    print(f"  AMJV: {len([p for p in final_store if p.get('domainCode') == 'AMJV'])}")
    print(f"  AMCY: {len([p for p in final_store if p.get('domainCode') == 'AMCY'])}")
    print(f"  AMDJ: {len([p for p in final_store if p.get('domainCode') == 'AMDJ'])}")
    print(f"  Others: {len([p for p in final_store if p.get('domainCode') not in ['AMPY', 'AMJV', 'AMCY', 'AMDJ']])}")

    with open(STORE_PATH, "w", encoding="utf-8") as f:
        json.dump(final_store, f, indent=2, ensure_ascii=False)

    print("Successfully written to src/data/projects-store.json!")

if __name__ == "__main__":
    reconcile()

