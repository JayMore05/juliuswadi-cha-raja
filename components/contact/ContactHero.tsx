"use client";

import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";

export default function ContactHero() {
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
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-yellow-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 text-orange-700">
            <PhoneCall size={18} />
            Contact Us
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
            We'd Love to
            <span className="block text-orange-600">
              Hear From You
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
            Whether you have questions about the festival, donations,
            volunteering or events, feel free to get in touch with the
            Juliuswadi Cha Raja Committee.
          </p>
        </motion.div>

      </div>
    </section>
  );
}