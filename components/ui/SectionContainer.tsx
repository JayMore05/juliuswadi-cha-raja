"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SectionContainer({
  children,
  className = "",
}: Props) {
  return (
    <section
      className={`
        relative
        overflow-hidden
        py-24
        lg:py-32
        ${className}
      `}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {children}
      </div>
    </section>
  );
}