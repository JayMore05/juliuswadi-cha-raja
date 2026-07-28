import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

import EditBookingForm from "@/components/admin/tshirts/EditBookingForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export default async function EditBookingPage({
  params,
}: Props) {
  const { id } = await params;

  const supabase = getSupabase();

  const { data: booking } = await supabase
    .from("tshirt_bookings")
    .select(`
      *,
      items:tshirt_booking_items(*),
      payments:booking_payments(*)
    `)
    .eq("id", id)
    .maybeSingle();

  if (!booking) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      <EditBookingForm booking={booking} />
    </div>
  );
}