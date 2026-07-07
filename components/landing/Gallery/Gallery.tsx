"use client";

import SectionContainer from "@/components/ui/SectionContainer";
import SectionTitle from "@/components/ui/SectionTitle";
import GalleryGrid from "./GalleryGrid";

export default function Gallery() {
  return (
    <SectionContainer className="bg-gradient-to-b from-white to-[#FFF8F2]">
      <SectionTitle
        badge="📸 Gallery"
        title="Divine Moments"
        subtitle="Beautiful memories of Juliuswadi Cha Raja captured through the years."
      />

      <GalleryGrid />
    </SectionContainer>
  );
}