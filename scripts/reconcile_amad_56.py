import json
import re

def slugify(text: str) -> str:
    s = text.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"(^-|-$)", "", s)
    return s[:75]

def get_thumbnail(index: int, title: str) -> str:
    t = title.lower()
    if any(k in t for k in ["medical", "health", "hospital", "doctor", "blood", "medicine", "organ"]):
        return "/images/projects/cloud-storage.jpg"
    if any(k in t for k in ["tracking", "gps", "location", "route", "bus", "navigation", "map", "taxi", "parking"]):
        return "/images/projects/student-attendance.jpg"
    if any(k in t for k in ["security", "malware", "privacy", "protection", "encryption", "sms", "auth", "safe", "rescue"]):
        return "/images/projects/network-monitor.jpg"
    if any(k in t for k in ["student", "college", "attendance", "exam", "book", "placement", "study", "counselling"]):
        return "/images/projects/ai-chatbot.jpg"
    if any(k in t for k in ["farmer", "agri"]):
        return "/images/projects/plant-disease.jpg"
    
    images = [
        "/images/projects/student-attendance.jpg",
        "/images/projects/network-monitor.jpg",
        "/images/projects/cloud-storage.jpg",
        "/images/projects/ai-chatbot.jpg",
        "/images/projects/ecommerce-platform.jpg",
        "/images/projects/plant-disease.jpg"
    ]
    return images[index % len(images)]

def get_tech_stack(title: str) -> list:
    t = title.lower()
    stack = ["Java 17", "Android SDK", "Android Studio", "SQLite / Room DB", "XML Layouts", "Retrofit"]
    if any(k in t for k in ["gps", "location", "tracking", "map", "route", "navigation", "taxi", "parking"]):
        stack.insert(3, "Google Maps API & Location Services")
    elif any(k in t for k in ["security", "encryption", "malware", "codetracker", "auth"]):
        stack.insert(3, "Android Keystore & Cryptographic API")
    elif any(k in t for k in ["barcode", "qr", "camera", "scan"]):
        stack.insert(3, "ZXing Barcode / QR Scanner API")
    elif any(k in t for k in ["sensor", "accelerometer", "gyroscope", "tile", "fall"]):
        stack.insert(3, "Android SensorManager API")
    return stack[:7]

def build_modules(title: str):
    t = title.lower()
    if any(k in t for k in ["gps", "location", "tracking", "bus", "map", "navigation", "taxi"]):
        return [
            {"name": "Module 1: Location Telemetry & Geofencing Engine", "description": "Queries device GPS coordinates via FusedLocationProviderClient and computes geofenced boundaries."},
            {"name": "Module 2: Real-Time Map Visualization & Route Plotter", "description": "Overlays live user markers, path poly-lines, and transit points onto Google Maps SDK layers."},
            {"name": "Module 3: Background Tracking & Proximity Alerts", "description": "Runs foreground Android notification service tracking location changes and triggering alerts."},
            {"name": "Module 4: User Portal & Emergency Dispatch Console", "description": "Renders ETA calculations, interactive search filters, and one-tap emergency contact notifications."}
        ]
    if any(k in t for k in ["security", "malware", "encryption", "sms", "codetracker", "safe", "rescue"]):
        return [
            {"name": "Module 1: Telemetry Ingestion & Intercept Authority", "description": "Monitors incoming SMS / application events using registered Android BroadcastReceivers."},
            {"name": "Module 2: Threat Detection & Cryptographic Defense", "description": "Executes cryptographic token verification and heuristic behavior analysis against malicious payloads."},
            {"name": "Module 3: Emergency Dispatch & Notification Protocol", "description": "Dispatches instant SOS distress alerts with encrypted location coordinates to pre-configured contacts."},
            {"name": "Module 4: Security Telemetry & Configuration Console", "description": "Renders security logs, threat detection statistics, and customizable permission controls."}
        ]
    return [
        {"name": "Module 1: User Identity & Profile Management", "description": "Manages user registration, role verification, and local SQLite/Room credential caching."},
        {"name": "Module 2: Native Android UI & Form Interaction", "description": "Delivers material design interfaces, interactive list views, and responsive user input forms."},
        {"name": "Module 3: Business Logic & Data Synchronization", "description": "Coordinates offline-first SQLite data storage with RESTful remote cloud API synchronization."},
        {"name": "Module 4: Analytics, Notifications & Export Console", "description": "Generates real-time push notifications, operational reports, and status export tools."}
    ]

def reconcile():
    with open("src/data/projects-store.json", "r", encoding="utf-8") as f:
        existing_store = json.load(f)
    
    print(f"Current store count: {len(existing_store)}")
    
    with open("scripts/extracted_amad_56.json", "r", encoding="utf-8") as f:
        catalogue_records = json.load(f)
        
    print(f"Loaded {len(catalogue_records)} extracted AMAD records.")
    
    # Filter out existing AMAD records
    non_amad = [p for p in existing_store if p.get("domainCode") != "AMAD" and not p.get("projectCode", "").startswith("AMAD")]
    print(f"Preserving {len(non_amad)} non-AMAD projects.")
    
    reconciled_amad = []
    
    for idx, item in enumerate(catalogue_records):
        code = item["code"]
        title = item["title"]
        slug = f"{code.lower()}-{slugify(title)}"
        
        tech_stack = get_tech_stack(title)
        modules = build_modules(title)
        thumbnail = get_thumbnail(idx, title)
        
        t = title.lower()
        tagline = f"Native Android Java & Mobile Architecture • {code}"
        if any(k in t for k in ["gps", "location", "tracking", "map", "navigation"]):
            tagline = f"Android Location Services & Real-Time GIS Telemetry • {code}"
        elif any(k in t for k in ["security", "malware", "encryption", "safe", "rescue"]):
            tagline = f"Mobile Threat Defense & Android Cryptographic Security • {code}"
        elif any(k in t for k in ["health", "medical", "blood", "medicine", "fall"]):
            tagline = f"Healthcare Mobile Computing & Telemedicine Portal • {code}"
        elif any(k in t for k in ["student", "college", "attendance", "exam"]):
            tagline = f"Campus Mobility & Academic Android Management System • {code}"
            
        description = f"A native Android Java mobile application implementing '{title}' with modular architecture, robust SQLite / Room local storage, and comprehensive IEEE documentation."
        
        abstract = (
            f"This project implements '{title}' within the domain of native Android Java mobile computing and pervasive systems. "
            f"Mobile devices demand low-power execution, responsive material user interfaces, resilient background services, and offline data persistence. "
            f"Our framework is built using native Android SDK components, utilizing structured Activity / Fragment lifecycles, Room ORM SQLite database schemas, "
            f"and asynchronous multi-threaded background workers. Comprehensive testing across diverse Android OS API levels confirms high frame-rate rendering, "
            f"deterministic battery-conserving execution, and full alignment with university final year engineering requirements and IEEE base paper benchmarks."
        )
        
        problem_statement = f"Conventional desktop workflows and legacy manual procedures addressing '{title}' suffer from lack of mobility, delayed real-time communications, and absence of instant contextual sensor feedback."
        proposed_solution = f"A native Android application utilizing mobile device sensors, local SQLite database caching, and responsive UI components to provide on-the-go automation."
        
        features = [
            "Native Android Java Implementation Built with Android Studio & Modern SDK",
            "Responsive Material Design User Interface with Smooth Navigation Lifecycles",
            "Offline-First Data Architecture Using SQLite / Room Database Persistence",
            "Asynchronous Background Processing and Real-Time Push Notification Engine",
            "Robust Hardware Sensor & Location Integration (GPS / Camera / Accelerometer)",
            "Complete University Final Year Project Deliverables with IEEE Base Paper"
        ]
        
        documentation = [
            "Standard Research Base Paper & Implementation Guide",
            "Comprehensive 65+ Page SRS and System Design Document",
            "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
            "High-Impact PPT Presentation (35 Slides with Visual Animations)",
            "Complete Clean Source Code with Android Studio Project & Gradle Scripts",
            "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
        ]
        
        day = (idx % 28) + 1
        created_at = f"2026-10-{day:02d}T10:00:00.000Z"
        
        record = {
            "id": code,
            "projectCode": code,
            "domainCode": "AMAD",
            "domainName": "Android – Java",
            "slug": slug,
            "title": title,
            "category": "Android – Java",
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
            "featured": idx < 3 or (idx % 15 == 0),
            "thumbnail": thumbnail,
            "status": "Available",
            "createdAt": created_at,
            "updatedAt": "2026-11-05T10:00:00.000Z"
        }
        reconciled_amad.append(record)
        
    print(f"Built {len(reconciled_amad)} official AMAD projects (AMAD001 - AMAD056).")
    
    # Combine preserved projects + reconciled AMAD projects
    final_store = non_amad + reconciled_amad
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

