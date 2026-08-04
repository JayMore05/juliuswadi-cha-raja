"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Loader2,
  Phone,
  Search,
  Shirt,
  XCircle,
} from "lucide-react";
import PublicTshirtRequestForm from "./PublicTshirtRequestForm";

type View = "home" | "booking" | "status";

type RequestItem = {
  tshirt_size: string;
  quantity: number;
};

type StatusRequest = {
  id: string;
  full_name: string;
  phone: string;
  items: RequestItem[];
  total_quantity: number;
  estimated_amount: number;
  remarks: string | null;
  status: "pending" | "approved" | "rejected";
  official_booking_id: string | null;
  created_at: string;
  reviewed_at: string | null;
  payment_preference: "pay_later" | "upi";
  payment_claimed: boolean;
};

const SIZE_LABELS: Record<string, string> = {
  "26": "Child (26)",
  "28": "Child (28)",
  "30": "Child (30)",
  "32": "Child (32)",
  XS: "XS (34)",
  S: "S (36)",
  M: "M (38)",
  L: "L (40)",
  XL: "XL (42)",
  XXL: "XXL (44)",
  XXXL: "XXXL (46)",
};

const VOLUNTEERS = [
  {
    name: "Sachin Gupta",
    phone: "8369939172",
  },
  {
    name: "Nikhil Patil",
    phone: "8591417066",
  },
  {
    name: "Patrik Tawre",
    phone: "7039004624",
  },
  {
    name: "Jay More",
    phone: "9137435654",
  },
];

function getSizeLabel(size: string) {
  return SIZE_LABELS[size] || `Custom (${size})`;
}

export default function TshirtPublicPortal() {
  const [view, setView] = useState<View>("home");

  const [searchValue, setSearchValue] = useState("");
  const [checking, setChecking] = useState(false);
  const [statusError, setStatusError] = useState("");
  const [statusResult, setStatusResult] =
    useState<StatusRequest | null>(null);

  async function checkStatus(e: React.FormEvent) {
    e.preventDefault();

    try {
      setChecking(true);
      setStatusError("");
      setStatusResult(null);

      const res = await fetch(
        "/api/tshirt-requests/status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            search: searchValue,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error || "Unable to check status."
        );
      }

      setStatusResult(result.request);
    } catch (error) {
      setStatusError(
        error instanceof Error
          ? error.message
          : "Unable to check status."
      );
    } finally {
      setChecking(false);
    }
  }

  function openHome() {
    setView("home");
    setStatusResult(null);
    setStatusError("");
  }

  if (view === "booking") {
    return (
      <div className="mx-auto max-w-2xl">
        <button
          type="button"
          onClick={openHome}
          className="mb-5 inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2.5 text-sm font-semibold text-orange-700 shadow-sm transition hover:bg-orange-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <PublicTshirtRequestForm />
      </div>
    );
  }

  if (view === "status") {
    return (
      <div className="mx-auto max-w-2xl">
        <button
          type="button"
          onClick={openHome}
          className="mb-5 inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2.5 text-sm font-semibold text-orange-700 shadow-sm transition hover:bg-orange-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <Search className="h-7 w-7" />
            </div>

            <h2 className="mt-4 text-2xl font-black text-gray-900">
              Check Booking Status
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Enter either your mobile number or Request ID to check
              your T-Shirt booking status.
            </p>
          </div>

          <form
            onSubmit={checkStatus}
            className="space-y-4"
          >
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Mobile Number or Request ID
              </label>

              <input
                required
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Enter mobile number or Request ID"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500"
              />

              <p className="mt-2 text-xs text-gray-500">
                You only need one — enter either the mobile number used
                for booking or your Request ID.
              </p>
            </div>

            {statusError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                {statusError}
              </div>
            )}

            <button
              type="submit"
              disabled={checking}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {checking ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Check Status
                </>
              )}
            </button>
          </form>
        </div>

        {statusResult && (
          <div className="mt-6 space-y-5">
            <StatusHeader request={statusResult} />

            <div className="rounded-3xl border bg-white p-6 shadow-xl">
              <h3 className="text-lg font-black text-gray-900">
                Request Details
              </h3>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Detail
                  label="Name"
                  value={statusResult.full_name}
                />

                <Detail
                  label="Mobile Number"
                  value={statusResult.phone}
                />

                <Detail
                  label="Request ID"
                  value={statusResult.id}
                  mono
                />

                <Detail
                  label="Official Booking ID"
                  value={
                    statusResult.official_booking_id ||
                    "Not created yet"
                  }
                  highlight={
                    !!statusResult.official_booking_id
                  }
                />

                <Detail
                  label="Total T-Shirts"
                  value={String(
                    statusResult.total_quantity
                  )}
                />

                <Detail
                  label="Amount"
                  value={`₹${Number(
                    statusResult.estimated_amount
                  )}`}
                />

                <Detail
                  label="Payment Mode"
                  value={
                    statusResult.payment_preference ===
                    "upi"
                      ? "UPI"
                      : "Cash"
                  }
                />

                <Detail
                  label="Requested On"
                  value={new Date(
                    statusResult.created_at
                  ).toLocaleString("en-IN")}
                />
              </div>

              <div className="mt-5 border-t pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  T-Shirt Selection
                </p>

                <div className="mt-3 space-y-2">
                  {statusResult.items.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-xl bg-orange-50 px-4 py-3"
                      >
                        <span className="flex items-center gap-2 font-semibold text-gray-800">
                          <Shirt className="h-4 w-4 text-orange-600" />
                          {getSizeLabel(
                            item.tshirt_size
                          )}
                        </span>

                        <strong>
                          × {item.quantity}
                        </strong>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <CommitteeContacts />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-gray-900">
          What would you like to do?
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Select an option below to continue.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <button
          type="button"
          onClick={() => setView("booking")}
          className="group rounded-3xl border-2 border-orange-100 bg-white p-7 text-left shadow-lg transition hover:-translate-y-1 hover:border-orange-400 hover:shadow-xl"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 transition group-hover:bg-orange-600 group-hover:text-white">
            <Shirt className="h-7 w-7" />
          </div>

          <h3 className="mt-5 text-2xl font-black text-gray-900">
            Book a T-Shirt
          </h3>

          <p className="mt-2 leading-6 text-gray-600">
            Submit a new Mandal T-Shirt request,
            select your size and choose Cash or UPI
            payment.
          </p>

          <div className="mt-6 inline-flex rounded-xl bg-orange-600 px-5 py-3 text-sm font-bold text-white">
            Start New Booking →
          </div>
        </button>

        <button
          type="button"
          onClick={() => setView("status")}
          className="group rounded-3xl border-2 border-blue-100 bg-white p-7 text-left shadow-lg transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
            <ClipboardCheck className="h-7 w-7" />
          </div>

          <h3 className="mt-5 text-2xl font-black text-gray-900">
            Check Booking Status
          </h3>

          <p className="mt-2 leading-6 text-gray-600">
            Already submitted a request? Check its
            verification and official booking status.
          </p>

          <div className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white">
            Check My Status →
          </div>
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-center text-sm text-yellow-800">
        Check your booking status using either your{" "}
        <strong>mobile number</strong> or{" "}
        <strong>Request ID</strong>. You only need one.
      </div>
    </div>
  );
}

function StatusHeader({
  request,
}: {
  request: StatusRequest;
}) {
  if (request.status === "approved") {
    return (
      <div className="rounded-3xl border border-green-200 bg-green-50 p-6 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />

        <h2 className="mt-3 text-2xl font-black text-green-800">
          Booking Confirmed
        </h2>

        <p className="mt-2 text-sm leading-6 text-green-800">
          Your T-Shirt request has been approved by the
          Juliuswadi Cha Raja Committee.
        </p>

        {request.official_booking_id && (
          <div className="mt-4 rounded-xl bg-white p-4">
            <p className="text-xs font-bold uppercase text-gray-400">
              Official Booking ID
            </p>

            <p className="mt-1 text-xl font-black text-green-700">
              {request.official_booking_id}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (request.status === "rejected") {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
        <XCircle className="mx-auto h-14 w-14 text-red-600" />

        <h2 className="mt-3 text-2xl font-black text-red-800">
          Request Not Approved
        </h2>

        <p className="mt-2 text-sm leading-6 text-red-700">
          This T-Shirt request has not been approved.
          Please contact the Juliuswadi Cha Raja Committee
          if you need assistance.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-6 text-center shadow-sm">
      <Clock3 className="mx-auto h-14 w-14 text-orange-600" />

      <h2 className="mt-3 text-2xl font-black text-orange-700">
        Pending Verification
      </h2>

      <p className="mt-2 text-sm leading-6 text-yellow-900">
        Your request has been received and is waiting for
        verification by a Juliuswadi Cha Raja volunteer.
      </p>
    </div>
  );
}

function Detail({
  label,
  value,
  mono = false,
  highlight = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p
        className={`mt-1 break-all font-bold ${
          mono ? "font-mono text-sm" : ""
        } ${
          highlight
            ? "text-green-700"
            : "text-gray-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function CommitteeContacts() {
  return (
    <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
      <div className="text-center">
        <Phone className="mx-auto h-8 w-8 text-blue-700" />

        <h3 className="mt-3 text-lg font-black text-blue-900">
          Need Help With Your Booking?
        </h3>

        <p className="mt-2 text-sm leading-6 text-blue-800">
          If you have not received an order confirmation
          or call from the Juliuswadi Cha Raja Committee,
          please call any of the volunteers below.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {VOLUNTEERS.map((volunteer) => (
          <a
            key={volunteer.phone}
            href={`tel:${volunteer.phone}`}
            className="rounded-xl border border-blue-200 bg-white p-4 text-center transition hover:border-blue-400 hover:bg-blue-50"
          >
            <div className="font-bold text-gray-900">
              {volunteer.name}
            </div>

            <div className="mt-1 flex items-center justify-center gap-2 font-bold text-blue-700">
              <Phone className="h-4 w-4" />
              {volunteer.phone}
            </div>
          </a>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-blue-700">
        Please keep your Request ID ready when contacting
        the committee.
      </p>
    </div>
  );
}