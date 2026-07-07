"use client";

import SectionContainer from "@/components/ui/SectionContainer";
import SectionTitle from "@/components/ui/SectionTitle";
import AboutContent from "./AboutContent";
import AboutImage from "./AboutImage";
import AboutCounters from "./AboutCounters";

export default function About() {
  return (
    <SectionContainer className="bg-white">
      <SectionTitle
        badge="🙏 About Us"
        title="Juliuswadi Cha Raja"
        subtitle="A tradition of devotion, unity and celebration that has inspired devotees for decades."
      />

      <div className="grid items-center gap-14 lg:grid-cols-2">
        <AboutImage />
        <AboutContent />
      </div>

      <AboutCounters />
    </SectionContainer>
  );
}