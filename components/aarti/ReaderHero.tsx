"use client";

import Image from "next/image";
import { BookOpen, Languages } from "lucide-react";
import { usePublicSettings } from "@/hooks/usePublicSettings";

interface Props {
  title: string;
  category: string;
  language: string;
}

export default function ReaderHero({
  title,
  category,
  language,
}: Props) {
  const { settings } = usePublicSettings();

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-orange-700
        via-orange-600
        to-amber-500
        print:hidden
      "
    >

      {/* Decorative Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]" />

      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-yellow-300/20 blur-3xl" />

      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-red-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">

        {/* Sanskrit */}

        <p className="text-lg tracking-[5px] text-orange-100">
          ॥ ॐ गं गणपतये नमः ॥
        </p>

        {/* Logo */}

        <div className="mx-auto mt-8 flex h-36 w-36 items-center justify-center rounded-full border-[6px] border-white/30 bg-white shadow-2xl">

          <Image
            src={settings?.logo || "/logo/logo.png"}
            alt="Logo"
            width={120}
            height={120}
            className="rounded-full object-cover"
          />

        </div>

        {/* Mandal */}

        <p className="mt-8 text-lg font-semibold uppercase tracking-[6px] text-orange-100">
          {settings?.mandal_name || "Juliuswadi Cha Raja"}
        </p>

        {/* Divider */}

        <div className="mx-auto mt-6 flex items-center justify-center gap-3">

          <div className="h-px w-20 bg-yellow-300" />

          <span className="text-xl text-yellow-200">
            🪔
          </span>

          <div className="h-px w-20 bg-yellow-300" />

        </div>

        {/* Title */}

        <h1 className="mt-8 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* Badges */}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

          <div className="rounded-full bg-white/15 px-5 py-3 text-white backdrop-blur">

            <BookOpen
              className="mr-2 inline"
              size={18}
            />

            {category}

          </div>

          <div className="rounded-full bg-white/15 px-5 py-3 text-white backdrop-blur">

            <Languages
              className="mr-2 inline"
              size={18}
            />

            {language}

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-10 text-orange-100">

          <p className="text-lg">
            🌺 Devotional Library 🌺
          </p>

        </div>

      </div>

    </section>
  );
}