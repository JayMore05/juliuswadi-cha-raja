import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

import ReceiptCard from "@/components/admin/tshirts/ReceiptCard";

interface Props {
  params: Promise<{
    bookingId: string;
  }>;
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export default async function PublicTshirtReceiptPage({
  params,
}: Props) {
  const { bookingId } = await params;

  const supabase = getSupabase();

  const { data: booking, error } = await supabase
    .from("tshirt_bookings")
    .select(
      `
      *,
      items:tshirt_booking_items(*),
      payments:booking_payments(*)
      `
    )
    .eq("booking_id", bookingId)
    .maybeSingle();

  if (error) {
    console.error(error);
    notFound();
  }

  if (!booking) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-orange-50/40 px-3 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-5xl">
        <ReceiptCard booking={booking} />
      </div>
    </main>
  );
}