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

export default function SeoUpdater() {
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const pageKey = getPageKey(pathname);
    const meta = t.meta[pageKey];

    if (!meta) return;

    document.title = meta.title;

    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.name = "description";
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.content = meta.description;
  }, [pathname, t]);

  return null;
}