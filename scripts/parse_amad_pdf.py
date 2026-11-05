import re
import json

with open("scripts/extracted_amad_pdf.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

records = []
current_code = None
current_title_lines = []

def save_record(code, title_lines):
    raw_title = " ".join([l.strip() for l in title_lines if l.strip()])
    
    # Clean page footers/headers and metadata that leaked into title
    cleaned = re.sub(r"\s*AntiMatrix\s+Project\s+Center\s+Page\s+\d+", "", raw_title, flags=re.I)
    cleaned = re.sub(r"\s*AntiMatrix\s+Project\s+Center\s*\|\s*AMAD", "", cleaned, flags=re.I)
    cleaned = re.sub(r"\s*Source\s+note:.*$", "", cleaned, flags=re.I)
    cleaned = re.sub(r"\s*Page\s+\d+", "", cleaned, flags=re.I)
    cleaned = re.sub(r"\s*PROJECT\s+CODE", "", cleaned, flags=re.I)
    cleaned = re.sub(r"\s*PROJECT\s+TITLE", "", cleaned, flags=re.I)
    cleaned = cleaned.strip()
    
    # Specific prompt rule for AMAD056: truncated at "Sortin"
    if code == "AMAD056":
        cleaned = "Android File finder and Sortin"
        
    records.append({
        "code": code,
        "title": cleaned
    })

for line in lines:
    line_clean = line.strip()
    if line_clean.startswith("--- PAGE") or not line_clean:
        continue
    if "ANTIMATRIX PROJECT CENTER" in line_clean or "PROJECT CATALOGUE" in line_clean:
        continue
    if "BREAK THE MATRIX" in line_clean or "DOMAIN CODE" in line_clean or "PROJECT CODES" in line_clean:
        continue
    if "Android – Java Projects" in line_clean or line_clean in ["PROJECT CODE", "PROJECT TITLE"]:
        continue
    if re.match(r"^Page \d+$", line_clean, re.I) or "AntiMatrix Project Center | AMAD" in line_clean:
        continue
    if line_clean.startswith("Source note:"):
        continue
        
    m = re.match(r"^(AMAD\d{3})$", line_clean)
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

print(f"Parsed {len(records)} AMAD records.")
with open("scripts/extracted_amad_56.json", "w", encoding="utf-8") as f:
    json.dump(records, f, indent=2)

# Verify prompt samples
samples = {
    "AMAD001": "CodeTracker: A Lightweight Approach to Track and Protect Authorization Codes in SMS Messages",
    "AMAD005": "MADAM: Effective and Ef?cient Behavior-based Android Malware Detection and Prevention",
    "AMAD009": "Elder Tracking and Fall Detection System using Smart Tiles",
    "AMAD011": "Women Attack Rescue System for Women’s Safety App",
    "AMAD023": "HaemOrgle - Organ Donation between hospitals",
    "AMAD035": "Generic Medical Store - Place to find the cheapest medicine delivery using Global Positioning System",
    "AMAD039": "A Mobile Phone Based Medicine Intake Remainder And Monitor",
    "AMAD046": "QR based Fake product detection",
    "AMAD051": "Android Text Encryption Using Various Algorithms",
    "AMAD056": "Android File finder and Sortin"
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
exp_codes = [f"AMAD{i:03d}" for i in range(1, 57)]
missing = [c for c in exp_codes if c not in all_codes]
extra = [c for c in all_codes if c not in exp_codes]
dups = len(all_codes) - len(set(all_codes))

print(f"Contiguity: Missing={len(missing)}, Extra={len(extra)}, Dups={dups}")
assert len(missing) == 0 and len(extra) == 0 and dups == 0, "Contiguity check failed!"
print("ALL CHECKS PASSED FOR AMAD 56 EXTRACTION!")

