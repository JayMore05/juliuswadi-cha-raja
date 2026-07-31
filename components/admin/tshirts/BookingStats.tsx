"use client";

import { DashboardStats } from "@/types/tshirt";

interface Props {
  stats: DashboardStats;
}

export default function BookingStats({
  stats,
}: Props) {
  const cards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      color: "from-orange-500 to-amber-500",
    },
    {
      title: "Today's Bookings",
      value: stats.todayBookings,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Delivered",
      value: stats.totalDelivered,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Remaining",
      value: stats.remainingDistribution,
      color: "from-red-500 to-pink-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-3xl bg-gradient-to-r ${card.color} p-6 text-white shadow-lg`}
        >
          <p className="text-sm opacity-90">
            {card.title}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
