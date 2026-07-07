"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { UpdateItem } from "@/lib/services/updates";

interface UpdateCardProps {
  update: UpdateItem;
}

export default function UpdateCard({
  update,
}: UpdateCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="overflow-hidden rounded-3xl bg-white shadow-xl"
    >
      {update.image_url && (
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={update.image_url}
            alt={update.title}
            fill
            className="object-cover transition duration-700 hover:scale-110"
          />
        </div>
      )}

      <div className="p-6">

        <div className="mb-4 flex items-center gap-2 text-orange-600">
          <CalendarDays size={18} />

          <span className="text-sm">
            {new Date(update.created_at).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-[#5E120F]">
          {update.title}
        </h3>

        <p className="mt-4 line-clamp-4 text-gray-600">
          {update.description}
        </p>

      </div>
    </motion.div>
  );
}