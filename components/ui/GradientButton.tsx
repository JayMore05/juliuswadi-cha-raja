"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GradientButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function GradientButton({
  href,
  children,
  className = "",
}: GradientButtonProps) {
  return (
    <motion.div
      whileHover={{
        y: -3,
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <Link
        href={href}
        className={`
	  group
          relative
          inline-flex
          items-center
          justify-center
          gap-2
          overflow-hidden
          rounded-full
          bg-gradient-to-r
          from-orange-500
          via-orange-600
          to-amber-500
          px-8
          py-4
          font-semibold
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:shadow-orange-300/50
          hover:shadow-2xl
          ${className}
        `}
      >
        {/* Shine Effect */}

        <span
          className="
            absolute
            inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            via-white/30
            to-transparent
            transition-transform
            duration-700
            group-hover:translate-x-full
          "
        />

        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </Link>
    </motion.div>
  );
}