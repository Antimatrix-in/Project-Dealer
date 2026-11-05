import json
from collections import Counter

with open("src/data/projects-store.json", "r", encoding="utf-8") as f:
    projects = json.load(f)

print(f"Total projects in store: {len(projects)}")

domain_counts = Counter(p.get("domainCode") for p in projects)
print("Domain counts:")
for d in sorted(domain_counts.keys()):
    print(f"  {d}: {domain_counts[d]}")

ambd_projects = [p for p in projects if p.get("domainCode") == "AMBD"]
ambd_codes = [p.get("projectCode") for p in ambd_projects]

expected_codes = [f"AMBD{i:03d}" for i in range(1, 23)]
missing = [c for c in expected_codes if c not in ambd_codes]
duplicates = len(ambd_codes) - len(set(ambd_codes))

print(f"AMBD Missing: {missing}")
print(f"AMBD Duplicates: {duplicates}")

assert len(ambd_projects) == 22, f"Expected 22 AMBD projects, got {len(ambd_projects)}"
assert len(missing) == 0, f"Missing codes: {missing}"
assert duplicates == 0, f"Duplicate codes found: {duplicates}"

# Check sample project titles
title_checks = {
    "AMBD001": "AFFIRM: Provably Forward Privacy for Searchable Encryption in Cooperative Intelligent Transportation System",
    "AMBD004": "Application research of customer big data analysis for online shop based on smart cloud platform tools",
    "AMBD007": "Securing Medical Big data through Block chain technology",
    "AMBD011": "An Exploratory analysis of Machine Learning adaptability in Big Data Analytics Environments: A Data Aggregation in the age of Big Data and the Internet of Things",
    "AMBD015": "Towards Large-Scale and Privacy-Preserving Contact Tracing in COVID-19 Pandemic: A Block chain Perspective",
    "AMBD019": "Block chain-based Conditional Privacy-Preserving Authentication Protocol with Implicit Certificates for Vehicular Edge Computing",
    "AMBD022": "CP-BDHCA: Block chain-Based Confidentiality-Privacy Preserving Big Data Scheme for Healthcare Clouds and Application"
}

by_code = {p["projectCode"]: p for p in ambd_projects}
for code, expected_title in title_checks.items():
    actual = by_code[code]["title"]
    print(f"Checking {code}:")
    print(f"  Actual:   '{actual}'")
    print(f"  Expected: '{expected_title}'")
    assert actual == expected_title, f"Title mismatch for {code}:\nActual:   {actual}\nExpected: {expected_title}"

# Verify "Block chain" is preserved in titles
for code in ["AMBD007", "AMBD015", "AMBD017", "AMBD019", "AMBD022"]:
    title = by_code[code]["title"]
    assert "Block chain" in title, f"'Block chain' not found in {code}: {title}"
    print(f"Verified 'Block chain' in {code}")

# Verify other domains are intact
expected_other_counts = {
    "AMPH": 269,
    "AMIM": 210,
    "AMPY": 107,
    "AMDL": 100,
    "AMDJ": 81,
    "AMAI": 60,
    "AMAD": 56,
    "AMDS": 50,
    "AMJV": 19,
    "AMCY": 9,
    "AMML": 2,
    "AMCC": 1
}
for d, count in expected_other_counts.items():
    assert domain_counts[d] == count, f"Domain count altered for {d}! Expected {count}, got {domain_counts[d]}"

# Next sequential code
max_seq = max(int(c.replace("AMBD", "")) for c in ambd_codes)
next_code = f"AMBD{max_seq + 1:03d}"
print(f"Next code for AMBD: {next_code}")
assert next_code == "AMBD023", f"Expected AMBD023, got {next_code}"

# Verify inquiries store
with open("src/data/inquiries-store.json", "r", encoding="utf-8") as f:
    inquiries = json.load(f)
print(f"Historical inquiries count: {len(inquiries)}")

print("\nALL VERIFICATION CHECKS PASSED SUCCESSFULLY FOR AMBD!")

