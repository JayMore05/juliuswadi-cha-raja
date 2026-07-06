"use client";

import Link from "next/link";

const actions = [
  {
    title: "Add Gallery",
    href: "/admin/gallery",
    icon: "📸",
  },
  {
    title: "Add Update",
    href: "/admin/updates",
    icon: "📰",
  },
  {
    title: "Committee",
    href: "/admin/committee",
    icon: "👥",
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: "⚙️",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="rounded-xl border border-orange-200 bg-orange-50 p-5 text-center transition hover:bg-orange-100"
          >
            <div className="text-4xl">
              {action.icon}
            </div>

            <h3 className="mt-3 font-semibold">
              {action.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}