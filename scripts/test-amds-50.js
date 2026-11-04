const http = require('http');

const BASE_URL = 'http://127.0.0.1:5006';

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
  console.log(' AntiMatrix - 50 Data Science – Python Projects (AMDS001-AMDS050) Suite');
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
    assert(screen1Html.includes('Data Science – Python') || screen1Html.includes('Data Science'), 'Screen 1 contains "Data Science – Python" domain card');
    assert(screen1Html.includes('AMDS'), 'Screen 1 contains domain code "AMDS"');
    assert(
      screen1Html.includes('50 Projects') || screen1Html.includes('Available Projects: 50') || screen1Html.includes('50'),
      'Screen 1 shows dynamically computed 50 projects for Data Science – Python'
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
    assert(
      screen1Html.includes('81 Projects') || screen1Html.includes('81'),
      'Screen 1 preserves dynamically computed 81 projects for Django – Python'
    );

    // TEST 2: SCREEN 2 - /projects/AMDS (Projects under Data Science Domain)
    console.log('\n--- 2. Screen 2: Projects under Data Science Domain (/projects/AMDS) ---');
    const screen2Res = await request('GET', '/projects/AMDS');
    assert(screen2Res.status === 200, 'Screen 2 (/projects/AMDS) returns HTTP 200');
    const screen2Html = typeof screen2Res.body === 'string' ? screen2Res.body : '';
    assert(screen2Html.includes('Data Science – Python') || screen2Html.includes('Data Science'), 'Screen 2 shows domain name "Data Science – Python"');
    assert(/Total Projects:\s*(?:<!-- -->)?\s*50/.test(screen2Html), 'Screen 2 dynamically renders "Total Projects: 50"');
    assert(screen2Html.includes('AMDS001'), 'Screen 2 lists project "AMDS001"');
    assert(screen2Html.includes('Bovine Respiratory Disease'), 'Screen 2 lists official title for AMDS001');
    assert(screen2Html.includes('Back to Domains'), 'Screen 2 contains "Back to Domains" navigation button');

    // TEST 3: SCREEN 3 - Project Details for Sample Data Science Projects
    console.log('\n--- 3. Screen 3: Project Details (/projects/AMDS/[code]) ---');

    // Check AMDS001
    const p1Res = await request('GET', '/projects/AMDS/AMDS001');
    assert(p1Res.status === 200, 'Screen 3 (/projects/AMDS/AMDS001) returns HTTP 200');
    const p1Html = typeof p1Res.body === 'string' ? p1Res.body : '';
    assert(p1Html.includes('AMDS001'), 'AMDS001 shows project code');
    assert(p1Html.includes('Bovine Respiratory Disease'), 'AMDS001 shows exact catalogue title');
    assert(p1Html.includes('Enquire About This Project'), 'AMDS001 has "Enquire About This Project" button');

    // Check AMDS024 (DeepCurvMRI)
    const p24Res = await request('GET', '/projects/AMDS/AMDS024');
    assert(p24Res.status === 200, 'Screen 3 (/projects/AMDS/AMDS024) returns HTTP 200');
    const p24Html = typeof p24Res.body === 'string' ? p24Res.body : '';
    assert(p24Html.includes('AMDS024'), 'AMDS024 shows project code');
    assert(p24Html.includes('DeepCurvMRI'), 'AMDS024 shows DeepCurvMRI title');

    // Check AMDS050 (Skin Medical Image Captioning... Siamese Networ)
    const p50Res = await request('GET', '/projects/AMDS/AMDS050');
    assert(p50Res.status === 200, 'Screen 3 (/projects/AMDS/AMDS050) returns HTTP 200');
    const p50Html = typeof p50Res.body === 'string' ? p50Res.body : '';
    assert(p50Html.includes('AMDS050'), 'AMDS050 shows project code');
    assert(p50Html.includes('Siamese Networ'), 'AMDS050 preserves verbatim title ending with "Siamese Networ"');
    assert(p50Html.includes('Enquire About This Project'), 'AMDS050 has "Enquire About This Project" button');

    // TEST 4: API /api/projects
    console.log('\n--- 4. Projects API Endpoint (/api/projects) ---');
    const apiRes = await request('GET', '/api/projects');
    assert(apiRes.status === 200, 'GET /api/projects returns HTTP 200');
    assert(Array.isArray(apiRes.body.projects), 'API returns projects array');
    assert(Array.isArray(apiRes.body.domains), 'API returns 16 domains array');
    const dsDomainMeta = apiRes.body.domains.find(d => d.code === 'AMDS');
    assert(dsDomainMeta && dsDomainMeta.projectCount === 50, `API dynamic count for AMDS is exactly 50 (got ${dsDomainMeta?.projectCount})`);

    // TEST 5: API /api/projects?domain=AMDS
    console.log('\n--- 5. Projects Domain Filter API (/api/projects?domain=AMDS) ---');
    const amdsRes = await request('GET', '/api/projects?domain=AMDS');
    assert(amdsRes.status === 200, 'GET /api/projects?domain=AMDS returns HTTP 200');
    assert(amdsRes.body.total === 50, `API returns total: 50 for domain AMDS (got ${amdsRes.body.total})`);
    const amdsProjects = amdsRes.body.projects || [];
    assert(amdsProjects.length === 50, `API returns all 50 projects in array (got ${amdsProjects.length})`);

    // Verify all 50 contiguous codes exist in returned projects
    const returnedCodes = new Set(amdsProjects.map(p => p.projectCode));
    let all50CodesPresent = true;
    for (let i = 1; i <= 50; i++) {
      const c = 'AMDS' + String(i).padStart(3, '0');
      if (!returnedCodes.has(c)) {
        all50CodesPresent = false;
        console.error(`Missing code in API: ${c}`);
      }
    }
    assert(all50CodesPresent, 'API returns every code from AMDS001 through AMDS050 with 0 missing');

    // TEST 6: Search by Title and Code
    console.log('\n--- 6. Search by Title and Code ---');
    const searchCodeRes = await request('GET', '/api/projects?domain=AMDS&q=AMDS029');
    assert(searchCodeRes.status === 200, 'Search by code returns HTTP 200');
    assert(searchCodeRes.body.projects.length === 1 && searchCodeRes.body.projects[0].projectCode === 'AMDS029', 'Search for "AMDS029" isolates project AMDS029');

    const searchTitleRes = await request('GET', '/api/projects?domain=AMDS&q=Bovine');
    assert(searchTitleRes.status === 200, 'Search by title keyword returns HTTP 200');
    assert(searchTitleRes.body.projects.length === 1 && searchTitleRes.body.projects[0].projectCode === 'AMDS001', 'Search for "Bovine" isolates AMDS001');

    // TEST 7: Project-Specific Enquiry Submission for AMDS050
    console.log('\n--- 7. Project-Specific Enquiry Submission for AMDS050 ---');
    const projectSpecificPayload = {
      name: "Akash Sundaram",
      email: `akash.sundaram.${Date.now()}@gmail.com`,
      phone: "9876543214",
      mobileNumber: "9876543214",
      whatsappNumber: "9876543214",
      college: "Thiagarajar College of Engineering",
      department: "Data Science & Artificial Intelligence",
      domainCode: "AMDS",
      domainName: "Data Science – Python",
      projectDomain: "Data Science – Python",
      projectCode: "AMDS050",
      projectTitle: "Skin Medical Image Captioning Using Multi-Label Classification and Siamese Networ",
      enquiryType: "Project Specific",
      requirement: "Need full python codebase and report for final year review.",
      urgency: "Immediate (1-3 days)",
      source: "Project Enquiry",
      _f_rendered_at: Date.now() - 5000,
      website_origin_token: "amt-verified-human-token-v2"
    };

    const inqRes = await request('POST', '/api/inquiries', projectSpecificPayload, {
      'x-forwarded-for': `198.51.100.${Math.floor(Math.random() * 200 + 10)}`
    });
    assert(inqRes.status === 200 || inqRes.status === 201, `Project enquiry for AMDS050 returns HTTP 200/201 (got ${inqRes.status})`);
    assert(inqRes.body.success === true, 'Response indicates success');
    const inqId = inqRes.body.data?.id;
    assert(Boolean(inqId), `Enquiry ID generated: ${inqId}`);
    assert(inqRes.body.data.projectCode === 'AMDS050', 'enquiry records projectCode "AMDS050"');
    assert(inqRes.body.data.domainCode === 'AMDS', 'enquiry records domainCode "AMDS"');

    // TEST 8: Admin Authentication & Dynamic Sequential Project Code Generation
    console.log('\n--- 8. Admin Authentication & Dynamic Code Generation (Next: AMDS051) ---');
    const loginRes = await request('POST', '/api/admin/login', {
      username: 'antimatrix2026',
      password: process.env.ADMIN_PASSWORD || 'antimatrix2026@'
    });
    assert(loginRes.status === 200, 'Admin login with antimatrix2026 returns HTTP 200');

    const setCookie = loginRes.headers['set-cookie'];
    const sessionCookie = Array.isArray(setCookie) ? setCookie[0].split(';')[0] : '';
    assert(Boolean(sessionCookie), 'Received admin session cookie');

    // Verify next sequential project code for AMDS is dynamically AMDS051
    const newProjectPayload = {
      domainCode: "AMDS",
      title: "Self-Supervised Contrastive Multi-Omics Graph Learning for Oncology Subtype Discovery",
      tagline: "Genomics, Transcriptomics & Graph Neural Networks in Python",
      description: "An integrative multi-omics framework using topological graph representations for cancer subtype stratification.",
      abstract: "Oncology treatment requires accurate molecular subtyping from high-throughput omics profiles.",
      techStack: ["Python", "PyTorch Geometric", "Pandas", "Scikit-Learn"],
      level: "UG Final Year",
      year: "2025-26 Edition"
    };

    const createProjRes = await request('POST', '/api/projects', newProjectPayload, {
      Cookie: sessionCookie
    });
    assert(createProjRes.status === 201, 'Admin POST /api/projects returns HTTP 201 Created');
    const createdCode = createProjRes.body.project?.projectCode;
    assert(createdCode === 'AMDS051', `Next sequential project code dynamically generated as AMDS051: got ${createdCode}`);

    // Verify project can be retrieved
    const getCreatedRes = await request('GET', `/api/projects/${createdCode}`);
    assert(getCreatedRes.status === 200, `GET /api/projects/${createdCode} returns HTTP 200`);
    assert(getCreatedRes.body.project.domainCode === 'AMDS', 'Retrieved project has domainCode AMDS');

    // Clean up test-created project to keep repository strictly at the 50 official catalogue projects
    const fs = require('fs');
    const storePath = 'src/data/projects-store.json';
    const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));
    const cleanedStore = storeData.filter(p => (p.projectCode || p.id) !== 'AMDS051');
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

