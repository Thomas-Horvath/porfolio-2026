'use client';

import Image from "next/image";
import Link from "next/link";
import TechStack from "./TechStack";
import { useLanguage } from "@/contexts/useLanguage";
import RevealOnScroll from "../RevealOnScroll";

export default function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative h-screen overflow-hidden bg-linear-to-b from-transparent from-80% to-white to-100%">
      <div className="  absolute inset-0 -z-10 bg-white/10" />

      <div className="mt-10 mx-auto flex h-screen max-w-350 flex-col justify-center px-6 pb-10 pt-24  own:px-0">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="max-w-2xl">
            <RevealOnScroll delay={0}>
              <div className="mb-8 inline-flex border border-sky-200 bg-white/85 px-2 lg:px-4 py-1 lg:py-2 text-xs lg:text-base font-medium tracking-[0.08em] text-sky-700 shadow-sm backdrop-blur">
                {t.homePage.profession}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={70}>
              <h1 className="heading-font inline-block max-w-full whitespace-nowrap text-[clamp(2.4rem,2rem+3vw,5.7rem)] leading-[0.95] font-bold tracking-[-0.04em] text-transparent bg-linear-to-r from-slate-950 via-slate-800 to-sky-600 bg-clip-text">
                {t.homePage.name}
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={140}>
              <div className="mt-8 max-w-lg">
                <p className="text-base lg:leading-7 text-slate-700 sm:text-lg">
                  {t.homePage.subTitle}
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={210}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="btn btn-blue"
                >
                  {t.homePage.button1}
                </Link>

                <Link
                  href="/contact"
                  className="btn btn-white"
                >
                  {t.homePage.button2}
                </Link>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll className="relative hidden lg:flex lg:justify-center" delay={180} distance={18}>
            <div className="relative h-125 w-125">
              <Image
                src="/earth.png"
                alt={t.homePage.earthAlt}
                fill
                className="object-contain opacity-85"
                priority
              />


              <div className="absolute -left-2.5 top-16 border border-sky-100 bg-white/85 px-4 py-3 shadow-lg backdrop-blur">
                <p className="text-sm font-semibold text-slate-800">React</p>
                <p className="text-xs text-slate-500">{t.homePage.earthLabel1}</p>
              </div>

              <div className="absolute bottom-10 -right-2 border border-sky-100 bg-white/85 px-4 py-3 shadow-lg backdrop-blur">
                <p className="text-sm font-semibold text-slate-800">Next.js</p>
                <p className="text-xs text-slate-500">{t.homePage.earthLabel2}</p>
              </div>

            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll className="mb-20 mt-12 lg:mt-4" delay={260} distance={16}>
          <TechStack />
        </RevealOnScroll>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-b from-transparent to-white pointer-events-none z-1" />

    </section>
  );
}
