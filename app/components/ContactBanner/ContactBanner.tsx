import Link from "next/link";

export default function ContactBanner() {
  return (
    <section className="px-4 py-20 lg:px-10 border-sky-500 bg-gradient-to-r from-sky-600/80 via-sky-500/80 to-blue-500/80">
      <div className="mx-auto max-w-350">
        <div className=" border-sky-500  px-4 py-10 lg:px-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.20fr_0.80fr]">

            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Készítsünk valami igazán jó webes megoldást együtt!
              </h2>

              <p className="mt-4 text-base leading-8 text-white/90 sm:text-lg">
                Ha modern, gyors és letisztult webes megoldást keresel,
                szívesen segítek megvalósítani az elképzeléseidet.
              </p>
            </div>



            <div className="flex justify-center w-full ">
              <div className="w-full lg:w-fit border border-white/20 bg-white/20 px-4 lg:px-18 py-5 backdrop-blur-sm ">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                  Kapcsolat
                </p>

                <p className="mt-2 text-sm leading-6 text-white/90">
                  Beszéljünk a következő projektedről.
                </p>

                <div className="mt-5">
                  <Link
                    href="/kapcsolat"
                    className="btn btn-white"
                  >
                    Kapcsolatfelvétel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}