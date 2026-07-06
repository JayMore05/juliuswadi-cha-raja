"use client";

import { Menu } from "lucide-react";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 md:h-20 items-center justify-between border-b bg-white px-4 md:px-8 shadow-sm">

      <div className="flex items-center gap-3">

        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
        >
          <Menu size={24} />
        </button>

        <div>
          <h2 className="text-xl font-bold md:text-2xl">
            Dashboard
          </h2>

          <p className="hidden text-sm text-gray-500 md:block">
            Welcome to Juliuswadi Cha Raja CMS
          </p>
        </div>

      </div>

      <button className="rounded-lg bg-orange-600 px-4 py-2 text-sm text-white hover:bg-orange-700 md:px-5">
        Logout
      </button>

    </header>
  );
}