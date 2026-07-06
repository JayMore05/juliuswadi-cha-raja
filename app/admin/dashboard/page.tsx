"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      <div className="rounded-2xl border bg-white p-8 shadow">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome to Juliuswadi Cha Raja Admin Panel.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Link
          href="/admin/settings"
          className="rounded-2xl border bg-white p-6 shadow transition hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold">
            ⚙️ Settings
          </h2>

          <p className="mt-2 text-gray-500">
            Manage mandal information.
          </p>
        </Link>

        <Link
          href="/admin/gallery"
          className="rounded-2xl border bg-white p-6 shadow transition hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold">
            🖼 Gallery
          </h2>

          <p className="mt-2 text-gray-500">
            Upload and manage gallery images.
          </p>
        </Link>

        <Link
          href="/admin/updates"
          className="rounded-2xl border bg-white p-6 shadow transition hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold">
            📢 Updates
          </h2>

          <p className="mt-2 text-gray-500">
            Publish festival updates.
          </p>
        </Link>

        <Link
          href="/admin/committee"
          className="rounded-2xl border bg-white p-6 shadow transition hover:shadow-lg"
        >
          <h2 className="text-xl font-semibold">
            👥 Committee
          </h2>

          <p className="mt-2 text-gray-500">
            Manage committee members.
          </p>
        </Link>

      </div>

    </div>
  );
}