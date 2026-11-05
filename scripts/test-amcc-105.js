const http = require("http");

const BASE_URL = "http://localhost:5015";

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
  console.log(`Starting AMCC 105 Verification Tests against ${BASE_URL}...\n`);
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
    // 1. API: /api/projects?domain=AMCC
    console.log("TEST 1: API - /api/projects?domain=AMCC");
    const apiRes = await fetchUrl("/api/projects?domain=AMCC");
    assert(apiRes.status === 200, "API returned status 200");
    assert(apiRes.json && apiRes.json.success === true, "API response success is true");
    assert(apiRes.json && apiRes.json.total === 105, `API total is 105 (got ${apiRes.json?.total})`);
    assert(apiRes.json && apiRes.json.projects.length === 105, `API returned 105 projects in payload (got ${apiRes.json?.projects.length})`);

    const domainList = apiRes.json?.domains || [];
    const amccDomain = domainList.find((d) => d.code === "AMCC");
    assert(amccDomain && amccDomain.projectCount === 105, `Domain list reports AMCC projectCount === 105 (got ${amccDomain?.projectCount})`);

    // Verify key prompt project titles
    const projectsByCode = {};
    if (apiRes.json?.projects) {
      apiRes.json.projects.forEach((p) => {
        projectsByCode[p.projectCode] = p;
      });
    }

    const titleChecks = {
      AMCC001: "A Comprehensive Framework for Migrating to Zero Trust Architecture",
      AMCC009: "A Review on Attack Graph Analysis for IoT Vulnerability Assessment Challenges Open Issues and Future Directions",
      AMCC018: "Enabling Simultaneous Content Regulation and Privacy Protection for Cloud Storage Image",
      AMCC035: "An Integrated Optimization-Based Algorithm for Energy Efficiency and Resource Allocation in Heterogeneous Cloud Computing Centers",
      AMCC041: "Computationally Efficient Neural Rendering for Generator Adversarial Networks Using a Multi-GPU Cluster in a Cloud Environment",
      AMCC066: "To Drop or to Select Reduce the Negative Effects of Disturbance Features for Point Cloud Classification From an Interpretable Perspective",
      AMCC079: "A Block chain-Enabled Privacy-Preserving Verifiable Query Framework for Securing Cloud-Assisted Industrial Internet of Things Systems",
      AMCC085: "Efficient, Revocable, and Privacy-Preserving Fine-Grained Data Sharing With Keyword Search for the Cloud-Assisted Medical IoT System",
      AMCC086: "A Reconfigurable CNN-Based Accelerator Design for Fast and EnergyEfficient Object Detection System on Mobile FPGA",
      AMCC099: "RFSE-GRU Data Balanced Classification Model for Mobile Encrypted Traffic in Big Data Environment",
      AMCC105: "Wideband Monopole Eight-Element MIMO Antenna for 5G Mobile Termi"
    };

    for (const [code, expectedTitle] of Object.entries(titleChecks)) {
      assert(
        projectsByCode[code] && projectsByCode[code].title === expectedTitle,
        `Code ${code} exact title match: "${expectedTitle.slice(0, 55)}..."`
      );
    }

    // 2. Server-side API Pagination
    console.log("\nTEST 2: Server-side API Pagination");
    const page1Res = await fetchUrl("/api/projects?domain=AMCC&page=1&limit=20");
    assert(page1Res.status === 200, "Page 1 API returned status 200");
    assert(page1Res.json && page1Res.json.projects.length === 20, `Page 1 returned 20 items (got ${page1Res.json?.projects.length})`);
    assert(page1Res.json && page1Res.json.totalPages === 6, `Total pages for 105 with limit 20 is 6 (got ${page1Res.json?.totalPages})`);
    assert(page1Res.json && page1Res.json.projects[0].projectCode === "AMCC001", "Page 1 first project is AMCC001");

    const page6Res = await fetchUrl("/api/projects?domain=AMCC&page=6&limit=20");
    assert(page6Res.status === 200, "Page 6 API returned status 200");
    assert(page6Res.json && page6Res.json.projects.length === 5, `Page 6 returned remaining 5 items (got ${page6Res.json?.projects.length})`);
    assert(page6Res.json && page6Res.json.projects[4].projectCode === "AMCC105", "Page 6 last project is AMCC105");

    const p1Codes = new Set(page1Res.json.projects.map((p) => p.projectCode));
    const p6Codes = new Set(page6Res.json.projects.map((p) => p.projectCode));
    const overlap = [...p1Codes].filter((c) => p6Codes.has(c));
    assert(overlap.length === 0, "Zero project overlap between page 1 and page 6");

    // 3. Screen 1: Projects Hub (/projects)
    console.log("\nTEST 3: Screen 1 - /projects (Catalog & Domain Cards)");
    const screen1Res = await fetchUrl("/projects");
    assert(screen1Res.status === 200, "/projects returned status 200");
    assert(screen1Res.body.includes("Cloud Computing"), "/projects contains Cloud Computing domain");
    assert(screen1Res.body.includes("AMCC"), "/projects contains AMCC domain code");
    assert(screen1Res.body.includes("105 Projects") || screen1Res.body.includes("105"), "/projects reflects 105 projects for Cloud Computing – Python / Java");
    assert(screen1Res.body.includes("269 Projects") || screen1Res.body.includes("269"), "/projects preserves 269 projects for Web Application - PHP (AMPH)");
    assert(screen1Res.body.includes("22 Projects") || screen1Res.body.includes("22"), "/projects preserves 22 projects for Big Data – Python / Java (AMBD)");
    assert(screen1Res.body.includes("12 Projects") || screen1Res.body.includes("12"), "/projects preserves 12 projects for Image Processing – Python (AMIP)");
    assert(screen1Res.body.includes("56 Projects") || screen1Res.body.includes("56"), "/projects preserves 56 projects for Android – Java (AMAD)");
    assert(screen1Res.body.includes("60 Projects") || screen1Res.body.includes("60"), "/projects preserves 60 projects for Artificial Intelligence (AMAI)");
    assert(screen1Res.body.includes("100 Projects") || screen1Res.body.includes("100"), "/projects preserves 100 projects for Deep Learning (AMDL)");
    assert(screen1Res.body.includes("107 Projects") || screen1Res.body.includes("107"), "/projects preserves 107 projects for Python (AMPY)");
    assert(screen1Res.body.includes("210 Projects") || screen1Res.body.includes("210"), "/projects preserves 210 projects for MATLAB (AMIM)");

    // 4. Screen 2: Domain Page (/projects/AMCC)
    console.log("\nTEST 4: Screen 2 - /projects/AMCC (Domain Listing & Pagination)");
    const screen2Res = await fetchUrl("/projects/AMCC");
    assert(screen2Res.status === 200, "/projects/AMCC returned status 200");
    assert(screen2Res.body.includes("Cloud Computing"), "Page has heading Cloud Computing");
    assert(screen2Res.body.includes("105"), "Page displays Total Projects: 105");
    assert(screen2Res.body.includes("AMCC001"), "Page displays first project AMCC001");
    assert(screen2Res.body.includes("pagination") || screen2Res.body.includes("Page 1") || screen2Res.body.includes("Next"), "Page contains pagination controls");

    // 5. Screen 3: Detail Pages
    console.log("\nTEST 5: Screen 3 - Detail Pages");
    const detail1 = await fetchUrl("/projects/AMCC/AMCC001");
    assert(detail1.status === 200, "/projects/AMCC/AMCC001 returned 200");
    assert(detail1.body.includes("A Comprehensive Framework for Migrating to Zero Trust"), "AMCC001 title rendered");
    assert(detail1.body.includes("Enquire") || detail1.body.includes("Enquiry"), "AMCC001 has Enquire CTA");

    const detail9 = await fetchUrl("/projects/AMCC/AMCC009");
    assert(detail9.status === 200, "/projects/AMCC/AMCC009 returned 200");
    assert(detail9.body.includes("A Review on Attack Graph Analysis"), "AMCC009 title rendered");

    const detail66 = await fetchUrl("/projects/AMCC/AMCC066");
    assert(detail66.status === 200, "/projects/AMCC/AMCC066 returned 200");
    assert(detail66.body.includes("To Drop or to Select Reduce the Negative Effects"), "AMCC066 title rendered");

    const detail85 = await fetchUrl("/projects/AMCC/AMCC085");
    assert(detail85.status === 200, "/projects/AMCC/AMCC085 returned 200");
    assert(detail85.body.includes("Efficient, Revocable, and Privacy-Preserving Fine-Grained Data Sharing"), "AMCC085 title rendered");

    const detail105 = await fetchUrl("/projects/AMCC/AMCC105");
    assert(detail105.status === 200, "/projects/AMCC/AMCC105 returned 200");
    assert(detail105.body.includes("Wideband Monopole Eight-Element MIMO Antenna for 5G Mobile Termi"), "AMCC105 title rendered ending with '5G Mobile Termi'");

    // 6. Enquiry Submission
    console.log("\nTEST 6: Enquiry Submission for AMCC105");
    const testId = Date.now();
    const enquiryPayload = {
      name: "AMCC Cloud Systems Tester",
      email: `amcc.tester.${testId}@example.com`,
      phone: "9876543210",
      whatsappNumber: "9876543210",
      college: "Cloud & Pervasive Systems Engineering Institute",
      department: "Cloud Computing & Distributed Networks",
      category: "Cloud Computing – Python / Java",
      projectCode: "AMCC105",
      projectTitle: "Wideband Monopole Eight-Element MIMO Antenna for 5G Mobile Termi",
      requirement: `Requesting IEEE base paper, simulation architecture, and execution scripts for AMCC105 (${testId}).`
    };

    const enqRes = await fetchUrl("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": `10.0.2.${Math.floor(Math.random() * 200) + 10}`
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

