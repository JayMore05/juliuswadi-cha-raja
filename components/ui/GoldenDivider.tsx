"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function GoldenDivider() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative my-20 flex items-center justify-center"
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

      <div className="absolute flex h-12 w-12 items-center justify-center rounded-full border border-amber-200 bg-white shadow-lg">
        <Sparkles className="h-5 w-5 text-amber-500" />
      </div>
    </motion.div>
  );
}