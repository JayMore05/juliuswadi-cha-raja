"use client";

import { ImageOff } from "lucide-react";

export default function GalleryEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-orange-300 bg-orange-50 py-24">

      <ImageOff
        size={60}
        className="text-orange-400"
      />

      <h3 className="mt-6 text-2xl font-bold text-[#5E120F]">
        No Gallery Images
      </h3>

      <p className="mt-2 text-gray-500">
        Upload images from Admin Panel.
      </p>

    </div>
  );
}