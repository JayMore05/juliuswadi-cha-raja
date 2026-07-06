"use client";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FFF8F2]">

      <HeroBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-24 pb-10 lg:px-12">

        <div className="grid w-full items-center gap-8 lg:grid-cols-[46%_54%]">

          {/* Left */}

          <div className="order-2 lg:order-1">
            <HeroContent />
          </div>

          {/* Right */}

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <HeroImage />
          </div>

        </div>

      </div>

    </section>
  );
}