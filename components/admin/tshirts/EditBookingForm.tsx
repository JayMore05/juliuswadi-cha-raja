"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface BookingItem {
  id?: string;
  tshirt_size: string;
  quantity: number;
  price: number;
  subtotal: number;
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

const tshirtSizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
];

export default function EditBookingForm({
  booking,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [duplicateBooking, setDuplicateBooking] = useState<{
    booking_id: string;
    donor_name: string;
  } | null>(null);

  const [items, setItems] = useState(
    booking.items.map((item) => ({
      ...item,
    }))
  );

  const defaultPrice = items[0]?.price ?? 0;

  const totalQty = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const grandTotal = items.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

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

  useEffect(() => {
    const phone = form.phone.trim();

    if (phone.length !== 10 || phone === booking.phone) {
      setDuplicateBooking(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/tshirts/check-phone?phone=${phone}`
        );

        const data = await res.json();

        if (data.exists) {
          setDuplicateBooking(data.booking);
        } else {
          setDuplicateBooking(null);
        }
      } catch {
        setDuplicateBooking(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [form.phone, booking.phone]);

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
          body: JSON.stringify({
            ...form,
            items,
          }),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        alert(json.error);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/tshirts");
        router.refresh();
      }, 1500);
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

            {duplicateBooking && (
              <div className="mt-2 rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-sm">
                <p className="font-semibold text-yellow-800">
                  This phone number is already used.
                </p>

                <p className="mt-1 text-yellow-700">
                  Booking ID: <strong>{duplicateBooking.booking_id}</strong>
                </p>

                <p className="text-yellow-700">
                  Name: <strong>{duplicateBooking.donor_name}</strong>
                </p>
              </div>
            )}
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
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <select
                  value={item.tshirt_size}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((iElem, i) =>
                        i === index
                          ? {
                              ...iElem,
                              tshirt_size: e.target.value,
                            }
                          : iElem
                      )
                    )
                  }
                  className="rounded-lg border px-3 py-2 font-semibold"
                >
                  {tshirtSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>

                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setItems((prev) =>
                        prev.map((iElem, i) =>
                          i === index
                            ? {
                                ...iElem,
                                quantity: Math.max(1, iElem.quantity - 1),
                                subtotal: Math.max(1, iElem.quantity - 1) * iElem.price,
                              }
                            : iElem
                        )
                      )
                    }
                    className="h-8 w-8 rounded-lg border"
                  >
                    -
                  </button>

                  <span className="w-8 text-center font-bold">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setItems((prev) =>
                        prev.map((iElem, i) =>
                          i === index
                            ? {
                                ...iElem,
                                quantity: iElem.quantity + 1,
                                subtotal: (iElem.quantity + 1) * iElem.price,
                              }
                            : iElem
                        )
                      )
                    }
                    className="h-8 w-8 rounded-lg border"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setItems((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                  disabled={items.length === 1}
                  className="mt-3 text-sm font-semibold text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Remove
                </button>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">
                  ₹{item.price} × {item.quantity}
                </p>

                <p className="text-lg font-bold text-green-600">
                  ₹{item.subtotal.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setItems((prev) => [
                ...prev,
                {
                  id: "",
                  tshirt_size: "M",
                  quantity: 1,
                  price: defaultPrice,
                  subtotal: defaultPrice,
                },
              ])
            }
            className="w-full rounded-xl border-2 border-dashed border-orange-300 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
          >
            + Add Another T-Shirt
          </button>
        </div>
      </div>

      <div className="rounded-2xl border bg-orange-50 p-6 shadow">
        <h2 className="mb-4 text-xl font-bold text-orange-600">
          Order Summary
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between border-b pb-2">
            <span>Total Quantity</span>
            <span className="font-bold">{totalQty}</span>
          </div>

          <div className="flex justify-between text-lg font-bold">
            <span>Grand Total</span>
            <span className="text-green-600">
              ₹{grandTotal.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {duplicateBooking && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4">
          <p className="font-semibold text-red-700">
            Please resolve the duplicate phone number before saving this booking.
          </p>
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-green-300 bg-green-50 p-4">
          <h3 className="font-semibold text-green-700">
            ✅ Booking Updated Successfully
          </h3>

          <p className="mt-1 text-sm text-green-600">
            Redirecting to Booking List...
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">

        <button
          onClick={saveBooking}
          disabled={loading || duplicateBooking !== null}
          className="rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
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