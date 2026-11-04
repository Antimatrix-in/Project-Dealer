import pypdf
import re
import json

reader = pypdf.PdfReader(r"C:\Users\sathish kumar\Downloads\AntiMatrix_Django_Python_AMDJ_81_Catalogue.pdf")

full_text = ""
for page in reader.pages:
    full_text += page.extract_text() + "\n"

lines = [l.strip() for l in full_text.split("\n") if l.strip()]

projects = []
i = 0
while i < len(lines):
    line = lines[i]
    m = re.match(r"^(AMDJ\d{3})$", line)
    if m:
        code = m.group(1)
        i += 1
        title_parts = []
        while i < len(lines):
            curr = lines[i]
            if re.match(r"^AMDJ\d{3}$", curr):
                break
            if curr.startswith("AntiMatrix Project Center") or curr.startswith("Page ") or curr.startswith("Django") or curr.startswith("PROJECT ") or curr.startswith("ANTIMATRIX ") or curr.startswith("Source note:") or curr.startswith("BREAK THE MATRIX"):
                i += 1
                continue
            title_parts.append(curr)
            i += 1
        title = " ".join(title_parts).strip()
        # Handle quotes like Women''s -> Women's
        if "Women''s" in title:
            title = title.replace("Women''s", "Women's")
        projects.append((code, title))
    else:
        i += 1

print(f"Total extracted: {len(projects)}")
for code, title in projects:
    print(f"{code}: {title}")

with open("scripts/extracted_amdj_81.json", "w", encoding="utf-8") as f:
    json.dump([{"code": c, "title": t} for c, t in projects], f, indent=2, ensure_ascii=False)

