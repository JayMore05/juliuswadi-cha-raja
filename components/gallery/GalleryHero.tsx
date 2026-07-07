"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Images, ArrowRight } from "lucide-react";

export default function GalleryHero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-[#FFF8F2]
        via-[#FFF4EA]
        to-[#FFE8D1]
        pt-40
        pb-24
      "
    >
      {/* Glow */}

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-yellow-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          className="mx-auto max-w-4xl text-center"
        >

          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 text-orange-700">

            <Images size={18} />

            Festival Gallery

          </div>

          <h1
            className="
              mt-8
              font-heading
              text-4xl
              font-bold
              text-[#5E120F]
              sm:text-5xl
              lg:text-7xl
            "
          >
            Beautiful
            <span className="block text-orange-600">
              Festival Memories
            </span>
          </h1>

          <p
            className="
              mx-auto
              mt-8
              max-w-3xl
              text-base
              leading-8
              text-slate-600
              sm:text-lg
            "
          >
            Explore unforgettable moments, beautiful decorations,
            cultural programs and the divine darshan of
            Juliuswadi Cha Raja through our gallery.
          </p>

          <div className="mt-12 flex justify-center">

            <Link
              href="/updates"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-orange-600
                px-8
                py-4
                font-semibold
                text-white
                transition
                hover:bg-orange-700
              "
            >
              Latest Festival Updates

              <ArrowRight size={20} />

            </Link>

          </div>

        </motion.div>

      </div>
    </section>
  );
}