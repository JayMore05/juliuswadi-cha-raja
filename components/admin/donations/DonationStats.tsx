export default function DonationStats() {
  const cards = [
    {
      title: "Today's Collection",
      value: "₹0",
    },
    {
      title: "Cash",
      value: "₹0",
    },
    {
      title: "UPI",
      value: "₹0",
    },
    {
      title: "Pending Balance",
      value: "₹0",
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <p className="text-sm text-slate-500">
            {card.title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-orange-600">
            {card.value}
          </h2>
        </div>
      ))}
    </section>
  );
}