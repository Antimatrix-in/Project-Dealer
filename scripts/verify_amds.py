import json

with open('src/data/projects-store.json', 'r', encoding='utf-8') as f:
    projects = json.load(f)

print(f"Total projects in store: {len(projects)}")
amds_projs = [p for p in projects if p.get('domainCode') == 'AMDS']
print(f"Data Science – Python projects in store: {len(amds_projs)}")
codes = [p.get('projectCode') for p in amds_projs]

# Verify all 50 contiguous codes
expected_codes = [f"AMDS{i:03d}" for i in range(1, 51)]
missing = [c for c in expected_codes if c not in codes]
duplicates = [c for c in codes if codes.count(c) > 1]
print("Missing codes count:", len(missing))
print("Duplicate codes count:", len(duplicates))

# Verify specific source titles
samples = [
    ("AMDS001", "A Machine Learning and Optimization Framework for the Early Diagnosis of Bovine Respiratory Disease"),
    ("AMDS007", "Attack Detection for Medical Cyber-Physical SystemsA Systematic Literature Review"),
    ("AMDS022", "Deep CleanerA Few Shot Image Dataset Cleaner Using Supervised Contrastive Learning"),
    ("AMDS024", "DeepCurvMRI Deep Convolutional Curvelet Transform-Based MRI Approach for Early Detection of Alzheimers Disease"),
    ("AMDS029", "Explainable Artificial Intelligence EXAI Models for Early Prediction of Parkinsons Disease Based on Spiral and Wave Drawings"),
    ("AMDS050", "Skin Medical Image Captioning Using Multi-Label Classification and Siamese Networ")
]

title_map = {p.get('projectCode'): p.get('title') for p in amds_projs}
all_samples_match = True
for code, expected_title in samples:
    actual = title_map.get(code)
    match = (actual == expected_title)
    if not match:
        all_samples_match = False
        print(f"MISMATCH for {code}: expected '{expected_title}', got '{actual}'")
    else:
        print(f"[OK] {code}: {actual}")

print("All sample titles matched exactly:", all_samples_match)

