import json
import re
from collections import Counter

def main():
    store_path = "src/data/projects-store.json"
    inquiries_path = "src/data/inquiries-store.json"
    
    with open(store_path, "r", encoding="utf-8") as f:
        projects = json.load(f)
        
    print(f"Total projects in store: {len(projects)}")
    assert len(projects) == 1270, f"Expected 1270, got {len(projects)}"
    
    # Check domain counts
    domain_counts = Counter(p.get("domainCode") for p in projects)
    print("Domain distribution:")
    for code, count in sorted(domain_counts.items(), key=lambda x: str(x[0])):
        print(f"  {code}: {count}")
        
    expected_domain_counts = {
        "AMAD": 56,
        "AMAI": 60,
        "AMBC": 16,
        "AMBD": 22,
        "AMCC": 105,
        "AMCY": 9,
        "AMDJ": 81,
        "AMDL": 100,
        "AMDM": 10,
        "AMDS": 50,
        "AMIM": 210,
        "AMIP": 12,
        "AMJV": 19,
        "AMML": 144,
        "AMPH": 269,
        "AMPY": 107
    }
    
    for code, expected_cnt in expected_domain_counts.items():
        actual_cnt = domain_counts.get(code, 0)
        assert actual_cnt == expected_cnt, f"Domain {code} expected {expected_cnt}, got {actual_cnt}"
        
    amml_projects = [p for p in projects if p.get("domainCode") == "AMML"]
    assert len(amml_projects) == 144, f"Expected 144 AMML projects, got {len(amml_projects)}"
    
    # Verify codes AMML001 through AMML144
    code_map = {}
    for p in amml_projects:
        code = p.get("projectCode") or p.get("id")
        assert code not in code_map, f"Duplicate code {code}"
        code_map[code] = p
        
    for i in range(1, 145):
        expected_code = f"AMML{i:03d}"
        assert expected_code in code_map, f"Missing code {expected_code}"
        
    print("All 144 project codes AMML001-AMML144 are contiguously present without duplicates.")
    
    # Benchmark title checks
    benchmarks = {
        "AMML001": "Diagnosis of cardiovascular disorder by CT images using Machine learning technique",
        "AMML002": "Explaining Graph Neural Networks With Topology-Aware Node Selection: Application in Air Quality Inference",
        "AMML011": "Automatic Liver Tumor Segmentation on Dynamic Contrast Enhanced MRI Using 4D Information: Deep Learning Model Based on 3D Convolution and Convolutional LSTM",
        "AMML033": "Implementation of Personality Detection and Accuracy Prediction for identification of fake and true news using Decision Tree and Random Forest Algorithms",
        "AMML037": "machine learning",
        "AMML043": "Diagnosis of cardiovascular disorder by CT images using Machine Learning",
        "AMML082": "A Systematic Literature Review on Multimodal Machine Learning Applications Challenges Gaps and Future Directions",
        "AMML099": "Automated Stroke Prediction Using Machine Learning An Explainable and Exploratory Study With a Web Application for Early Intervention",
        "AMML102": "BI-RADS-NET-V2 A Composite Multi-Task Neural Network for Computer-Aided Diagnosis of Breast Cancer in Ultrasound Images With Semantic and Quantitative Explanations",
        "AMML118": "Game Stats Forecast based on Sports Data using ML algorithms",
        "AMML140": "Movie Recommendation system using Collaborative Filtring Algorithm",
        "AMML144": "AFNN-R: An Effective and Accurate Phishing WebsitesDetection using Optimal Feature Selection and Random Forest Class"
    }
    
    for code, expected_title in benchmarks.items():
        actual_title = code_map[code]["title"]
        assert actual_title == expected_title, f"For {code}, expected '{expected_title}', got '{actual_title}'"
        print(f"  [OK] {code}: {actual_title}")
        
    # Check AMML001 vs AMML043 are distinct
    assert code_map["AMML001"]["title"] != code_map["AMML043"]["title"], "AMML001 and AMML043 must not be identical"
    print("AMML001 and AMML043 successfully verified as distinct.")
    
    # Check next sequential code calculation
    upper = "AMML"
    max_seq = 0
    regex = re.compile(rf"^{upper}(\d+)$", re.IGNORECASE)
    for p in projects:
        code = p.get("projectCode") or p.get("id") or ""
        match = regex.match(code)
        if match:
            num = int(match.group(1))
            if num > max_seq:
                max_seq = num
    next_seq = f"{upper}{max_seq + 1:03d}"
    print(f"Next sequential project code for AMML: {next_seq}")
    assert next_seq == "AMML145", f"Expected AMML145, got {next_seq}"
    
    # Check inquiries store
    with open(inquiries_path, "r", encoding="utf-8") as f:
        inquiries = json.load(f)
    print(f"Total inquiries in store: {len(inquiries)}")
    assert len(inquiries) == 20, f"Expected 20 inquiries, got {len(inquiries)}"
    
    print("\nALL DISK STORE VERIFICATION CHECKS PASSED PERFECTLY!")

if __name__ == "__main__":
    main()

