"use client";

import { useState } from "react";
import {
  Eye,
  IndianRupee,
  Printer,
  MessageCircle,
} from "lucide-react";

import { useDonations } from "@/hooks/useDonations";
import ReceivePaymentModal from "./ReceivePaymentModal";
import { receivePayment } from "@/hooks/useReceivePayment";

export default function DonationTable() {
  const { donations, loading } = useDonations();

  const [selectedDonation, setSelectedDonation] =
    useState<any>(null);

  const [paymentOpen, setPaymentOpen] =
    useState(false);

  const [paymentDonation, setPaymentDonation] =
    useState<any>(null);

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-8">
        Loading donations...
      </div>
    );
  }

  if (donations.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center text-slate-500">
        No donations found.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">

        <table className="min-w-full">

          <thead className="bg-orange-50">

            <tr>

              <th className="px-5 py-4 text-left">
                Receipt
              </th>

              <th className="px-5 py-4 text-left">
                Donor
              </th>

              <th className="px-5 py-4 text-left">
                Phone
              </th>

              <th className="px-5 py-4 text-left">
                Promised
              </th>

              <th className="px-5 py-4 text-left">
                Paid
              </th>

              <th className="px-5 py-4 text-left">
                Balance
              </th>

              <th className="px-5 py-4 text-left">
                Last Mode
              </th>

              <th className="px-5 py-4 text-left">
                Status
              </th>

              <th className="px-5 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {donations.map((item: any) => (

              <tr
                key={item.id}
                className="border-t hover:bg-orange-50"
              >

                <td className="px-5 py-4 font-semibold">
                  {item.receipt_no}
                </td>

                <td className="px-5 py-4">
                  {item.donor?.donor_name}
                </td>

                <td className="px-5 py-4">
                  {item.donor?.phone || "-"}
                </td>

                <td className="px-5 py-4">
                  ₹{item.promised_amount}
                </td>

                <td className="px-5 py-4 font-semibold text-green-600">
                  ₹{item.totalPaid}
                </td>

                <td className="px-5 py-4 font-semibold text-red-600">
                  ₹{item.balance}
                </td>

                <td className="px-5 py-4">
                  {item.payments?.length
                    ? item.payments[
                        item.payments.length - 1
                      ].payment_mode
                    : "-"}
                </td>

                <td className="px-5 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold
                    ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Partial"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                <td className="px-5 py-4">

                  <div className="flex items-center justify-center gap-2">

                    {/* View */}

                    <button
                      title="View Details"
                      onClick={() =>
                        setSelectedDonation(item)
                      }
                      className="rounded-lg border p-2 hover:bg-orange-100"
                    >
                      <Eye size={18} />
                    </button>

                    {/* Receive Balance */}

                    <button
                      title="Receive Balance"
                      disabled={item.balance <= 0}
                      onClick={() => {
                        setPaymentDonation(item);
                        setPaymentOpen(true);
                      }}
                      className="rounded-lg border p-2 hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <IndianRupee size={18} />
                    </button>

                    {/* Print */}

                    <button
                      title="Print Receipt"
                      className="rounded-lg border p-2 hover:bg-blue-100"
                    >
                      <Printer size={18} />
                    </button>

                    {/* WhatsApp */}

                    <button
                      title="WhatsApp"
                      className="rounded-lg border p-2 hover:bg-green-100"
                    >
                      <MessageCircle size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* View Donation */}

      {selectedDonation && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">

            <h2 className="mb-6 text-2xl font-bold text-orange-600">
              Donation Details
            </h2>

            <div className="space-y-3">

              <p>
                <strong>Receipt :</strong>{" "}
                {selectedDonation.receipt_no}
              </p>

              <p>
                <strong>Donor :</strong>{" "}
                {selectedDonation.donor?.donor_name}
              </p>

              <p>
                <strong>Phone :</strong>{" "}
                {selectedDonation.donor?.phone || "-"}
              </p>

              <p>
                <strong>Promised :</strong> ₹
                {selectedDonation.promised_amount}
              </p>

              <p>
                <strong>Paid :</strong> ₹
                {selectedDonation.totalPaid}
              </p>

              <p>
                <strong>Balance :</strong> ₹
                {selectedDonation.balance}
              </p>

              <p>
                <strong>Status :</strong>{" "}
                {selectedDonation.status}
              </p>

            </div>

            <button
              onClick={() =>
                setSelectedDonation(null)
              }
              className="mt-8 w-full rounded-xl bg-orange-600 py-3 font-semibold text-white hover:bg-orange-700"
            >
              Close
            </button>

          </div>

        </div>

      )}

      {/* Receive Payment */}

      <ReceivePaymentModal
        open={paymentOpen}
        donation={paymentDonation}
        onClose={() => {
          setPaymentOpen(false);
          setPaymentDonation(null);
        }}
        onSave={async (data) => {
          try {
            await receivePayment(
              paymentDonation.id,
              data
            );

            alert(
              "Payment received successfully."
            );

            setPaymentOpen(false);
            setPaymentDonation(null);

            window.location.reload();
          } catch (err) {
            alert(
              err instanceof Error
                ? err.message
                : "Something went wrong."
            );
          }
        }}
      />
    </>
  );
}