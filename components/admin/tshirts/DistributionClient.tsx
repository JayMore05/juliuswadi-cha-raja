"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  Loader2,
  QrCode,
  Package,
  ClipboardList,
  CheckCircle2,
  Shirt,
} from "lucide-react";

interface DistributionStats {
  totalBookings: number;
  pending: number;
  delivered: number;
  totalTshirts: number;
}

interface DistributionClientProps {
  stats: DistributionStats;
}

export default function DistributionClient({
  stats,
}: DistributionClientProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    const value = query.trim();

    if (!value) {
      inputRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `/api/tshirts/search?q=${encodeURIComponent(value)}`
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error ?? "Booking not found.");
        inputRef.current?.focus();
        return;
      }

      window.location.href = `/admin/tshirts/scan/${encodeURIComponent(
        data.booking.booking_id
      )}`;
    } catch {
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <Package className="h-8 w-8 text-orange-600" />
            <span className="text-3xl font-bold">
              {stats.pending}
            </span>
          </div>

          <p className="mt-3 text-sm font-medium text-gray-500">
            Pending
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            <span className="text-3xl font-bold">
              {stats.delivered}
            </span>
          </div>

          <p className="mt-3 text-sm font-medium text-gray-500">
            Delivered
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <ClipboardList className="h-8 w-8 text-blue-600" />
            <span className="text-3xl font-bold">
              {stats.totalBookings}
            </span>
          </div>

          <p className="mt-3 text-sm font-medium text-gray-500">
            Total Bookings
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <Shirt className="h-8 w-8 text-purple-600" />
            <span className="text-3xl font-bold">
              {stats.totalTshirts}
            </span>
          </div>

          <p className="mt-3 text-sm font-medium text-gray-500">
            Total T-Shirts
          </p>
        </div>

      </div>

      {/* Search Card */}

      <div className="rounded-2xl border bg-white p-5 shadow-sm">

        <h2 className="mb-2 text-lg font-semibold">
          Search Booking
        </h2>

        <p className="mb-5 text-sm text-gray-500">
          Enter the Booking ID or Phone Number to find a booking.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">

          <input
            ref={inputRef}
            type="text"
            placeholder="Booking ID or Phone Number"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="h-14 flex-1 rounded-xl border px-4 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="flex h-14 items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Search
              </>
            )}
          </button>

        </div>

      </div>

      {/* Divider */}

      <div className="flex items-center gap-4">

        <div className="h-px flex-1 bg-gray-300" />

        <span className="text-sm font-medium text-gray-500">
          OR
        </span>

        <div className="h-px flex-1 bg-gray-300" />

      </div>

      {/* Scan Card */}

      <div className="rounded-2xl border bg-white p-5 shadow-sm">

        <h2 className="mb-2 text-lg font-semibold">
          Scan QR Code
        </h2>

        <p className="mb-5 text-sm text-gray-500">
          Use the camera to scan the booking QR code.
        </p>

        <Link
          href="/admin/tshirts/scan"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-lg font-semibold text-white transition hover:bg-blue-700"
        >
          <QrCode className="h-5 w-5" />
          Open QR Scanner
        </Link>

      </div>

    </div>
  );
}