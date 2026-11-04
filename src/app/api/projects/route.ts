import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import {
  getAllDomains,
  getAllProjects,
  getProjectsByDomain,
  createProject,
  generateNextProjectCode,
  getDomainByCode
} from "@/lib/projects";

async function checkAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain") || searchParams.get("domainCode") || "";
  const category = searchParams.get("category") || "";
  const query = searchParams.get("q")?.toLowerCase().trim() || "";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.max(1, parseInt(searchParams.get("limit") || "500", 10));

  let projects = domain ? getProjectsByDomain(domain) : getAllProjects();

  if (category && category !== "All") {
    projects = projects.filter(
      (p) =>
        (p.category && p.category.toLowerCase() === category.toLowerCase()) ||
        (p.domainName && p.domainName.toLowerCase() === category.toLowerCase())
    );
  }

  if (query) {
    projects = projects.filter(
      (p) =>
        (p.projectCode && p.projectCode.toLowerCase().includes(query)) ||
        (p.domainCode && p.domainCode.toLowerCase().includes(query)) ||
        p.title.toLowerCase().includes(query) ||
        (p.tagline && p.tagline.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query)) ||
        (p.techStack && p.techStack.some((t) => t.toLowerCase().includes(query)))
    );
  }

  const total = projects.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const offset = (page - 1) * limit;
  const paginated = projects.slice(offset, offset + limit);

  // Dynamic domains with accurate project counts
  const domains = getAllDomains();

  return NextResponse.json({
    success: true,
    count: paginated.length,
    total,
    page,
    totalPages,
    projects: paginated,
    domains
  });
}

export async function POST(request: Request) {
  const session = await checkAdminAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access. Administrator privileges required." }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid project payload" }, { status: 400 });
    }

    const domainCode = String(body.domainCode || body.domain || "").trim().toUpperCase();
    const domain = getDomainByCode(domainCode);
    if (!domain) {
      return NextResponse.json(
        { error: `Invalid technical domain: '${domainCode}'. Must be one of the official 16 technical domains.` },
        { status: 400 }
      );
    }

    const title = String(body.title || "").trim();
    if (!title || title.length < 3) {
      return NextResponse.json({ error: "Project title must be at least 3 characters long." }, { status: 400 });
    }

    const description = String(body.description || "").trim();
    if (!description || description.length < 10) {
      return NextResponse.json({ error: "Project description must be at least 10 characters long." }, { status: 400 });
    }

    const techStack = Array.isArray(body.techStack)
      ? body.techStack.filter(Boolean)
      : typeof body.techStack === "string"
      ? body.techStack.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [];

    const newProject = await createProject({
      domainCode: domain.code,
      title,
      tagline: body.tagline,
      description,
      abstract: body.abstract || description,
      problemStatement: body.problemStatement,
      proposedSolution: body.proposedSolution,
      techStack,
      level: body.level,
      year: body.year,
      featured: body.featured
    });

    return NextResponse.json(
      {
        success: true,
        message: `Project created successfully with Project Code ${newProject.projectCode}`,
        project: newProject
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Project creation error:", err);
    return NextResponse.json({ error: err.message || "Failed to create project" }, { status: 500 });
  }
}
