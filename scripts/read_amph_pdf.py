import sys

pdf_path = r"C:\Users\sathish kumar\Downloads\AntiMatrix_Web_Application_PHP_AMPH_269_Catalogue.pdf"

try:
    import pypdf
    reader = pypdf.PdfReader(pdf_path)
    text = ""
    for i, page in enumerate(reader.pages):
        text += f"--- PAGE {i+1} ---\n" + page.extract_text() + "\n"
    with open("scripts/extracted_amph_pdf.txt", "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Read {len(reader.pages)} pages successfully using pypdf. Saved to scripts/extracted_amph_pdf.txt")
except Exception as e:
    print(f"pypdf failed: {e}")
    try:
        import fitz
        doc = fitz.open(pdf_path)
        text = ""
        for i, page in enumerate(doc):
            text += f"--- PAGE {i+1} ---\n" + page.get_text() + "\n"
        with open("scripts/extracted_amph_pdf.txt", "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Read {len(doc)} pages successfully using fitz. Saved to scripts/extracted_amph_pdf.txt")
    except Exception as e2:
        print(f"fitz failed: {e2}")

