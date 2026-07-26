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

export default async function ReceiptPage({
  params,
}: Props) {
  const { bookingId } = await params;

  const supabase = getSupabase();

  const {
    data: booking,
    error,
  } = await supabase
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
    <div className="mx-auto max-w-5xl p-6">
      <ReceiptCard booking={booking} />
    </div>
  );
}