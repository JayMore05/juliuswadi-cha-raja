"use client";

import { motion } from "framer-motion";

export default function Mandala() {
  return (
    <motion.div
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 180,
        repeat: Infinity,
        ease: "linear",
      }}
      className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        pointer-events-none
        select-none
        opacity-[0.06]
        z-0
      "
    >
      <svg
        width="900"
        height="900"
        viewBox="0 0 900 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="450"
          cy="450"
          r="420"
          stroke="#E6A23C"
          strokeWidth="2"
        />

        <circle
          cx="450"
          cy="450"
          r="360"
          stroke="#F6C453"
          strokeWidth="2"
        />

        <circle
          cx="450"
          cy="450"
          r="300"
          stroke="#E6A23C"
          strokeWidth="2"
        />

        <circle
          cx="450"
          cy="450"
          r="240"
          stroke="#F6C453"
          strokeWidth="2"
        />

        <circle
          cx="450"
          cy="450"
          r="180"
          stroke="#E6A23C"
          strokeWidth="2"
        />

        <circle
          cx="450"
          cy="450"
          r="120"
          stroke="#F6C453"
          strokeWidth="2"
        />

        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (360 / 24) * i;

          return (
            <line
              key={i}
              x1="450"
              y1="40"
              x2="450"
              y2="860"
              stroke="#E6A23C"
              strokeWidth="1"
              transform={`rotate(${angle} 450 450)`}
            />
          );
        })}
      </svg>
    </motion.div>
  );
}