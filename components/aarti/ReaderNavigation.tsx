"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Home,
} from "lucide-react";

interface Props {
  previous?: {
    id: string;
    title: string;
  };

  next?: {
    id: string;
    title: string;
  };
}

export default function ReaderNavigation({
  previous,
  next,
}: Props) {
  return (
    <section className="bg-[#FFF9F3] py-16 print:hidden">

      <div className="mx-auto max-w-6xl px-6">

        {/* Top Navigation */}

        <div className="mb-10 flex flex-wrap items-center justify-center gap-4">

          <Link
            href="/"
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-orange-200
              bg-white
              px-5
              py-3
              font-semibold
              text-[#5E120F]
              shadow
              transition
              hover:bg-orange-50
            "
          >
            <Home size={18} />
            Home
          </Link>

          <Link
            href="/aarti"
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-orange-600
              px-6
              py-3
              font-semibold
              text-white
              shadow-lg
              transition
              hover:bg-orange-700
            "
          >
            <BookOpen size={18} />
            Aarti Contents
          </Link>

        </div>

        {/* Previous / Next */}

        <div className="grid gap-6 md:grid-cols-2">

          {previous ? (

            <Link
              href={`/aarti/${previous.id}`}
              className="
                group
                rounded-3xl
                border
                border-orange-200
                bg-white
                p-6
                shadow-md
                transition
                hover:-translate-y-1
                hover:shadow-xl
              "
            >

              <div className="flex items-center gap-3 text-orange-600">

                <ArrowLeft
                  className="transition group-hover:-translate-x-1"
                />

                <span className="font-semibold">
                  Previous Page
                </span>

              </div>

              <h3 className="mt-4 text-xl font-bold text-[#5E120F]">
                {previous.title}
              </h3>

            </Link>

          ) : (

            <div className="rounded-3xl border border-dashed border-orange-200 bg-white p-6 text-center text-gray-400">

              Beginning of Aarti Sangrah

            </div>

          )}

          {next ? (

            <Link
              href={`/aarti/${next.id}`}
              className="
                group
                rounded-3xl
                border
                border-orange-200
                bg-white
                p-6
                text-right
                shadow-md
                transition
                hover:-translate-y-1
                hover:shadow-xl
              "
            >

              <div className="flex items-center justify-end gap-3 text-orange-600">

                <span className="font-semibold">
                  Next Page
                </span>

                <ArrowRight
                  className="transition group-hover:translate-x-1"
                />

              </div>

              <h3 className="mt-4 text-xl font-bold text-[#5E120F]">
                {next.title}
              </h3>

            </Link>

          ) : (

            <div className="rounded-3xl border border-dashed border-orange-200 bg-white p-6 text-center text-gray-400">

              End of Aarti Sangrah 🙏

            </div>

          )}

        </div>

      </div>

    </section>
  );
}