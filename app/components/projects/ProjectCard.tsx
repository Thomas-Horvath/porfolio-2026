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
        <article className="flex flex-col
                            h-full max-w-120 mx-auto
                            bg-white border border-slate-200 hover:shadow-xl/20
                            shadow-lg
                            duration-300 transition
                            group">
            <Link href={`/projects/${project.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-200 bg-slate-100">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                    />
                </div>
            </Link>

            <div className="flex flex-1 flex-col px-6 py-6">
                <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1
                                       font-semibold tracking-[0.12em] uppercase
                                       bg-sky-50 border border-sky-100 text-sky-700
                                       text-[11px]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">
                    {project.title}
                </h3>

                <p className="flex-1 mt-4 text-base leading-7 text-slate-600">
                    {project.cardDescription}
                </p>

                <div className="mt-8 w-full">
                    <Link href={`/projects/${project.slug}`} className="justify-between w-full btn btn-blue">
                        {detailsLabel} <span >→</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}