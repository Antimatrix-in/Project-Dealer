import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { findProject, updateProject } from "@/lib/projects";

async function checkAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const project = findProject(code);

  if (!project) {
    return NextResponse.json({ error: `Project '${code}' not found` }, { status: 404 });
  }

  return NextResponse.json({ success: true, project });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const session = await checkAdminAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { code } = await params;
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const updated = await updateProject(code, body);
  if (!updated) {
    return NextResponse.json({ error: `Project '${code}' not found` }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    message: `Project ${updated.projectCode || code} updated successfully`,
    project: updated
  });
}

