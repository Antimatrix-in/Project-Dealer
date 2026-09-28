import { NextResponse } from "next/server";
import { PROJECTS_DATA } from "@/data/projects";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";

  let filtered = PROJECTS_DATA;

  if (category && category !== "All") {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (query) {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.techStack.some((t) => t.toLowerCase().includes(query))
    );
  }

  return NextResponse.json({
    count: filtered.length,
    projects: filtered,
  });
}
