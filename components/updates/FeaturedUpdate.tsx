"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useUpdates } from "@/hooks/useUpdates";

export default function FeaturedUpdate() {
  const { updates, loading } = useUpdates();

  if (loading) {
    return (
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="text-center text-slate-500">
            Loading latest update...
          </div>
        </div>
      </section>
    );
  }

  if (updates.length === 0) {
    return (
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">

          <div className="rounded-3xl border border-dashed border-orange-200 p-16 text-center">

            <h2 className="text-3xl font-bold text-[#5E120F]">
              No Updates Available
            </h2>

            <p className="mt-4 text-slate-600">
              Festival announcements will appear here.
            </p>

          </div>

        </div>
      </section>
    );
  }

  const latest = updates[0];

  return (
    <section className="bg-white py-16 lg:py-24">

      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
            overflow-hidden
            rounded-[36px]
            bg-white
            shadow-2xl

            lg:grid
            lg:grid-cols-2
          "
        >

          {/* Image */}

          {latest.image_url && (
            <div className="relative h-72 lg:h-full">

              <Image
                src={latest.image_url}
                alt={latest.title}
                fill
                className="object-cover"
              />

            </div>
          )}

          {/* Content */}

          <div className="p-8 lg:p-12">

            <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
              Featured Update
            </span>

            <div className="mt-6 flex items-center gap-2 text-orange-600">

              <CalendarDays size={18} />

              {new Date(latest.created_at).toLocaleDateString()}

            </div>

            <h2 className="mt-6 text-4xl font-bold text-[#5E120F]">
              {latest.title}
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              {latest.description}
            </p>

          </div>

        </motion.div>

      </div>

    </section>
  );
}