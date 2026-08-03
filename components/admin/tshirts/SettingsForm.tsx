"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SettingsForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [bookingOpen, setBookingOpen] = useState(true);
  const [upiId, setUpiId] = useState("");
  const [gpayNumber, setGpayNumber] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [publicPaymentEnabled, setPublicPaymentEnabled] =
    useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const res = await fetch("/api/tshirts/settings", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setBookingOpen(Boolean(data.booking_open));
      setUpiId(data.upi_id ?? "");
      setGpayNumber(data.gpay_number ?? "");
      setQrUrl(data.upi_qr_url ?? "");
      setPublicPaymentEnabled(
        data.public_payment_enabled !== false
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load settings."
      );
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings() {
    try {
      setSaving(true);

      const res = await fetch("/api/tshirts/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_open: bookingOpen,
          upi_id: upiId,
          gpay_number: gpayNumber,
          upi_qr_url: qrUrl,
          public_payment_enabled: publicPaymentEnabled,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Failed to save settings."
        );
      }

      toast.success("T-Shirt settings saved.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save settings."
      );
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
    <div className="space-y-6">

      {/* BOOKING */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">
          Booking Status
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Controls public and admin T-Shirt bookings.
        </p>

        <button
          type="button"
          onClick={() => setBookingOpen(!bookingOpen)}
          className={`mt-5 rounded-xl px-6 py-3 font-bold text-white ${
            bookingOpen
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {bookingOpen
            ? "🟢 BOOKINGS OPEN"
            : "🔴 BOOKINGS CLOSED"}
        </button>
      </div>

      {/* PAYMENT */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold">
          📱 Public UPI Payment
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          These details will be displayed on the public
          T-Shirt request page.
        </p>

        <label className="mt-5 flex items-center gap-3 rounded-xl bg-orange-50 p-4">
          <input
            type="checkbox"
            checked={publicPaymentEnabled}
            onChange={(e) =>
              setPublicPaymentEnabled(e.target.checked)
            }
            className="h-5 w-5"
          />

          <span className="font-semibold">
            Allow public UPI payment
          </span>
        </label>

        <div className="mt-5">
          <label className="mb-2 block font-semibold">
            UPI ID
          </label>

          <input
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="example@upi"
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block font-semibold">
            GPay / UPI Number
          </label>

          <input
            value={gpayNumber}
            inputMode="numeric"
            maxLength={10}
            onChange={(e) =>
              setGpayNumber(
                e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 10)
              )
            }
            placeholder="9876543210"
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block font-semibold">
            QR Code Image URL
          </label>

          <input
            value={qrUrl}
            onChange={(e) => setQrUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-xl border p-3"
          />

          <p className="mt-2 text-xs text-gray-500">
            For now paste the public URL of your UPI QR
            image. We can add direct image upload later.
          </p>
        </div>

        {qrUrl && (
          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold">
              QR Preview
            </p>

            <img
              src={qrUrl}
              alt="UPI QR Code"
              className="h-48 w-48 rounded-xl border bg-white object-contain p-2"
            />
          </div>
        )}
      </div>

      <button
        type="button"
        disabled={saving}
        onClick={saveSettings}
        className="w-full rounded-xl bg-orange-600 px-6 py-4 text-lg font-bold text-white hover:bg-orange-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save T-Shirt Settings"}
      </button>
    </div>
  );
}