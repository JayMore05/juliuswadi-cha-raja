"use client";

import { Sparkles } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div
      className="
        h-10
        w-full
        bg-gradient-to-r
        from-[#D84315]
        via-[#F4511E]
        to-[#FF9800]
        text-white
        shadow-md
      "
    >
      <div
        className="
          mx-auto
          flex
          h-full
          max-w-7xl
          items-center
          justify-center
          gap-4
          px-4
          text-sm
          font-semibold
          tracking-wide
        "
      >
        <Sparkles size={15} />

        <span className="hidden md:inline">
          Welcome to Juliuswadi Cha Raja Official Website
        </span>

        <span>|</span>

        <span>
          गणपती बाप्पा मोरया! मंगलमूर्ती मोरया!
        </span>

        <Sparkles size={15} />
      </div>
    </div>
  );
}