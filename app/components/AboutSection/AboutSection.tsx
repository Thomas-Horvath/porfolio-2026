import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../SectionHeader";

export default function AboutSection() {
  return (
    <section className="bg-white py-24 px-6 lg:px-0 sm:py-28 lg:py-32">
<div className="max-w-350 mx-auto">
      <SectionHeader
        eyebrow="Bemutatkozás"
  title="Webfejlesztés modern technológiákkal"
  description="Modern frontend és full stack megoldások, átgondolt felépítéssel és letisztult vizuális szemlélettel."
        align="left"
        maxWidth="md"
      />

      <div className="mx-auto grid  gap-14 lg:grid-cols-[1.15fr_0.85fr]  ">
        {/* Bal oldal - kép */}
        <div className="order-1 flex justify-center lg:justify-start">
          <div className="relative w-full  border border-slate-200 bg-slate-50 shadow-[0_20px_60px_rgba(15,23,42,0.06)] ">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent" />

            <Image
              src="/about-devices.png"
              alt="Laptop és mobiltelefon webfejlesztéses felületekkel"
              width={1400}
              height={1000}
              className="h-auto w-full object-contain"
              priority={false}
            />
          </div>
        </div>

        {/* Jobb oldal - szöveg */}
        <div className="order-2 max-w-2xl">


          {/* <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-5xl">
            Modern webes felületek

            átgondolt fejlesztéssel
          </h2> */}

          <div className=" leading-8 text-slate-600 sm:text-lg">
            <p>
              Frontend és full stack webfejlesztőként modern, gyors és
              felhasználóbarát webes alkalmazásokat építek Reacttel,
              Next.js-szel és korszerű webes technológiákkal.
            </p>

            <p>
              Fontos számomra a letisztult vizuális megjelenés, a jó
              felhasználói élmény és az átlátható, jól karbantartható kód.
            </p>

            
          </div>

          <div className="mt-10">
            <Link
              href="/rolam"
              className="inline-flex items-center justify-center border border-sky-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-sky-700 transition hover:bg-sky-600 hover:text-white"
            >
              Bővebben rólam
            </Link>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}