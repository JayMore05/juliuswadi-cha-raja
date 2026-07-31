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
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur print:hidden">

      <div className="flex h-16 items-center justify-between px-4 sm:px-6">

        <div className="flex min-w-0 items-center gap-3">

          <button
            onClick={onMenuClick}
            className="rounded-lg border p-2 transition hover:bg-orange-50 lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-orange-600 sm:text-lg">
              Juliuswadi Cha Raja
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Admin Dashboard
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}