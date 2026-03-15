// components/Footer.tsx
import Image from "next/image";
import Link from "next/link";

import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

let navItems = [
    { label: "Főoldal", href: "/" },
    { label: "Rólam", href: "/rolam" },];



export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative border-t border-zinc-900/70 bg-white/70">
            {/* finom glow a jobb oldalon */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute right-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl -top-24" />
            </div>

            <div className="relative mx-auto max-w-350 px-6 py-16">
                <div className="grid md:grid-cols-12 gap-12">
                    {/* BRAND */}
                    <div className="md:col-span-5">
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src="/logo.png"
                                alt="Emberline Tattoo logó"
                                width={140}
                                height={140}
                                className="h-14 w-14"
                            />
                            <div className="leading-none">
                                <div className="text-lg font-semibold tracking-[0.18em]">
                                    Horváth
                                </div>
                                <div className="text-xs font-medium tracking-[0.22em] text-blue-600">
                                    TAmás
                                </div>
                            </div>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-6 text-zinc-900">
                            Egy alkotói tér, ahol a történetek formát kapnak. Sötét tónusok,
                            tiszta kompozíciók, nyugodt és precíz kivitelezés.
                        </p>

                        {/* Social */}
                        <div className="flex items-center mt-6 gap-3">
                            <div className="flex items-center mt-6 gap-3">
                                <SocialIcon href="#" label="Instagram">
                                    <FaInstagram size={16} />
                                </SocialIcon>

                                <SocialIcon href="#" label="Facebook">
                                    <FaFacebookF size={14} />
                                </SocialIcon>

                                <SocialIcon href="#" label="TikTok">
                                    <FaTiktok size={14} />
                                </SocialIcon>
                            </div>
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div className="md:col-span-3">
                        <h3 className="text-xs font-semibold tracking-[0.26em] text-zinc-900">
                            GYORS LINKEK
                        </h3>

                        <ul className="mt-4 space-y-2 text-sm">
                            {navItems.map((l) => (
                                <li key={l.href}>
                                    <Link
                                        href={l.href}
                                        className="hover:text-orange-400 transition text-zinc-900"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* KAPCSOLAT */}
                    <div className="md:col-span-4">
                        <h3 className="text-xs font-semibold tracking-[0.26em] text-zinc-900">
                            KAPCSOLAT
                        </h3>

                        <div className="relative overflow-hidden mt-4 space-y-2">


                            {/* Telefonszám */}
                            <div className="flex items-center gap-3">
                                <p className="block w-18 text-xs tracking-[0.22em] text-zinc-400">
                                    TELEFON
                                </p>
                                <a
                                    href="tel:+36303820891"
                                    className="text-sm hover:text-orange-400 transition text-zinc-200"
                                >
                                    +36 30 123 4567
                                </a>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-3">
                                <p className="block w-18 text-xs tracking-[0.22em] text-zinc-400">
                                    EMAIL
                                </p>
                                <a
                                    href="mailto:info@emberlinetattoo.hu"
                                    className="text-sm hover:text-orange-400 transition text-zinc-200"
                                >
                                    info@emberlinetattoo.hu
                                </a>
                            </div>

                            {/* Nyitvatartás */}
                            <div className="mt-6 pt-5 border-t border-zinc-800/70">
                                <p className="text-xs tracking-[0.22em] text-zinc-400">
                                    NYITVATARTÁS
                                </p>
                                <div className="flex items-center mt-3 gap-3">
                                    <p className="text-sm text-zinc-300">
                                        Hétfő – Vasárnap
                                    </p>
                                    <p className="text-sm text-orange-400">
                                        12:00 – 20:00
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* bottom bar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between
                                gap-3 mt-12 pt-6
                                border-t border-zinc-800/70">
                    <p className="text-xs text-zinc-500">
                        © {year} Emberline Tattoo. Minden jog fenntartva.
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs">
                        <Link href="/adatkezeles" className="transition text-zinc-500 hover:text-zinc-200">
                            Adatkezelés
                        </Link>
                        <Link href="/ASZF" className="transition text-zinc-500 hover:text-zinc-200">
                            ÁSZF
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}




function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            aria-label={label}
            className="inline-flex items-center justify-center
                       h-10 rounded-lg w-10
                       bg-zinc-950/40 border border-zinc-800/70 hover:bg-zinc-950/60
                       hover:border-orange-500/40
                       transition
                        hover:text-orange-400 text-zinc-300"
        >
            {children}
        </Link>
    );
}