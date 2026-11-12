import React from "react";
import { notFound } from "next/navigation";
import { findProject, getAllProjects } from "@/lib/projects";
import ProjectDetailContent from "./ProjectDetailContent";

interface ProjectCodePageProps {
  params: Promise<{ domainCode: string; projectCode: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: ProjectCodePageProps) {
  const { projectCode } = await params;
  const project = findProject(projectCode);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `[${project.projectCode || project.id}] ${project.title} - Upwork Project Center`,
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

