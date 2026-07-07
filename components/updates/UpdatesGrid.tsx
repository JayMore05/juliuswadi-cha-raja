"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useUpdates } from "@/hooks/useUpdates";

export default function UpdatesGrid() {
  const { updates, loading } = useUpdates();

  if (loading || updates.length <= 1) return null;

  const remainingUpdates = updates.slice(1);

  return (
    <section className="bg-[#FFF8F2] py-16 lg:py-24">

      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        <div className="mb-14 text-center">

          <span className="rounded-full bg-orange-100 px-5 py-2 font-semibold text-orange-600">
            More Updates
          </span>

          <h2 className="mt-6 font-heading text-3xl font-bold text-[#5E120F] sm:text-4xl lg:text-5xl">
            Latest Festival News
          </h2>

        </div>

        <div
          className="
            grid
            gap-8

            md:grid-cols-2

            xl:grid-cols-3
          "
        >

          {remainingUpdates.map((item, index) => (

            <motion.div
              key={item.id}
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
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
              }}
              className="
                overflow-hidden
                rounded-3xl
                bg-white
                shadow-xl
              "
            >

              {item.image_url && (

                <Image
                  src={item.image_url}
                  alt={item.title}
                  width={700}
                  height={450}
                  className="
                    h-60
                    w-full
                    object-cover
                  "
                />

              )}

              <div className="p-6">

                <div className="flex items-center gap-2 text-orange-600">

                  <CalendarDays size={16} />

                  {new Date(item.created_at).toLocaleDateString()}

                </div>

                <h3 className="mt-5 text-2xl font-bold text-[#5E120F]">
                  {item.title}
                </h3>

                <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                  {item.description}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}