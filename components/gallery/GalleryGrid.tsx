"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useGallery } from "@/hooks/useGallery";

export default function GalleryGrid() {
  const { images, loading } = useGallery();

  if (loading) {
    return (
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="text-center text-slate-500 text-lg">
            Loading Gallery...
          </div>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">

          <div className="rounded-3xl border border-dashed border-orange-200 bg-orange-50 p-16 text-center">

            <h2 className="text-3xl font-bold text-[#5E120F]">
              No Gallery Images Yet
            </h2>

            <p className="mt-4 text-slate-600">
              Upload beautiful festival photos from the Admin Panel.
            </p>

          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 lg:py-24">

      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Heading */}

        <div className="mb-14 text-center">

          <span className="rounded-full bg-orange-100 px-5 py-2 font-semibold text-orange-600">
            Festival Memories
          </span>

          <h2 className="mt-5 font-heading text-3xl font-bold text-[#5E120F] sm:text-4xl lg:text-5xl">
            Our Gallery
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-600">
            Explore the beautiful celebrations, decorations,
            cultural programs and unforgettable memories of
            Juliuswadi Cha Raja.
          </p>

        </div>

        {/* Images */}

        <div
          className="
            grid
            grid-cols-2
            gap-4

            sm:grid-cols-2

            md:grid-cols-3

            lg:grid-cols-4
          "
        >

          {images.map((photo, index) => (

            <motion.div
              key={photo.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                scale: 1.03,
              }}
              className="
                overflow-hidden
                rounded-3xl
                bg-white
                shadow-xl
              "
            >

              <Image
                src={photo.image_url}
                alt={photo.title}
                width={700}
                height={700}
                className="
                  h-56
                  w-full
                  object-cover
                  transition
                  duration-500
                  hover:scale-110

                  sm:h-64

                  md:h-72

                  lg:h-80
                "
              />

              <div className="p-5">

                <h3 className="text-xl font-bold text-[#5E120F]">
                  {photo.title}
                </h3>

                <p className="mt-3 text-sm text-slate-500">
                  {new Date(photo.created_at).toLocaleDateString()}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}