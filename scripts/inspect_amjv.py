import json
import os

with open('src/data/projects-store.json', 'r', encoding='utf-8') as f:
    projects = json.load(f)

print(f"Total projects in store: {len(projects)}")
java_projects = [p for p in projects if p.get('domainCode') == 'AMJV' or 'AMJV' in p.get('projectCode', '')]
print(f"Java projects in store count: {len(java_projects)}")
for p in java_projects:
    print(f"  Code: {p.get('projectCode')} | Domain: {p.get('domainCode')} | Title: {p.get('title')}")

