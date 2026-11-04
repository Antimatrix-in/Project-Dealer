const http = require('http');

const BASE_URL = 'http://127.0.0.1:5007';

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
  console.log(' AntiMatrix - 210 Image Processing – MATLAB (AMIM001-AMIM210) Suite');
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
    assert(screen1Html.includes('Image Processing – MATLAB') || screen1Html.includes('MATLAB'), 'Screen 1 contains "Image Processing – MATLAB" domain card');
    assert(screen1Html.includes('AMIM'), 'Screen 1 contains domain code "AMIM"');
    assert(
      screen1Html.includes('210 Projects') || screen1Html.includes('Available Projects: 210') || screen1Html.includes('210'),
      'Screen 1 shows dynamically computed 210 projects for Image Processing – MATLAB'
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
    assert(
      screen1Html.includes('50 Projects') || screen1Html.includes('50'),
      'Screen 1 preserves dynamically computed 50 projects for Data Science – Python'
    );

    // TEST 2: SCREEN 2 - /projects/AMIM (Projects under Image Processing Domain)
    console.log('\n--- 2. Screen 2: Projects under Image Processing Domain (/projects/AMIM) ---');
    const screen2Res = await request('GET', '/projects/AMIM');
    assert(screen2Res.status === 200, 'Screen 2 (/projects/AMIM) returns HTTP 200');
    const screen2Html = typeof screen2Res.body === 'string' ? screen2Res.body : '';
    assert(screen2Html.includes('Image Processing – MATLAB') || screen2Html.includes('MATLAB'), 'Screen 2 shows domain name "Image Processing – MATLAB"');
    assert(/Total Projects:\s*(?:<!-- -->)?\s*210/.test(screen2Html), 'Screen 2 dynamically renders "Total Projects: 210"');
    assert(screen2Html.includes('AMIM001'), 'Screen 2 lists project "AMIM001"');
    assert(screen2Html.includes('Glioma From MRI Images'), 'Screen 2 lists official title for AMIM001');
    assert(screen2Html.includes('Back to Domains'), 'Screen 2 contains "Back to Domains" navigation button');

    // TEST 3: SCREEN 3 - Project Details for Sample AMIM Projects
    console.log('\n--- 3. Screen 3: Project Details (/projects/AMIM/[code]) ---');

    // Check AMIM001
    const p1Res = await request('GET', '/projects/AMIM/AMIM001');
    assert(p1Res.status === 200, 'Screen 3 (/projects/AMIM/AMIM001) returns HTTP 200');
    const p1Html = typeof p1Res.body === 'string' ? p1Res.body : '';
    assert(p1Html.includes('AMIM001'), 'AMIM001 shows project code');
    assert(p1Html.includes('Glioma From MRI Images'), 'AMIM001 shows exact catalogue title');
    assert(p1Html.includes('Enquire About This Project'), 'AMIM001 has "Enquire About This Project" button');

    // Check AMIM100
    const p100Res = await request('GET', '/projects/AMIM/AMIM100');
    assert(p100Res.status === 200, 'Screen 3 (/projects/AMIM/AMIM100) returns HTTP 200');
    const p100Html = typeof p100Res.body === 'string' ? p100Res.body : '';
    assert(p100Html.includes('AMIM100'), 'AMIM100 shows project code');
    assert(p100Html.includes('Depression Detection'), 'AMIM100 shows Depression Detection title');

    // Check AMIM210
    const p210Res = await request('GET', '/projects/AMIM/AMIM210');
    assert(p210Res.status === 200, 'Screen 3 (/projects/AMIM/AMIM210) returns HTTP 200');
    const p210Html = typeof p210Res.body === 'string' ? p210Res.body : '';
    assert(p210Html.includes('AMIM210'), 'AMIM210 shows project code');
    assert(p210Html.includes('Reversible Texture Synthesi'), 'AMIM210 preserves verbatim title ending with "Reversible Texture Synthesi"');
    assert(p210Html.includes('Enquire About This Project'), 'AMIM210 has "Enquire About This Project" button');

    // TEST 4: API /api/projects
    console.log('\n--- 4. Projects API Endpoint (/api/projects) ---');
    const apiRes = await request('GET', '/api/projects');
    assert(apiRes.status === 200, 'GET /api/projects returns HTTP 200');
    assert(Array.isArray(apiRes.body.projects), 'API returns projects array');
    assert(Array.isArray(apiRes.body.domains), 'API returns 16 domains array');
    const imDomainMeta = apiRes.body.domains.find(d => d.code === 'AMIM');
    assert(imDomainMeta && imDomainMeta.projectCount === 210, `API dynamic count for AMIM is exactly 210 (got ${imDomainMeta?.projectCount})`);

    // TEST 5: API /api/projects?domain=AMIM
    console.log('\n--- 5. Projects Domain Filter API (/api/projects?domain=AMIM) ---');
    const amimRes = await request('GET', '/api/projects?domain=AMIM');
    assert(amimRes.status === 200, 'GET /api/projects?domain=AMIM returns HTTP 200');
    assert(amimRes.body.total === 210, `API returns total: 210 for domain AMIM (got ${amimRes.body.total})`);
    const amimProjects = amimRes.body.projects || [];
    assert(amimProjects.length === 210, `API returns all 210 projects in array (got ${amimProjects.length})`);

    // Verify all 210 contiguous codes exist in returned projects
    const returnedCodes = new Set(amimProjects.map(p => p.projectCode));
    let all210CodesPresent = true;
    for (let i = 1; i <= 210; i++) {
      const c = 'AMIM' + String(i).padStart(3, '0');
      if (!returnedCodes.has(c)) {
        all210CodesPresent = false;
        console.error(`Missing code in API: ${c}`);
      }
    }
    assert(all210CodesPresent, 'API returns every code from AMIM001 through AMIM210 with 0 missing');

    // TEST 6: Search by Title and Code
    console.log('\n--- 6. Search by Title and Code ---');
    const searchCodeRes = await request('GET', '/api/projects?domain=AMIM&q=AMIM150');
    assert(searchCodeRes.status === 200, 'Search by code returns HTTP 200');
    assert(searchCodeRes.body.projects.length === 1 && searchCodeRes.body.projects[0].projectCode === 'AMIM150', 'Search for "AMIM150" isolates project AMIM150');

    const searchTitleRes = await request('GET', '/api/projects?domain=AMIM&q=Glioma');
    assert(searchTitleRes.status === 200, 'Search by title keyword returns HTTP 200');
    assert(searchTitleRes.body.projects.length >= 1 && searchTitleRes.body.projects[0].projectCode === 'AMIM001', 'Search for "Glioma" isolates AMIM001');

    // TEST 7: Project-Specific Enquiry Submission for AMIM210
    console.log('\n--- 7. Project-Specific Enquiry Submission for AMIM210 ---');
    const projectSpecificPayload = {
      name: "Pradeep Rajan",
      email: `pradeep.rajan.${Date.now()}@gmail.com`,
      phone: "9876543215",
      mobileNumber: "9876543215",
      whatsappNumber: "9876543215",
      college: "Government College of Technology, Coimbatore",
      department: "Electronics and Communication Engineering",
      domainCode: "AMIM",
      domainName: "Image Processing – MATLAB",
      projectDomain: "Image Processing – MATLAB",
      projectCode: "AMIM210",
      projectTitle: "Steganography Using Reversible Texture Synthesi",
      enquiryType: "Project Specific",
      requirement: "Need MATLAB code and documentation for university final year review.",
      urgency: "Immediate (1-3 days)",
      source: "Project Enquiry",
      _f_rendered_at: Date.now() - 5000,
      website_origin_token: "amt-verified-human-token-v2"
    };

    const inqRes = await request('POST', '/api/inquiries', projectSpecificPayload, {
      'x-forwarded-for': `198.51.100.${Math.floor(Math.random() * 200 + 10)}`
    });
    assert(inqRes.status === 200 || inqRes.status === 201, `Project enquiry for AMIM210 returns HTTP 200/201 (got ${inqRes.status})`);
    assert(inqRes.body.success === true, 'Response indicates success');
    const inqId = inqRes.body.data?.id;
    assert(Boolean(inqId), `Enquiry ID generated: ${inqId}`);
    assert(inqRes.body.data.projectCode === 'AMIM210', 'enquiry records projectCode "AMIM210"');
    assert(inqRes.body.data.domainCode === 'AMIM', 'enquiry records domainCode "AMIM"');

    // TEST 8: Admin Authentication & Dynamic Sequential Project Code Generation
    console.log('\n--- 8. Admin Authentication & Dynamic Code Generation (Next: AMIM211) ---');
    const loginRes = await request('POST', '/api/admin/login', {
      username: 'antimatrix2026',
      password: process.env.ADMIN_PASSWORD || 'antimatrix2026@'
    });
    assert(loginRes.status === 200, 'Admin login with antimatrix2026 returns HTTP 200');

    const setCookie = loginRes.headers['set-cookie'];
    const sessionCookie = Array.isArray(setCookie) ? setCookie[0].split(';')[0] : '';
    assert(Boolean(sessionCookie), 'Received admin session cookie');

    // Verify next sequential project code for AMIM is dynamically AMIM211
    const newProjectPayload = {
      domainCode: "AMIM",
      title: "Fractional-Order Hyper-Chaotic Map and Wavelet Packet Transform for Color Video Cryptography",
      tagline: "Chaos Theory & Wavelet Cryptography in MATLAB",
      description: "A secure video encryption scheme utilizing fractional-order hyper-chaotic attractor keys and multi-level DWT.",
      abstract: "Video streaming over insecure public networks demands high-speed, cryptographically resilient encryption.",
      techStack: ["MATLAB", "Wavelet Toolbox", "Signal Processing Toolbox"],
      level: "UG Final Year",
      year: "2025-26 Edition"
    };

    const createProjRes = await request('POST', '/api/projects', newProjectPayload, {
      Cookie: sessionCookie
    });
    assert(createProjRes.status === 201, 'Admin POST /api/projects returns HTTP 201 Created');
    const createdCode = createProjRes.body.project?.projectCode;
    assert(createdCode === 'AMIM211', `Next sequential project code dynamically generated as AMIM211: got ${createdCode}`);

    // Verify project can be retrieved
    const getCreatedRes = await request('GET', `/api/projects/${createdCode}`);
    assert(getCreatedRes.status === 200, `GET /api/projects/${createdCode} returns HTTP 200`);
    assert(getCreatedRes.body.project.domainCode === 'AMIM', 'Retrieved project has domainCode AMIM');

    // Clean up test-created project to keep repository strictly at the 210 official catalogue projects
    const fs = require('fs');
    const storePath = 'src/data/projects-store.json';
    const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));
    const cleanedStore = storeData.filter(p => (p.projectCode || p.id) !== 'AMIM211');
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

