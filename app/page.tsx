import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import GallerySection from "@/components/landing/GallerySection";
import UpdatesSection from "@/components/landing/UpdatesSection";
import DonationSection from "@/components/landing/DonationSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFF8F2]">
      <Navbar />
      <Hero />
      <GallerySection />
      <UpdatesSection />
      <DonationSection />
      <Footer />
    </main>
  );
}