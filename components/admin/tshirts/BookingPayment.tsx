"use client";

interface Props {
  paymentMode: "Cash" | "UPI";
  setPaymentMode: (
    mode: "Cash" | "UPI"
  ) => void;
}

export default function BookingPayment({
  paymentMode,
  setPaymentMode,
}: Props) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold text-orange-600">
        💳 Payment
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        <button
          type="button"
          onClick={() =>
            setPaymentMode("Cash")
          }
          className={`rounded-2xl border p-6 transition

          ${
            paymentMode === "Cash"
              ? "border-orange-500 bg-orange-50"
              : "border-gray-300"
          }`}
        >

          <div className="text-4xl">
            💵
          </div>

          <div className="mt-3 text-lg font-bold">
            Cash
          </div>

        </button>

        <button
          type="button"
          onClick={() =>
            setPaymentMode("UPI")
          }
          className={`rounded-2xl border p-6 transition

          ${
            paymentMode === "UPI"
              ? "border-green-500 bg-green-50"
              : "border-gray-300"
          }`}
        >

          <div className="text-4xl">
            📲
          </div>

          <div className="mt-3 text-lg font-bold">
            UPI
          </div>

        </button>

      </div>

    </div>
  );
}
