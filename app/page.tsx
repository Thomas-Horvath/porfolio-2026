import Hero from "@/app/components/Hero/Hero";
import AboutSection from "./components/AboutSection/AboutSection";
import QuoteSection from "./components/QupoteSection/QouteSection";
import FeaturedProjectsSection from "./components/FeaturedProjectssection/FeaturedProjectsSection";
import ContactBanner from "./components/ContactBanner/ContactBanner";

export default function Home() {
  return (
    <div>
      {/* <div className="block w-full h-20 text-zinc-300 font-bold text-3xl bg-gradient-to-r from-blue-600 to-cyan-500">Kapcsolat</div>
    */}
      <Hero />
      <AboutSection />
      <QuoteSection />
      <FeaturedProjectsSection />
      <ContactBanner />
    </div>
  );
}
