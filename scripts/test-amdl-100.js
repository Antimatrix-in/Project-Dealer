const http = require("http");

const BASE_URL = process.env.TEST_URL || "http://localhost:5009";

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const req = http.request(
      url,
      {
        method: options.method || "GET",
        headers: options.headers || {},
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data,
          });
        });
      }
    );
    req.on("error", reject);
    if (options.body) {
      req.write(typeof options.body === "string" ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log(`Starting AMDL 100 Verification Tests against ${BASE_URL}...\n`);
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
    // 1. API Verification: /api/projects?domain=AMDL
    console.log("TEST 1: API - /api/projects?domain=AMDL");
    const apiRes = await request("/api/projects?domain=AMDL");
    assert(apiRes.status === 200, "API returned status 200");
    const apiData = JSON.parse(apiRes.body);
    assert(apiData.success === true, "API response success is true");
    assert(apiData.total === 100, `API total is 100 (got ${apiData.total})`);
    assert(apiData.projects.length === 100, `API returned 100 projects in payload (got ${apiData.projects.length})`);

    // Verify domain project count in API
    const amdlDomain = (apiData.domains || []).find((d) => d.code === "AMDL");
    assert(amdlDomain && amdlDomain.projectCount === 100, `Domain list reports AMDL projectCount === 100 (got ${amdlDomain?.projectCount})`);

    // Verify key titles in API payload
    const projectMap = {};
    for (const p of apiData.projects) {
      projectMap[p.projectCode] = p;
    }

    const keyTitles = {
      AMDL001: "A Bayesian Deep Learning Approach With Convolutional Feature Engineering to Discriminate Cyber-Physical Intrusions in Smart Grid Systems",
      AMDL008: "A Hybrid Deep Learning-Based Intelligent System for Sports Action Recognition via Visual Knowledge Discovery",
      AMDL032: "Automatic Voice Disorder Detection Using Self-Supervised Representations",
      AMDL053: "End-To-End Deep-Learning-Based Tamil Handwritten Document Recognition and Classification Model",
      AMDL064: "Image-Based Partial Discharge Identification in High Voltage Cables Using Hybrid Deep Network",
      AMDL073: "Modeling of Blockchain Assisted Intrusion Detection on IoT Healthcare System Using Ant Lion Optimizer With Hybrid Deep Learning",
      AMDL094: "SIGNFORMER DeepVision Transformer for Sign Language Recognition",
      AMDL100: "Using Deep Learning Model to Identify Iron Chlorosis in Plan"
    };

    for (const [code, title] of Object.entries(keyTitles)) {
      const match = projectMap[code];
      assert(match && match.title === title, `Code ${code} exact title match: "${match?.title}"`);
    }

    // 2. Screen 1: /projects
    console.log("\nTEST 2: Screen 1 - /projects (Catalog & Domain Cards)");
    const catalogRes = await request("/projects");
    assert(catalogRes.status === 200, "/projects returned status 200");
    assert(catalogRes.body.includes("Deep Learning"), "/projects contains Deep Learning domain");
    assert(catalogRes.body.includes("AMDL"), "/projects contains AMDL domain code");
    assert(catalogRes.body.includes("100"), "/projects reflects 100 projects for Deep Learning");
    assert(catalogRes.body.includes("107"), "/projects preserves 107 projects for Python (AMPY)");
    assert(catalogRes.body.includes("210"), "/projects preserves 210 projects for MATLAB (AMIM)");

    // 3. Screen 2: /projects/AMDL
    console.log("\nTEST 3: Screen 2 - /projects/AMDL (Domain Listing & Pagination)");
    const domainRes = await request("/projects/AMDL");
    assert(domainRes.status === 200, "/projects/AMDL returned status 200");
    assert(domainRes.body.includes("Deep Learning"), "Page has heading Deep Learning");
    assert(domainRes.body.includes("Total Projects:") && domainRes.body.includes("100"), "Page displays Total Projects: 100");
    assert(domainRes.body.includes("AMDL001"), "Page displays first project AMDL001");
    assert(domainRes.body.includes("Next") || domainRes.body.includes("Previous"), "Page contains pagination controls");

    // 4. Screen 3: Project Detail Pages
    console.log("\nTEST 4: Screen 3 - Detail Pages");
    const p1Res = await request("/projects/AMDL/AMDL001");
    assert(p1Res.status === 200, "/projects/AMDL/AMDL001 returned 200");
    assert(p1Res.body.includes("A Bayesian Deep Learning Approach"), "AMDL001 title rendered");
    assert(p1Res.body.includes("Enquire") || p1Res.body.includes("enquiry"), "AMDL001 has Enquire CTA");

    const p53Res = await request("/projects/AMDL/AMDL053");
    assert(p53Res.status === 200, "/projects/AMDL/AMDL053 returned 200");
    assert(p53Res.body.includes("Tamil Handwritten"), "AMDL053 title rendered");

    const p100Res = await request("/projects/AMDL/AMDL100");
    assert(p100Res.status === 200, "/projects/AMDL/AMDL100 returned 200");
    assert(p100Res.body.includes("Using Deep Learning Model to Identify Iron Chlorosis in Plan"), "AMDL100 title rendered with exact 'in Plan' ending");

    // 5. Inquiries Test
    console.log("\nTEST 5: Enquiry Submission for AMDL100");
    const testEnquiry = {
      name: "AMDL Deep Learning Tester",
      email: "amdl.tester.2026@example.com",
      mobileNumber: "9876543210",
      whatsappNumber: "9876543210",
      college: "Deep Learning Engineering Institute",
      department: "Computer Science and Engineering",
      projectDomain: "Deep Learning",
      projectCode: "AMDL100",
      projectTitle: "Using Deep Learning Model to Identify Iron Chlorosis in Plan",
      requirement: "Requesting IEEE base paper, architecture design, and PyTorch source code for AMDL100."
    };

    const inqRes = await request("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testEnquiry)
    });
    assert(inqRes.status === 200 || inqRes.status === 201, `Enquiry submission returned status ${inqRes.status}`);
    const inqData = JSON.parse(inqRes.body);
    assert(inqData.success === true, "Enquiry response success === true");

    // 6. Admin Authentication & Next Code Generation
    console.log("\nTEST 6: Admin Authentication & Sequential Code Generation");
    const loginRes = await request("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "antimatrix2026", password: "antimatrix2026@" })
    });
    assert(loginRes.status === 200, "Admin login succeeded with status 200");

    console.log(`\n========================================`);
    console.log(`TEST RUN COMPLETE: ${passed} PASSED, ${failed} FAILED`);
    console.log(`========================================\n`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error("Test execution error:", err);
    process.exit(1);
  }
}

runTests();
