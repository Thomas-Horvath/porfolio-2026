'use client';
import { FaQuoteRight } from "react-icons/fa";
import { useLanguage } from "@/contexts/useLanguage";


export default function QuoteSection() {
  const { t } = useLanguage();
  return (
    <section>
      <div className="w-full own:px-0 bg-linear-to-r from-sky-600/80 via-sky-500/80 to-blue-500/80 px-6 py-14">

        <div className="relative max-w-350 mx-auto overflow-hidden border-l-4 border-white/20 pl-6 ">

          <div className="pointer-events-none  text-4xl text-white/70 mb-4">
            <FaQuoteRight />
          </div>

          <blockquote className=" max-w-3xl text-3xl italic font-semibold tracking-wide text-white leading-relaxed">
           {t.quote}
          </blockquote>

          <p className="mt-6 text-lg uppercase tracking-[0.18em] text-white/70">
            — Dale Carnegie
          </p>

        </div>
      </div>
    </section>
  );
}