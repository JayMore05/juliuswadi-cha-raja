"use client";

import { useState, useTransition } from "react";
import { markAsDelivered } from "@/app/(admin)/admin/tshirts/scan/actions";
import {
  PackageCheck,
  TriangleAlert,
  X,
  Loader2,
} from "lucide-react";

interface Props {
  bookingId: string;
}

export default function ConfirmDeliveryCard({
  bookingId,
}: Props) {
  const [confirm, setConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!confirm) {
    return (
      <button
        onClick={() => setConfirm(true)}
        className="mb-3 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-orange-600 text-lg font-semibold text-white transition hover:bg-orange-700 active:scale-95"
      >
        <PackageCheck className="h-5 w-5" />
        Mark as Delivered
      </button>
    );
  }

  return (
    <div className="mb-4 rounded-2xl border-2 border-orange-300 bg-orange-50 p-5 shadow-lg animate-in fade-in duration-200">

      <div className="mb-4 flex items-center gap-3">

        <TriangleAlert className="h-8 w-8 text-orange-600" />

        <div>
          <h3 className="text-lg font-bold text-orange-700">
            Confirm Delivery
          </h3>

          <p className="text-sm text-gray-600">
            Please verify the recipient before confirming delivery.
          </p>
        </div>

      </div>

      <div className="rounded-xl bg-white p-4 mb-5 border">
        <p className="text-sm text-gray-500">
          Booking ID
        </p>

        <p className="mt-1 text-lg font-bold">
          {bookingId}
        </p>

        <p className="mt-3 text-sm text-gray-600">
          Please verify that:
        </p>

        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          <li>The correct person is collecting the T-shirt.</li>
          <li>The T-shirt has been handed over.</li>
          <li>The QR code belongs to this booking.</li>
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-3">

        <button
          disabled={isPending}
          onClick={() => setConfirm(false)}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border bg-white font-semibold disabled:opacity-50"
        >
          <X className="h-5 w-5" />
          Cancel
        </button>

        <button
          disabled={isPending}
          onClick={() =>
            startTransition(async () => {
              await markAsDelivered(bookingId);
            })
          }
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-green-600 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Marking...
            </>
          ) : (
            <>
              <PackageCheck className="h-5 w-5" />
              Confirm Delivery
            </>
          )}
        </button>

      </div>

    </div>
  );
}
