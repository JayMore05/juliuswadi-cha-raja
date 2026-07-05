import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import QuickActions from "@/components/home/QuickActions";
import DonationCard from "@/components/donation/DonationCard";
import Footer from "@/components/layout/Footer";
import UpdatesSection from "@/components/home/UpdatesSection";
import GalleryPreview from "@/components/home/GalleryPreview";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFF8F2]">
      <Navbar />

      <Hero />

      <QuickActions />

      <DonationCard />
      <GalleryPreview />
      <UpdatesSection />

      <Footer />
    </main>
  );
}