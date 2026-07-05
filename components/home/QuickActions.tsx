import Link from "next/link";
import {
  Images,
  MapPin,
  CalendarDays,
  HandCoins,
} from "lucide-react";

const actions = [
  {
    title: "Donate",
    icon: HandCoins,
    href: "#donation",
    color: "bg-orange-500",
  },
  {
    title: "Gallery",
    icon: Images,
    href: "#gallery",
    color: "bg-yellow-500",
  },
  {
    title: "Events",
    icon: CalendarDays,
    href: "#events",
    color: "bg-red-500",
  },
  {
    title: "Location",
    icon: MapPin,
    href: "#location",
    color: "bg-green-500",
  },
];

export default function QuickActions() {
  return (
    <section className="-mt-8 relative z-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 md:grid-cols-4">
        {actions.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
          >
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${item.color}`}
            >
              <item.icon className="text-white" size={28} />
            </div>

            <h3 className="mt-4 text-center font-semibold">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}