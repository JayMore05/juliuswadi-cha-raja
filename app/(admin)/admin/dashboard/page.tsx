"use client";

import Link from "next/link";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import RecentDonations from "@/components/admin/dashboard/RecentDonations";
import TodayCollection from "@/components/admin/dashboard/TodayCollection";
import QuickActions from "@/components/admin/dashboard/QuickActions";

const cards = [
  {
    title: "Settings",
    icon: "⚙️",
    href: "/admin/settings",
    description: "Manage mandal information and public settings.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Gallery",
    icon: "🖼",
    href: "/admin/gallery",
    description: "Upload and organize festival gallery images.",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Updates",
    icon: "📢",
    href: "/admin/updates",
    description: "Publish announcements and festival updates.",
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Committee",
    icon: "👥",
    href: "/admin/committee",
    description: "Manage committee members and their details.",
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Aarti Sangrah",
    icon: "🪔",
    href: "/admin/aarti",
    description: "Manage Aarti pages, Stotra and devotional content.",
    color: "from-red-500 to-orange-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-8 text-white shadow-xl">

        <p className="text-sm uppercase tracking-[5px] text-orange-100">
          Juliuswadi Cha Raja
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-4 max-w-2xl text-orange-100">
          Manage your Ganpati Mandal website from one place.
          Update gallery, committee members, Aarti Sangrah,
          announcements and other public information.
        </p>

      </div>
<DashboardStats />
<RecentDonations />
<QuickActions />
<RecentDonations />


      {/* Dashboard Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {cards.map((card) => (

          <Link
            key={card.title}
            href={card.href}
            className="
              group
              overflow-hidden
              rounded-3xl
              border
              border-orange-100
              bg-white
              shadow-md
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-2xl
            "
          >

            <div
              className={`bg-gradient-to-r ${card.color} p-6`}
            >

              <div className="text-5xl">
                {card.icon}
              </div>

            </div>

            <div className="p-6">

              <h2 className="text-2xl font-bold text-slate-800 group-hover:text-orange-600">
                {card.title}
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                {card.description}
              </p>

              <div className="mt-6 flex items-center text-sm font-semibold text-orange-600">

                Manage →

              </div>

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}