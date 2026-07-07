"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export default function FloatingBadge({
  children,
}: Props) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
      className="
        inline-flex
        rounded-full
        bg-orange-100
        px-5
        py-2
        font-semibold
        text-orange-700
      "
    >
      {children}
    </motion.div>
  );
}