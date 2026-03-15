import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ThomasHorvath.hu - Webfejlesztés",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen  bg-zinc-100 text-zinc-950`}
      >
        <div className="relative min-h-screen overflow-hidden">

          {/* BACKGROUND IMAGE */}
          <div className="absolute inset-0 bg-fixed bg-cover -mt-22 bg-top bg-no-repeat bg-[url('/bg3.png')]" />


          <Navbar />

          {/* PAGE CONTENT */}
          <div className="relative z-10">
            {children}
          </div>

        </div>
        <Footer />
      </body>
    </html>
  );
}
