"use client";

import { motion } from "framer-motion";
import {
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const features = [
  {
    icon: HeartHandshake,
    title: "Devotion First",
    description:
      "Every celebration is organized with deep faith and dedication to Lord Ganesha.",
  },
  {
    icon: Users,
    title: "Community United",
    description:
      "Thousands of devotees, volunteers and families come together every year.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Tradition",
    description:
      "For more than four decades, the Mandal has continued its traditions with pride.",
  },
  {
    icon: Sparkles,
    title: "Memorable Experience",
    description:
      "Beautiful decorations, cultural events and spiritual programs create unforgettable memories.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
            Why Juliuswadi Cha Raja?
          </span>

          <h2 className="mt-6 font-heading text-3xl font-bold text-[#5E120F] sm:text-4xl lg:text-5xl">
            A Festival Built on Faith
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            Every year we strive to create a celebration that inspires
            devotion, strengthens community bonds and preserves our rich
            cultural heritage.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.12,
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
                "
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white">
                  <Icon size={28} />
                </div>

                <h3 className="text-2xl font-bold text-[#5E120F]">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}