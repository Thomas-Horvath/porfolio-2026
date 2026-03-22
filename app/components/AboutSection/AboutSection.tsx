'use client';
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../SectionHeader";
import { useLanguage } from "@/contexts/useLanguage";

export default function AboutSection() {
    const { t } = useLanguage();
  return (
    <section className=" bg-white py-24 px-6 lg:px-0 sm:py-28 lg:py-32">
      <div className="max-w-350 mx-auto">
        <SectionHeader
          eyebrow={t.aboutSection.headeringTitle}
          title={t.aboutSection.headeringSubtitle}
          description={t.aboutSection.headeringSpan}
          align="left"
          maxWidth="md"
        />

        <div className="mx-auto grid  gap-14 lg:grid-cols-[1.15fr_0.85fr]  ">
          {/* Bal oldal - kép */}
          <div className="order-1 flex justify-center lg:justify-start">
            <div className="relative w-full">
              <div className="absolute inset-x-8 top-0 h-px" />

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




            <div className=" leading-8 text-slate-600 sm:text-lg">
              <p>
             {t.aboutSection.p1}
              </p>

              <p>
                {t.aboutSection.p2}
              </p>


            </div>

            <div className="mt-10">
              <Link
                href="/about"
                className="btn btn-white-blue"
              >
               { t.aboutSection.button}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}