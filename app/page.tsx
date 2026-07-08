import Navbar from "@/components/layout/Navbar/Navbar";
import Hero from "@/components/landing/Hero";

import AboutSection from "@/components/landing/AboutSection";
import UpdatesPreview from "@/components/landing/UpdatesPreview";
import GalleryPreview from "@/components/landing/GalleryPreview";
import Committee from "@/components/landing/Committee";
import DonationSection from "@/components/landing/DonationSection";
import Footer from "@/components/landing/Footer";
import AartiPreview from "@/components/landing/AartiPreview";
export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFF8F2]">
      <Navbar />

      <Hero />

      

      <AboutSection />
	<AartiPreview />

      <UpdatesPreview />

      <GalleryPreview />

      <Committee />

      <DonationSection />

      <Footer />
    </main>
  );
}