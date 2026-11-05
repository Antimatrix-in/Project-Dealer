import pypdf
import re
import json

reader = pypdf.PdfReader(r"C:\Users\sathish kumar\Downloads\AntiMatrix_Deep_Learning_AMDL_100_Catalogue.pdf")

full_text = ""
for page in reader.pages:
    full_text += page.extract_text() + "\n"

lines = [l.strip() for l in full_text.split("\n") if l.strip()]

projects = []
i = 0
while i < len(lines):
    line = lines[i]
    m = re.match(r"^(AMDL\d{3})$", line)
    if m:
        code = m.group(1)
        i += 1
        title_parts = []
        while i < len(lines):
            curr = lines[i]
            if re.match(r"^AMDL\d{3}$", curr):
                break
            if (curr.startswith("AntiMatrix Project Center") or 
                curr.startswith("Page ") or 
                curr.startswith("Deep Learning") or 
                curr.startswith("PROJECT ") or 
                curr.startswith("ANTIMATRIX ") or 
                curr.startswith("Source note:") or 
                curr.startswith("BREAK THE MATRIX") or
                curr.startswith("100 Project Titles") or
                curr.startswith("DOMAIN CODE") or
                curr.startswith("PROJECT CODES")):
                i += 1
                continue
            title_parts.append(curr)
            i += 1
        title = " ".join(title_parts).strip()
        # Clean any page numbers if attached
        title = re.sub(r"\s+Page\s+\d+$", "", title)
        title = title.replace("AntiMatrix Project Center", "").strip()
        projects.append((code, title))
    else:
        i += 1

print(f"Total extracted from PDF: {len(projects)}")

cleaned_projects = []
for code, title in projects:
    t = title
    t = re.sub(r"AntiMatrix Project Center.*$", "", t).strip()
    t = re.sub(r"Page\s+\d+.*$", "", t).strip()
    if code == "AMDL100":
        # Ensure exact title truncation at "Plan" as requested
        if not t.endswith("Plan"):
            # Check what it ends with
            print("AMDL100 raw extracted title:", t)
            # The prompt says: AMDL100 – Using Deep Learning Model to Identify Iron Chlorosis in Plan
            # Preserve the final AMDL100 title exactly as supplied, including its truncation at "Plan".
            t = "Using Deep Learning Model to Identify Iron Chlorosis in Plan"
    cleaned_projects.append({"code": code, "title": t})

with open("scripts/extracted_amdl_100.json", "w", encoding="utf-8") as f:
    json.dump(cleaned_projects, f, indent=2, ensure_ascii=False)

print(f"Saved {len(cleaned_projects)} cleaned projects to scripts/extracted_amdl_100.json")

# Verify all 100 codes AMDL001 through AMDL100
expected = [f"AMDL{i:03d}" for i in range(1, 101)]
extracted_codes = [p["code"] for p in cleaned_projects]
missing = [c for c in expected if c not in extracted_codes]
duplicates = [c for c in extracted_codes if extracted_codes.count(c) > 1]
print("Missing:", len(missing), missing)
print("Duplicates:", len(duplicates), duplicates)

