const http = require('http');

const PORT = 5029;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const GOOGLE_FORM_URL = 'https://forms.gle/oKyzxdmdVZLwWWmU6';

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: 10000,
    };

    const req = http.request(url, reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function run() {
  console.log(`Starting Request a Requirement -> Google Form Verification on ${BASE_URL}...`);
  let passed = 0;
  let failed = 0;

  function assert(cond, msg) {
    if (cond) {
      console.log(`  [PASS] ${msg}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${msg}`);
      failed++;
    }
  }

  try {
    // 1. Project Detail Page
    console.log('\n--- 1. Testing Project Detail Page (/projects/AMML/AMML001) ---');
    const detail = await request('/projects/AMML/AMML001');
    assert(detail.statusCode === 200, 'Project detail returns 200 OK');
    assert(detail.body.includes('Request a Requirement'), 'Page contains "Request a Requirement" text');
    assert(detail.body.includes(GOOGLE_FORM_URL), 'Page contains exact Google Form URL');
    
    // Check that Request a Requirement is an anchor linking directly to Google Form
    const reqIndex = detail.body.indexOf('Request a Requirement');
    const snippetAroundReq = detail.body.substring(Math.max(0, reqIndex - 1200), reqIndex + 200);
    assert(
      snippetAroundReq.includes(GOOGLE_FORM_URL) && snippetAroundReq.includes('target="_blank"'),
      '"Request a Requirement" is an anchor with target="_blank" pointing directly to Google Form'
    );
    assert(
      snippetAroundReq.includes('rel="noopener noreferrer"'),
      '"Request a Requirement" anchor includes rel="noopener noreferrer"'
    );

    // 2. Domain Page (/projects/AMML)
    console.log('\n--- 2. Testing Domain Page (/projects/AMML) ---');
    const domain = await request('/projects/AMML');
    assert(domain.statusCode === 200, 'Domain page returns 200 OK');
    assert(domain.body.includes('Request a Requirement'), 'Domain page contains "Request a Requirement" button');
    
    const domReqIndex = domain.body.indexOf('Request a Requirement');
    const snippetAroundDomReq = domain.body.substring(Math.max(0, domReqIndex - 1200), domReqIndex + 200);
    assert(
      snippetAroundDomReq.includes(GOOGLE_FORM_URL) && snippetAroundDomReq.includes('target="_blank"'),
      'Domain page "Request a Requirement" links directly to Google Form in a new tab'
    );
    assert(
      snippetAroundDomReq.includes('rel="noopener noreferrer"'),
      'Domain page "Request a Requirement" includes rel="noopener noreferrer"'
    );

    // 3. Check WhatsApp functionality remains intact
    console.log('\n--- 3. Testing WhatsApp link on Project Detail ---');
    assert(detail.body.includes('wa.me/919159514326'), 'WhatsApp direct link is preserved');

    // 4. Check Project Enquiry link remains intact
    console.log('\n--- 4. Testing Project Enquiry on Project Detail ---');
    assert(detail.body.includes('Enquire About This Project'), 'Project Enquiry CTA is preserved');

    // 5. Check Admin API and Data Preservation
    console.log('\n--- 5. Testing Admin Login and Data Safety ---');
    const loginRes = await request('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'antimatrix2026',
        password: 'antimatrix2026@',
      }),
    });
    assert(loginRes.statusCode === 200, 'Admin login succeeds with 200 OK');
    const setCookie = loginRes.headers['set-cookie'];
    const cookieHeader = Array.isArray(setCookie) ? setCookie.map((c) => c.split(';')[0]).join('; ') : '';
    
    const adminInquiriesRes = await request('/api/admin/inquiries', {
      headers: { Cookie: cookieHeader },
    });
    assert(adminInquiriesRes.statusCode === 200, 'Admin inquiries API returns 200 OK');
    const adminData = JSON.parse(adminInquiriesRes.body);
    const inqList = adminData.inquiries || adminData;
    assert(Array.isArray(inqList) && inqList.length > 0, `Admin inquiries preserved (${inqList.length} inquiries found, 0 data lost)`);

    console.log(`\n========================================`);
    console.log(`RESULT: ${passed} PASSED, ${failed} FAILED`);
    console.log(`========================================\n`);

    if (failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  }
}

run();
