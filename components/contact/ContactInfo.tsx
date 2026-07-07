"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

import {
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { IconType } from "react-icons";

import { usePublicSettings } from "@/hooks/usePublicSettings";

type ContactCard = {
  title: string;
  value: string;
  href: string;
  icon: IconType | typeof Phone;
};

export default function ContactInfo() {
  const { settings, loading } = usePublicSettings();

  if (loading) {
    return (
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 text-center">
          <p className="text-lg text-slate-500">
            Loading contact information...
          </p>
        </div>
      </section>
    );
  }

  const cards: ContactCard[] = [
    {
      title: "Phone",
      value: settings?.phone || "Not Available",
      icon: Phone,
      href: settings?.phone ? `tel:${settings.phone}` : "#",
    },
    {
      title: "Email",
      value: settings?.email || "Not Available",
      icon: Mail,
      href: settings?.email ? `mailto:${settings.email}` : "#",
    },
    {
      title: "Address",
      value: settings?.address || "Not Available",
      icon: MapPin,
      href: settings?.maps || "#",
    },
    {
      title: "Instagram",
      value: "Follow Us",
      icon: FaInstagram,
      href: settings?.instagram || "#",
    },
    {
      title: "YouTube",
      value: "Subscribe",
      icon: FaYoutube,
      href: settings?.youtube || "#",
    },
  ];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Heading */}

        <div className="mb-14 text-center">

          <span className="rounded-full bg-orange-100 px-5 py-2 font-semibold text-orange-600">
            Get In Touch
          </span>

          <h2 className="mt-5 font-heading text-3xl font-bold text-[#5E120F] sm:text-4xl lg:text-5xl">
            Contact Information
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-slate-600">
            Reach out to us for festival information, donations,
            volunteering opportunities or any other queries.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                href={card.href}
                target={
                  ["Address", "Instagram", "YouTube"].includes(card.title)
                    ? "_blank"
                    : undefined
                }
                rel="noopener noreferrer"
                className="
                  rounded-3xl
                  border
                  border-orange-100
                  bg-gradient-to-br
                  from-white
                  to-orange-50
                  p-8
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-2xl
                "
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white">

                  {"displayName" in Icon ? (
                    <Icon size={28} />
                  ) : (
                    <Icon className="h-7 w-7" />
                  )}

                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#5E120F]">
                  {card.title}
                </h3>

                <p className="mt-4 break-words leading-7 text-slate-600">
                  {card.value}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-600">
                  Open
                  <ExternalLink size={18} />
                </div>

              </Link>
            );
          })}

        </div>

      </div>
    </section>
  );
}