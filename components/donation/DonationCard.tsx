"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  QrCode,
  Smartphone,
  Heart,
} from "lucide-react";

import { usePublicSettings } from "@/hooks/usePublicSettings";

export default function DonationCard() {
  const { settings, loading } = usePublicSettings();

  if (loading) {
    return (
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 text-center">
          <p className="text-slate-500 text-lg">
            Loading donation details...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 lg:py-24">

      <div className="mx-auto max-w-6xl px-5 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            grid
            gap-10

            rounded-[36px]

            border
            border-orange-100

            bg-gradient-to-br
            from-white
            to-orange-50

            p-8

            shadow-2xl

            lg:grid-cols-2
            lg:p-12
          "
        >

          {/* Left */}

          <div>

            <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
              Support the Festival
            </span>

            <h2 className="mt-6 text-3xl font-bold text-[#5E120F] sm:text-4xl">
              Donate Securely
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Your generous contribution helps us organize
              Ganesh Festival, social activities and community
              service initiatives every year.
            </p>

            <div className="mt-10 space-y-6">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">

                  <Smartphone
                    size={22}
                    className="text-orange-600"
                  />

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    UPI ID
                  </p>

                  <p className="font-semibold text-[#5E120F] break-all">
                    {settings?.upi || "Not Available"}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">

                  <Heart
                    size={22}
                    className="text-orange-600"
                  />

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Google Pay
                  </p>

                  <p className="font-semibold text-[#5E120F] break-all">
                    {settings?.gpay || "Not Available"}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* QR */}

          <div className="flex flex-col items-center justify-center">

            {settings?.qr_image ? (

              <Image
                src={settings.qr_image}
                alt="Donation QR Code"
                width={320}
                height={320}
                className="
                  rounded-3xl
                  border-4
                  border-orange-200
                  bg-white
                  p-3
                  shadow-xl
                "
              />

            ) : (

              <div
                className="
                  flex
                  h-80
                  w-80
                  flex-col
                  items-center
                  justify-center
                  rounded-3xl
                  border-2
                  border-dashed
                  border-orange-200
                  bg-orange-50
                "
              >

                <QrCode
                  size={60}
                  className="text-orange-400"
                />

                <p className="mt-5 text-slate-500">
                  QR Code Not Uploaded
                </p>

              </div>

            )}

            <p className="mt-6 text-center text-slate-500">
              Scan using any UPI application
            </p>

          </div>

        </motion.div>

      </div>

    </section>
  );
}