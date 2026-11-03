const http = require('http');

const BASE_URL = 'http://127.0.0.1:5001';

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log('--- AntiMatrix Bot Protection Test Suite ---\n');

  // Test 1: Invalid email format -> 400
  console.log('Test 1: Invalid email format rejection...');
  const res1 = await request('POST', '/api/inquiries', {
    name: 'Test Student',
    phone: '9840123456',
    email: 'invalid-email-address',
    requirement: 'Need ML project assistance',
    _f_rendered_at: Date.now() - 5000
  }, { 'x-forwarded-for': '192.168.1.101' });
  console.log(`Status: ${res1.status} (Expected 400)`);
  console.log('Response:', res1.body);
  if (res1.status !== 400) throw new Error('Test 1 Failed');
  console.log('✓ Passed\n');

  // Test 2: Invalid phone (too short) -> 400
  console.log('Test 2: Invalid phone length rejection...');
  const res2 = await request('POST', '/api/inquiries', {
    name: 'Test Student',
    phone: '12345',
    email: 'student@example.com',
    requirement: 'Need assistance',
    _f_rendered_at: Date.now() - 5000
  }, { 'x-forwarded-for': '192.168.1.102' });
  console.log(`Status: ${res2.status} (Expected 400)`);
  console.log('Response:', res2.body);
  if (res2.status !== 400) throw new Error('Test 2 Failed');
  console.log('✓ Passed\n');

  // Test 3: Genuine student submission -> 200, status "New", verificationStatus "Verified"
  console.log('Test 3: Genuine student submission...');
  const res3 = await request('POST', '/api/inquiries', {
    name: 'Kavitha Natarajan',
    phone: '9876543210',
    email: 'kavitha.n@annauniv.edu',
    college: 'Anna University, CEG Campus',
    degree: 'B.E. Computer Science',
    category: 'AI & Data Science',
    requirement: 'Need guidance for IEEE 2026 paper implementation on ViT medical imaging.',
    _f_rendered_at: Date.now() - 8000
  }, { 'x-forwarded-for': '192.168.1.103' });
  console.log(`Status: ${res3.status} (Expected 200)`);
  console.log('Response:', res3.body);
  if (res3.status !== 200 || res3.body.data.verificationStatus !== 'Verified') throw new Error('Test 3 Failed');
  console.log('✓ Passed\n');

  // Test 4: Bot submission with Honeypot field filled -> 200 (saved as Spam / Flagged)
  console.log('Test 4: Automated bot submission with Honeypot filled...');
  const res4 = await request('POST', '/api/inquiries', {
    name: 'Bot Scraper 9000',
    phone: '9876543219',
    email: 'bot@automated-crawler.com',
    website: 'http://spam-marketing-service.com',
    requirement: 'Automated script post',
    _f_rendered_at: Date.now() - 5000
  }, { 'x-forwarded-for': '192.168.1.104' });
  console.log(`Status: ${res4.status} (Expected 200)`);
  console.log('Response:', res4.body);
  if (res4.status !== 200 || res4.body.data.verificationStatus !== 'Spam') throw new Error('Test 4 Failed');
  console.log('✓ Passed\n');

  // Test 5: Bot submission submitted too fast (< 2.5s) -> 200 (saved as Suspicious)
  console.log('Test 5: Bot submission submitted too fast (< 2.5s)...');
  const res5 = await request('POST', '/api/inquiries', {
    name: 'Fast Submitter',
    phone: '9876543218',
    email: 'fast@student.com',
    requirement: 'Super fast headless automated submission',
    _f_rendered_at: Date.now() - 400 // only 400ms ago
  }, { 'x-forwarded-for': '192.168.1.105' });
  console.log(`Status: ${res5.status} (Expected 200)`);
  console.log('Response:', res5.body);
  if (res5.status !== 200 || res5.body.data.verificationStatus !== 'Suspicious') throw new Error('Test 5 Failed');
  console.log('✓ Passed\n');

  // Test 6: Repeated duplicate submission within 2 minutes -> 429
  console.log('Test 6: Repeated identical duplicate submission...');
  const res6 = await request('POST', '/api/inquiries', {
    name: 'Kavitha Natarajan',
    phone: '9876543210',
    email: 'kavitha.n@annauniv.edu',
    requirement: 'Need guidance for IEEE 2026 paper implementation on ViT medical imaging.',
    _f_rendered_at: Date.now() - 5000
  }, { 'x-forwarded-for': '192.168.1.106' });
  console.log(`Status: ${res6.status} (Expected 429)`);
  console.log('Response:', res6.body);
  if (res6.status !== 429) throw new Error('Test 6 Failed');
  console.log('✓ Passed\n');

  // Test 7: Rate limiting (> 5 submissions per IP)
  console.log('Test 7: IP Rate Limiting (5 requests per 10 minutes)...');
  const testIp = '192.168.1.200';
  for (let i = 1; i <= 5; i++) {
    await request('POST', '/api/inquiries', {
      name: `Student Multi ${i}`,
      phone: `987654320${i}`,
      email: `multi${i}@college.edu`,
      requirement: `Request variation ${i}`,
      _f_rendered_at: Date.now() - 4000
    }, { 'x-forwarded-for': testIp });
  }
  // 6th request from same IP should get 429
  const res7 = await request('POST', '/api/inquiries', {
    name: 'Student Multi 6',
    phone: '9876543206',
    email: 'multi6@college.edu',
    requirement: 'Request variation 6',
    _f_rendered_at: Date.now() - 4000
  }, { 'x-forwarded-for': testIp });
  console.log(`Status: ${res7.status} (Expected 429)`);
  console.log('Response:', res7.body);
  if (res7.status !== 429) throw new Error('Test 7 Failed');
  console.log('✓ Passed\n');

  // Test 8: Admin Authentication and Status Update via PATCH
  console.log('Test 8: Admin Login & Status Update (Mark as Spam & Mark as Verified)...');
  // First login as admin
  const loginRes = await request('POST', '/api/admin/login', {
    username: 'antimatrix2026',
    password: process.env.ADMIN_PASSWORD || 'antimatrix2026@'
  });
  console.log('Login status:', loginRes.status);
  const cookie = loginRes.headers['set-cookie'] ? loginRes.headers['set-cookie'][0] : null;
  if (!cookie) throw new Error('No cookie received on admin login');

  // Mark inquiry as Spam
  const patchSpam = await request('PATCH', '/api/admin/inquiries', {
    id: res3.body.data.id,
    status: 'Spam',
    verificationStatus: 'Spam'
  }, { Cookie: cookie });
  console.log('PATCH Spam status:', patchSpam.status, patchSpam.body);
  if (patchSpam.status !== 200) throw new Error('Failed to patch status to Spam');

  // Mark inquiry back to Verified
  const patchVerified = await request('PATCH', '/api/admin/inquiries', {
    id: res3.body.data.id,
    status: 'Verified',
    verificationStatus: 'Verified'
  }, { Cookie: cookie });
  console.log('PATCH Verified status:', patchVerified.status, patchVerified.body);
  if (patchVerified.status !== 200) throw new Error('Failed to patch status to Verified');

  console.log('✓ All 8 Bot Protection Tests Successfully Passed!\n');
}

runTests().catch(err => {
  console.error('❌ Test suite failed:', err);
  process.exit(1);
});

