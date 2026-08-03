"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Loader2, Plus, Trash2 } from "lucide-react";

const PRICE = 330;

const SIZES = [
  "26",
  "28",
  "30",
  "32",
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
];

type Item = {
  tshirt_size: string;
  quantity: number;
};

export default function PublicTshirtRequestForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [remarks, setRemarks] = useState("");

  const [items, setItems] = useState<Item[]>([
    {
      tshirt_size: "M",
      quantity: 1,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalAmount = totalQuantity * PRICE;

  function addItem() {
    setItems((current) => [
      ...current,
      {
        tshirt_size: "M",
        quantity: 1,
      },
    ]);
  }

  function removeItem(index: number) {
    if (items.length === 1) return;

    setItems((current) =>
      current.filter((_, itemIndex) => itemIndex !== index)
    );
  }

  function updateItem(
    index: number,
    field: keyof Item,
    value: string | number
  ) {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  }

  async function submitRequest(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/tshirt-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          phone,
          remarks,
          items,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Request failed.");
      }

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-green-200 bg-white p-8 text-center shadow-xl">
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />

        <h2 className="text-2xl font-bold text-gray-900">
          Request Received!
        </h2>

        <p className="mt-3 text-gray-600">
          Your T-Shirt request has been submitted successfully.
        </p>

        <div className="mt-6 rounded-2xl bg-orange-50 p-5 text-sm text-gray-700">
          <strong>Please note:</strong> This is only an online request.
          Your booking will be confirmed after verification by our
          Mandal volunteer.
        </div>

        <p className="mt-5 font-semibold text-orange-600">
          🟡 Status: Pending Verification
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitRequest}
      className="mx-auto max-w-2xl space-y-6"
    >
      <div className="rounded-3xl border bg-white p-6 shadow-xl">
        <h2 className="mb-5 text-xl font-bold text-orange-600">
          Your Details
        </h2>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Full Name *
            </label>

            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Mobile Number *
            </label>

            <input
              required
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value.replace(/\D/g, "").slice(0, 10)
                )
              }
              placeholder="9876543210"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-orange-600">
              Select T-Shirts
            </h2>

            <p className="text-sm text-gray-500">
              ₹{PRICE} per T-Shirt
            </p>
          </div>

          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-2 rounded-xl bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-2xl bg-orange-50 p-4 sm:grid-cols-[1fr_120px_45px]"
            >
              <select
                value={item.tshirt_size}
                onChange={(e) =>
                  updateItem(index, "tshirt_size", e.target.value)
                }
                className="rounded-xl border bg-white px-4 py-3"
              >
                {SIZES.map((size) => (
                  <option key={size} value={size}>
                    Size {size}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min={1}
                max={20}
                value={item.quantity}
                onChange={(e) =>
                  updateItem(
                    index,
                    "quantity",
                    Math.max(1, Number(e.target.value))
                  )
                }
                className="rounded-xl border bg-white px-4 py-3"
              />

              <button
                type="button"
                disabled={items.length === 1}
                onClick={() => removeItem(index)}
                className="flex items-center justify-center rounded-xl text-red-600 disabled:opacity-30"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold text-orange-600">
          Request Summary
        </h2>

        <div className="flex justify-between py-2">
          <span>Total T-Shirts</span>
          <strong>{totalQuantity}</strong>
        </div>

        <div className="flex justify-between py-2">
          <span>Price per T-Shirt</span>
          <strong>₹{PRICE}</strong>
        </div>

        <div className="mt-3 flex justify-between rounded-xl bg-green-50 p-4 text-lg">
          <strong>Estimated Total</strong>

          <strong className="text-green-700">
            ₹{totalAmount}
          </strong>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          Final booking will be confirmed by a Mandal volunteer.
        </p>
      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-xl">
        <label className="mb-2 block text-sm font-semibold">
          Remarks
        </label>

        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          rows={3}
          placeholder="Any special request? (Optional)"
          className="w-full rounded-xl border p-4 outline-none focus:border-orange-500"
        />
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <button
        disabled={loading}
        type="submit"
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-orange-600 px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-orange-700 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit T-Shirt Request"
        )}
      </button>

      <p className="text-center text-xs text-gray-500">
        Submitting this form does not create an official booking.
      </p>
    </form>
  );
}