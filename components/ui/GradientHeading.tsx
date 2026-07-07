"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function GradientHeading({
  children,
}: Props) {
  return (
    <h2
      className="
        bg-gradient-to-r
        from-orange-700
        via-orange-500
        to-yellow-500
        bg-clip-text
        text-5xl
        font-black
        text-transparent

        md:text-6xl
      "
    >
      {children}
    </h2>
  );
}