"use client";

import { useEffect, useState } from "react";

import AnnouncementBar from "./AnnouncementBar";
import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import DonateButton from "./DonateButton";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnnouncementBar />

      <header
        className={`
          fixed
          left-0
          right-0
          top-10
          z-50
          px-3
          transition-all
          duration-300

          sm:px-5
          lg:px-6
        `}
      >
        <div
          className={`
            mx-auto
            flex
            h-16
            max-w-7xl
            items-center
            justify-between
            rounded-full
            border
            transition-all
            duration-300

            sm:h-[72px]

            lg:h-20

            ${
              scrolled
                ? "border-orange-200 bg-white/95 shadow-2xl backdrop-blur-2xl"
                : "border-white/60 bg-white/85 shadow-xl backdrop-blur-xl"
            }
          `}
        >
          {/* Left */}

          <div className="pl-4 sm:pl-6">
            <NavLogo />
          </div>

          {/* Center */}

          <div className="hidden lg:block">
            <NavLinks />
          </div>

          {/* Right */}

          <div className="flex items-center gap-3 pr-4 sm:pr-6">
            <div className="hidden lg:block">
              <DonateButton />
            </div>

            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}