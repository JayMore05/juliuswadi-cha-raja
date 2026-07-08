"use client";

import { useAarti } from "@/hooks/useAarti";
import AartiCard from "./AartiCard";

export default function AartiList() {
  const { pages, loading } = useAarti();

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading Aarti...
      </div>
    );
  }

  const activePages = pages
    .filter((p) => p.is_active)
    .sort(
      (a, b) =>
        a.display_order - b.display_order
    );

  if (activePages.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        No Aarti Available.
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {activePages.map((page) => (
        <AartiCard
          key={page.id}
          page={page}
        />
      ))}
    </div>
  );
}