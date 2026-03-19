import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const navItems = [
  { label: "Főoldal", href: "/" },
  { label: "Rólam", href: "/about" },
  { label: "Munkák", href: "/projects" },
  { label: "Kapcsolat", href: "/contact" },
];

const socialItems = [
  { label: "GitHub", href: "#", icon: <FaGithub size={15} /> },
  { label: "LinkedIn", href: "#", icon: <FaLinkedinIn size={15} /> },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden  bg-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-sky-300/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-52 w-52 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-12">
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
                Horváth Tamás
              </p>
              <p className="text-[14px] font-medium tracking-[0.14em] text-sky-600">
                Frontend / Full Stack Developer
              </p>
            </div>
          </div>

          {/* nav + social */}
          <div className="flex flex-col gap-6 lg:items-end">
            <nav className="flex flex-wrap gap-x-6 gap-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-md text-slate-600 transition hover:text-sky-600"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              {/* <a
                href="mailto:info@thomashorvath.hu"
                className="text-sm text-slate-600 transition hover:text-sky-600"
              >
                info@thomashorvath.hu
              </a> */}

              {/* <div className="h-4 w-px bg-slate-200" /> */}

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
          <p>© {year} Horváth Tamás. Minden jog fenntartva.</p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/impresszum"
              className="transition hover:text-slate-700"
            >
              Impresszum
            </Link>
            <Link
              href="/adatvedelem"
              className="transition hover:text-slate-700"
            >
              Adatvédelem
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