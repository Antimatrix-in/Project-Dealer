import json

with open('src/data/projects-store.json', 'r', encoding='utf-8') as f:
    projects = json.load(f)

print(f"Total projects in store: {len(projects)}")
amim_projs = [p for p in projects if p.get('domainCode') == 'AMIM']
print(f"Image Processing – MATLAB projects in store: {len(amim_projs)}")
codes = [p.get('projectCode') for p in amim_projs]

# Verify all 210 contiguous codes
expected_codes = [f"AMIM{i:03d}" for i in range(1, 211)]
missing = [c for c in expected_codes if c not in codes]
duplicates = [c for c in codes if codes.count(c) > 1]
print("Missing codes count:", len(missing))
print("Duplicate codes count:", len(duplicates))

# Verify specific source titles
samples = [
    ("AMIM001", "A CNN-Model to Classify Low-Grade and High-Grade Glioma From MRI Images"),
    ("AMIM050", "Water Classification Using Convolutional Neural Network"),
    ("AMIM100", "Artificial Intelligence based Facial Emotions Analysis for Depression Detection"),
    ("AMIM150", "Robust Point Set Matching for Partial Face Recognition"),
    ("AMIM200", "Commutative Encryption and Data Hiding in HEVC Video Compression"),
    ("AMIM210", "Steganography Using Reversible Texture Synthesi")
]

title_map = {p.get('projectCode'): p.get('title') for p in amim_projs}
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

