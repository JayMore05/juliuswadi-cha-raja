"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePublicSettings } from "@/hooks/usePublicSettings";

export default function Navbar() {
  const { settings } = usePublicSettings();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white/95 px-5 py-3 shadow-2xl backdrop-blur-xl">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={settings?.logo || "/logo/logo.png"}
            alt="Logo"
            width={55}
            height={55}
            className="rounded-full"
          />

          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-orange-600">
              {settings?.mandal_name || "Juliuswadi Cha Raja"}
            </h1>

            <p className="text-sm text-gray-600">
              {settings?.marathi_name || "जुलेशवाडीचा राजा"}
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold">
          <Link href="/">Home</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/updates">Updates</Link>
          <Link href="/donation">Donation</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Desktop Donate */}
        <Link
          href="/donation"
          className="hidden lg:inline-flex rounded-full bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
        >
          Donate Now
        </Link>

        {/* Mobile Menu Button */}
        <button className="lg:hidden rounded-full p-2 hover:bg-orange-100">
          <Menu size={28} className="text-orange-600" />
        </button>

      </div>
    </header>
  );
}