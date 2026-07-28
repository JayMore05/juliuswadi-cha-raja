"use client";

import { Phone, User, CreditCard, FileText, UserCheck } from "lucide-react";
import { TshirtBooking } from "@/types/tshirt";

interface Props {
  booking: TshirtBooking;
}

export default function ReceiptCustomer({
  booking,
}: Props) {
  return (
    <div className="mt-8 rounded-2xl border bg-gray-50 p-6">

      <h3 className="mb-6 text-xl font-bold text-orange-600">
        Customer Details
      </h3>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Donor Name */}
        <div className="flex items-start gap-3">
          <User className="mt-1 h-5 w-5 text-orange-500" />

          <div>
            <p className="text-sm text-gray-500">
              Donor Name
            </p>

            <p className="font-semibold text-lg">
              {booking.donor_name}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <Phone className="mt-1 h-5 w-5 text-green-600" />

          <div>
            <p className="text-sm text-gray-500">
              Mobile Number
            </p>

            <p className="font-semibold text-lg">
              {booking.phone}
            </p>
          </div>
        </div>

        {/* Payment */}
        <div className="flex items-start gap-3">
          <CreditCard className="mt-1 h-5 w-5 text-blue-600" />

          <div>
            <p className="text-sm text-gray-500">
              Payment Mode
            </p>

            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                booking.payments?.[0]?.payment_mode === "UPI"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {booking.payments?.[0]?.payment_mode ?? "-"}
            </span>
          </div>
        </div>

        {/* Donation Receipt */}
        <div className="flex items-start gap-3">
          <FileText className="mt-1 h-5 w-5 text-purple-600" />

          <div>
            <p className="text-sm text-gray-500">
              Donation Receipt No.
            </p>

            <p className="font-semibold text-lg">
              {booking.donation_receipt_no || "Not Linked"}
            </p>
          </div>
        </div>

        {/* Booking Taken By */}
        <div className="flex items-start gap-3 md:col-span-2">
          <UserCheck className="mt-1 h-5 w-5 text-amber-600" />

          <div>
            <p className="text-sm text-gray-500">
              Booking Taken By
            </p>

            <p className="font-semibold text-lg">
              {booking.volunteer_name || "-"}
            </p>
          </div>
        </div>

      </div>

      {/* Remarks */}

      {booking.remarks && (
        <div className="mt-6 rounded-xl border bg-white p-4">

          <p className="mb-2 text-sm font-semibold text-gray-500">
            Remarks
          </p>

          <p className="text-gray-700">
            {booking.remarks}
          </p>

        </div>
      )}

    </div>
  );
}