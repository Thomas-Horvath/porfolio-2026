'use client';

import { useLanguage } from "@/contexts/useLanguage";
import Link from "next/link";

const page = () => {
  const { t } = useLanguage();
  return (
    <section className="flex min-h-screen max-w-350 m-auto flex-col items-center justify-center px-4 py-24 sm:py-28 own:px-0 lg:py-32">
      <h1 className="text-4xl mb-6 font-bold text-slate-800 ">{t.impressum.main_title}</h1>
      <div className="max-w-110 w-full bg-slate-50 border border-slate-200 rounded-lg p-6 mb-4">
        <h2 className="text-2xl font-semibold my-4 text-sky-600">{t.impressum.page_owner.title}</h2>
        <div className="flex flex-col justify-between sm:flex-row"><strong>{t.impressum.page_owner.name}</strong><p>Horváth Tamás</p></div>
        <div className="flex flex-col justify-between sm:flex-row"><strong>{t.impressum.page_owner.address}</strong><p>2013 Pomáz, Példa utca</p></div>
        <div className="flex flex-col justify-between sm:flex-row"><strong>{t.impressum.page_owner.phone}</strong><p>06-1-123-4567</p></div>
        <div className="flex flex-col justify-between sm:flex-row"><strong>{t.impressum.page_owner.email}</strong><p>info@sajatdomainnevem.hu</p></div>
      </div>

      <div className="max-w-110 w-full bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold my-4 text-sky-600">{t.impressum.hosting_provider.title}</h2>
        <div className="flex flex-col justify-between sm:flex-row"><strong>{t.impressum.hosting_provider.company_name}</strong><p> Nethely Kft.</p></div>
        <div className="flex flex-col justify-between sm:flex-row"><strong>{t.impressum.hosting_provider.company_address}</strong><p>1115 Budapest, Halmi utca 29.</p></div>
        <div className="flex flex-col justify-between sm:flex-row"><strong>{t.impressum.hosting_provider.branch_office}</strong><p> 6724 Szeged, Teréz utca 34.</p></div>
        <div className="flex flex-col justify-between sm:flex-row"><strong>{t.impressum.hosting_provider.website}</strong><p> <Link className="text-sky-500 underline hover:text-sky-700" href="https://www.nethely.hu" target="_blank">https://www.nethely.hu</Link></p></div>
        <div className="flex flex-col justify-between sm:flex-row"><strong>{t.impressum.hosting_provider.contact_page}</strong><p> <Link className="text-sky-500 underline hover:text-sky-700" href="https://www.nethely.hu/rolunk" target="_blank">https://www.nethely.hu/rolunk</Link></p></div>
      </div>
    </section>
  )
}

export default page
