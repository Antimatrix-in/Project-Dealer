const http = require("http");

const BASE_URL = process.env.TEST_URL || "http://localhost:5011";

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
  console.log(`Starting AMPH 269 Verification Tests against ${BASE_URL}...\n`);
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
    // 1. API Verification: /api/projects?domain=AMPH
    console.log("TEST 1: API - /api/projects?domain=AMPH");
    const apiRes = await request("/api/projects?domain=AMPH");
    assert(apiRes.status === 200, "API returned status 200");
    const apiData = JSON.parse(apiRes.body);
    assert(apiData.success === true, "API response success is true");
    assert(apiData.total === 269, `API total is 269 (got ${apiData.total})`);
    assert(apiData.projects.length === 269, `API returned 269 projects in payload (got ${apiData.projects.length})`);

    // Verify domain project count in API
    const amphDomain = (apiData.domains || []).find((d) => d.code === "AMPH");
    assert(amphDomain && amphDomain.projectCount === 269, `Domain list reports AMPH projectCount === 269 (got ${amphDomain?.projectCount})`);

    // Verify key titles in API payload
    const projectMap = {};
    for (const p of apiData.projects) {
      projectMap[p.projectCode] = p;
    }

    const keyTitles = {
      AMPH001: "Web based Graphical Password Authentication System",
      AMPH004: "Agri Shop: Farmers Online Selling Application",
      AMPH022: "Online Complaint Registration and Management system : street light, water pipe leakage, rain water drainage, road",
      AMPH055: "Campus Recruitment System",
      AMPH103: "Empoyee Assign Projects Status System",
      AMPH148: "Index Management System(Truecaller",
      AMPH184: "Online E-Learning with Payment",
      AMPH216: "QR Code Generator",
      AMPH244: "Student Placement Management System",
      AMPH261: "Travel Package Expense Management System",
      AMPH269: "Zoo Management Syste"
    };

    for (const [code, title] of Object.entries(keyTitles)) {
      const match = projectMap[code];
      assert(match && match.title === title, `Code ${code} exact title match: "${match?.title}"`);
    }

    // 2. Server-side API Pagination Verification
    console.log("\nTEST 2: Server-side API Pagination");
    const page1Res = await request("/api/projects?domain=AMPH&page=1&limit=50");
    assert(page1Res.status === 200, "Page 1 API returned status 200");
    const page1Data = JSON.parse(page1Res.body);
    assert(page1Data.projects.length === 50, `Page 1 returned 50 items (got ${page1Data.projects.length})`);
    assert(page1Data.totalPages === 6, `Total pages for 269 with limit 50 is 6 (got ${page1Data.totalPages})`);
    assert(page1Data.projects[0].projectCode === "AMPH001", "Page 1 first project is AMPH001");

    const page6Res = await request("/api/projects?domain=AMPH&page=6&limit=50");
    assert(page6Res.status === 200, "Page 6 API returned status 200");
    const page6Data = JSON.parse(page6Res.body);
    assert(page6Data.projects.length === 19, `Page 6 returned remaining 19 items (got ${page6Data.projects.length})`);
    assert(page6Data.projects[page6Data.projects.length - 1].projectCode === "AMPH269", "Page 6 last project is AMPH269");

    // Check no duplicate codes between page 1 and page 6
    const p1Codes = new Set(page1Data.projects.map(p => p.projectCode));
    const p6Codes = new Set(page6Data.projects.map(p => p.projectCode));
    const intersection = [...p1Codes].filter(x => p6Codes.has(x));
    assert(intersection.length === 0, "Zero project overlap between page 1 and page 6");

    // 3. Screen 1: /projects (Catalog & Domain Cards)
    console.log("\nTEST 3: Screen 1 - /projects (Catalog & Domain Cards)");
    const catalogRes = await request("/projects");
    assert(catalogRes.status === 200, "/projects returned status 200");
    assert(catalogRes.body.includes("Web Application"), "/projects contains Web Application domain");
    assert(catalogRes.body.includes("AMPH"), "/projects contains AMPH domain code");
    assert(catalogRes.body.includes("269"), "/projects reflects 269 projects for Web Application - PHP");
    assert(catalogRes.body.includes("60"), "/projects preserves 60 projects for Artificial Intelligence (AMAI)");
    assert(catalogRes.body.includes("100"), "/projects preserves 100 projects for Deep Learning (AMDL)");
    assert(catalogRes.body.includes("107"), "/projects preserves 107 projects for Python (AMPY)");
    assert(catalogRes.body.includes("210"), "/projects preserves 210 projects for MATLAB (AMIM)");

    // 4. Screen 2: /projects/AMPH (Domain Listing & Client Pagination)
    console.log("\nTEST 4: Screen 2 - /projects/AMPH (Domain Listing & Pagination)");
    const domainRes = await request("/projects/AMPH");
    assert(domainRes.status === 200, "/projects/AMPH returned status 200");
    assert(domainRes.body.includes("Web Application"), "Page has heading Web Application");
    assert(domainRes.body.includes("Total Projects:") && domainRes.body.includes("269"), "Page displays Total Projects: 269");
    assert(domainRes.body.includes("AMPH001"), "Page displays first project AMPH001");
    assert(domainRes.body.includes("Next") || domainRes.body.includes("Previous"), "Page contains pagination controls");

    // 5. Screen 3: Project Detail Pages
    console.log("\nTEST 5: Screen 3 - Detail Pages");
    const p1Res = await request("/projects/AMPH/AMPH001");
    assert(p1Res.status === 200, "/projects/AMPH/AMPH001 returned 200");
    assert(p1Res.body.includes("Web based Graphical Password Authentication System"), "AMPH001 title rendered");
    assert(p1Res.body.includes("Enquire") || p1Res.body.includes("enquiry"), "AMPH001 has Enquire CTA");

    const p103Res = await request("/projects/AMPH/AMPH103");
    assert(p103Res.status === 200, "/projects/AMPH/AMPH103 returned 200");
    assert(p103Res.body.includes("Empoyee Assign Projects Status System"), "AMPH103 title rendered with exact 'Empoyee' spelling");

    const p148Res = await request("/projects/AMPH/AMPH148");
    assert(p148Res.status === 200, "/projects/AMPH/AMPH148 returned 200");
    assert(p148Res.body.includes("Index Management System(Truecaller"), "AMPH148 title rendered with exact 'System(Truecaller' format");

    const p269Res = await request("/projects/AMPH/AMPH269");
    assert(p269Res.status === 200, "/projects/AMPH/AMPH269 returned 200");
    assert(p269Res.body.includes("Zoo Management Syste"), "AMPH269 title rendered with exact 'Zoo Management Syste' ending");

    // 6. Inquiries Test
    console.log("\nTEST 6: Enquiry Submission for AMPH269");
    const testEnquiry = {
      name: "AMPH Web Engineering Tester",
      email: "amph.tester.2026@example.com",
      mobileNumber: "9876543210",
      whatsappNumber: "9876543210",
      college: "Web Architecture Institute of Technology",
      department: "Information Technology",
      projectDomain: "Web Application - PHP",
      projectCode: "AMPH269",
      projectTitle: "Zoo Management Syste",
      requirement: "Requesting IEEE base paper, database relational schema, and PHP 8 source code for AMPH269."
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

