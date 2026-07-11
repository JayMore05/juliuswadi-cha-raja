"use client";

interface Props {
  open: boolean;
  receiptNo: string;
  onClose: () => void;
  onNewDonation: () => void;
}

export default function DonationSuccessModal({
  open,
  receiptNo,
  onClose,
  onNewDonation,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="text-center">

          <div className="mb-4 text-6xl">
            ✅
          </div>

          <h2 className="text-3xl font-bold text-green-600">
            Donation Saved
          </h2>

          <p className="mt-4 text-slate-500">
            Receipt Number
          </p>

          <p className="mt-2 rounded-xl bg-orange-100 py-3 text-xl font-bold text-orange-700">
            {receiptNo}
          </p>

        </div>

        <div className="mt-8 space-y-3">

          <button
            className="w-full rounded-xl bg-orange-600 py-3 font-semibold text-white hover:bg-orange-700"
          >
            🖨 Print Receipt
          </button>

          <button
            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
          >
            📱 WhatsApp Receipt
          </button>

          <button
            onClick={onNewDonation}
            className="w-full rounded-xl border py-3 font-semibold hover:bg-gray-100"
          >
            ➕ Add Another Donation
          </button>

          <button
            onClick={onClose}
            className="w-full rounded-xl border py-3 hover:bg-gray-100"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}