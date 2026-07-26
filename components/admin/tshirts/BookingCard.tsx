"use client";

import Link from "next/link";
import {
  Eye,
  Printer,
  Pencil,
  PackageCheck,
  Phone,
  User,
  Shirt,
  Receipt,
} from "lucide-react";

import { TshirtBooking } from "@/types/tshirt";
import {
  formatCurrency,
  formatPhone,
} from "@/utils/booking-id";
import BookingStatusBadge from "./BookingStatusBadge";

interface Props {
  booking: TshirtBooking;
}

export default function BookingCard({
  booking,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm transition-all hover:shadow-lg">

      {/* Header */}

      <div className="border-b p-4">

        <div className="flex items-start justify-between gap-3">

          <div>

            <h2 className="flex items-center gap-2 text-lg font-bold">

              <User className="h-5 w-5 text-orange-600" />

              {booking.donor_name}

            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {booking.booking_id}
            </p>

          </div>

          <BookingStatusBadge
            status={booking.status}
          />

        </div>

      </div>

      {/* Body */}

      <div className="space-y-4 p-4">

        <div className="flex items-center gap-2">

          <Phone className="h-4 w-4 text-gray-500" />

          <span>
            {formatPhone(booking.phone)}
          </span>

        </div>

        {booking.donation_receipt_no && (

          <div className="flex items-center gap-2">

            <Receipt className="h-4 w-4 text-gray-500" />

            <span>
              {booking.donation_receipt_no}
            </span>

          </div>

        )}

        <div>

          <div className="mb-2 flex items-center gap-2 font-semibold">

            <Shirt className="h-4 w-4 text-orange-600" />

            T-Shirts

          </div>

          <div className="space-y-2">

            {booking.items?.map((item) => (

              <div
                key={`${item.tshirt_size}-${item.quantity}`}
                className="flex justify-between rounded-lg bg-orange-50 px-3 py-2"
              >

                <span>

                  {item.tshirt_size}

                  {" × "}

                  {item.quantity}

                </span>

                <span>

                  {formatCurrency(item.subtotal)}

                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t bg-gray-50 p-4">

        <div className="mb-4 flex items-center justify-between">

          <span className="font-medium">
            Total
          </span>

          <span className="text-xl font-bold text-green-600">

            {formatCurrency(
              booking.total_amount
            )}

          </span>

        </div>

        <div className="grid grid-cols-2 gap-2">

          <Link
            href={`/admin/tshirts/receipt/${booking.id}`}
            className="flex items-center justify-center gap-2 rounded-lg bg-orange-600 py-2 text-white transition hover:bg-orange-700"
          >

            <Printer className="h-4 w-4" />

            Receipt

          </Link>

          <Link
            href={`/admin/tshirts/${booking.id}`}
            className="flex items-center justify-center gap-2 rounded-lg border py-2 transition hover:bg-gray-100"
          >

            <Eye className="h-4 w-4" />

            View

          </Link>

          <Link
            href={`/admin/tshirts/edit/${booking.id}`}
            className="flex items-center justify-center gap-2 rounded-lg border py-2 transition hover:bg-gray-100"
          >

            <Pencil className="h-4 w-4" />

            Edit

          </Link>

          <Link
            href={`/admin/tshirts/distribution?id=${booking.id}`}
            className="flex items-center justify-center gap-2 rounded-lg bg-green-600 py-2 text-white transition hover:bg-green-700"
          >

            <PackageCheck className="h-4 w-4" />

            Deliver

          </Link>

        </div>

      </div>

    </div>
  );
}