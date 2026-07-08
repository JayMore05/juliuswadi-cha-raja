"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export default function AartiHero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-[#FFF8F2]
        via-[#FFF3E5]
        to-[#FFE2C2]
        pt-40
        pb-24
      "
    >
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-yellow-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >

          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 text-orange-700">

            <Flame size={18} />

            Ganpati Bappa Morya

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
            Ganesh Aarti
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
            Offer your prayers with devotion by reciting the
            sacred Ganesh Aarti and seek the blessings of
            Lord Ganesha.
          </p>

        </motion.div>

      </div>

    </section>
  );
}