"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function AboutCounters() {
  return (
    <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

      <AnimatedCounter
        value={43}
        suffix="+"
        label="Years"
      />

      <AnimatedCounter
        value={40000}
        suffix="+"
        label="Devotees"
      />

      <AnimatedCounter
        value={150}
        suffix="+"
        label="Volunteers"
      />

      <AnimatedCounter
        value={100}
        suffix="+"
        label="Events"
      />

    </div>
  );
}