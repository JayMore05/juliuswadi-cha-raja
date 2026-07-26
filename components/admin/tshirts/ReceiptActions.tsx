"use client";

import {
  ArrowLeft,
  Printer,
  Download,
  Share2,
  Pencil,
  PackageCheck,
} from "lucide-react";
import QRCode from "react-qr-code";
import Link from "next/link";

interface Props {
  bookingId: string;
}

export default function ReceiptActions({
  bookingId,
}: Props) {
  const receiptUrl = `${
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000"
  }/admin/tshirts/receipt/${bookingId}`;

  const printReceipt = () => {
    window.print();
  };

  const shareReceipt = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "T-Shirt Booking Receipt",
          text: `Booking Receipt - ${bookingId}`,
          url: receiptUrl,
        });
      } else {
        await navigator.clipboard.writeText(receiptUrl);
        alert("Receipt link copied to clipboard.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const downloadPdf = () => {
    alert("PDF Download will be implemented in the next step.");
  };

  return (
    <div className="mt-10">

      {/* QR Code */}

      <div className="flex flex-col items-center">

        <div className="rounded-2xl border bg-white p-4 shadow-md">

          <QRCode
            value={receiptUrl}
            size={180}
          />

        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Scan this QR to open this receipt.
        </p>

      </div>

      {/* Action Buttons */}

      <div className="no-print mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <button
          onClick={printReceipt}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-orange-600 text-white transition hover:bg-orange-700"
        >
          <Printer size={18} />
          Print
        </button>

        <button
          onClick={downloadPdf}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 text-white transition hover:bg-blue-700"
        >
          <Download size={18} />
          Download PDF
        </button>

        <button
          onClick={shareReceipt}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-green-600 text-white transition hover:bg-green-700"
        >
          <Share2 size={18} />
          Share
        </button>

        <Link
          href={`/admin/tshirts/edit/${bookingId}`}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-yellow-500 text-white transition hover:bg-yellow-600"
        >
          <Pencil size={18} />
          Edit Booking
        </Link>

        <button
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white transition hover:bg-emerald-700"
        >
          <PackageCheck size={18} />
          Mark Delivered
        </button>

        <Link
          href="/admin/tshirts"
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gray-700 text-white transition hover:bg-gray-800"
        >
          <ArrowLeft size={18} />
          Back to Bookings
        </Link>

      </div>
    </div>
  );
}