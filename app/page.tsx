import Hero from "@/app/components/Hero/Hero";
import AboutSection from "./components/AboutSection/AboutSection";
import QuoteSection from "./components/QupoteSection/QouteSection";
import FeaturedProjectsSection from "./components/FeaturedProjectssection/FeaturedProjectsSection";
import ContactBanner from "./components/ContactBanner/ContactBanner";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <QuoteSection />
      <FeaturedProjectsSection />
      <ContactBanner />
    </div>
  );
}
