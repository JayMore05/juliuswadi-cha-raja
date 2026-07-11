"use client";

import Link from "next/link";
import {
  PlusCircle,
  IndianRupee,
  FileText,
  Download,
  RefreshCw,
  Image,
} from "lucide-react";

const actions = [
  {
    title: "New Donation",
    icon: PlusCircle,
    href: "/admin/donations",
    color: "bg-orange-500",
  },
  {
    title: "Receive Balance",
    icon: IndianRupee,
    href: "/admin/donations",
    color: "bg-green-600",
  },
  {
    title: "Print Report",
    icon: FileText,
    href: "/admin/donations",
    color: "bg-blue-600",
  },
  {
    title: "Download PDF",
    icon: Download,
    href: "/admin/donations",
    color: "bg-red-600",
  },
  {
    title: "Gallery",
    icon: Image,
    href: "/admin/gallery",
    color: "bg-purple-600",
  },
  {
    title: "Refresh",
    icon: RefreshCw,
    href: "/admin/dashboard",
    color: "bg-slate-700",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold text-slate-800">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className={`${action.color} rounded-2xl p-6 text-white transition hover:scale-105`}
            >
              <Icon size={40} />

              <h3 className="mt-4 text-xl font-bold">
                {action.title}
              </h3>
            </Link>
          );
        })}

      </div>

    </div>
  );
}