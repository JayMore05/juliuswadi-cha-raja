import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/landing/Footer";

import UpdatesHero from "@/components/updates/UpdatesHero";
import FeaturedUpdate from "@/components/updates/FeaturedUpdate";
import UpdatesGrid from "@/components/updates/UpdatesGrid";
import UpdatesCTA from "@/components/updates/UpdatesCTA";

export default function UpdatesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFF8F2]">

      <Navbar />

      <UpdatesHero />

      <FeaturedUpdate />

      <UpdatesGrid />

      <UpdatesCTA />

      <Footer />

    </main>
  );
}