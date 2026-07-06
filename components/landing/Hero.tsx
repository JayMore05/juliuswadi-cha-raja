"use client";

import { usePublicSettings } from "@/hooks/usePublicSettings";
import HeroBackground from "./HeroBackground";
import HeroParticles from "./HeroParticles";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  const { settings } = usePublicSettings();

  return (
    <section className="relative overflow-hidden bg-[#FFF8F2]">
      {/* Background */}
      <HeroBackground />

      {/* Floating particles */}
      <HeroParticles />

      <div className="relative z-20 mx-auto max-w-7xl px-5 pt-24 pb-16">

        {/* Mobile = Image First | Desktop = Text Left + Image Right */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">

          {/* IMAGE */}
          <div className="order-1 flex justify-center lg:order-2">
            <HeroImage settings={settings} />
          </div>

          {/* CONTENT */}
          <div className="order-2 lg:order-1">
            <HeroContent settings={settings} />
          </div>

        </div>

      </div>
    </section>
  );
}