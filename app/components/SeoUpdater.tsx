"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/useLanguage";

type PageKey = "home" | "about" | "projects" | "contact" | "imprint" | "privacy";

function getPageKey(pathname: string): PageKey {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/contact")) return "contact";
  if (pathname.startsWith("/imprint")) return "imprint";
  if (pathname.startsWith("/privacy")) return "privacy";

  return "home";
}

function getProjectSlug(pathname: string) {
  const match = pathname.match(/^\/projects\/([^/]+)$/);
  return match?.[1] ?? null;
}

export default function SeoUpdater() {
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const projectSlug = getProjectSlug(pathname);
    const project = t.projectsPage.items.find(
      (item) => item.slug === projectSlug
    );

    const pageKey = getPageKey(pathname);
    const meta = t.meta[pageKey];

    if (!meta) return;

    document.title = project ? `${project.title} | Thomas Horvath` : meta.title;

    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.name = "description";
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.content = project ? project.cardDescription : meta.description;
  }, [pathname, t]);

  return null;
}
