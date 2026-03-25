'use client';
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useLanguage } from "@/contexts/useLanguage";





const socialItems = [
  { label: "GitHub", href: "#", icon: <FaGithub size={15} /> },
  { label: "LinkedIn", href: "#", icon: <FaLinkedinIn size={15} /> },
];

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const navItems = [
    { name: t.navLinks.home, href: "/" },
    { name: t.navLinks.about, href: "/about" },
    { name: t.navLinks.projects, href: "/projects" },
    { name: t.navLinks.contact, href: "/contact" },
];

  return (
    <footer className="relative overflow-hidden  bg-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-sky-300 to-transparent" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-sky-300/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-52 w-52 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-350 px-6 own:px-0 py-10  lg:py-12">
        {/* felső sor */}
        <div className="flex flex-col gap-8 border-b border-slate-200 pb-8 lg:flex-row lg:items-start lg:justify-between">
          {/* brand */}
          <div className="flex items-start gap-4">
            <Image
              src="/logo.png"
              alt="Horváth Tamás logó"
              width={56}
              height={56}
              className="h-16 w-16 object-contain"
            />

            <div className="leading-tight">
              <p className="text-lg font-semibold tracking-[0.06em] text-slate-900">
                {t.homePage.name}
              </p>
              <p className="text-[14px] font-medium tracking-[0.14em] text-sky-600">
                {t.homePage.profession}
              </p>
            </div>
          </div>

          {/* nav + social */}
          <div className="flex flex-col gap-6 lg:items-end">
            <nav className="flex flex-col md:flex-row gap-x-6 gap-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-md text-slate-600 transition hover:text-sky-600"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              {socialItems.map((item) => (
                <SocialIcon key={item.label} href={item.href} label={item.label}>
                  {item.icon}
                </SocialIcon>
              ))}
            </div>

          </div>
        </div>

        {/* alsó sor */}
        <div className="flex flex-col gap-4 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {t.homePage.name}. {t.footer.additionalText}</p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/imprint"
              className="transition hover:text-slate-700"
            >
              {t.footer.impressum}
            </Link>
            <Link
              href="/privacy"
              className="transition hover:text-slate-700"
            >
              {t.footer.policy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
    >
      {children}
    </Link>
  );
}