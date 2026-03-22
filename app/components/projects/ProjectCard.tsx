import Image from "next/image";
import Link from "next/link";

type Project = {
    slug: string;
    title: string;
    cardDescription: string;
    image: string;
    tags: string[];
    featured?: boolean;
};

type Props = {
    project: Project;
    detailsLabel: string;
};

export default function ProjectCard({ project, detailsLabel }: Props) {
    return (
        <article className="group mx-auto flex h-full max-w-120 flex-col border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition duration-300 hover:shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <Link href={`/projects/${project.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-200 bg-slate-100">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                </div>
            </Link>

            <div className="flex flex-1 flex-col px-6 py-6">
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

                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">
                    {project.title}
                </h3>

                <p className="mt-4 flex-1 text-base leading-7 text-slate-600">
                    {project.cardDescription}
                </p>

                <div className="mt-8">
                    <Link href={`/projects/${project.slug}`} className="btn btn-blue">
                        {detailsLabel} <span>→</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}