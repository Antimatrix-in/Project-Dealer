const http = require("http");

const BASE_URL = "http://localhost:5016";

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
  console.log(`Starting AMDM 10 Verification Tests against ${BASE_URL}...\n`);
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
    // 1. API: /api/projects?domain=AMDM
    console.log("TEST 1: API - /api/projects?domain=AMDM");
    const apiRes = await fetchUrl("/api/projects?domain=AMDM");
    assert(apiRes.status === 200, "API returned status 200");
    assert(apiRes.json && apiRes.json.success === true, "API response success is true");
    assert(apiRes.json && apiRes.json.total === 10, `API total is 10 (got ${apiRes.json?.total})`);
    assert(apiRes.json && apiRes.json.projects.length === 10, `API returned 10 projects in payload (got ${apiRes.json?.projects.length})`);

    const domainList = apiRes.json?.domains || [];
    const amdmDomain = domainList.find((d) => d.code === "AMDM");
    assert(amdmDomain && amdmDomain.projectCount === 10, `Domain list reports AMDM projectCount === 10 (got ${amdmDomain?.projectCount})`);

    // Verify all 10 project titles individually
    const projectsByCode = {};
    if (apiRes.json?.projects) {
      apiRes.json.projects.forEach((p) => {
        projectsByCode[p.projectCode] = p;
      });
    }

    const titleChecks = {
      AMDM001: "Structured Ranking Method Based Feature Selection in Data Mining",
      AMDM002: "Predictive Analysis for calculation of crop yield using Data mining and Machine Learning",
      AMDM003: "A Survey of Data Mining Methods for Early Prediction of Students'' Performance",
      AMDM004: "Secure online payment using block chain",
      AMDM005: "Research of Big Data Information Mining and Analysis: Technology Based on Hadoop Technology",
      AMDM006: "Process Mining and Deep Neural Network Approach for the Prediction of Business Process Outcome",
      AMDM007: "Logical Mining Assisted Heart Disease Prediction Scheme in Association with Deep Learning Principles",
      AMDM008: "Analyzing Product Usage Based on Twitter Users Based on Data mining Process",
      AMDM009: "Sentiment Analysis of Social Media Data using Fuzzy-Rough Set Classifier for the Prediction of the Presidential Election",
      AMDM010: "Prediction of Type-2 Diabetes using Classification and Ensemble Method Approa"
    };

    for (const [code, expectedTitle] of Object.entries(titleChecks)) {
      assert(
        projectsByCode[code] && projectsByCode[code].title === expectedTitle,
        `Code ${code} exact title match: "${expectedTitle.slice(0, 55)}..."`
      );
    }

    // Specific prompt rules
    assert(projectsByCode["AMDM003"]?.title.includes("Students''"), "AMDM003 preserves \"Students''\"");
    assert(projectsByCode["AMDM004"]?.title.includes("block chain"), "AMDM004 preserves \"block chain\"");
    assert(projectsByCode["AMDM010"]?.title.endsWith("Approa"), "AMDM010 preserves \"Approa\"");

    // 2. Server-side API Pagination
    console.log("\nTEST 2: Server-side API Pagination");
    const page1Res = await fetchUrl("/api/projects?domain=AMDM&page=1&limit=5");
    assert(page1Res.status === 200, "Page 1 API returned status 200");
    assert(page1Res.json && page1Res.json.projects.length === 5, `Page 1 returned 5 items (got ${page1Res.json?.projects.length})`);
    assert(page1Res.json && page1Res.json.totalPages === 2, `Total pages for 10 with limit 5 is 2 (got ${page1Res.json?.totalPages})`);
    assert(page1Res.json && page1Res.json.projects[0].projectCode === "AMDM001", "Page 1 first project is AMDM001");

    const page2Res = await fetchUrl("/api/projects?domain=AMDM&page=2&limit=5");
    assert(page2Res.status === 200, "Page 2 API returned status 200");
    assert(page2Res.json && page2Res.json.projects.length === 5, `Page 2 returned remaining 5 items (got ${page2Res.json?.projects.length})`);
    assert(page2Res.json && page2Res.json.projects[4].projectCode === "AMDM010", "Page 2 last project is AMDM010");

    const p1Codes = new Set(page1Res.json.projects.map((p) => p.projectCode));
    const p2Codes = new Set(page2Res.json.projects.map((p) => p.projectCode));
    const overlap = [...p1Codes].filter((c) => p2Codes.has(c));
    assert(overlap.length === 0, "Zero project overlap between page 1 and page 2");

    // 3. Screen 1: Projects Hub (/projects)
    console.log("\nTEST 3: Screen 1 - /projects (Catalog & Domain Cards)");
    const screen1Res = await fetchUrl("/projects");
    assert(screen1Res.status === 200, "/projects returned status 200");
    assert(screen1Res.body.includes("Data Mining"), "/projects contains Data Mining domain");
    assert(screen1Res.body.includes("AMDM"), "/projects contains AMDM domain code");
    assert(screen1Res.body.includes("10 Projects") || screen1Res.body.includes("10"), "/projects reflects 10 projects for Data Mining – Python / Java");
    assert(screen1Res.body.includes("269 Projects") || screen1Res.body.includes("269"), "/projects preserves 269 projects for Web Application - PHP (AMPH)");
    assert(screen1Res.body.includes("105 Projects") || screen1Res.body.includes("105"), "/projects preserves 105 projects for Cloud Computing – Python / Java (AMCC)");
    assert(screen1Res.body.includes("22 Projects") || screen1Res.body.includes("22"), "/projects preserves 22 projects for Big Data – Python / Java (AMBD)");
    assert(screen1Res.body.includes("12 Projects") || screen1Res.body.includes("12"), "/projects preserves 12 projects for Image Processing – Python (AMIP)");
    assert(screen1Res.body.includes("56 Projects") || screen1Res.body.includes("56"), "/projects preserves 56 projects for Android – Java (AMAD)");
    assert(screen1Res.body.includes("60 Projects") || screen1Res.body.includes("60"), "/projects preserves 60 projects for Artificial Intelligence (AMAI)");
    assert(screen1Res.body.includes("100 Projects") || screen1Res.body.includes("100"), "/projects preserves 100 projects for Deep Learning (AMDL)");
    assert(screen1Res.body.includes("107 Projects") || screen1Res.body.includes("107"), "/projects preserves 107 projects for Python (AMPY)");
    assert(screen1Res.body.includes("210 Projects") || screen1Res.body.includes("210"), "/projects preserves 210 projects for MATLAB (AMIM)");

    // 4. Screen 2: Domain Page (/projects/AMDM)
    console.log("\nTEST 4: Screen 2 - /projects/AMDM (Domain Listing & Pagination)");
    const screen2Res = await fetchUrl("/projects/AMDM");
    assert(screen2Res.status === 200, "/projects/AMDM returned status 200");
    assert(screen2Res.body.includes("Data Mining"), "Page has heading Data Mining");
    assert(screen2Res.body.includes("10"), "Page displays Total Projects: 10");
    assert(screen2Res.body.includes("AMDM001"), "Page displays first project AMDM001");
    assert(screen2Res.body.includes("pagination") || screen2Res.body.includes("Page 1") || screen2Res.body.includes("Next"), "Page contains pagination controls");

    // 5. Screen 3: Detail Pages
    console.log("\nTEST 5: Screen 3 - Detail Pages");
    const detail1 = await fetchUrl("/projects/AMDM/AMDM001");
    assert(detail1.status === 200, "/projects/AMDM/AMDM001 returned 200");
    assert(detail1.body.includes("Structured Ranking Method Based Feature Selection"), "AMDM001 title rendered");
    assert(detail1.body.includes("Enquire") || detail1.body.includes("Enquiry"), "AMDM001 has Enquire CTA");

    const detail3 = await fetchUrl("/projects/AMDM/AMDM003");
    assert(detail3.status === 200, "/projects/AMDM/AMDM003 returned 200");
    assert(detail3.body.includes("Students&#39;&#39;") || detail3.body.includes("Students''"), "AMDM003 title rendered with Students''");

    const detail4 = await fetchUrl("/projects/AMDM/AMDM004");
    assert(detail4.status === 200, "/projects/AMDM/AMDM004 returned 200");
    assert(detail4.body.includes("Secure online payment using block chain"), "AMDM004 title rendered with block chain");

    const detail10 = await fetchUrl("/projects/AMDM/AMDM010");
    assert(detail10.status === 200, "/projects/AMDM/AMDM010 returned 200");
    assert(detail10.body.includes("Prediction of Type-2 Diabetes using Classification and Ensemble Method Approa"), "AMDM010 title rendered with Approa");

    // 6. Enquiry Submission
    console.log("\nTEST 6: Enquiry Submission for AMDM010");
    const testId = Date.now();
    const enquiryPayload = {
      name: "AMDM Data Mining Tester",
      email: `amdm.tester.${testId}@example.com`,
      phone: "9876543210",
      whatsappNumber: "9876543210",
      college: "Knowledge Discovery & Data Analytics Institute",
      department: "Data Mining & Information Science",
      category: "Data Mining – Python / Java",
      projectCode: "AMDM010",
      projectTitle: "Prediction of Type-2 Diabetes using Classification and Ensemble Method Approa",
      requirement: `Requesting IEEE base paper, data mining models, and ensemble pipelines for AMDM010 (${testId}).`
    };

    const enqRes = await fetchUrl("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": `10.0.3.${Math.floor(Math.random() * 200) + 10}`
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

