"use client";

import { useUpdates } from "@/hooks/useUpdates";
import UpdateCard from "./UpdateCard";
import UpdateSkeleton from "./UpdateSkeleton";
import UpdateEmpty from "./UpdateEmpty";

export default function UpdatesGrid() {
  const { updates, loading } = useUpdates();

  if (loading) {
    return <UpdateSkeleton />;
  }

  if (updates.length === 0) {
    return <UpdateEmpty />;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {updates.map((item) => (
        <UpdateCard
          key={item.id}
          update={item}
        />
      ))}
    </div>
  );
}