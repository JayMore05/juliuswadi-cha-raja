"use client";

import SectionContainer from "@/components/ui/SectionContainer";
import SectionTitle from "@/components/ui/SectionTitle";
import CommitteeGrid from "./CommitteeGrid";

export default function Committee() {
  return (
    <SectionContainer className="bg-gradient-to-b from-white to-[#FFF8F2]">
      <SectionTitle
        badge="👥 Our Committee"
        title="Meet Our Committee"
        subtitle="Dedicated volunteers working together every year to make Juliuswadi Cha Raja a grand success."
      />

      <CommitteeGrid />
    </SectionContainer>
  );
}