import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/landing/Footer";

import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryCTA from "@/components/gallery/GalleryCTA";

export default function GalleryPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFF8F2]">

      <Navbar />

      <GalleryHero />

      <GalleryGrid />

      <GalleryCTA />

      <Footer />

    </main>
  );
}