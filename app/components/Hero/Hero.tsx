'use client';

import Image from "next/image";
import Link from "next/link";
import TechStack from "./TechStack";
import { useLanguage } from "@/contexts/useLanguage";

export default function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative h-screen overflow-hidden bg-linear-to-b from-transparent from-80% to-white to-100%">
      <div className="  absolute inset-0 -z-10 bg-white/10" />

      <div className="mt-10 mx-auto flex h-screen max-w-350 flex-col justify-center px-6 pb-10 pt-24  own:px-0">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex border border-sky-100 bg-white/80 px-4 py-2 text-sm font-medium text-sky-700 shadow-sm backdrop-blur">
             {t.homePage.profession}
            </div>

            <h1 className="heading-font text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              {t.homePage.name}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700 sm:text-xl">
             {t.homePage.subTitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
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
          </div>

          <div className="relative hidden lg:flex lg:justify-center">
            <div className="relative h-125 w-125">
              <Image
                src="/earth.png"
                alt="Földgömb"
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
          </div>
        </div>

        <div className="mb-20 mt-12 lg:mt-4" >
          <TechStack />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-b from-transparent to-white pointer-events-none" />

    </section>
  );
}