"use client";

import { Users } from "lucide-react";

export default function CommitteeEmpty() {
  return (
    <div className="rounded-3xl border border-dashed border-orange-300 bg-orange-50 py-20 text-center">
      <Users
        size={56}
        className="mx-auto text-orange-500"
      />

      <h3 className="mt-5 text-2xl font-bold text-[#5E120F]">
        Committee Members Coming Soon
      </h3>

      <p className="mt-3 text-gray-600">
        Our committee information will be available soon.
      </p>
    </div>
  );
}