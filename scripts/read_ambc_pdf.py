import pypdf

pdf_path = r"C:\Users\sathish kumar\Downloads\AntiMatrix_Blockchain_Python_Java_DotNet_AMBC_16_Catalogue.pdf"
reader = pypdf.PdfReader(pdf_path)

output_txt = "scripts/extracted_ambc_pdf.txt"
with open(output_txt, "w", encoding="utf-8") as f:
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        f.write(f"--- PAGE {i+1} ---\n")
        f.write(text + "\n\n")

print(f"Extracted {len(reader.pages)} pages to {output_txt}")

