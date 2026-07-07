"use client";

import { motion } from "framer-motion";

interface Props {
  value: number;
  suffix?: string;
  label: string;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  label,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="
        rounded-3xl
        bg-white
        p-8
        shadow-xl
        text-center
      "
    >
      <h3 className="text-5xl font-black text-orange-600">
        {value}
        {suffix}
      </h3>

      <p className="mt-3 text-gray-600">
        {label}
      </p>
    </motion.div>
  );
}