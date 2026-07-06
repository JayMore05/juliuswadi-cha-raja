"use client";

import { UpdateItem } from "@/types/update";
import UpdateCard from "./UpdateCard";

interface UpdateGridProps {
  updates: UpdateItem[];
  loading: boolean;
  refresh: () => Promise<void>;
}

export default function UpdateGrid({
  updates,
  loading,
  refresh,
}: UpdateGridProps) {
  console.log("🔷 UpdateGrid Render:", updates.length, updates);

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-8 shadow">
        Loading updates...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-red-100 p-4 border border-red-300">
        <h2 className="text-lg font-bold">
          Total Updates: {updates.length}
        </h2>
      </div>

      {updates.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 shadow">
          No updates published yet.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {updates.map((update) => (
            <UpdateCard
              key={update.id}
              update={update}
              refresh={refresh}
            />
          ))}
        </div>
      )}
    </div>
  );
}