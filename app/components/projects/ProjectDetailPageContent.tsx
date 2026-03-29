"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/useLanguage";

type Project = {
    slug: string;
    title: string;
    cardDescription: string;
    description: string[];
    image: string;
    tags: string[];
    category: "frontend" | "backend" | "database" | "fullstack";
    githubUrl?: string;
    liveUrl?: string;
    docsUrl?: string;
    gallery: string[];
    featured?: boolean;
};

export default function ProjectDetailPageContent({ slug }: { slug: string }) {
    const { t } = useLanguage();

    const projects = t.projectsPage.items as Project[];
    const project = projects.find((item) => item.slug === slug);

    if (!project) {
        return (
            <main className="bg-slate-50 px-4 py-24 own:px-0">
                <div className="mx-auto max-w-350">
                    <div className="border border-dashed border-slate-200 bg-white px-8 py-16 text-center">
                        <p className="text-sm uppercase tracking-[0.2em] text-sky-600">
                            404
                        </p>
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

    return (
        <main className="bg-slate-50 px-4 py-24 own:px-0">
            <div className="mx-auto max-w-350">
                <div className="mb-8">
                    <Link
                        href="/projects"
                        className="btn btn-blue-border"
                    >
                        ← {t.projectsPage.buttons.backToProjects}
                    </Link>
                </div>

               

                <section className="border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
                    <div className="grid gap-8  sm:p-10 items-center lg:grid-cols-[1fr_1fr]">
                         <div className="overflow-hidden border border-slate-200 bg-slate-100">
                            <div className="relative aspect-[16/10]">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                        </div>
                        <div className="py-6 px-6 lg:py-0 h-full">
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="border border-sky-100 bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-700"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900">
                                {project.title}
                            </h1>

                            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                                {project.cardDescription}
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-blue"
                                    >
                                        {t.projectsPage.buttons.github}
                                    </a>
                                )}

                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-white-blue"
                                    >
                                        {t.projectsPage.buttons.liveDemo}
                                    </a>
                                )}
                                {project.docsUrl && (
                                    <a
                                        href={project.docsUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-blue"
                                    >
                                        {t.projectsPage.buttons.docsDownload}
                                    </a>
                                )}
                            </div>
                        </div>

                       
                    </div>
                </section>






                <section className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
                    <div className="border border-slate-200 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:px-8">
                        <h2 className="text-2xl font-semibold text-slate-900">
                            {t.projectsPage.detailSections.overview}
                        </h2>

                        <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
                            {project.description.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    <div className="border border-slate-200 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:px-8">
                        <h2 className="text-2xl font-semibold text-slate-900">
                            {t.projectsPage.detailSections.technologies}
                        </h2>

                        <div className="mt-6 flex flex-wrap gap-3">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mt-14">
                    <h2 className="text-2xl font-semibold text-slate-900">
                        {t.projectsPage.detailSections.gallery}
                    </h2>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {project.gallery.map((image, index) => (
                            <div
                                key={index}
                                className="relative aspect-16/10 overflow-hidden border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
                            >
                                <Image
                                    src={image}
                                    alt={`${project.title} screenshot ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}