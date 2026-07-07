"use client";

import Image from "next/image";
import Link from "next/link";
import { usePublicSettings } from "@/hooks/usePublicSettings";

export default function NavLogo() {
  const { settings } = usePublicSettings();

  return (
    <Link
      href="/"
      className="
        flex
        items-center
        gap-3
        transition-all
        duration-300
        hover:scale-[1.02]
      "
    >
      {/* Logo */}

      <div
        className="
          relative
          flex
          h-12
          w-12
          items-center
          justify-center
          overflow-hidden
          rounded-full
          border-2
          border-orange-300
          bg-white
          shadow-lg

          sm:h-14
          sm:w-14

          lg:h-16
          lg:w-16
        "
      >
        <Image
          src={settings?.logo || "/logo/logo.png"}
          alt="Juliuswadi Cha Raja"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Text */}

      <div className="hidden sm:block leading-tight">
        <h2
          className="
            font-heading
            text-lg
            font-bold
            tracking-tight
            text-[#C2410C]

            md:text-xl

            lg:text-2xl
          "
        >
          {settings?.mandal_name || "Juliuswadi Cha Raja"}
        </h2>

        <p
          className="
            mt-1
            font-devanagari
            text-xs
            font-medium
            text-slate-600

            md:text-sm
          "
        >
          {settings?.marathi_name || "जुलेशवाडीचा राजा"}
        </p>
      </div>
    </Link>
  );
}