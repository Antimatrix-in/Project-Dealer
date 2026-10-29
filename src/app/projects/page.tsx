import ProjectsCatalogClient from "./ProjectsCatalogClient";

export const metadata = {
  title: "Engineering Projects Catalog - AntiMatrix Project Center",
  description:
    "Explore 10 verified final year IEEE engineering project domains including AI & Data Science, Machine Learning, Deep Learning, Cloud Computing, and Cybersecurity with source code and documentation.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const initialCategory = params?.category || "All";

  return <ProjectsCatalogClient initialCategory={initialCategory} />;
}
