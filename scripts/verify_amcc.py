import json
from collections import Counter

with open("src/data/projects-store.json", "r", encoding="utf-8") as f:
    projects = json.load(f)

print(f"Total projects in store: {len(projects)}")

domain_counts = Counter(p.get("domainCode") for p in projects)
print("Domain counts:")
for d in sorted(domain_counts.keys()):
    print(f"  {d}: {domain_counts[d]}")

amcc_projects = [p for p in projects if p.get("domainCode") == "AMCC"]
amcc_codes = [p.get("projectCode") for p in amcc_projects]

expected_codes = [f"AMCC{i:03d}" for i in range(1, 106)]
missing = [c for c in expected_codes if c not in amcc_codes]
duplicates = len(amcc_codes) - len(set(amcc_codes))

print(f"AMCC Missing: {missing}")
print(f"AMCC Duplicates: {duplicates}")

assert len(amcc_projects) == 105, f"Expected 105 AMCC projects, got {len(amcc_projects)}"
assert len(missing) == 0, f"Missing codes: {missing}"
assert duplicates == 0, f"Duplicate codes found: {duplicates}"

# Load extracted reference
with open("scripts/extracted_amcc_105.json", "r", encoding="utf-8") as f:
    catalogue = json.load(f)

ref_by_code = {item["code"]: item["title"] for item in catalogue}
store_by_code = {p["projectCode"]: p for p in amcc_projects}

# Individually verify all 105 project titles
for code in expected_codes:
    expected_title = ref_by_code[code]
    actual_title = store_by_code[code]["title"]
    assert actual_title == expected_title, f"Mismatch for {code}:\nActual:   {actual_title}\nExpected: {expected_title}"

print(f"Verified all 105 project titles individually against the official catalogue!")

# Specific title checks from prompt
prompt_checks = {
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

for code, expected_title in prompt_checks.items():
    actual = store_by_code[code]["title"]
    print(f"Checking {code}:")
    print(f"  Actual:   '{actual}'")
    print(f"  Expected: '{expected_title}'")
    assert actual == expected_title, f"Prompt check failed for {code}"

# Ensure AMCC105 ends with "5G Mobile Termi"
assert store_by_code["AMCC105"]["title"] == "Wideband Monopole Eight-Element MIMO Antenna for 5G Mobile Termi"
print("Confirmed AMCC105 ends with '5G Mobile Termi' without auto-completion.")

# Verify other domains are completely preserved
expected_other_counts = {
    "AMPH": 269,
    "AMIM": 210,
    "AMPY": 107,
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
max_seq = max(int(c.replace("AMCC", "")) for c in amcc_codes)
next_code = f"AMCC{max_seq + 1:03d}"
print(f"Next code for AMCC: {next_code}")
assert next_code == "AMCC106", f"Expected AMCC106, got {next_code}"

# Verify inquiries store
with open("src/data/inquiries-store.json", "r", encoding="utf-8") as f:
    inquiries = json.load(f)
print(f"Historical inquiries count: {len(inquiries)}")

print("\nALL VERIFICATION CHECKS PASSED SUCCESSFULLY FOR AMCC (105 PROJECTS)!")

