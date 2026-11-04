import pypdf

pdf_path = r"C:\Users\sathish kumar\Downloads\AntiMatrix_Django_Python_AMDJ_81_Catalogue.pdf"
reader = pypdf.PdfReader(pdf_path)

print(f"Total pages: {len(reader.pages)}")

full_text = ""
for i, page in enumerate(reader.pages):
    print(f"\n--- PAGE {i+1} ---")
    text = page.extract_text()
    print(text[:1000])
    full_text += f"\n--- PAGE {i+1} ---\n" + text

with open("scripts/extracted_amdj_pdf.txt", "w", encoding="utf-8") as f:
    f.write(full_text)

