"use client";

import CommitteeGrid from "@/components/admin/committee/CommitteeGrid";

export default function CommitteePage() {
  return (
    <div className="space-y-8">

      <div className="rounded-2xl border bg-white p-8 shadow">

        <h1 className="text-3xl font-bold">
          Committee Management
        </h1>

        <p className="mt-2 text-gray-500">
          Manage all committee members here.
        </p>

      </div>

      <CommitteeGrid />

    </div>
  );
}