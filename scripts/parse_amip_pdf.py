import re
import json

with open("scripts/extracted_amip_pdf.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Lines to ignore
ignore_patterns = [
    r"^--- PAGE \d+ ---$",
    r"^ANTIMATRIX PROJECT CENTER$",
    r"^IMAGE PROCESSING – PYTHON PROJECT CATALOGUE$",
    r"^\d+ Project Titles$",
    r"^DOMAIN CODE\s+AMIP$",
    r"^PROJECT CODES\s+AMIP001 – AMIP012$",
    r"^BREAK THE MATRIX.*$",
    r"^AntiMatrix Project Center \| AMIP$",
    r"^Page \d+$",
    r"^Image Processing – Python Projects$",
    r"^PROJECT CODE$",
    r"^PROJECT TITLE$"
]

lines = [l.strip() for l in text.splitlines() if l.strip()]
filtered_lines = []
for line in lines:
    if any(re.match(pat, line, re.IGNORECASE) for pat in ignore_patterns):
        continue
    filtered_lines.append(line)

print(f"Filtered lines count: {len(filtered_lines)}")

projects = []
current_code = None
current_title_parts = []

code_pattern = re.compile(r"^(AMIP\d{3})$")

for line in filtered_lines:
    m = code_pattern.match(line)
    if m:
        if current_code:
            title = " ".join(current_title_parts).strip()
            title = re.sub(r"\s+", " ", title)
            projects.append({"code": current_code, "title": title})
        current_code = m.group(1)
        current_title_parts = []
    else:
        if current_code:
            current_title_parts.append(line)

if current_code:
    title = " ".join(current_title_parts).strip()
    title = re.sub(r"\s+", " ", title)
    projects.append({"code": current_code, "title": title})

print(f"Total parsed projects: {len(projects)}")

expected_codes = [f"AMIP{i:03d}" for i in range(1, 13)]
actual_codes = [p["code"] for p in projects]

missing = [c for c in expected_codes if c not in actual_codes]
extra = [c for c in actual_codes if c not in expected_codes]

print(f"Missing codes: {missing}")
print(f"Extra codes: {extra}")

for p in projects:
    print(f"{p['code']}: {p['title']}")

with open("scripts/extracted_amip_12.json", "w", encoding="utf-8") as f:
    json.dump(projects, f, indent=2, ensure_ascii=False)

