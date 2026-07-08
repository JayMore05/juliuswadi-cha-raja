"use client";

import Link from "next/link";

import { useAarti } from "@/hooks/useAarti";

import { deleteAartiPage } from "@/lib/services/aarti";

import AartiCard from "./AartiCard";
import AartiEmpty from "./AartiEmpty";
import AartiSkeleton from "./AartiSkeleton";

export default function AartiGrid() {
  const {
    pages,
    loading,
    refresh,
  } = useAarti();

  async function handleDelete(id: string) {
    try {
      await deleteAartiPage(id);

      await refresh();

      alert("Aarti page deleted successfully.");
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to delete page."
      );
    }
  }

  if (loading) {
    return <AartiSkeleton />;
  }

  const sortedPages = [...pages].sort(
    (a, b) => a.display_order - b.display_order
  );

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div />

        <Link
          href="/admin/aarti/new"
          className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            bg-orange-600
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-orange-700
          "
        >
          + Add New Page
        </Link>

      </div>

      {sortedPages.length === 0 ? (
        <AartiEmpty />
      ) : (
        <div className="grid gap-6">
          {sortedPages.map((page) => (
            <AartiCard
              key={page.id}
              page={page}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

    </div>
  );
}