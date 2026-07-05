import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-bold text-orange-600">
            {siteConfig.name}
          </h1>

          <p className="text-sm text-gray-500">
            {siteConfig.marathiName}
          </p>
        </div>

        <nav className="hidden gap-8 font-medium md:flex">
          <Link href="/">Home</Link>
          <Link href="/">Gallery</Link>
          <Link href="/">Updates</Link>
          <Link href="/">Donation</Link>
          <Link href="/">Contact</Link>
        </nav>

        <button className="rounded-full bg-orange-600 px-5 py-2 font-semibold text-white transition hover:scale-105 hover:bg-orange-700">
          Donate
        </button>
      </div>
    </header>
  );
}