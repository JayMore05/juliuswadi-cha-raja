"use client";

import {
  CalendarDays,
  MapPin,
  Clock3,
  Info,
} from "lucide-react";
import { BookingSettings } from "@/types/tshirt";

interface Props {
  settings: BookingSettings;
}

export default function ReceiptSummary({
  settings,
}: Props) {
  return (
    <div className="mt-8">

      <h3 className="mb-5 text-xl font-bold text-orange-600">
        Collection Details
      </h3>

      <div className="grid gap-5 md:grid-cols-3">

        {/* Expected Ready */}

        <div className="rounded-2xl border bg-orange-50 p-5">

          <CalendarDays className="mb-3 h-7 w-7 text-orange-600" />

          <p className="text-sm text-gray-500">
            Expected Ready
          </p>

          <p className="mt-1 font-semibold">
            {new Date(
              settings.expected_ready_date
            ).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }
            )}
          </p>

        </div>

        {/* Venue */}

        <div className="rounded-2xl border bg-orange-50 p-5">

          <MapPin className="mb-3 h-7 w-7 text-red-500" />

          <p className="text-sm text-gray-500">
            Collection Venue
          </p>

          <p className="mt-1 font-semibold">
            {settings.collection_venue}
          </p>

        </div>

        {/* Time */}

        <div className="rounded-2xl border bg-orange-50 p-5">

          <Clock3 className="mb-3 h-7 w-7 text-blue-600" />

          <p className="text-sm text-gray-500">
            Collection Time
          </p>

          <p className="mt-1 font-semibold">
            {settings.collection_time}
          </p>

        </div>

      </div>

      {/* Instructions */}

      <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">

        <div className="mb-4 flex items-center gap-2">

          <Info className="h-6 w-6 text-orange-600" />

          <h4 className="text-lg font-bold text-orange-700">
            Important Instructions
          </h4>

        </div>

        <div className="whitespace-pre-line text-gray-700">
          {settings.important_instructions}
        </div>

      </div>

    </div>
  );
}