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
    
    assert domain_counts.get("AMPH") == 269, f"Expected 269 AMPH, got {domain_counts.get('AMPH')}"
    assert domain_counts.get("AMAI") == 60, f"Expected 60 AMAI, got {domain_counts.get('AMAI')}"
    assert domain_counts.get("AMDL") == 100, f"Expected 100 AMDL, got {domain_counts.get('AMDL')}"
    assert domain_counts.get("AMPY") == 107, f"Expected 107 AMPY, got {domain_counts.get('AMPY')}"
    assert domain_counts.get("AMJV") == 19, f"Expected 19 AMJV, got {domain_counts.get('AMJV')}"
    assert domain_counts.get("AMCY") == 9, f"Expected 9 AMCY, got {domain_counts.get('AMCY')}"
    assert domain_counts.get("AMDJ") == 81, f"Expected 81 AMDJ, got {domain_counts.get('AMDJ')}"
    assert domain_counts.get("AMDS") == 50, f"Expected 50 AMDS, got {domain_counts.get('AMDS')}"
    assert domain_counts.get("AMIM") == 210, f"Expected 210 AMIM, got {domain_counts.get('AMIM')}"
    assert len(projects) == 909, f"Expected 909 total projects, got {len(projects)}"
    
    # Check AMPH contiguous codes
    amph_projects = [p for p in projects if p.get("domainCode") == "AMPH"]
    code_map = {p["projectCode"]: p for p in amph_projects}
    
    expected_codes = [f"AMPH{i:03d}" for i in range(1, 270)]
    missing = [c for c in expected_codes if c not in code_map]
    duplicates = len(amph_projects) - len(code_map)
    
    print(f"AMPH Missing: {missing}")
    print(f"AMPH Duplicates: {duplicates}")
    assert len(missing) == 0, f"Missing codes: {missing}"
    assert duplicates == 0, f"Found duplicates: {duplicates}"
    
    # Key title checks
    key_titles = {
        "AMPH001": "Web based Graphical Password Authentication System",
        "AMPH004": "Agri Shop: Farmers Online Selling Application",
        "AMPH022": "Online Complaint Registration and Management system : street light, water pipe leakage, rain water drainage, road",
        "AMPH055": "Campus Recruitment System",
        "AMPH103": "Empoyee Assign Projects Status System",
        "AMPH148": "Index Management System(Truecaller",
        "AMPH184": "Online E-Learning with Payment",
        "AMPH216": "QR Code Generator",
        "AMPH244": "Student Placement Management System",
        "AMPH261": "Travel Package Expense Management System",
        "AMPH269": "Zoo Management Syste"
    }
    
    for code, expected_title in key_titles.items():
        actual_title = code_map[code]["title"]
        print(f"Checking {code}:")
        print(f"  Actual:   '{actual_title}'")
        print(f"  Expected: '{expected_title}'")
        assert actual_title == expected_title, f"Mismatch for {code}: '{actual_title}' != '{expected_title}'"
    
    # Check attributes for all AMPH
    for p in amph_projects:
        assert p.get("status") == "Available", f"{p['projectCode']} status is not Available"
        assert p.get("domainCode") == "AMPH", f"{p['projectCode']} domainCode is not AMPH"
        assert "PHP" in p.get("domainName", ""), f"{p['projectCode']} domainName missing PHP"
        assert len(p.get("features", [])) >= 4, f"{p['projectCode']} missing features"
        assert len(p.get("modules", [])) >= 4, f"{p['projectCode']} missing modules"
        assert len(p.get("documentationIncluded", [])) >= 4, f"{p['projectCode']} missing documentation"
    
    # Check next project code calculation
    max_seq = 0
    for p in amph_projects:
        m = re.match(r"^AMPH(\d+)$", p["projectCode"], re.I)
        if m:
            num = int(m.group(1))
            if num > max_seq:
                max_seq = num
    next_code = f"AMPH{max_seq + 1:03d}"
    print(f"Next code for AMPH: {next_code}")
    assert next_code == "AMPH270", f"Expected AMPH270, got {next_code}"
    
    # Inquiries check
    with open("src/data/inquiries-store.json", "r", encoding="utf-8") as f:
        inquiries = json.load(f)
    print(f"Historical inquiries count: {len(inquiries)}")
    assert len(inquiries) >= 4, f"Historical inquiries truncated! Count: {len(inquiries)}"
    inq_ids = [i["id"] for i in inquiries]
    for exp_id in ["inq-2026-001", "inq-2026-002", "inq-2026-003", "inq-2026-004"]:
        assert exp_id in inq_ids, f"Missing historical inquiry {exp_id}"
        
    print("\nALL VERIFICATION CHECKS PASSED SUCCESSFULLY FOR AMPH!")

if __name__ == "__main__":
    verify()

