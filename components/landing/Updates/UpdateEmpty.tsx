"use client";

import { BellOff } from "lucide-react";

export default function UpdateEmpty() {
  return (
    <div className="rounded-3xl border border-dashed border-orange-300 bg-orange-50 py-20 text-center">
      <BellOff className="mx-auto h-14 w-14 text-orange-500" />

      <h3 className="mt-5 text-2xl font-bold text-[#5E120F]">
        No Updates Available
      </h3>

      <p className="mt-2 text-gray-600">
        Latest announcements from Juliuswadi Cha Raja will appear here.
      </p>
    </div>
  );
}