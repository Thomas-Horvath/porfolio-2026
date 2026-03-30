"use client";

import { useMemo, useState } from "react";
import SectionHeader from "@/app/components/SectionHeader";
import ProjectsFilter from "@/app/components/projects/ProjectsFilter";
import { useLanguage } from "@/contexts/useLanguage";
import ProjectCardCompact from "./ProjectCardCompact";

type FilterValue = "all" | "frontend" | "backend" | "database" | "fullstack";
type ProjectCategory = "frontend" | "backend" | "database" | "fullstack";

type Project = {
    slug: string;
    title: string;
    cardDescription: string;
    description: string[];
    image: string;
    tags: string[];
    category: ProjectCategory;
    githubUrl?: string;
    liveUrl?: string;
    gallery: string[];
    featured?: boolean;
};

export default function ProjectsPageContent() {
    const { t } = useLanguage();
    const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

    const projects = t.projectsPage.items as Project[];

    const filteredProjects = useMemo(() => {
        if (activeFilter === "all") return projects;

        return projects.filter((project) =>
            project.category === activeFilter
        );
    }, [activeFilter, projects]);

    return (
        <main className="bg-slate-50/80 px-4 py-24 sm:py-28 own:px-0 lg:py-32">
            <div className="mx-auto max-w-350">
                <SectionHeader
                    eyebrow={t.projectsPage.eyebrow}
                    title={t.projectsPage.title}
                    description={t.projectsPage.description}
                    align="left"
                    maxWidth="lg"
                />

                <ProjectsFilter
                    activeFilter={activeFilter}
                    onChange={setActiveFilter}
                    labels={t.projectsPage.filters}
                />

                <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProjects.map((project) => (
                        <ProjectCardCompact
                            key={project.slug}
                            project={project}
                            detailsLabel={t.projectsPage.buttons.viewProject}
                        />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="mt-14 border border-dashed border-slate-200 bg-white px-6 py-14 text-center">
                        <p className="text-base text-slate-600">
                            {t.projectsPage.emptyText}
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}