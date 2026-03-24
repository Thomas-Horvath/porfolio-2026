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
} from "react-icons/fa";
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiPhp, SiLaravel, SiPython, SiDjango, SiMysql, SiMongodb } from "react-icons/si";
import AboutInfoShowcase from "./AboutInfoShowcase";

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

  const about = t.about;
  const aboutInfo = t.aboutInfo;

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
        { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" /> },
        { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
        { name: "React", icon: <SiReact className="text-cyan-500" /> },
        { name: "Next.js", icon: <SiNextdotjs className="text-slate-900" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-500" /> },
      ],
    },
    {
      title: "Backend",
      icon: <FaServer className="text-violet-600" />,
      items: [
        { name: "Node.js", icon: <SiNodedotjs className="text-green-600" /> },
        { name: "PHP", icon: <SiPhp className="text-indigo-500" /> },
        { name: "Laravel", icon: <SiLaravel className="text-red-500" /> },
        { name: "Python", icon: <SiPython className="text-sky-600" /> },
        { name: "Django", icon: <SiDjango className="text-emerald-700" /> },
      ],
    },
    {
      title: "Database & Tools",
      icon: <FaDatabase className="text-emerald-600" />,
      items: [
        { name: "MySQL", icon: <SiMysql className="text-blue-700" /> },
        { name: "MongoDB", icon: <SiMongodb className="text-emerald-600" /> },
        { name: "Docker", icon: <FaDocker className="text-sky-500" /> },
        { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
        { name: "Linux", icon: <FaLinux className="text-slate-700" /> },
      ],
    },
  ];

  return (
    <main>
      <article className="bg-slate-50  px-6 py-24 sm:py-28 own:px-0 lg:py-32">
        <section className="mx-auto max-w-350">
          <SectionHeader
            eyebrow={about.headingTitle}
            title={about.headingSpan}
            description={about.mainTitle}
            align="left"
            maxWidth="lg"
          />

          {/* HERO / INTRO */}
          <section className=" mt-14 grid gap-12 xl:grid-cols-[420px_1fr] xl:items-start">
            <div className="xl:sticky xl:top-28">
              <div className="max-w-[420px] relative overflow-hidden border border-slate-200 bg-white">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-linear-to-r from-sky-500 via-blue-500 to-cyan-400" />

                <div className="relative aspect-[4/5]  bg-slate-100">
                  <Image
                    src="/Profil_pic_BG.webp"
                    alt="Horváth Tamás"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="border-t border-slate-200 px-6 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    Frontend / Full Stack Developer
                  </p>
                  <p className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                    Horváth Tamás
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="max-w-4xl space-y-6 text-[17px] leading-8 text-slate-600">
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




      {/* contact buttons */}


      {/* contact / cv CTA */}
      <section className="bg-linear-to-r from-sky-600/80 via-sky-500/80 to-blue-500/80 px-6 py-24 own:px-0">
        <div className="mx-auto max-w-350">
          <div className="border border-white/15 bg-white/12 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-md">
            <div className="h-[3px] w-full bg-linear-to-r from-white/80 via-cyan-200/80 to-white/70" />

            <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12 lg:py-10">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
                  Kapcsolat
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Ha szimpatikus, ahogyan gondolkodom és dolgozom
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
                  Nézd meg az önéletrajzomat, vagy vedd fel velem a kapcsolatot, ha szeretnél
                  többet megtudni rólam, a tapasztalataimról és arról, hogyan dolgozom.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link href="/contact" className="btn btn-blue">
                  {about.contactButton}
                </Link>

                <a
                  href="/2025_CV_new.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-white"
                >
                  {about.cvButton}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>





      <article className="bg-slate-50  px-6 py-24 sm:py-28 own:px-0 lg:py-32">
        {/* SKILLS */}

        <section className=" mx-auto max-w-350">
          <SectionHeader
            eyebrow="Készségek"
            title="Technológiák és területek, amelyekben otthonosan mozgok"
            description="A vizuális felületektől a szerveroldali logikán át az adatbázisokig
              olyan eszközökkel dolgozom, amelyekkel teljes webes megoldásokat
              lehet építeni."
            align="left"
            maxWidth="lg"

          />







          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title} className="border-t border-slate-200 pt-6">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{group.icon}</span>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                    {group.title}
                  </h3>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="inline-flex items-center gap-2 border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-sky-50/40"
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>



        {/* ABOUT INFO / EDITORIAL FLOW */}
        <AboutInfoShowcase title={aboutInfo.title} intro={aboutInfo.intro} items={infoItems} />

      </article>
    </main>
  );
}