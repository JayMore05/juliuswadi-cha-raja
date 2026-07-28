"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Receipt,
  PackageCheck,
  Pencil,
  Trash2,
} from "lucide-react";
import { TshirtBooking } from "@/types/tshirt";

interface Props {
  bookings: TshirtBooking[];
}

export default function BookingTable({ bookings }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredBookings = useMemo(() => {
    return bookings.filter(
      (b) =>
        b.booking_id.toLowerCase().includes(search.toLowerCase()) ||
        b.donor_name.toLowerCase().includes(search.toLowerCase()) ||
        b.phone.includes(search)
    );
  }, [bookings, search]);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Booking ID, Name, or Phone..."
          className="w-full max-w-md rounded-xl border p-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead className="bg-orange-100 text-orange-900">
            <tr>
              <th className="px-6 py-4 font-semibold">Booking ID</th>
              <th className="px-6 py-4 font-semibold">Donor Name</th>
              <th className="px-6 py-4 font-semibold">Phone</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Amount</th>
              <th className="px-6 py-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="transition hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-orange-600">
                    {booking.booking_id}
                  </td>
                  <td className="px-6 py-4 font-medium">{booking.donor_name}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.phone}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        booking.status === "Booked"
                          ? "bg-blue-100 text-blue-700"
                          : booking.status === "Ready for Collection"
                          ? "bg-yellow-100 text-yellow-700"
                          : booking.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-green-600">
                    {Number(booking.total_amount).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/tshirts/receipt/${booking.booking_id}`}
                        title="Receipt"
                        className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
                      >
                        <Receipt size={18} />
                      </Link>

                      <button
                        title="Deliver"
                        onClick={() =>
                          router.push(
                            `/admin/tshirts/distribution?q=${booking.booking_id}`
                          )
                        }
                        className="rounded-lg bg-green-500 p-2 text-white hover:bg-green-600"
                      >
                        <PackageCheck size={18} />
                      </button>

                      <button
                        title="Edit (Coming Soon)"
                        disabled
                        className="cursor-not-allowed rounded-lg bg-yellow-300 p-2 text-white"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        title="Delete (Coming Soon)"
                        disabled
                        className="cursor-not-allowed rounded-lg bg-red-300 p-2 text-white"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}