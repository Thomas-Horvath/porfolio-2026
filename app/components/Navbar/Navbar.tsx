"use client";


import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/useLanguage";

const Navbar = () => {
  const { t, language, switchLanguage } = useLanguage();

  const navLinks = [
    { name: t.navLinks.home, href: "/" },
    { name: t.navLinks.about, href: "/about" },
    { name: t.navLinks.projects, href: "/projects" },
    { name: t.navLinks.contact, href: "/contact" },
  ];

  return (
    <header className="w-full h-19 fixed top-0 left-0 z-50 bg-slate-50/90 backdrop-blur-sm border-b border-zinc-900/10">
      <div className="mx-auto h-full flex max-w-350 items-center justify-between px-6 own:px-0">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex items-center h-11 w-11 overflow-hidden rounded-xl bg-white/80 shadow-sm ring-1 ring-sky-100 backdrop-blur">
            <Image
              src="/logo.png"
              alt={t.navLogo.alt}
              fill
              className="object-contain p-1 pl-2 pt-2"
            />
          </div>

          <div className="hidden sm:block">
            <p className="text-base font-semibold tracking-tight text-slate-900">
              {t.navLogo.name}
            </p>
            <p className="text-xs text-slate-500">
              {t.navLogo.subTitle}
            </p>
          </div>
        </Link>

        <div className="flex h-full gap-2">
          <nav className="hidden h-full items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="h-full flex items-center px-4 text-md font-medium text-slate-800 transition hover:text-sky-600"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center h-10 m-auto">
            <button
              onClick={() =>
                switchLanguage(language === "hu" ? "en" : "hu")
              }
              className="cursor-pointer rounded-full border border-sky-100 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
            >
              {language === "hu" ? "EN" : "HU"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;