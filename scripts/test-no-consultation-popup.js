const http = require('http');

const PORT = 5031;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const GOOGLE_FORM_URL = 'https://forms.gle/oKyzxdmdVZLwWWmU6';
const WA_BASE = 'https://wa.me/919159514326';

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
  console.log(`Starting Consultation Popup Removal & Direct Navigation Tests on ${BASE_URL}...\n`);
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
    // 1. Home Page Verification
    console.log('--- 1. Testing Home Page (/) ---');
    const home = await request('/');
    assert(home.statusCode === 200, 'Home page returns 200 OK');
    assert(!home.body.includes('Submit Consultation Request'), 'Home page does NOT contain consultation modal submit button');
    assert(!home.body.includes('Target Review Deadline'), 'Home page does NOT contain consultation modal deadline selector');
    assert(home.body.includes(WA_BASE), 'Home page contains direct WhatsApp links');
    assert(home.body.includes('Inquire for') && home.body.includes('Project Development'), 'Home page has service inquiry button');
    assert(home.body.includes('Initiate Step'), 'Process section has Initiate Step button');
    assert(home.body.includes('Ask an Expert'), 'FAQ section has Ask an Expert button');

    // 2. Services Page Verification
    console.log('\n--- 2. Testing Services Page (/services) ---');
    const services = await request('/services');
    assert(services.statusCode === 200, 'Services page returns 200 OK');
    assert(!services.body.includes('Submit Consultation Request'), 'Services page has NO consultation modal');
    assert(services.body.includes('Project Development'), 'Service 1 title rendered');
    assert(services.body.includes('Technical Mentorship'), 'Service 6 title rendered');
    assert(services.body.includes(WA_BASE), 'Services page cards link directly to WhatsApp');
    assert(services.body.includes('Project%20Development'), 'WhatsApp link includes service name in query');

    // 3. Contact / Support Page Verification
    console.log('\n--- 3. Testing Contact / Support Page (/contact) ---');
    const contact = await request('/contact');
    assert(contact.statusCode === 200, 'Contact page returns 200 OK');
    assert(!contact.body.includes('Submit Consultation Request'), 'Contact page has NO consultation modal');
    assert(contact.body.includes('Submit Project Requirement'), 'Contact page has Submit Project Requirement button');
    assert(contact.body.includes(GOOGLE_FORM_URL), 'Submit Project Requirement links directly to Google Form');
    assert(contact.body.includes(WA_BASE), 'Contact page has direct WhatsApp link');

    // 4. Project Detail Page Verification
    console.log('\n--- 4. Testing Project Detail Page (/projects/AMML/AMML001) ---');
    const detail = await request('/projects/AMML/AMML001');
    assert(detail.statusCode === 200, 'Project detail returns 200 OK');
    assert(!detail.body.includes('Submit Consultation Request'), 'Detail page has NO consultation modal');
    assert(detail.body.includes('Request a Requirement'), 'Detail page has Request a Requirement option');
    assert(detail.body.includes(GOOGLE_FORM_URL), 'Request a Requirement links directly to Google Form');
    assert(detail.body.includes(WA_BASE), 'Detail page has direct WhatsApp link');

    // 5. Admin Integrity & Production Safety
    console.log('\n--- 5. Testing Admin Dashboard & Data Safety ---');
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
    assert(Array.isArray(inqList), 'Admin inquiries preserved as valid array');

    console.log(`\n========================================`);
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log(`========================================\n`);

    if (failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  }
}

run();
