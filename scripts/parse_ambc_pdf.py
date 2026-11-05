import re
import json

with open("scripts/extracted_ambc_pdf.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Lines to ignore
ignore_patterns = [
    r"^--- PAGE \d+ ---$",
    r"^ANTIMATRIX PROJECT CENTER$",
    r"^BLOCKCHAIN – PYTHON / JAVA / DOTNET PROJECT CATALOGUE$",
    r"^\d+ Project Titles$",
    r"^DOMAIN CODE\s+AMBC$",
    r"^PROJECT CODES\s+AMBC001 – AMBC016$",
    r"^BREAK THE MATRIX.*$",
    r"^AntiMatrix Project Center \| AMBC$",
    r"^Page \d+$",
    r"^Blockchain – Python / Java / DotNet Projects$",
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

code_pattern = re.compile(r"^(AMBC\d{3})$")

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

expected_codes = [f"AMBC{i:03d}" for i in range(1, 17)]
actual_codes = [p["code"] for p in projects]

missing = [c for c in expected_codes if c not in actual_codes]
extra = [c for c in actual_codes if c not in expected_codes]

print(f"Missing codes: {missing}")
print(f"Extra codes: {extra}")

for p in projects:
    print(f"{p['code']}: {p['title']}")

# Verify against official prompt table
prompt_table = {
    "AMBC001": "Bank automation system in cloud computing",
    "AMBC002": "Planning Secure Consumption: Food Safety Using Block chain",
    "AMBC003": "Intelligent Value Added Service Platform of Smart Library Based on Block chain Technology",
    "AMBC004": "Performance Evaluation of Data Transactions in Block chain",
    "AMBC005": "Block chain Enabled Intelligent Digital Forensics System for Autonomous Connected Vehicles",
    "AMBC006": "Improved Security Block chain for IoT based Healthcare monitoring system",
    "AMBC007": "Toward Data Authenticity and Integrity for Block chain-Based Mobile Edge Computing",
    "AMBC008": "A Block chain-Based Fake Product Identification System",
    "AMBC009": "A Fog and Block chain Software Architecture for a Global Scale Vaccination Strategy",
    "AMBC010": "Optimized User-Friendly Transaction Time Management in the Block chain Distributed Energy Market",
    "AMBC011": "Privacy-Preserved Electronic Medical Record Exchanging and Sharing: A Block chain Smart Healthcare System",
    "AMBC012": "Block chain-enabled COVID?19 Contact Tracing Solutions",
    "AMBC013": "Block chain-Based Privacy Preserving and Energy Saving Mechanism for Electricity Prosumers",
    "AMBC014": "Block chain-based Lightweight Transaction Process Modeling and Development",
    "AMBC015": "Block chain-Based Medical Certificate Generation and Verification for IoT-based Healthcare Systems",
    "AMBC016": "An interactive and secure Block chain web portal for online healthcare service"
}

by_code = {p["code"]: p["title"] for p in projects}
for code, expected_title in prompt_table.items():
    actual = by_code.get(code)
    print(f"Verifying {code}:")
    print(f"  Actual:   '{actual}'")
    print(f"  Expected: '{expected_title}'")
    assert actual == expected_title, f"Mismatch for {code}:\nActual:   {actual}\nExpected: {expected_title}"

# Explicit check for COVID?19
assert "COVID?19" in by_code["AMBC012"], "AMBC012 does not contain 'COVID?19'"
print("Confirmed AMBC012 contains exact 'COVID?19' without hyphen replacement.")

with open("scripts/extracted_ambc_16.json", "w", encoding="utf-8") as f:
    json.dump(projects, f, indent=2, ensure_ascii=False)

print("Saved scripts/extracted_ambc_16.json successfully!")

