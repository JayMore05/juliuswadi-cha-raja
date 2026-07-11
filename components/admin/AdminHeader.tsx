"use client";

import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

interface Props {
  onMenuClick: () => void;
}

export default function AdminHeader({
  onMenuClick,
}: Props) {
  const router = useRouter();

  async function handleLogout() {
    const confirmLogout = confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    await supabase.auth.signOut();

    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">

      <div className="flex h-16 items-center justify-between px-6">

        <div className="flex items-center gap-4">

          <button
            onClick={onMenuClick}
            className="rounded-lg border p-2 transition hover:bg-orange-50 lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div>
            <h1 className="text-lg font-bold text-orange-600">
              Juliuswadi Cha Raja
            </h1>

            <p className="text-xs text-gray-500">
              Admin Dashboard
            </p>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="rounded-xl bg-orange-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-700"
        >
          Logout
        </button>

      </div>

    </header>
  );
}