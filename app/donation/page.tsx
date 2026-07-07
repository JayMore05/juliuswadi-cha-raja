import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/landing/Footer";

import DonationHero from "@/components/donation/DonationHero";
import DonationCard from "@/components/donation/DonationCard";
import DonationCTA from "@/components/donation/DonationCTA";

export default function DonationPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFF8F2]">

      <Navbar />

      <DonationHero />

      <DonationCard />

      <DonationCTA />

      <Footer />

    </main>
  );
}