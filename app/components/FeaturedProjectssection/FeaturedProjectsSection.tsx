// import Image from "next/image";
// import Link from "next/link";
// import SectionHeader from "../SectionHeader";

// type Project = {
//   title: string;
//   description: string;
//   image: string;
//   href: string;
//   tags: string[];
// };

// const featuredProjects: Project[] = [
//   {
//     title: "Wordy",
//     description:
//       "Angol–magyar szókártyás alkalmazás modern, letisztult felülettel és több kategóriába rendezett tanulási tartalommal.",
//     image: "/works/wordy.png",
//     href: "/projects/wordy",
//     tags: ["Next.js", "TypeScript", "SQLite", "Tailwind"],
//   },
//   {
//     title: "Electric guitar shop",
//     description:
//       "Receptes full stack projekt Prisma + SQLite alappal, strukturált tartalomkezeléssel és modern felhasználói élménnyel.",
//     image: "/works/egs.webp",
//     href: "/projects/kostolj-bele",
//     tags: ["React", "Express", "MongoDb", "Sass"],
//   },
//   {
//     title: "Inegratív Medicina",
//     description:
//       "Online angol tanári landing page kurzusblokkokkal, modern tartalmi felépítéssel és átgondolt vizuális hierarchiával.",
//     image: "/works/im.png",
//     href: "/projects/levelup-english",
//     tags: ["React", "Tailwind", "Prisma", "Electron", "SQLite"],
//   },
// ];

// export default function FeaturedProjectsSection() {
//   return (
//     <section className="bg-slate-50 px-6 lg:px-0 py-24 sm:py-28 lg:py-32">
//       <div className="mx-auto max-w-350 ">
//         <SectionHeader
//           eyebrow="Munkáim"
//           title="Kiemelt projektjeim"
//           description="Néhány projekt, amelyek jól megmutatják, hogyan gondolkodom a modern frontend és full stack fejlesztésről."
//           align="left"
//           maxWidth="lg"
//         />

//         <div className="mt-14 grid gap-8 lg:grid-cols-3">
//           {featuredProjects.map((project) => (
//             <article
//               key={project.title}
//               className="group mx-auto max-w-120 flex h-full flex-col border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition duration-300  hover:shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
//             >
//               <Link href={project.href} className="block">
//                 <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-200 bg-slate-100">
//                   <Image
//                     src={project.image}
//                     alt={project.title}
//                     fill
//                     className="object-cover transition duration-500 group-hover:scale-[1.03]"
//                   />
//                 </div>
//               </Link>

//               <div className="flex flex-1 flex-col px-6 py-6">
//                 <div className="flex flex-wrap gap-2">
//                   {project.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="border border-sky-100 bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-700"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>

//                 <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">
//                   {project.title}
//                 </h3>

//                 <p className="mt-4 flex-1 text-base leading-7 text-slate-600">
//                   {project.description}
//                 </p>

//                 <div className="mt-8">
//                   <Link
//                     href={project.href}
//                     className="btn btn-blue"
//                   >
//                     Részletek <span> →</span>
//                   </Link>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>

//         <div className="mt-14 flex justify-center">
//           <Link
//             href="/projects"
//             className="btn btn-white-blue"
//           >
//             Összes projektem
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Link from "next/link";
import SectionHeader from "../SectionHeader";
import ProjectCard from "@/app/components/projects/ProjectCard";
import { useLanguage } from "@/contexts/useLanguage";

type Project = {
    slug: string;
    title: string;
    cardDescription: string;
    image: string;
    tags: string[];
    featured?: boolean;
};


export default function FeaturedProjectsSection() {
  const { t } = useLanguage();

  const projects = t.projectsPage.items as Project[];
  const featuredProjects =  projects.filter((project) => project.featured);

  return (
    <section className="bg-slate-50 px-6 py-24 sm:py-28 own:px-0 lg:py-32">
      <div className="mx-auto max-w-350">
        <SectionHeader
          eyebrow={t.projectsPage.eyebrow}
          title={t.projectsPage.featuredTitle ?? t.projectsPage.title}
          description={
            t.projectsPage.featuredDescription ?? t.projectsPage.description
          }
          align="left"
          maxWidth="md"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              detailsLabel={t.projectsPage.buttons.details}
            />
          ))}
        </div>

        <div className="mt-14 flex justify-start">
          <Link href="/projects" className="btn btn-white-blue">
            {t.projectsPage.buttons.allProjects}
          </Link>
        </div>
      </div>
    </section>
  );
}