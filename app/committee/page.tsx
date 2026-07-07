import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/landing/Footer";

import CommitteeHero from "@/components/committee/CommitteeHero";
import CommitteeMembers from "@/components/committee/CommitteeMembers";
import CommitteeCTA from "@/components/committee/CommitteeCTA";

export default function CommitteePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFF8F2]">

      <Navbar />

      <CommitteeHero />

      <CommitteeMembers />

      <CommitteeCTA />

      <Footer />

    </main>
  );
}