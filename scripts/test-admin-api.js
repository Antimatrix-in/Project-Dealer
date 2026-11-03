// Comprehensive Test Suite for AntiMatrix Admin Authentication & Session Management
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5001;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || 'GET',
      headers: options.headers || {},
    };
    const req = http.request(url, reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        let parsed = null;
        try {
          parsed = JSON.parse(data);
        } catch (e) {
          parsed = data;
        }
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: parsed,
        });
      });
    });
    req.on('error', reject);
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('======================================================');
  console.log('   ANTIMATRIX ADMIN AUTHENTICATION VERIFICATION SUITE ');
  console.log('======================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} - ${details}`);
      failed++;
    }
  }

  // 1. Access dashboard without login -> redirect to /admin/login
  console.log('Scenario 1: Access dashboard without login...');
  const res1 = await request('/admin/dashboard');
  assert(
    res1.statusCode === 307 && res1.headers.location?.includes('/admin/login'),
    'Unauthenticated access redirects to /admin/login',
    `Status: ${res1.statusCode}, Location: ${res1.headers.location}`
  );

  // 2. Incorrect username -> appropriate error
  console.log('\nScenario 2: Incorrect username...');
  const res2 = await request('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { username: 'invalid_user', password: 'antimatrix2026@' },
  });
  assert(
    res2.statusCode === 401 && res2.body.error?.includes('Invalid administrator credentials'),
    'Incorrect username returns HTTP 401 with credentials error',
    `Status: ${res2.statusCode}, Body: ${JSON.stringify(res2.body)}`
  );

  // 3. Incorrect password for antimatrix2026 -> appropriate error
  console.log('\nScenario 3: Incorrect password...');
  const res3 = await request('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { username: 'antimatrix2026', password: 'wrong_password_123' },
  });
  assert(
    res3.statusCode === 401 && res3.body.error?.includes('Invalid administrator credentials'),
    'Incorrect password returns HTTP 401 with credentials error',
    `Status: ${res3.statusCode}, Body: ${JSON.stringify(res3.body)}`
  );

  // 4. Correct username (antimatrix2026) and password (antimatrix2026@) -> successful login
  console.log('\nScenario 4: Correct username & password (antimatrix2026)...');
  const res4 = await request('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { username: 'antimatrix2026', password: 'antimatrix2026@' },
  });
  const cookieHeader = res4.headers['set-cookie'];
  assert(
    res4.statusCode === 200 && res4.body.success === true && res4.body.redirectUrl === '/admin/dashboard' && Boolean(cookieHeader),
    'Successful login returns HTTP 200, redirectUrl, and session cookie',
    `Status: ${res4.statusCode}, Body: ${JSON.stringify(res4.body)}`
  );

  const sessionCookie = cookieHeader ? cookieHeader[0].split(';')[0] : '';

  // 5. Successful login -> access admin dashboard
  console.log('\nScenario 5: Access admin dashboard with session cookie...');
  const res5 = await request('/admin/dashboard', {
    headers: { Cookie: sessionCookie },
  });
  assert(
    res5.statusCode === 200 && typeof res5.body === 'string' && res5.body.includes('Operations Center'),
    'Dashboard accessible with valid session cookie (HTTP 200)',
    `Status: ${res5.statusCode}`
  );

  // 6. Refresh / Session check -> session remains valid
  console.log('\nScenario 6: Session verification check (refresh)...');
  const res6 = await request('/api/admin/session', {
    headers: { Cookie: sessionCookie },
  });
  assert(
    res6.statusCode === 200 && res6.body.authenticated === true && res6.body.user?.role === 'admin',
    'Session verified as active administrator profile',
    `Status: ${res6.statusCode}, Body: ${JSON.stringify(res6.body)}`
  );

  // 7. Verify consultation inquiries retrieval
  console.log('\nScenario 7: Data preservation - fetch inquiries...');
  const res7 = await request('/api/admin/inquiries', {
    headers: { Cookie: sessionCookie },
  });
  assert(
    res7.statusCode === 200 && Array.isArray(res7.body.inquiries) && res7.body.inquiries.length >= 4,
    'Existing consultation records preserved and accessible',
    `Inquiries count: ${res7.body.inquiries?.length}`
  );

  // 8. Logout -> session is invalidated
  console.log('\nScenario 8: Logout...');
  const res8 = await request('/api/admin/logout', {
    method: 'POST',
    headers: { Cookie: sessionCookie },
  });
  const logoutCookieHeader = res8.headers['set-cookie'];
  assert(
    res8.statusCode === 200 && res8.body.success === true && Boolean(logoutCookieHeader),
    'Logout terminates session and clears cookie',
    `Status: ${res8.statusCode}, Body: ${JSON.stringify(res8.body)}`
  );

  const clearedCookie = logoutCookieHeader ? logoutCookieHeader[0].split(';')[0] : '';

  // 9. Verify session is revoked after logout
  console.log('\nScenario 9: Verify session is revoked after logout...');
  const res9 = await request('/api/admin/session', {
    headers: { Cookie: clearedCookie },
  });
  assert(
    res9.statusCode === 401 && res9.body.authenticated === false,
    'Session endpoint returns 401 unauthenticated after logout',
    `Status: ${res9.statusCode}, Body: ${JSON.stringify(res9.body)}`
  );

  // 10. Access dashboard after logout -> redirected to /admin/login
  console.log('\nScenario 10: Access dashboard after logout...');
  const res10 = await request('/admin/dashboard', {
    headers: { Cookie: clearedCookie },
  });
  assert(
    res10.statusCode === 307 && res10.headers.location?.includes('/admin/login'),
    'Dashboard access after logout redirects to /admin/login',
    `Status: ${res10.statusCode}, Location: ${res10.headers.location}`
  );

  // 11. Test email alias login (antimatrix2026@gmail.com)
  console.log('\nScenario 11: Email alias login (antimatrix2026@gmail.com)...');
  const res11 = await request('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { email: 'antimatrix2026@gmail.com', password: 'antimatrix2026@' },
  });
  assert(
    res11.statusCode === 200 && res11.body.success === true,
    'Email alias login also succeeds',
    `Status: ${res11.statusCode}`
  );

  // 12. Test whitespace normalization in username
  console.log('\nScenario 12: Whitespace tolerance (  ANTIMATRIX2026  )...');
  const res12 = await request('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { username: '  ANTIMATRIX2026  ', password: '  antimatrix2026@  ' },
  });
  assert(
    res12.statusCode === 200 && res12.body.success === true,
    'Uppercase and whitespace in username and password handled gracefully',
    `Status: ${res12.statusCode}`
  );

  console.log('\n======================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
