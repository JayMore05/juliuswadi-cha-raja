import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react";

import { getAllAarti } from "@/lib/server/aarti";

export default async function AartiPage() {
  const pages = await getAllAarti();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFF9F3] to-[#FFF4E6]">

      {/* Hero */}

      <section className="relative overflow-hidden bg-gradient-to-r from-orange-700 via-orange-600 to-amber-500 py-24">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]" />

        <div className="relative mx-auto max-w-6xl px-6 text-center">

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-white backdrop-blur transition hover:bg-white/25"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="mt-10 text-6xl">
            🪔
          </div>

          <h1 className="mt-6 text-5xl font-bold text-white lg:text-6xl">
            Marathi Aarti Sangrah
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-orange-100">
            Read the complete traditional Marathi Aarti
            sequence performed during Ganesh Festival.
            Beautifully formatted for mobile, tablet and desktop.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <span className="rounded-full bg-white/15 px-5 py-3 text-white backdrop-blur">
              📖 {pages.length} Pages
            </span>

            <span className="rounded-full bg-white/15 px-5 py-3 text-white backdrop-blur">
              🇮🇳 Marathi
            </span>

            <span className="rounded-full bg-white/15 px-5 py-3 text-white backdrop-blur">
              🙏 Daily Prayer
            </span>

          </div>

          {pages.length > 0 && (
            <Link
              href={`/aarti/${pages[0].slug}`}
              className="mt-12 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-bold text-orange-600 transition hover:scale-105"
            >
              <BookOpen size={22} />
              Start Reading
              <ArrowRight size={20} />
            </Link>
          )}

        </div>

      </section>

      {/* Contents */}

      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="mb-12 text-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 font-semibold text-orange-700">
            <Sparkles size={18} />
            Contents
          </div>

          <h2 className="mt-5 text-4xl font-bold text-[#5E120F]">
            Aarti Sequence
          </h2>

          <p className="mt-3 text-gray-600">
            Follow the traditional order of the Marathi Aarti Sangrah.
          </p>

        </div>

        <div className="grid gap-5">

          {pages.map((page, index) => (
            <Link
              key={page.id}
              href={`/aarti/${page.slug}`}
              className="group rounded-3xl border border-orange-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-5">

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-orange-700">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="text-2xl font-bold text-[#5E120F] group-hover:text-orange-600">
                      {page.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-2">

                      <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700">
                        {page.category}
                      </span>

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                        {page.language}
                      </span>

                    </div>

                  </div>

                </div>

                <ArrowRight className="text-orange-500 transition group-hover:translate-x-2" />

              </div>

            </Link>
          ))}

        </div>

      </section>

    </main>
  );
}