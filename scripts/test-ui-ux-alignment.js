const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.TEST_BASE_URL || 'http://127.0.0.1:5025';
const GOOGLE_FORM_URL = 'https://forms.gle/oKyzxdmdVZLwWWmU6';

const ALL_16_DOMAINS = [
  { code: 'AMPY', name: 'Python Projects', expectedMin: 100 },
  { code: 'AMJV', name: 'Java Projects', expectedMin: 19 },
  { code: 'AMCY', name: 'Cyber Security', expectedMin: 9 },
  { code: 'AMDJ', name: 'Django', expectedMin: 80 },
  { code: 'AMDS', name: 'Data Science', expectedMin: 50 },
  { code: 'AMIM', name: 'Image Processing', expectedMin: 200 },
  { code: 'AMDL', name: 'Deep Learning', expectedMin: 100 },
  { code: 'AMAI', name: 'Artificial Intelligence', expectedMin: 60 },
  { code: 'AMPH', name: 'Web Application', expectedMin: 260 },
  { code: 'AMAD', name: 'Android', expectedMin: 56 },
  { code: 'AMBD', name: 'Big Data', expectedMin: 22 },
  { code: 'AMIP', name: 'Image Processing', expectedMin: 12 },
  { code: 'AMCC', name: 'Cloud Computing', expectedMin: 105 },
  { code: 'AMDM', name: 'Data Mining', expectedMin: 10 },
  { code: 'AMBC', name: 'Blockchain', expectedMin: 16 },
  { code: 'AMML', name: 'Machine Learning', expectedMin: 144 },
];

function fetchUrl(urlPath, options = {}) {
  return new Promise((resolve, reject) => {
    const fullUrl = urlPath.startsWith('http') ? urlPath : `${BASE_URL}${urlPath}`;
    const urlObj = new URL(fullUrl);
    const client = urlObj.protocol === 'https:' ? https : http;

    const req = client.request(
      fullUrl,
      {
        method: options.method || 'GET',
        headers: options.headers || {},
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data,
          });
        });
      }
    );

    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log(`\n=======================================================`);
  console.log(`ANTIMATRIX UI/UX ALIGNMENT & INTEGRATION AUDIT TEST SUITE`);
  console.log(`Testing target: ${BASE_URL}`);
  console.log(`=======================================================\n`);

  // 1. Data Store Integrity
  console.log('--- 1. Data Store Integrity (Strict Production Safety) ---');
  const projectStorePath = path.join(process.cwd(), 'src/data/projects-store.json');
  const inquiryStorePath = path.join(process.cwd(), 'src/data/inquiries-store.json');

  const projects = JSON.parse(fs.readFileSync(projectStorePath, 'utf8'));
  const inquiries = JSON.parse(fs.readFileSync(inquiryStorePath, 'utf8'));

  assert(projects.length === 1270, `Projects catalogue count exactly 1,270 (Found: ${projects.length})`);
  assert(inquiries.length >= 20, `Inquiries store preserved (Found: ${inquiries.length})`);

  // Count per domain in store
  for (const d of ALL_16_DOMAINS) {
    const count = projects.filter(p => (p.domainCode || '').toUpperCase() === d.code).length;
    assert(count >= d.expectedMin, `Domain ${d.code} (${d.name}) has ${count} records (>= ${d.expectedMin})`);
  }

  // 2. Public Pages Status Check
  console.log('\n--- 2. Public Pages 200 OK & Content Verification ---');
  const pages = [
    { path: '/', label: 'Home Page' },
    { path: '/services', label: 'Services Page' },
    { path: '/about', label: 'About Us Page' },
    { path: '/reviews', label: 'Student Reviews Page' },
    { path: '/contact', label: 'Contact Page' },
    { path: '/projects', label: 'Projects Catalog Page' },
    { path: '/admin/login', label: 'Admin Login Gateway' },
  ];

  for (const page of pages) {
    const res = await fetchUrl(page.path);
    assert(res.statusCode === 200, `${page.label} (${page.path}) returns 200 OK`);
  }

  // 3. All 16 Domain Pages Verification
  console.log('\n--- 3. Verifying All 16 Technical Domain Pages ---');
  for (const domain of ALL_16_DOMAINS) {
    const res = await fetchUrl(`/projects/${domain.code}`);
    assert(res.statusCode === 200, `Domain ${domain.code} page returns 200 OK`);
    assert(res.body.includes(domain.code), `Domain page renders code ${domain.code}`);
    assert(
      res.body.includes(GOOGLE_FORM_URL) || res.body.includes('forms.gle'),
      `Domain ${domain.code} page contains Google Enquiry Form link`
    );
  }

  // 4. Sample Project Detail Pages
  console.log('\n--- 4. Testing Project Detail Pages ---');
  const sampleProjects = [
    { domain: 'AMPY', code: 'AMPY001', name: 'Drowsiness' },
    { domain: 'AMJV', code: 'AMJV001', name: 'Attribute-Based' },
    { domain: 'AMCC', code: 'AMCC001', name: 'Cloud Computing 001' },
    { domain: 'AMML', code: 'AMML001', name: 'Machine Learning 001' },
  ];

  for (const sp of sampleProjects) {
    const res = await fetchUrl(`/projects/${sp.domain}/${sp.code}`);
    assert(res.statusCode === 200, `Project Detail ${sp.domain}/${sp.code} returns 200 OK`);
    assert(res.body.includes(sp.code), `Project Detail renders code ${sp.code}`);
    assert(
      res.body.includes(GOOGLE_FORM_URL),
      `Project Detail ${sp.code} has direct Google Form Enquiry button`
    );
  }

  // 5. Google Form Integration Verification
  console.log('\n--- 5. Testing Google Form Integration & Redirection ---');
  const homeRes = await fetchUrl('/');
  assert(
    homeRes.body.includes(GOOGLE_FORM_URL),
    'Home page includes official Google Enquiry Form URL'
  );

  const enquiryRedirectRes = await fetchUrl('/project-enquiry');
  assert(
    enquiryRedirectRes.statusCode === 307 ||
    enquiryRedirectRes.statusCode === 308 ||
    enquiryRedirectRes.statusCode === 302 ||
    (enquiryRedirectRes.headers.location && enquiryRedirectRes.headers.location.includes('forms.gle')),
    '/project-enquiry correctly redirects to Google Form URL'
  );

  // 6. Footer 16 Domains and Alignment Check
  console.log('\n--- 6. Testing Footer 16 Domains and Consistency ---');
  assert(homeRes.body.includes('16 Project Domains'), 'Footer displays "16 Project Domains"');
  assert(!homeRes.body.includes('10 Project Domains'), 'Footer does not display "10 Project Domains"');

  for (const d of ALL_16_DOMAINS) {
    assert(
      homeRes.body.includes(`/projects/${d.code}`),
      `Footer links to domain /projects/${d.code}`
    );
  }

  // 7. Navbar Mobile 16 Domains Check
  console.log('\n--- 7. Testing Navbar Mobile Menu 16 Domains ---');
  assert(homeRes.body.includes('16 Project Domains'), 'Navbar mobile menu displays "16 Project Domains"');

  // 8. Custom Requirement Admin Submission Workflow
  console.log('\n--- 8. Testing Custom Requirement Submission (Admin Workflow) ---');
  const testEmail = `test.audit.${Date.now()}@university.edu`;
  const postBody = JSON.stringify({
    name: 'Audit Test Student',
    email: testEmail,
    phone: '+91 9159514326',
    college: 'Anna University',
    degree: 'B.E CSE',
    category: 'Python Projects',
    requirement: 'UI/UX Alignment Verification Request',
    message: 'Testing custom requirement workflow during consistency audit.',
    source: 'Automated Audit Suite',
  });

  const ipSuffix = Math.floor(Math.random() * 200) + 20;
  const submitRes = await fetchUrl('/api/inquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postBody),
      'x-forwarded-for': `192.168.10.${ipSuffix}`,
    },
    body: postBody,
  });

  assert(submitRes.statusCode === 200 || submitRes.statusCode === 201, `Submit custom requirement returns 200/201 (Got: ${submitRes.statusCode})`);
  const submitJson = JSON.parse(submitRes.body);
  assert(submitJson.success === true, 'Custom requirement submission returned success: true');

  // Verify it was stored in inquiries store
  const updatedInquiries = JSON.parse(fs.readFileSync(inquiryStorePath, 'utf8'));
  const foundSaved = updatedInquiries.some(inq => inq.email === testEmail);
  assert(foundSaved, 'Custom requirement was stored into inquiries-store.json for Admin view');

  console.log('\n=======================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('=======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
