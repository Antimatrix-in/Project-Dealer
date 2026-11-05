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
    
    assert domain_counts.get("AMAD") == 56, f"Expected 56 AMAD, got {domain_counts.get('AMAD')}"
    assert domain_counts.get("AMPH") == 269, f"Expected 269 AMPH, got {domain_counts.get('AMPH')}"
    assert domain_counts.get("AMAI") == 60, f"Expected 60 AMAI, got {domain_counts.get('AMAI')}"
    assert domain_counts.get("AMDL") == 100, f"Expected 100 AMDL, got {domain_counts.get('AMDL')}"
    assert domain_counts.get("AMPY") == 107, f"Expected 107 AMPY, got {domain_counts.get('AMPY')}"
    assert domain_counts.get("AMJV") == 19, f"Expected 19 AMJV, got {domain_counts.get('AMJV')}"
    assert domain_counts.get("AMCY") == 9, f"Expected 9 AMCY, got {domain_counts.get('AMCY')}"
    assert domain_counts.get("AMDJ") == 81, f"Expected 81 AMDJ, got {domain_counts.get('AMDJ')}"
    assert domain_counts.get("AMDS") == 50, f"Expected 50 AMDS, got {domain_counts.get('AMDS')}"
    assert domain_counts.get("AMIM") == 210, f"Expected 210 AMIM, got {domain_counts.get('AMIM')}"
    assert len(projects) == 964, f"Expected 964 total projects, got {len(projects)}"
    
    # Check AMAD contiguous codes
    amad_projects = [p for p in projects if p.get("domainCode") == "AMAD"]
    code_map = {p["projectCode"]: p for p in amad_projects}
    
    expected_codes = [f"AMAD{i:03d}" for i in range(1, 57)]
    missing = [c for c in expected_codes if c not in code_map]
    duplicates = len(amad_projects) - len(code_map)
    
    print(f"AMAD Missing: {missing}")
    print(f"AMAD Duplicates: {duplicates}")
    assert len(missing) == 0, f"Missing codes: {missing}"
    assert duplicates == 0, f"Found duplicates: {duplicates}"
    
    # Key title checks
    key_titles = {
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
    
    for code, expected_title in key_titles.items():
        actual_title = code_map[code]["title"]
        print(f"Checking {code}:")
        print(f"  Actual:   '{actual_title}'")
        print(f"  Expected: '{expected_title}'")
        assert actual_title == expected_title, f"Mismatch for {code}: '{actual_title}' != '{expected_title}'"
    
    # Check attributes for all AMAD
    for p in amad_projects:
        assert p.get("status") == "Available", f"{p['projectCode']} status is not Available"
        assert p.get("domainCode") == "AMAD", f"{p['projectCode']} domainCode is not AMAD"
        assert "Android" in p.get("domainName", ""), f"{p['projectCode']} domainName missing Android"
        assert len(p.get("features", [])) >= 4, f"{p['projectCode']} missing features"
        assert len(p.get("modules", [])) >= 4, f"{p['projectCode']} missing modules"
        assert len(p.get("documentationIncluded", [])) >= 4, f"{p['projectCode']} missing documentation"
    
    # Check next project code calculation
    max_seq = 0
    for p in amad_projects:
        m = re.match(r"^AMAD(\d+)$", p["projectCode"], re.I)
        if m:
            num = int(m.group(1))
            if num > max_seq:
                max_seq = num
    next_code = f"AMAD{max_seq + 1:03d}"
    print(f"Next code for AMAD: {next_code}")
    assert next_code == "AMAD057", f"Expected AMAD057, got {next_code}"
    
    # Inquiries check
    with open("src/data/inquiries-store.json", "r", encoding="utf-8") as f:
        inquiries = json.load(f)
    print(f"Historical inquiries count: {len(inquiries)}")
    assert len(inquiries) >= 4, f"Historical inquiries truncated! Count: {len(inquiries)}"
    inq_ids = [i["id"] for i in inquiries]
    for exp_id in ["inq-2026-001", "inq-2026-002", "inq-2026-003", "inq-2026-004"]:
        assert exp_id in inq_ids, f"Missing historical inquiry {exp_id}"
        
    print("\nALL VERIFICATION CHECKS PASSED SUCCESSFULLY FOR AMAD!")

if __name__ == "__main__":
    verify()

