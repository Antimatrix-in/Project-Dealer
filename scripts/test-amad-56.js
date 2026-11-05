const http = require("http");

const BASE_URL = process.env.TEST_URL || "http://localhost:5012";

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
  console.log(`Starting AMAD 56 Verification Tests against ${BASE_URL}...\n`);
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
    // 1. API Verification: /api/projects?domain=AMAD
    console.log("TEST 1: API - /api/projects?domain=AMAD");
    const apiRes = await request("/api/projects?domain=AMAD");
    assert(apiRes.status === 200, "API returned status 200");
    const apiData = JSON.parse(apiRes.body);
    assert(apiData.success === true, "API response success is true");
    assert(apiData.total === 56, `API total is 56 (got ${apiData.total})`);
    assert(apiData.projects.length === 56, `API returned 56 projects in payload (got ${apiData.projects.length})`);

    // Verify domain project count in API
    const amadDomain = (apiData.domains || []).find((d) => d.code === "AMAD");
    assert(amadDomain && amadDomain.projectCount === 56, `Domain list reports AMAD projectCount === 56 (got ${amadDomain?.projectCount})`);

    // Verify key titles in API payload
    const projectMap = {};
    for (const p of apiData.projects) {
      projectMap[p.projectCode] = p;
    }

    const keyTitles = {
      AMAD001: "CodeTracker: A Lightweight Approach to Track and Protect Authorization Codes in SMS Messages",
      AMAD005: "MADAM: Effective and Ef?cient Behavior-based Android Malware Detection and Prevention",
      AMAD009: "Elder Tracking and Fall Detection System using Smart Tiles",
      AMAD011: "Women Attack Rescue System for Women’s Safety App",
      AMAD023: "HaemOrgle - Organ Donation between hospitals",
      AMAD035: "Generic Medical Store - Place to find the cheapest medicine delivery using Global Positioning System",
      AMAD039: "A Mobile Phone Based Medicine Intake Remainder And Monitor",
      AMAD046: "QR based Fake product detection",
      AMAD051: "Android Text Encryption Using Various Algorithms",
      AMAD056: "Android File finder and Sortin"
    };

    for (const [code, title] of Object.entries(keyTitles)) {
      const match = projectMap[code];
      assert(match && match.title === title, `Code ${code} exact title match: "${match?.title}"`);
    }

    // 2. Server-side API Pagination Verification
    console.log("\nTEST 2: Server-side API Pagination");
    const page1Res = await request("/api/projects?domain=AMAD&page=1&limit=20");
    assert(page1Res.status === 200, "Page 1 API returned status 200");
    const page1Data = JSON.parse(page1Res.body);
    assert(page1Data.projects.length === 20, `Page 1 returned 20 items (got ${page1Data.projects.length})`);
    assert(page1Data.totalPages === 3, `Total pages for 56 with limit 20 is 3 (got ${page1Data.totalPages})`);
    assert(page1Data.projects[0].projectCode === "AMAD001", "Page 1 first project is AMAD001");

    const page3Res = await request("/api/projects?domain=AMAD&page=3&limit=20");
    assert(page3Res.status === 200, "Page 3 API returned status 200");
    const page3Data = JSON.parse(page3Res.body);
    assert(page3Data.projects.length === 16, `Page 3 returned remaining 16 items (got ${page3Data.projects.length})`);
    assert(page3Data.projects[page3Data.projects.length - 1].projectCode === "AMAD056", "Page 3 last project is AMAD056");

    const p1Codes = new Set(page1Data.projects.map(p => p.projectCode));
    const p3Codes = new Set(page3Data.projects.map(p => p.projectCode));
    const intersection = [...p1Codes].filter(x => p3Codes.has(x));
    assert(intersection.length === 0, "Zero project overlap between page 1 and page 3");

    // 3. Screen 1: /projects (Catalog & Domain Cards)
    console.log("\nTEST 3: Screen 1 - /projects (Catalog & Domain Cards)");
    const catalogRes = await request("/projects");
    assert(catalogRes.status === 200, "/projects returned status 200");
    assert(catalogRes.body.includes("Android"), "/projects contains Android domain");
    assert(catalogRes.body.includes("AMAD"), "/projects contains AMAD domain code");
    assert(catalogRes.body.includes("56"), "/projects reflects 56 projects for Android – Java");
    assert(catalogRes.body.includes("269"), "/projects preserves 269 projects for Web Application - PHP (AMPH)");
    assert(catalogRes.body.includes("60"), "/projects preserves 60 projects for Artificial Intelligence (AMAI)");
    assert(catalogRes.body.includes("100"), "/projects preserves 100 projects for Deep Learning (AMDL)");
    assert(catalogRes.body.includes("107"), "/projects preserves 107 projects for Python (AMPY)");
    assert(catalogRes.body.includes("210"), "/projects preserves 210 projects for MATLAB (AMIM)");

    // 4. Screen 2: /projects/AMAD (Domain Listing & Client Pagination)
    console.log("\nTEST 4: Screen 2 - /projects/AMAD (Domain Listing & Pagination)");
    const domainRes = await request("/projects/AMAD");
    assert(domainRes.status === 200, "/projects/AMAD returned status 200");
    assert(domainRes.body.includes("Android"), "Page has heading Android");
    assert(domainRes.body.includes("Total Projects:") && domainRes.body.includes("56"), "Page displays Total Projects: 56");
    assert(domainRes.body.includes("AMAD001"), "Page displays first project AMAD001");
    assert(domainRes.body.includes("Next") || domainRes.body.includes("Previous"), "Page contains pagination controls");

    // 5. Screen 3: Project Detail Pages
    console.log("\nTEST 5: Screen 3 - Detail Pages");
    const p1Res = await request("/projects/AMAD/AMAD001");
    assert(p1Res.status === 200, "/projects/AMAD/AMAD001 returned 200");
    assert(p1Res.body.includes("CodeTracker"), "AMAD001 title rendered");
    assert(p1Res.body.includes("Enquire") || p1Res.body.includes("enquiry"), "AMAD001 has Enquire CTA");

    const p5Res = await request("/projects/AMAD/AMAD005");
    assert(p5Res.status === 200, "/projects/AMAD/AMAD005 returned 200");
    assert(p5Res.body.includes("Ef?cient"), "AMAD005 title rendered with exact 'Ef?cient' spelling");

    const p11Res = await request("/projects/AMAD/AMAD011");
    assert(p11Res.status === 200, "/projects/AMAD/AMAD011 returned 200");
    assert(p11Res.body.includes("Women Attack Rescue System"), "AMAD011 title rendered");

    const p56Res = await request("/projects/AMAD/AMAD056");
    assert(p56Res.status === 200, "/projects/AMAD/AMAD056 returned 200");
    assert(p56Res.body.includes("Android File finder and Sortin"), "AMAD056 title rendered with exact 'Sortin' ending");

    // 6. Inquiries Test
    console.log("\nTEST 6: Enquiry Submission for AMAD056");
    const testEnquiry = {
      name: "AMAD Android Tester",
      email: "amad.tester.2026@example.com",
      mobileNumber: "9876543210",
      whatsappNumber: "9876543210",
      college: "Android Mobile Institute of Technology",
      department: "Mobile Computing",
      projectDomain: "Android – Java",
      projectCode: "AMAD056",
      projectTitle: "Android File finder and Sortin",
      requirement: "Requesting IEEE base paper, architecture design, and Android Studio Java code for AMAD056."
    };

    const inqRes = await request("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testEnquiry)
    });
    assert(inqRes.status === 200 || inqRes.status === 201, `Enquiry submission returned status ${inqRes.status}`);
    const inqData = JSON.parse(inqRes.body);
    assert(inqData.success === true, "Enquiry response success === true");

    // 7. Admin Authentication & Sequential Code Generation
    console.log("\nTEST 7: Admin Authentication & Sequential Code Generation");
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

