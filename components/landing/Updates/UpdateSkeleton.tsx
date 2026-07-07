"use client";

export default function UpdateSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-[420px] animate-pulse rounded-3xl bg-orange-100"
        />
      ))}
    </div>
  );
}