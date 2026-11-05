import re
import json

with open("scripts/extracted_amcc_pdf.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Lines to ignore
ignore_patterns = [
    r"^--- PAGE \d+ ---$",
    r"^ANTIMATRIX PROJECT CENTER$",
    r"^CLOUD COMPUTING – PYTHON / JAVA PROJECT CATALOGUE$",
    r"^\d+ Project Titles$",
    r"^DOMAIN CODE\s+AMCC$",
    r"^PROJECT CODES\s+AMCC001 – AMCC105$",
    r"^BREAK THE MATRIX.*$",
    r"^AntiMatrix Project Center \| AMCC$",
    r"^Page \d+$",
    r"^Cloud Computing – Python / Java Projects$",
    r"^PROJECT CODE$",
    r"^PROJECT TITLE$",
    r"^Source note:.*$",
    r"^supplied;.*$"
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

code_pattern = re.compile(r"^(AMCC\d{3})$")

for line in filtered_lines:
    m = code_pattern.match(line)
    if m:
        if current_code:
            title = " ".join(current_title_parts).strip()
            # Clean up spacing like "Cloud -Assisted" -> "Cloud-Assisted"
            title = title.replace("Cloud -Assisted", "Cloud-Assisted")
            title = re.sub(r"\s+", " ", title)
            projects.append({"code": current_code, "title": title})
        current_code = m.group(1)
        current_title_parts = []
    else:
        if current_code:
            current_title_parts.append(line)

if current_code:
    title = " ".join(current_title_parts).strip()
    title = title.replace("Cloud -Assisted", "Cloud-Assisted")
    title = re.sub(r"\s+", " ", title)
    projects.append({"code": current_code, "title": title})

print(f"Total parsed projects: {len(projects)}")

expected_codes = [f"AMCC{i:03d}" for i in range(1, 106)]
actual_codes = [p["code"] for p in projects]

missing = [c for c in expected_codes if c not in actual_codes]
extra = [c for c in actual_codes if c not in expected_codes]

print(f"Missing codes: {missing}")
print(f"Extra codes: {extra}")

# Verify prompt examples
prompt_examples = {
    "AMCC009": "A Review on Attack Graph Analysis for IoT Vulnerability Assessment Challenges Open Issues and Future Directions",
    "AMCC018": "Enabling Simultaneous Content Regulation and Privacy Protection for Cloud Storage Image",
    "AMCC035": "An Integrated Optimization-Based Algorithm for Energy Efficiency and Resource Allocation in Heterogeneous Cloud Computing Centers",
    "AMCC041": "Computationally Efficient Neural Rendering for Generator Adversarial Networks Using a Multi-GPU Cluster in a Cloud Environment",
    "AMCC066": "To Drop or to Select Reduce the Negative Effects of Disturbance Features for Point Cloud Classification From an Interpretable Perspective",
    "AMCC079": "A Block chain-Enabled Privacy-Preserving Verifiable Query Framework for Securing Cloud-Assisted Industrial Internet of Things Systems",
    "AMCC085": "Efficient, Revocable, and Privacy-Preserving Fine-Grained Data Sharing With Keyword Search for the Cloud-Assisted Medical IoT System",
    "AMCC086": "A Reconfigurable CNN-Based Accelerator Design for Fast and EnergyEfficient Object Detection System on Mobile FPGA",
    "AMCC099": "RFSE-GRU Data Balanced Classification Model for Mobile Encrypted Traffic in Big Data Environment",
    "AMCC105": "Wideband Monopole Eight-Element MIMO Antenna for 5G Mobile Termi"
}

by_code = {p["code"]: p["title"] for p in projects}
for code, expected_title in prompt_examples.items():
    actual = by_code.get(code)
    print(f"Checking {code}:")
    print(f"  Actual:   '{actual}'")
    print(f"  Expected: '{expected_title}'")
    assert actual == expected_title, f"Mismatch for {code}:\nActual:   {actual}\nExpected: {expected_title}"

with open("scripts/extracted_amcc_105.json", "w", encoding="utf-8") as f:
    json.dump(projects, f, indent=2, ensure_ascii=False)

print("Saved scripts/extracted_amcc_105.json successfully!")
