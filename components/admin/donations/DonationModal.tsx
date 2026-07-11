"use client";

import { useState } from "react";
import { createDonation } from "@/lib/services/donations";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: (receiptNo: string) => void;
}

export default function DonationModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    donor_name: "",
    phone: "",
    promised_amount: "",
    paid_amount: "",
    payment_mode: "Cash",
    remarks: "",
  });

  if (!open) return null;

  function resetForm() {
    setForm({
      donor_name: "",
      phone: "",
      promised_amount: "",
      paid_amount: "",
      payment_mode: "Cash",
      remarks: "",
    });
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!form.donor_name.trim()) {
      alert("Please enter donor name.");
      return;
    }

    if (
      Number(form.promised_amount) <= 0 ||
      Number(form.paid_amount) <= 0
    ) {
      alert("Amount should be greater than zero.");
      return;
    }

    try {
      setLoading(true);

      const data = await createDonation({
        donor_name: form.donor_name,
        phone: form.phone,
        promised_amount: Number(form.promised_amount),
        paid_amount: Number(form.paid_amount),
        payment_mode: form.payment_mode,
        remarks: form.remarks,
      });

      resetForm();

      onClose();

      if (onSuccess) {
  onSuccess(data.receipt_no);
}
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl"
      >
        <h2 className="mb-6 text-3xl font-bold text-orange-600">
          New Donation
        </h2>

        <div className="grid gap-5">

          <input
            required
            placeholder="Donor Name"
            className="rounded-xl border p-3 outline-none focus:border-orange-500"
            value={form.donor_name}
            onChange={(e) =>
              setForm({
                ...form,
                donor_name: e.target.value,
              })
            }
          />

          <input
            placeholder="Mobile Number (Optional)"
            className="rounded-xl border p-3 outline-none focus:border-orange-500"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />

          <input
            type="number"
            required
            placeholder="Promised Amount"
            className="rounded-xl border p-3 outline-none focus:border-orange-500"
            value={form.promised_amount}
            onChange={(e) =>
              setForm({
                ...form,
                promised_amount: e.target.value,
              })
            }
          />

          <input
            type="number"
            required
            placeholder="Amount Received"
            className="rounded-xl border p-3 outline-none focus:border-orange-500"
            value={form.paid_amount}
            onChange={(e) =>
              setForm({
                ...form,
                paid_amount: e.target.value,
              })
            }
          />

          <select
            className="rounded-xl border p-3 outline-none focus:border-orange-500"
            value={form.payment_mode}
            onChange={(e) =>
              setForm({
                ...form,
                payment_mode: e.target.value,
              })
            }
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>Bank</option>
            <option>Cheque</option>
          </select>

          <textarea
            rows={4}
            placeholder="Remarks (Optional)"
            className="rounded-xl border p-3 outline-none focus:border-orange-500"
            value={form.remarks}
            onChange={(e) =>
              setForm({
                ...form,
                remarks: e.target.value,
              })
            }
          />

        </div>

        <div className="mt-8 flex justify-end gap-4">

          <button
            type="button"
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="rounded-xl border px-6 py-3 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Donation"}
          </button>

        </div>

      </form>
    </div>
  );
}