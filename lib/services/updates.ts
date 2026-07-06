import { uploadImage } from "@/lib/services/upload";
import { BUCKETS } from "@/lib/constants/buckets";

export interface UpdateItem {
  id: string;
  created_at: string;
  title: string;
  description: string;
  image_url: string | null;
}

/**
 * GET ALL UPDATES
 */
export async function getUpdates(): Promise<UpdateItem[]> {
  const res = await fetch("/api/updates", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load updates.");
  }

  return await res.json();
}

/**
 * ADD UPDATE
 */
export async function addUpdate(
  title: string,
  description: string,
  file?: File
) {
  let imageUrl: string | null = null;

  if (file) {
    imageUrl = await uploadImage(
      file,
      BUCKETS.UPDATES
    );
  }

  const res = await fetch("/api/updates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      image_url: imageUrl,
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.error || "Failed to publish update."
    );
  }

  return json;
}

/**
 * DELETE UPDATE
 */
export async function deleteUpdate(
  id: string
) {
  const res = await fetch("/api/updates", {
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
      json.error || "Failed to delete update."
    );
  }

  return json;
}