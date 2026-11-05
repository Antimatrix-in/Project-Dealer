import json
import re

def verify():
    with open("src/data/projects-store.json", "r", encoding="utf-8") as f:
        projects = json.load(f)
    
    print(f"Total projects in store: {len(projects)}")
    
    # Domain breakdown
    domain_counts = {}
    for p in projects:
        d = p.get("domainCode", "UNKNOWN")
        domain_counts[d] = domain_counts.get(d, 0) + 1
    
    print("Domain counts:")
    for d, c in sorted(domain_counts.items()):
        print(f"  {d}: {c}")
    
    assert domain_counts.get("AMDL") == 100, f"Expected 100 AMDL, got {domain_counts.get('AMDL')}"
    assert domain_counts.get("AMPY") == 107, f"Expected 107 AMPY, got {domain_counts.get('AMPY')}"
    assert domain_counts.get("AMJV") == 19, f"Expected 19 AMJV, got {domain_counts.get('AMJV')}"
    assert domain_counts.get("AMCY") == 9, f"Expected 9 AMCY, got {domain_counts.get('AMCY')}"
    assert domain_counts.get("AMDJ") == 81, f"Expected 81 AMDJ, got {domain_counts.get('AMDJ')}"
    assert domain_counts.get("AMDS") == 50, f"Expected 50 AMDS, got {domain_counts.get('AMDS')}"
    assert domain_counts.get("AMIM") == 210, f"Expected 210 AMIM, got {domain_counts.get('AMIM')}"
    assert len(projects) == 583, f"Expected 583 total projects, got {len(projects)}"
    
    # Check AMDL contiguous codes
    amdl_projects = [p for p in projects if p.get("domainCode") == "AMDL"]
    code_map = {p["projectCode"]: p for p in amdl_projects}
    
    expected_codes = [f"AMDL{i:03d}" for i in range(1, 101)]
    missing = [c for c in expected_codes if c not in code_map]
    duplicates = len(amdl_projects) - len(code_map)
    
    print(f"AMDL Missing: {missing}")
    print(f"AMDL Duplicates: {duplicates}")
    assert len(missing) == 0, f"Missing codes: {missing}"
    assert duplicates == 0, f"Found duplicates: {duplicates}"
    
    # Key title checks
    key_titles = {
        "AMDL001": "A Bayesian Deep Learning Approach With Convolutional Feature Engineering to Discriminate Cyber-Physical Intrusions in Smart Grid Systems",
        "AMDL008": "A Hybrid Deep Learning-Based Intelligent System for Sports Action Recognition via Visual Knowledge Discovery",
        "AMDL032": "Automatic Voice Disorder Detection Using Self-Supervised Representations",
        "AMDL053": "End-To-End Deep-Learning-Based Tamil Handwritten Document Recognition and Classification Model",
        "AMDL064": "Image-Based Partial Discharge Identification in High Voltage Cables Using Hybrid Deep Network",
        "AMDL073": "Modeling of Blockchain Assisted Intrusion Detection on IoT Healthcare System Using Ant Lion Optimizer With Hybrid Deep Learning",
        "AMDL094": "SIGNFORMER DeepVision Transformer for Sign Language Recognition",
        "AMDL100": "Using Deep Learning Model to Identify Iron Chlorosis in Plan"
    }
    
    for code, expected_title in key_titles.items():
        actual_title = code_map[code]["title"]
        print(f"Checking {code}:")
        print(f"  Actual:   {actual_title}")
        print(f"  Expected: {expected_title}")
        assert actual_title == expected_title, f"Mismatch for {code}: '{actual_title}' != '{expected_title}'"
    
    # Check attributes for all AMDL
    for p in amdl_projects:
        assert p.get("status") == "Available", f"{p['projectCode']} status is not Available"
        assert p.get("domainCode") == "AMDL", f"{p['projectCode']} domainCode is not AMDL"
        assert p.get("domainName") == "Deep Learning", f"{p['projectCode']} domainName is not Deep Learning"
        assert len(p.get("features", [])) >= 4, f"{p['projectCode']} missing features"
        assert len(p.get("modules", [])) >= 4, f"{p['projectCode']} missing modules"
        assert len(p.get("documentationIncluded", [])) >= 4, f"{p['projectCode']} missing documentation"
    
    # Check next project code calculation
    max_seq = 0
    for p in amdl_projects:
        m = re.match(r"^AMDL(\d+)$", p["projectCode"], re.I)
        if m:
            num = int(m.group(1))
            if num > max_seq:
                max_seq = num
    next_code = f"AMDL{max_seq + 1:03d}"
    print(f"Next code for AMDL: {next_code}")
    assert next_code == "AMDL101", f"Expected AMDL101, got {next_code}"
    
    # Inquiries check
    with open("src/data/inquiries-store.json", "r", encoding="utf-8") as f:
        inquiries = json.load(f)
    print(f"Historical inquiries count: {len(inquiries)}")
    assert len(inquiries) >= 4, f"Historical inquiries truncated! Count: {len(inquiries)}"
    inq_ids = [i["id"] for i in inquiries]
    for exp_id in ["inq-2026-001", "inq-2026-002", "inq-2026-003", "inq-2026-004"]:
        assert exp_id in inq_ids, f"Missing historical inquiry {exp_id}"
        
    print("\nALL VERIFICATION CHECKS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    verify()

