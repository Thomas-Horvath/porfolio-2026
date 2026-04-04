"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/useLanguage";

type PageKey = "home" | "about" | "projects" | "contact" | "imprint" | "privacy";
type ProjectSeoItem = {
  slug: string;
  title: string;
  cardDescription: string;
  seoTitle?: string;
  seoDescription?: string;
};

function normalizePath(pathname: string) {
  if (pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "");
}

function getPageKey(pathname: string): PageKey {
  const normalizedPath = normalizePath(pathname);

  if (normalizedPath === "/") return "home";
  if (normalizedPath.startsWith("/about")) return "about";
  if (normalizedPath.startsWith("/projects")) return "projects";
  if (normalizedPath.startsWith("/contact")) return "contact";
  if (normalizedPath.startsWith("/imprint")) return "imprint";
  if (normalizedPath.startsWith("/privacy")) return "privacy";

  return "home";
}

function getProjectSlug(pathname: string) {
  const normalizedPath = normalizePath(pathname);
  const match = normalizedPath.match(/^\/projects\/([^/]+)$/);
  return match?.[1] ?? null;
}

export default function SeoUpdater() {
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const projectSlug = getProjectSlug(pathname);
    const project = (t.projectsPage.items as ProjectSeoItem[]).find(
      (item) => item.slug === projectSlug
    );

    const pageKey = getPageKey(pathname);
    const meta = t.meta[pageKey];

    if (!meta) return;

    document.title = project?.seoTitle ?? (project ? `${project.title} | Thomas Horvath` : meta.title);

    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.name = "description";
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.content = project?.seoDescription ?? (project ? project.cardDescription : meta.description);
  }, [pathname, t]);

  return null;
}
