"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  badge: string;
  title: string;
  subtitle?: string;
}

export default function SectionTitle({
  badge,
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mx-auto mb-20 max-w-3xl text-center"
    >
      <span className="inline-flex rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
        {badge}
      </span>

      <h2 className="mt-6 text-4xl font-black text-gray-900 sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}