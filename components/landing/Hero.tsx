"use client";

import { Settings } from "@/lib/services/settings";
import HeroBackground from "./HeroBackground";
import HeroParticles from "./HeroParticles";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

interface HeroProps {
  settings: Settings | null;
}

export default function Hero({
  settings,
}: HeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FFF8F2]">

      {/* Background */}
      <HeroBackground />

      {/* Decorative Particles */}
      <HeroParticles />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-32 pb-16 lg:px-10">

        <div className="grid w-full items-center gap-12 lg:grid-cols-[45%_55%]">

          {/* Left Side */}
          <HeroContent settings={settings} />

          {/* Right Side */}
          <HeroImage settings={settings} />

        </div>

      </div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-[#FFF8F2] to-transparent" />

    </section>
  );
}