"use client";

import { useState } from "react";
import { useGallery } from "@/hooks/useGallery";
import GalleryCard from "./GalleryCard";
import GallerySkeleton from "./GallerySkeleton";
import GalleryEmpty from "./GalleryEmpty";
import GalleryLightbox from "./GalleryLightbox";

export default function GalleryGrid() {
  const { images, loading } = useGallery();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  if (loading) {
    return <GallerySkeleton />;
  }

  if (images.length === 0) {
    return <GalleryEmpty />;
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {images.map((image, index) => (
          <GalleryCard
            key={image.id}
            image={image}
            onClick={() => {
              setSelected(index);
              setOpen(true);
            }}
          />
        ))}

      </div>

      <GalleryLightbox
        images={images}
        index={selected}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}