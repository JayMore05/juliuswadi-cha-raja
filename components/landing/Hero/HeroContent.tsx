"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Images,
  ArrowDown,
} from "lucide-react";

import GradientButton from "@/components/ui/GradientButton";
import { usePublicSettings } from "@/hooks/usePublicSettings";

export default function HeroContent() {
  const { settings } = usePublicSettings();

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="mx-auto flex w-full max-w-6xl flex-col items-center text-center"
    >
      {/* Badge */}

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="
          mb-8
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-orange-200
          bg-white/80
          px-4
          py-2
          shadow-lg
          backdrop-blur-xl

          sm:mb-10
          sm:gap-3
          sm:px-6
          sm:py-3
        "
      >
        <Sparkles
          size={18}
          className="text-orange-500"
        />

        <span className="text-sm font-semibold text-orange-700 sm:text-base">
          ॐ श्री गणेशाय नमः
        </span>
      </motion.div>

      {/* Marathi Heading */}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25 }}
        className="overflow-visible pt-3 sm:pt-5 lg:pt-6"
      >
        <h1
          className="
            font-marathi

            text-[40px]
            sm:text-[58px]
            md:text-[92px]

            lg:text-[112px]
            xl:text-[128px]

            leading-[1.28]

            lg:leading-[1.35]

            font-bold

            text-[#7A1F0E]
          "
        >
          {settings?.hero_marathi_title || "जुलेशवाडीचा"}

          <br />

          <span className="text-orange-500">
            राजा
          </span>
        </h1>
      </motion.div>

      {/* English */}

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="
          mt-6

          font-heading

          text-[28px]

          sm:text-4xl

          lg:text-5xl

          font-semibold
          tracking-wide
          text-[#2B2B2B]
        "
      >
        {settings?.mandal_name || "Juliuswadi Cha Raja"}
      </motion.h2>

      {/* Subtitle */}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="
          mt-5

          max-w-3xl

          px-2

          text-base

          leading-7

          text-slate-600

          sm:px-0
          sm:text-lg
          sm:leading-8
        "
      >
        Celebrating faith, tradition, unity and devotion
        with thousands of devotees every year.
      </motion.p>

      {/* Anniversary */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="
          mt-8

          rounded-full

          border
          border-yellow-200

          bg-gradient-to-r
          from-yellow-50
          via-orange-50
          to-yellow-50

          px-5
          py-3

          shadow-xl

          sm:mt-10
          sm:px-8
          sm:py-4
        "
      >
        <span className="text-sm font-bold text-orange-700 sm:text-lg">
          ✨ Celebrating {settings?.years || 43}+ Years of Devotion
        </span>
      </motion.div>

      {/* Buttons */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="
          mt-10

          flex
          w-full
          flex-col
          items-center
          gap-4

          sm:mt-12
          sm:w-auto
          sm:flex-row
          sm:flex-wrap
          sm:justify-center
          sm:gap-5
        "
      >
        <GradientButton href="/donation">
          <Heart size={20} />
          Donate Now
        </GradientButton>

        <GradientButton
          href="/gallery"
          className="border border-orange-200 bg-white text-orange-600 hover:bg-orange-50"
        >
          <Images size={20} />
          Explore Gallery
        </GradientButton>
      </motion.div>

      {/* Scroll */}

      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="
          mt-8

          flex
          flex-col
          items-center

          text-orange-500

          sm:mt-12
        "
      >
        <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] sm:text-xs sm:tracking-[0.35em]">
          Scroll to Explore
        </span>

        <ArrowDown size={20} />
      </motion.div>
    </motion.div>
  );
}