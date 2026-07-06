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
    <div className="relative z-20 flex flex-col items-start">

      {/* Badge */}

      <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-orange-200 bg-white/80 px-6 py-3 shadow-lg backdrop-blur">

        <Sparkles
          size={18}
          className="text-orange-500"
        />

        <span className="font-semibold text-orange-700">
          ॐ श्री गणेशाय नमः
        </span>

      </div>

      {/* Marathi Heading */}

      <h1 className="leading-none">

        <span className="block text-[58px] font-black text-[#5E120F] md:text-[78px] lg:text-[100px]">
          {settings?.hero_marathi_title ||
            "जुलेशवाडीचा"}
        </span>

        <span className="mt-2 block text-[58px] font-black text-orange-600 md:text-[78px] lg:text-[100px]">
          राजा
        </span>

      </h1>

      {/* English Title */}

      <h2 className="mt-8 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
        {settings?.mandal_name ||
          "Juliuswadi Cha Raja"}
      </h2>

      {/* Decorative Divider */}

      <div className="mt-8 flex items-center gap-3">

        <div className="h-1 w-20 rounded-full bg-orange-500" />

        <div className="h-3 w-3 rounded-full bg-orange-500" />

        <div className="h-1 w-32 rounded-full bg-orange-200" />

      </div>

      {/* Years */}

      <div className="mt-8 rounded-full bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-100 px-8 py-4 shadow-lg">

        <span className="text-xl font-bold text-orange-700">
          🎉 {settings?.years || 42}+ Years of Devotion
        </span>

      </div>

      {/* Subtitle */}

      <p className="mt-10 max-w-xl text-lg leading-9 text-gray-700 md:text-xl">

        {settings?.hero_subtitle ||
          "Join thousands of devotees in celebrating Lord Ganesha with faith, tradition, unity and devotion. Experience the divine blessings of Juliuswadi Cha Raja."}

      </p>

      {/* Buttons */}

      <div className="mt-12 flex flex-wrap gap-5">

        <PremiumButton href="/donation">

          <div className="flex items-center gap-3">

            <Heart size={22} />

            Donate Now

          </div>

        </PremiumButton>

        <PremiumButton
          href="/updates"
          variant="secondary"
        >

          <div className="flex items-center gap-3">

            <Bell size={22} />

            Live Updates

          </div>

        </PremiumButton>

      </div>

    </div>
  );
}