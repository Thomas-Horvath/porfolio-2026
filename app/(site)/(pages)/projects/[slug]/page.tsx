import { notFound } from "next/navigation";
import ProjectDetailPageContent from "@/app/components/projects/ProjectDetailPageContent";
import hu from "@/data/hu.json";

export function generateStaticParams() {
  return hu.projectsPage.items.map((item) => ({
    slug: item.slug,
  }));
}




export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectExists = hu.projectsPage.items.some((item) => item.slug === slug);

  if (!projectExists) {
    notFound();
  }

  return <ProjectDetailPageContent slug={slug} />;
}
