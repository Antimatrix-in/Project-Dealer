import json
from collections import Counter

with open("src/data/projects-store.json", "r", encoding="utf-8") as f:
    projects = json.load(f)

print(f"Total projects in store: {len(projects)}")

domain_counts = Counter(p.get("domainCode") for p in projects)
print("Domain counts:")
for d in sorted(domain_counts.keys()):
    print(f"  {d}: {domain_counts[d]}")

amip_projects = [p for p in projects if p.get("domainCode") == "AMIP"]
amip_codes = [p.get("projectCode") for p in amip_projects]

expected_codes = [f"AMIP{i:03d}" for i in range(1, 13)]
missing = [c for c in expected_codes if c not in amip_codes]
duplicates = len(amip_codes) - len(set(amip_codes))

print(f"AMIP Missing: {missing}")
print(f"AMIP Duplicates: {duplicates}")

assert len(amip_projects) == 12, f"Expected 12 AMIP projects, got {len(amip_projects)}"
assert len(missing) == 0, f"Missing codes: {missing}"
assert duplicates == 0, f"Duplicate codes found: {duplicates}"

# Check all 12 project titles
title_checks = {
    "AMIP001": "Real-time Smile Detection using Integrated ML Model",
    "AMIP002": "A Method for Covid-19 Segmentation from X-Ray Images with U-Net",
    "AMIP003": "Graph-Based Region and Boundary Aggregation for Biomedical Image Segmentation",
    "AMIP004": "Hybrid Image Encryption Algorithm for Grey and Color Medical Images",
    "AMIP005": "Diagnosis of Diabetic Retinopathy and Glaucoma from Retinal Images Using Deep Convolutional Neural Network",
    "AMIP006": "Object Detection for Visually Challenged Using Image Processing",
    "AMIP007": "Robust Face Detection and Recognition using Image Processing and OpenCV",
    "AMIP008": "An Efficient Cascaded Model for Ship Segmentation in Aerial Images",
    "AMIP009": "Early Melanoma Diagnosis with Sequential Dermoscopic Images",
    "AMIP010": "Boundary Enhancement Semantic Segmentation for Building Extraction from Remote Sensed Image",
    "AMIP011": "Detection of License Plate Numbers and Identification of Non-Helmet Riders using Yolo v2 and OCR Method",
    "AMIP012": "A New Benchmarking for Diabetic Retinopathy Using Machine Learning, Deep Learning and Image Processing Technique"
}

by_code = {p["projectCode"]: p for p in amip_projects}
for code, expected_title in title_checks.items():
    actual = by_code[code]["title"]
    print(f"Checking {code}:")
    print(f"  Actual:   '{actual}'")
    print(f"  Expected: '{expected_title}'")
    assert actual == expected_title, f"Title mismatch for {code}:\nActual:   {actual}\nExpected: {expected_title}"

# Verify other domains are intact
expected_other_counts = {
    "AMPH": 269,
    "AMIM": 210,
    "AMPY": 107,
    "AMDL": 100,
    "AMDJ": 81,
    "AMAI": 60,
    "AMAD": 56,
    "AMDS": 50,
    "AMBD": 22,
    "AMJV": 19,
    "AMCY": 9,
    "AMML": 2,
    "AMCC": 1
}
for d, count in expected_other_counts.items():
    assert domain_counts[d] == count, f"Domain count altered for {d}! Expected {count}, got {domain_counts[d]}"

# Next sequential code
max_seq = max(int(c.replace("AMIP", "")) for c in amip_codes)
next_code = f"AMIP{max_seq + 1:03d}"
print(f"Next code for AMIP: {next_code}")
assert next_code == "AMIP013", f"Expected AMIP013, got {next_code}"

# Verify inquiries store
with open("src/data/inquiries-store.json", "r", encoding="utf-8") as f:
    inquiries = json.load(f)
print(f"Historical inquiries count: {len(inquiries)}")

print("\nALL VERIFICATION CHECKS PASSED SUCCESSFULLY FOR AMIP!")

