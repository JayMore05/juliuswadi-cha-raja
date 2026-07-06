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
    <div className="relative flex items-center justify-center">

      {/* Giant Orange Glow */}

      <div className="absolute h-[850px] w-[850px] rounded-full bg-orange-300/20 blur-[170px]" />

      {/* Golden Glow */}

      <div className="absolute h-[650px] w-[650px] rounded-full bg-yellow-300/25 blur-[130px]" />

      {/* Decorative Ring */}

      <div className="absolute h-[700px] w-[700px] rounded-full border border-orange-200/40" />

      <div className="absolute h-[560px] w-[560px] rounded-full border border-orange-100/60" />

      {/* Main Image */}

      <Image
        src={
          settings?.hero_image ||
          "/images/ganpati.png"
        }
        alt="Ganpati Bappa"
        width={900}
        height={1100}
        priority
        className="
          relative
          z-20
          h-auto
          w-[380px]
          drop-shadow-[0_40px_80px_rgba(0,0,0,0.25)]
          transition-all
          duration-700
          hover:scale-105
          md:w-[520px]
          lg:w-[700px]
        "
      />

      {/* Blessing Card */}

      <div className="absolute left-0 top-24 z-30 rounded-3xl bg-white/90 px-6 py-4 shadow-2xl backdrop-blur">

        <p className="text-xl font-bold text-orange-600">
         
        </p>

      </div>

      {/* Morya Card */}

      <div className="absolute bottom-16 right-0 z-30 rounded-3xl bg-white/90 px-6 py-4 shadow-2xl backdrop-blur">

        <p className="text-xl font-bold text-orange-600">
          
        </p>

      </div>

      {/* Decorative Dot */}

      <div className="absolute left-8 bottom-20 h-5 w-5 rounded-full bg-orange-400 shadow-lg" />

      <div className="absolute right-12 top-20 h-6 w-6 rounded-full bg-yellow-400 shadow-lg" />

    </div>
  );
}