"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Landmark } from "lucide-react";

export default function AboutHero() {
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
      {/* Background Glow */}

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

            <Landmark size={18} />

            About Juliuswadi Cha Raja

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
            A Tradition of
            <span className="block text-orange-600">
              Faith & Devotion
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
            Juliuswadi Cha Raja has been inspiring devotion,
            unity and culture for more than four decades.
            Every Ganesh Festival brings thousands of devotees
            together with one purpose—
            celebrating Ganpati Bappa with faith,
            love and tradition.
          </p>

          <div
            className="
              mt-12

              flex

              flex-col

              items-center

              justify-center

              gap-5

              sm:flex-row
            "
          >

            <Link
              href="/gallery"
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
              Explore Gallery

              <ArrowRight size={20} />

            </Link>

            <Link
              href="/committee"
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border

                border-orange-300

                px-8
                py-4

                font-semibold

                text-orange-600

                transition

                hover:bg-orange-50
              "
            >
              Meet Committee
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}