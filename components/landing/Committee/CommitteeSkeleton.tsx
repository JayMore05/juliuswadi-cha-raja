"use client";

export default function CommitteeSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-[420px] animate-pulse rounded-3xl bg-orange-100"
        />
      ))}
    </div>
  );
}