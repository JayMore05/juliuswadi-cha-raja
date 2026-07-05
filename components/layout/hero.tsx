import { siteConfig } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center">

        <span className="rounded-full bg-orange-100 px-5 py-2 text-orange-700 font-semibold">
          🕉️ श्री गणेशाय नमः
        </span>

        <h1 className="mt-8 text-6xl font-extrabold tracking-tight text-gray-900">
          {siteConfig.name}
        </h1>

        <h2 className="mt-3 text-3xl font-semibold text-orange-600">
          {siteConfig.marathiName}
        </h2>

        <div className="mt-6 rounded-full bg-yellow-100 px-6 py-2">
          <span className="font-semibold text-yellow-800">
            🎉 Celebrating {siteConfig.years} Glorious Years
          </span>
        </div>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
          Welcome to the official website of Juliuswadi Cha Raja.
          Join us in celebrating Lord Ganesha with devotion,
          unity and tradition.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">

          <button className="rounded-full bg-orange-600 px-8 py-4 text-lg font-bold text-white transition hover:scale-105">
            Donate Now
          </button>

          <button className="rounded-full border border-orange-300 bg-white px-8 py-4 text-lg font-semibold text-orange-600 transition hover:bg-orange-50">
            Latest Updates
          </button>

        </div>

      </div>
    </section>
  );
}