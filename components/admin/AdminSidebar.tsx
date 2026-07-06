"use client";

import Link from "next/link";
import { adminMenu } from "@/lib/admin-menu";

export default function AdminSidebar() {
  return (
    <aside className="w-72 min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold text-orange-400">
        🛕 Juliuswadi CMS
      </h1>

      <p className="mt-1 text-sm text-gray-400">
        Admin Dashboard
      </p>

      <nav className="mt-10 space-y-2">
        {adminMenu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-orange-600"
            >
              <Icon size={20} />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}