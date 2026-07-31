"use client";

interface Props {
  totalPieces: number;
  grandTotal: number;
}

export default function BookingSummary({
  totalPieces,
  grandTotal,
}: Props) {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-orange-600 to-amber-500 p-6 text-white shadow-lg">

      <h2 className="mb-6 text-2xl font-bold">
        📋 Booking Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">

          <span>Total Pieces</span>

          <span className="text-xl font-bold">
            {totalPieces}
          </span>

        </div>

        <div className="flex justify-between border-t border-orange-300 pt-4">

          <span className="text-lg font-bold">
            Grand Total
          </span>

          <span className="text-3xl font-extrabold">
            ₹{grandTotal}
          </span>

        </div>

      </div>

    </div>
  );
}
