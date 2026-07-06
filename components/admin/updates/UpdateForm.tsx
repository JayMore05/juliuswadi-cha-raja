"use client";

import { useState } from "react";
import { addUpdate } from "@/lib/services/updates";

export default function UpdateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a description.");
      return;
    }

    try {
      setLoading(true);

      await addUpdate(title, description, file);

      setTitle("");
      setDescription("");
      setFile(undefined);

      // Clear file input
      const fileInput = document.getElementById(
        "update-image"
      ) as HTMLInputElement;

      if (fileInput) {
        fileInput.value = "";
      }

      alert("✅ Update Published Successfully!");

      // Reload page so the new card appears immediately
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to publish update.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-white p-8 shadow space-y-6"
    >
      <h2 className="text-3xl font-bold">
        Publish New Update
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-orange-500"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="h-40 w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-orange-500"
      />

      <input
        id="update-image"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0])}
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-orange-600 px-8 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:opacity-50"
      >
        {loading ? "Publishing..." : "Publish Update"}
      </button>
    </form>
  );
}