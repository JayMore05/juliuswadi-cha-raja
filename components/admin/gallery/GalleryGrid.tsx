"use client";

import GalleryCard from "./GalleryCard";
import { useGallery } from "@/hooks/useGallery";

export default function GalleryGrid() {
  const { images, loading } = useGallery();

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-8 shadow">
        Loading...
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-8 shadow">
        No images uploaded yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {images.map((image) => (
        <GalleryCard
          key={image.id}
          image={image}
        />
      ))}
    </div>
  );
}