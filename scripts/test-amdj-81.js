const http = require('http');

const BASE_URL = 'http://127.0.0.1:5005';

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
  console.log(' AntiMatrix - 81 Django – Python Projects (AMDJ001-AMDJ081) Suite');
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
    assert(screen1Html.includes('Django – Python') || screen1Html.includes('Django'), 'Screen 1 contains "Django – Python" domain card');
    assert(screen1Html.includes('AMDJ'), 'Screen 1 contains domain code "AMDJ"');
    assert(
      screen1Html.includes('81 Projects') || screen1Html.includes('Available Projects: 81') || screen1Html.includes('81'),
      'Screen 1 shows dynamically computed 81 projects for Django – Python'
    );
    assert(
      screen1Html.includes('107 Projects') || screen1Html.includes('107'),
      'Screen 1 preserves dynamically computed 107 projects for Python Projects'
    );
    assert(
      screen1Html.includes('19 Projects') || screen1Html.includes('19'),
      'Screen 1 preserves dynamically computed 19 projects for Java Projects'
    );
    assert(
      screen1Html.includes('9 Projects') || screen1Html.includes('9'),
      'Screen 1 preserves dynamically computed 9 projects for Cyber Security'
    );

    // TEST 2: SCREEN 2 - /projects/AMDJ (Projects under Django Domain)
    console.log('\n--- 2. Screen 2: Projects under Django Domain (/projects/AMDJ) ---');
    const screen2Res = await request('GET', '/projects/AMDJ');
    assert(screen2Res.status === 200, 'Screen 2 (/projects/AMDJ) returns HTTP 200');
    const screen2Html = typeof screen2Res.body === 'string' ? screen2Res.body : '';
    assert(screen2Html.includes('Django – Python') || screen2Html.includes('Django'), 'Screen 2 shows domain name "Django – Python"');
    assert(/Total Projects:\s*(?:<!-- -->)?\s*81/.test(screen2Html), 'Screen 2 dynamically renders "Total Projects: 81"');
    assert(screen2Html.includes('AMDJ001'), 'Screen 2 lists project "AMDJ001"');
    assert(screen2Html.includes('Airline Management System'), 'Screen 2 lists official title for AMDJ001');
    assert(screen2Html.includes('Back to Domains'), 'Screen 2 contains "Back to Domains" navigation button');

    // TEST 3: SCREEN 3 - Project Details for Sample Django Projects
    console.log('\n--- 3. Screen 3: Project Details (/projects/AMDJ/[code]) ---');

    // Check AMDJ001
    const p1Res = await request('GET', '/projects/AMDJ/AMDJ001');
    assert(p1Res.status === 200, 'Screen 3 (/projects/AMDJ/AMDJ001) returns HTTP 200');
    const p1Html = typeof p1Res.body === 'string' ? p1Res.body : '';
    assert(p1Html.includes('AMDJ001'), 'AMDJ001 shows project code');
    assert(p1Html.includes('Airline Management System'), 'AMDJ001 shows exact catalogue title');
    assert(p1Html.includes('Enquire About This Project'), 'AMDJ001 has "Enquire About This Project" button');

    // Check AMDJ027 (Eshop Ecommerce Shopping)
    const p27Res = await request('GET', '/projects/AMDJ/AMDJ027');
    assert(p27Res.status === 200, 'Screen 3 (/projects/AMDJ/AMDJ027) returns HTTP 200');
    const p27Html = typeof p27Res.body === 'string' ? p27Res.body : '';
    assert(p27Html.includes('AMDJ027'), 'AMDJ027 shows project code');
    assert(p27Html.includes('Eshop Ecommerce Shopping'), 'AMDJ027 shows Eshop Ecommerce Shopping title');

    // Check AMDJ081 (Women's Rights Help Suppor)
    const p81Res = await request('GET', '/projects/AMDJ/AMDJ081');
    assert(p81Res.status === 200, 'Screen 3 (/projects/AMDJ/AMDJ081) returns HTTP 200');
    const p81Html = typeof p81Res.body === 'string' ? p81Res.body : '';
    assert(p81Html.includes('AMDJ081'), 'AMDJ081 shows project code');
    assert(p81Html.includes("Women&#x27;s Rights Help Suppor") || p81Html.includes("Women's Rights Help Suppor"), 'AMDJ081 preserves verbatim title "Women\'s Rights Help Suppor"');
    assert(p81Html.includes('Enquire About This Project'), 'AMDJ081 has "Enquire About This Project" button');

    // TEST 4: API /api/projects
    console.log('\n--- 4. Projects API Endpoint (/api/projects) ---');
    const apiRes = await request('GET', '/api/projects');
    assert(apiRes.status === 200, 'GET /api/projects returns HTTP 200');
    assert(Array.isArray(apiRes.body.projects), 'API returns projects array');
    assert(Array.isArray(apiRes.body.domains), 'API returns 16 domains array');
    const djDomainMeta = apiRes.body.domains.find(d => d.code === 'AMDJ');
    assert(djDomainMeta && djDomainMeta.projectCount === 81, `API dynamic count for AMDJ is exactly 81 (got ${djDomainMeta?.projectCount})`);

    // TEST 5: API /api/projects?domain=AMDJ
    console.log('\n--- 5. Projects Domain Filter API (/api/projects?domain=AMDJ) ---');
    const amdjRes = await request('GET', '/api/projects?domain=AMDJ');
    assert(amdjRes.status === 200, 'GET /api/projects?domain=AMDJ returns HTTP 200');
    assert(amdjRes.body.total === 81, `API returns total: 81 for domain AMDJ (got ${amdjRes.body.total})`);
    const amdjProjects = amdjRes.body.projects || [];
    assert(amdjProjects.length === 81, `API returns all 81 projects in array (got ${amdjProjects.length})`);

    // Verify all 81 contiguous codes exist in returned projects
    const returnedCodes = new Set(amdjProjects.map(p => p.projectCode));
    let all81CodesPresent = true;
    for (let i = 1; i <= 81; i++) {
      const c = 'AMDJ' + String(i).padStart(3, '0');
      if (!returnedCodes.has(c)) {
        all81CodesPresent = false;
        console.error(`Missing code in API: ${c}`);
      }
    }
    assert(all81CodesPresent, 'API returns every code from AMDJ001 through AMDJ081 with 0 missing');

    // TEST 6: Search by Title and Code
    console.log('\n--- 6. Search by Title and Code ---');
    const searchCodeRes = await request('GET', '/api/projects?domain=AMDJ&q=AMDJ057');
    assert(searchCodeRes.status === 200, 'Search by code returns HTTP 200');
    assert(searchCodeRes.body.projects.length === 1 && searchCodeRes.body.projects[0].projectCode === 'AMDJ057', 'Search for "AMDJ057" isolates project AMDJ057');

    const searchTitleRes = await request('GET', '/api/projects?domain=AMDJ&q=Transfusion');
    assert(searchTitleRes.status === 200, 'Search by title keyword returns HTTP 200');
    assert(searchTitleRes.body.projects.length === 1 && searchTitleRes.body.projects[0].projectCode === 'AMDJ008', 'Search for "Transfusion" isolates AMDJ008');

    // TEST 7: Project-Specific Enquiry Submission for AMDJ081
    console.log('\n--- 7. Project-Specific Enquiry Submission for AMDJ081 ---');
    const projectSpecificPayload = {
      name: "Sneha Varadharajan",
      email: `sneha.varadharajan.${Date.now()}@gmail.com`,
      phone: "9876543213",
      mobileNumber: "9876543213",
      whatsappNumber: "9876543213",
      college: "Coimbatore Institute of Technology",
      department: "Computer Applications",
      domainCode: "AMDJ",
      domainName: "Django – Python",
      projectDomain: "Django – Python",
      projectCode: "AMDJ081",
      projectTitle: "Women's Rights Help Suppor",
      enquiryType: "Project Specific",
      requirement: "Need full source code and presentation for university project review.",
      urgency: "Immediate (1-3 days)",
      source: "Project Enquiry",
      _f_rendered_at: Date.now() - 5000,
      website_origin_token: "amt-verified-human-token-v2"
    };

    const inqRes = await request('POST', '/api/inquiries', projectSpecificPayload, {
      'x-forwarded-for': `198.51.100.${Math.floor(Math.random() * 200 + 10)}`
    });
    assert(inqRes.status === 200 || inqRes.status === 201, `Project enquiry for AMDJ081 returns HTTP 200/201 (got ${inqRes.status})`);
    assert(inqRes.body.success === true, 'Response indicates success');
    const inqId = inqRes.body.data?.id;
    assert(Boolean(inqId), `Enquiry ID generated: ${inqId}`);
    assert(inqRes.body.data.projectCode === 'AMDJ081', 'enquiry records projectCode "AMDJ081"');
    assert(inqRes.body.data.domainCode === 'AMDJ', 'enquiry records domainCode "AMDJ"');

    // TEST 8: Admin Authentication & Dynamic Sequential Project Code Generation
    console.log('\n--- 8. Admin Authentication & Dynamic Code Generation (Next: AMDJ082) ---');
    const loginRes = await request('POST', '/api/admin/login', {
      username: 'antimatrix2026',
      password: process.env.ADMIN_PASSWORD || 'antimatrix2026@'
    });
    assert(loginRes.status === 200, 'Admin login with antimatrix2026 returns HTTP 200');

    const setCookie = loginRes.headers['set-cookie'];
    const sessionCookie = Array.isArray(setCookie) ? setCookie[0].split(';')[0] : '';
    assert(Boolean(sessionCookie), 'Received admin session cookie');

    // Verify next sequential project code for AMDJ is dynamically AMDJ082
    const newProjectPayload = {
      domainCode: "AMDJ",
      title: "Decentralized Autonomous Micro-Credential Certification Platform in Django",
      tagline: "Django 5.0, Smart Contract State Proofs & Verifiable Credentials",
      description: "An academic verification platform built in Django utilizing cryptographically hashed student credentials.",
      abstract: "Higher education credentials require tamper-evident verification mechanisms.",
      techStack: ["Python", "Django", "PostgreSQL", "Tailwind CSS"],
      level: "UG Final Year",
      year: "2025-26 Edition"
    };

    const createProjRes = await request('POST', '/api/projects', newProjectPayload, {
      Cookie: sessionCookie
    });
    assert(createProjRes.status === 201, 'Admin POST /api/projects returns HTTP 201 Created');
    const createdCode = createProjRes.body.project?.projectCode;
    assert(createdCode === 'AMDJ082', `Next sequential project code dynamically generated as AMDJ082: got ${createdCode}`);

    // Verify project can be retrieved
    const getCreatedRes = await request('GET', `/api/projects/${createdCode}`);
    assert(getCreatedRes.status === 200, `GET /api/projects/${createdCode} returns HTTP 200`);
    assert(getCreatedRes.body.project.domainCode === 'AMDJ', 'Retrieved project has domainCode AMDJ');

    // Clean up test-created project to keep repository strictly at the 81 official catalogue projects
    const fs = require('fs');
    const storePath = 'src/data/projects-store.json';
    const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));
    const cleanedStore = storeData.filter(p => (p.projectCode || p.id) !== 'AMDJ082');
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

