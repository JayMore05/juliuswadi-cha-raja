"use client";

import { motion } from "framer-motion";

export default function OurStory() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-2">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
            Our Story
          </span>

          <h2 className="mt-6 font-heading text-3xl font-bold text-[#5E120F] sm:text-4xl lg:text-5xl">
            More Than Four Decades
            of Devotion
          </h2>

          <p className="mt-8 text-base leading-8 text-slate-600 sm:text-lg">
            Juliuswadi Cha Raja has become a symbol of devotion,
            tradition and togetherness. Every year thousands of
            devotees gather with immense faith to celebrate the
            Ganesh Festival with grandeur and spirituality.
          </p>

          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            The Mandal believes in preserving traditions while
            embracing modern ideas that strengthen the community.
            Cultural events, social activities and devotional
            programs continue to inspire every generation.
          </p>
        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-[36px] bg-gradient-to-br from-orange-500 to-amber-500 p-8 text-white shadow-2xl lg:p-10"
        >
          <h3 className="text-3xl font-bold">
            Our Vision
          </h3>

          <p className="mt-6 leading-8 text-orange-50">
            To spread devotion, unity and cultural values while
            creating unforgettable experiences for every devotee
            who visits Juliuswadi Cha Raja.
          </p>

          <div className="mt-10 border-t border-white/20 pt-8">

            <h4 className="text-2xl font-semibold">
              Our Mission
            </h4>

            <p className="mt-5 leading-8 text-orange-50">
              Organizing a grand Ganesh Festival every year,
              supporting community initiatives and preserving
              traditions for future generations.
            </p>

          </div>
        </motion.div>

      </div>
    </section>
  );
}