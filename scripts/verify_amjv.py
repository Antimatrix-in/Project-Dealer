import json

with open('src/data/projects-store.json', 'r', encoding='utf-8') as f:
    projects = json.load(f)

print(f"Total projects in store: {len(projects)}")
java_projs = [p for p in projects if p.get('domainCode') == 'AMJV']
print(f"Java projects in store: {len(java_projs)}")
codes = [p.get('projectCode') for p in java_projs]
print("Java project codes:", codes)

# Verify all 19 contiguous codes
expected_codes = [f"AMJV{i:03d}" for i in range(1, 20)]
missing = [c for c in expected_codes if c not in codes]
duplicates = [c for c in codes if codes.count(c) > 1]
print("Missing codes:", missing)
print("Duplicate codes:", duplicates)

for p in java_projs:
    print(f"  {p.get('projectCode')}: {p.get('title')}")

