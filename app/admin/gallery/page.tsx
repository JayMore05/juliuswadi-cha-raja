"use client";

import { useState } from "react";
import GalleryUploader from "@/components/admin/gallery/GalleryUploader";
import GalleryGrid from "@/components/admin/gallery/GalleryGrid";

export default function GalleryPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-8">

      <GalleryUploader
        onUploadSuccess={() =>
          setRefreshKey((prev) => prev + 1)
        }
      />

      <GalleryGrid key={refreshKey} />

    </div>
  );
}