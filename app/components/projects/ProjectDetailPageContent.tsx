"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/useLanguage";
import WorkGalleryClient from "./WorkGalleryClient";


type ProjectDetailBlock =
    | {
        type: "paragraph";
        content: string;
    }
    | {
        type: "list";
        title?: string;
        items: string[];

    }
    | {
        type: "sources";
        title: string;
        items: { label: string; value: string; url: string }[];
    };


type Project = {
    slug: string;
    title: string;
    cardDescription: string;
    intro: string;
    detailBlocks: ProjectDetailBlock[];
    image: string;
    gallery: string[];
    tags: string[];
    category: "frontend" | "backend" | "database" | "fullstack";
    githubUrl?: string;
    liveUrl?: string;
    docsUrl?: string;
    featured?: boolean;


    projectMeta?: {
        type?: string;
        role?: string;
        year?: string;
        status?: string;
    };

    credentials?: {
        email: string;
        password: string;
    }
};

export default function ProjectDetailPageContent({ slug }: { slug: string }) {
    const { t } = useLanguage();

    const projects = t.projectsPage.items as Project[];
    const project = projects.find((item) => item.slug === slug);

    if (!project) {
        return null;
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
                                {project.tags.slice(0, 3).map((tag) => (
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




                        <div className="mt-6 space-y-6 text-base leading-8 text-slate-600">
                            {project.detailBlocks.map((block, index) => {
                                if (block.type === "paragraph") {
                                    return <p key={index}>{block.content}</p>;
                                }

                                if (block.type === "list") {
                                    return (
                                        <div key={index}>
                                            {block.title && (
                                                <h3 className="text-base font-semibold text-slate-900">
                                                    {block.title}
                                                </h3>
                                            )}

                                            <ul className="mt-3 space-y-3 text-slate-600">
                                                {block.items.map((item, itemIndex) => (
                                                    <li key={itemIndex} className="flex gap-3">
                                                        <span className="mt-3 h-1.5 w-1.5 shrink-0 bg-sky-600" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                }

                                if (block.type === "sources") {
                                    return (
                                        <div key={index} className="mt-8 border-t border-slate-200 pt-6">
                                            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-5600">
                                                {block.title}:
                                            </h3>

                                            <ul className="mt-4 space-y-2 text-sm text-slate-600">
                                                {block.items.map((item, i) => (
                                                    <li key={i} className="flex  gap-2">
                                                        <span className="text-slate-500">{item.label}:</span>
                                                        <span className="text-sky-600 underline font-medium">
                                                            <Link href={item.url} target="_blank" rel="noopener noreferrer">
                                                                {item.value}
                                                            </Link>
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="border border-slate-200 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:px-8">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                {t.projectsPage.detailSections.technologies}
                            </h2>

                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.tags.map((tech) => (
                                    <span
                                        key={tech}
                                        className="border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>


                        <div className="border border-slate-200 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:px-8">
                            <h2 className="text-lg font-semibold text-slate-900">
                                Projektinformációk
                            </h2>

                            <dl className="mt-5 space-y-4 text-sm">
                                <div>
                                    <dt className="text-slate-500">Típus</dt>
                                    <dd className="mt-1 font-medium text-slate-900">
                                        {project.projectMeta?.type}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-slate-500">Feladataim</dt>
                                    <dd className="mt-1 font-medium text-slate-900">
                                        {project.projectMeta?.role}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-slate-500">Státusz</dt>
                                    <dd className="mt-1 font-medium text-slate-900">
                                        {project.projectMeta?.status}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-slate-500">Év</dt>
                                    <dd className="mt-1 font-medium text-slate-900">
                                        {project.projectMeta?.year}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        {project.credentials ? (
                            <div className="border border-sky-500 bg-sky-100 px-6 py-6 sm:px-8">
                                <p className="text-sm font-semibold text-slate-900">Teszt hozzáférés</p>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Felhasználó: <strong>{project.credentials.email}</strong>
                                </p>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Jelszó: <strong>{project.credentials.password}</strong>
                                </p>
                            </div>
                        ) : null}
                    </div>


                </section>

                <section className="mt-14">
                    <h2 className="text-2xl font-semibold text-slate-900">
                        {t.projectsPage.detailSections.gallery}
                    </h2>

                    <WorkGalleryClient
                        images={[...project.gallery]}
                    />
                </section>
            </div >
        </main >
    );
}
