import json
import re

def slugify(text: str) -> str:
    s = text.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"(^-|-$)", "", s)
    return s[:75]

def get_thumbnail(index: int, title: str) -> str:
    t = title.lower()
    if any(k in t for k in ["medical", "retinopathy", "covid", "biomedical", "melanoma", "dermoscopic", "retinal"]):
        return "/images/projects/cloud-storage.jpg"
    if any(k in t for k in ["encryption", "security", "face", "smile"]):
        return "/images/projects/network-monitor.jpg"
    if any(k in t for k in ["license plate", "helmet", "yolo", "ship", "building", "remote"]):
        return "/images/projects/student-attendance.jpg"
    
    images = [
        "/images/projects/network-monitor.jpg",
        "/images/projects/cloud-storage.jpg",
        "/images/projects/student-attendance.jpg",
        "/images/projects/ai-chatbot.jpg"
    ]
    return images[index % len(images)]

def get_tech_stack(title: str) -> list:
    t = title.lower()
    if any(k in t for k in ["u-net", "segmentation", "biomedical", "boundary"]):
        return ["Python 3.10", "PyTorch", "OpenCV", "Scikit-Image", "Albumentations", "NumPy", "Matplotlib"]
    if any(k in t for k in ["retinopathy", "glaucoma", "convolutional", "deep learning"]):
        return ["Python 3.10", "TensorFlow / Keras", "OpenCV", "Scikit-Learn", "NumPy", "Matplotlib", "Flask"]
    if any(k in t for k in ["encryption", "hybrid"]):
        return ["Python 3.10", "OpenCV", "PyCryptodome", "NumPy", "Chaotic Map Algorithms", "Matplotlib"]
    if any(k in t for k in ["yolo", "license", "helmet", "ocr"]):
        return ["Python 3.10", "OpenCV", "YOLO v2 / Darknet", "Tesseract OCR", "NumPy", "PyTorch"]
    if any(k in t for k in ["face", "smile", "visually challenged", "object detection"]):
        return ["Python 3.10", "OpenCV", "Dlib", "Scikit-Learn", "NumPy", "Tkinter"]
    if any(k in t for k in ["melanoma", "dermoscopic"]):
        return ["Python 3.10", "PyTorch", "OpenCV", "Scikit-Image", "NumPy", "Pandas", "Matplotlib"]
    return ["Python 3.10", "OpenCV", "Scikit-Image", "NumPy", "Matplotlib", "Tkinter"]

def build_modules(title: str):
    t = title.lower()
    if any(k in t for k in ["segmentation", "u-net", "biomedical", "boundary", "building", "ship"]):
        return [
            {"name": "Module 1: Image Ingestion & Spatial Preprocessing", "description": "Loads raw multi-spectral / clinical imagery, normalizes pixel intensities, and applies adaptive contrast enhancement."},
            {"name": "Module 2: Multiscale Feature & Boundary Aggregation", "description": "Extracts edge gradients, region boundaries, and deep encoder-decoder contextual representations."},
            {"name": "Module 3: Semantic Segmentation Engine", "description": "Executes pixel-wise classification using U-Net / cascaded architectures with Dice loss optimization."},
            {"name": "Module 4: Post-Processing & Morphological Refinement", "description": "Applies morphological opening/closing, computes intersection-over-union (IoU) metrics, and renders overlay masks."}
        ]
    if any(k in t for k in ["encryption", "security"]):
        return [
            {"name": "Module 1: Image Matrix Decomposition & Color Channel Separation", "description": "Splits medical images into RGB / greyscale matrices and converts pixel coordinates into bit-plane arrays."},
            {"name": "Module 2: Chaotic Map Permutation & Confusion Engine", "description": "Generates pseudo-random chaotic key sequences (Arnold cat map / Lorenz) to shuffle pixel spatial positions."},
            {"name": "Module 3: Diffusion & Bitwise Cryptographic Substitution", "description": "Performs XOR diffusion operations across adjacent pixels to alter statistical histograms and thwart differential attacks."},
            {"name": "Module 4: Decryption & NIST Cryptanalysis Console", "description": "Evaluates NPCR, UACI, and information entropy scores, verifying lossless image reconstruction upon decryption."}
        ]
    if any(k in t for k in ["license", "helmet", "ocr", "yolo"]):
        return [
            {"name": "Module 1: Video Frame Capture & Vehicle Tracking", "description": "Streams highway camera footage and detects two-wheelers and passenger vehicles using YOLO bounding boxes."},
            {"name": "Module 2: Head Region Localization & Helmet Verification", "description": "Crops rider head regions and evaluates safety gear compliance using binary convolutional classifiers."},
            {"name": "Module 3: License Plate Localization & Character Segmentation", "description": "Applies morphological edge filtering to isolate vehicle registration plates and segments alphanumeric characters."},
            {"name": "Module 4: Tesseract OCR Engine & Violation Logger", "description": "Recognizes license plate characters via OCR, cross-checks vehicle registers, and logs timestamped infraction events."}
        ]
    return [
        {"name": "Module 1: Video Capture & Region-of-Interest Extraction", "description": "Captures optical frames from webcam/camera feeds and standardizes resolution and lighting balance."},
        {"name": "Module 2: Landmark Detection & Feature Gradient Modeling", "description": "Extracts spatial geometric landmarks, edge contours, and texture descriptor vectors using OpenCV."},
        {"name": "Module 3: Integrated Classifier & Machine Learning Core", "description": "Classifies target features and objects using trained ensembles, neural estimators, and probability thresholding."},
        {"name": "Module 4: Real-Time HUD Overlay & Analytics Console", "description": "Renders real-time bounding boxes, visual state indicators, performance charts, and audit telemetry."}
    ]

def reconcile():
    with open("src/data/projects-store.json", "r", encoding="utf-8") as f:
        existing_store = json.load(f)
    
    print(f"Current store count: {len(existing_store)}")
    
    with open("scripts/extracted_amip_12.json", "r", encoding="utf-8") as f:
        catalogue_records = json.load(f)
        
    print(f"Loaded {len(catalogue_records)} extracted AMIP records.")
    
    # Filter out any existing AMIP records
    non_amip = [p for p in existing_store if p.get("domainCode") != "AMIP" and not p.get("projectCode", "").startswith("AMIP")]
    print(f"Preserving {len(non_amip)} non-AMIP projects.")
    
    reconciled_amip = []
    
    for idx, item in enumerate(catalogue_records):
        code = item["code"]
        title = item["title"]
        slug = f"{code.lower()}-{slugify(title)}"
        
        tech_stack = get_tech_stack(title)
        modules = build_modules(title)
        thumbnail = get_thumbnail(idx, title)
        
        t = title.lower()
        tagline = f"Computer Vision & Python Image Processing Architecture • {code}"
        if any(k in t for k in ["medical", "retinopathy", "covid", "biomedical", "melanoma"]):
            tagline = f"Biomedical Image Diagnostics & Clinical Computer Vision • {code}"
        elif any(k in t for k in ["encryption", "security"]):
            tagline = f"Digital Image Cryptography & Visual Security Algorithms • {code}"
        elif any(k in t for k in ["yolo", "license", "helmet", "ocr"]):
            tagline = f"Real-Time Intelligent Traffic Telemetry & Optical OCR • {code}"
        elif any(k in t for k in ["segmentation", "ship", "building", "remote"]):
            tagline = f"Deep Spatial Semantic Segmentation & Aerial Imagery • {code}"
            
        description = (
            f"An advanced Python Image Processing and Computer Vision project implementing '{title}' "
            f"utilizing OpenCV, Scikit-Image, and deep feature extractors, engineered with modular architecture, "
            f"high-throughput image pipelines, and exhaustive IEEE academic documentation."
        )
        
        abstract = (
            f"This project implements '{title}' within the domain of Image Processing using Python and Computer Vision. "
            f"Visual computing requires high fidelity feature representation, noise attenuation, and low-latency inference "
            f"across heterogeneous image formats. Our system architecture employs advanced OpenCV spatial transformation "
            f"kernels, morphological segmentation filters, and machine learning models to analyze pixel distributions. "
            f"Quantitative validation against benchmark ground-truth datasets demonstrates superior precision, high IoU/accuracy "
            f"scores, and complete compliance with university final year engineering requirements and IEEE base paper benchmarks."
        )
        
        problem_statement = (
            f"Conventional manual inspection and basic thresholding techniques fail to deliver reliable results for '{title}', "
            f"suffering from illumination sensitivity, high error rates, and prohibitive manual processing delays."
        )
        
        proposed_solution = (
            f"An automated, end-to-end computer vision framework in Python combining optimized spatial filtering, "
            f"deep feature extraction, and high-accuracy classification/segmentation tailored to '{title}'."
        )
        
        features = [
            "Advanced Multi-Channel Image Ingestion and Histogram Equalization",
            "Robust Spatial Filtering, Morphological Segmentation, and Feature Extraction",
            "High-Accuracy Classification / Segmentation Optimized for Low Latency",
            "Real-Time Visual HUD Overlay with Interactive Visual Telemetry",
            "Exportable Diagnostic Metrics (Confusion Matrix, Precision, Recall, IoU)",
            "Comprehensive University Final Year Deliverables Aligned with IEEE Guidelines"
        ]
        
        doc_included = [
            "Standard Research Base Paper & Implementation Guide",
            "Comprehensive 65+ Page SRS and System Design Document",
            "UML Diagrams (Class, Sequence, Activity, Component, Deployment)",
            "High-Impact PPT Presentation (35 Slides with Visual Animations)",
            "Complete Clean Python Source Code with Requirements and Execution Scripts",
            "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
        ]
        
        level = "UG Final Year" if idx % 2 == 0 else "PG / M.Tech"
        featured = code in ["AMIP001", "AMIP002", "AMIP004", "AMIP007", "AMIP011"]
        
        proj = {
            "id": code,
            "projectCode": code,
            "domainCode": "AMIP",
            "domainName": "Image Processing – Python",
            "slug": slug,
            "title": title,
            "category": "Image Processing – Python",
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
        reconciled_amip.append(proj)
        
    print(f"Generated {len(reconciled_amip)} AMIP projects.")
    
    # Combined store
    final_store = non_amip + reconciled_amip
    print(f"Total projects in final store: {len(final_store)}")
    
    with open("src/data/projects-store.json", "w", encoding="utf-8") as f:
        json.dump(final_store, f, indent=2, ensure_ascii=False)
        
    print("Successfully wrote updated projects-store.json!")

if __name__ == "__main__":
    reconcile()

