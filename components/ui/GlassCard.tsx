"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className = "",
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        border-orange-100/70
        bg-white/80
        backdrop-blur-xl
        shadow-xl
        transition-all
        duration-300
        hover:shadow-2xl
        ${className}
      `}
    >
      {/* Golden Glow */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-yellow-100/20
          via-transparent
          to-orange-100/20
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}