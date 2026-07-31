"use client";

import { Scanner } from "@yudiel/react-qr-scanner";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, QrCode } from "lucide-react";
import Link from "next/link";

export default function ScanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const success = searchParams.get("success");

  return (
    <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-8">

      {/* Header */}

      <div className="mb-6">

        <Link
          href="/admin/tshirts/distribution"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Distribution
        </Link>

        <h1 className="text-3xl font-extrabold text-orange-700">
          Scan T-Shirt QR
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Scan the booking QR code to verify and distribute the T-shirt.
        </p>

      </div>

      {/* Success */}

      {success && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />

          <div>
            <p className="font-semibold text-green-700">
              T-Shirt Delivered Successfully
            </p>

            <p className="text-sm text-green-600">
              Ready to scan the next booking.
            </p>
          </div>
        </div>
      )}

      {/* Scanner */}

      <div className="rounded-2xl border bg-white p-4 shadow-sm">

        <div className="mb-4 flex items-center gap-2">

          <QrCode className="h-5 w-5 text-orange-600" />

          <h2 className="font-semibold">
            QR Scanner
          </h2>

        </div>

        <div className="overflow-hidden rounded-2xl border max-h-[520px]">
          <Scanner
            styles={{
              container: {
                width: "100%",
                maxHeight: "520px",
              },
              video: {
                objectFit: "cover",
              },
            }}
            constraints={{ facingMode: "environment" }}
            onScan={(result) => {
              if (!result.length) return;

              const text = result[0].rawValue;

              try {
                const data = JSON.parse(text);
                router.push(`/admin/tshirts/scan/${data.bookingId}`);
              } catch {
                router.push(`/admin/tshirts/scan/${text}`);
              }
            }}
            onError={(err: any) => {
              if (
                err?.kind === "no-camera" ||
                err?.message === "Requested device not found"
              ) {
                return;
              }

              console.error("Scanner error:", err);
            }}
          />
        </div>

      </div>

      {/* Instructions */}

      <div className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">

        <h2 className="mb-3 font-semibold">
          Instructions
        </h2>

        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Point the camera at the QR code.</li>
          <li>• Wait until the QR is detected automatically.</li>
          <li>• Verify the booking details.</li>
          <li>• Confirm delivery only after handing over the T-shirt.</li>
        </ul>

      </div>

    </div>
  );
}
