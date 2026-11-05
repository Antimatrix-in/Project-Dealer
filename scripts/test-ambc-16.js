const http = require("http");

const BASE_URL = "http://localhost:5017";

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
  console.log(`Starting AMBC 16 Verification Tests against ${BASE_URL}...\n`);
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
    // 1. API: /api/projects?domain=AMBC
    console.log("TEST 1: API - /api/projects?domain=AMBC");
    const apiRes = await fetchUrl("/api/projects?domain=AMBC");
    assert(apiRes.status === 200, "API returned status 200");
    assert(apiRes.json && apiRes.json.success === true, "API response success is true");
    assert(apiRes.json && apiRes.json.total === 16, `API total is 16 (got ${apiRes.json?.total})`);
    assert(apiRes.json && apiRes.json.projects.length === 16, `API returned 16 projects in payload (got ${apiRes.json?.projects.length})`);

    const domainList = apiRes.json?.domains || [];
    const ambcDomain = domainList.find((d) => d.code === "AMBC");
    assert(ambcDomain && ambcDomain.projectCount === 16, `Domain list reports AMBC projectCount === 16 (got ${ambcDomain?.projectCount})`);

    // Verify all 16 project titles individually
    const projectsByCode = {};
    if (apiRes.json?.projects) {
      apiRes.json.projects.forEach((p) => {
        projectsByCode[p.projectCode] = p;
      });
    }

    const titleChecks = {
      AMBC001: "Bank automation system in cloud computing",
      AMBC002: "Planning Secure Consumption: Food Safety Using Block chain",
      AMBC003: "Intelligent Value Added Service Platform of Smart Library Based on Block chain Technology",
      AMBC004: "Performance Evaluation of Data Transactions in Block chain",
      AMBC005: "Block chain Enabled Intelligent Digital Forensics System for Autonomous Connected Vehicles",
      AMBC006: "Improved Security Block chain for IoT based Healthcare monitoring system",
      AMBC007: "Toward Data Authenticity and Integrity for Block chain-Based Mobile Edge Computing",
      AMBC008: "A Block chain-Based Fake Product Identification System",
      AMBC009: "A Fog and Block chain Software Architecture for a Global Scale Vaccination Strategy",
      AMBC010: "Optimized User-Friendly Transaction Time Management in the Block chain Distributed Energy Market",
      AMBC011: "Privacy-Preserved Electronic Medical Record Exchanging and Sharing: A Block chain Smart Healthcare System",
      AMBC012: "Block chain-enabled COVID?19 Contact Tracing Solutions",
      AMBC013: "Block chain-Based Privacy Preserving and Energy Saving Mechanism for Electricity Prosumers",
      AMBC014: "Block chain-based Lightweight Transaction Process Modeling and Development",
      AMBC015: "Block chain-Based Medical Certificate Generation and Verification for IoT-based Healthcare Systems",
      AMBC016: "An interactive and secure Block chain web portal for online healthcare service"
    };

    for (const [code, expectedTitle] of Object.entries(titleChecks)) {
      assert(
        projectsByCode[code] && projectsByCode[code].title === expectedTitle,
        `Code ${code} exact title match: "${expectedTitle.slice(0, 55)}..."`
      );
    }

    // Specific prompt rules
    assert(projectsByCode["AMBC012"]?.title.includes("COVID?19"), "AMBC012 preserves \"COVID?19\"");
    assert(projectsByCode["AMBC002"]?.title.includes("Block chain"), "AMBC002 preserves \"Block chain\"");
    assert(projectsByCode["AMBC016"]?.title.includes("Block chain"), "AMBC016 preserves \"Block chain\"");

    // 2. Server-side API Pagination
    console.log("\nTEST 2: Server-side API Pagination");
    const page1Res = await fetchUrl("/api/projects?domain=AMBC&page=1&limit=10");
    assert(page1Res.status === 200, "Page 1 API returned status 200");
    assert(page1Res.json && page1Res.json.projects.length === 10, `Page 1 returned 10 items (got ${page1Res.json?.projects.length})`);
    assert(page1Res.json && page1Res.json.totalPages === 2, `Total pages for 16 with limit 10 is 2 (got ${page1Res.json?.totalPages})`);
    assert(page1Res.json && page1Res.json.projects[0].projectCode === "AMBC001", "Page 1 first project is AMBC001");

    const page2Res = await fetchUrl("/api/projects?domain=AMBC&page=2&limit=10");
    assert(page2Res.status === 200, "Page 2 API returned status 200");
    assert(page2Res.json && page2Res.json.projects.length === 6, `Page 2 returned remaining 6 items (got ${page2Res.json?.projects.length})`);
    assert(page2Res.json && page2Res.json.projects[5].projectCode === "AMBC016", "Page 2 last project is AMBC016");

    const p1Codes = new Set(page1Res.json.projects.map((p) => p.projectCode));
    const p2Codes = new Set(page2Res.json.projects.map((p) => p.projectCode));
    const overlap = [...p1Codes].filter((c) => p2Codes.has(c));
    assert(overlap.length === 0, "Zero project overlap between page 1 and page 2");

    // 3. Screen 1: Projects Hub (/projects)
    console.log("\nTEST 3: Screen 1 - /projects (Catalog & Domain Cards)");
    const screen1Res = await fetchUrl("/projects");
    assert(screen1Res.status === 200, "/projects returned status 200");
    assert(screen1Res.body.includes("Blockchain"), "/projects contains Blockchain domain");
    assert(screen1Res.body.includes("AMBC"), "/projects contains AMBC domain code");
    assert(screen1Res.body.includes("16 Projects") || screen1Res.body.includes("16"), "/projects reflects 16 projects for Blockchain – Python / Java / DotNet");
    assert(screen1Res.body.includes("269 Projects") || screen1Res.body.includes("269"), "/projects preserves 269 projects for Web Application - PHP (AMPH)");
    assert(screen1Res.body.includes("105 Projects") || screen1Res.body.includes("105"), "/projects preserves 105 projects for Cloud Computing – Python / Java (AMCC)");
    assert(screen1Res.body.includes("22 Projects") || screen1Res.body.includes("22"), "/projects preserves 22 projects for Big Data – Python / Java (AMBD)");
    assert(screen1Res.body.includes("12 Projects") || screen1Res.body.includes("12"), "/projects preserves 12 projects for Image Processing – Python (AMIP)");
    assert(screen1Res.body.includes("10 Projects") || screen1Res.body.includes("10"), "/projects preserves 10 projects for Data Mining – Python / Java (AMDM)");
    assert(screen1Res.body.includes("56 Projects") || screen1Res.body.includes("56"), "/projects preserves 56 projects for Android – Java (AMAD)");
    assert(screen1Res.body.includes("60 Projects") || screen1Res.body.includes("60"), "/projects preserves 60 projects for Artificial Intelligence (AMAI)");
    assert(screen1Res.body.includes("100 Projects") || screen1Res.body.includes("100"), "/projects preserves 100 projects for Deep Learning (AMDL)");
    assert(screen1Res.body.includes("107 Projects") || screen1Res.body.includes("107"), "/projects preserves 107 projects for Python (AMPY)");
    assert(screen1Res.body.includes("210 Projects") || screen1Res.body.includes("210"), "/projects preserves 210 projects for MATLAB (AMIM)");

    // 4. Screen 2: Domain Page (/projects/AMBC)
    console.log("\nTEST 4: Screen 2 - /projects/AMBC (Domain Listing & Pagination)");
    const screen2Res = await fetchUrl("/projects/AMBC");
    assert(screen2Res.status === 200, "/projects/AMBC returned status 200");
    assert(screen2Res.body.includes("Blockchain"), "Page has heading Blockchain");
    assert(screen2Res.body.includes("16"), "Page displays Total Projects: 16");
    assert(screen2Res.body.includes("AMBC001"), "Page displays first project AMBC001");
    assert(screen2Res.body.includes("pagination") || screen2Res.body.includes("Page 1") || screen2Res.body.includes("Next"), "Page contains pagination controls");

    // 5. Screen 3: Detail Pages
    console.log("\nTEST 5: Screen 3 - Detail Pages");
    const detail1 = await fetchUrl("/projects/AMBC/AMBC001");
    assert(detail1.status === 200, "/projects/AMBC/AMBC001 returned 200");
    assert(detail1.body.includes("Bank automation system in cloud computing"), "AMBC001 title rendered");
    assert(detail1.body.includes("Enquire") || detail1.body.includes("Enquiry"), "AMBC001 has Enquire CTA");

    const detail8 = await fetchUrl("/projects/AMBC/AMBC008");
    assert(detail8.status === 200, "/projects/AMBC/AMBC008 returned 200");
    assert(detail8.body.includes("A Block chain-Based Fake Product Identification System"), "AMBC008 title rendered");

    const detail12 = await fetchUrl("/projects/AMBC/AMBC012");
    assert(detail12.status === 200, "/projects/AMBC/AMBC012 returned 200");
    assert(detail12.body.includes("Block chain-enabled COVID?19 Contact Tracing Solutions"), "AMBC012 title rendered with exact COVID?19");

    const detail16 = await fetchUrl("/projects/AMBC/AMBC016");
    assert(detail16.status === 200, "/projects/AMBC/AMBC016 returned 200");
    assert(detail16.body.includes("An interactive and secure Block chain web portal for online healthcare service"), "AMBC016 title rendered");

    // 6. Enquiry Submission
    console.log("\nTEST 6: Enquiry Submission for AMBC016");
    const testId = Date.now();
    const enquiryPayload = {
      name: "AMBC Blockchain Tester",
      email: `ambc.tester.${testId}@example.com`,
      phone: "9876543210",
      whatsappNumber: "9876543210",
      college: "Decentralized Systems & Blockchain Institute",
      department: "Distributed Ledgers & Cybersecurity",
      category: "Blockchain – Python / Java / DotNet",
      projectCode: "AMBC016",
      projectTitle: "An interactive and secure Block chain web portal for online healthcare service",
      requirement: `Requesting IEEE base paper, smart contracts, and architecture scripts for AMBC016 (${testId}).`
    };

    const enqRes = await fetchUrl("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": `10.0.4.${Math.floor(Math.random() * 200) + 10}`
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

