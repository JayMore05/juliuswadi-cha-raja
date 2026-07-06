"use client";

import { Heart, Bell, Sparkles } from "lucide-react";
import PremiumButton from "@/components/ui/PremiumButton";
import { Settings } from "@/lib/services/settings";

interface HeroContentProps {
  settings: Settings | null;
}

export default function HeroContent({
  settings,
}: HeroContentProps) {
  return (
    <div className="relative z-20 flex flex-col items-center text-center lg:items-start lg:text-left">

      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/90 px-5 py-2 shadow-lg">
        <Sparkles size={18} className="text-orange-500" />
        <span className="font-semibold text-orange-700 text-sm sm:text-base">
          ॐ श्री गणेशाय नमः
        </span>
      </div>

      {/* Marathi Heading */}
      <h1 className="leading-none">

        <span className="block text-[48px] font-black text-[#5E120F] sm:text-[64px] lg:text-[90px]">
          {settings?.marathi_name || "जुलेशवाडीचा"}
        </span>

        <span className="mt-2 block text-[48px] font-black text-orange-600 sm:text-[64px] lg:text-[90px]">
          राजा
        </span>

      </h1>

      {/* English Title */}
      <h2 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-5xl">
        {settings?.mandal_name || "Juliuswadi Cha Raja"}
      </h2>

      {/* Divider */}
      <div className="mt-6 flex items-center gap-3">
        <div className="h-1 w-16 rounded-full bg-orange-500" />
        <div className="h-3 w-3 rounded-full bg-orange-500" />
        <div className="h-1 w-20 rounded-full bg-orange-200" />
      </div>

      {/* Years */}
      <div className="mt-6 rounded-full bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-100 px-6 py-3 shadow-lg">
        <span className="text-lg font-bold text-orange-700">
          🎉 {settings?.years || 42}+ Years of Devotion
        </span>
      </div>

      {/* Description */}
      <p className="mt-8 max-w-xl text-base leading-8 text-gray-700 sm:text-lg">
        {settings?.hero_subtitle ||
          "Join thousands of devotees in celebrating Lord Ganesha with faith, tradition, unity and devotion."}
      </p>

      {/* Buttons */}
      <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">

        <PremiumButton href="/donation">
          <div className="flex items-center justify-center gap-2">
            <Heart size={20} />
            Donate Now
          </div>
        </PremiumButton>

        <PremiumButton href="/updates" variant="secondary">
          <div className="flex items-center justify-center gap-2">
            <Bell size={20} />
            Live Updates
          </div>
        </PremiumButton>

      </div>

    </div>
  );
}