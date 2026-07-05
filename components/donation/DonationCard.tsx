"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { Copy, QrCode, Smartphone } from "lucide-react";

export default function DonationCard() {
  const copyUPI = async () => {
    await navigator.clipboard.writeText(siteConfig.upi);
    alert("✅ UPI ID copied successfully!");
  };

  const openUPI = () => {
    window.location.href = `upi://pay?pa=${siteConfig.upi}&pn=${encodeURIComponent(
      siteConfig.name
    )}`;
  };

  return (
    <section
      id="donation"
      className="py-24 bg-gradient-to-b from-[#FFF8F2] to-white"
    >
      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-12 text-center">

          <span className="rounded-full bg-orange-100 px-4 py-2 text-orange-700 font-semibold">
            🙏 Support Ganpati Bappa
          </span>

          <h2 className="mt-6 text-5xl font-bold text-orange-600">
            Donate to Juliuswadi Cha Raja
          </h2>

          <p className="mt-4 text-gray-600">
            Every contribution helps us celebrate Ganesh Utsav with devotion,
            unity and tradition.
          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* QR Card */}

          <div className="rounded-3xl bg-white p-8 shadow-2xl">

            <div className="flex items-center gap-3">

              <QrCode className="text-orange-600" />

              <h3 className="text-2xl font-bold">
                Scan & Donate
              </h3>

            </div>

            <div className="mt-8 flex justify-center">

              <Image
                src="/qr/upi-qr.png"
                alt="UPI QR"
                width={320}
                height={320}
                className="rounded-2xl border"
              />

            </div>

            <p className="mt-6 text-center text-gray-600">
              Scan with any UPI App
            </p>

          </div>

          {/* Details Card */}

          <div className="rounded-3xl bg-white p-8 shadow-2xl">

            <h3 className="text-2xl font-bold text-orange-600">
              Donation Details
            </h3>

            <div className="mt-8 space-y-6">

              <div>

                <p className="text-gray-500">
                  UPI ID
                </p>

                <h4 className="text-xl font-semibold">
                  {siteConfig.upi}
                </h4>

              </div>

              <button
                onClick={copyUPI}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-orange-600 px-6 py-4 text-white font-semibold transition hover:bg-orange-700"
              >
                <Copy size={20} />

                Copy UPI ID
              </button>

              <button
                onClick={openUPI}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-orange-300 px-6 py-4 font-semibold text-orange-600 transition hover:bg-orange-50"
              >
                <Smartphone size={20} />

                Open UPI App
              </button>

              <div>

                <p className="text-gray-500">
                  Google Pay Number
                </p>

                <h4 className="text-xl font-bold">
                  {siteConfig.phone}
                </h4>

              </div>

              <div className="rounded-2xl bg-orange-50 p-5">

                <p className="text-center text-orange-700 font-medium">
                  ❤️ Thank you for supporting
                  <br />
                  Juliuswadi Cha Raja
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}