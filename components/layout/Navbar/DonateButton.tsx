"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function DonateButton() {
  return (
    <motion.div
      whileHover={{
        y: -2,
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.97,
      }}
    >
      <Link
        href="/donation"
        className="
          hidden
          lg:inline-flex
          items-center
          gap-2
          rounded-full
          bg-gradient-to-r
          from-orange-500
          to-amber-500
          px-7
          py-3
          font-semibold
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:shadow-orange-300/50
          hover:shadow-xl
        "
      >
        <Heart size={18} />
        Donate Now
      </Link>
    </motion.div>
  );
}