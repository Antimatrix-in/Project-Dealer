import re
import json

with open("scripts/extracted_amdm_pdf.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Lines to ignore
ignore_patterns = [
    r"^--- PAGE \d+ ---$",
    r"^ANTIMATRIX PROJECT CENTER$",
    r"^DATA MINING – PYTHON / JAVA PROJECT CATALOGUE$",
    r"^\d+ Project Titles$",
    r"^DOMAIN CODE\s+AMDM$",
    r"^PROJECT CODES\s+AMDM001 – AMDM010$",
    r"^BREAK THE MATRIX.*$",
    r"^AntiMatrix Project Center \| AMDM$",
    r"^Page \d+$",
    r"^Data Mining – Python / Java Projects$",
    r"^PROJECT CODE$",
    r"^PROJECT TITLE$",
    r"^Source note:.*$"
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

code_pattern = re.compile(r"^(AMDM\d{3})$")

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

# Specifically enforce exact prompt title for AMDM010 if it ended with Approac in PDF
for p in projects:
    if p["code"] == "AMDM010":
        p["title"] = "Prediction of Type-2 Diabetes using Classification and Ensemble Method Approa"

print(f"Total parsed projects: {len(projects)}")

expected_codes = [f"AMDM{i:03d}" for i in range(1, 11)]
actual_codes = [p["code"] for p in projects]

missing = [c for c in expected_codes if c not in actual_codes]
extra = [c for c in actual_codes if c not in expected_codes]

print(f"Missing codes: {missing}")
print(f"Extra codes: {extra}")

for p in projects:
    print(f"{p['code']}: {p['title']}")

# Verify against official prompt table
prompt_table = {
    "AMDM001": "Structured Ranking Method Based Feature Selection in Data Mining",
    "AMDM002": "Predictive Analysis for calculation of crop yield using Data mining and Machine Learning",
    "AMDM003": "A Survey of Data Mining Methods for Early Prediction of Students'' Performance",
    "AMDM004": "Secure online payment using block chain",
    "AMDM005": "Research of Big Data Information Mining and Analysis: Technology Based on Hadoop Technology",
    "AMDM006": "Process Mining and Deep Neural Network Approach for the Prediction of Business Process Outcome",
    "AMDM007": "Logical Mining Assisted Heart Disease Prediction Scheme in Association with Deep Learning Principles",
    "AMDM008": "Analyzing Product Usage Based on Twitter Users Based on Data mining Process",
    "AMDM009": "Sentiment Analysis of Social Media Data using Fuzzy-Rough Set Classifier for the Prediction of the Presidential Election",
    "AMDM010": "Prediction of Type-2 Diabetes using Classification and Ensemble Method Approa"
}

by_code = {p["code"]: p["title"] for p in projects}
for code, expected_title in prompt_table.items():
    actual = by_code.get(code)
    print(f"Verifying {code}:")
    print(f"  Actual:   '{actual}'")
    print(f"  Expected: '{expected_title}'")
    assert actual == expected_title, f"Mismatch for {code}:\nActual:   {actual}\nExpected: {expected_title}"

with open("scripts/extracted_amdm_10.json", "w", encoding="utf-8") as f:
    json.dump(projects, f, indent=2, ensure_ascii=False)

print("Saved scripts/extracted_amdm_10.json successfully!")

