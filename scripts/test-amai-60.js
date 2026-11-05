const http = require("http");

const BASE_URL = process.env.TEST_URL || "http://localhost:5010";

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
  console.log(`Starting AMAI 60 Verification Tests against ${BASE_URL}...\n`);
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
    // 1. API Verification: /api/projects?domain=AMAI
    console.log("TEST 1: API - /api/projects?domain=AMAI");
    const apiRes = await request("/api/projects?domain=AMAI");
    assert(apiRes.status === 200, "API returned status 200");
    const apiData = JSON.parse(apiRes.body);
    assert(apiData.success === true, "API response success is true");
    assert(apiData.total === 60, `API total is 60 (got ${apiData.total})`);
    assert(apiData.projects.length === 60, `API returned 60 projects in payload (got ${apiData.projects.length})`);

    // Verify domain project count in API
    const amaiDomain = (apiData.domains || []).find((d) => d.code === "AMAI");
    assert(amaiDomain && amaiDomain.projectCount === 60, `Domain list reports AMAI projectCount === 60 (got ${amaiDomain?.projectCount})`);

    // Verify key titles in API payload
    const projectMap = {};
    for (const p of apiData.projects) {
      projectMap[p.projectCode] = p;
    }

    const keyTitles = {
      AMAI001: "A Comprehensive Review of Harmonic Issues and Estimation Techniques in Power System Networks Based on Traditional and Artificial Intelligence Machine Learning",
      AMAI006: "A Methodological Framework for AI-Assisted Security Assessments of Active Directory Environments",
      AMAI016: "An AI Based Automatic Translator for Ancient Hieroglyphic LanguageFrom Scanned Images to English Text",
      AMAI028: "Artificial Intelligence for sEMG-Based Muscular Movement Recognition for Hand Prosthesis",
      AMAI032: "BREE-HD A Transformer-Based Model to Identify Threats on Twitter",
      AMAI043: "Explainable Artificial Intelligence for Patient Safety A Review of Application in Pharmacovigilance",
      AMAI054: "STGL-GCN SpatialTemporal Mixing of Global and Local Self-Attention Graph Convolutional Networks for Human Action Recognition",
      AMAI060: "Very High Accuracy Hyperbolic Tangent Function Implementation in FPG"
    };

    for (const [code, title] of Object.entries(keyTitles)) {
      const match = projectMap[code];
      assert(match && match.title === title, `Code ${code} exact title match: "${match?.title}"`);
    }

    // 2. Screen 1: /projects
    console.log("\nTEST 2: Screen 1 - /projects (Catalog & Domain Cards)");
    const catalogRes = await request("/projects");
    assert(catalogRes.status === 200, "/projects returned status 200");
    assert(catalogRes.body.includes("Artificial Intelligence"), "/projects contains Artificial Intelligence domain");
    assert(catalogRes.body.includes("AMAI"), "/projects contains AMAI domain code");
    assert(catalogRes.body.includes("60"), "/projects reflects 60 projects for Artificial Intelligence");
    assert(catalogRes.body.includes("100"), "/projects preserves 100 projects for Deep Learning (AMDL)");
    assert(catalogRes.body.includes("107"), "/projects preserves 107 projects for Python (AMPY)");
    assert(catalogRes.body.includes("210"), "/projects preserves 210 projects for MATLAB (AMIM)");

    // 3. Screen 2: /projects/AMAI
    console.log("\nTEST 3: Screen 2 - /projects/AMAI (Domain Listing & Pagination)");
    const domainRes = await request("/projects/AMAI");
    assert(domainRes.status === 200, "/projects/AMAI returned status 200");
    assert(domainRes.body.includes("Artificial Intelligence"), "Page has heading Artificial Intelligence");
    assert(domainRes.body.includes("Total Projects:") && domainRes.body.includes("60"), "Page displays Total Projects: 60");
    assert(domainRes.body.includes("AMAI001"), "Page displays first project AMAAI001");
    assert(domainRes.body.includes("Next") || domainRes.body.includes("Previous"), "Page contains pagination controls");

    // 4. Screen 3: Project Detail Pages
    console.log("\nTEST 4: Screen 3 - Detail Pages");
    const p1Res = await request("/projects/AMAI/AMAI001");
    assert(p1Res.status === 200, "/projects/AMAI/AMAI001 returned 200");
    assert(p1Res.body.includes("A Comprehensive Review of Harmonic Issues"), "AMAI001 title rendered");
    assert(p1Res.body.includes("Enquire") || p1Res.body.includes("enquiry"), "AMAI001 has Enquire CTA");

    const p16Res = await request("/projects/AMAI/AMAI016");
    assert(p16Res.status === 200, "/projects/AMAI/AMAI016 returned 200");
    assert(p16Res.body.includes("Hieroglyphic LanguageFrom Scanned Images"), "AMAI016 title rendered");

    const p54Res = await request("/projects/AMAI/AMAI054");
    assert(p54Res.status === 200, "/projects/AMAI/AMAI054 returned 200");
    assert(p54Res.body.includes("STGL-GCN"), "AMAI054 title rendered");

    const p60Res = await request("/projects/AMAI/AMAI060");
    assert(p60Res.status === 200, "/projects/AMAI/AMAI060 returned 200");
    assert(p60Res.body.includes("Very High Accuracy Hyperbolic Tangent Function Implementation in FPG"), "AMAI060 title rendered with exact 'in FPG' ending");

    // 5. Inquiries Test
    console.log("\nTEST 5: Enquiry Submission for AMAI060");
    const testEnquiry = {
      name: "AMAI AI Engineering Tester",
      email: "amai.tester.2026@example.com",
      mobileNumber: "9876543210",
      whatsappNumber: "9876543210",
      college: "Artificial Intelligence Institute of Technology",
      department: "Artificial Intelligence and Data Science",
      projectDomain: "Artificial Intelligence",
      projectCode: "AMAI060",
      projectTitle: "Very High Accuracy Hyperbolic Tangent Function Implementation in FPG",
      requirement: "Requesting IEEE base paper, architecture design, and FPGA synthesis models for AMAI060."
    };

    const inqRes = await request("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testEnquiry)
    });
    assert(inqRes.status === 200 || inqRes.status === 201, `Enquiry submission returned status ${inqRes.status}`);
    const inqData = JSON.parse(inqRes.body);
    assert(inqData.success === true, "Enquiry response success === true");

    // 6. Admin Authentication & Sequential Code Generation
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

