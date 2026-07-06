"use client";

import UpdateCard from "./UpdateCard";
import { useUpdates } from "@/hooks/useUpdates";

export default function UpdateGrid() {
  const { updates, loading } = useUpdates();

  if (loading)
    return <p>Loading...</p>;

  if (!updates.length)
    return (
      <div className="rounded-2xl bg-white p-8 shadow">
        No Updates Yet
      </div>
    );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {updates.map((update) => (
        <UpdateCard
          key={update.id}
          update={update}
        />
      ))}
    </div>
  );
}