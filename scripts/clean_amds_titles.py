import json
import re

with open("scripts/extracted_amds_50.json", "r", encoding="utf-8") as f:
    items = json.load(f)

cleaned = []
for item in items:
    code = item["code"]
    title = item["title"]

    # Remove any stray page headers/footers
    title = title.replace("AntiMatrix Project Center Page 4", "")
    title = title.replace("AntiMatrix Project Center Page 3", "")
    title = title.replace("AntiMatrix Project Center Page 2", "")
    title = title.replace("AntiMatrix Project Center Page 1", "")
    title = title.replace("AntiMatrix Project Center", "")
    title = re.sub(r"\s+Page\s+\d+$", "", title)
    title = title.strip()

    # User specific instruction for AMDS050
    if code == "AMDS050":
        title = "Skin Medical Image Captioning Using Multi-Label Classification and Siamese Networ"

    cleaned.append({"code": code, "title": title})

with open("scripts/extracted_amds_50_cleaned.json", "w", encoding="utf-8") as f:
    json.dump(cleaned, f, indent=2, ensure_ascii=False)

print(f"Total cleaned: {len(cleaned)}")
for x in cleaned:
    print(f"{x['code']}: {x['title']}")

