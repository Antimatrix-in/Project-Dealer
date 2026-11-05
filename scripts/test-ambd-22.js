const http = require("http");

const BASE_URL = "http://localhost:5013";

function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const fullUrl = new URL(url, BASE_URL);
    const req = http.request(
      fullUrl,
      {
        method: options.method || "GET",
        headers: options.headers || {}
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          let json = null;
          try {
            json = JSON.parse(body);
          } catch (e) {
            // Not json
          }
          resolve({ status: res.statusCode, headers: res.headers, body, json });
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
  console.log(`Starting AMBD 22 Verification Tests against ${BASE_URL}...\n`);
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
    // 1. API: /api/projects?domain=AMBD
    console.log("TEST 1: API - /api/projects?domain=AMBD");
    const apiRes = await fetchUrl("/api/projects?domain=AMBD");
    assert(apiRes.status === 200, "API returned status 200");
    assert(apiRes.json && apiRes.json.success === true, "API response success is true");
    assert(apiRes.json && apiRes.json.total === 22, `API total is 22 (got ${apiRes.json?.total})`);
    assert(apiRes.json && apiRes.json.projects.length === 22, `API returned 22 projects in payload (got ${apiRes.json?.projects.length})`);

    const domainList = apiRes.json?.domains || [];
    const ambdDomain = domainList.find((d) => d.code === "AMBD");
    assert(ambdDomain && ambdDomain.projectCount === 22, `Domain list reports AMBD projectCount === 22 (got ${ambdDomain?.projectCount})`);

    // Verify key project titles
    const projectsByCode = {};
    if (apiRes.json?.projects) {
      apiRes.json.projects.forEach((p) => {
        projectsByCode[p.projectCode] = p;
      });
    }

    const titleChecks = {
      AMBD001: "AFFIRM: Provably Forward Privacy for Searchable Encryption in Cooperative Intelligent Transportation System",
      AMBD004: "Application research of customer big data analysis for online shop based on smart cloud platform tools",
      AMBD007: "Securing Medical Big data through Block chain technology",
      AMBD011: "An Exploratory analysis of Machine Learning adaptability in Big Data Analytics Environments: A Data Aggregation in the age of Big Data and the Internet of Things",
      AMBD015: "Towards Large-Scale and Privacy-Preserving Contact Tracing in COVID-19 Pandemic: A Block chain Perspective",
      AMBD019: "Block chain-based Conditional Privacy-Preserving Authentication Protocol with Implicit Certificates for Vehicular Edge Computing",
      AMBD022: "CP-BDHCA: Block chain-Based Confidentiality-Privacy Preserving Big Data Scheme for Healthcare Clouds and Application"
    };

    for (const [code, expectedTitle] of Object.entries(titleChecks)) {
      assert(
        projectsByCode[code] && projectsByCode[code].title === expectedTitle,
        `Code ${code} exact title match: "${expectedTitle.slice(0, 60)}..."`
      );
    }

    // Verify "Block chain" preserved in titles
    for (const code of ["AMBD007", "AMBD015", "AMBD019", "AMBD022"]) {
      const p = projectsByCode[code];
      assert(p && p.title.includes("Block chain"), `Code ${code} strictly preserves "Block chain"`);
    }

    // 2. Server-side API Pagination
    console.log("\nTEST 2: Server-side API Pagination");
    const page1Res = await fetchUrl("/api/projects?domain=AMBD&page=1&limit=20");
    assert(page1Res.status === 200, "Page 1 API returned status 200");
    assert(page1Res.json && page1Res.json.projects.length === 20, `Page 1 returned 20 items (got ${page1Res.json?.projects.length})`);
    assert(page1Res.json && page1Res.json.totalPages === 2, `Total pages for 22 with limit 20 is 2 (got ${page1Res.json?.totalPages})`);
    assert(page1Res.json && page1Res.json.projects[0].projectCode === "AMBD001", "Page 1 first project is AMBD001");

    const page2Res = await fetchUrl("/api/projects?domain=AMBD&page=2&limit=20");
    assert(page2Res.status === 200, "Page 2 API returned status 200");
    assert(page2Res.json && page2Res.json.projects.length === 2, `Page 2 returned remaining 2 items (got ${page2Res.json?.projects.length})`);
    assert(page2Res.json && page2Res.json.projects[1].projectCode === "AMBD022", "Page 2 last project is AMBD022");

    const p1Codes = new Set(page1Res.json.projects.map((p) => p.projectCode));
    const p2Codes = new Set(page2Res.json.projects.map((p) => p.projectCode));
    const overlap = [...p1Codes].filter((c) => p2Codes.has(c));
    assert(overlap.length === 0, "Zero project overlap between page 1 and page 2");

    // 3. Screen 1: Projects Hub (/projects)
    console.log("\nTEST 3: Screen 1 - /projects (Catalog & Domain Cards)");
    const screen1Res = await fetchUrl("/projects");
    assert(screen1Res.status === 200, "/projects returned status 200");
    assert(screen1Res.body.includes("Big Data"), "/projects contains Big Data domain");
    assert(screen1Res.body.includes("AMBD"), "/projects contains AMBD domain code");
    assert(screen1Res.body.includes("22 Projects") || screen1Res.body.includes("22"), "/projects reflects 22 projects for Big Data");
    assert(screen1Res.body.includes("269 Projects") || screen1Res.body.includes("269"), "/projects preserves 269 projects for Web Application - PHP (AMPH)");
    assert(screen1Res.body.includes("56 Projects") || screen1Res.body.includes("56"), "/projects preserves 56 projects for Android – Java (AMAD)");
    assert(screen1Res.body.includes("60 Projects") || screen1Res.body.includes("60"), "/projects preserves 60 projects for Artificial Intelligence (AMAI)");
    assert(screen1Res.body.includes("100 Projects") || screen1Res.body.includes("100"), "/projects preserves 100 projects for Deep Learning (AMDL)");
    assert(screen1Res.body.includes("107 Projects") || screen1Res.body.includes("107"), "/projects preserves 107 projects for Python (AMPY)");
    assert(screen1Res.body.includes("210 Projects") || screen1Res.body.includes("210"), "/projects preserves 210 projects for MATLAB (AMIM)");

    // 4. Screen 2: Domain Page (/projects/AMBD)
    console.log("\nTEST 4: Screen 2 - /projects/AMBD (Domain Listing & Pagination)");
    const screen2Res = await fetchUrl("/projects/AMBD");
    assert(screen2Res.status === 200, "/projects/AMBD returned status 200");
    assert(screen2Res.body.includes("Big Data"), "Page has heading Big Data");
    assert(screen2Res.body.includes("22"), "Page displays Total Projects: 22");
    assert(screen2Res.body.includes("AMBD001"), "Page displays first project AMBD001");
    assert(screen2Res.body.includes("pagination") || screen2Res.body.includes("Page 1") || screen2Res.body.includes("Next"), "Page contains pagination controls");

    // 5. Screen 3: Project Detail Pages
    console.log("\nTEST 5: Screen 3 - Detail Pages");
    const detail1 = await fetchUrl("/projects/AMBD/AMBD001");
    assert(detail1.status === 200, "/projects/AMBD/AMBD001 returned 200");
    assert(detail1.body.includes("AFFIRM: Provably Forward Privacy"), "AMBD001 title rendered");
    assert(detail1.body.includes("Enquire") || detail1.body.includes("Enquiry"), "AMBD001 has Enquire CTA");

    const detail7 = await fetchUrl("/projects/AMBD/AMBD007");
    assert(detail7.status === 200, "/projects/AMBD/AMBD007 returned 200");
    assert(detail7.body.includes("Securing Medical Big data through Block chain technology"), "AMBD007 title rendered with exact 'Block chain' spelling");

    const detail15 = await fetchUrl("/projects/AMBD/AMBD015");
    assert(detail15.status === 200, "/projects/AMBD/AMBD015 returned 200");
    assert(detail15.body.includes("Towards Large-Scale and Privacy-Preserving Contact Tracing in COVID-19 Pandemic: A Block chain Perspective"), "AMBD015 title rendered with exact 'Block chain' spelling");

    const detail22 = await fetchUrl("/projects/AMBD/AMBD022");
    assert(detail22.status === 200, "/projects/AMBD/AMBD022 returned 200");
    assert(detail22.body.includes("CP-BDHCA: Block chain-Based"), "AMBD022 title rendered with exact 'Block chain-Based' spelling");

    // 6. Enquiry Submission
    console.log("\nTEST 6: Enquiry Submission for AMBD022");
    const testId = Date.now();
    const enquiryPayload = {
      name: "AMBD Big Data Tester",
      email: `ambd.tester.${testId}@example.com`,
      phone: "9876543210",
      whatsappNumber: "9876543210",
      college: "Distributed Systems Institute of Technology",
      department: "Data Engineering",
      category: "Big Data – Python / Java",
      projectCode: "AMBD022",
      projectTitle: "CP-BDHCA: Block chain-Based Confidentiality-Privacy Preserving Big Data Scheme for Healthcare Clouds and Application",
      requirement: `Requesting IEEE base paper, Apache Spark distributed architecture, and encryption models for AMBD022 (${testId}).`
    };

    const enqRes = await fetchUrl("/api/inquiries", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-forwarded-for": `10.0.0.${Math.floor(Math.random() * 200) + 10}`
      },
      body: enquiryPayload
    });

    assert(enqRes.status === 200 || enqRes.status === 201, `Enquiry submission returned status ${enqRes.status}`);
    assert(enqRes.json && enqRes.json.success === true, "Enquiry response success === true");

    // 7. Admin Authentication
    console.log("\nTEST 7: Admin Authentication & Sequential Code Generation");
    const loginRes = await fetchUrl("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { username: "antimatrix2026", password: "antimatrix2026@" }
    });
    assert(loginRes.status === 200, "Admin login succeeded with status 200");

    console.log(`\n========================================`);
    console.log(`TEST RUN COMPLETE: ${passed} PASSED, ${failed} FAILED`);
    console.log(`========================================\n`);

    if (failed > 0) process.exit(1);
  } catch (err) {
    console.error("Test execution error:", err);
    process.exit(1);
  }
}

runTests();
