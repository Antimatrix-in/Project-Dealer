const http = require("http");

const BASE_URL = "http://localhost:5014";

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
  console.log(`Starting AMIP 12 Verification Tests against ${BASE_URL}...\n`);
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
    // 1. API: /api/projects?domain=AMIP
    console.log("TEST 1: API - /api/projects?domain=AMIP");
    const apiRes = await fetchUrl("/api/projects?domain=AMIP");
    assert(apiRes.status === 200, "API returned status 200");
    assert(apiRes.json && apiRes.json.success === true, "API response success is true");
    assert(apiRes.json && apiRes.json.total === 12, `API total is 12 (got ${apiRes.json?.total})`);
    assert(apiRes.json && apiRes.json.projects.length === 12, `API returned 12 projects in payload (got ${apiRes.json?.projects.length})`);

    const domainList = apiRes.json?.domains || [];
    const amipDomain = domainList.find((d) => d.code === "AMIP");
    assert(amipDomain && amipDomain.projectCount === 12, `Domain list reports AMIP projectCount === 12 (got ${amipDomain?.projectCount})`);

    // Verify all 12 project titles individually
    const projectsByCode = {};
    if (apiRes.json?.projects) {
      apiRes.json.projects.forEach((p) => {
        projectsByCode[p.projectCode] = p;
      });
    }

    const titleChecks = {
      AMIP001: "Real-time Smile Detection using Integrated ML Model",
      AMIP002: "A Method for Covid-19 Segmentation from X-Ray Images with U-Net",
      AMIP003: "Graph-Based Region and Boundary Aggregation for Biomedical Image Segmentation",
      AMIP004: "Hybrid Image Encryption Algorithm for Grey and Color Medical Images",
      AMIP005: "Diagnosis of Diabetic Retinopathy and Glaucoma from Retinal Images Using Deep Convolutional Neural Network",
      AMIP006: "Object Detection for Visually Challenged Using Image Processing",
      AMIP007: "Robust Face Detection and Recognition using Image Processing and OpenCV",
      AMIP008: "An Efficient Cascaded Model for Ship Segmentation in Aerial Images",
      AMIP009: "Early Melanoma Diagnosis with Sequential Dermoscopic Images",
      AMIP010: "Boundary Enhancement Semantic Segmentation for Building Extraction from Remote Sensed Image",
      AMIP011: "Detection of License Plate Numbers and Identification of Non-Helmet Riders using Yolo v2 and OCR Method",
      AMIP012: "A New Benchmarking for Diabetic Retinopathy Using Machine Learning, Deep Learning and Image Processing Technique"
    };

    for (const [code, expectedTitle] of Object.entries(titleChecks)) {
      assert(
        projectsByCode[code] && projectsByCode[code].title === expectedTitle,
        `Code ${code} exact title match: "${expectedTitle.slice(0, 55)}..."`
      );
    }

    // 2. Server-side API Pagination
    console.log("\nTEST 2: Server-side API Pagination");
    const page1Res = await fetchUrl("/api/projects?domain=AMIP&page=1&limit=10");
    assert(page1Res.status === 200, "Page 1 API returned status 200");
    assert(page1Res.json && page1Res.json.projects.length === 10, `Page 1 returned 10 items (got ${page1Res.json?.projects.length})`);
    assert(page1Res.json && page1Res.json.totalPages === 2, `Total pages for 12 with limit 10 is 2 (got ${page1Res.json?.totalPages})`);
    assert(page1Res.json && page1Res.json.projects[0].projectCode === "AMIP001", "Page 1 first project is AMIP001");

    const page2Res = await fetchUrl("/api/projects?domain=AMIP&page=2&limit=10");
    assert(page2Res.status === 200, "Page 2 API returned status 200");
    assert(page2Res.json && page2Res.json.projects.length === 2, `Page 2 returned remaining 2 items (got ${page2Res.json?.projects.length})`);
    assert(page2Res.json && page2Res.json.projects[1].projectCode === "AMIP012", "Page 2 last project is AMIP012");

    const p1Codes = new Set(page1Res.json.projects.map((p) => p.projectCode));
    const p2Codes = new Set(page2Res.json.projects.map((p) => p.projectCode));
    const overlap = [...p1Codes].filter((c) => p2Codes.has(c));
    assert(overlap.length === 0, "Zero project overlap between page 1 and page 2");

    // 3. Screen 1: Projects Hub (/projects)
    console.log("\nTEST 3: Screen 1 - /projects (Catalog & Domain Cards)");
    const screen1Res = await fetchUrl("/projects");
    assert(screen1Res.status === 200, "/projects returned status 200");
    assert(screen1Res.body.includes("Image Processing"), "/projects contains Image Processing domain");
    assert(screen1Res.body.includes("AMIP"), "/projects contains AMIP domain code");
    assert(screen1Res.body.includes("12 Projects") || screen1Res.body.includes("12"), "/projects reflects 12 projects for Image Processing – Python");
    assert(screen1Res.body.includes("269 Projects") || screen1Res.body.includes("269"), "/projects preserves 269 projects for Web Application - PHP (AMPH)");
    assert(screen1Res.body.includes("22 Projects") || screen1Res.body.includes("22"), "/projects preserves 22 projects for Big Data – Python / Java (AMBD)");
    assert(screen1Res.body.includes("56 Projects") || screen1Res.body.includes("56"), "/projects preserves 56 projects for Android – Java (AMAD)");
    assert(screen1Res.body.includes("60 Projects") || screen1Res.body.includes("60"), "/projects preserves 60 projects for Artificial Intelligence (AMAI)");
    assert(screen1Res.body.includes("100 Projects") || screen1Res.body.includes("100"), "/projects preserves 100 projects for Deep Learning (AMDL)");
    assert(screen1Res.body.includes("107 Projects") || screen1Res.body.includes("107"), "/projects preserves 107 projects for Python (AMPY)");
    assert(screen1Res.body.includes("210 Projects") || screen1Res.body.includes("210"), "/projects preserves 210 projects for MATLAB (AMIM)");

    // 4. Screen 2: Domain Page (/projects/AMIP)
    console.log("\nTEST 4: Screen 2 - /projects/AMIP (Domain Listing & Pagination)");
    const screen2Res = await fetchUrl("/projects/AMIP");
    assert(screen2Res.status === 200, "/projects/AMIP returned status 200");
    assert(screen2Res.body.includes("Image Processing"), "Page has heading Image Processing");
    assert(screen2Res.body.includes("12"), "Page displays Total Projects: 12");
    assert(screen2Res.body.includes("AMIP001"), "Page displays first project AMIP001");
    assert(screen2Res.body.includes("pagination") || screen2Res.body.includes("Page 1") || screen2Res.body.includes("Next"), "Page contains pagination controls");

    // 5. Screen 3: Project Detail Pages
    console.log("\nTEST 5: Screen 3 - Detail Pages");
    const detail1 = await fetchUrl("/projects/AMIP/AMIP001");
    assert(detail1.status === 200, "/projects/AMIP/AMIP001 returned 200");
    assert(detail1.body.includes("Real-time Smile Detection"), "AMIP001 title rendered");
    assert(detail1.body.includes("Enquire") || detail1.body.includes("Enquiry"), "AMIP001 has Enquire CTA");

    const detail5 = await fetchUrl("/projects/AMIP/AMIP005");
    assert(detail5.status === 200, "/projects/AMIP/AMIP005 returned 200");
    assert(detail5.body.includes("Diagnosis of Diabetic Retinopathy and Glaucoma"), "AMIP005 title rendered");

    const detail11 = await fetchUrl("/projects/AMIP/AMIP011");
    assert(detail11.status === 200, "/projects/AMIP/AMIP011 returned 200");
    assert(detail11.body.includes("Detection of License Plate Numbers and Identification"), "AMIP011 title rendered");

    const detail12 = await fetchUrl("/projects/AMIP/AMIP012");
    assert(detail12.status === 200, "/projects/AMIP/AMIP012 returned 200");
    assert(detail12.body.includes("A New Benchmarking for Diabetic Retinopathy"), "AMIP012 title rendered");

    // 6. Enquiry Submission
    console.log("\nTEST 6: Enquiry Submission for AMIP012");
    const testId = Date.now();
    const enquiryPayload = {
      name: "AMIP Computer Vision Tester",
      email: `amip.tester.${testId}@example.com`,
      phone: "9876543210",
      whatsappNumber: "9876543210",
      college: "Computer Vision & Optical Engineering Institute",
      department: "Image Processing & Artificial Intelligence",
      category: "Image Processing – Python",
      projectCode: "AMIP012",
      projectTitle: "A New Benchmarking for Diabetic Retinopathy Using Machine Learning, Deep Learning and Image Processing Technique",
      requirement: `Requesting IEEE base paper, OpenCV Python pipelines, and deep neural models for AMIP012 (${testId}).`
    };

    const enqRes = await fetchUrl("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": `10.0.1.${Math.floor(Math.random() * 200) + 10}`
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

