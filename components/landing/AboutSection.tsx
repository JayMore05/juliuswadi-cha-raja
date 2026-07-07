"use client";

import { motion } from "framer-motion";
import {
  Landmark,
  CalendarDays,
  Users,
  HeartHandshake,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    icon: CalendarDays,
    title: "43+ Years",
    subtitle: "Serving Devotees",
  },
  {
    icon: Users,
    title: "50,000+",
    subtitle: "Visitors Every Year",
  },
  {
    icon: HeartHandshake,
    title: "100%",
    subtitle: "Community Driven",
  },
];

export default function AboutSection() {
  return (
    <section
      className="
        bg-white

        py-16

        sm:py-20

        lg:py-28
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl

          px-5

          sm:px-6
        "
      >
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-orange-100

              px-4
              py-2

              text-sm

              text-orange-700

              sm:px-5
              sm:text-base
            "
          >
            <Landmark size={18} />
            About Our Mandal
          </div>

          <h2
            className="
              font-heading

              text-3xl

              sm:text-4xl

              lg:text-5xl

              font-bold
              text-[#5E120F]
            "
          >
            Juliuswadi Cha Raja
          </h2>

          <p
            className="
              mt-5

              px-1

              text-base

              leading-7

              text-slate-600

              sm:mt-6
              sm:px-0
              sm:text-lg
              sm:leading-8
            "
          >
            Juliuswadi Cha Raja has been a symbol of faith,
            devotion, culture and unity for decades. Every year,
            thousands of devotees gather together to celebrate
            Lord Ganesha with immense enthusiasm and spirituality.
          </p>
        </motion.div>

        {/* Cards */}

        <div
          className="
            mt-12

            grid
            gap-6

            md:grid-cols-3

            lg:mt-20
            lg:gap-8
          "
        >
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                }}
                className="
                  rounded-3xl
                  border
                  border-orange-100
                  bg-gradient-to-br
                  from-white
                  to-orange-50

                  p-6

                  shadow-lg
                  transition-all
                  duration-300

                  hover:-translate-y-2
                  hover:shadow-2xl

                  lg:p-8
                "
              >
                <div
                  className="
                    mb-5

                    flex

                    h-14
                    w-14

                    items-center
                    justify-center

                    rounded-full
                    bg-orange-500
                    text-white

                    lg:mb-6
                    lg:h-16
                    lg:w-16
                  "
                >
                  <Icon size={26} />
                </div>

                <h3
                  className="
                    text-2xl

                    font-bold

                    text-[#5E120F]

                    lg:text-3xl
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-2

                    text-sm

                    text-slate-600

                    lg:text-base
                  "
                >
                  {item.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Button */}

        <div
          className="
            mt-12

            text-center

            lg:mt-16
          "
        >
          <Link
            href="/about"
            className="
              inline-flex
              items-center
              justify-center

              rounded-full

              bg-orange-600

              px-7
              py-3

              text-sm

              font-semibold

              text-white

              transition

              hover:bg-orange-700

              sm:px-8
              sm:py-4
              sm:text-base
            "
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
}