import { uploadImage } from "@/lib/services/upload";
import { BUCKETS } from "@/lib/constants/buckets";

export interface GalleryItem {
  id: string;
  created_at: string;
  title: string;
  image_url: string;
}

export async function getGallery(): Promise<GalleryItem[]> {
  const res = await fetch("/api/gallery", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load gallery.");
  }

  return await res.json();
}

export async function uploadGallery(
  file: File,
  title: string
) {
  const imageUrl = await uploadImage(
    file,
    BUCKETS.GALLERY
  );

  const res = await fetch("/api/gallery", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      image_url: imageUrl,
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.error || "Failed to upload image."
    );
  }

  return imageUrl;
}

export async function deleteGallery(
  id: string
) {
  const res = await fetch("/api/gallery", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.error || "Failed to delete image."
    );
  }

  return json;
}