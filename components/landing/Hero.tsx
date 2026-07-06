"use client";

import { usePublicSettings } from "@/hooks/usePublicSettings";
import HeroBackground from "./HeroBackground";
import HeroParticles from "./HeroParticles";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  const { settings } = usePublicSettings();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FFF8F2]">
      {/* Background */}
      <HeroBackground />

      {/* Decorative Particles */}
      <HeroParticles />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-16 pt-32 lg:px-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[45%_55%]">
          {/* Left */}
          <HeroContent settings={settings} />

          {/* Right */}
          <HeroImage settings={settings} />
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-[#FFF8F2] to-transparent" />
    </section>
  );
}