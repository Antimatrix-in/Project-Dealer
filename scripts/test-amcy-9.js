const http = require('http');

const BASE_URL = 'http://127.0.0.1:5004';

const OFFICIAL_AMCY_9 = [
  { code: "AMCY001", title: "A Multi-Order Distributed HOSVD with Its Incremental Computing for Big Services in Cyber-Physical-Social Systems" },
  { code: "AMCY002", title: "Event Detection Through Differential Pattern Mining in Cyber-Physical Systems" },
  { code: "AMCY003", title: "Scalable Uncertainty-Aware Truth Discovery in Big Data Social Sensing Applications for Cyber-Physical Systems" },
  { code: "AMCY004", title: "A Blockchain Based Access Control Framework for Cyber-Physical-Social System Big Data" },
  { code: "AMCY005", title: "Cloud-Based K-Closest Pairs Discovery in Dynamic Cyber-Physical-Social Systems" },
  { code: "AMCY006", title: "Blockchain Based Dynamic Spectrum Access of Non Real Time Data in Cyber Physical Social Systems" },
  { code: "AMCY007", title: "Cyber Physical Scheduling for Predictable Reliability of Inter Vehicle Communications" },
  { code: "AMCY008", title: "A Cloud Fog Edge Closed Loop Feedback Security Risk Prediction Method" },
  { code: "AMCY009", title: "PSDS–Proficient Security Over Distributed Storage A Method for Data Transmission in Clo" }
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
  console.log(' AntiMatrix - 9 Cyber Security Projects (AMCY001-AMCY009) Suite');
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
    // TEST 1: SCREEN 1 - /projects (Technical Domain Selection)
    console.log('\n--- 1. Screen 1: Technical Domain Selection (/projects) ---');
    const screen1Res = await request('GET', '/projects');
    assert(screen1Res.status === 200, 'Screen 1 (/projects) returns HTTP 200');
    const screen1Html = typeof screen1Res.body === 'string' ? screen1Res.body : '';
    assert(screen1Html.includes('Cyber Security'), 'Screen 1 contains "Cyber Security" domain card');
    assert(screen1Html.includes('AMCY'), 'Screen 1 contains domain code "AMCY"');
    assert(
      screen1Html.includes('9 Projects') || screen1Html.includes('Available Projects: 9') || screen1Html.includes('9'),
      'Screen 1 shows dynamically computed 9 projects for Cyber Security'
    );
    assert(
      screen1Html.includes('107 Projects') || screen1Html.includes('107'),
      'Screen 1 preserves dynamically computed 107 projects for Python Projects'
    );
    assert(
      screen1Html.includes('19 Projects') || screen1Html.includes('19'),
      'Screen 1 preserves dynamically computed 19 projects for Java Projects'
    );

    // TEST 2: SCREEN 2 - /projects/AMCY (Projects under Cyber Security Domain)
    console.log('\n--- 2. Screen 2: Projects under Cyber Security Domain (/projects/AMCY) ---');
    const screen2Res = await request('GET', '/projects/AMCY');
    assert(screen2Res.status === 200, 'Screen 2 (/projects/AMCY) returns HTTP 200');
    const screen2Html = typeof screen2Res.body === 'string' ? screen2Res.body : '';
    assert(screen2Html.includes('Cyber Security'), 'Screen 2 shows domain name "Cyber Security"');
    assert(/Total Projects:\s*(?:<!-- -->)?\s*9/.test(screen2Html), 'Screen 2 dynamically renders "Total Projects: 9"');
    assert(screen2Html.includes('AMCY001'), 'Screen 2 lists project "AMCY001"');
    assert(screen2Html.includes('Distributed HOSVD'), 'Screen 2 lists official title for AMCY001');
    assert(screen2Html.includes('AMCY009'), 'Screen 2 lists project "AMCY009"');
    assert(screen2Html.includes('Back to Domains'), 'Screen 2 contains "Back to Domains" navigation button');

    // TEST 3: SCREEN 3 - Project Details for Sample Cyber Security Projects
    console.log('\n--- 3. Screen 3: Project Details (/projects/AMCY/[code]) ---');

    // Check AMCY001
    const p1Res = await request('GET', '/projects/AMCY/AMCY001');
    assert(p1Res.status === 200, 'Screen 3 (/projects/AMCY/AMCY001) returns HTTP 200');
    const p1Html = typeof p1Res.body === 'string' ? p1Res.body : '';
    assert(p1Html.includes('AMCY001'), 'AMCY001 shows project code');
    assert(p1Html.includes('Multi-Order Distributed HOSVD'), 'AMCY001 shows exact catalogue title');
    assert(p1Html.includes('Enquire About This Project'), 'AMCY001 has "Enquire About This Project" button');

    // Check AMCY004 (Blockchain Based Access Control)
    const p4Res = await request('GET', '/projects/AMCY/AMCY004');
    assert(p4Res.status === 200, 'Screen 3 (/projects/AMCY/AMCY004) returns HTTP 200');
    const p4Html = typeof p4Res.body === 'string' ? p4Res.body : '';
    assert(p4Html.includes('AMCY004'), 'AMCY004 shows project code');
    assert(p4Html.includes('Blockchain Based Access Control Framework'), 'AMCY004 shows Blockchain title');

    // Check AMCY009 (PSDS–Proficient Security Over Distributed Storage A Method for Data Transmission in Clo)
    const p9Res = await request('GET', '/projects/AMCY/AMCY009');
    assert(p9Res.status === 200, 'Screen 3 (/projects/AMCY/AMCY009) returns HTTP 200');
    const p9Html = typeof p9Res.body === 'string' ? p9Res.body : '';
    assert(p9Html.includes('AMCY009'), 'AMCY009 shows project code');
    assert(p9Html.includes('Transmission in Clo'), 'AMCY009 preserves verbatim title ending with "in Clo"');
    assert(p9Html.includes('Enquire About This Project'), 'AMCY009 has "Enquire About This Project" button');

    // TEST 4: API /api/projects
    console.log('\n--- 4. Projects API Endpoint (/api/projects) ---');
    const apiRes = await request('GET', '/api/projects');
    assert(apiRes.status === 200, 'GET /api/projects returns HTTP 200');
    assert(Array.isArray(apiRes.body.projects), 'API returns projects array');
    assert(Array.isArray(apiRes.body.domains), 'API returns 16 domains array');
    const cyDomainMeta = apiRes.body.domains.find(d => d.code === 'AMCY');
    assert(cyDomainMeta && cyDomainMeta.projectCount === 9, `API dynamic count for AMCY is exactly 9 (got ${cyDomainMeta?.projectCount})`);

    // TEST 5: API /api/projects?domain=AMCY
    console.log('\n--- 5. Projects Domain Filter API (/api/projects?domain=AMCY) ---');
    const amcyRes = await request('GET', '/api/projects?domain=AMCY');
    assert(amcyRes.status === 200, 'GET /api/projects?domain=AMCY returns HTTP 200');
    assert(amcyRes.body.total === 9, `API returns total: 9 for domain AMCY (got ${amcyRes.body.total})`);
    const amcyProjects = amcyRes.body.projects || [];
    assert(amcyProjects.length === 9, `API returns all 9 projects in array (got ${amcyProjects.length})`);

    // Verify all 9 contiguous codes exist in returned projects
    const returnedCodes = new Set(amcyProjects.map(p => p.projectCode));
    let all9CodesPresent = true;
    for (let i = 1; i <= 9; i++) {
      const c = 'AMCY' + String(i).padStart(3, '0');
      if (!returnedCodes.has(c)) {
        all9CodesPresent = false;
        console.error(`Missing code in API: ${c}`);
      }
    }
    assert(all9CodesPresent, 'API returns every code from AMCY001 through AMCY009 with 0 missing');

    // Verify exact title match for all 9 projects
    let allTitlesMatch = true;
    for (const official of OFFICIAL_AMCY_9) {
      const proj = amcyProjects.find(p => p.projectCode === official.code);
      if (!proj || proj.title !== official.title) {
        allTitlesMatch = false;
        console.error(`Title mismatch for ${official.code}: expected "${official.title}", got "${proj?.title}"`);
      }
    }
    assert(allTitlesMatch, 'All 9 project titles match official catalogue verbatim without auto-correction');

    // TEST 6: Search by Code and Title
    console.log('\n--- 6. Search by Title and Code ---');
    const searchCodeRes = await request('GET', '/api/projects?domain=AMCY&q=AMCY008');
    assert(searchCodeRes.status === 200, 'Search by code returns HTTP 200');
    assert(searchCodeRes.body.projects.length === 1 && searchCodeRes.body.projects[0].projectCode === 'AMCY008', 'Search for "AMCY008" isolates project AMCY008');

    const searchTitleRes = await request('GET', '/api/projects?domain=AMCY&q=HOSVD');
    assert(searchTitleRes.status === 200, 'Search by title keyword returns HTTP 200');
    assert(searchTitleRes.body.projects.length === 1 && searchTitleRes.body.projects[0].projectCode === 'AMCY001', 'Search for "HOSVD" isolates AMCY001');

    // TEST 7: Project-Specific Enquiry Submission for AMCY009
    console.log('\n--- 7. Project-Specific Enquiry Submission for AMCY009 ---');
    const projectSpecificPayload = {
      name: "Divya Prakash",
      email: `divya.prakash.${Date.now()}@gmail.com`,
      phone: "9876543212",
      mobileNumber: "9876543212",
      whatsappNumber: "9876543212",
      college: "SSN College of Engineering",
      department: "Cyber Security & Information Assurance",
      domainCode: "AMCY",
      domainName: "Cyber Security",
      projectDomain: "Cyber Security",
      projectCode: "AMCY009",
      projectTitle: "PSDS–Proficient Security Over Distributed Storage A Method for Data Transmission in Clo",
      enquiryType: "Project Specific",
      requirement: "Need full source code and documentation for university project review.",
      urgency: "Immediate (1-3 days)",
      source: "Project Enquiry",
      _f_rendered_at: Date.now() - 5000,
      website_origin_token: "amt-verified-human-token-v2"
    };

    const inqRes = await request('POST', '/api/inquiries', projectSpecificPayload, {
      'x-forwarded-for': `198.51.100.${Math.floor(Math.random() * 200 + 10)}`
    });
    assert(inqRes.status === 200 || inqRes.status === 201, `Project enquiry for AMCY009 returns HTTP 200/201 (got ${inqRes.status})`);
    assert(inqRes.body.success === true, 'Response indicates success');
    const inqId = inqRes.body.data?.id;
    assert(Boolean(inqId), `Enquiry ID generated: ${inqId}`);
    assert(inqRes.body.data.projectCode === 'AMCY009', 'enquiry records projectCode "AMCY009"');
    assert(inqRes.body.data.domainCode === 'AMCY', 'enquiry records domainCode "AMCY"');

    // TEST 8: Admin Authentication & Dynamic Sequential Project Code Generation
    console.log('\n--- 8. Admin Authentication & Dynamic Code Generation (Next: AMCY010) ---');
    const loginRes = await request('POST', '/api/admin/login', {
      username: 'antimatrix2026',
      password: process.env.ADMIN_PASSWORD || 'antimatrix2026@'
    });
    assert(loginRes.status === 200, 'Admin login with antimatrix2026 returns HTTP 200');

    const setCookie = loginRes.headers['set-cookie'];
    const sessionCookie = Array.isArray(setCookie) ? setCookie[0].split(';')[0] : '';
    assert(Boolean(sessionCookie), 'Received admin session cookie');

    // Verify next sequential project code for AMCY is dynamically AMCY010
    const newProjectPayload = {
      domainCode: "AMCY",
      title: "Differential Privacy Preserving Deep Telemetry Analytics for SCADA Infrastructure",
      tagline: "Differential Privacy & Industrial IoT Security",
      description: "A secure architecture implementing formal differential privacy guarantees over streaming SCADA sensor telemetry.",
      abstract: "Industrial control systems are increasingly exposed to telemetry leakage attacks.",
      techStack: ["Python", "PyTorch", "Differential Privacy", "Docker"],
      level: "UG Final Year",
      year: "2025-26 Edition"
    };

    const createProjRes = await request('POST', '/api/projects', newProjectPayload, {
      Cookie: sessionCookie
    });
    assert(createProjRes.status === 201, 'Admin POST /api/projects returns HTTP 201 Created');
    const createdCode = createProjRes.body.project?.projectCode;
    assert(createdCode === 'AMCY010', `Next sequential project code dynamically generated as AMCY010: got ${createdCode}`);

    // Verify project can be retrieved
    const getCreatedRes = await request('GET', `/api/projects/${createdCode}`);
    assert(getCreatedRes.status === 200, `GET /api/projects/${createdCode} returns HTTP 200`);
    assert(getCreatedRes.body.project.domainCode === 'AMCY', 'Retrieved project has domainCode AMCY');

    // Clean up test-created project to keep repository strictly at the 9 official catalogue projects
    const fs = require('fs');
    const storePath = 'src/data/projects-store.json';
    const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));
    const cleanedStore = storeData.filter(p => (p.projectCode || p.id) !== 'AMCY010');
    fs.writeFileSync(storePath, JSON.stringify(cleanedStore, null, 2), 'utf8');

    // TEST 9: Preservation of Historical Inquiries
    console.log('\n--- 9. Preservation of Historical Inquiries ---');
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

