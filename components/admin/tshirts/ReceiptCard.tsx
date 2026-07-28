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
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [generatedOn, setGeneratedOn] = useState("");
  const [qrSize, setQrSize] = useState(85);

  useEffect(() => {
    setGeneratedOn(new Date().toLocaleString("en-IN"));
    document.title = `Receipt - ${booking.booking_id}`;

    const updateQr = () => {
      setQrSize(window.innerWidth < 640 ? 70 : 85);
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

  async function handleDownloadPdf() {
    if (!receiptRef.current) return;

    try {
      setIsGeneratingPdf(true);

      const dataUrl = await toPng(receiptRef.current!, {
        cacheBust: true,
        pixelRatio: 1.5,
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
        className="mx-auto max-w-[760px] rounded-3xl border bg-white shadow-xl print:w-full print:max-w-none print:rounded-none print:border-0 print:shadow-none"
      >

        {/* Header */}
        <div className="rounded-t-3xl bg-orange-600 px-5 py-3 text-center text-white print:rounded-t-none">
          <h1 className="text-lg sm:text-xl font-bold">
            Juliuswadi Cha Raja
          </h1>

          <p className="mt-1 text-sm">
            Official T-Shirt Booking Receipt
          </p>
        </div>

        {/* Receipt Body */}
        <div className="space-y-4 p-4 sm:p-5 md:p-6">

          {/* Booking & Customer Details */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div className="print:break-inside-avoid">
              <h3 className="mb-2 text-lg font-bold text-orange-600">
                Booking Details
              </h3>

              <div className="space-y-2 text-sm">
                <p>
                  <strong>Booking ID:</strong>{" "}
                  <span className="break-all">
                    {booking.booking_id}
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

                <p>
                  <strong>Payment:</strong>{" "}
                  {booking.payments?.[0]?.payment_mode || "-"}
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
                  <strong>Receipt No:</strong>{" "}
                  <span className="break-all">
                    {booking.donation_receipt_no || "-"}
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
            <div className="rounded-lg border bg-gray-50 p-3 text-sm">
              <strong>Remarks:</strong> {booking.remarks}
            </div>
          )}

          {/* ==========================================
              T-SHIRT DETAILS
          =========================================== */}
          <div className="print:break-inside-avoid">
            <h3 className="mb-3 text-lg font-bold text-orange-600">
              T-Shirt Details
            </h3>

            <div className="overflow-x-auto rounded-xl border print:overflow-visible">
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
          </div>

          {/* ==========================================
              SUMMARY
          =========================================== */}
          <div className="rounded-xl bg-orange-50 p-4 print:break-inside-avoid">
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

              <span className="text-xl font-extrabold text-green-600">
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
          <div className="grid gap-4 md:grid-cols-2 print:break-inside-avoid">
            
            {/* QR Section */}
            <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50 p-3 sm:p-4">
              <div
                id="receipt-qr"
                className="rounded-xl bg-white p-3 shadow"
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
                    volunteer: booking.volunteer_name,
                  })}
                  size={qrSize}
                  level="H"
                  includeMargin
                />
              </div>
            </div>

            {/* Important Notes */}
            <div className="rounded-xl bg-yellow-50 p-3 flex flex-col justify-center">
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
            </div>

          </div>

          {/* ==========================================
              FOOTER
          =========================================== */}
          <div className="border-t pt-2 text-center print:break-inside-avoid">
            <h3 className="text-base font-bold text-orange-600">
              Juliuswadi Cha Raja
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Thank you for supporting Juliuswadi Cha Raja. Please keep this receipt safely until T-Shirt collection.
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
        {isGeneratingPdf && (
          <div className="mb-4 text-center text-sm font-semibold text-orange-600 animate-pulse">
            Preparing Image...
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
              const message = `🛕 Juliuswadi Cha Raja\n\n📄 Booking ID: ${booking.booking_id}\n👤 Name: ${booking.donor_name}\n📱 Phone: ${booking.phone}\n👕 Quantity: ${totalQty}\n💰 Amount: ₹${booking.total_amount}\n🙋 Booking Taken By: ${booking.volunteer_name}\n\nPlease keep this receipt safely.\n${receiptUrl}`;

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