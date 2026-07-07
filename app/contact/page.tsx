import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/landing/Footer";

import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactMap from "@/components/contact/ContactMap";
import ContactCTA from "@/components/contact/ContactCTA";

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFF8F2]">

      <Navbar />

      <ContactHero />

      <ContactInfo />

      <ContactMap />

      <ContactCTA />

      <Footer />

    </main>
  );
}