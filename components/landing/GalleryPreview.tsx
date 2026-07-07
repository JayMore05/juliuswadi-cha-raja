"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const images = [
  "/gallery/gallery1.jpg",
  "/gallery/gallery2.jpg",
  "/gallery/gallery3.jpg",
  "/gallery/gallery4.jpg",
  "/gallery/gallery5.jpg",
];

export default function GalleryPreview() {
  return (
    <section
      className="
        bg-[#FFF8F2]

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
            Gallery
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
            Beautiful Memories
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
            A glimpse of the divine celebrations, cultural events,
            and unforgettable moments from Juliuswadi Cha Raja.
          </p>
        </div>

        {/* Gallery */}

        <div
          className="
            grid

            grid-cols-2

            gap-3

            sm:gap-4

            md:grid-cols-4

            lg:gap-5
          "
        >
          {images.map((image, index) => (
            <motion.div
              key={image}
              whileHover={{ scale: 1.04 }}
              className={`
                overflow-hidden
                rounded-2xl
                shadow-xl

                lg:rounded-3xl

                ${
                  index === 2
                    ? "md:col-span-2 md:row-span-2"
                    : ""
                }
              `}
            >
              <Image
                src={image}
                alt="Gallery"
                width={600}
                height={600}
                className="
                  h-44
                  w-full
                  object-cover
                  transition
                  duration-500
                  hover:scale-110

                  sm:h-56

                  md:h-full
                "
              />
            </motion.div>
          ))}
        </div>

        {/* Button */}

        <div
          className="
            mt-12

            text-center

            lg:mt-16
          "
        >
          <Link
            href="/gallery"
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
            View Full Gallery

            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}