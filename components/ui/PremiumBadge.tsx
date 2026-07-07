"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PremiumBadgeProps {
  children: ReactNode;
  className?: string;
}

export default function PremiumBadge({
  children,
  className = "",
}: PremiumBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-orange-200
        bg-white/80
        px-5
        py-2.5
        text-sm
        font-semibold
        tracking-wide
        text-orange-700
        shadow-lg
        backdrop-blur-md
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}