"use client";

import Image from "next/image";
import Link from "next/link";
import { usePublicSettings } from "@/hooks/usePublicSettings";
import PremiumButton from "@/components/ui/PremiumButton";

export default function Navbar() {
  const { settings } = usePublicSettings();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-6">
      <div className="flex w-full max-w-7xl items-center justify-between rounded-full bg-white/95 px-6 py-4 shadow-2xl backdrop-blur-xl">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-4">

          <Image
            src={settings?.logo || "/logo/logo.png"}
            alt="Logo"
            width={70}
            height={70}
            className="rounded-full"
            priority
          />

          <div>

            <h1 className="text-2xl font-bold text-orange-600">
              {settings?.mandal_name || "Juliuswadi Cha Raja"}
            </h1>

            <p className="text-lg text-gray-600">
              {settings?.hero_marathi_title || "जुलेशवाडीचा राजा"}
            </p>

          </div>

        </Link>

        {/* Menu */}

        <nav className="hidden gap-10 text-lg font-semibold lg:flex">

          <Link href="/">Home</Link>

          <Link href="/gallery">Gallery</Link>

          <Link href="/updates">Updates</Link>

          <Link href="/donation">Donation</Link>

          <Link href="/contact">Contact</Link>

        </nav>

        {/* Donate */}

        <PremiumButton href="/donation">
          Donate Now
        </PremiumButton>

      </div>
    </header>
  );
}