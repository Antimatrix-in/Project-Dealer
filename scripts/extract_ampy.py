import pypdf
import re
import json

reader = pypdf.PdfReader(r'C:\Users\sathish kumar\Downloads\AntiMatrix_Python_Projects_AMPY_107_Final.pdf')

projects = {}
current_code = None
current_title_parts = []

for page_idx, page in enumerate(reader.pages):
    raw_lines = page.extract_text().split('\n')
    for raw in raw_lines:
        line = raw.strip()
        if not line:
            continue
        if line.startswith('AntiMatrix') or line.startswith('Page ') or line in ['Python Projects', 'PROJECT CODE', 'PROJECT TITLE']:
            continue
        # Check if line is just an AMPY code
        code_match = re.match(r'^(AMPY\d{3})$', line)
        if code_match:
            if current_code:
                projects[current_code] = ' '.join(current_title_parts).strip()
            current_code = code_match.group(1)
            current_title_parts = []
        else:
            if current_code:
                # check if line contains an inline code
                inline_match = re.search(r'\b(AMPY\d{3})\b', line)
                if inline_match:
                    parts = re.split(r'\b(AMPY\d{3})\b', line)
                    if parts[0].strip():
                        current_title_parts.append(parts[0].strip())
                    projects[current_code] = ' '.join(current_title_parts).strip()
                    current_code = parts[1]
                    current_title_parts = [parts[2].strip()] if len(parts) > 2 and parts[2].strip() else []
                else:
                    clean = re.sub(r'\s*Page\s+\d+\s*', ' ', line).strip()
                    if clean:
                        current_title_parts.append(clean)

if current_code:
    projects[current_code] = ' '.join(current_title_parts).strip()

print('Total extracted:', len(projects))

# Clean any special characters
cleaned_projects = {}
for i in range(1, 108):
    code = f'AMPY{i:03d}'
    raw_title = projects.get(code, '')
    # replace Unicode replacement character with apostrophe or dash as needed
    t = raw_title.replace('\ufffd', "'")
    t = ' '.join(t.split())
    cleaned_projects[code] = t
    if i in [1, 2, 3, 50, 100, 107]:
        print(f'{code}: {t}')

with open('src/data/extracted_ampy_107.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned_projects, f, indent=2, ensure_ascii=False)

print('Saved src/data/extracted_ampy_107.json successfully.')

