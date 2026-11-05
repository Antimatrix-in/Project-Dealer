import json
from collections import Counter

with open("src/data/projects-store.json", "r", encoding="utf-8") as f:
    projects = json.load(f)

print(f"Total projects in store: {len(projects)}")

domain_counts = Counter(p.get("domainCode") for p in projects)
print("Domain counts:")
for d in sorted(domain_counts.keys()):
    print(f"  {d}: {domain_counts[d]}")

amdm_projects = [p for p in projects if p.get("domainCode") == "AMDM"]
amdm_codes = [p.get("projectCode") for p in amdm_projects]

expected_codes = [f"AMDM{i:03d}" for i in range(1, 11)]
missing = [c for c in expected_codes if c not in amdm_codes]
duplicates = len(amdm_codes) - len(set(amdm_codes))

print(f"AMDM Missing: {missing}")
print(f"AMDM Duplicates: {duplicates}")

assert len(amdm_projects) == 10, f"Expected 10 AMDM projects, got {len(amdm_projects)}"
assert len(missing) == 0, f"Missing codes: {missing}"
assert duplicates == 0, f"Duplicate codes found: {duplicates}"

# Load reference
with open("scripts/extracted_amdm_10.json", "r", encoding="utf-8") as f:
    catalogue = json.load(f)

ref_by_code = {item["code"]: item["title"] for item in catalogue}
store_by_code = {p["projectCode"]: p for p in amdm_projects}

# Individually verify all 10 project titles
for code in expected_codes:
    expected_title = ref_by_code[code]
    actual_title = store_by_code[code]["title"]
    assert actual_title == expected_title, f"Mismatch for {code}:\nActual:   {actual_title}\nExpected: {expected_title}"

print(f"Verified all 10 project titles individually against the official catalogue!")

# Specific checks from prompt
assert store_by_code["AMDM003"]["title"] == "A Survey of Data Mining Methods for Early Prediction of Students'' Performance"
print("Confirmed AMDM003 preserves \"Students''\"")

assert store_by_code["AMDM004"]["title"] == "Secure online payment using block chain"
print("Confirmed AMDM004 preserves \"block chain\"")

assert store_by_code["AMDM010"]["title"] == "Prediction of Type-2 Diabetes using Classification and Ensemble Method Approa"
print("Confirmed AMDM010 preserves \"Approa\"")

# Verify other domains are completely preserved
expected_other_counts = {
    "AMPH": 269,
    "AMIM": 210,
    "AMPY": 107,
    "AMCC": 105,
    "AMDL": 100,
    "AMDJ": 81,
    "AMAI": 60,
    "AMAD": 56,
    "AMDS": 50,
    "AMBD": 22,
    "AMJV": 19,
    "AMIP": 12,
    "AMCY": 9,
    "AMML": 2
}
for d, count in expected_other_counts.items():
    assert domain_counts[d] == count, f"Domain count altered for {d}! Expected {count}, got {domain_counts[d]}"

# Next sequential code
max_seq = max(int(c.replace("AMDM", "")) for c in amdm_codes)
next_code = f"AMDM{max_seq + 1:03d}"
print(f"Next code for AMDM: {next_code}")
assert next_code == "AMDM011", f"Expected AMDM011, got {next_code}"

# Verify inquiries store
with open("src/data/inquiries-store.json", "r", encoding="utf-8") as f:
    inquiries = json.load(f)
print(f"Historical inquiries count: {len(inquiries)}")

print("\nALL VERIFICATION CHECKS PASSED SUCCESSFULLY FOR AMDM (10 PROJECTS)!")

