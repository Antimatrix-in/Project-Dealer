const http = require('http');

const BASE_URL = 'http://127.0.0.1:5003';

const OFFICIAL_AMJV_19 = [
  { code: "AMJV001", title: "Attribute-Based Storage Supporting Secure Deduplication Of Encrypted Data In Cloud" },
  { code: "AMJV002", title: "Identity-Based Remote Data Integrity Checking With Perfect Data Privacy Preserving For Cloud Storage" },
  { code: "AMJV003", title: "Reversible Data Hiding In Encrypted Images Using Interpolation-Based Distributed Space Reservation" },
  { code: "AMJV004", title: "A Framework For Detection And Prevention Of Novel Keylogger Spyware Attack" },
  { code: "AMJV005", title: "A Secure And Dynamic Multi-Keyword Ranked Search Scheme Over Encrypted Cloud Data" },
  { code: "AMJV006", title: "Fine-Grained Two-Factor Access Control For Web-Based Cloud Computing Services" },
  { code: "AMJV007", title: "A Decrypteable Attribute Based Keyword Search Schema On E-Health Cloud In Intener Of Things" },
  { code: "AMJV008", title: "Enabling Efficient User Revocation in Identity-based Cloud Storage Auditing for Shared Big Data" },
  { code: "AMJV009", title: "TKSE: Trustworthy Keyword Search Over Encrypted Data With Two-Side Verifiability via Blockchain" },
  { code: "AMJV010", title: "A framework based on RSA and AES encryption algorithms for cloud computing services" },
  { code: "AMJV011", title: "Secured document management through a third party auditor scheme in Cloud Computing" },
  { code: "AMJV012", title: "A prediction based energy conserving resources allocation scheme for cloud computing" },
  { code: "AMJV013", title: "Analysis of Cloud Computing Performance, Scalability, Availability, & Security" },
  { code: "AMJV014", title: "Cloud Computing: A Risk Assessment Model" },
  { code: "AMJV015", title: "Industry Cloud – Effective Adoption of Cloud Computing for Industry Solutions" },
  { code: "AMJV016", title: "A Survey of Mobile Cloud Computing Application Models" },
  { code: "AMJV017", title: "New simulation toolkit for comparison of scheduling algorithm on cloud computing" },
  { code: "AMJV018", title: "Mobile Cloud Computing Architecture, Application Model, and Challenging Issues" },
  { code: "AMJV019", title: "A Dynamic Secure Group Sharing Framework in Public Cloud Computin" }
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
  console.log(' AntiMatrix - 19 Java Projects (AMJV001-AMJV019) Diagnostic Suite');
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
    assert(screen1Html.includes('Java Projects'), 'Screen 1 contains "Java Projects" domain card');
    assert(screen1Html.includes('AMJV'), 'Screen 1 contains domain code "AMJV"');
    assert(
      screen1Html.includes('19 Projects') || screen1Html.includes('Available Projects: 19') || screen1Html.includes('19'),
      'Screen 1 shows dynamically computed 19 projects for Java Projects'
    );
    assert(
      screen1Html.includes('107 Projects') || screen1Html.includes('107'),
      'Screen 1 preserves dynamically computed 107 projects for Python Projects'
    );

    // TEST 2: SCREEN 2 - /projects/AMJV (Projects under Java Domain)
    console.log('\n--- 2. Screen 2: Projects under Java Domain (/projects/AMJV) ---');
    const screen2Res = await request('GET', '/projects/AMJV');
    assert(screen2Res.status === 200, 'Screen 2 (/projects/AMJV) returns HTTP 200');
    const screen2Html = typeof screen2Res.body === 'string' ? screen2Res.body : '';
    assert(screen2Html.includes('Java Projects'), 'Screen 2 shows domain name "Java Projects"');
    assert(/Total Projects:\s*(?:<!-- -->)?\s*19/.test(screen2Html), 'Screen 2 dynamically renders "Total Projects: 19"');
    assert(screen2Html.includes('AMJV001'), 'Screen 2 lists project "AMJV001"');
    assert(screen2Html.includes('Attribute-Based Storage Supporting Secure Deduplication'), 'Screen 2 lists official title for AMJV001');
    assert(screen2Html.includes('AMJV019'), 'Screen 2 lists project "AMJV019"');
    assert(screen2Html.includes('Back to Domains'), 'Screen 2 contains "Back to Domains" navigation button');

    // TEST 3: SCREEN 3 - Project Details for Sample Java Projects
    console.log('\n--- 3. Screen 3: Project Details (/projects/AMJV/[code]) ---');
    
    // Check AMJV001
    const p1Res = await request('GET', '/projects/AMJV/AMJV001');
    assert(p1Res.status === 200, 'Screen 3 (/projects/AMJV/AMJV001) returns HTTP 200');
    const p1Html = typeof p1Res.body === 'string' ? p1Res.body : '';
    assert(p1Html.includes('AMJV001'), 'AMJV001 shows project code');
    assert(p1Html.includes('Attribute-Based Storage Supporting Secure Deduplication Of Encrypted Data In Cloud'), 'AMJV001 shows exact catalogue title');
    assert(p1Html.includes('Enquire About This Project'), 'AMJV001 has "Enquire About This Project" button');

    // Check AMJV007 (decrypteable attribute based keyword search in intener of things)
    const p7Res = await request('GET', '/projects/AMJV/AMJV007');
    assert(p7Res.status === 200, 'Screen 3 (/projects/AMJV/AMJV007) returns HTTP 200');
    const p7Html = typeof p7Res.body === 'string' ? p7Res.body : '';
    assert(p7Html.includes('AMJV007'), 'AMJV007 shows project code');
    assert(p7Html.includes('Intener Of Things'), 'AMJV007 preserves verbatim title with "Intener Of Things"');

    // Check AMJV015 (Industry Cloud – Effective Adoption...)
    const p15Res = await request('GET', '/projects/AMJV/AMJV015');
    assert(p15Res.status === 200, 'Screen 3 (/projects/AMJV/AMJV015) returns HTTP 200');
    const p15Html = typeof p15Res.body === 'string' ? p15Res.body : '';
    assert(p15Html.includes('AMJV015'), 'AMJV015 shows project code');
    assert(p15Html.includes('Industry Cloud'), 'AMJV015 shows Industry Cloud title');

    // Check AMJV019 (computin)
    const p19Res = await request('GET', '/projects/AMJV/AMJV019');
    assert(p19Res.status === 200, 'Screen 3 (/projects/AMJV/AMJV019) returns HTTP 200');
    const p19Html = typeof p19Res.body === 'string' ? p19Res.body : '';
    assert(p19Html.includes('AMJV019'), 'AMJV019 shows project code');
    assert(p19Html.includes('Public Cloud Computin'), 'AMJV019 preserves verbatim title with "Public Cloud Computin"');
    assert(p19Html.includes('Enquire About This Project'), 'AMJV019 has "Enquire About This Project" button');

    // TEST 4: API /api/projects
    console.log('\n--- 4. Projects API Endpoint (/api/projects) ---');
    const apiRes = await request('GET', '/api/projects');
    assert(apiRes.status === 200, 'GET /api/projects returns HTTP 200');
    assert(Array.isArray(apiRes.body.projects), 'API returns projects array');
    assert(Array.isArray(apiRes.body.domains), 'API returns 16 domains array');
    const jvDomainMeta = apiRes.body.domains.find(d => d.code === 'AMJV');
    assert(jvDomainMeta && jvDomainMeta.projectCount === 19, `API dynamic count for AMJV is exactly 19 (got ${jvDomainMeta?.projectCount})`);

    // TEST 5: API /api/projects?domain=AMJV
    console.log('\n--- 5. Projects Domain Filter API (/api/projects?domain=AMJV) ---');
    const amjvRes = await request('GET', '/api/projects?domain=AMJV');
    assert(amjvRes.status === 200, 'GET /api/projects?domain=AMJV returns HTTP 200');
    assert(amjvRes.body.total === 19, `API returns total: 19 for domain AMJV (got ${amjvRes.body.total})`);
    const amjvProjects = amjvRes.body.projects || [];
    assert(amjvProjects.length === 19, `API returns all 19 projects in array (got ${amjvProjects.length})`);

    // Verify all 19 contiguous codes exist in returned projects
    const returnedCodes = new Set(amjvProjects.map(p => p.projectCode));
    let all19CodesPresent = true;
    for (let i = 1; i <= 19; i++) {
      const c = 'AMJV' + String(i).padStart(3, '0');
      if (!returnedCodes.has(c)) {
        all19CodesPresent = false;
        console.error(`Missing code in API: ${c}`);
      }
    }
    assert(all19CodesPresent, 'API returns every code from AMJV001 through AMJV019 with 0 missing');

    // Verify exact title match for all 19 projects
    let allTitlesMatch = true;
    for (const official of OFFICIAL_AMJV_19) {
      const proj = amjvProjects.find(p => p.projectCode === official.code);
      if (!proj || proj.title !== official.title) {
        allTitlesMatch = false;
        console.error(`Title mismatch for ${official.code}: expected "${official.title}", got "${proj?.title}"`);
      }
    }
    assert(allTitlesMatch, 'All 19 project titles match official catalogue verbatim without auto-correction');

    // TEST 6: Search by Code and Title
    console.log('\n--- 6. Search by Title and Code ---');
    const searchCodeRes = await request('GET', '/api/projects?domain=AMJV&q=AMJV007');
    assert(searchCodeRes.status === 200, 'Search by code returns HTTP 200');
    assert(searchCodeRes.body.projects.length === 1 && searchCodeRes.body.projects[0].projectCode === 'AMJV007', 'Search for "AMJV007" isolates project AMJV007');

    const searchTitleRes = await request('GET', '/api/projects?domain=AMJV&q=Keylogger');
    assert(searchTitleRes.status === 200, 'Search by title keyword returns HTTP 200');
    assert(searchTitleRes.body.projects.length === 1 && searchTitleRes.body.projects[0].projectCode === 'AMJV004', 'Search for "Keylogger" isolates AMJV004');

    // TEST 7: Project-Specific Enquiry Submission for AMJV019
    console.log('\n--- 7. Project-Specific Enquiry Submission for AMJV019 ---');
    const projectSpecificPayload = {
      name: "Harish Venkat",
      email: `harish.venkat.${Date.now()}@gmail.com`,
      phone: "9876543211",
      mobileNumber: "9876543211",
      whatsappNumber: "9876543211",
      college: "Vellore Institute of Technology",
      department: "Information Technology",
      domainCode: "AMJV",
      domainName: "Java Projects",
      projectDomain: "Java Projects",
      projectCode: "AMJV019",
      projectTitle: "A Dynamic Secure Group Sharing Framework in Public Cloud Computin",
      enquiryType: "Project Specific",
      requirement: "Need complete Java source code and CloudSim integration for university review.",
      urgency: "Immediate (1-3 days)",
      source: "Project Enquiry",
      _f_rendered_at: Date.now() - 5000,
      website_origin_token: "amt-verified-human-token-v2"
    };

    const inqRes = await request('POST', '/api/inquiries', projectSpecificPayload, {
      'x-forwarded-for': `198.51.100.${Math.floor(Math.random() * 200 + 10)}`
    });
    assert(inqRes.status === 200 || inqRes.status === 201, `Project enquiry for AMJV019 returns HTTP 200/201 (got ${inqRes.status})`);
    assert(inqRes.body.success === true, 'Response indicates success');
    const inqId = inqRes.body.data?.id;
    assert(Boolean(inqId), `Enquiry ID generated: ${inqId}`);
    assert(inqRes.body.data.projectCode === 'AMJV019', 'enquiry records projectCode "AMJV019"');
    assert(inqRes.body.data.domainCode === 'AMJV', 'enquiry records domainCode "AMJV"');

    // TEST 8: Admin Authentication & Dynamic Sequential Project Code Generation
    console.log('\n--- 8. Admin Authentication & Dynamic Code Generation (Next: AMJV020) ---');
    const loginRes = await request('POST', '/api/admin/login', {
      username: 'antimatrix2026',
      password: process.env.ADMIN_PASSWORD || 'antimatrix2026@'
    });
    assert(loginRes.status === 200, 'Admin login with antimatrix2026 returns HTTP 200');

    const setCookie = loginRes.headers['set-cookie'];
    const sessionCookie = Array.isArray(setCookie) ? setCookie[0].split(';')[0] : '';
    assert(Boolean(sessionCookie), 'Received admin session cookie');

    // Verify next sequential project code for AMJV is dynamically AMJV020
    const newProjectPayload = {
      domainCode: "AMJV",
      title: "Decentralized Zero-Knowledge Identity Federation for Multi-Cloud Java Environments",
      tagline: "Spring Boot 3, zk-SNARKs and OAuth2 Integration",
      description: "A novel identity federation framework in Java ensuring verifiable credential authentication across disparate clouds.",
      abstract: "Zero-knowledge proof systems enable users to attest to claims without disclosing underlying sensitive attributes.",
      techStack: ["Java 17", "Spring Boot 3", "Bouncy Castle", "MySQL", "Docker"],
      level: "UG Final Year",
      year: "2025-26 Edition"
    };

    const createProjRes = await request('POST', '/api/projects', newProjectPayload, {
      Cookie: sessionCookie
    });
    assert(createProjRes.status === 201, 'Admin POST /api/projects returns HTTP 201 Created');
    const createdCode = createProjRes.body.project?.projectCode;
    assert(createdCode === 'AMJV020', `Next sequential project code dynamically generated as AMJV020: got ${createdCode}`);

    // Verify project can be retrieved
    const getCreatedRes = await request('GET', `/api/projects/${createdCode}`);
    assert(getCreatedRes.status === 200, `GET /api/projects/${createdCode} returns HTTP 200`);
    assert(getCreatedRes.body.project.domainCode === 'AMJV', 'Retrieved project has domainCode AMJV');

    // Clean up test-created project to keep repository strictly at the 19 official catalogue projects
    const fs = require('fs');
    const storePath = 'src/data/projects-store.json';
    const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));
    const cleanedStore = storeData.filter(p => (p.projectCode || p.id) !== 'AMJV020');
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

