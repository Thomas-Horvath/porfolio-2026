"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/useLanguage";
import hu from "@/data/hu.json";

const staticPaths = new Set([
  "/",
  "/about",
  "/contact",
  "/cookies",
  "/imprint",
  "/privacy",
  "/projects",
]);

const projectSlugs = new Set(hu.projectsPage.items.map((item) => item.slug));

function shouldMaskPath(pathname: string) {
  if (staticPaths.has(pathname)) {
    return true;
  }

  if (!pathname.startsWith("/projects/")) {
    return false;
  }

  const parts = pathname.split("/").filter(Boolean);

  return parts.length === 2 && projectSlugs.has(parts[1]);
}

export default function LanguageBootMask() {
  const { isHydrated } = useLanguage();
  const pathname = usePathname();

  if (isHydrated || !shouldMaskPath(pathname)) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-50 text-sky-600">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.16),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.12),transparent_34%)]" />

      <div className="relative flex min-h-screen flex-col items-center justify-center px-6">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-300/70 to-transparent" />

        <div className="flex flex-col items-center gap-22">
          <div className="relative flex h-32 w-32 items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-sky-600 opacity-100 animate-ping" />
            <div className="absolute inset-2 rounded-full border border-sky-200/60 bg-white/60" />
            <div className="relative flex h-22 w-22 items-center justify-center rounded-full border border-sky-100 bg-white text-2xl font-semibold tracking-[0.18em] shadow-[0_0_40px_rgba(56,189,248,0.14)]">
              TH
            </div>
          </div>

          {/* <div className="mt-8 h-3 w-42 overflow-hidden rounded-full bg-sky-100 shadow-inner">
            <div className="h-full w-1/2 rounded-full bg-linear-to-r from-sky-400 via-sky-500 to-sky-600 animate-[loader-slide_1.15s_ease-in-out_infinite]" />
          </div> */}
        </div>
      </div>
    </div>
  );
}
