const http = require('http');

const BASE_URL = 'http://127.0.0.1:5001';

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const postData = body ? JSON.stringify(body) : null;
    const reqHeaders = {
      ...headers
    };
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

async function runSuite() {
  console.log('=====================================================');
  console.log(' AntiMatrix - Internal Project Enquiry Test Suite');
  console.log('=====================================================\n');

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
    // 1. Verify /project-enquiry route serves HTML
    console.log('1. Checking /project-enquiry page route...');
    const pageRes = await request('GET', '/project-enquiry');
    assert(pageRes.status === 200, 'Page /project-enquiry returns HTTP 200');
    assert(typeof pageRes.body === 'string' && pageRes.body.includes('Project Enquiry'), 'Page content contains "Project Enquiry"');

    // 2. Test missing required fields
    console.log('\n2. Testing field validation (missing mobile number)...');
    const invalidRes1 = await request('POST', '/api/inquiries', {
      name: 'Rohan Sharma',
      email: 'rohan.sharma@gmail.com',
      whatsappNumber: '9840199999',
      college: 'Anna University',
      department: 'ECE',
      projectDomain: 'Machine Learning',
      _f_rendered_at: Date.now() - 5000
    });
    assert(invalidRes1.status === 400, 'Rejects submission when mobile number is missing (400)');

    // 3. Test Domain = "Other" without customDomain
    console.log('\n3. Testing "Other" domain validation without customDomain...');
    const otherNoDomainRes = await request('POST', '/api/inquiries', {
      name: 'Rohan Sharma',
      mobileNumber: '9840188888',
      whatsappNumber: '9840199999',
      email: 'rohan.sharma@gmail.com',
      college: 'Anna University',
      department: 'ECE',
      projectDomain: 'Other',
      _f_rendered_at: Date.now() - 5000
    });
    assert(otherNoDomainRes.status === 400, 'Rejects "Other" domain when customDomain is omitted (400)');

    // 4. Test Honeypot bot protection (trapped silently as Spam)
    console.log('\n4. Testing honeypot bot trap...');
    const botRes = await request('POST', '/api/inquiries', {
      name: 'Bot Spammer',
      mobileNumber: '9999999999',
      whatsappNumber: '9999999999',
      email: 'bot@spam.com',
      college: 'Fake Univ',
      department: 'Fake Dept',
      projectDomain: 'Python Projects',
      website: 'http://spam-link.ru', // honeypot
      _f_rendered_at: Date.now() - 5000
    });
    assert(botRes.status === 200 && botRes.body.data.verificationStatus === 'Spam', 'Honeypot triggers Spam classification');

    // 5. Submit genuine Project Enquiry
    console.log('\n5. Submitting genuine Project Enquiry with separate WhatsApp and Mobile numbers...');
    const genuineRes = await request('POST', '/api/inquiries', {
      name: 'Siddharth Raman',
      mobileNumber: '+91 98401 11223',
      whatsappNumber: '+91 94441 55667',
      email: 'siddharth.raman@mitindia.edu',
      college: 'Madras Institute of Technology (MIT)',
      department: 'Aeronautical & Computer Science',
      projectDomain: 'AI & Data Science',
      projectTitle: 'Autonomous Drone Flight Path Prediction with RL',
      requirement: 'Need complete Python simulation with 3D visualization and PPT review presentation.',
      urgency: '1-2 Weeks',
      _f_rendered_at: Date.now() - 5000
    }, {
      'x-forwarded-for': '203.0.113.88'
    });

    assert(genuineRes.status === 200 && genuineRes.body.success, 'Genuine Project Enquiry successfully accepted (HTTP 200)');
    const createdData = genuineRes.body.data;
    assert(createdData && createdData.id && createdData.id.startsWith('PE-2026-'), `Generated unique Enquiry ID: ${createdData?.id}`);
    assert(createdData && createdData.source === 'Project Enquiry', 'Source is explicitly categorized as "Project Enquiry"');
    assert(createdData && createdData.status === 'New', 'Initial status is "New"');
    assert(createdData && createdData.whatsappNumber === '+91 94441 55667', 'Preserves distinct WhatsApp Number');
    assert(createdData && createdData.mobileNumber === '+91 98401 11223', 'Preserves distinct Mobile Number');
    assert(createdData && createdData.projectDomain === 'AI & Data Science', 'Preserves Project Domain');

    // 6. Submit enquiry with "Other" domain + customDomain
    console.log('\n6. Submitting enquiry with "Other" domain and custom specification...');
    const otherValidRes = await request('POST', '/api/inquiries', {
      name: 'Priyanka Sundar',
      mobileNumber: '9123456780',
      whatsappNumber: '9123456780',
      email: 'priyanka.sundar@sastra.ac.in',
      college: 'SASTRA Deemed University',
      department: 'Robotics & Automation',
      projectDomain: 'Other',
      customDomain: 'Quantum Machine Learning with Qiskit',
      projectTitle: 'Variational Quantum Eigensolver for Molecular Simulation',
      requirement: 'Quantum circuit diagram and research paper documentation.',
      _f_rendered_at: Date.now() - 5000
    }, {
      'x-forwarded-for': '203.0.113.89'
    });
    assert(otherValidRes.status === 200 && otherValidRes.body.success, 'Custom domain enquiry accepted (HTTP 200)');
    assert(otherValidRes.body.data.projectDomain === 'Quantum Machine Learning with Qiskit', 'Stored custom domain cleanly in projectDomain');

    // 7. Authenticate Admin
    console.log('\n7. Authenticating Admin antimatrix2026 to obtain session...');
    const loginRes = await request('POST', '/api/admin/login', {
      username: 'antimatrix2026',
      password: 'antimatrix2026@'
    });
    assert(loginRes.status === 200 && loginRes.body.success, 'Admin authenticated successfully');
    const cookieHeader = loginRes.headers['set-cookie'];
    const sessionCookie = cookieHeader ? cookieHeader[0].split(';')[0] : '';
    assert(Boolean(sessionCookie), 'Received admin session cookie');

    // 8. Admin Inquiries Retrieval
    console.log('\n8. Verifying Admin Inquiries retrieval & session protection...');
    const adminFetchRes = await request('GET', '/api/admin/inquiries', null, {
      Cookie: sessionCookie
    });
    assert(adminFetchRes.status === 200, 'Admin inquiries API returns HTTP 200 with session');
    const allInquiries = adminFetchRes.body.inquiries;
    assert(Array.isArray(allInquiries), 'Returned inquiries array');

    // Verify historical data was preserved
    const historicalIds = ['inq-2026-001', 'inq-2026-002', 'inq-2026-003', 'inq-2026-004'];
    const preservedCount = historicalIds.filter(hId => allInquiries.some(i => i.id === hId)).length;
    assert(preservedCount === 4, `All 4 historical seed inquiries are fully preserved (${preservedCount}/4)`);

    // Verify newly submitted enquiry is in admin list
    const foundNewEnquiry = allInquiries.find(i => i.id === createdData.id);
    assert(!!foundNewEnquiry, `Newly submitted enquiry ${createdData.id} is present in admin database`);
    assert(foundNewEnquiry?.source === 'Project Enquiry', 'Admin record confirms source is "Project Enquiry"');
    assert(foundNewEnquiry?.mobileNumber === '+91 98401 11223', 'Admin record preserves mobileNumber');
    assert(foundNewEnquiry?.whatsappNumber === '+91 94441 55667', 'Admin record preserves whatsappNumber');

    // 9. Update enquiry status
    console.log('\n9. Testing status update (New -> In Progress -> Completed)...');
    const updateRes1 = await request('PATCH', '/api/admin/inquiries', {
      id: createdData.id,
      status: 'In Progress'
    }, {
      Cookie: sessionCookie
    });
    assert(updateRes1.status === 200 && updateRes1.body.success, 'Successfully updated status to "In Progress"');

    const updateRes2 = await request('PATCH', '/api/admin/inquiries', {
      id: createdData.id,
      status: 'Completed'
    }, {
      Cookie: sessionCookie
    });
    assert(updateRes2.status === 200 && updateRes2.body.success, 'Successfully updated status to "Completed"');

    const verifyUpdateRes = await request('GET', '/api/admin/inquiries', null, {
      Cookie: sessionCookie
    });
    const reloadedEnquiry = verifyUpdateRes.body.inquiries.find(i => i.id === createdData.id);
    assert(reloadedEnquiry?.status === 'Completed', 'Admin reload confirms status is "Completed"');

    console.log('\n=====================================================');
    console.log(` TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('=====================================================');

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Test suite runtime error:', err);
    process.exit(1);
  }
}

runSuite();
