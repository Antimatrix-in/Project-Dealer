import React from "react";
import { notFound } from "next/navigation";
import { TECHNICAL_DOMAINS } from "@/types";
import {
  getDomainByCode,
  getProjectsByDomain,
  findProject,
  getAllProjects
} from "@/lib/projects";
import DomainProjectsClient from "./DomainProjectsClient";
import ProjectDetailContent from "./[projectCode]/ProjectDetailContent";

interface DomainPageProps {
  params: Promise<{ domainCode: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: DomainPageProps) {
  const { domainCode } = await params;
  const domain = getDomainByCode(domainCode);

  if (domain) {
    return {
      title: `${domain.name} (${domain.code}) Projects - Upwork Project Center`,
      description: `Explore engineering projects under ${domain.name} (${domain.code}). Source code, IEEE base papers, and viva documentation included.`,
    };
  }

  const project = findProject(domainCode);
  if (project) {
    return {
      title: `${project.title} - Upwork Project Center`,
      description: project.description?.slice(0, 160) || "Project details and IEEE documentation",
    };
  }

  return { title: "Domain / Project Not Found" };
}

export default async function DomainOrProjectPage({ params }: DomainPageProps) {
  const { domainCode } = await params;

  // 1. Check if domainCode is an official 16 technical domain code (Screen 2)
  const domain = getDomainByCode(domainCode);
  if (domain) {
    const projects = getProjectsByDomain(domain.code);
    return <DomainProjectsClient domain={domain} projects={projects} />;
  }

  // 2. Backward compatibility: check if it's an existing project slug or id (Screen 3 fallback)
  const project = findProject(domainCode);
  if (project) {
    return <ProjectDetailContent project={project} />;
  }

  notFound();
}

