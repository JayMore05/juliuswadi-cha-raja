"use client";

export default function GallerySkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-[340px] animate-pulse rounded-3xl bg-orange-100"
        />
      ))}

    </div>
  );
}