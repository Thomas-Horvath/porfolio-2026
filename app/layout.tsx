import type { Metadata } from "next";
import { Manrope, Inter, Space_Grotesk } from "next/font/google"
import "./globals.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import PageUpBtn from "./components/PageUpBtn/PageUpBtn";
import { LanguageProvider } from "@/contexts/LanguageContext";
import SeoUpdater from "./components/SeoUpdater";

const manrope = Manrope({
  subsets: ["latin"],
})
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});



export const metadata: Metadata = {
  title: "ThomasHorvath.hu",
  description: "Horváth Thomas webfejlesztő portfóliója és szolgáltatásai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body
        className={` ${inter.variable} ${spaceGrotesk.variable} min-w-87.5 antialiased min-h-screen  bg-zinc-100 text-zinc-950`}
      >
        <LanguageProvider>
          <SeoUpdater />
          <div className="relative min-h-screen overflow-hidden">

            {/* BACKGROUND IMAGE */}
            <div className="absolute inset-0 bg-fixed bg-cover -mt-22 bg-top bg-no-repeat bg-[url('/body-bg2.png')]" />




            <Navbar />

            {/* PAGE CONTENT */}
            <div className="relative z-10">
              {children}
            </div>

          </div>
          <Footer />
          <PageUpBtn />
        </LanguageProvider>
      </body>
    </html >
  );
}
