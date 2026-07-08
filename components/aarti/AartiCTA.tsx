"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export default function AartiCTA() {
  return (
    <section className="bg-white py-16 lg:py-24">

      <div className="mx-auto max-w-5xl px-5 sm:px-6">

        <div
          className="
            rounded-[36px]
            bg-gradient-to-r
            from-orange-500
            to-orange-600
            p-10
            text-center
            text-white
            shadow-2xl
          "
        >

          <Heart
            size={42}
            className="mx-auto mb-6 fill-white"
          />

          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Ganpati Bappa Morya!
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-orange-50 leading-8">
            May Lord Ganesha bless you and your family
            with happiness, prosperity and success.
          </p>

          <div className="mt-10">

            <Link
              href="/donation"
              className="
                inline-flex
                rounded-full
                bg-white
                px-8
                py-4
                font-bold
                text-orange-600
                transition
                hover:shadow-xl
              "
            >
              Support Our Mandal
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}