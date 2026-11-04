import pypdf
import re
import json

reader = pypdf.PdfReader(r"C:\Users\sathish kumar\Downloads\AntiMatrix_Image_Processing_MATLAB_AMIM_210_Catalogue.pdf")

full_text = ""
for page in reader.pages:
    full_text += page.extract_text() + "\n"

lines = [l.strip() for l in full_text.split("\n") if l.strip()]

projects = []
i = 0
while i < len(lines):
    line = lines[i]
    m = re.match(r"^(AMIM\d{3})$", line)
    if m:
        code = m.group(1)
        i += 1
        title_parts = []
        while i < len(lines):
            curr = lines[i]
            if re.match(r"^AMIM\d{3}$", curr):
                break
            if (curr.startswith("AntiMatrix Project Center") or 
                curr.startswith("Page ") or 
                curr.startswith("Image Processing") or 
                curr.startswith("PROJECT ") or 
                curr.startswith("ANTIMATRIX ") or 
                curr.startswith("Source note:") or 
                curr.startswith("BREAK THE MATRIX") or
                curr.startswith("210 Project Titles") or
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

# If code AMIM210 is in user prompt as "Steganography Using Reversible Texture Synthesi"
# Let's check prompt text
user_prompt_text = """AMIM210
Steganography Using Reversible Texture Synthesi"""

# Clean any residual headers/footers in titles
cleaned_projects = []
for code, title in projects:
    t = title
    t = re.sub(r"AntiMatrix Project Center.*$", "", t).strip()
    t = re.sub(r"Page\s+\d+.*$", "", t).strip()
    if code == "AMIM210":
        # In user prompt: Steganography Using Reversible Texture Synthesi
        t = "Steganography Using Reversible Texture Synthesi"
    cleaned_projects.append({"code": code, "title": t})

with open("scripts/extracted_amim_210.json", "w", encoding="utf-8") as f:
    json.dump(cleaned_projects, f, indent=2, ensure_ascii=False)

print(f"Saved {len(cleaned_projects)} cleaned projects to scripts/extracted_amim_210.json")

# Verify all 210 codes AMIM001 through AMIM210
expected = [f"AMIM{i:03d}" for i in range(1, 211)]
extracted_codes = [p["code"] for p in cleaned_projects]
missing = [c for c in expected if c not in extracted_codes]
duplicates = [c for c in extracted_codes if extracted_codes.count(c) > 1]
print("Missing:", len(missing), missing)
print("Duplicates:", len(duplicates), duplicates)

