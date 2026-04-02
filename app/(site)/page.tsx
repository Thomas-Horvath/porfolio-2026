import AboutSection from "@/app/components/AboutSection/AboutSection";
import ContactBanner from "@/app/components/ContactBanner/ContactBanner";
import FeaturedProjectsSection from "@/app/components/FeaturedProjectssection/FeaturedProjectsSection";
import Hero from "@/app/components/Hero/Hero";
import QuoteSection from "@/app/components/QupoteSection/QouteSection";

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
