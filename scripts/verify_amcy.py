import json

with open('src/data/projects-store.json', 'r', encoding='utf-8') as f:
    projects = json.load(f)

print(f"Total projects in store: {len(projects)}")
amcy_projs = [p for p in projects if p.get('domainCode') == 'AMCY']
print(f"Cyber Security projects in store: {len(amcy_projs)}")
codes = [p.get('projectCode') for p in amcy_projs]
print("Cyber Security project codes:", codes)

# Verify all 9 contiguous codes
expected_codes = [f"AMCY{i:03d}" for i in range(1, 10)]
missing = [c for c in expected_codes if c not in codes]
duplicates = [c for c in codes if codes.count(c) > 1]
print("Missing codes:", missing)
print("Duplicate codes:", duplicates)

for p in amcy_projs:
    print(f"  {p.get('projectCode')}: {p.get('title')}")

