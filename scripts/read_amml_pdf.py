import pypdf
import os

pdf_path = r"C:\Users\sathish kumar\Downloads\AntiMatrix_Machine_Learning_Python_AMML_144_Catalogue.pdf"

if not os.path.exists(pdf_path):
    print(f"File not found: {pdf_path}")
    exit(1)

reader = pypdf.PdfReader(pdf_path)
print(f"Total pages: {len(reader.pages)}")

all_text = []
for idx, page in enumerate(reader.pages):
    text = page.extract_text()
    all_text.append(f"--- PAGE {idx+1} ---")
    all_text.append(text or "")

out_text = "\n".join(all_text)
os.makedirs("scripts", exist_ok=True)
with open("scripts/extracted_amml_pdf.txt", "w", encoding="utf-8") as f:
    f.write(out_text)

print(f"Saved {len(out_text)} characters to scripts/extracted_amml_pdf.txt")

