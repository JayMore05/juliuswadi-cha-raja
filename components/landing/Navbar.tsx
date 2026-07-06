"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import PremiumButton from "@/components/ui/PremiumButton";
import { Settings } from "@/lib/services/settings";

interface NavbarProps {
  settings: Settings | null;
}

export default function Navbar({
  settings,
}: NavbarProps) {
  const [open, setOpen] = useState(false);

  const menu = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Gallery",
      href: "/gallery",
    },
    {
      title: "Updates",
      href: "/updates",
    },
    {
      title: "Donation",
      href: "/donation",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">

        <div className="mx-auto mt-5 flex max-w-7xl items-center justify-between rounded-full border border-orange-200/60 bg-white/80 px-5 py-3 shadow-2xl backdrop-blur-xl lg:px-8">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-4"
          >
            <Image
              src={
                settings?.logo ||
                "/logo/logo.png"
              }
              alt="Logo"
              width={75}
              height={75}
              priority
              className="h-14 w-14 rounded-full border-2 border-orange-500 object-cover lg:h-16 lg:w-16"
            />

            <div className="hidden md:block">

              <h1 className="text-2xl font-bold text-orange-600">
                {settings?.mandal_name ??
                  "Juliuswadi Cha Raja"}
              </h1>

              <p className="text-sm text-gray-600">
                {settings?.marathi_name ??
                  "जुलेशवाडीचा राजा"}
              </p>

            </div>
          </Link>

          {/* Desktop */}

          <nav className="hidden items-center gap-10 text-[17px] font-semibold lg:flex">

            {menu.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="transition hover:text-orange-600"
              >
                {item.title}
              </Link>
            ))}

          </nav>

          <div className="hidden lg:block">
            <PremiumButton href="/donation">
              Donate Now
            </PremiumButton>
          </div>

          {/* Mobile */}

          <button
            onClick={() =>
              setOpen(!open)
            }
            className="rounded-lg p-2 lg:hidden"
          >
            {open ? (
              <X size={30} />
            ) : (
              <Menu size={30} />
            )}
          </button>

        </div>

      </header>

      {/* Mobile Menu */}

      {open && (
        <div className="fixed left-4 right-4 top-24 z-40 rounded-3xl bg-white p-6 shadow-2xl lg:hidden">

          <nav className="space-y-5">

            {menu.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() =>
                  setOpen(false)
                }
                className="block text-lg font-semibold"
              >
                {item.title}
              </Link>
            ))}

            <PremiumButton
              href="/donation"
              className="w-full"
            >
              Donate Now
            </PremiumButton>

          </nav>

        </div>
      )}
    </>
  );
}