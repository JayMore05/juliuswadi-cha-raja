"use client";

import { TshirtBooking } from "@/types/tshirt";

interface Props {
  booking: TshirtBooking;
}

export default function ReceiptItems({
  booking,
}: Props) {
  return (
    <div className="mt-8">

      <h3 className="mb-4 text-xl font-bold text-orange-600">
        T-Shirt Details
      </h3>

      <div className="overflow-hidden rounded-2xl border">

        <table className="w-full">

          <thead className="bg-orange-100">

            <tr>

              <th className="px-4 py-3 text-left">
                Size
              </th>

              <th className="px-4 py-3 text-center">
                Qty
              </th>

              <th className="px-4 py-3 text-right">
                Price
              </th>

              <th className="px-4 py-3 text-right">
                Subtotal
              </th>

            </tr>

          </thead>

          <tbody>

            {booking.items.map((item) => (
              <tr
                key={item.id}
                className="border-t"
              >

                <td className="px-4 py-4 font-semibold">
                  {item.tshirt_size}
                </td>

                <td className="px-4 py-4 text-center">
                  {item.quantity}
                </td>

                <td className="px-4 py-4 text-right">
                  ₹{Number(item.price).toLocaleString("en-IN")}
                </td>

                <td className="px-4 py-4 text-right font-semibold text-green-600">
                  ₹{Number(item.subtotal).toLocaleString("en-IN")}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Totals */}

      <div className="mt-6 flex justify-end">

        <div className="w-full max-w-sm rounded-2xl border bg-orange-50 p-5">

          <div className="mb-3 flex justify-between">

            <span>Total Quantity</span>

            <span className="font-bold">
              {booking.total_quantity}
            </span>

          </div>

          <div className="flex justify-between border-t pt-3 text-lg font-bold">

            <span>Total Amount</span>

            <span className="text-green-600">
              ₹{Number(
                booking.total_amount
              ).toLocaleString("en-IN")}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}
