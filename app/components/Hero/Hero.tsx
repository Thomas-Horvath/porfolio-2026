import Image from "next/image";
import Link from "next/link";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
} from "react-icons/fa";
import { SiNextdotjs, SiTypescript } from "react-icons/si";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden h-screen" >
    

      {/* finom világos overlay */}
      <div className="absolute inset-0 -z-10 bg-white/10" />

      {/* Navbar */}
      

      {/* Hero tartalom */}
      <div className="mx-auto flex min-h-[100vh] max-w-350 flex-col justify-center px-6 pb-12 pt-8 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Bal oldal */}
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex rounded-full border border-sky-100 bg-white/80 px-4 py-2 text-sm font-medium text-sky-700 shadow-sm backdrop-blur">
              Frontend / Full Stack Web Developer
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Horváth Tamás
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700 sm:text-xl">
              Modern webes felületek és full stack projektek fejlesztése
              Reacttel, Next.js-szel és korszerű webes technológiákkal.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/munkak"
                className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700"
              >
                Projektek
              </Link>

              <Link
                href="/kapcsolat"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur transition hover:bg-white"
              >
                Kapcsolat
              </Link>
            </div>
          </div>

          {/* Jobb oldal */}
          <div className="relative hidden lg:block">
            <div className="mx-auto flex h-[620px] w-[620px] items-center justify-center ">
              
               
                  <Image
                    src="/earth.png"
                    alt="HT logo"
                    fill
                    className="object-cover"
                  />

        
            </div>

            <div className="absolute left-4 top-20 rounded-2xl border border-sky-100 bg-white/80 px-4 py-3 shadow-lg backdrop-blur">
              <p className="text-sm font-semibold text-slate-800">React</p>
              <p className="text-xs text-slate-500">Modern UI fejlesztés</p>
            </div>

            <div className="absolute bottom-18 right-0 rounded-2xl border border-sky-100 bg-white/80 px-4 py-3 shadow-lg backdrop-blur">
              <p className="text-sm font-semibold text-slate-800">Next.js</p>
              <p className="text-xs text-slate-500">Gyors és modern webappok</p>
            </div>
          </div>
        </div>

        {/* Tech stack sor */}
        <div className="mt-16 absolute bottom-0 right-0">
          <div className=" flex w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-5 border border-sky-100 bg-white/75 px-6 py-8 shadow-xl shadow-sky-100/50 backdrop-blur-md">
            <div className="flex items-center gap-3 text-slate-700">
              <FaReact className="text-3xl text-sky-500" />
              <span className="text-lg font-semibold">React</span>
            </div>

            <div className="flex items-center gap-3 text-slate-700">
              <SiNextdotjs className="text-3xl text-slate-800" />
              <span className="text-lg font-semibold">Next.js</span>
            </div>

            <div className="flex items-center gap-3 text-slate-700">
              <SiTypescript className="text-3xl text-sky-600" />
              <span className="text-lg font-semibold">TypeScript</span>
            </div>

            <div className="flex items-center gap-3 text-slate-700">
              <FaNodeJs className="text-3xl text-green-600" />
              <span className="text-lg font-semibold">Node.js</span>
            </div>

            <div className="flex items-center gap-3 text-slate-700">
              <FaDatabase className="text-3xl text-slate-600" />
              <span className="text-lg font-semibold">SQL / MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
