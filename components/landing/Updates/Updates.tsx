"use client";

import SectionContainer from "@/components/ui/SectionContainer";
import SectionTitle from "@/components/ui/SectionTitle";
import UpdatesGrid from "./UpdatesGrid";

export default function Updates() {
  return (
    <SectionContainer className="bg-[#FFF8F2]">

      <SectionTitle
        badge="📢 Latest Updates"
        title="Festival Announcements"
        subtitle="Stay connected with the latest news, events and celebrations of Juliuswadi Cha Raja."
      />

      <UpdatesGrid />

    </SectionContainer>
  );
}