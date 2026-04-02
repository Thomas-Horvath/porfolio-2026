"use client";

import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/app/components/SectionHeader";
import { useLanguage } from "@/contexts/useLanguage";
import {
  FaCode,
  FaServer,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiMysql,
  SiMongodb,
  SiGithub,
  SiFigma,
  SiSqlite,
  SiExpress
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { useState } from "react";
import AboutInfoShowcase from "./AboutInfoShowcase";
import Loading from "../../loading";

type AboutInfoItem = {
  title: string;
  content: string;
};

type SkillGroup = {
  title: string;
  icon: React.ReactNode;
  items: { name: string; icon: React.ReactNode }[];
};

export default function AboutPageContent() {
  const { t } = useLanguage();
  const [loadedImageSrc, setLoadedImageSrc] = useState<string | null>(null);
  const about = t.about;
  const aboutInfo = t.aboutInfo;
  const profileImageSrc = "/Profil_pic_BG.webp";
  const profileImageLoaded = loadedImageSrc === profileImageSrc;

  const infoItems: AboutInfoItem[] = [
    { title: aboutInfo.firstInfoTitle, content: aboutInfo.firstInfoContent },
    { title: aboutInfo.secundInfoTitle, content: aboutInfo.secundInfoContent },
    { title: aboutInfo.thirdInfoTitle, content: aboutInfo.thirdInfoContent },
    { title: aboutInfo.forthInfoTitle, content: aboutInfo.forthInfoContent },
    { title: aboutInfo.fifthInfoTitle, content: aboutInfo.fifthInfoContent },
  ];

  const skillGroups: SkillGroup[] = [
    {
      title: "Frontend",
      icon: <FaCode className="text-sky-600" />,
      items: [
        { name: "HTML5", icon: <SiHtml5 className="text-orange-600" /> },
        { name: "CSS3", icon: <FaCss3Alt className="text-blue-600" /> },
        { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
        { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
        { name: "React", icon: <SiReact className="text-cyan-400" /> },
        { name: "Next.js", icon: <SiNextdotjs className="text-black" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" /> },
        { name: "Bootstrap", icon: <SiBootstrap className="text-purple-600" /> },
        { name: "SASS", icon: <SiSass className="text-pink-500" /> },
      ],
    },
    {
      title: `Backend & ${about.skillsSubTitle}`,
      icon: <FaServer className="text-violet-600" />,
      items: [
        { name: "Node.js", icon: <SiNodedotjs className="text-green-600" /> },
        { name: "Express", icon: <SiExpress className="text-slate-700" /> },
        { name: "PHP", icon: <SiPhp className="text-indigo-500" /> },
        { name: "Python", icon: <SiPython className="text-yellow-500" /> },
        { name: "MySQL", icon: <SiMysql className="text-blue-600" /> },
        { name: "MsSQL", icon: <FaDatabase className="text-red-600" /> },
        { name: "SQLite", icon: <SiSqlite className="text-sky-600" /> },
        { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
      ],
    },
    {
      title: about.skillsSubtitle2 ,
      icon: <FaDatabase className="text-emerald-600" />,
      items: [
        { name: "Docker", icon: <FaDocker className="text-sky-500" /> },
        { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
        { name: "GitHub", icon: <SiGithub className="text-black" /> },
        { name: "Linux", icon: <FaLinux className="text-yellow-500" /> },
        { name: "VS Code", icon: <VscVscode className="text-blue-500" /> },
        { name: "Figma", icon: <SiFigma className="text-pink-500" /> },
      ],
    },
  ];

  return (
    <main>
      <article className="bg-slate-50  px-4 py-24 sm:py-28 own:px-0 lg:py-32">
        <section className="mx-auto max-w-350">
          <SectionHeader eyebrow={about.headingTitle} title={about.headingSpan} description={about.mainTitle} align="left" maxWidth="sm" />

          <section className=" mt-14 grid gap-12 xl:grid-cols-[420px_minmax(0,1fr)] xl:items-start">
            <div className="xl:sticky xl:top-28">
              <div className="max-w-105 relative overflow-hidden border border-slate-200 bg-white">
                <div className="absolute inset-x-0 top-0 h-0.75 bg-linear-to-r from-sky-500 via-blue-500 to-cyan-400" />
                <div className="relative aspect-4/5  bg-slate-100">
                  {!profileImageLoaded && (
                    <>
                      <div className="absolute inset-0 animate-pulse bg-linear-to-br from-slate-200 via-slate-100 to-slate-200" />
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-slate-300/35 to-transparent" />
                    </>
                  )}
                  <Image
                    src={profileImageSrc}
                    alt="Horváth Tamás"
                    fill
                    className={profileImageLoaded ? "object-cover opacity-100 transition-opacity duration-300" : "object-cover opacity-0"}
                    priority
                    onLoad={() => setLoadedImageSrc(profileImageSrc)}
                  />
                </div>
                <div className="border-t border-slate-200 px-6 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">{t.homePage.profession}</p>
                  <p className="mt-2 text-xl font-semibold tracking-tight text-slate-900">{t.homePage.name}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="max-w-4xl space-y-6 text-[15px] leading-8 text-slate-600">
                <p dangerouslySetInnerHTML={{ __html: about.firstParagraph }} />
                <p dangerouslySetInnerHTML={{ __html: about.secundParagraph }} />
                <p dangerouslySetInnerHTML={{ __html: about.thirdParagraph }} />
                <p dangerouslySetInnerHTML={{ __html: about.forthParagraph }} />
                <p dangerouslySetInnerHTML={{ __html: about.fifthParagraph }} />
              </div>
            </div>
          </section>
        </section>
      </article>

      <section className="bg-linear-to-r from-sky-600/80 via-sky-500/80 to-blue-500/80 px-4 py-24 own:px-0">
        <div className="mx-auto max-w-350">
          <div className="border border-white/15 bg-white/12 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-md">
            <div className="h-0.75 w-full bg-linear-to-r from-white/80 via-cyan-200/80 to-white/70" />
            <div className="grid gap-10 px-6 py-8 sm:px-8  lg:items-center lg:px-12 lg:py-10">
              <div className="max-w-4xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">{about.ctaLabel}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{about.ctaTitle}</h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-white/85 sm:text-base">{about.ctaDescription}</p>
              </div>

              <div className="flex flex-col gap-6 sm:flex-row ">
                <Link href="/contact" className="btn btn-blue-light">{about.contactButton}</Link>
                <a href="/2025_CV_new.pdf" target="_blank" rel="noreferrer" className="btn btn-white">{about.cvButton}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="bg-slate-50  px-4 py-24 sm:py-28 own:px-0 lg:py-32">
        <section className=" mx-auto max-w-350">
          <SectionHeader eyebrow={about.skillsHeader} title={about.skillsTitle} description={about.skillsDescription} align="left" maxWidth="xl" />

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title} className="border-t border-slate-200 pt-6">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{group.icon}</span>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900">{group.title}</h3>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <div key={item.name} className="inline-flex items-center gap-2 border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-sky-50/40">
                      <span className="text-base">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <AboutInfoShowcase eyebrow={aboutInfo.eyebrow} title={aboutInfo.title} intro={aboutInfo.intro} items={infoItems} />
      </article>
   
    </main>
  );
}
