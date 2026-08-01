import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BookingForm from "@/components/admin/tshirts/BookingForm";

export const dynamic = "force-dynamic";

export default function NewBookingPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <Link
        href="/admin/tshirts"
        className="inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2.5 text-sm font-semibold text-orange-700 shadow-sm transition hover:bg-orange-50"
      >
        <ArrowLeft size={18} />
        Back
      </Link>

      <div>
        <h1 className="text-4xl font-bold text-orange-600">
          👕 New T-Shirt Booking
        </h1>
        <p className="mt-2 text-gray-600">
          Create a new booking for devotees.
        </p>
      </div>

      <BookingForm />
    </div>
  );
}