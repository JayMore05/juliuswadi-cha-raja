"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import CommitteeGrid from "./Committee/CommitteeGrid";

export default function Committee() {
  return (
    <section
      className="
        bg-white

        py-16

        sm:py-20

        lg:py-28
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl

          px-5

          sm:px-6
        "
      >
        {/* Heading */}

        <div className="mb-12 text-center lg:mb-16">
          <span
            className="
              rounded-full
              bg-orange-100

              px-4
              py-2

              text-sm
              font-semibold
              text-orange-600

              sm:px-5
              sm:text-base
            "
          >
            Committee
          </span>

          <h2
            className="
              mt-5

              font-heading

              text-3xl

              sm:text-4xl

              lg:text-5xl

              font-bold
              text-[#5E120F]
            "
          >
            Meet Our Committee
          </h2>

          <p
            className="
              mx-auto

              mt-5

              max-w-2xl

              px-2

              text-base

              leading-7

              text-slate-600

              sm:px-0
              sm:text-lg
              sm:leading-8
            "
          >
            Dedicated volunteers working together with devotion,
            unity and commitment to make every Ganesh Festival
            memorable.
          </p>
        </div>

        {/* Committee Grid */}

        <CommitteeGrid />

        {/* Button */}

        <div
          className="
            mt-12

            text-center

            lg:mt-16
          "
        >
          <Link
            href="/committee"
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              bg-orange-600

              px-7
              py-3

              text-sm
              font-semibold

              text-white

              transition

              hover:bg-orange-700

              sm:px-8
              sm:py-4
              sm:text-base
            "
          >
            View Full Committee

            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
} 