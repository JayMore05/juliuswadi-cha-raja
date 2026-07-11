"use client";

import { useEffect, useState } from "react";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalCollection: 0,
    cash: 0,
    upi: 0,
    pending: 0,
    donors: 0,
    receipts: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const res = await fetch("/api/donations");

    const data = await res.json();

    let cash = 0;
    let upi = 0;
    let total = 0;
    let pending = 0;

    data.forEach((d: any) => {
      total += Number(d.totalPaid);

      pending += Number(d.balance);

      d.payments.forEach((p: any) => {
        if (p.payment_mode === "Cash")
          cash += Number(p.amount);

        if (p.payment_mode === "UPI")
          upi += Number(p.amount);
      });
    });

    setStats({
      totalCollection: total,
      cash,
      upi,
      pending,
      donors: data.length,
      receipts: data.length,
    });
  }

  const cards = [
    {
      title: "Total Collection",
      value: `₹${stats.totalCollection}`,
      color: "bg-green-500",
    },
    {
      title: "Cash",
      value: `₹${stats.cash}`,
      color: "bg-orange-500",
    },
    {
      title: "UPI",
      value: `₹${stats.upi}`,
      color: "bg-blue-500",
    },
    {
      title: "Pending",
      value: `₹${stats.pending}`,
      color: "bg-red-500",
    },
    {
      title: "Donors",
      value: stats.donors,
      color: "bg-purple-500",
    },
    {
      title: "Receipts",
      value: stats.receipts,
      color: "bg-cyan-500",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} rounded-3xl p-6 text-white shadow-xl`}
        >
          <p className="text-sm opacity-80">
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