"use client";

import Image from "next/image";
import { GalleryItem } from "@/lib/services/gallery";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface GalleryLightboxProps {
  images: GalleryItem[];
  index: number;
  open: boolean;
  onClose: () => void;
}

export default function GalleryLightbox({
  images,
  index,
  open,
  onClose,
}: GalleryLightboxProps) {
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    setCurrent(index);
  }, [index]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!open) return;

      if (e.key === "Escape") onClose();

      if (e.key === "ArrowRight") {
        setCurrent((prev) => (prev + 1) % images.length);
      }

      if (e.key === "ArrowLeft") {
        setCurrent((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [open, images.length, onClose]);

  if (!open || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Close */}

        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
        >
          <X size={26} />
        </button>

        {/* Previous */}

        <button
          onClick={() =>
            setCurrent((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            )
          }
          className="absolute left-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
        >
          <ChevronLeft size={30} />
        </button>

        {/* Image */}

        <motion.div
          key={images[current].id}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative h-[80vh] w-full max-w-5xl"
        >
          <Image
            src={images[current].image_url}
            alt={images[current].title}
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Next */}

        <button
          onClick={() =>
            setCurrent((prev) => (prev + 1) % images.length)
          }
          className="absolute right-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
        >
          <ChevronRight size={30} />
        </button>

        {/* Caption */}

        <div className="absolute bottom-8 text-center text-white">
          <h3 className="text-2xl font-bold">
            {images[current].title}
          </h3>

          <p className="mt-2 text-white/70">
            {current + 1} / {images.length}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}