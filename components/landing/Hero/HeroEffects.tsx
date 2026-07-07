"use client";

import { motion } from "framer-motion";

export default function HeroEffects() {
  return (
    <>
      {/* Main Orange Glow */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[650px]
          w-[650px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-orange-300/30
          blur-[160px]
        "
      />

      {/* Golden Aura */}

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-[45%]
          h-[450px]
          w-[450px]
          -translate-x-1/2
          rounded-full
          bg-yellow-300/20
          blur-[120px]
        "
      />

      {/* Floating Lights */}

      {[...Array(12)].map((_, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + index,
            repeat: Infinity,
          }}
          className="absolute h-2 w-2 rounded-full bg-yellow-300"
          style={{
            left: `${8 + index * 7}%`,
            top: `${20 + (index % 4) * 15}%`,
          }}
        />
      ))}
    </>
  );
}