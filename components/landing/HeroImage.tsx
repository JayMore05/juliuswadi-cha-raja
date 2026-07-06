"use client";

import Image from "next/image";
import { Settings } from "@/lib/services/settings";

interface HeroImageProps {
  settings: Settings | null;
}

export default function HeroImage({
  settings,
}: HeroImageProps) {
  return (
    <div className="relative flex items-center justify-center mt-10 lg:mt-0">

      {/* Background Glow */}

      <div className="absolute h-[320px] w-[320px] rounded-full bg-orange-300/20 blur-[80px] sm:h-[450px] sm:w-[450px] lg:h-[850px] lg:w-[850px] lg:blur-[170px]" />

      <div className="absolute h-[260px] w-[260px] rounded-full bg-yellow-300/20 blur-[60px] sm:h-[360px] sm:w-[360px] lg:h-[650px] lg:w-[650px] lg:blur-[130px]" />

      {/* Rings */}

      <div className="absolute hidden lg:block h-[700px] w-[700px] rounded-full border border-orange-200/40" />

      <div className="absolute hidden lg:block h-[560px] w-[560px] rounded-full border border-orange-100/60" />

      {/* Image */}

      <Image
        src={settings?.hero_image || "/images/ganpati.png"}
        alt="Ganpati Bappa"
        width={900}
        height={1100}
        priority
        className="
          relative
          z-20
          h-auto
          w-[260px]
          sm:w-[320px]
          md:w-[450px]
          lg:w-[650px]
          object-contain
          drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]
          transition-transform
          duration-500
          hover:scale-105
        "
      />

      {/* Decorative Dots */}

      <div className="absolute left-5 bottom-10 h-3 w-3 rounded-full bg-orange-500 lg:h-5 lg:w-5" />

      <div className="absolute right-6 top-6 h-4 w-4 rounded-full bg-yellow-400 lg:h-6 lg:w-6" />

    </div>
  );
}