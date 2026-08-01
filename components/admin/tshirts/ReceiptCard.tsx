"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Printer,
  Share2,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

interface BookingPayment {
  payment_mode: string;
}

interface BookingItem {
  id: string;
  tshirt_size: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface Booking {
  id: string;
  booking_id: string;
  donor_name: string;
  phone: string;
  donation_receipt_no: string | null;

  volunteer_name: string;
  remarks?: string;

  status: string;
  total_amount: number;
  created_at: string;

  items: BookingItem[];
  payments: BookingPayment[];
}

interface Props {
  booking: Booking;
}

export default function ReceiptCard({
  booking,
}: Props) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [generatedOn, setGeneratedOn] = useState("");
  const [qrSize, setQrSize] = useState(220);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setGeneratedOn(new Date().toLocaleString("en-IN"));
    document.title = `Receipt - ${booking.booking_id}`;

    const updateQr = () => {
      setQrSize(window.innerWidth < 640 ? 220 : 300);
    };

    updateQr();
    window.addEventListener("resize", updateQr);

    return () => window.removeEventListener("resize", updateQr);
  }, [booking.booking_id]);

  const totalQty =
    booking.items?.reduce(
      (sum: number, item: BookingItem) =>
        sum + item.quantity,
      0
    ) ?? 0;

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(booking.booking_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Unable to copy Booking ID");
    }
  };

  const paymentMode = booking.payments?.[0]?.payment_mode || "Cash";
  const isOnline = ["UPI", "ONLINE"].includes(paymentMode.toUpperCase());

  return (
    <div>
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }

          .print\\:hidden {
            display: none !important;
          }

          @page {
            size: A4 portrait;
            margin: 10mm;
          }

          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      <div 
        ref={receiptRef}
        className="mx-auto max-w-[760px] rounded-3xl border bg-white shadow-xl print:w-full print:max-w-none print:rounded-none print:border-0 print:shadow-none print:p-0 print:m-0"
      >

        {/* Header */}
        <div className="rounded-t-3xl bg-orange-600 px-5 py-4 text-center text-white print:rounded-t-none">
          <div className="flex flex-col items-center">
            <Image
              src="/logo/logo.png"
              alt="Juliuswadi Cha Raja"
              width={120}
              height={120}
              className="mb-3 object-contain"
            />

            <h1 className="text-xl font-bold">
              Juliuswadi Cha Raja
            </h1>
          </div>

          <p className="mt-1 text-sm font-semibold">
            Ganeshotsav 2026
          </p>
          <p className="text-xs opacity-90">
            Official Merchandise Collection Pass
          </p>
        </div>

        {/* Big Stamp */}
        <div className="flex justify-center pt-5">
          <div
            className={`rotate-[-8deg] rounded-xl border-4 px-8 py-2 text-3xl font-extrabold tracking-widest ${
              booking.status === "Delivered"
                ? "border-green-600 text-green-600"
                : "border-orange-600 text-orange-600"
            }`}
          >
            {booking.status === "Delivered"
              ? "DELIVERED"
              : "BOOKED ✓"}
          </div>
        </div>

        {/* Receipt Body */}
        <div className="relative overflow-hidden space-y-4 p-4 sm:p-5 md:p-6">

          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none print:opacity-[0.05]">
            <Image
              src="/logo/logo.png"
              alt=""
              width={450}
              height={450}
            />
          </div>

          {/* Booking & Customer Details */}
          <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2">

            <div className="print:break-inside-avoid">
              <h3 className="mb-2 text-lg font-bold text-orange-600">
                Booking Details
              </h3>

              <div className="space-y-2 text-sm">
                <div>
                  <strong className="text-orange-600">
                    Booking ID
                  </strong>
                  <div
                    onClick={handleCopyId}
                    title="Click to copy Booking ID"
                    className="relative mt-2 block cursor-pointer rounded-2xl border-2 border-orange-500 bg-orange-50 px-5 py-3 text-center text-3xl font-extrabold tracking-wider text-orange-700 shadow-sm transition hover:bg-orange-100 break-all"
                  >
                    {booking.booking_id}
                    {copied && (
                      <span className="absolute right-3 top-2 rounded-md bg-green-600 px-2 py-0.5 text-xs font-semibold text-white animate-fade-in">
                        Copied!
                      </span>
                    )}
                  </div>
                </div>

                <p>
                  <strong>Receipt No.</strong>
                  <span className="ml-2 font-bold text-orange-600">
                    {booking.donation_receipt_no || "-"}
                  </span>
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-semibold print:border print:border-gray-500 print:bg-white print:text-black ${
                      booking.status === "Booked"
                        ? "bg-blue-100 text-blue-700"
                        : booking.status === "Ready for Collection"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </p>

                <p className="flex items-center gap-2">
                  <strong>Payment Mode:</strong>{" "}
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {isOnline ? "Paid Online (UPI)" : "Cash Received"}
                  </span>
                </p>

                <p>
                  <strong>Booking Date:</strong>{" "}
                  {new Date(booking.created_at).toLocaleDateString("en-IN")}
                </p>
              </div>
            </div>

            <div className="print:break-inside-avoid">
              <h3 className="mb-2 text-lg font-bold text-orange-600">
                Customer Details
              </h3>

              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong>{" "}
                  {booking.donor_name}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  <span className="break-all">
                    {booking.phone}
                  </span>
                </p>

                <p>
                  <strong>Booking Taken By:</strong>{" "}
                  <span className="break-words">
                    {booking.volunteer_name}
                  </span>
                </p>
              </div>
            </div>

          </div>

          {/* Remarks */}
          {booking.remarks && (
            <div className="relative z-10 rounded-lg border bg-gray-50 p-3 text-sm">
              <strong>Remarks:</strong> {booking.remarks}
            </div>
          )}

          {/* ==========================================
              T-SHIRT DETAILS
          =========================================== */}
          <div className="relative z-10 print:break-inside-avoid">
            <h3 className="mb-3 text-lg font-bold text-orange-600">
              T-Shirt Details
            </h3>

            <div className="hidden overflow-x-auto rounded-xl border md:block print:block print:overflow-visible">
              <table className="min-w-[500px] w-full text-sm">
                <thead className="bg-orange-100">
                  <tr>
                    <th className="px-4 py-2.5 text-left">
                      Size
                    </th>
                    <th className="px-4 py-2.5 text-center">
                      Qty
                    </th>
                    <th className="px-4 py-2.5 text-right">
                      Price
                    </th>
                    <th className="px-4 py-2.5 text-right">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {booking.items?.map(
                    (item: BookingItem) => (
                      <tr
                        key={item.id}
                        className="border-t"
                      >
                        <td className="px-4 py-2.5 font-semibold">
                          {item.tshirt_size}
                        </td>

                        <td className="px-4 py-2.5 text-center">
                          {item.quantity}
                        </td>

                        <td className="px-4 py-2.5 text-right">
                          {Number(item.price).toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </td>

                        <td className="px-4 py-2.5 text-right font-bold">
                          {Number(item.subtotal).toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 md:hidden print:hidden">
              {booking.items?.map((item: BookingItem) => (
                <div
                  key={item.id}
                  className="rounded-xl border bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-semibold text-orange-600">
                      Size: {item.tshirt_size}
                    </span>
                    <span className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      {Number(item.price).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}{" "}
                      × {item.quantity}
                    </span>

                    <span className="font-bold text-green-600">
                      {Number(item.subtotal).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ==========================================
              SUMMARY
          =========================================== */}
          <div className="relative z-10 rounded-xl bg-orange-50 p-4 print:break-inside-avoid">
            <div className="flex items-center justify-between border-b pb-2 text-sm">
              <span className="font-medium">
                Total Quantity
              </span>

              <span className="font-bold">
                {totalQty}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-base font-bold">
                Grand Total
              </span>

              <span className="text-2xl font-extrabold text-green-600">
                {Number(booking.total_amount).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </div>
          </div>

          {/* ==========================================
              BOOKING QR & INSTRUCTIONS
          =========================================== */}
          <div className="relative z-10 grid gap-6 md:grid-cols-2 print:break-inside-avoid">
            
            {/* QR Section */}
            <div className="order-1 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50 p-3 sm:p-4">
              <div className="mb-4 text-center">
                <h3 className="text-lg font-bold text-orange-600">
                  Official Verification QR
                </h3>
                <p className="text-sm text-gray-500">
                  Show this QR to the volunteer
                </p>
              </div>

              <div
                id="receipt-qr"
                className="rounded-2xl bg-white p-5 shadow-lg"
              >
                <QRCodeCanvas
                  value={JSON.stringify({
                    id: booking.id,
                    bookingId: booking.booking_id,
                    phone: booking.phone,
                    amount: booking.total_amount,
                    qty: totalQty,
                    status: booking.status,
                    generatedAt: generatedOn,
                  })}
                  size={qrSize}
                  level="H"
                  includeMargin
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              </div>

              <p className="mt-3 rounded-lg bg-gray-100 px-3 py-2 text-center text-xs text-gray-600">
                Scan only through the official Juliuswadi Cha Raja Distribution Panel.
                Any screenshot, edited, or duplicated QR will be rejected.
              </p>

              <p className="mt-3 text-center text-sm font-semibold text-gray-600">
                Booking ID
                <span className="mt-1 block text-lg font-bold text-orange-600">
                  {booking.booking_id}
                </span>
              </p>

              <div className="mt-3 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-center w-full">
                <p className="text-sm font-semibold text-orange-700">
                  Total Merchandise
                </p>

                <p className="mt-1 text-3xl font-extrabold text-orange-600">
                  {totalQty}
                </p>

                <p className="text-xs text-gray-600">
                  T-Shirt{totalQty > 1 ? "s" : ""}
                </p>
              </div>

              <div className="mt-4 rounded-xl bg-red-50 border border-red-300 px-4 py-3 text-center">
                <p className="font-bold text-red-700">
                  Do Not Share This QR Code
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  This QR will be scanned only during T-Shirt collection.
                </p>
              </div>
            </div>

            {/* Important Notes */}
            <div className="order-2 flex flex-col justify-center rounded-xl bg-yellow-50 p-3">
              <h3 className="font-bold text-yellow-800 text-sm">
                Important Instructions
              </h3>

              <ul className="mt-2 list-disc space-y-0.5 pl-4 text-xs text-gray-700">
                <li>
                  Please carry this receipt during T-Shirt collection.
                </li>
                <li>
                  The QR Code will be scanned by the volunteer.
                </li>
                <li>
                  After successful verification, the T-Shirt will be marked as delivered.
                </li>
              </ul>

              <div className="mt-5 rounded-xl border bg-white p-3">
                <h3 className="mb-2 font-bold text-orange-600">
                  Size Chart
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Child (26)</div>
                  <div>Child (28)</div>
                  <div>Child (30)</div>
                  <div>Child (32)</div>
                  <div>XS (34)</div>
                  <div>S (36)</div>
                  <div>M (38)</div>
                  <div>L (40)</div>
                  <div>XL (42)</div>
                  <div>XXL (44)</div>
                  <div>XXXL (46)</div>
                </div>
              </div>
            </div>

          </div>

          {/* ==========================================
              FOOTER
          =========================================== */}
          <div className="relative z-10 border-t pt-2 text-center print:break-inside-avoid">
            <h3 className="text-base font-bold text-orange-600">
              Juliuswadi Cha Raja • Ganeshotsav 2026
            </h3>

            <p className="mt-1 text-xs text-gray-500 whitespace-pre-line">
              🙏 Thank you for supporting Juliuswadi Cha Raja.{"\n\n"}We look forward to celebrating Ganeshotsav 2026 with you.
            </p>

            <div className="mt-2 flex flex-col gap-1 text-center text-[11px] text-gray-400 sm:flex-row sm:justify-center sm:gap-4">
              <span>
                Booking Created: {new Date(booking.created_at).toLocaleString("en-IN")}
              </span>
              {generatedOn && (
                <span>Receipt Generated: {generatedOn}</span>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ==========================================
          ACTION BUTTONS
      =========================================== */}
      <div className="print:hidden mt-6 mx-auto w-full max-w-3xl px-2 sm:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            aria-label="Print receipt"
            onClick={() => {
              window.print();
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-4 font-semibold text-white transition hover:bg-orange-700"
          >
            <Printer className="h-5 w-5" />
            Print
          </button>

          <button
            type="button"
            aria-label="Share receipt on WhatsApp"
            onClick={() => {
              const phone = booking.phone.replace(/\D/g, "");

              const items = booking.items
                .map(
                  (item) => `\n• ${item.tshirt_size} × ${item.quantity}`
                )
                .join("");

              const receiptLink = `${window.location.origin}/receipt/tshirt/${booking.booking_id}`;
              const message = `🛕 *Juliuswadi Cha Raja*

🙏 Hello *${booking.donor_name}*,

Your T-Shirt booking has been confirmed successfully.

━━━━━━━━━━━━━━━━━━

🎟 *Booking ID*: ${booking.booking_id}

🧾 *Receipt No.*: ${booking.donation_receipt_no || "-"}

👕 *Items*${items}

📦 *Total Quantity*: ${totalQty}

💰 *Amount Paid*: ₹${booking.total_amount}

📄 *Receipt Link*
${receiptLink}

⚠️ Please keep this receipt safe and show the QR code while collecting your T-Shirt.

🙏 Ganpati Bappa Morya!`;

              const isMobile = /Android|iPhone|iPad|iPod/i.test(
                navigator.userAgent
              );
              const encodedMessage = encodeURIComponent(message);
              const url = isMobile
                ? `https://wa.me/91${phone}?text=${encodedMessage}`
                : `https://web.whatsapp.com/send?phone=91${phone}&text=${encodedMessage}`;
              window.open(url, "_blank");
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            <Share2 className="h-5 w-5" />
            Share on WhatsApp
          </button>

          <button
            type="button"
            aria-label="Go back"
            onClick={() => history.back()}
            className="rounded-xl border border-orange-300 px-5 py-4 font-semibold transition hover:bg-orange-50"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}