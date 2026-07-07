"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useUpdates } from "@/hooks/useUpdates";
import Image from "next/image";

export default function UpdatesPreview() {
  const { updates, loading } = useUpdates();

  const latest = updates.slice(0, 3);

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
            Latest Updates
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
            Stay Updated
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
            "
          >
            Latest announcements, programs and events from Juliuswadi Cha Raja.
          </p>
        </div>

        {/* Loading */}

        {loading && (
          <div className="py-10 text-center text-slate-500">
            Loading latest updates...
          </div>
        )}

        {/* Cards */}

        {!loading && (
          <div
            className="
              grid

              gap-6

              md:grid-cols-3

              lg:gap-8
            "
          >
            {latest.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{
                  y: -8,
                }}
                className="
                  overflow-hidden
                  rounded-3xl
                  border
                  border-orange-100
                  bg-white
                  shadow-lg
                "
              >
                {item.image_url && (
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="
                      h-52
                      w-full
                      object-cover

                      sm:h-56
                    "
                  />
                )}

                <div
                  className="
                    p-5

                    lg:p-6
                  "
                >
                  <div
                    className="
                      mb-4

                      flex
                      items-center
                      gap-2

                      text-xs

                      text-orange-600

                      sm:text-sm
                    "
                  >
                    <Calendar size={16} />

                    {new Date(item.created_at).toLocaleDateString()}
                  </div>

                  <h3
                    className="
                      text-xl

                      font-bold

                      text-[#5E120F]

                      lg:text-2xl
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-4

                      line-clamp-3

                      text-sm

                      leading-7

                      text-slate-600

                      lg:text-base
                    "
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Button */}

        <div
          className="
            mt-12

            text-center

            lg:mt-16
          "
        >
          <Link
            href="/updates"
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
            View All Updates

            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}