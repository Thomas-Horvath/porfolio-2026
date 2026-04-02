import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import PageUpBtn from "./components/PageUpBtn/PageUpBtn";
import { LanguageProvider } from "@/contexts/LanguageContext";


const inter = localFont({
  src: [
    {
      path: "./fonts/Inter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Inter-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Inter-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Inter-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: [
    {
      path: "./fonts/SpaceGrotesk-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SpaceGrotesk-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SpaceGrotesk-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/SpaceGrotesk-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});



export const metadata: Metadata = {
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
          <div className="relative min-h-screen overflow-hidden">
            <div className="absolute inset-0 bg-fixed bg-cover -mt-22 bg-top bg-no-repeat bg-[url('/body-bg2.png')]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.12),transparent_30%)]" />

            <Navbar />

            <div className="relative">{children}</div>
          </div>
          <Footer />
          <PageUpBtn />
        </LanguageProvider>
      </body>
    </html >
  );
}
