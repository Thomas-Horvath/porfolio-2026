export default function QuoteSection() {
  return (
    <section className=" ">
      <div className="mx-auto w-full">
        <div className="relative overflow-hidden  bg-gradient-to-r from-sky-600/60 via-sky-500/60 to-blue-500/60 px-6 py-10 shadow-[0_20px_60px_rgba(14,165,233,0.18)] sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div className="pointer-events-none absolute left-32 top-2 text-[120px] font-semibold leading-none text-white/20 sm:left-10 sm:text-[150px]">
            “
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <blockquote className="text-xl font-medium leading-relaxed text-gray-6 sm:text-2xl lg:text-3xl lg:leading-relaxed">
              Ne csak dolgozz, alkoss is valamit. Az igazi siker abban rejlik,
              ha szereted, amit csinálsz.
            </blockquote>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-gray-800/80 sm:text-base">
              — Dale Carnegie
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}