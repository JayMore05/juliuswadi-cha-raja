"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  CreditCard,
  IndianRupee,
  Loader2,
  Phone,
  RefreshCw,
  Shirt,
  Smartphone,
  UserRound,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RequestItem = {
  tshirt_size: string;
  quantity: number;
};

type OnlineRequest = {
  id: string;
  full_name: string;
  phone: string;
  items: RequestItem[];
  total_quantity: number;
  estimated_amount: number;
  remarks: string | null;

  payment_preference: "pay_later" | "upi";
  payment_claimed: boolean;
  payment_reference: string | null;

  status: "pending" | "approved" | "rejected";
  official_booking_id: string | null;
  created_at: string;
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

function getSizeLabel(size: string) {
  return SIZE_LABELS[size] || size;
}

export default function OnlineTshirtRequestsPage() {
  const router = useRouter();

  const [requests, setRequests] = useState<OnlineRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [rejectingRequest, setRejectingRequest] =
    useState<OnlineRequest | null>(null);

  async function loadRequests() {
    try {
      setLoading(true);

      const res = await fetch("/api/tshirt-requests", {
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error || "Failed to load requests."
        );
      }

      setRequests(result);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load requests."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  async function rejectRequest(id: string) {
    try {
      setProcessing(id);

      const res = await fetch(
        `/api/tshirt-requests/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "rejected",
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error || "Failed to reject request."
        );
      }

      toast.success("Request rejected.");

      await loadRequests();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setProcessing(null);
    }
  }

  function createBooking(request: OnlineRequest) {
    sessionStorage.setItem(
      "onlineTshirtRequest",
      JSON.stringify(request)
    );

    router.push(
      `/admin/tshirts/new?onlineRequest=${request.id}`
    );
  }

  const pending = requests.filter(
    (request) => request.status === "pending"
  );

  const approved = requests.filter(
    (request) => request.status === "approved"
  );

  const rejected = requests.filter(
    (request) => request.status === "rejected"
  );

  const completed = requests.filter(
    (request) => request.status !== "pending"
  );

  if (loading) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center gap-3">
        <div className="rounded-2xl bg-orange-50 p-4">
          <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
        </div>

        <p className="text-sm font-medium text-gray-500">
          Loading online requests...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7">
      {/* BACK BUTTON */}

      <button
        type="button"
        onClick={() => router.push("/admin/tshirts")}
        className="inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2.5 text-sm font-semibold text-orange-700 shadow-sm transition hover:bg-orange-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to T-Shirt Management
      </button>

      {/* HEADER */}

      <div className="overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50 shadow-sm">
        <div className="flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-orange-600">
              <Smartphone className="h-4 w-4" />
              Public T-Shirt Requests
            </div>

            <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
              Online Requests
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Verify customer details, T-Shirt sizes and
              payment information before creating an official
              JMCR booking.
            </p>
          </div>

          <button
            type="button"
            onClick={loadRequests}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Requests
          </button>
        </div>
      </div>

      {/* STATS */}

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat
          title="Pending Requests"
          value={pending.length}
          description="Waiting for verification"
          icon={<Clock3 className="h-6 w-6" />}
          tone="orange"
        />

        <Stat
          title="Approved"
          value={approved.length}
          description="Converted / approved"
          icon={<CheckCircle2 className="h-6 w-6" />}
          tone="green"
        />

        <Stat
          title="Rejected"
          value={rejected.length}
          description="Requests not accepted"
          icon={<XCircle className="h-6 w-6" />}
          tone="red"
        />
      </div>

      {/* PENDING REQUESTS */}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Pending Requests
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Review carefully before creating an official booking.
            </p>
          </div>

          <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-700">
            {pending.length} Pending
          </span>
        </div>

        {pending.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 className="h-7 w-7 text-green-600" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-gray-900">
              All caught up!
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              There are no pending online T-Shirt requests.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-2">
            {pending.map((request) => (
              <div
                key={request.id}
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* CARD HEADER */}

                <div className="flex items-start justify-between gap-4 border-b bg-gray-50/70 p-5 sm:p-6">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                      <UserRound className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-xl font-bold text-gray-900">
                        {request.full_name}
                      </h3>

                      <a
                        href={`tel:${request.phone}`}
                        className="mt-1 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600"
                      >
                        <Phone className="h-4 w-4" />
                        {request.phone}
                      </a>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-xs font-bold text-yellow-700">
                    ● PENDING
                  </span>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  {/* ITEMS */}

                  <div>
                    <div className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                      T-Shirt Selection
                    </div>

                    <div className="space-y-2">
                      {request.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-xl border border-orange-100 bg-orange-50/70 px-4 py-3"
                        >
                          <span className="flex items-center gap-2 font-semibold text-gray-700">
                            <Shirt className="h-4 w-4 text-orange-600" />
                            {getSizeLabel(item.tshirt_size)}
                          </span>

                          <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-gray-900 shadow-sm">
                            × {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TOTAL */}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gray-50 p-4">
                      <div className="text-xs font-semibold uppercase text-gray-400">
                        Quantity
                      </div>

                      <div className="mt-1 text-lg font-bold text-gray-900">
                        {request.total_quantity} T-Shirt
                        {request.total_quantity !== 1 ? "s" : ""}
                      </div>
                    </div>

                    <div className="rounded-xl bg-green-50 p-4">
                      <div className="text-xs font-semibold uppercase text-green-600">
                        Amount
                      </div>

                      <div className="mt-1 flex items-center text-lg font-black text-green-700">
                        <IndianRupee className="h-4 w-4" />
                        {Number(request.estimated_amount)}
                      </div>
                    </div>
                  </div>

                  {/* PAYMENT */}

                  <div className="rounded-2xl border border-gray-200 p-4">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 font-bold text-gray-900">
                        <CreditCard className="h-5 w-5 text-orange-600" />
                        Payment
                      </div>

                      {request.payment_preference === "upi" ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                          UPI PAYMENT
                        </span>
                      ) : (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                          CASH
                        </span>
                      )}
                    </div>

                    {request.payment_preference === "upi" ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3">
                          <span className="text-sm text-gray-600">
                            Claimed Amount
                          </span>

                          <strong className="text-green-700">
                            ₹{Number(request.estimated_amount)}
                          </strong>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4">
                          <div className="text-xs font-bold uppercase tracking-wide text-gray-400">
                            UTR / Transaction ID
                          </div>

                          <div className="mt-2 break-all font-mono text-sm font-bold text-gray-900">
                            {request.payment_reference ||
                              "Not provided"}
                          </div>
                        </div>

                        {request.payment_claimed ? (
                          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-3 text-sm font-medium leading-5 text-yellow-800">
                            ⚠️ Customer has marked the UPI payment
                            as completed. Verify the transaction
                            before creating the official booking.
                          </div>
                        ) : (
                          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
                            Payment has not been marked as completed.
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-800">
                        Customer selected <strong>Cash</strong>.
                        Collect{" "}
                        <strong>
                          ₹{Number(request.estimated_amount)}
                        </strong>{" "}
                        while confirming the official booking.
                      </div>
                    )}
                  </div>

                  {/* REMARKS */}

                  {request.remarks && (
                    <div className="rounded-xl border bg-gray-50 p-4">
                      <div className="text-xs font-bold uppercase tracking-wide text-gray-400">
                        Customer Remarks
                      </div>

                      <p className="mt-2 text-sm text-gray-700">
                        {request.remarks}
                      </p>
                    </div>
                  )}

                  {/* DATE */}

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock3 className="h-4 w-4" />
                    Requested{" "}
                    {new Date(
                      request.created_at
                    ).toLocaleString("en-IN")}
                  </div>

                  {/* ACTIONS */}

                  <div className="grid gap-3 border-t pt-5 sm:grid-cols-[140px_1fr]">
                    <button
                      type="button"
                      disabled={processing === request.id}
                      onClick={() => setRejectingRequest(request)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </button>

                    <button
                      type="button"
                      disabled={processing === request.id}
                      onClick={() => createBooking(request)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 font-bold text-white shadow-sm transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      Verify & Create Official Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* HISTORY */}

      {completed.length > 0 && (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Request History
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Previously approved and rejected online requests.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
            {completed.map((request) => (
              <div
                key={request.id}
                className="flex flex-col gap-4 border-b p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      request.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {request.status === "approved" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                  </div>

                  <div>
                    <div className="font-bold text-gray-900">
                      {request.full_name}
                    </div>

                    <div className="mt-0.5 text-sm text-gray-500">
                      {request.phone} •{" "}
                      {request.total_quantity} T-Shirt
                      {request.total_quantity !== 1 ? "s" : ""}{" "}
                      • ₹{Number(request.estimated_amount)}
                    </div>

                    {request.official_booking_id && (
                      <div className="mt-1 text-xs font-semibold text-orange-600">
                        Booking: {request.official_booking_id}
                      </div>
                    )}
                  </div>
                </div>

                <span
                  className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${
                    request.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {request.status === "approved"
                    ? "✓ APPROVED"
                    : "✕ REJECTED"}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* REJECT CONFIRMATION MODAL */}

      {rejectingRequest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="border-b border-red-100 bg-red-50 p-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>

              <h3 className="mt-4 text-xl font-black text-gray-900">
                Reject T-Shirt Request?
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Please confirm before rejecting this public request.
              </p>
            </div>

            <div className="p-6">
              <div className="rounded-2xl border bg-gray-50 p-4">
                <div className="font-bold text-gray-900">
                  {rejectingRequest.full_name}
                </div>

                <div className="mt-1 text-sm text-gray-500">
                  {rejectingRequest.phone}
                </div>

                <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm">
                  <span className="text-gray-500">
                    T-Shirts
                  </span>

                  <strong>
                    {rejectingRequest.total_quantity}
                  </strong>
                </div>

                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Amount
                  </span>

                  <strong className="text-green-700">
                    ₹{Number(rejectingRequest.estimated_amount)}
                  </strong>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">
                This request will be moved from Pending to Rejected.
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={processing === rejectingRequest.id}
                  onClick={() => setRejectingRequest(null)}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={processing === rejectingRequest.id}
                  onClick={async () => {
                    const id = rejectingRequest.id;

                    await rejectRequest(id);

                    setRejectingRequest(null);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                  {processing === rejectingRequest.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Rejecting...
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4" />
                      Yes, Reject
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({
  title,
  value,
  description,
  icon,
  tone,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  tone: "orange" | "green" | "red";
}) {
  const styles = {
    orange: {
      box: "border-orange-100 bg-orange-50",
      icon: "bg-orange-100 text-orange-700",
      value: "text-orange-700",
    },
    green: {
      box: "border-green-100 bg-green-50",
      icon: "bg-green-100 text-green-700",
      value: "text-green-700",
    },
    red: {
      box: "border-red-100 bg-red-50",
      icon: "bg-red-100 text-red-700",
      value: "text-red-700",
    },
  };

  const style = styles[tone];

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm ${style.box}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div
            className={`text-3xl font-black ${style.value}`}
          >
            {value}
          </div>

          <div className="mt-1 font-bold text-gray-900">
            {title}
          </div>

          <div className="mt-1 text-xs text-gray-500">
            {description}
          </div>
        </div>

        <div
          className={`rounded-xl p-3 ${style.icon}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}