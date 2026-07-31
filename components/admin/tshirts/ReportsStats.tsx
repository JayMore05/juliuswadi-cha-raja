"use client";

interface Props {
  totalBookings: number;
  totalRevenue: number;
  totalTshirts: number;
  delivered: number;
  pending: number;
}

export default function ReportsStats({
  totalBookings,
  totalRevenue,
  totalTshirts,
  delivered,
  pending,
}: Props) {
  const cards = [
    {
      title: "Total Bookings",
      value: totalBookings,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "T-Shirts",
      value: totalTshirts,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Delivered",
      value: delivered,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Pending",
      value: pending,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-2xl border p-5 shadow-sm ${card.bg}`}
        >
          <p className="text-sm text-gray-500">
            {card.title}
          </p>

          <h2 className={`mt-2 text-3xl font-bold ${card.color}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}