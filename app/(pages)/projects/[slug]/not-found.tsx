"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/useLanguage";

export default function ProjectNotFound() {
  const { t } = useLanguage();

  return (
    <main className="h-screen bg-slate-50 px-4 py-24 own:px-0">
      <div className="m-auto max-w-350">
        <div className="border border-dashed border-slate-200 bg-white px-8 py-16 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-600">404</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">
            {t.projectsPage.notFoundTitle}
          </h1>
          <p className="mt-4 text-slate-600">
            {t.projectsPage.notFoundDescription}
          </p>

          <div className="mt-8">
            <Link href="/projects" className="btn btn-blue">
              {t.projectsPage.buttons.backToProjects}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
