import Image from "next/image";
import Link from "next/link";

type ProjectCategory = "frontend" | "backend" | "database" | "fullstack";

type Project = {
    slug: string;
    title: string;
    image: string;
    tags: string[];
    category: ProjectCategory;
    featured?: boolean;
};

type Props = {
    project: Project;
    detailsLabel: string;
};

const categoryStyles = {
    frontend: {
        accent: "from-sky-500 via-blue-500 to-cyan-400",
        dot: "bg-sky-500 group-hover:bg-cyan-400",
        hoverBorder: "hover:border-sky-300",
        hoverShadow: "hover:shadow-[0_20px_60px_rgba(14,165,233,0.18)]",
    },
    backend: {
        accent: "from-violet-500 via-purple-500 to-indigo-500",
        dot: "bg-violet-500 group-hover:bg-indigo-400",
        hoverBorder: "hover:border-violet-300",
        hoverShadow: "hover:shadow-[0_20px_60px_rgba(139,92,246,0.18)]",
    },
    database: {
        accent: "from-emerald-500 via-green-500 to-teal-400",
        dot: "bg-emerald-500 group-hover:bg-teal-400",
        hoverBorder: "hover:border-emerald-300",
        hoverShadow: "hover:shadow-[0_20px_60px_rgba(16,185,129,0.18)]",
    },
    fullstack: {
        accent: "from-orange-500 via-amber-500 to-yellow-400",
        dot: "bg-orange-500 group-hover:bg-amber-400",
        hoverBorder: "hover:border-orange-300",
        hoverShadow: "hover:shadow-[0_20px_60px_rgba(249,115,22,0.20)]",
    },
} as const;

export default function ProjectCardCompact({ project, detailsLabel }: Props) {
    const styles = categoryStyles[project.category];

    return (
        <Link
            href={`/projects/${project.slug}`}
            className={`group relative block overflow-hidden border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 ${styles.hoverBorder} ${styles.hoverShadow}`}
        >
            <div
                className={`h-[5px] w-full bg-linear-to-r ${styles.accent} opacity-80 transition duration-300 group-hover:opacity-100`}
            />

            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.06]"
                />

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/20 via-transparent to-white/0 opacity-80 transition duration-500 group-hover:from-slate-950/30" />

                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-white/30 bg-white/15 text-white/90 opacity-0 shadow-sm backdrop-blur-md transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <span className="text-base">↗</span>
                </div>
            </div>

            <div className="px-5 py-5">
                <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900 transition duration-300 group-hover:text-sky-700">
                        {project.title}
                    </h3>

                    <span
                        className={`mt-1 h-2 w-2 shrink-0 transition duration-300 group-hover:scale-125 ${styles.dot}`}
                    />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="border border-sky-100 bg-sky-50/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sky-700 transition duration-300 group-hover:border-sky-200 group-hover:bg-white"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 transition duration-300 group-hover:text-slate-700">
                    <span>{detailsLabel}</span>
                    <span className="transition duration-300 group-hover:translate-x-1">→</span>
                </div>
            </div>
        </Link>
    );
}