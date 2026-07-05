import Image from "next/image";
import { siteConfig } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-[#FFF8F2] to-white">
      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col-reverse items-center justify-between gap-12 px-6 py-16 lg:flex-row">

        {/* Left */}
        <div className="max-w-xl text-center lg:text-left">

          <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
            🕉️ श्री गणेशाय नमः
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-900 lg:text-7xl">
            {siteConfig.name}
          </h1>

          <h2 className="mt-4 text-3xl font-bold text-orange-600">
            {siteConfig.marathiName}
          </h2>

          <div className="mt-6 inline-block rounded-full bg-yellow-100 px-5 py-2">
            <span className="font-semibold text-yellow-800">
              🎉 Celebrating {siteConfig.years} Glorious Years
            </span>
          </div>

          <p className="mt-8 text-lg leading-8 text-gray-600">
            Welcome to the official website of Juliuswadi Cha Raja.
            Join us in celebrating Lord Ganesha with devotion,
            unity, and tradition.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">

            <button className="rounded-full bg-orange-600 px-8 py-4 text-lg font-bold text-white transition hover:scale-105 hover:bg-orange-700">
              Donate Now
            </button>

            <button className="rounded-full border border-orange-300 bg-white px-8 py-4 text-lg font-semibold text-orange-600 transition hover:bg-orange-50">
              Live Updates
            </button>

          </div>

        </div>

        {/* Right */}

        <div className="relative">

          <div className="absolute -inset-6 rounded-full bg-orange-200 blur-3xl opacity-40"></div>

          <Image
            src="/images/ganpati.png"
            alt="Ganpati Bappa"
            width={500}
            height={600}
            priority
            className="relative z-10 rounded-3xl object-cover shadow-2xl"
          />

        </div>

      </div>
    </section>
  );
}