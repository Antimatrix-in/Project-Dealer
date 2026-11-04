import json

with open('src/data/projects-store.json', 'r', encoding='utf-8') as f:
    store = json.load(f)

amdj = [p for p in store if p.get('domainCode') == 'AMDJ' or 'AMDJ' in p.get('projectCode', '')]
print(f"Total projects in store: {len(store)}")
print(f"AMDJ in store: {len(amdj)}")
for p in amdj:
    print(f"  Code: {p.get('projectCode')} | Title: {p.get('title')}")

