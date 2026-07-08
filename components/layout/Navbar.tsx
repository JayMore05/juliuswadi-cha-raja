"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePublicSettings } from "@/hooks/usePublicSettings";

export default function Navbar() {
  const { settings } = usePublicSettings();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/gallery", label: "Gallery" },
    { href: "/aarti", label: "🪔 Aarti" },
    { href: "/updates", label: "Updates" },
    { href: "/committee", label: "Committee" },
    { href: "/donation", label: "Donation" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/95 backdrop-blur-lg shadow-md">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 lg:px-8">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-4"
          >
            <Image
              src={settings?.logo || "/logo/logo.png"}
              alt="Juliuswadi Cha Raja"
              width={90}
              height={90}
              priority
              className="h-16 w-16 rounded-full border-2 border-orange-500 bg-white object-cover shadow-lg lg:h-20 lg:w-20"
            />

            <div className="hidden md:block">
              <h1 className="text-2xl font-bold text-orange-600">
                {settings?.mandal_name ||
                  "Juliuswadi Cha Raja"}
              </h1>

              <p className="text-lg font-semibold text-gray-600">
                {settings?.marathi_name ||
                  "जुलेशवाडीचा राजा"}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-7 text-[17px] font-semibold lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition duration-300 hover:text-orange-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Donate Button */}

          <Link
            href="/donation"
            className="hidden rounded-full bg-orange-600 px-7 py-3 text-lg font-bold text-white transition hover:scale-105 hover:bg-orange-700 lg:block"
          >
            Donate
          </Link>

          {/* Mobile Menu Button */}

          <button
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
            className="rounded-lg p-2 lg:hidden"
          >
            {mobileOpen ? (
              <X size={30} />
            ) : (
              <Menu size={30} />
            )}
          </button>

        </div>
      </header>

      {/* Mobile Drawer */}

      {mobileOpen && (
        <div className="border-t bg-white shadow-lg lg:hidden">

          <nav className="flex flex-col">

            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() =>
                  setMobileOpen(false)
                }
                className="border-b px-6 py-4 transition hover:bg-orange-50"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/donation"
              onClick={() =>
                setMobileOpen(false)
              }
              className="bg-orange-600 py-4 text-center text-lg font-bold text-white"
            >
              Donate Now
            </Link>

          </nav>

        </div>
      )}
    </>
  );
}