"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function DonationSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#FFF8F2]

        py-16

        sm:py-20

        lg:py-28
      "
    >
      {/* Background Glow */}

      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500" />

      <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-yellow-300/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <div
        className="
          relative
          mx-auto
          max-w-7xl

          px-5

          sm:px-6
        "
      >
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            overflow-hidden

            rounded-[28px]

            border
            border-white/20

            bg-white/10

            px-6
            py-10

            text-center
            text-white

            shadow-2xl
            backdrop-blur-xl

            sm:rounded-[36px]
            sm:px-8
            sm:py-14

            md:px-16
            md:py-16

            lg:rounded-[40px]
          "
        >
          {/* Icon */}

          <div
            className="
              mx-auto

              flex

              h-16
              w-16

              items-center
              justify-center

              rounded-full

              bg-white/20

              shadow-xl

              sm:h-20
              sm:w-20
            "
          >
            <Heart
              size={34}
              className="text-white sm:h-10 sm:w-10"
            />
          </div>

          {/* Heading */}

          <h2
            className="
              mt-6

              font-heading

              text-3xl

              font-bold

              sm:text-4xl

              md:text-5xl

              lg:text-6xl
            "
          >
            Support Juliuswadi Cha Raja
          </h2>

          {/* Subtitle */}

          <p
            className="
              mx-auto

              mt-5

              max-w-3xl

              px-1

              text-base

              leading-7

              text-orange-50

              sm:px-0
              sm:text-lg
              sm:leading-8

              md:text-xl
            "
          >
            Your generous contribution helps us organize Ganesh
            Festival every year, support social initiatives, and
            preserve our traditions for future generations.
          </p>

          {/* Buttons */}

          <div
            className="
              mt-10

              flex
              flex-col
              items-center
              justify-center

              gap-4

              sm:mt-12
              sm:flex-row
              sm:gap-5
            "
          >
            <Link
              href="/donation"
              className="
                inline-flex

                w-full

                items-center
                justify-center
                gap-2

                rounded-full

                bg-white

                px-7
                py-3

                text-base
                font-bold

                text-orange-600

                transition-all
                duration-300

                hover:-translate-y-1
                hover:shadow-2xl

                sm:w-auto
                sm:px-8
                sm:py-4
                sm:text-lg
              "
            >
              <Heart size={20} />

              Donate Now
            </Link>

            <Link
              href="/contact"
              className="
                inline-flex

                w-full

                items-center
                justify-center
                gap-2

                rounded-full

                border
                border-white/40

                px-7
                py-3

                text-base
                font-semibold

                text-white

                transition-all
                duration-300

                hover:bg-white/10

                sm:w-auto
                sm:px-8
                sm:py-4
                sm:text-lg
              "
            >
              Contact Us

              <ArrowRight size={20} />
            </Link>
          </div>

          {/* Quote */}

          <div
            className="
              mt-10

              border-t
              border-white/20

              pt-6

              sm:mt-14
              sm:pt-8
            "
          >
            <p
              className="
                text-base

                italic

                leading-7

                text-orange-100

                sm:text-lg
              "
            >
              "Every contribution, big or small, strengthens our
              community and keeps our traditions alive."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}