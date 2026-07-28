"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BookingItem {
  id: string;
  tshirt_size: string;
  quantity: number;
  price: number;
}

interface BookingPayment {
  payment_mode: string;
}

interface Booking {
  id: string;
  donor_name: string;
  phone: string;
  donation_receipt_no?: string;
  volunteer_name: string;
  remarks?: string;
  items: BookingItem[];
  payments: BookingPayment[];
}

interface Props {
  booking: Booking;
}

const volunteers = [
  "Nikhil Patil",
  "Sachin Gupta",
  "Pratik Tawre",
  "Jay More (Admin)",
];

const paymentModes = [
  "Cash",
  "UPI",
];

export default function EditBookingForm({
  booking,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    donor_name: booking.donor_name,
    phone: booking.phone,
    donation_receipt_no:
      booking.donation_receipt_no ?? "",
    volunteer_name: booking.volunteer_name,
    remarks: booking.remarks ?? "",
    payment_mode:
      booking.payments?.[0]?.payment_mode ??
      "Cash",
  });

  function update(
    key: keyof typeof form,
    value: string
  ) {
    setForm((p) => ({
      ...p,
      [key]: value,
    }));
  }

  async function saveBooking() {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/tshirts/${booking.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        alert(json.error);
        return;
      }

      alert("Booking Updated");

      router.push("/admin/tshirts");

      router.refresh();
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Edit Booking
        </h1>

        <p className="text-gray-500">
          Update booking information.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow">

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block font-medium">
              Donor Name
            </label>

            <input
              value={form.donor_name}
              onChange={(e) =>
                update(
                  "donor_name",
                  e.target.value
                )
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Phone
            </label>

            <input
              value={form.phone}
              onChange={(e) =>
                update("phone", e.target.value)
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Donation Receipt
            </label>

            <input
              value={
                form.donation_receipt_no
              }
              onChange={(e) =>
                update(
                  "donation_receipt_no",
                  e.target.value
                )
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Payment Mode
            </label>

            <select
              value={form.payment_mode}
              onChange={(e) =>
                update(
                  "payment_mode",
                  e.target.value
                )
              }
              className="w-full rounded-xl border p-3"
            >
              {paymentModes.map((mode) => (
                <option
                  key={mode}
                  value={mode}
                >
                  {mode}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">
              Volunteer
            </label>

            <select
              value={form.volunteer_name}
              onChange={(e) =>
                update(
                  "volunteer_name",
                  e.target.value
                )
              }
              className="w-full rounded-xl border p-3"
            >
              {volunteers.map((v) => (
                <option
                  key={v}
                  value={v}
                >
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">
              Remarks
            </label>

            <textarea
              rows={4}
              value={form.remarks}
              onChange={(e) =>
                update(
                  "remarks",
                  e.target.value
                )
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

        </div>

      </div>

      <div className="rounded-2xl border bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">
          Ordered T-Shirts
        </h2>

        <div className="space-y-3">
          {booking.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <p className="font-bold">
                  {item.tshirt_size}
                </p>

                <p className="text-sm text-gray-500">
                  Qty : {item.quantity}
                </p>
              </div>

              <p className="font-bold text-green-600">
                ₹{item.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">

        <button
          onClick={saveBooking}
          disabled={loading}
          className="rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
        >
          {loading
            ? "Saving..."
            : "Save Changes"}
        </button>

        <button
          onClick={() => router.back()}
          className="rounded-xl border px-6 py-3 font-semibold"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}