'use client';

import { useLanguage } from "@/contexts/useLanguage";

const page = () => {
  const { t } = useLanguage();
  return (
    <section className="flex min-h-screen max-w-350 m-auto flex-col items-center justify-center px-4 py-24 sm:py-28 own:px-0 lg:py-32">
      <h1 className="text-4xl mb-6 font-bold text-slate-800 ">{t.policy.main_title}</h1>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold my-4 text-sky-600">{t.policy.wrapper_content[0].title}</h2>

        <p className="text-slate-600">{t.policy.wrapper_content[0].content}</p>

        <h2 className="text-2xl font-semibold my-4 text-sky-600">{t.policy.wrapper_content[1].title}</h2>

        <p className="text-slate-600">{t.policy.wrapper_content[1].content}</p>

        <h2 className="text-2xl font-semibold my-4 text-sky-600">{t.policy.wrapper_content[2].title}</h2>

        <p className="text-slate-600">{t.policy.wrapper_content[2].content}</p>

        <h2 className="text-2xl font-semibold my-4 text-sky-600">{t.policy.wrapper_content[3].title}</h2>

        <p className="text-slate-600">{t.policy.wrapper_content[3].content}</p>
      </div>

    </section>

  )
}

export default page
