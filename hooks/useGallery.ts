"use client";

import { useEffect, useState } from "react";
import {
  getGallery,
  GalleryItem,
} from "@/lib/services/gallery";

export function useGallery() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);

    try {
      const data = await getGallery();
      setImages(data);
    } catch (error) {
      console.error("Gallery Error:", error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return {
    images,
    loading,
    refresh,
  };
}