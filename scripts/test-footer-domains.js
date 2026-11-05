const http = require('http');

const PORT = process.env.PORT || 5020;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const DOMAINS = [
  { code: 'AMPY', name: 'Python Projects' },
  { code: 'AMJV', name: 'Java Projects' },
  { code: 'AMCY', name: 'Cyber Security' },
  { code: 'AMDJ', name: 'Django – Python' },
  { code: 'AMDS', name: 'Data Science – Python' },
  { code: 'AMIM', name: 'Image Processing – MATLAB' },
  { code: 'AMDL', name: 'Deep Learning' },
  { code: 'AMAI', name: 'Artificial Intelligence' },
  { code: 'AMPH', name: 'Web Application – PHP' },
  { code: 'AMAD', name: 'Android – Java' },
  { code: 'AMBD', name: 'Big Data – Python/Java' },
  { code: 'AMIP', name: 'Image Processing – Python' },
  { code: 'AMCC', name: 'Cloud Computing – Python/Java' },
  { code: 'AMDM', name: 'Data Mining – Python/Java' },
  { code: 'AMBC', name: 'Blockchain – Python/Java/DotNet' },
  { code: 'AMML', name: 'Machine Learning – Python' },
];

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

    req.end();
  });
}

async function runTests() {
  console.log(`Starting Footer 16 Domains Integration Tests against ${BASE_URL}...\n`);
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
    // 1. Inspect Footer on Home Page
    console.log('--- 1. Testing Footer on Home Page (/) ---');
    const homeRes = await request('/');
    assert(homeRes.statusCode === 200, 'Home page returns 200 OK');
    
    // Check heading
    const has16Heading = homeRes.body.includes('16 Project Domains') || homeRes.body.includes('16 PROJECT DOMAINS');
    assert(has16Heading, 'Footer displays "16 Project Domains"');
    
    const hasOld10Heading = homeRes.body.includes('10 Project Domains') || homeRes.body.includes('10 PROJECT DOMAINS');
    assert(!hasOld10Heading, 'Footer does NOT display "10 Project Domains"');

    // Check View All Projects link
    const hasViewAll = homeRes.body.includes('href="/projects"') && homeRes.body.includes('View All Projects');
    assert(hasViewAll, 'Footer contains "View All Projects →" link pointing to /projects');

    // Check all 16 domain links in home page footer
    console.log('\n--- 2. Verifying all 16 domain links in Footer ---');
    for (const d of DOMAINS) {
      const linkHref = `href="/projects/${d.code}"`;
      const linkPresent = homeRes.body.includes(linkHref);
      assert(linkPresent, `Link to /projects/${d.code} (${d.name}) present in footer`);
    }

    // 3. Test Every Domain Page individually
    console.log('\n--- 3. Testing Every Domain Page individually ---');
    for (const d of DOMAINS) {
      const domainPageRes = await request(`/projects/${d.code}`);
      assert(
        domainPageRes.statusCode === 200,
        `/projects/${d.code} returns 200 OK (Domain: ${d.name})`
      );
      assert(
        domainPageRes.body.includes(d.code),
        `/projects/${d.code} renders domain code ${d.code}`
      );
    }

    // 4. Test View All Projects Page (/projects)
    console.log('\n--- 4. Testing Main Projects Catalog Page (/projects) ---');
    const catalogRes = await request('/projects');
    assert(catalogRes.statusCode === 200, '/projects returns 200 OK');
    assert(catalogRes.body.includes('16'), '/projects shows 16 technical domains');

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

