import React from "react";
import { notFound } from "next/navigation";
import { findProject, getAllProjects } from "@/lib/projects";
import ProjectDetailContent from "./ProjectDetailContent";

interface ProjectCodePageProps {
  params: Promise<{ domainCode: string; projectCode: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    domainCode: p.domainCode || "AMPY",
    projectCode: p.projectCode || p.id,
  }));
}

export async function generateMetadata({ params }: ProjectCodePageProps) {
  const { projectCode } = await params;
  const project = findProject(projectCode);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `[${project.projectCode || project.id}] ${project.title} - AntiMatrix Project Center`,
    description: (project.abstract || project.description || project.tagline).slice(0, 160),
  };
}

export default async function ProjectDetailPage({ params }: ProjectCodePageProps) {
  const { projectCode } = await params;
  const project = findProject(projectCode);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent project={project} />;
}

