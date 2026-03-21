import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-sky-600">
          404
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          This page could not be found
        </h1>

        <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
          The page you are looking for may have been moved, renamed, or it never
          existed in the first place.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Back to home
          </Link>

          <Link
            href="/projects"
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            View projects
          </Link>
        </div>
      </div>
    </main>
  );
}