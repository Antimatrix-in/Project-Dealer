import pypdf
import json

pdf_path = r"C:\Users\sathish kumar\Downloads\AntiMatrix_Cyber_Security_AMCY_9_Catalogue.pdf"
reader = pypdf.PdfReader(pdf_path)

print(f"Total pages: {len(reader.pages)}")

for i, page in enumerate(reader.pages):
    print(f"\n--- PAGE {i+1} ---")
    print(page.extract_text())

with open('src/data/projects-store.json', 'r', encoding='utf-8') as f:
    store = json.load(f)

amcy_in_store = [p for p in store if p.get('domainCode') == 'AMCY' or 'AMCY' in p.get('projectCode', '')]
print(f"\nTotal projects in store: {len(store)}")
print(f"AMCY projects in store: {len(amcy_in_store)}")
for p in amcy_in_store:
    print(f"  Code: {p.get('projectCode')} | Title: {p.get('title')}")

