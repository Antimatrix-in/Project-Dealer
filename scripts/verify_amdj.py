import json

with open('src/data/projects-store.json', 'r', encoding='utf-8') as f:
    projects = json.load(f)

print(f"Total projects in store: {len(projects)}")
amdj_projs = [p for p in projects if p.get('domainCode') == 'AMDJ']
print(f"Django – Python projects in store: {len(amdj_projs)}")
codes = [p.get('projectCode') for p in amdj_projs]

# Verify all 81 contiguous codes
expected_codes = [f"AMDJ{i:03d}" for i in range(1, 82)]
missing = [c for c in expected_codes if c not in codes]
duplicates = [c for c in codes if codes.count(c) > 1]
print("Missing codes count:", len(missing))
print("Duplicate codes count:", len(duplicates))

# Verify specific source titles
samples = [
    ("AMDJ001", "Airline Management System"),
    ("AMDJ008", "Blood Provider Bloud Types and Transfusion"),
    ("AMDJ010", "Clinic Mangement Drug Process"),
    ("AMDJ011", "Cloud Data Share Encrpyted data Share Key"),
    ("AMDJ027", "Eshop Ecommerce Shopping"),
    ("AMDJ036", "Insurance Clime Center"),
    ("AMDJ057", "Paper Presenation Conference Management"),
    ("AMDJ078", "Visitors Meeting Arrangedment System"),
    ("AMDJ080", "Water Supply and Descrbuted System"),
    ("AMDJ081", "Women's Rights Help Suppor")
]

title_map = {p.get('projectCode'): p.get('title') for p in amdj_projs}
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

