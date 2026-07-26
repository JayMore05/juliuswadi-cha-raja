"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { toast } from "sonner";
import QrScanner from "@/components/admin/tshirts/QrScanner";

interface BookingPayment {
  id: string;
  payment_mode: string;
  amount: number;
}

interface BookingItem {
  id: string;
  tshirt_size: string;
  quantity: number;
}

interface Booking {
  id: string;
  booking_id: string;
  donor_name: string;
  phone: string;
  status: string;
  total_amount: number;
  created_at: string;
  donation_receipt_no: string | null;
  items: BookingItem[];
  payments: BookingPayment[];
}

export default function DistributionClient() {
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState("");
  const [delivering, setDelivering] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  // Auto-focus input or auto-search if 'q' parameter is provided in URL
  useEffect(() => {
    const q = searchParams.get("q");

    if (q) {
      setQuery(q);

      setTimeout(() => {
        searchBooking(q);
      }, 200);
    } else {
      inputRef.current?.focus();
    }
  }, [searchParams]);

  async function searchBooking(customQuery?: string) {
    const search = customQuery ?? query.trim();
    if (!search) return;

    setLoading(true);
    setError("");
    setBooking(null);

    try {
      const res = await fetch(
        `/api/tshirts/search?q=${encodeURIComponent(search)}`
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Booking not found");
        return;
      }

      setBooking(data.booking);
    } catch {
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  async function searchByQr(decodedText: string) {
    try {
      let qrData;

      try {
        qrData = JSON.parse(decodedText);
      } catch {
        toast.error("Invalid QR Code.");
        return;
      }

      const bookingNumber = qrData.bookingNumber;

      if (!bookingNumber) {
        toast.error("Invalid QR Code.");
        return;
      }

      setShowScanner(false);
      setQuery(bookingNumber);
      setLoading(true);
      setError("");
      setBooking(null);

      const res = await fetch(
        `/api/tshirts/search?q=${encodeURIComponent(bookingNumber)}`
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Booking not found.");
        return;
      }

      setBooking(data.booking);

      toast.success("Booking Loaded");
    } catch {
      toast.error("Unable to scan booking.");
    } finally {
      setLoading(false);
    }
  }

  async function markDelivered() {
    if (!booking) return;

    if (!confirm("Mark this T-Shirt as Delivered?")) {
      return;
    }

    setDelivering(true);

    try {
      const res = await fetch(
        `/api/tshirts/${booking.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "deliver",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Failed to mark as delivered.");
        return;
      }

      setBooking({
        ...booking,
        status: "Delivered",
      });

      toast.success("T-Shirt marked as Delivered.");
      
      setTimeout(() => {
        setQuery("");
        setBooking(null);
        setError("");
        inputRef.current?.focus();
      }, 1500);
      
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setDelivering(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow">
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            ref={inputRef}
            className="flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-60 disabled:cursor-not-allowed"
            placeholder="Booking ID or Phone Number"
            value={query}
            disabled={loading || delivering}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchBooking();
              }
            }}
          />

          <button
            onClick={() => searchBooking()}
            disabled={loading || delivering}
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            {loading ? "Searching..." : "Search"}
          </button>

          <button
            onClick={() => setShowScanner(true)}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            📷 Scan QR
          </button>
        </div>
      </div>

      {showScanner && (
        <QrScanner
          onScan={searchByQr}
          onClose={() => setShowScanner(false)}
        />
      )}

      <div className="space-y-6">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {booking && (
          <div className="rounded-2xl border bg-white p-6 shadow">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {booking.donor_name}
                </p>

                <p>
                  <strong>Phone:</strong> {booking.phone}
                </p>

                <p>
                  <strong>Booking ID:</strong> {booking.booking_id}
                </p>
                
                <p>
                  <strong>Receipt No:</strong>{" "}
                  {booking.donation_receipt_no ?? "-"}
                </p>

                <p>
                  <strong>Booked:</strong>{" "}
                  {new Date(booking.created_at).toLocaleDateString("en-IN")}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <strong>Status:</strong>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      booking.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <strong>Payment:</strong>{" "}
                  {booking.payments?.length ? (
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        booking.payments[0].payment_mode === "Cash"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {booking.payments[0].payment_mode}
                    </span>
                  ) : (
                    "-"
                  )}
                </div>

                <p>
                  <strong>Total:</strong>{" "}
                  {Number(booking.total_amount).toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-lg font-bold">T-Shirts</h3>

              <div className="overflow-hidden rounded-xl border">
                <table className="min-w-full border-collapse">
                  <thead className="bg-orange-600 text-white">
                    <tr>
                      <th className="p-3 text-left">Size</th>
                      <th className="p-3 text-center">Qty</th>
                    </tr>
                  </thead>

                  <tbody>
                    {booking.items?.length === 0 ? (
                      <tr>
                        <td
                          colSpan={2}
                          className="p-6 text-center text-gray-500"
                        >
                          No T-Shirts Found
                        </td>
                      </tr>
                    ) : (
                      booking.items?.map((item: BookingItem) => (
                        <tr
                          key={item.id}
                          className="border-t odd:bg-white even:bg-orange-50"
                        >
                          <td className="p-3">{item.tshirt_size}</td>
                          <td className="p-3 text-center">{item.quantity}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-end text-lg font-semibold">
                Total Qty:&nbsp;
                {booking.items?.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              {booking.status === "Delivered" ? (
                <button
                  disabled
                  className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white opacity-80"
                >
                  ✅ Already Delivered
                </button>
              ) : (
                <button
                  onClick={markDelivered}
                  disabled={delivering}
                  className="flex items-center justify-center rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {delivering ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Mark as Delivered"
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}