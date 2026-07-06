"use client";

import Image from "next/image";
import { usePublicSettings } from "@/hooks/usePublicSettings";

export default function HeroImage() {
  const { settings } = usePublicSettings();

  return (
    <div className="relative flex items-center justify-center">

      {/* Background Glow */}
      <div className="absolute h-[900px] w-[900px] rounded-full bg-orange-300/20 blur-[180px]" />

      <div className="absolute h-[650px] w-[650px] rounded-full bg-yellow-300/30 blur-[120px]" />

      {/* Decorative Rings */}
      <div className="absolute h-[760px] w-[760px] rounded-full border border-orange-200/40" />

      <div className="absolute h-[620px] w-[620px] rounded-full border border-orange-100/60" />

      {/* Decorative Dots */}
      <div className="absolute left-8 top-16 h-6 w-6 rounded-full bg-orange-400 shadow-lg" />

      <div className="absolute right-10 top-32 h-4 w-4 rounded-full bg-yellow-500 shadow-lg" />

      <div className="absolute bottom-24 left-12 h-5 w-5 rounded-full bg-orange-300 shadow-lg" />

      <div className="absolute bottom-10 right-20 h-8 w-8 rounded-full bg-orange-500/70 shadow-xl" />

      {/* Main Image */}
      <div className="relative z-10 transition-all duration-700 hover:scale-105">

        <Image
          src={settings?.hero_image || "/images/ganpati.png"}
          alt="Ganpati Bappa"
          width={750}
          height={900}
          priority
          className="h-auto w-[360px] drop-shadow-[0_40px_80px_rgba(0,0,0,0.25)] md:w-[480px] lg:w-[650px]"
        />

      </div>

      {/* Floating Blessing Card */}
      <div className="absolute -left-4 top-24 rounded-2xl bg-white/95 px-6 py-4 shadow-2xl backdrop-blur">

        <p className="text-lg font-bold text-orange-600">
          🙏 Ganpati Bappa
        </p>

      </div>

      {/* Floating Morya Card */}
      <div className="absolute -right-2 bottom-20 rounded-2xl bg-white/95 px-6 py-4 shadow-2xl backdrop-blur">

        <p className="text-lg font-bold text-orange-600">
          ❤️ Morya
        </p>

      </div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 h-48 w-full bg-gradient-to-t from-[#FFF8F2] to-transparent" />

    </div>
  );
}