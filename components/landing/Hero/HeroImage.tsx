"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePublicSettings } from "@/hooks/usePublicSettings";

export default function HeroImage() {
  const { settings } = usePublicSettings();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="relative flex items-center justify-center"
    >
      {/* Golden Glow */}

      <div
        className="
          absolute
          h-[420px]
          w-[420px]
          rounded-full
          bg-gradient-to-br
          from-yellow-200/70
          via-orange-200/40
          to-transparent
          blur-[70px]

          md:h-[520px]
          md:w-[520px]

          xl:h-[720px]
          xl:w-[720px]
        "
      />

      {/* Outer Gold Ring */}

      <div
        className="
          absolute
          rounded-full
          border-[8px]
          border-[#F8D67A]

          h-[280px]
w-[280px]

sm:h-[320px]
sm:w-[320px]

          md:h-[430px]
          md:w-[430px]

          xl:h-[620px]
          xl:w-[620px]

          shadow-[0_0_60px_rgba(255,190,40,.35)]
        "
      />

      {/* Inner White Ring */}

      <div
        className="
          absolute
          rounded-full
          border-[12px]
          border-white/80

          h-[260px]
w-[260px]

sm:h-[300px]
sm:w-[300px]

          md:h-[405px]
          md:w-[405px]

          xl:h-[590px]
          xl:w-[590px]
        "
      />

      {/* Idol */}

      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
        className="relative z-30"
      >
        <Image
          src={settings?.hero_image || "/images/ganpati.png"}
          alt="Ganpati Bappa"
          width={900}
          height={900}
          priority
          className="
            rounded-full
            object-cover

            h-[240px]
w-[240px]

sm:h-[280px]
sm:w-[280px]

md:h-[380px]
md:w-[380px]

xl:h-[560px]
xl:w-[560px]            shadow-[0_25px_80px_rgba(0,0,0,.28)]
          "
        />
      </motion.div>

      {/* Floating Light */}

      <div className="absolute left-12 top-20 h-3 w-3 rounded-full bg-yellow-300 shadow-xl" />
      <div className="absolute right-16 top-28 h-4 w-4 rounded-full bg-orange-300 shadow-xl" />
      <div className="absolute bottom-24 left-10 h-3 w-3 rounded-full bg-yellow-300 shadow-xl" />
      <div className="absolute bottom-20 right-12 h-3 w-3 rounded-full bg-orange-300 shadow-xl" />
    </motion.div>
  );
}