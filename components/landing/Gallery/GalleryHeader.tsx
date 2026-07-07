"use client";

import { motion } from "framer-motion";

export default function GalleryHeader() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="mb-20 text-center"
    >
      <span className="rounded-full bg-orange-100 px-5 py-2 font-semibold text-orange-600">
        📸 Gallery
      </span>

      <h2 className="mt-6 text-5xl font-black text-gray-900 md:text-6xl">
        Divine Moments
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
        Explore beautiful memories of Juliuswadi Cha Raja.
      </p>
    </motion.div>
  );
}