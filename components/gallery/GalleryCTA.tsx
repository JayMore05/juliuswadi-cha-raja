"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";

export default function GalleryCTA() {
  return (
    <section className="relative overflow-hidden bg-[#FFF8F2] py-16 sm:py-20 lg:py-28">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500" />

      <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-yellow-300/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            rounded-[32px]
            border
            border-white/20
            bg-white/10
            px-6
            py-10
            text-center
            text-white
            shadow-2xl
            backdrop-blur-xl

            sm:px-8
            sm:py-14

            lg:rounded-[40px]
            lg:px-16
            lg:py-16
          "
        >

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
            <Heart size={38} />
          </div>

          <h2 className="mt-8 font-heading text-3xl font-bold sm:text-4xl lg:text-6xl">
            Visit Juliuswadi Cha Raja
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-orange-50 sm:text-lg lg:text-xl">
            Experience the devotion, traditions and beautiful
            celebrations in person. We welcome every devotee with
            love and faith.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              href="/contact"
              className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                bg-white
                px-8
                py-4
                font-bold
                text-orange-600
                transition
                hover:-translate-y-1
                hover:shadow-2xl

                sm:w-auto
              "
            >
              Contact Us

              <ArrowRight size={20} />
            </Link>

            <Link
              href="/donation"
              className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-white/40
                px-8
                py-4
                font-semibold
                text-white
                transition
                hover:bg-white/10

                sm:w-auto
              "
            >
              Donate Now

              <Heart size={20} />
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}