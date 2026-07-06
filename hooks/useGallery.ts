"use client";

import { useEffect, useState } from "react";
import { getGallery } from "@/lib/services/gallery";
import { GalleryImage } from "@/types/gallery";

export function useGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadGallery() {
    setLoading(true);

    const data = await getGallery();

    setImages(data);

    setLoading(false);
  }

  useEffect(() => {
    loadGallery();
  }, []);

  return {
    images,
    loading,
    refresh: loadGallery,
  };
}