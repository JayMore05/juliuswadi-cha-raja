"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { adminMenu } from "@/lib/admin-menu";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({
  open,
  onClose,
}: Props) {
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
fixed left-0 top-0 z-50 h-screen w-72 bg-gray-900 text-white transition-transform duration-300
${open ? "translate-x-0" : "-translate-x-full"}
md:sticky md:top-0 md:translate-x-0
`}
      >
        <div className="flex items-center justify-between p-6">

          <div>

            <h1 className="text-2xl font-bold text-orange-400">
              🛕 Juliuswadi CMS
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Admin Dashboard
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-800 md:hidden"
          >
            <X size={22} />
          </button>

        </div>

        <nav className="space-y-2 px-4">

          {adminMenu.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-orange-600"
              >
                <Icon size={20} />
                {item.title}
              </Link>
            );
          })}

        </nav>

      </aside>
    </>
  );
}