"use client";

import Link from "next/link";
import Image from "next/image";

import {
  MapPin,
  Phone,
  Mail,
  Heart,
} from "lucide-react";

import {
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import { usePublicSettings } from "@/hooks/usePublicSettings";

export default function Footer() {
  const { settings } = usePublicSettings();

  return (
    <footer className="relative overflow-hidden bg-[#4B120C] text-white">
      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#5E120F] via-[#44100B] to-[#2A0906]" />

      {/* Decorative Glow */}

      <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo */}

          <div>
            <Image
              src={settings?.logo || "/logo/logo.png"}
              alt="Logo"
              width={90}
              height={90}
              className="rounded-full border-4 border-orange-300 shadow-lg"
            />

            <h3 className="mt-6 font-heading text-3xl font-bold">
              {settings?.mandal_name || "Juliuswadi Cha Raja"}
            </h3>

            <p className="mt-5 leading-7 text-orange-100">
              A symbol of faith, devotion and unity, celebrating
              Lord Ganesha with love and tradition every year.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h4 className="mb-6 text-xl font-bold text-orange-200">
              Quick Links
            </h4>

            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="transition duration-300 hover:translate-x-1 hover:text-orange-300"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="transition duration-300 hover:translate-x-1 hover:text-orange-300"
              >
                About
              </Link>

              <Link
                href="/gallery"
                className="transition duration-300 hover:translate-x-1 hover:text-orange-300"
              >
                Gallery
              </Link>

              <Link
                href="/updates"
                className="transition duration-300 hover:translate-x-1 hover:text-orange-300"
              >
                Updates
              </Link>

              <Link
                href="/committee"
                className="transition duration-300 hover:translate-x-1 hover:text-orange-300"
              >
                Committee
              </Link>

              <Link
                href="/donation"
                className="transition duration-300 hover:translate-x-1 hover:text-orange-300"
              >
                Donation
              </Link>

              <Link
                href="/contact"
                className="transition duration-300 hover:translate-x-1 hover:text-orange-300"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h4 className="mb-6 text-xl font-bold text-orange-200">
              Contact Us
            </h4>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin
                  size={20}
                  className="mt-1 text-orange-300"
                />

                <span className="leading-7 text-orange-100">
                  {settings?.address ||
                    "Juliuswadi, Maharashtra"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone
                  size={20}
                  className="text-orange-300"
                />

                <span>
                  {settings?.phone || "+91 XXXXX XXXXX"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={20}
                  className="text-orange-300"
                />

                <span>
                  {settings?.email ||
                    "info.juliuswadicharaja@gmail.com"}
                </span>
              </div>
            </div>
          </div>

          {/* Social */}

          <div>
            <h4 className="mb-6 text-xl font-bold text-orange-200">
              Follow Us
            </h4>

            <p className="mb-6 leading-7 text-orange-100">
              Stay connected with us for festival updates,
              live darshan and announcements.
            </p>

            <div className="flex gap-4">
              {/* Instagram */}

              <Link
                href={settings?.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-white/5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-pink-500
                  hover:bg-pink-600
                  hover:shadow-xl
                "
              >
                <FaInstagram size={22} />
              </Link>

              {/* YouTube */}

              <Link
                href={settings?.youtube || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-white/5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-red-500
                  hover:bg-red-600
                  hover:shadow-xl
                "
              >
                <FaYoutube size={22} />
              </Link>

              {/* X */}

              <Link
                href={settings?.twitter || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-white/5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-black
                  hover:border-white
                  hover:shadow-xl
                "
              >
                <FaXTwitter size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="flex flex-wrap items-center justify-center gap-2 text-center text-orange-100">
            © {new Date().getFullYear()} Juliuswadi Cha Raja.
            All Rights Reserved.

            <span className="mx-2 hidden md:inline">|</span>

            Made with

            <Heart
              size={18}
              className="fill-red-500 text-red-500"
            />

            for Ganpati Bappa 🙏
          </p>
        </div>
      </div>
    </footer>
  );
}