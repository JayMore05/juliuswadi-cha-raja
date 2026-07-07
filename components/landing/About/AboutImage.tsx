"use client";

import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";

export default function AboutImage() {
  return (
    <GlassCard>
      <Image
        src="/images/ganpati.png"
        alt="Juliuswadi Cha Raja"
        width={700}
        height={800}
        className="mx-auto h-auto rounded-3xl object-contain"
      />
    </GlassCard>
  );
}