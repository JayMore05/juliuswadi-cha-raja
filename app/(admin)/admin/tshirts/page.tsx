"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  Package,
  Users,
  IndianRupee,
  Plus,
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
    <div className="mx-auto max-w-7xl space-y-8 p-6">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-bold text-orange-600">
            👕 Merchandise Booking
          </h1>

          <p className="mt-2 text-gray-500">
            Manage bookings and distribution.
          </p>

        </div>

        <Link
          href="/admin/tshirts/new"
          className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700"
        >

          <Plus className="h-5 w-5" />

          New Booking

        </Link>

      </div>

      {/* Dashboard */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

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

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

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

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

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