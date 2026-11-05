import json
from collections import Counter

with open("src/data/projects-store.json", "r", encoding="utf-8") as f:
    projects = json.load(f)

print(f"Total projects in store: {len(projects)}")

domain_counts = Counter(p.get("domainCode") for p in projects)
print("Domain counts:")
for d in sorted(domain_counts.keys()):
    print(f"  {d}: {domain_counts[d]}")

ambc_projects = [p for p in projects if p.get("domainCode") == "AMBC"]
ambc_codes = [p.get("projectCode") for p in ambc_projects]

expected_codes = [f"AMBC{i:03d}" for i in range(1, 17)]
missing = [c for c in expected_codes if c not in ambc_codes]
duplicates = len(ambc_codes) - len(set(ambc_codes))

print(f"AMBC Missing: {missing}")
print(f"AMBC Duplicates: {duplicates}")

assert len(ambc_projects) == 16, f"Expected 16 AMBC projects, got {len(ambc_projects)}"
assert len(missing) == 0, f"Missing codes: {missing}"
assert duplicates == 0, f"Duplicate codes found: {duplicates}"

# Load reference
with open("scripts/extracted_ambc_16.json", "r", encoding="utf-8") as f:
    catalogue = json.load(f)

ref_by_code = {item["code"]: item["title"] for item in catalogue}
store_by_code = {p["projectCode"]: p for p in ambc_projects}

# Individually verify all 16 project titles
for code in expected_codes:
    expected_title = ref_by_code[code]
    actual_title = store_by_code[code]["title"]
    assert actual_title == expected_title, f"Mismatch for {code}:\nActual:   {actual_title}\nExpected: {expected_title}"

print(f"Verified all 16 project titles individually against the official catalogue!")

# Specific checks from prompt
assert store_by_code["AMBC012"]["title"] == "Block chain-enabled COVID?19 Contact Tracing Solutions"
print("Confirmed AMBC012 preserves \"COVID?19\"")

assert "Block chain" in store_by_code["AMBC002"]["title"]
assert "Block chain" in store_by_code["AMBC005"]["title"]
assert "Block chain" in store_by_code["AMBC008"]["title"]
assert "Block chain" in store_by_code["AMBC016"]["title"]
print("Confirmed \"Block chain\" preserved across titles.")

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
    "AMBC": 16,
    "AMIP": 12,
    "AMDM": 10,
    "AMCY": 9,
    "AMML": 2
}
for d, count in expected_other_counts.items():
    assert domain_counts[d] == count, f"Domain count altered for {d}! Expected {count}, got {domain_counts[d]}"

# Next sequential code
max_seq = max(int(c.replace("AMBC", "")) for c in ambc_codes)
next_code = f"AMBC{max_seq + 1:03d}"
print(f"Next code for AMBC: {next_code}")
assert next_code == "AMBC017", f"Expected AMBC017, got {next_code}"

# Verify inquiries store
with open("src/data/inquiries-store.json", "r", encoding="utf-8") as f:
    inquiries = json.load(f)
print(f"Historical inquiries count: {len(inquiries)}")

print("\nALL VERIFICATION CHECKS PASSED SUCCESSFULLY FOR AMBC (16 PROJECTS)!")

