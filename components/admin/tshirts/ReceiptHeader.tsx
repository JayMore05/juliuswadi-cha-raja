"use client";

import BookingStatusBadge from "./BookingStatusBadge";
import { TshirtBooking } from "@/types/tshirt";

interface Props {
  booking: TshirtBooking;
}

export default function ReceiptHeader({
  booking,
}: Props) {
  const bookedDate = new Date(booking.created_at);

  return (
    <div className="border-b pb-8">

      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

        {/* Left */}

        <div className="space-y-4">

          <div>

            <p className="text-sm text-gray-500">
              Booking Number
            </p>

            <h2 className="text-3xl font-bold text-orange-600">
              {booking.booking_id}
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div>

              <p className="text-sm text-gray-500">
                Booking Date
              </p>

              <p className="font-semibold">
                {bookedDate.toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Booking Time
              </p>

              <p className="font-semibold">
                {bookedDate.toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </p>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col items-start gap-4 md:items-end">

          <BookingStatusBadge
            status={booking.status}
          />

          <div className="rounded-xl border bg-orange-50 px-5 py-3">

            <p className="text-xs text-gray-500">
              Total Amount
            </p>

            <p className="text-2xl font-bold text-green-600">
              ₹{Number(
                booking.total_amount
              ).toLocaleString("en-IN")}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
