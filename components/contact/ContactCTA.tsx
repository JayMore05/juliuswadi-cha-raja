"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-[#FFF8F2] py-16 sm:py-20 lg:py-28">

      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            rounded-[36px]
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

            lg:px-16
            lg:py-16
          "
        >

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20">

            <Heart size={36} />

          </div>

          <h2 className="mt-8 font-heading text-3xl font-bold sm:text-4xl lg:text-6xl">
            We Welcome Every Devotee
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-orange-50 sm:text-lg lg:text-xl">
            Come and seek the blessings of Ganpati Bappa.
            We look forward to celebrating the festival with you.
          </p>

          <div className="mt-10">

            <Link
              href="/donation"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-white
                px-8
                py-4
                font-bold
                text-orange-600
                transition
                hover:-translate-y-1
                hover:shadow-2xl
              "
            >
              Support Our Mandal
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}