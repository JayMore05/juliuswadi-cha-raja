"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Loader2,
  Phone,
  RefreshCw,
  Shirt,
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
  status: "pending" | "approved" | "rejected";
  official_booking_id: string | null;
  created_at: string;
};

export default function OnlineTshirtRequestsPage() {
  const router = useRouter();

  const [requests, setRequests] = useState<OnlineRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  async function loadRequests() {
    try {
      setLoading(true);

      const res = await fetch("/api/tshirt-requests", {
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to load requests.");
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
    const confirmed = window.confirm(
      "Are you sure you want to reject this request?"
    );

    if (!confirmed) return;

    try {
      setProcessing(id);

      const res = await fetch(`/api/tshirt-requests/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "rejected",
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to reject request.");
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

  const completed = requests.filter(
    (request) => request.status !== "pending"
  );

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-orange-600">
            <span>🌐</span>
            PUBLIC T-SHIRT REQUESTS
          </div>

          <h1 className="text-3xl font-bold">
            Online Requests
          </h1>

          <p className="mt-1 text-gray-500">
            Verify public requests before creating official bookings.
          </p>
        </div>

        <button
          onClick={loadRequests}
          className="flex items-center justify-center gap-2 rounded-xl border bg-white px-4 py-3 font-semibold hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* STATS */}

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat
          title="Pending"
          value={pending.length}
          icon={<Clock3 />}
        />

        <Stat
          title="Approved"
          value={
            requests.filter((r) => r.status === "approved").length
          }
          icon={<CheckCircle2 />}
        />

        <Stat
          title="Rejected"
          value={
            requests.filter((r) => r.status === "rejected").length
          }
          icon={<XCircle />}
        />
      </div>

      {/* PENDING */}

      <section>
        <h2 className="mb-4 text-xl font-bold">
          🟡 Pending Requests
        </h2>

        {pending.length === 0 ? (
          <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
            No pending online requests.
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-2">
            {pending.map((request) => (
              <div
                key={request.id}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">
                      {request.full_name}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />

                      <a
                        href={`tel:${request.phone}`}
                        className="font-semibold"
                      >
                        {request.phone}
                      </a>
                    </div>
                  </div>

                  <span className="h-fit rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                    PENDING
                  </span>
                </div>

                <div className="space-y-2 rounded-xl bg-orange-50 p-4">
                  {request.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <Shirt className="h-4 w-4" />
                        Size {item.tshirt_size}
                      </span>

                      <strong>
                        × {item.quantity}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between border-t pt-4">
                  <span>
                    {request.total_quantity} T-Shirt(s)
                  </span>

                  <strong className="text-green-700">
                    ₹{Number(request.estimated_amount)}
                  </strong>
                </div>

                {request.remarks && (
                  <div className="mt-4 rounded-xl bg-gray-50 p-3 text-sm">
                    <strong>Remarks:</strong>{" "}
                    {request.remarks}
                  </div>
                )}

                <div className="mt-2 text-xs text-gray-400">
                  Requested{" "}
                  {new Date(request.created_at).toLocaleString(
                    "en-IN"
                  )}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <button
                    disabled={processing === request.id}
                    onClick={() => rejectRequest(request.id)}
                    className="rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-600 hover:bg-red-50"
                  >
                    Reject
                  </button>

                  <button
                    disabled={processing === request.id}
                    onClick={() => createBooking(request)}
                    className="rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-700"
                  >
                    Verify & Create Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* HISTORY */}

      {completed.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold">
            Request History
          </h2>

          <div className="overflow-hidden rounded-2xl border bg-white">
            {completed.map((request) => (
              <div
                key={request.id}
                className="flex flex-col gap-2 border-b p-4 last:border-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <strong>{request.full_name}</strong>

                  <div className="text-sm text-gray-500">
                    {request.phone} • {request.total_quantity} T-Shirt(s)
                  </div>
                </div>

                <span
                  className={
                    request.status === "approved"
                      ? "font-semibold text-green-600"
                      : "font-semibold text-red-600"
                  }
                >
                  {request.status === "approved"
                    ? "✓ Approved"
                    : "✕ Rejected"}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Stat({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-3 text-orange-600">
        {icon}
      </div>

      <div className="text-3xl font-bold">
        {value}
      </div>

      <div className="text-sm text-gray-500">
        {title}
      </div>
    </div>
  );
}