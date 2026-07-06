"use client";

import Link from "next/link";

export default function UpdatesSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 flex items-center justify-between">

          <div>
            <span className="rounded-full bg-orange-100 px-4 py-2 font-semibold text-orange-600">
              📢 Updates
            </span>

            <h2 className="mt-5 text-5xl font-black">
              Latest Updates
            </h2>
          </div>

          <Link
            href="/updates"
            className="rounded-full border-2 border-orange-500 px-6 py-3 text-orange-600 hover:bg-orange-500 hover:text-white transition"
          >
            View All →
          </Link>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {[1,2,3].map((item)=>(
            <div
              key={item}
              className="rounded-3xl border bg-white p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold">
                Ganesh Festival Update
              </h3>

              <p className="mt-3 text-gray-600">
                Latest announcement will appear here from CMS.
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}