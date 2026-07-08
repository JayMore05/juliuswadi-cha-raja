"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AartiPreview() {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white py-20">

      <div className="mx-auto max-w-4xl px-6 text-center">

        {/* Badge */}

        <span className="inline-flex rounded-full bg-orange-100 px-5 py-2 font-semibold text-orange-700">
          🪔 Devotional Library
        </span>

        {/* Heading */}

        <h2 className="mt-6 text-4xl font-bold text-[#5E120F] lg:text-6xl">
          Marathi Aarti Sangrah
        </h2>

        {/* Description */}

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-slate-600">
          Experience the complete traditional Marathi Aarti
          sequence performed during Ganesh Festival.
          Read beautifully formatted Aartis in the same
          order as the printed Aarti Sangrah.
        </p>

        {/* Badges */}

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <span className="rounded-full bg-orange-100 px-5 py-3 text-orange-700">
            📖 9 Pages
          </span>

          <span className="rounded-full bg-orange-100 px-5 py-3 text-orange-700">
            🇮🇳 Marathi
          </span>

          <span className="rounded-full bg-orange-100 px-5 py-3 text-orange-700">
            🙏 Daily Prayer
          </span>

        </div>

        {/* Button */}

        <div className="mt-12">

          <Link
            href="/aarti"
            className="inline-flex items-center gap-3 rounded-full bg-orange-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-700 hover:shadow-2xl"
          >
            Start Reading

            <ArrowRight size={22} />

          </Link>

        </div>

      </div>

    </section>
  );
}