import BookingForm from "@/components/admin/tshirts/BookingForm";

export const dynamic = "force-dynamic";

export default function NewBookingPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">

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
