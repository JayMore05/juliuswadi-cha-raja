"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Users,
  IndianRupee,
  Plus,
  PackageCheck,
  Factory,
  Settings,
  ClipboardList,
} from "lucide-react";

import BookingTable from "@/components/admin/tshirts/BookingTable";
import { TshirtBooking } from "@/types/tshirt";

export default function TshirtPage() {
  const [bookings, setBookings] = useState<
    TshirtBooking[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  async function loadBookings() {
    try {
      setLoading(true);

      const res = await fetch("/api/tshirts", {
        cache: "no-store",
      });

      const data = await res.json();

      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  const totalBookings =
    bookings.length;

  const totalPieces = bookings.reduce(
    (sum, booking) =>
      sum + booking.total_quantity,
    0
  );

  const totalAmount = bookings.reduce(
    (sum, booking) =>
      sum + booking.total_amount,
    0
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-4 md:space-y-8 md:p-6">

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-2xl font-bold text-orange-600 md:text-4xl">
            👕 Merchandise Booking
          </h1>

          <p className="mt-1 text-sm text-gray-500 md:mt-2 md:text-base">
            Manage bookings and distribution.
          </p>

        </div>

        <Link
          href="/admin/tshirts/new"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700 md:w-auto"
        >

          <Plus className="h-5 w-5" />

          New Booking

        </Link>

      </div>

      {/* Quick Actions */}
      <div className="space-y-4">

        <h2 className="text-2xl font-bold">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">

          <Link
            href="/admin/tshirts/new"
            className="rounded-2xl border bg-white p-4 md:p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-500 hover:shadow-lg"
          >
            <Plus className="mb-2 h-8 w-8 md:mb-3 md:h-9 md:w-9 text-orange-600" />
            <h3 className="text-sm font-bold md:text-base">New Booking</h3>
            <p className="hidden text-sm text-gray-500 md:block">
              Create a new booking
            </p>
          </Link>

          <Link
            href="/admin/tshirts/distribution"
            className="rounded-2xl border bg-white p-4 md:p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-500 hover:shadow-lg"
          >
            <PackageCheck className="mb-2 h-8 w-8 md:mb-3 md:h-9 md:w-9 text-green-600" />
            <h3 className="text-sm font-bold md:text-base">Distribution</h3>
            <p className="hidden text-sm text-gray-500 md:block">
              Scan & deliver T-Shirts
            </p>
          </Link>

          <Link
            href="/admin/tshirts/reports"
            className="rounded-2xl border bg-white p-4 md:p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-500 hover:shadow-lg"
          >
            <ClipboardList className="mb-2 h-8 w-8 md:mb-3 md:h-9 md:w-9 text-blue-600" />
            <h3 className="text-sm font-bold md:text-base">Reports</h3>
            <p className="hidden text-sm text-gray-500 md:block">
              Booking reports
            </p>
          </Link>

          <Link
            href="/admin/tshirts/manufacturer"
            className="rounded-2xl border bg-white p-4 md:p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-500 hover:shadow-lg"
          >
            <Factory className="mb-2 h-8 w-8 md:mb-3 md:h-9 md:w-9 text-purple-600" />
            <h3 className="text-sm font-bold md:text-base">Manufacturer</h3>
            <p className="hidden text-sm text-gray-500 md:block">
              Production summary
            </p>
          </Link>

          <Link
            href="/admin/tshirts/settings"
            className="rounded-2xl border bg-white p-4 md:p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-500 hover:shadow-lg"
          >
            <Settings className="mb-2 h-8 w-8 md:mb-3 md:h-9 md:w-9 text-gray-700" />
            <h3 className="text-sm font-bold md:text-base">Settings</h3>
            <p className="hidden text-sm text-gray-500 md:block">
              Booking settings
            </p>
          </Link>

          <Link
            href="/admin/tshirts"
            className="rounded-2xl border bg-orange-50 p-4 md:p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-500 hover:shadow-lg"
          >
            <Package className="mb-2 h-8 w-8 md:mb-3 md:h-9 md:w-9 text-orange-600" />
            <h3 className="text-sm font-bold md:text-base">All Bookings</h3>
            <p className="hidden text-sm text-gray-500 md:block">
              View all bookings
            </p>
          </Link>

        </div>

      </div>

      {/* Dashboard */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Bookings
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalBookings}
              </h2>

            </div>

            <Users className="h-10 w-10 text-orange-600" />

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total T-Shirts
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalPieces}
              </h2>

            </div>

            <Package className="h-10 w-10 text-green-600" />

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Amount
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                ₹{totalAmount}
              </h2>

            </div>

            <IndianRupee className="h-10 w-10 text-blue-600" />

          </div>

        </div>

      </div>

      {/* Table */}

      {loading ? (

        <div className="rounded-2xl border bg-white p-20 text-center">

          Loading Bookings...

        </div>

      ) : (

        <BookingTable
          bookings={bookings}
        />

      )}

    </div>
  );
}             
