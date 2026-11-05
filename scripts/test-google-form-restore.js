const http = require('http');

const PORT = process.env.PORT || 5019;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const GOOGLE_FORM_URL = 'https://forms.gle/oKyzxdmdVZLwWWmU6';

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: 15000,
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
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout requesting ${path}`));
    });

    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function runTests() {
  console.log(`Starting Google Form Restore Integration Tests against ${BASE_URL}...`);
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

  try {
    // 1. Test /project-enquiry redirect
    console.log('\n--- 1. Testing /project-enquiry redirect ---');
    const redirectRes = await request('/project-enquiry');
    assert(
      redirectRes.statusCode === 307 || redirectRes.statusCode === 308,
      `/project-enquiry responds with redirect status (got ${redirectRes.statusCode})`
    );
    assert(
      redirectRes.headers.location === GOOGLE_FORM_URL,
      `Redirect location is exact Google Form URL ${GOOGLE_FORM_URL} (got ${redirectRes.headers.location})`
    );

    // 2. Test Home Page HTML contains Google Form link directly
    console.log('\n--- 2. Testing Home Page (/) for Google Form link ---');
    const homeRes = await request('/');
    assert(homeRes.statusCode === 200, 'Home page returns 200 OK');
    assert(
      homeRes.body.includes(GOOGLE_FORM_URL),
      'Home page contains direct link to Google Form URL'
    );
    assert(
      homeRes.body.includes('Project Enquiry'),
      'Home page contains "Project Enquiry" text'
    );
    assert(
      !homeRes.body.includes('href="/project-enquiry"'),
      'Home page has NO internal href="/project-enquiry" links'
    );

    // 3. Test Domain Listing Page (/projects/AMML) for Google Form link
    console.log('\n--- 3. Testing Domain Listing (/projects/AMML) ---');
    const domainRes = await request('/projects/AMML');
    assert(domainRes.statusCode === 200, 'Domain page /projects/AMML returns 200 OK');
    assert(
      domainRes.body.includes(GOOGLE_FORM_URL),
      'Domain listing includes direct Google Form URL for Enquire actions'
    );
    assert(
      !domainRes.body.includes('href="/project-enquiry'),
      'Domain listing has NO internal href="/project-enquiry" links'
    );

    // 4. Test Project Detail Page (/projects/AMML/AMML001) for Google Form link & Request a Requirement
    console.log('\n--- 4. Testing Project Detail Page (/projects/AMML/AMML001) ---');
    const detailRes = await request('/projects/AMML/AMML001');
    assert(detailRes.statusCode === 200, 'Project detail /projects/AMML/AMML001 returns 200 OK');
    assert(
      detailRes.body.includes(GOOGLE_FORM_URL),
      'Detail page contains direct link to Google Form URL'
    );
    assert(
      detailRes.body.includes('Enquire About This Project'),
      'Detail page contains "Enquire About This Project"'
    );
    assert(
      detailRes.body.includes('Request a Requirement'),
      'Detail page contains separate "Request a Requirement" option'
    );
    assert(
      !detailRes.body.includes('href="/project-enquiry'),
      'Detail page has NO internal href="/project-enquiry" links'
    );

    // 5. Test Custom Requirement Submission to Admin Workflow (/api/inquiries)
    console.log('\n--- 5. Testing Custom Requirement Submission to Admin ---');
    const randomIp = `10.99.${Math.floor(Math.random() * 200) + 10}.${Math.floor(Math.random() * 200) + 10}`;
    const customReqPayload = {
      name: 'Praveen Custom Learner',
      email: `praveen_${Date.now()}@test.edu`,
      phone: '9840198765',
      college: 'Madras Institute of Technology',
      degree: 'B.E Computer Science',
      category: 'Deep Learning',
      projectDomain: 'Deep Learning',
      domainCode: 'AMDL',
      projectTitle: 'Custom Vision Transformer for Retinal Vessel Anomaly',
      requirement: 'Special request: Need customized multi-head cross-attention layer not present in catalogue.',
      urgency: '1-2 Weeks',
      source: 'Custom Requirement',
    };

    const submitRes = await request('/api/inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': randomIp,
      },
      body: JSON.stringify(customReqPayload),
    });
    assert(
      submitRes.statusCode === 200 || submitRes.statusCode === 201,
      `Custom requirement submission returns 200/201 (got ${submitRes.statusCode})`
    );
    const submitJson = JSON.parse(submitRes.body);
    const savedInquiry = submitJson.data || submitJson.inquiry;
    assert(submitJson.success === true, 'Submission response success is true');
    assert(
      savedInquiry?.source === 'Custom Requirement',
      `Inquiry source saved as "Custom Requirement" (got ${savedInquiry?.source})`
    );
    assert(
      savedInquiry?.id?.startsWith('REQ-'),
      `Inquiry ID is sequential requirement prefix REQ- (got ${savedInquiry?.id})`
    );

    // 6. Test Admin View of Custom Requirements
    console.log('\n--- 6. Testing Admin Login and View of Custom Requirements ---');
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
    assert(Array.isArray(setCookie) && setCookie.length > 0, 'Admin auth cookie returned');
    const cookieHeader = setCookie.map((c) => c.split(';')[0]).join('; ');

    const adminInquiriesRes = await request('/api/admin/inquiries', {
      headers: { Cookie: cookieHeader },
    });
    assert(adminInquiriesRes.statusCode === 200, 'Admin inquiries fetch succeeds with 200 OK');
    const adminInquiriesJson = JSON.parse(adminInquiriesRes.body);
    const inqs = adminInquiriesJson.inquiries || adminInquiriesJson;
    const foundCustomReq = inqs.find((i) => i.id === savedInquiry?.id);
    assert(!!foundCustomReq, `Submitted custom requirement ${savedInquiry?.id} visible in Admin Dashboard`);
    assert(
      foundCustomReq?.requirement?.includes('cross-attention'),
      'Requirement description preserved in Admin Dashboard'
    );

    console.log(`\n========================================`);
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log(`========================================\n`);

    if (failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error('Unhandled error during testing:', err);
    process.exit(1);
  }
}

runTests();
