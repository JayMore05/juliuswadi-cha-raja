"use client";

import Image from "next/image";

interface GalleryCardProps {
  image: {
    id: string;
    image_url: string;
    title?: string;
  };

  onClick: () => void;
}

export default function GalleryCard({
  image,
  onClick,
}: GalleryCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl shadow-lg transition hover:scale-[1.02]"
    >
      <Image
        src={image.image_url}
        alt={image.title ?? "Gallery Image"}
        width={800}
        height={600}
        className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
    </button>
  );
}