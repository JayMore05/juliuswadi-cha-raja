"use client";

import HeroBackground from "./HeroBackground";
import HeroEffects from "./HeroEffects";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import FloatingPetals from "./FloatingPetals";
import Mandala from "./Mandala";

export default function Hero() {
  return (
    <section className="relative bg-[#FFF8F2]">
      {/* Background Effects */}
      <HeroBackground />
      <HeroEffects />
      <Mandala />
      <FloatingPetals />

      <div
        className="
          relative
          z-20
          mx-auto
          flex
          min-h-screen
          max-w-7xl
          items-center
          px-6
          pt-36
          pb-20
        "
      >
        {/* Desktop = 2 Columns | Mobile = 1 Column */}

        <div
          className="
            grid
            w-full
            grid-cols-1
            items-center
            gap-14

            lg:grid-cols-2
          "
        >
          {/* Left */}

          <div
  className="
    order-2
    lg:order-1

    lg:-mt-10
  "
>
  <HeroContent />
</div>
          {/* Right */}

      <div
  className="
    order-1
    flex
    justify-center

    lg:order-2
    lg:justify-end

    lg:-translate-y-14
    xl:-translate-y-20
    2xl:-translate-y-24

    transition-transform
    duration-500
  "
>
  <HeroImage />
</div>
        </div>
      </div>
    </section>
  );
}