"use client";

export default function Divider() {
  return (
    <div className="my-20 flex items-center justify-center gap-4">
      <div className="h-[2px] w-24 rounded-full bg-orange-300"></div>

      <div className="h-4 w-4 rounded-full bg-orange-500 shadow-lg"></div>

      <div className="h-[2px] w-24 rounded-full bg-orange-300"></div>
    </div>
  );
}