"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GalleryItem } from "@/lib/services/gallery";

interface GalleryCardProps {
  image: GalleryItem;
  onClick: () => void;
}

export default function GalleryCard({
  image,
  onClick,
}: GalleryCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      onClick={onClick}
      className="
        group
        cursor-pointer
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-xl
        transition-all
        duration-300
        hover:shadow-2xl
      "
    >
      {/* Image */}

      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image.image_url}
          alt={image.title}
          fill
          sizes="(max-width:768px) 100vw,
                 (max-width:1200px) 50vw,
                 33vw"
          className="
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        {/* Overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/60
            via-black/10
            to-transparent
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />

        {/* View Text */}

        <div
          className="
            absolute
            bottom-5
            left-5
            translate-y-4
            opacity-0
            transition-all
            duration-500
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <span
            className="
              rounded-full
              bg-white/90
              px-4
              py-2
              text-sm
              font-semibold
              text-[#5E120F]
              backdrop-blur
            "
          >
            View Image
          </span>
        </div>
      </div>

      {/* Content */}

      <div className="p-5">
        <h3 className="truncate text-lg font-bold text-[#5E120F]">
          {image.title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Juliuswadi Cha Raja Gallery
        </p>
      </div>
    </motion.div>
  );
}