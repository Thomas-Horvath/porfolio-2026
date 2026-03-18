import { FaQuoteRight } from "react-icons/fa";


export default function QuoteSection() {
  return (
    <section>
      <div className="w-full px-6 lg:px-0 bg-gradient-to-r from-sky-600/80 via-sky-500/80 to-blue-500/80 px-10 py-14">

        <div className="relative max-w-350 mx-auto overflow-hidden border-l-4 border-white/20 pl-6 ">

          <div className="pointer-events-none  text-4xl text-white/70 mb-4">
            <FaQuoteRight />
          </div>

          <blockquote className=" max-w-3xl text-3xl italic font-semibold tracking-wide text-white leading-relaxed">
            Ne csak dolgozz, alkoss is valamit. Az igazi siker abban rejlik,
            ha szereted, amit csinálsz.
          </blockquote>

          <p className="mt-6 text-lg uppercase tracking-[0.18em] text-white/70">
            — Dale Carnegie
          </p>

        </div>
      </div>
    </section>
  );
}