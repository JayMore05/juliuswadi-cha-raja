"use client";

export default function DashboardHeader() {
  const today = new Date();

  const date = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-600 to-amber-500 p-8 text-white shadow-lg lg:flex-row lg:items-center">
      <div>
        <h1 className="text-4xl font-bold">
          🙏 Welcome Back, Admin
        </h1>

        <p className="mt-2 text-orange-100">
          Manage Juliuswadi Cha Raja Website from one place.
        </p>
      </div>

      <div className="rounded-xl bg-white/20 px-6 py-4 backdrop-blur-md">
        <p className="text-sm text-orange-100">
          Today's Date
        </p>

        <h2 className="text-xl font-semibold">
          {date}
        </h2>
      </div>
    </div>
  );
}