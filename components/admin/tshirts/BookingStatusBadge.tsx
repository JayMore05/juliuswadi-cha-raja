"use client";

import { BookingStatus } from "@/types/tshirt";
import { getStatusColor } from "@/lib/tshirts/helpers";
import {
  CheckCircle2,
  Clock3,
  Package,
  XCircle,
} from "lucide-react";

interface Props {
  status: BookingStatus;
}

export default function BookingStatusBadge({
  status,
}: Props) {
  const color = getStatusColor(status);

  const Icon =
    status === "Delivered"
      ? CheckCircle2
      : status === "Ready for Collection"
      ? Package
      : status === "Cancelled"
      ? XCircle
      : Clock3;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold ${color}`}
    >
      <Icon className="h-4 w-4" />
      {status}
    </span>
  );
}
