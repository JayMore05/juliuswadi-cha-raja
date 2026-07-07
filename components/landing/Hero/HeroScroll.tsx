"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroScroll() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 1.2,
        duration: 0.8,
      }}
      className="mt-14 flex flex-col items-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-600">
        Scroll to Explore
      </p>

      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mt-4"
      >
        <div className="flex h-14 w-8 justify-center rounded-full border-2 border-orange-400">
          <motion.div
            animate={{
              y: [4, 24, 4],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
            className="mt-2 h-3 w-3 rounded-full bg-orange-500"
          />
        </div>
      </motion.div>

      <ChevronDown className="mt-3 text-orange-500" size={24} />
    </motion.div>
  );
}