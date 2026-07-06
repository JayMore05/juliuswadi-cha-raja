"use client";

import Image from "next/image";
import { toast } from "sonner";

import Button from "@/components/ui/Button";
import { deleteGallery } from "@/lib/services/gallery";

interface Props {
  image: {
    id: string;
    title: string;
    image_url: string;
  };
  refresh: () => Promise<void>;
}

export default function GalleryCard({
  image,
  refresh,
}: Props) {
  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this image?"
    );

    if (!confirmed) return;

    try {
      await deleteGallery(image.id);

      await refresh();

      toast.success("Image deleted successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete image.");
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-md">

      <Image
        src={image.image_url}
        alt={image.title}
        width={600}
        height={400}
        className="h-60 w-full object-cover"
      />

      <div className="space-y-4 p-4">

        <h2 className="text-lg font-semibold">
          {image.title}
        </h2>

        <div className="flex justify-end">
          <Button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </div>

      </div>

    </div>
  );
}