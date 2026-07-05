import { CalendarDays, Clock3, Bell } from "lucide-react";

export default function UpdatesSection() {
  return (
    <section id="updates" className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-red-100 px-4 py-2 text-red-600 font-semibold">
            🔴 LIVE UPDATES
          </span>

          <h2 className="mt-5 text-5xl font-bold text-gray-900">
            Today's Festival Updates
          </h2>

          <p className="mt-4 text-gray-600">
            Stay updated with the latest announcements and events.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <Bell className="text-orange-600" size={40} />

            <h3 className="mt-6 text-2xl font-bold">
              Ganpati Aagman
            </h3>

            <p className="mt-4 text-gray-600">
              Celebration begins with great devotion.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <Clock3 className="text-orange-600" size={40} />

            <h3 className="mt-6 text-2xl font-bold">
              Maha Aarti
            </h3>

            <p className="mt-4">
              Everyday 7:30 PM
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <CalendarDays className="text-orange-600" size={40} />

            <h3 className="mt-6 text-2xl font-bold">
              Visarjan
            </h3>

            <p className="mt-4">
              Schedule will be announced soon.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}