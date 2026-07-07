"use client";

import { motion } from "framer-motion";

const petals = [
  { left: "8%", delay: 0, duration: 14, size: 22 },
  { left: "18%", delay: 3, duration: 16, size: 18 },
  { left: "28%", delay: 6, duration: 15, size: 20 },
  { left: "42%", delay: 2, duration: 17, size: 24 },
  { left: "58%", delay: 8, duration: 14, size: 18 },
  { left: "70%", delay: 4, duration: 18, size: 22 },
  { left: "82%", delay: 10, duration: 16, size: 20 },
  { left: "92%", delay: 5, duration: 15, size: 18 },
];

export default function FloatingPetals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {petals.map((petal, index) => (
        <motion.div
          key={index}
          initial={{
            y: -100,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            y: "120vh",
            x: [0, 20, -20, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: petal.left,
            top: "-10%",
          }}
          className="absolute"
        >
          <span
            style={{
              fontSize: `${petal.size}px`,
            }}
          >
            🌸
          </span>
        </motion.div>
      ))}
    </div>
  );
}