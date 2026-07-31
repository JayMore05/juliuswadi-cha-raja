"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function markAsDelivered(bookingId: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("tshirt_bookings")
    .update({
      delivered: true,
      status: "Delivered",
      delivered_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("booking_id", bookingId)
    .select();

  console.log("Updated rows:", data);
  console.log("Update error:", error);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/tshirts");
  revalidatePath(`/admin/tshirts/scan/${bookingId}`);

  redirect("/admin/tshirts/scan?success=1");
}
