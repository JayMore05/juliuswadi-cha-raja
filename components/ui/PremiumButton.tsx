"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface PremiumButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function PremiumButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: PremiumButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white shadow-xl hover:shadow-orange-300/50 hover:-translate-y-1"
      : "border-2 border-orange-500 bg-white text-orange-600 hover:bg-orange-50 hover:-translate-y-1";

  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-bold transition-all duration-300 ${styles} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-bold transition-all duration-300 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}