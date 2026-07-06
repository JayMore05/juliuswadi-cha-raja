"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";
import { uploadGallery } from "@/lib/services/gallery";

interface Props {
  onUploadSuccess: () => void;
}

export default function GalleryUploader({
  onUploadSuccess,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file) {
      toast.error("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
      });

      await uploadGallery(compressed, title);

      toast.success("Image uploaded successfully!");

      setFile(null);
      setTitle("");

      onUploadSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-8 shadow">

      <h2 className="text-2xl font-bold">
        Upload Gallery Image
      </h2>

      <input
        className="mt-6 w-full rounded-lg border p-3"
        placeholder="Image title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        className="mt-4"
        onChange={(e) =>
          setFile(e.target.files?.[0] || null)
        }
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-6 rounded-xl bg-orange-600 px-6 py-3 text-white hover:bg-orange-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>

    </div>
  );
}