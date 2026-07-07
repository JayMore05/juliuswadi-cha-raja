import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/landing/Footer";

import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import Timeline from "@/components/about/Timeline";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFF8F2]">
      {/* Navbar */}

      <Navbar />

      {/* Hero */}

      <AboutHero />

      {/* Story */}

      <OurStory />

      {/* Timeline */}

      <Timeline />

      {/* Features */}

      <WhyChooseUs />

      {/* CTA */}

      <AboutCTA />

      {/* Footer */}

      <Footer />
    </main>
  );
}