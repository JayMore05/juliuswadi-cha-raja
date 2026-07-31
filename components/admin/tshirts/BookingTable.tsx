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
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { TshirtBooking } from "@/types/tshirt";
import { toast } from "sonner";

interface Props {
  bookings: TshirtBooking[];
}

export default function BookingTable({ bookings }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  async function deleteBooking() {
    if (!selectedBookingId) return;

    try {
      setDeletingId(selectedBookingId);

      const res = await fetch(`/api/tshirts/${selectedBookingId}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error);
        return;
      }

      toast.success("Booking deleted successfully.");

      setShowDeleteDialog(false);
      setSelectedBookingId(null);

      router.refresh();
    } catch {
      toast.error("Failed to delete booking.");
    } finally {
      setDeletingId(null);
    }
  }

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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Booking ID, Name, or Phone..."
          className="w-full rounded-xl border p-3 md:max-w-md outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border bg-white shadow-sm lg:block">
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

                      <Link
                        href={`/admin/tshirts/edit/${booking.id}`}
                        title="Edit Booking"
                        className="rounded-lg bg-yellow-500 p-2 text-white transition hover:bg-yellow-600"
                      >
                        <Pencil size={18} />
                      </Link>

                      {booking.status !== "Delivered" && (
                        <button
                          onClick={() => {
                            setSelectedBookingId(booking.id);
                            setShowDeleteDialog(true);
                          }}
                          className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
                          title="Delete Booking"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 lg:hidden">
        {filteredBookings.length === 0 ? (
          <div className="rounded-2xl border bg-white p-8 text-center text-gray-500">
            No bookings found.
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl border bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-orange-600">
                    {booking.booking_id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {booking.donor_name}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    booking.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <strong>Phone:</strong> {booking.phone}
                </p>
                <p>
                  <strong>Amount:</strong> ₹{booking.total_amount}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <Link
                  href={`/admin/tshirts/receipt/${booking.booking_id}`}
                  className="rounded-xl bg-blue-600 py-2 text-center font-semibold text-white"
                >
                  Receipt
                </Link>

                <button
                  onClick={() =>
                    router.push(
                      `/admin/tshirts/distribution?q=${booking.booking_id}`
                    )
                  }
                  className="rounded-xl bg-green-600 py-2 font-semibold text-white"
                >
                  Deliver
                </button>

                <Link
                  href={`/admin/tshirts/edit/${booking.id}`}
                  className="rounded-xl bg-yellow-500 py-2 text-center font-semibold text-white"
                >
                  Edit
                </Link>

                {booking.status !== "Delivered" && (
                  <button
                    onClick={() => {
                      setSelectedBookingId(booking.id);
                      setShowDeleteDialog(true);
                    }}
                    className="rounded-xl bg-red-500 py-2 font-semibold text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <ConfirmDialog
        open={showDeleteDialog}
        title="🗑 Delete Booking"
        description={`This action cannot be undone.

The booking and all related records will be permanently deleted.`}
        confirmText="Delete Booking"
        cancelText="Cancel"
        onCancel={() => {
          setShowDeleteDialog(false);
          setSelectedBookingId(null);
        }}
        onConfirm={deleteBooking}
      />
    </div>
  );
}