"use client";

import Link from "next/link";
import { Heart, Bell, Sparkles } from "lucide-react";
import { usePublicSettings } from "@/hooks/usePublicSettings";

export default function HeroContent() {
  const { settings } = usePublicSettings();

  return (
    <div className="relative z-20 flex flex-col justify-center">

      {/* Ganesh Badge */}

      <div className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-orange-200 bg-white/90 px-6 py-3 shadow-lg backdrop-blur">

        <Sparkles
          size={18}
          className="text-orange-500"
        />

        <span className="font-semibold text-orange-700">
          ॐ श्री गणेशाय नमः
        </span>

      </div>

      {/* Marathi Title */}

      <h1 className="leading-none">

        <span className="block text-[58px] font-black tracking-tight text-[#5E120F] md:text-[72px] lg:text-[90px]">
          {settings?.hero_marathi_title ||
            "जुलेशवाडीचा"}
        </span>

        <span className="mt-3 block text-[58px] font-black tracking-tight text-orange-600 md:text-[72px] lg:text-[90px]">
          राजा
        </span>

      </h1>

      {/* English Name */}

      <h2 className="mt-6 text-3xl font-bold tracking-wide text-gray-800 lg:text-5xl">
        {settings?.mandal_name ||
          "Juliuswadi Cha Raja"}
      </h2>

      {/* Decorative Divider */}

      <div className="mt-8 flex items-center gap-4">

        <div className="h-[3px] w-16 rounded-full bg-orange-500" />

        <div className="h-3 w-3 rounded-full bg-orange-500" />

        <div className="h-[3px] w-32 rounded-full bg-orange-200" />

      </div>

      {/* Years Badge */}

      <div className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-gradient-to-r from-yellow-100 via-orange-50 to-yellow-100 px-8 py-4 shadow-xl">

        <span className="text-2xl">
          🎉
        </span>

        <span className="text-xl font-bold text-orange-700">
          {settings?.years || 42}+ Years of Devotion
        </span>

      </div>

      {/* Subtitle */}

      <p className="mt-10 max-w-xl text-lg leading-9 text-gray-700 lg:text-xl">

        {settings?.hero_subtitle ||
          "Experience the divine blessings of Lord Ganesha. Join thousands of devotees in celebrating faith, tradition, culture and unity during the grand Ganesh Festival."}

      </p>

      {/* Buttons */}

      <div className="mt-12 flex flex-wrap gap-5">

        <Link
          href="/donation"
          className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 px-10 py-5 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >

          <Heart size={22} />

          Donate Now

        </Link>

        <Link
          href="/updates"
          className="flex items-center gap-3 rounded-2xl border-2 border-orange-500 bg-white px-10 py-5 text-lg font-bold text-orange-600 shadow-lg transition-all duration-300 hover:bg-orange-50"
        >

          <Bell size={22} />

          Live Updates

        </Link>

      </div>

    </div>
  );
}