
'use client';

import Link from "next/link";
import { useLanguage } from "@/contexts/useLanguage";

export default function NotFound() {
   const { t } = useLanguage();
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-5xl font-bold uppercase tracking-[0.25em] text-sky-600">
          404
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
         {t.notfound.title}
        </h1>

        <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
          {t.notfound.description}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={t.notfound.btnBackHref}
            className="btn btn-blue"
          >
            {t.notfound.btnBack}
          </Link>

          <Link
            href={t.notfound.btnProjectsHref}
            className="btn btn-white"
          >
            {t.notfound.btnProjects}
          </Link>
        </div>
      </div>
    </main>
  );
}