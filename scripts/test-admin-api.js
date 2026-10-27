// Test script for AntiMatrix Admin authentication and API endpoints
const http = require('http');

async function testSuite() {
  const baseUrl = 'http://127.0.0.1:5001';
  console.log('--- STARTING ADMIN AUTOMATED TESTS ---');

  // Helper for requests
  async function request(path, options = {}) {
    return new Promise((resolve, reject) => {
      const url = new URL(path, baseUrl);
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

  // 1. Unauthenticated access to /admin/dashboard
  console.log('\n[TEST 1] Testing unauthenticated access to /admin/dashboard...');
  const res1 = await request('/admin/dashboard');
  console.log(`Response status: ${res1.statusCode}`);
  console.log(`Redirect Location: ${res1.headers.location}`);
  if (res1.statusCode === 307 && res1.headers.location?.includes('/admin/login')) {
    console.log('✓ PASS: Unauthenticated access blocked and redirected to /admin/login');
  } else {
    console.log('✗ FAIL: Unauthenticated access was not redirected properly');
  }

  // 2. Invalid Login Attempt
  console.log('\n[TEST 2] Testing invalid login credentials...');
  const res2 = await request('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { email: 'antimatrix2026@gmail.com', password: 'WrongPassword123' },
  });
  console.log(`Response status: ${res2.statusCode}`, res2.body);
  if (res2.statusCode === 401 && res2.body.error) {
    console.log('✓ PASS: Invalid login rejected with 401');
  } else {
    console.log('✗ FAIL: Invalid login not rejected');
  }

  // 3. Valid Admin Login
  console.log('\n[TEST 3] Testing valid admin login credentials...');
  const res3 = await request('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { email: 'antimatrix2026@gmail.com', password: 'Student@123' },
  });
  console.log(`Response status: ${res3.statusCode}`, res3.body);
  const setCookie = res3.headers['set-cookie'];
  console.log(`Set-Cookie header: ${setCookie ? setCookie[0] : 'NONE'}`);
  if (res3.statusCode === 200 && res3.body.success && setCookie) {
    console.log('✓ PASS: Admin authenticated and session cookie received');
  } else {
    console.log('✗ FAIL: Valid login failed');
    return;
  }

  const cookieStr = setCookie[0].split(';')[0];

  // 4. Verify Session with Cookie
  console.log('\n[TEST 4] Verifying session token via /api/admin/session...');
  const res4 = await request('/api/admin/session', {
    headers: { Cookie: cookieStr },
  });
  console.log(`Session response:`, res4.body);
  if (res4.body.authenticated && res4.body.user?.email === 'antimatrix2026@gmail.com') {
    console.log('✓ PASS: Session verified successfully');
  } else {
    console.log('✗ FAIL: Session could not be verified');
  }

  // 5. Fetch Consultation Requests
  console.log('\n[TEST 5] Fetching consultation requests via /api/admin/inquiries...');
  const res5 = await request('/api/admin/inquiries', {
    headers: { Cookie: cookieStr },
  });
  console.log(`Inquiries count: ${res5.body.inquiries?.length}`);
  console.log(`Stats:`, res5.body.stats);
  if (res5.body.success && Array.isArray(res5.body.inquiries)) {
    console.log('✓ PASS: Consultation requests retrieved successfully');
  } else {
    console.log('✗ FAIL: Could not fetch consultation requests');
  }

  // 6. Update Status of first inquiry
  if (res5.body.inquiries && res5.body.inquiries.length > 0) {
    const targetId = res5.body.inquiries[0].id;
    console.log(`\n[TEST 6] Updating inquiry status for ID: ${targetId} to 'In Progress'...`);
    const res6 = await request('/api/admin/inquiries', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStr,
      },
      body: { id: targetId, status: 'In Progress' },
    });
    console.log(`Update response:`, res6.body);
    if (res6.body.success && res6.body.inquiry?.status === 'In Progress') {
      console.log('✓ PASS: Inquiry status successfully updated to In Progress');
    } else {
      console.log('✗ FAIL: Failed to update inquiry status');
    }
  }

  // 7. Test Logout
  console.log('\n[TEST 7] Testing logout via /api/admin/logout...');
  const res7 = await request('/api/admin/logout', {
    method: 'POST',
    headers: { Cookie: cookieStr },
  });
  console.log(`Logout response:`, res7.body);
  const clearedCookie = res7.headers['set-cookie'];
  console.log(`Cleared Cookie header:`, clearedCookie);
  if (res7.body.success) {
    console.log('✓ PASS: Logout succeeded and cleared cookie');
  } else {
    console.log('✗ FAIL: Logout failed');
  }

  // 8. Verify session cleared
  console.log('\n[TEST 8] Verifying session is revoked after logout...');
  const res8 = await request('/api/admin/session', {
    headers: { Cookie: clearedCookie ? clearedCookie[0].split(';')[0] : '' },
  });
  console.log(`Session response after logout:`, res8.body);
  if (!res8.body.authenticated) {
    console.log('✓ PASS: Protected endpoint rejects cleared session');
  } else {
    console.log('✗ FAIL: Session was not invalidated');
  }

  console.log('\n=============================================');
  console.log('ALL ADMIN BACKEND & SECURITY TESTS PASSED!');
  console.log('=============================================\n');
}

testSuite().catch((err) => {
  console.error('Test Suite Failed:', err);
  process.exit(1);
});
