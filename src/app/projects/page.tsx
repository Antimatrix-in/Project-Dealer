import { getAllDomains, getAllProjects } from "@/lib/projects";
import ProjectsCatalogClient from "./ProjectsCatalogClient";

export const metadata = {
  title: "16 Technical Domains - Upwork Project Center",
  description:
    "Browse final year IEEE engineering projects across 16 official technical domains: Python, Java, Deep Learning, Machine Learning, Cyber Security, Android, Cloud Computing, and more.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; domain?: string }>;
}) {
  const params = await searchParams;
  const initialCategory = params?.category || params?.domain || "All";
  const domains = getAllDomains();
  const allProjects = getAllProjects();

  return (
    <ProjectsCatalogClient
      initialCategory={initialCategory}
      domains={domains}
      allProjects={allProjects}
    />
  );
}
