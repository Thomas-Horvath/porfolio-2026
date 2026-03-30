"use client";


import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/useLanguage";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import FlagIcon from "./FlagIcon";

const Navbar = () => {
  const { t, language, switchLanguage } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: t.navLinks.home, href: "/" },
    { name: t.navLinks.about, href: "/about" },
    { name: t.navLinks.projects, href: "/projects" },
    { name: t.navLinks.contact, href: "/contact" },
  ];


  const HandleHamburger = () => {
    setIsMenuOpen(!isMenuOpen);
  }


  return (
    <header className="fixed left-0 top-0 z-20
                       h-19 w-full
                       bg-slate-50/90 border-b border-zinc-900/10
                       backdrop-blur-xl">


      {/* navbar wrapper */}
      <div className="flex items-center justify-between mx-auto h-full max-w-350 px-6 own:px-0">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3"
          onClick={(e) => {
            if (pathname === "/") e.preventDefault();
            setIsMenuOpen(false);
          }}
        >
          <div className="flex items-center overflow-hidden relative
                          h-11 rounded-xs w-11
                          bg-white/80 ring-1 ring-sky-100 shadow-sm
                          backdrop-blur">
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


        {/* Desktop Navigation */}
        <div className="flex h-full gap-2">

          {/* Navigation Links */}
          <nav className="hidden items-center md:flex h-full gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => {
                    if (isActive) e.preventDefault();
                  }}
                  className={`flex items-center relative
                              h-full px-4
                              font-medium
                              hover:text-sky-600
                              transition
                              ${isActive ? "text-sky-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:w-full after:h-0.5 after:bg-sky-500" : "text-slate-800"}
                              text-md`}>
                  {link.name}
                </Link>);
            })}
          </nav>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center h-10 m-auto">
            <button
              onClick={() =>
                switchLanguage(language === "hu" ? "en" : "hu")
              }
              className="relative overflow-hidden px-4 py-1 
             font-medium text-sm w-16
             shadow-sm
             backdrop-blur
             cursor-pointer transition
             text-slate-700
             bg-white/80 hover:bg-white"
            >
              {/* FLAG BACKGROUND */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.2] pointer-events-none z-1">
                <div className="w-full h-full ">
                  <FlagIcon lang={language === "hu" ? "en" : "hu"} />
                </div>
              </div>
              <span className="relative z-10 font-medium text-lg text-slate-900">
                {language === "hu" ? "EN" : "HU"}
              </span>
            </button>
          </div>



        </div>



        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden h-screen absolute top-19 left-0 right-0 bg-white border-b-2  border-sky-600/50 ">
            <div className="shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-md">
              <nav className="flex flex-col p-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={(e) => {
                        if (isActive) e.preventDefault();
                        setIsMenuOpen(false);
                      }}
                      className={`group flex items-center justify-between px-4 py-4 font-medium tracking-tight transition border-b-2 border-slate-100 
                ${isActive
                          ? "bg-sky-600 text-white"
                          : "text-slate-800 hover:bg-slate-50 hover:text-sky-700"
                        }`}
                    >
                      <span>{link.name}</span>

                      <span
                        className={`h-2.5 w-2.5 shrink-0 transition duration-300 ${isActive
                          ? "bg-sky-400 scale-125"
                          : "bg-slate-300 group-hover:bg-sky-400"
                          }`}
                      />
                    </Link>
                  );
                })}
              </nav>

              <div className="border-t border-slate-200 px-4 py-4">
                <button
                  onClick={() => {
                    switchLanguage(language === "hu" ? "en" : "hu"),
                    setIsMenuOpen(false);
                  }}

                  className="inline-flex cursor-pointer w-full items-center justify-center border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-medium text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                >
                  {language === "hu" ? "EN" : "HU"}
                  <div className="ml-3 w-10 h-6 opacity-[0.5] pointer-events-none ">
                    <div className="w-full h-full ">
                      <FlagIcon lang={language === "hu" ? "en" : "hu"} />
                    </div>
                  </div>

                </button>
              </div>
            </div>
          </div>


        )}

        {/* Mobile Menu Button */}
        <button className="flex items-center justify-end md:hidden h-full w-fill cursor-pointer" onClick={HandleHamburger}>
          {isMenuOpen ?

            <IoCloseSharp className="text-5xl text-sky-600" />
            :
            <GiHamburgerMenu className="text-5xl text-sky-600" />
          }
        </button>


      </div>
    </header>
  );
};

export default Navbar;