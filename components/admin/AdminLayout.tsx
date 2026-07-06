"use client";

import { ReactNode, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-slate-100">

      <AdminHeader
        onMenuClick={() =>
          setSidebarOpen(true)
        }
      />

      <div className="flex">

        <AdminSidebar
          open={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}