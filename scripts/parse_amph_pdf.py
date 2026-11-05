import re
import json

with open("scripts/extracted_amph_pdf.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

records = []
current_code = None
current_title_lines = []

def save_record(code, title_lines):
    raw_title = " ".join([l.strip() for l in title_lines if l.strip()])
    
    # Clean page footers/headers and metadata that leaked into title
    cleaned = re.sub(r"\s*AntiMatrix\s+Project\s+Center\s+Page\s+\d+", "", raw_title, flags=re.I)
    cleaned = re.sub(r"\s*AntiMatrix\s+Project\s+Center\s*\|\s*AMPH", "", cleaned, flags=re.I)
    cleaned = re.sub(r"\s*Code\s+Number\s+of\s+Projects\s+Available\s+\d+", "", cleaned, flags=re.I)
    cleaned = re.sub(r"\s*Page\s+\d+", "", cleaned, flags=re.I)
    cleaned = re.sub(r"\s*PROJECT\s+CODE", "", cleaned, flags=re.I)
    cleaned = re.sub(r"\s*PROJECT\s+TITLE", "", cleaned, flags=re.I)
    cleaned = cleaned.strip()
    
    # Specific prompt rule for AMPH269: truncated at "Zoo Management Syste"
    if code == "AMPH269":
        cleaned = "Zoo Management Syste"
        
    records.append({
        "code": code,
        "title": cleaned
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
    if "Web Application – PHP Projects" in line_clean or line_clean in ["PROJECT CODE", "PROJECT TITLE"]:
        continue
    if re.match(r"^Page \d+$", line_clean, re.I) or "AntiMatrix Project Center | AMPH" in line_clean:
        continue
        
    m = re.match(r"^(AMPH\d{3})$", line_clean)
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

print(f"Parsed {len(records)} AMPH records.")
with open("scripts/extracted_amph_269.json", "w", encoding="utf-8") as f:
    json.dump(records, f, indent=2)

# Check samples from prompt
samples = {
    "AMPH001": "Web based Graphical Password Authentication System",
    "AMPH004": "Agri Shop: Farmers Online Selling Application",
    "AMPH022": "Online Complaint Registration and Management system : street light, water pipe leakage, rain water drainage, road",
    "AMPH055": "Campus Recruitment System",
    "AMPH103": "Empoyee Assign Projects Status System",
    "AMPH148": "Index Management System(Truecaller",
    "AMPH184": "Online E-Learning with Payment",
    "AMPH216": "QR Code Generator",
    "AMPH244": "Student Placement Management System",
    "AMPH261": "Travel Package Expense Management System",
    "AMPH269": "Zoo Management Syste"
}

rec_dict = {r["code"]: r["title"] for r in records}

for code, exp in samples.items():
    actual = rec_dict.get(code, "MISSING")
    match = actual == exp
    status = "OK" if match else "MISMATCH"
    print(f"[{status}] {code}:")
    print(f"  Actual:   '{actual}'")
    print(f"  Expected: '{exp}'")
    assert match, f"Sample mismatch for {code}"

# Contiguity check
all_codes = [r["code"] for r in records]
exp_codes = [f"AMPH{i:03d}" for i in range(1, 270)]
missing = [c for c in exp_codes if c not in all_codes]
extra = [c for c in all_codes if c not in exp_codes]
dups = len(all_codes) - len(set(all_codes))

print(f"Contiguity: Missing={len(missing)}, Extra={len(extra)}, Dups={dups}")
assert len(missing) == 0 and len(extra) == 0 and dups == 0, "Contiguity check failed!"
print("ALL CHECKS PASSED FOR AMPH 269 EXTRACTION!")

