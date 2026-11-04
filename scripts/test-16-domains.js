const http = require('http');

const BASE_URL = 'http://127.0.0.1:5002';

const OFFICIAL_16_DOMAINS = [
  { sno: 1, name: "Python Projects", code: "AMPY" },
  { sno: 2, name: "Java Projects", code: "AMJV" },
  { sno: 3, name: "Cyber Security", code: "AMCY" },
  { sno: 4, name: "Django – Python", code: "AMDJ" },
  { sno: 5, name: "Data Science – Python", code: "AMDS" },
  { sno: 6, name: "Image Processing – MATLAB", code: "AMIM" },
  { sno: 7, name: "Deep Learning", code: "AMDL" },
  { sno: 8, name: "Artificial Intelligence", code: "AMAI" },
  { sno: 9, name: "Web Application – PHP", code: "AMPH" },
  { sno: 10, name: "Android – Java", code: "AMAD" },
  { sno: 11, name: "Big Data – Python/Java", code: "AMBD" },
  { sno: 12, name: "Image Processing – Python", code: "AMIP" },
  { sno: 13, name: "Cloud Computing – Python/Java", code: "AMCC" },
  { sno: 14, name: "Data Mining – Python/Java", code: "AMDM" },
  { sno: 15, name: "Blockchain – Python/Java/DotNet", code: "AMBC" },
  { sno: 16, name: "Machine Learning – Python", code: "AMML" }
];

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const postData = body ? JSON.stringify(body) : null;
    const reqHeaders = { ...headers };
    if (postData) {
      reqHeaders['Content-Type'] = 'application/json';
      reqHeaders['Content-Length'] = Buffer.byteLength(postData);
    }

    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: reqHeaders
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let parsed = data;
        try {
          parsed = JSON.parse(data);
        } catch {}
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: parsed
        });
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('================================================================');
  console.log(' AntiMatrix - 16 Official Technical Domains & E2E Test Suite');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, detail = '') {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} - ${detail}`);
      failed++;
    }
  }

  try {
    // TEST 1: SCREEN 1 - /projects (Domain Selection)
    console.log('\n--- 1. Screen 1: Technical Domain Selection (/projects) ---');
    const screen1Res = await request('GET', '/projects');
    assert(screen1Res.status === 200, 'Screen 1 (/projects) returns HTTP 200');
    const screen1Html = typeof screen1Res.body === 'string' ? screen1Res.body : '';
    assert(screen1Html.includes('Technical Domains'), 'Screen 1 contains "Technical Domains" heading');
    
    // Verify all 16 domain codes exist in the page
    let allCodesFound = true;
    for (const d of OFFICIAL_16_DOMAINS) {
      if (!screen1Html.includes(d.code)) {
        allCodesFound = false;
        console.error(`Missing domain code ${d.code} in Screen 1`);
      }
    }
    assert(allCodesFound, 'Screen 1 renders all 16 official technical domain codes');

    // TEST 2: SCREEN 2 - /projects/AMPY (Projects under domain)
    console.log('\n--- 2. Screen 2: Projects under Selected Domain (/projects/AMPY) ---');
    const screen2Res = await request('GET', '/projects/AMPY');
    assert(screen2Res.status === 200, 'Screen 2 (/projects/AMPY) returns HTTP 200');
    const screen2Html = typeof screen2Res.body === 'string' ? screen2Res.body : '';
    assert(screen2Html.includes('Python Projects'), 'Screen 2 shows domain name "Python Projects"');
    assert(screen2Html.includes('AMPY001'), 'Screen 2 lists project "AMPY001"');
    assert(screen2Html.includes('Back to Domains'), 'Screen 2 contains "Back to Domains" navigation button');

    // TEST 3: SCREEN 2 - Empty Domain Handling (/projects/AMIM)
    console.log('\n--- 3. Screen 2: Empty Domain State (/projects/AMIM) ---');
    const emptyDomainRes = await request('GET', '/projects/AMIM');
    assert(emptyDomainRes.status === 200, 'Screen 2 empty domain (/projects/AMIM) returns HTTP 200');
    const emptyHtml = typeof emptyDomainRes.body === 'string' ? emptyDomainRes.body : '';
    assert(
      emptyHtml.includes('Projects for this domain will be available soon'),
      'Empty domain shows clear notice "Projects for this domain will be available soon."'
    );

    // TEST 4: SCREEN 3 - /projects/AMPY/AMPY001 (Project Details)
    console.log('\n--- 4. Screen 3: Project Details (/projects/AMPY/AMPY001) ---');
    const screen3Res = await request('GET', '/projects/AMPY/AMPY001');
    assert(screen3Res.status === 200, 'Screen 3 (/projects/AMPY/AMPY001) returns HTTP 200');
    const screen3Html = typeof screen3Res.body === 'string' ? screen3Res.body : '';
    assert(screen3Html.includes('AMPY001'), 'Screen 3 shows Project Code AMPY001');
    assert(screen3Html.includes('Enquire About This Project'), 'Screen 3 has prominent "Enquire About This Project" button');
    assert(
      screen3Html.includes('/project-enquiry?domain=AMPY&amp;project=AMPY001') ||
      screen3Html.includes('/project-enquiry?domain=AMPY&project=AMPY001'),
      'Enquiry button properly links with prefilled query parameters ?domain=AMPY&project=AMPY001'
    );

    // TEST 5: API /api/projects
    console.log('\n--- 5. Projects API Endpoint (/api/projects) ---');
    const apiRes = await request('GET', '/api/projects');
    assert(apiRes.status === 200, 'GET /api/projects returns HTTP 200');
    assert(Array.isArray(apiRes.body.projects), 'API returns projects array');
    assert(Array.isArray(apiRes.body.domains), 'API returns 16 domains array');
    assert(apiRes.body.domains.length === 16, 'API returns exactly 16 technical domains', `Got ${apiRes.body.domains?.length}`);

    // TEST 6: API /api/projects?domain=AMJV
    console.log('\n--- 6. Projects Domain Filter API (/api/projects?domain=AMJV) ---');
    const amjvRes = await request('GET', '/api/projects?domain=AMJV');
    assert(amjvRes.status === 200, 'GET /api/projects?domain=AMJV returns HTTP 200');
    const amjvProjects = amjvRes.body.projects || [];
    assert(amjvProjects.length > 0, 'Domain AMJV has projects returned');
    assert(amjvProjects.every(p => p.domainCode === 'AMJV'), 'All returned projects have domainCode AMJV');

    // TEST 7: Project-Specific Enquiry Submission
    console.log('\n--- 7. Project-Specific Enquiry Submission ---');
    const projectSpecificPayload = {
      name: "Rohan Sharma",
      email: `rohan.sharma.${Date.now()}@gmail.com`,
      phone: "9876543210",
      mobileNumber: "9876543210",
      whatsappNumber: "9876543210",
      college: "PSG College of Technology",
      department: "Computer Science and Engineering",
      domainCode: "AMPY",
      domainName: "Python Projects",
      projectDomain: "Python Projects",
      projectCode: "AMPY001",
      projectTitle: "AI-Powered Driver Drowsiness, Yawn & Distraction Monitoring System",
      enquiryType: "Project Specific",
      requirement: "Need full source code and presentation for university final year review.",
      urgency: "Immediate (1-3 days)",
      source: "Project Enquiry",
      _f_rendered_at: Date.now() - 5000,
      website_origin_token: "amt-verified-human-token-v2"
    };

    const inqRes1 = await request('POST', '/api/inquiries', projectSpecificPayload, {
      'x-forwarded-for': `198.51.100.${Math.floor(Math.random() * 200 + 10)}`
    });
    assert(inqRes1.status === 200 || inqRes1.status === 201, `Project-specific enquiry returns HTTP 200/201 (got ${inqRes1.status})`);
    assert(inqRes1.body.success === true, 'Response indicates success');
    const inqId1 = inqRes1.body.data?.id;
    assert(Boolean(inqId1), `Enquiry ID generated: ${inqId1}`);
    assert(inqRes1.body.data.enquiryType === 'Project Specific', 'enquiryType is "Project Specific"');
    assert(inqRes1.body.data.projectCode === 'AMPY001', 'projectCode is "AMPY001"');
    assert(inqRes1.body.data.domainCode === 'AMPY', 'domainCode is "AMPY"');

    // TEST 8: General Domain Enquiry Submission
    console.log('\n--- 8. General Domain Enquiry Submission ---');
    const generalDomainPayload = {
      name: "Pooja Patel",
      email: `pooja.patel.${Date.now()}@gmail.com`,
      phone: "9123456780",
      mobileNumber: "9123456780",
      whatsappNumber: "9123456780",
      college: "Anna University College of Engineering, Guindy",
      department: "Information Technology",
      domainCode: "AMML",
      domainName: "Machine Learning – Python",
      projectDomain: "Machine Learning – Python",
      projectTitle: "Machine Learning – Python",
      enquiryType: "General Domain",
      requirement: "Looking for top recommended IEEE topics in Machine Learning.",
      urgency: "1-2 Weeks",
      source: "Project Enquiry",
      _f_rendered_at: Date.now() - 5000,
      website_origin_token: "amt-verified-human-token-v2"
    };

    const inqRes2 = await request('POST', '/api/inquiries', generalDomainPayload, {
      'x-forwarded-for': `198.51.100.${Math.floor(Math.random() * 200 + 10)}`
    });
    assert(inqRes2.status === 200 || inqRes2.status === 201, `General domain enquiry returns HTTP 200/201 (got ${inqRes2.status})`);
    assert(inqRes2.body.data.enquiryType === 'General Domain', 'enquiryType is "General Domain"');
    assert(inqRes2.body.data.domainCode === 'AMML', 'domainCode is "AMML"');
    assert(!inqRes2.body.data.projectCode, 'projectCode is empty for general domain enquiry');

    // TEST 9: Admin Authentication & Sequential Project Code Generation
    console.log('\n--- 9. Admin Login & Sequential Project Code Generation ---');
    const loginRes = await request('POST', '/api/admin/login', {
      username: 'antimatrix2026',
      password: process.env.ADMIN_PASSWORD || 'antimatrix2026@'
    });
    assert(loginRes.status === 200, 'Admin login with antimatrix2026 returns HTTP 200');

    // Extract session cookie
    const setCookie = loginRes.headers['set-cookie'];
    const sessionCookie = Array.isArray(setCookie) ? setCookie[0].split(';')[0] : '';
    assert(Boolean(sessionCookie), 'Received admin session cookie');

    // Create a new project under domain AMML (which currently has AMML001)
    const newProjectPayload = {
      domainCode: "AMML",
      title: "Real-Time Cyber Attack Vector Classification via Graph Neural Networks",
      tagline: "GNN Deep Representation of Distributed Network Graphs",
      description: "Classifies lateral movement and advanced persistent threats in multi-host enterprise network topologies using PyTorch Geometric.",
      abstract: "Traditional signature detectors struggle against distributed stealth attacks. This project encodes NetFlow graphs into Graph Neural Networks to detect multi-stage intrusions with 98.4% precision.",
      techStack: ["Python", "PyTorch Geometric", "NetworkX", "Scikit-Learn"],
      level: "UG Final Year",
      year: "2025-26 Edition"
    };

    const createProjRes = await request('POST', '/api/projects', newProjectPayload, {
      Cookie: sessionCookie
    });
    assert(createProjRes.status === 201, 'Admin POST /api/projects returns HTTP 201 Created');
    const createdCode = createProjRes.body.project?.projectCode;
    assert(createdCode && createdCode.startsWith('AMML'), `Sequential project code starts with AMML: got ${createdCode}`);

    // Verify project can be retrieved
    const getCreatedRes = await request('GET', `/api/projects/${createdCode}`);
    assert(getCreatedRes.status === 200, `GET /api/projects/${createdCode} returns HTTP 200`);
    assert(getCreatedRes.body.project.domainCode === 'AMML', 'Retrieved project has domainCode AMML');

    // TEST 10: Preservation of Historical Inquiries
    console.log('\n--- 10. Preservation of Historical Inquiries ---');
    const adminInqRes = await request('GET', '/api/admin/inquiries', null, {
      Cookie: sessionCookie
    });
    assert(adminInqRes.status === 200, 'GET /api/admin/inquiries returns HTTP 200');
    const allInquiries = adminInqRes.body.inquiries || [];
    const hasInq001 = allInquiries.some(i => i.id === 'inq-2026-001');
    const hasInq002 = allInquiries.some(i => i.id === 'inq-2026-002');
    const hasInq003 = allInquiries.some(i => i.id === 'inq-2026-003');
    const hasInq004 = allInquiries.some(i => i.id === 'inq-2026-004');
    assert(hasInq001 && hasInq002 && hasInq003 && hasInq004, 'Historical inquiries (inq-2026-001 through 004) are 100% preserved');

  } catch (err) {
    console.error('Test suite execution error:', err);
    failed++;
  }

  console.log('\n================================================================');
  console.log(` Test Results: ${passed} PASSED, ${failed} FAILED`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
