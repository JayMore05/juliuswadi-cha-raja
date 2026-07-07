"use client";

import { MapPinned } from "lucide-react";
import { usePublicSettings } from "@/hooks/usePublicSettings";

export default function ContactMap() {
  const { settings } = usePublicSettings();

  return (
    <section className="bg-[#FFF8F2] py-16 lg:py-24">

      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        <div className="mb-12 text-center">

          <span className="rounded-full bg-orange-100 px-5 py-2 font-semibold text-orange-600">
            Find Us
          </span>

          <h2 className="mt-5 font-heading text-3xl font-bold text-[#5E120F] sm:text-4xl lg:text-5xl">
            Visit Juliuswadi Cha Raja
          </h2>

        </div>

        <div
          className="
            rounded-[36px]
            border
            border-orange-100
            bg-white
            p-8
            shadow-xl
          "
        >

          <div className="flex flex-col items-center justify-center text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">

              <MapPinned
                size={40}
                className="text-orange-600"
              />

            </div>

            <h3 className="mt-6 text-3xl font-bold text-[#5E120F]">
              Visit Our Mandal
            </h3>

            <p className="mt-5 max-w-2xl leading-8 text-slate-600">
              {settings?.address ||
                "Juliuswadi, Maharashtra"}
            </p>

            <a
              href={settings?.maps || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-8
                inline-flex
                rounded-full
                bg-orange-600
                px-8
                py-4
                font-semibold
                text-white
                transition
                hover:bg-orange-700
              "
            >
              Open in Google Maps
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}