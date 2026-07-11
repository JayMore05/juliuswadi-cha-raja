"use client";

import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  donation: any;
  onClose: () => void;
  onSave: (data: {
    amount: number;
    payment_mode: string;
    remarks: string;
  }) => void;
}

export default function ReceivePaymentModal({
  open,
  donation,
  onClose,
  onSave,
}: Props) {
  const [amount, setAmount] = useState(0);

  const [paymentMode, setPaymentMode] =
    useState("Cash");

  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    if (donation) {
      setAmount(donation.balance);
      setRemarks("");
      setPaymentMode("Cash");
    }
  }, [donation]);

  if (!open || !donation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-orange-600">
          Receive Payment
        </h2>

        <p className="mt-2 text-slate-500">
          Receive remaining donation amount.
        </p>

        <div className="mt-8 space-y-5">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Receipt Number
            </label>

            <input
              disabled
              value={donation.receipt_no}
              className="w-full rounded-xl border bg-gray-100 p-3"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Donor
            </label>

            <input
              disabled
              value={donation.donor?.donor_name}
              className="w-full rounded-xl border bg-gray-100 p-3"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Remaining Balance
            </label>

            <input
              disabled
              value={`₹${donation.balance}`}
              className="w-full rounded-xl border bg-green-50 p-3 font-semibold text-green-700"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Amount Received
            </label>

            <input
              type="number"
              min={1}
              max={donation.balance}
              value={amount}
              onChange={(e) =>
                setAmount(Number(e.target.value))
              }
              className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Payment Mode
            </label>

            <select
              value={paymentMode}
              onChange={(e) =>
                setPaymentMode(e.target.value)
              }
              className="w-full rounded-xl border p-3"
            >
              <option>Cash</option>
              <option>UPI</option>
              <option>Bank</option>
              <option>Cheque</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Remarks
            </label>

            <textarea
              rows={3}
              value={remarks}
              onChange={(e) =>
                setRemarks(e.target.value)
              }
              className="w-full rounded-xl border p-3 outline-none focus:border-orange-500"
            />

          </div>

        </div>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-xl border px-6 py-3 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSave({
                amount,
                payment_mode: paymentMode,
                remarks,
              })
            }
            className="rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
          >
            Receive Payment
          </button>

        </div>

      </div>

    </div>
  );
}