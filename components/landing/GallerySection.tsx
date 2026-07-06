"use client";

import Image from "next/image";
import Link from "next/link";

const images = [
  "/images/ganpati.png",
  "/images/ganpati.png",
  "/images/ganpati.png",
  "/images/ganpati.png",
];

export default function GallerySection() {
  return (
    <section className="bg-[#FFF8F2] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 flex items-center justify-between">

          <div>
            <span className="rounded-full bg-orange-100 px-4 py-2 text-orange-600 font-semibold">
              📸 Gallery
            </span>

            <h2 className="mt-5 text-5xl font-black text-gray-900">
              Moments of Devotion
            </h2>

            <p className="mt-3 text-gray-600">
              Experience the divine celebrations.
            </p>
          </div>

          <Link
            href="/gallery"
            className="rounded-full border-2 border-orange-500 px-6 py-3 font-semibold text-orange-600 hover:bg-orange-500 hover:text-white transition"
          >
            View Gallery →
          </Link>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {images.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl shadow-xl"
            >
              <Image
                src={img}
                alt=""
                width={500}
                height={500}
                className="h-80 w-full object-cover transition duration-500 hover:scale-110"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}