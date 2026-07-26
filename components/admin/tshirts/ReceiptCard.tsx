"use client";

import { useEffect, useRef, useState } from "react";
import {
  Printer,
  Download,
  Share2,
  Loader2
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";

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
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [generatedOn, setGeneratedOn] = useState("");

  useEffect(() => {
    setGeneratedOn(new Date().toLocaleString("en-IN"));
    document.title = `Receipt - ${booking.booking_id}`;
  }, [booking.booking_id]);

  const totalQty =
    booking.items?.reduce(
      (sum: number, item: BookingItem) =>
        sum + item.quantity,
      0
    ) ?? 0;

  async function handleDownloadPdf() {
    if (!receiptRef.current) return;

    try {
      setIsGeneratingPdf(true);

      const dataUrl = await toPng(receiptRef.current!, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${booking.booking_id}.png`;
      link.target = "_blank";
      link.rel = "noopener";
      document.body.appendChild(link);
      
      requestAnimationFrame(() => {
        link.click();
        link.remove();
      });
    } catch (err) {
      console.error("Image Generation Error:", err);

      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert(JSON.stringify(err));
      }
    } finally {
      setIsGeneratingPdf(false);
    }
  }

  return (
    <div className={isGeneratingPdf ? "cursor-wait" : ""}>
      <div 
        ref={receiptRef}
        className="mx-auto max-w-4xl rounded-3xl border bg-white shadow-xl print:border-0 print:shadow-none"
      >

        {/* Header */}
        <div className="rounded-t-3xl bg-orange-600 px-8 py-8 text-center text-white">
          <h1 className="text-4xl font-bold">
            Juliuswadi Cha Raja
          </h1>

          <p className="mt-2 text-lg">
            Official T-Shirt Booking Receipt
          </p>
        </div>

        {/* Receipt Body */}
        <div className="space-y-8 p-8">

          {/* Booking Details */}
          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <h3 className="mb-3 text-xl font-bold text-orange-600">
                Booking Details
              </h3>

              <div className="space-y-4">
                <p>
                  <strong>Booking ID:</strong>{" "}
                  {booking.booking_id}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold print:border print:border-gray-500 print:bg-white print:text-black ${
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

                <p>
                  <strong>Payment:</strong>{" "}
                  {booking.payments?.[0]?.payment_mode || "-"}
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-bold text-orange-600">
                Customer Details
              </h3>

              <div className="space-y-2">
                <p>
                  <strong>Name:</strong>{" "}
                  {booking.donor_name}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {booking.phone}
                </p>

                <p>
                  <strong>Receipt No:</strong>{" "}
                  {booking.donation_receipt_no || "-"}
                </p>
              </div>
            </div>

          </div>

          {/* ==========================================
              T-SHIRT DETAILS
          =========================================== */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-orange-600">
              T-Shirt Details
            </h3>

            <div className="rounded-xl border print:overflow-visible overflow-hidden">
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
                        <td className="px-4 py-3 font-semibold">
                          {item.tshirt_size}
                        </td>

                        <td className="px-4 py-3 text-center">
                          {item.quantity}
                        </td>

                        <td className="px-4 py-3 text-right">
                          {Number(item.price).toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </td>

                        <td className="px-4 py-3 text-right font-bold">
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
          </div>

          {/* ==========================================
              SUMMARY
          =========================================== */}
          <div className="rounded-xl bg-orange-50 p-6">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="font-medium">
                Total Quantity
              </span>

              <span className="text-xl font-bold">
                {totalQty}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold">
                Grand Total
              </span>

              <span className="text-3xl font-extrabold text-green-600">
                {Number(booking.total_amount).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </div>
          </div>

          {/* ==========================================
              BOOKING QR
          =========================================== */}
          <div className="rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50 p-6">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">

              {/* Left */}
              <div>
                <h3 className="text-2xl font-bold text-orange-600">
                  Scan During Collection
                </h3>

                <p className="mt-3 text-gray-600">
                  Show this receipt while collecting your
                  official Juliuswadi Cha Raja T-Shirt.
                </p>

                <div className="mt-6 rounded-xl bg-white p-4 shadow">
                  <p className="text-sm text-gray-500">
                    Booking ID
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-orange-600">
                    {booking.booking_id}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex justify-center">
                <div
                  id="receipt-qr"
                  className="rounded-2xl bg-white p-5 shadow-lg"
                >
                  <QRCodeCanvas
                    value={JSON.stringify({
                      bookingId: booking.id,
                      bookingNumber: booking.booking_id,
                      donor: booking.donor_name,
                      phone: booking.phone,
                      quantity: totalQty,
                      receiptNo: booking.donation_receipt_no,
                      amount: booking.total_amount,
                      status: booking.status,
                      createdAt: booking.created_at,
                      paymentMode: booking.payments?.[0]?.payment_mode,
                    })}
                    size={200}
                    level="H"
                    includeMargin
                  />
                </div>
              </div>

            </div>
          </div>

          {/* ==========================================
              IMPORTANT NOTE
          =========================================== */}
          <div className="rounded-xl bg-yellow-50 p-5">
            <h3 className="font-bold text-yellow-800">
              Important
            </h3>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
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
          </div>

          {/* ==========================================
              FOOTER
          =========================================== */}
          <div className="border-t pt-8 text-center">
            <h3 className="text-xl font-bold text-orange-600">
              Juliuswadi Cha Raja
            </h3>

            <p className="mt-2 text-gray-500">
              Thank you for supporting Juliuswadi Cha Raja.
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Please keep this receipt safely until T-Shirt collection.
            </p>

            <div className="mt-3 text-xs text-gray-400 space-y-1">
              <p>
                Booking Created : {new Date(booking.created_at).toLocaleString("en-IN")}
              </p>
              {generatedOn && (
                <p>Receipt Generated : {generatedOn}</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ==========================================
          ACTION BUTTONS
      =========================================== */}
      <div className="print:hidden mt-6 mx-auto max-w-4xl">
        {isGeneratingPdf && (
          <div className="mb-4 text-center text-sm font-semibold text-orange-600 animate-pulse">
            Preparing Image...
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button
            type="button"
            aria-label="Print receipt"
            disabled={isGeneratingPdf}
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-4 font-semibold text-white transition hover:bg-orange-700 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Printer className="h-5 w-5" />
            Print
          </button>

          <button
            type="button"
            aria-label="Download receipt as PNG"
            disabled={isGeneratingPdf}
            onClick={handleDownloadPdf}
            className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-4 font-semibold text-white transition hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGeneratingPdf ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Download className="h-5 w-5" />
            )}
            {isGeneratingPdf ? "Generating..." : "Download PNG"}
          </button>

          <button
            type="button"
            aria-label="Share receipt on WhatsApp"
            disabled={isGeneratingPdf}
            onClick={() => {
              const receiptUrl = `${window.location.origin}/admin/tshirts/receipt/${booking.booking_id}`;
              const message = `🛕 Juliuswadi Cha Raja\n\n📄 Booking ID: ${booking.booking_id}\n👤 Name: ${booking.donor_name}\n📱 Phone: ${booking.phone}\n👕 Quantity: ${totalQty}\n💰 Amount: ₹${booking.total_amount}\n\nPlease keep this receipt safely.\n${receiptUrl}`;

              window.open(
                `https://wa.me/?text=${encodeURIComponent(message)}`,
                "_blank"
              );
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Share2 className="h-5 w-5" />
            WhatsApp
          </button>

          <button
            type="button"
            aria-label="Go back"
            disabled={isGeneratingPdf}
            onClick={() => history.back()}
            className="rounded-xl border border-orange-300 px-5 py-4 font-semibold transition hover:bg-orange-50 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}