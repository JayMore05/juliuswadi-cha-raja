import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import ConfirmDeliveryCard from "@/components/admin/tshirts/ConfirmDeliveryCard";
import {
  ArrowLeft,
  BadgeCheck,
  CreditCard,
  Phone,
  Shirt,
  User,
  PackageCheck,
  QrCode,
} from "lucide-react";

interface Props {
  params: Promise<{
    bookingId: string;
  }>;
}

export default async function ScanResultPage({
  params,
}: Props) {
  const { bookingId } = await params;

  const supabase = await createSupabaseServerClient();

  // Get booking
  const { data: booking, error: bookingError } = await supabase
    .from("tshirt_bookings")
    .select("*")
    .eq("booking_id", bookingId)
    .single();

  if (bookingError || !booking) {
    return (
      <pre className="p-6">
        {JSON.stringify({ bookingError }, null, 2)}
      </pre>
    );
  }

  // Get items
  const { data: items, error: itemsError } = await supabase
    .from("tshirt_booking_items")
    .select("*")
    .eq("booking_id", booking.id);

  // Get payments
  const { data: payments, error: paymentsError } = await supabase
    .from("booking_payments")
    .select("*")
    .eq("booking_id", booking.id);

  const totalQty =
    items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <div className="min-h-screen bg-orange-50 pb-32">
      <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-8">

        {/* Header */}

        <div className="mb-6 flex items-center gap-3">

          <Link
            href="/admin/tshirts/scan"
            className="rounded-full border bg-white p-2 shadow-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div>
            <h1 className="text-3xl font-extrabold text-orange-700">
              T-Shirt Distribution
            </h1>

            <p className="text-sm text-gray-500">
              Ganpati Mandal T-Shirt Distribution
            </p>
          </div>

        </div>

        {/* Status / Success */}

        <div
          className={`mb-5 rounded-2xl p-5 border ${
            booking.delivered
              ? "border-red-200 bg-red-50"
              : "border-green-200 bg-green-50"
          }`}
        >

          <div className="flex items-center gap-3">

            <BadgeCheck
              className={`h-10 w-10 ${
                booking.delivered ? "text-red-600" : "text-green-600"
              }`}
            />

            <div>

              <h2
                className={`text-lg font-bold ${
                  booking.delivered ? "text-red-700" : "text-green-700"
                }`}
              >
                {booking.delivered ? "Already Delivered" : "Booking Verified"}
              </h2>

              <div className="mt-3 space-y-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                    booking.delivered
                      ? "bg-red-600 text-white"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {booking.delivered ? "DELIVERED" : "BOOKING VERIFIED"}
                </span>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Booking ID
                  </p>

                  <p className="text-xl font-extrabold tracking-wider">
                    {booking.booking_id}
                  </p>

                  {!booking.delivered && (
                    <p className="mt-2 text-sm text-green-700">
                      Ready for Distribution
                    </p>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Donor */}

        <div className="mb-5 rounded-2xl border bg-white p-5 shadow-sm">

          <h2 className="mb-4 text-lg font-semibold">
            Donor Details
          </h2>

          <div className="space-y-4">

            <div className="flex items-center gap-3">

              <User className="h-5 w-5 text-orange-600" />

              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold">
                  {booking.donor_name}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3">

              <Phone className="h-5 w-5 text-orange-600" />

              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold">
                  {booking.phone}
                </p>
              </div>

            </div>

            {booking.donation_receipt_no && (
              <div className="flex items-center justify-between rounded-xl bg-orange-50 p-3">
                <span className="text-gray-500">
                  Receipt No.
                </span>

                <span className="font-bold">
                  {booking.donation_receipt_no}
                </span>
              </div>
            )}

          </div>

        </div>

        {/* Summary Card */}

        <div className="mb-5 rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Booking Summary
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <p className="text-sm text-gray-500">
                Total Quantity
              </p>

              <p className="text-2xl font-bold text-orange-600">
                {totalQty}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Amount
              </p>

              <p className="text-2xl font-bold text-orange-600">
                ₹{Number(booking.total_amount).toLocaleString("en-IN")}
              </p>
            </div>

          </div>
        </div>

        {/* T-Shirts */}

        <div className="mb-5 rounded-2xl border bg-white p-5 shadow-sm">

          <h2 className="mb-4 text-lg font-semibold">
            T-Shirt Details
          </h2>

          <div className="space-y-3">

            {items && items.length > 0 ? (
              items.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl bg-orange-50 p-3"
                >

                  <div className="flex items-center gap-2">

                    <Shirt className="h-5 w-5 text-orange-600" />

                    <div>
                      <p className="font-semibold">
                        Size {item.tshirt_size}
                      </p>

                      <p className="text-sm text-gray-500">
                        T-Shirt
                      </p>
                    </div>

                  </div>

                  <span className="rounded-lg bg-orange-500 px-3 py-1 font-semibold text-white">
                    Qty {item.quantity}
                  </span>

                </div>

              ))
            ) : (
              <div className="rounded-xl border border-dashed p-6 text-center text-gray-500">
                No T-Shirts Found
              </div>
            )}

          </div>

          <div className="mt-4 border-t pt-4 flex justify-between font-semibold">
            <span>Total Quantity</span>
            <span>{totalQty}</span>
          </div>

        </div>

        {/* Payment */}

        <div className="mb-6 rounded-2xl border bg-white p-5 shadow-sm">

          <h2 className="mb-4 text-lg font-semibold">
            Payment
          </h2>

          <div className="flex items-center gap-3">

            <CreditCard className="h-5 w-5 text-orange-600" />

            <div className="w-full">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Payment Mode
                </span>

                <span className="font-semibold">
                  {payments?.[0]?.payment_mode ?? "N/A"}
                </span>
              </div>

              <div className="mt-2 flex justify-between">
                <span className="text-gray-500">
                  Total Amount
                </span>

                <span className="text-lg font-bold text-orange-600">
                  ₹{Number(booking.total_amount).toLocaleString("en-IN")}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Delivery Details (if delivered) */}
        {booking.delivered && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-red-700">
              Delivery Details
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Delivered On</span>
                <span className="font-semibold">
                  {booking.delivered_at
                    ? new Date(booking.delivered_at).toLocaleString("en-IN")
                    : "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="font-semibold text-red-600">
                  Delivered
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 border-t pt-5 text-center text-sm text-gray-500">
          <p className="font-semibold">
            Juliuswadi Cha Raja
          </p>

          <p>
            T-Shirt Distribution System • 2026
          </p>
        </div>

      </div>

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-0 z-20 border-t bg-orange-50/95 backdrop-blur">

        <div className="mx-auto max-w-2xl p-4">

          {booking.delivered ? (
            <button
              disabled
              className="mb-3 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gray-400 text-lg font-semibold text-white"
            >
              <PackageCheck className="h-5 w-5" />
              Already Delivered
            </button>
          ) : (
            <ConfirmDeliveryCard bookingId={booking.booking_id} />
          )}

          <Link
            href="/admin/tshirts/scan"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-xl border-2 border-orange-200 bg-white text-lg font-semibold transition hover:bg-orange-50"
          >
            <QrCode className="h-5 w-5" />
            Scan Another QR
          </Link>

        </div>

      </div>

    </div>
  );
}