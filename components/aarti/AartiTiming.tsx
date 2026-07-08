"use client";

import {
  Sunrise,
  Sunset,
  Sparkles,
} from "lucide-react";

const timings = [
  {
    icon: Sunrise,
    title: "Morning Aarti",
    time: "7:00 AM",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: Sunset,
    title: "Evening Aarti",
    time: "7:30 PM",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Sparkles,
    title: "Festival Days",
    time: "Special Schedule",
    color: "bg-red-100 text-red-600",
  },
];

export default function AartiTiming() {
  return (
    <section className="bg-[#FFF8F2] py-16 lg:py-20">

      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        <div className="mb-12 text-center">

          <span className="rounded-full bg-orange-100 px-5 py-2 font-semibold text-orange-600">
            Daily Schedule
          </span>

          <h2 className="mt-5 font-heading text-3xl font-bold text-[#5E120F] sm:text-4xl lg:text-5xl">
            Aarti Timings
          </h2>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {timings.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  rounded-3xl
                  border
                  border-orange-100
                  bg-white
                  p-8
                  text-center
                  shadow-lg
                "
              >
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${item.color}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#5E120F]">
                  {item.title}
                </h3>

                <p className="mt-3 text-lg text-slate-600">
                  {item.time}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}