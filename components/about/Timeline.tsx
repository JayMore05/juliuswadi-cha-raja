"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Trophy,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

const timeline = [
  {
    year: "1982",
    title: "Foundation",
    description:
      "Juliuswadi Cha Raja Mandal was established with devotion and community spirit.",
    icon: CalendarDays,
  },
  {
    year: "1995",
    title: "Growing Together",
    description:
      "The festival expanded with cultural programs and increasing participation from devotees.",
    icon: HeartHandshake,
  },
  {
    year: "2015",
    title: "Community Service",
    description:
      "The Mandal strengthened its social initiatives through blood donation, awareness campaigns and public welfare activities.",
    icon: Trophy,
  },
  {
    year: "Today",
    title: "A Symbol of Faith",
    description:
      "Thousands of devotees visit Juliuswadi Cha Raja every year to seek the blessings of Ganpati Bappa.",
    icon: Sparkles,
  },
];

export default function Timeline() {
  return (
    <section className="bg-[#FFF8F2] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
            Journey
          </span>

          <h2 className="mt-6 font-heading text-3xl font-bold text-[#5E120F] sm:text-4xl lg:text-5xl">
            Our Journey Through the Years
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            Every milestone represents faith, dedication and
            the collective efforts of our community.
          </p>

        </div>

        {/* Timeline */}

        <div className="mt-16 space-y-10">

          {timeline.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                }}
                className="
                  flex
                  flex-col
                  gap-6

                  rounded-3xl
                  border
                  border-orange-100

                  bg-white

                  p-6

                  shadow-lg

                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                  lg:p-8
                "
              >

                <div className="flex items-center gap-5">

                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-orange-500
                      text-white
                    "
                  >
                    <Icon size={28} />
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-orange-600">
                      {item.year}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-[#5E120F]">
                      {item.title}
                    </h3>

                  </div>

                </div>

                <p className="max-w-2xl leading-8 text-slate-600">
                  {item.description}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}