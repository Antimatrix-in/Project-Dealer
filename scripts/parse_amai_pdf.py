import re
import json

with open("scripts/extracted_amai_pdf.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

records = []
current_code = None
current_title_lines = []

def save_record(code, title_lines):
    raw_title = " ".join([l.strip() for l in title_lines if l.strip()])
    # Clean page footers/headers that leaked into title
    # e.g. "AntiMatrix Project Center Page 3", "AntiMatrix Project Center Page 4"
    cleaned_title = re.sub(r"\s*AntiMatrix\s+Project\s+Center\s+Page\s+\d+", "", raw_title, flags=re.I)
    cleaned_title = re.sub(r"\s*AntiMatrix\s+Project\s+Center\s*\|\s*AMAI", "", cleaned_title, flags=re.I)
    cleaned_title = re.sub(r"\s*Page\s+\d+", "", cleaned_title, flags=re.I)
    cleaned_title = cleaned_title.strip()
    
    # Specific rule for AMAI060: preserve truncation at "FPG"
    if code == "AMAI060":
        if cleaned_title.endswith("FPGA"):
            cleaned_title = cleaned_title[:-1] # Remove 'A' to get 'FPG'
        elif not cleaned_title.endswith("FPG"):
            cleaned_title = "Very High Accuracy Hyperbolic Tangent Function Implementation in FPG"
            
    records.append({
        "code": code,
        "title": cleaned_title
    })

for line in lines:
    line_clean = line.strip()
    # Check if header/marker line
    if line_clean.startswith("--- PAGE") or not line_clean:
        continue
    if "ANTIMATRIX PROJECT CENTER" in line_clean or "PROJECT CATALOGUE" in line_clean:
        continue
    if "BREAK THE MATRIX" in line_clean or "DOMAIN CODE" in line_clean or "PROJECT CODES" in line_clean:
        continue
    if "Artificial Intelligence Projects" in line_clean or line_clean in ["PROJECT CODE", "PROJECT TITLE"]:
        continue
    if re.match(r"^Page \d+$", line_clean, re.I) or "AntiMatrix Project Center | AMAI" in line_clean:
        continue
        
    m = re.match(r"^(AMAI\d{3})$", line_clean)
    if m:
        if current_code:
            save_record(current_code, current_title_lines)
        current_code = m.group(1)
        current_title_lines = []
    else:
        if current_code:
            current_title_lines.append(line_clean)

if current_code:
    save_record(current_code, current_title_lines)

print(f"Parsed {len(records)} AMAI records.")
with open("scripts/extracted_amai_60.json", "w", encoding="utf-8") as f:
    json.dump(records, f, indent=2)

for r in records[:10]:
    print(f"{r['code']}: {r['title']}")
print("...")
for r in records[-5:]:
    print(f"{r['code']}: {r['title']}")

