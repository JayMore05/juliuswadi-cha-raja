"use client";

import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <>
      {/* Main Background */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,#FFF6E9_0%,#FFF8F2_45%,#FFFFFF_100%)]
        "
      />

      {/* Top Glow */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-20
          h-[650px]
          w-[650px]
          -translate-x-1/2
          rounded-full
          bg-orange-200/40
          blur-[140px]
        "
      />

      {/* Left Glow */}

      <div
        className="
          absolute
          left-0
          top-1/3
          h-[420px]
          w-[420px]
          rounded-full
          bg-orange-100/50
          blur-[120px]
        "
      />

      {/* Right Glow */}

      <div
        className="
          absolute
          right-0
          bottom-20
          h-[420px]
          w-[420px]
          rounded-full
          bg-yellow-100/50
          blur-[120px]
        "
      />

      {/* Decorative Gradient */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-transparent
          via-transparent
          to-white/30
        "
      />
    </>
  );
}