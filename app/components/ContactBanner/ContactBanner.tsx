import Link from "next/link";

export default function ContactBanner() {
  return (
    <section className="px-6 lg:px-0  py-20 ">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative overflow-hidden border border-sky-500 bg-gradient-to-r from-sky-600 via-sky-500 to-blue-500 px-8 py-16 shadow-[0_30px_80px_rgba(14,165,233,0.25)] sm:px-14 lg:px-20">
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
          
          {/* finom fény effekt */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)]" />

          <div className="relative mx-auto max-w-3xl text-center">
            
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Van egy projekt ötleted?
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/90">
              Ha modern, gyors és letisztult webes megoldást keresel,
              szívesen segítek megvalósítani az elképzeléseidet.
            </p>

            <div className="mt-10 flex justify-center">
              <Link
                href="/kapcsolat"
                className="inline-flex items-center justify-center border border-white bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-sky-700 transition hover:bg-transparent hover:text-white"
              >
                Kapcsolatfelvétel
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}