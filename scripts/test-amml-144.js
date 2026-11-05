const http = require('http');

const PORT = process.env.PORT || 5018;
const BASE_URL = `http://127.0.0.1:${PORT}`;

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
  console.log(`Starting AMML 144 Integration Tests against ${BASE_URL}...`);
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
    // 1. Test /api/projects?domain=AMML
    console.log('\n--- 1. Testing /api/projects?domain=AMML (Full fetch) ---');
    const fullRes = await request('/api/projects?domain=AMML');
    assert(fullRes.statusCode === 200, `Status code is 200 (got ${fullRes.statusCode})`);
    const fullJson = JSON.parse(fullRes.body);
    assert(fullJson.success === true, 'Response success is true');
    assert(fullJson.total === 144, `Total projects reported is 144 (got ${fullJson.total})`);
    assert(Array.isArray(fullJson.projects), 'Projects is an array');
    assert(fullJson.projects.length === 144, `Projects array length is 144 (got ${fullJson.projects.length})`);

    // Verify all 144 codes
    const codes = new Set(fullJson.projects.map((p) => p.projectCode || p.id));
    assert(codes.size === 144, `All 144 projects have unique codes (found ${codes.size})`);
    let missingCode = null;
    for (let i = 1; i <= 144; i++) {
      const c = `AMML${String(i).padStart(3, '0')}`;
      if (!codes.has(c)) {
        missingCode = c;
        break;
      }
    }
    assert(!missingCode, `Contiguous code sequence AMML001-AMML144 intact (first missing: ${missingCode || 'none'})`);

    // Benchmark titles in API
    const projectMap = {};
    for (const p of fullJson.projects) {
      projectMap[p.projectCode || p.id] = p;
    }
    assert(
      projectMap['AMML001']?.title === 'Diagnosis of cardiovascular disorder by CT images using Machine learning technique',
      `AMML001 title matches exactly`
    );
    assert(
      projectMap['AMML002']?.title === 'Explaining Graph Neural Networks With Topology-Aware Node Selection: Application in Air Quality Inference',
      `AMML002 title matches exactly`
    );
    assert(
      projectMap['AMML011']?.title === 'Automatic Liver Tumor Segmentation on Dynamic Contrast Enhanced MRI Using 4D Information: Deep Learning Model Based on 3D Convolution and Convolutional LSTM',
      `AMML011 title matches exactly`
    );
    assert(
      projectMap['AMML033']?.title === 'Implementation of Personality Detection and Accuracy Prediction for identification of fake and true news using Decision Tree and Random Forest Algorithms',
      `AMML033 title matches exactly`
    );
    assert(projectMap['AMML037']?.title === 'machine learning', `AMML037 title is 'machine learning'`);
    assert(
      projectMap['AMML043']?.title === 'Diagnosis of cardiovascular disorder by CT images using Machine Learning',
      `AMML043 title matches exactly`
    );
    assert(
      projectMap['AMML082']?.title === 'A Systematic Literature Review on Multimodal Machine Learning Applications Challenges Gaps and Future Directions',
      `AMML082 title matches exactly`
    );
    assert(
      projectMap['AMML099']?.title === 'Automated Stroke Prediction Using Machine Learning An Explainable and Exploratory Study With a Web Application for Early Intervention',
      `AMML099 title matches exactly`
    );
    assert(
      projectMap['AMML102']?.title === 'BI-RADS-NET-V2 A Composite Multi-Task Neural Network for Computer-Aided Diagnosis of Breast Cancer in Ultrasound Images With Semantic and Quantitative Explanations',
      `AMML102 title matches exactly`
    );
    assert(
      projectMap['AMML118']?.title === 'Game Stats Forecast based on Sports Data using ML algorithms',
      `AMML118 title matches exactly`
    );
    assert(
      projectMap['AMML140']?.title === 'Movie Recommendation system using Collaborative Filtring Algorithm',
      `AMML140 title matches exactly (with Filtring preserved)`
    );
    assert(
      projectMap['AMML144']?.title === 'AFNN-R: An Effective and Accurate Phishing WebsitesDetection using Optimal Feature Selection and Random Forest Class',
      `AMML144 title matches exactly (with Random Forest Class preserved)`
    );

    // 2. Test Pagination (limit=20 across 8 pages)
    console.log('\n--- 2. Testing Pagination (limit=20) ---');
    const paginatedRes = await request('/api/projects?domain=AMML&page=1&limit=20');
    assert(paginatedRes.statusCode === 200, `Paginated status code is 200`);
    const paginatedJson = JSON.parse(paginatedRes.body);
    assert(paginatedJson.page === 1, 'Page 1 reported');
    assert(paginatedJson.total === 144, 'Total 144 reported');
    assert(paginatedJson.totalPages === 8, `Total pages is 8 (got ${paginatedJson.totalPages})`);
    assert(paginatedJson.projects.length === 20, `Page 1 has 20 projects`);

    // Verify all 8 pages
    let allPaginatedCodes = [];
    for (let p = 1; p <= 8; p++) {
      const pageRes = await request(`/api/projects?domain=AMML&page=${p}&limit=20`);
      const pageData = JSON.parse(pageRes.body);
      const expectedCount = p === 8 ? 4 : 20;
      assert(pageData.projects.length === expectedCount, `Page ${p} has ${expectedCount} projects (got ${pageData.projects.length})`);
      allPaginatedCodes.push(...pageData.projects.map((pr) => pr.projectCode || pr.id));
    }
    assert(allPaginatedCodes.length === 144, `All 8 pages aggregated return 144 projects`);
    const uniquePaginatedCodes = new Set(allPaginatedCodes);
    assert(uniquePaginatedCodes.size === 144, `All 144 paginated project codes are unique across pages`);

    // 3. Test Dynamic Domains in API response
    console.log('\n--- 3. Testing Dynamic Domains in API response ---');
    const ammlDomain = fullJson.domains?.find((d) => d.code === 'AMML');
    assert(!!ammlDomain, 'AMML domain found in API response domains');
    assert(ammlDomain?.projectCount === 144, `AMML domain has projectCount 144 (got ${ammlDomain?.projectCount})`);

    // 4. Test Screen 1: /projects
    console.log('\n--- 4. Testing Screen 1: /projects ---');
    const screen1Res = await request('/projects');
    assert(screen1Res.statusCode === 200, 'Screen 1 /projects returns 200');
    assert(screen1Res.body.includes('Machine Learning'), 'Screen 1 includes Machine Learning');
    assert(screen1Res.body.includes('144'), 'Screen 1 includes count 144');

    // 5. Test Screen 2: /projects/AMML
    console.log('\n--- 5. Testing Screen 2: /projects/AMML ---');
    const screen2Res = await request('/projects/AMML');
    assert(screen2Res.statusCode === 200, 'Screen 2 /projects/AMML returns 200');
    assert(screen2Res.body.includes('AMML001') || screen2Res.body.includes('Machine Learning'), 'Screen 2 renders AMML listing');

    // 6. Test Screen 3: Detail Pages
    console.log('\n--- 6. Testing Screen 3: Project Detail Pages ---');
    const detail001 = await request('/projects/AMML/AMML001');
    assert(detail001.statusCode === 200, 'Detail page for AMML001 returns 200');
    assert(detail001.body.includes('cardiovascular') || detail001.body.includes('AMML001'), 'Detail page AMML001 rendered title/code');

    const detail037 = await request('/projects/AMML/AMML037');
    assert(detail037.statusCode === 200, 'Detail page for AMML037 returns 200');
    assert(detail037.body.includes('machine learning') || detail037.body.includes('AMML037'), 'Detail page AMML037 rendered title/code');

    const detail144 = await request('/projects/AMML/AMML144');
    assert(detail144.statusCode === 200, 'Detail page for AMML144 returns 200');
    assert(detail144.body.includes('AFNN-R') || detail144.body.includes('AMML144'), 'Detail page AMML144 rendered title/code');

    // 7. Test Enquiry Submission for AMML
    console.log('\n--- 7. Testing Enquiry Submission for AMML ---');
    const randomIp = `10.5.${Math.floor(Math.random() * 200) + 10}.${Math.floor(Math.random() * 200) + 10}`;
    const testEnquiry = {
      name: 'Verification Bot',
      email: `verify_${Date.now()}@antimatrix-test.edu`,
      phone: '9876543210',
      college: 'AntiMatrix Verification Lab',
      degree: 'B.E Computer Science',
      category: 'Machine Learning – Python',
      projectDomain: 'Machine Learning – Python',
      domainCode: 'AMML',
      domainName: 'Machine Learning – Python',
      projectCode: 'AMML001',
      projectTitle: 'Diagnosis of cardiovascular disorder by CT images using Machine learning technique',
      enquiryType: 'Project Specific',
      requirement: `Automated test run at ${new Date().toISOString()}`,
      urgency: 'Immediate (1-3 days)',
      source: 'Project Enquiry',
    };

    const enquiryRes = await request('/api/inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': randomIp,
      },
      body: JSON.stringify(testEnquiry),
    });
    assert(enquiryRes.statusCode === 200 || enquiryRes.statusCode === 201, `Enquiry submission returns 200/201 (got ${enquiryRes.statusCode})`);

    // 8. Test Admin Login
    console.log('\n--- 8. Testing Admin Login ---');
    const adminLoginRes = await request('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'antimatrix2026',
        password: 'antimatrix2026@',
      }),
    });
    assert(adminLoginRes.statusCode === 200, `Admin login returns 200 (got ${adminLoginRes.statusCode})`);
    const setCookie = adminLoginRes.headers['set-cookie'];
    assert(Array.isArray(setCookie) && setCookie.length > 0, 'Admin auth cookie returned');

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
