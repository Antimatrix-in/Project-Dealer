import json
import re
import os

STORE_PATH = os.path.join("src", "data", "projects-store.json")
EXTRACTED_PATH = os.path.join("scripts", "extracted_amim_210.json")

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def build_metadata(code, title):
    t_lower = title.lower()

    # Specialized tech stack inference based on MATLAB Image Processing scope
    tech = ["MATLAB R2024a", "Image Processing Toolbox"]
    if any(k in t_lower for k in ["cnn", "deep learning", "unet", "resnet", "densenet", "neural network", "attention"]):
        tech.extend(["Deep Learning Toolbox", "Computer Vision Toolbox", "GPU Coder"])
    elif any(k in t_lower for k in ["watermarking", "steganography", "visual cryptography", "secret sharing", "encryption"]):
        tech.extend(["Wavelet Toolbox", "Cryptography & Security Primitives", "Signal Processing Toolbox"])
    elif any(k in t_lower for k in ["video", "tracking", "motion", "optical flow"]):
        tech.extend(["Computer Vision Toolbox", "Automated Driving Toolbox", "Video Processing System"])
    elif any(k in t_lower for k in ["wavelet", "dct", "dwt", "svd", "nsct"]):
        tech.extend(["Wavelet Toolbox", "Signal Processing Toolbox", "MATLAB App Designer"])
    elif any(k in t_lower for k in ["svm", "hog", "machine learning", "classifier", "k-means", "fuzzy"]):
        tech.extend(["Statistics and Machine Learning Toolbox", "Computer Vision Toolbox"])
    else:
        tech.extend(["Computer Vision Toolbox", "Signal Processing Toolbox", "MATLAB App Designer"])

    seen = set()
    unique_tech = []
    for item in tech:
        if item not in seen:
            seen.add(item)
            unique_tech.append(item)

    # Taglines
    if any(k in t_lower for k in ["watermarking", "steganography", "cryptography"]):
        tagline = f"Digital Watermarking & Steganographic Security in MATLAB • {code}"
    elif any(k in t_lower for k in ["tumor", "mri", "medical", "cancer", "retinal"]):
        tagline = f"Biomedical Image Segmentation & CAD System in MATLAB • {code}"
    elif any(k in t_lower for k in ["video", "tracking", "motion"]):
        tagline = f"Real-Time Video Object Tracking & Motion Estimation in MATLAB • {code}"
    elif any(k in t_lower for k in ["super-resolution", "enhancement", "denoising", "restoration"]):
        tagline = f"Image Enhancement, Denoising & Super-Resolution in MATLAB • {code}"
    else:
        tagline = f"Digital Image Processing & Pattern Recognition in MATLAB • {code}"

    # Descriptions & Abstracts
    desc = f"An advanced engineering solution implementing '{title}' with modular MATLAB algorithms, automated feature extraction, and interactive GUI verification."
    abstract = (
        f"This project implements '{title}' utilizing MATLAB's high-performance matrix computing environment. "
        f"Digital image processing demands precise spatial and frequency-domain transformations, noise filtering, "
        f"morphological segmentation, and quantitative feature representation. The proposed architecture incorporates "
        f"standardized filter banks, matrix decompositions, and objective evaluation metrics (PSNR, SSIM, Dice score, ROC). "
        f"Comprehensive empirical validation demonstrates robust noise tolerance, high structural fidelity, "
        f"and complete deliverable alignment for university final year evaluations."
    )
    problem = f"Conventional image processing techniques in the domain of '{title}' suffer from illumination sensitivity, edge blurring, and computational latency during high-resolution processing."
    solution = f"A modular MATLAB computational framework featuring adaptive spatial filtering, transform-domain decomposition, and interactive App Designer demonstration interfaces."

    # Modules
    if any(k in t_lower for k in ["watermarking", "steganography", "secret"]):
        modules = [
            {"name": "Module 1: Cover Image Preprocessing & Decomposition", "description": "Converts color spaces, applies multiscale transforms (DWT, DCT, SVD), and selects embedding sub-bands."},
            {"name": "Module 2: Secret Data Embedding & Scrambling", "description": "Encrypts payload, generates pseudorandom sequence keys, and embeds watermarks with minimal distortion."},
            {"name": "Module 3: Channel Attack Simulation", "description": "Applies Gaussian noise, JPEG compression, cropping, and rotation to test robustness."},
            {"name": "Module 4: Extraction & Fidelity Evaluation", "description": "Recovers secret payload, computes Bit Error Rate (BER), PSNR, and SSIM metrics."}
        ]
    elif any(k in t_lower for k in ["video", "tracking", "traffic"]):
        modules = [
            {"name": "Module 1: Video Frame Extraction & Preprocessing", "description": "Separates video into discrete temporal frames, applies contrast normalization, and reduces sensor noise."},
            {"name": "Module 2: Background Subtraction & Motion Detection", "description": "Models dynamic background distributions using Gaussian Mixture Models (GMM) or optical flow."},
            {"name": "Module 3: Morphological Filtering & Blob Analysis", "description": "Removes spurious artifacts, connects fragmented contours, and extracts bounding box centroids."},
            {"name": "Module 4: Multi-Object Tracking & Analytics GUI", "description": "Assigns Kalman filter trajectories, calculates speeds/counts, and displays live HUD video feeds."}
        ]
    else:
        modules = [
            {"name": "Module 1: Image Ingestion & Preprocessing", "description": "Standardizes image dimensions, performs histogram equalization, and applies adaptive spatial filtering."},
            {"name": "Module 2: Morphological Segmentation & ROI Localization", "description": "Extracts regions of interest using thresholding, active contours, or deep convolutional features."},
            {"name": "Module 3: Feature Extraction & Classification Engine", "description": "Computes GLCM texture, HOG, geometric descriptors, or CNN latent features for decision modeling."},
            {"name": "Module 4: Quantitative Validation & MATLAB App Interface", "description": "Calculates PSNR, SSIM, confusion matrices, and provides an interactive GUI for test demonstrations."}
        ]

    docs = [
        "Standard Research Base Paper & Implementation Guide",
        "Comprehensive 65+ Page SRS and System Design Document",
        "UML & Algorithmic Flowcharts (Block, Signal Flow, State Machine)",
        "High-Impact PPT Presentation (35 Slides with Visual Animations)",
        "Complete Clean MATLAB (.m / .mlapp) Source Code with Sample Datasets",
        "Exhaustive Viva Voce Q&A Handbook (100+ Model Questions)"
    ]

    features = [
        "Complete Working MATLAB Source Code (.m scripts & App Designer .mlapp)",
        "Interactive Graphical User Interface (GUI) for Testing and Demonstration",
        "Quantitative Metrics Calculation (PSNR, SSIM, MSE, Accuracy, F1-Score)",
        "Comprehensive Evaluation on Standard Benchmark Medical & Natural Image Datasets",
        "Complete IEEE Base Paper and University Final Year Review Deliverables",
        "Step-by-Step Viva Voce Preparation Guide and Model Answers"
    ]

    thumbnails = [
        "/images/projects/plant-disease.jpg",
        "/images/projects/ai-chatbot.jpg",
        "/images/projects/ecommerce-platform.jpg",
        "/images/projects/student-attendance.jpg"
    ]
    code_num = int(code.replace("AMIM", ""))
    thumb = thumbnails[(code_num - 1) % len(thumbnails)]

    slug = f"{code.lower()}-{slugify(title)[:60].rstrip('-')}"

    return {
        "id": code,
        "projectCode": code,
        "domainCode": "AMIM",
        "domainName": "Image Processing – MATLAB",
        "slug": slug,
        "title": title,
        "category": "Image Processing – MATLAB",
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
        "featured": code in ["AMIM001", "AMIM002"],
        "thumbnail": thumb,
        "status": "Available",
        "createdAt": f"2026-09-{1 + (code_num % 28):02d}T10:00:00.000Z",
        "updatedAt": "2026-11-04T10:00:00.000Z"
    }

def reconcile():
    with open(STORE_PATH, "r", encoding="utf-8") as f:
        store = json.load(f)

    with open(EXTRACTED_PATH, "r", encoding="utf-8") as f:
        extracted = json.load(f)

    print(f"Store currently has {len(store)} projects.")
    print(f"Loaded {len(extracted)} extracted AMIM titles from catalogue.")

    # Preserve all non-AMIM projects
    non_amim = [p for p in store if p.get("domainCode") != "AMIM" and not p.get("projectCode", "").startswith("AMIM")]
    print(f"Preserving {len(non_amim)} non-AMIM projects.")

    # Build all 210 AMIM projects
    amim_projects = []
    for item in extracted:
        code = item["code"]
        title = item["title"]
        p_obj = build_metadata(code, title)
        amim_projects.append(p_obj)

    print(f"Built {len(amim_projects)} official Image Processing – MATLAB projects (AMIM001 - AMIM210).")

    # Combine: maintain ordered sequence
    ampy_projects = [p for p in non_amim if p.get("domainCode") == "AMPY"]
    amjv_projects = [p for p in non_amim if p.get("domainCode") == "AMJV"]
    amcy_projects = [p for p in non_amim if p.get("domainCode") == "AMCY"]
    amdj_projects = [p for p in non_amim if p.get("domainCode") == "AMDJ"]
    amds_projects = [p for p in non_amim if p.get("domainCode") == "AMDS"]
    other_projects = [p for p in non_amim if p.get("domainCode") not in ["AMPY", "AMJV", "AMCY", "AMDJ", "AMDS", "AMIM"]]

    final_store = ampy_projects + amjv_projects + amcy_projects + amdj_projects + amds_projects + amim_projects + other_projects

    print(f"Final store count: {len(final_store)} projects.")
    print(f"  AMPY: {len([p for p in final_store if p.get('domainCode') == 'AMPY'])}")
    print(f"  AMJV: {len([p for p in final_store if p.get('domainCode') == 'AMJV'])}")
    print(f"  AMCY: {len([p for p in final_store if p.get('domainCode') == 'AMCY'])}")
    print(f"  AMDJ: {len([p for p in final_store if p.get('domainCode') == 'AMDJ'])}")
    print(f"  AMDS: {len([p for p in final_store if p.get('domainCode') == 'AMDS'])}")
    print(f"  AMIM: {len([p for p in final_store if p.get('domainCode') == 'AMIM'])}")
    print(f"  Others: {len([p for p in final_store if p.get('domainCode') not in ['AMPY', 'AMJV', 'AMCY', 'AMDJ', 'AMDS', 'AMIM']])}")

    with open(STORE_PATH, "w", encoding="utf-8") as f:
        json.dump(final_store, f, indent=2, ensure_ascii=False)

    print("Successfully written to src/data/projects-store.json!")

if __name__ == "__main__":
    reconcile()

