"use client";

import Link from "next/link";
import { AartiPage } from "@/lib/types/aarti";

interface Props {
  page: AartiPage;
  onDelete: (id: string) => Promise<void>;
}

export default function AartiCard({
  page,
  onDelete,
}: Props) {
  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${page.title}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await onDelete(page.id);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to delete page."
      );
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Side */}
        <div className="flex-1">

          <h2 className="text-2xl font-bold text-gray-900">
            📖 {page.title}
          </h2>

          <div className="mt-4 flex flex-wrap gap-3">

            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
              {page.category}
            </span>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {page.language}
            </span>

            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
              Order: {page.display_order}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                page.is_active
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {page.is_active ? "Active" : "Inactive"}
            </span>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex gap-3">

          <Link
            href={`/admin/aarti/${page.id}`}
            className="rounded-lg bg-orange-600 px-5 py-2 font-medium text-white transition hover:bg-orange-700"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}