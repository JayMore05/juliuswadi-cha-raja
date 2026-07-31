"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SettingsForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const res = await fetch("/api/tshirts/settings");

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to load settings.");
        return;
      }

      setBookingOpen(data.booking_open);
    } catch {
      toast.error("Failed to load settings.");
    } finally {
      setLoading(false);
    }
  }

  async function updateBookingStatus(value: boolean) {
    try {
      setSaving(true);

      const res = await fetch("/api/tshirts/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_open: value,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Unable to create booking.");
        return;
      }

      setBookingOpen(value);

      toast.success(
        value
          ? "Bookings are now OPEN."
          : "Bookings are now CLOSED."
      );
    } catch {
      toast.error("Failed to update booking status.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow">
        Loading...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow">

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-xl font-bold">
            Booking Status
          </h2>

          <p className="mt-2 text-gray-600">
            When booking is closed, no new booking can be created.
          </p>
        </div>

        <button
          type="button"
          disabled={saving}
          onClick={() =>
            updateBookingStatus(!bookingOpen)
          }
          className={`min-w-[150px] rounded-xl px-6 py-3 font-bold text-white transition ${
            bookingOpen
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          } disabled:opacity-50`}
        >
          {saving
            ? "Saving..."
            : bookingOpen
            ? "🟢 OPEN"
            : "🔴 CLOSED"}
        </button>

      </div>

    </div>
  );
}
