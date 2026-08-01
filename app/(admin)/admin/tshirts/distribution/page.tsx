import DistributionClient from "@/components/admin/tshirts/DistributionClient";
import { PackageCheck, ArrowLeft } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DistributionPage() {
  const supabase = await createSupabaseServerClient();

  const [{ count: totalBookings }, { count: pending }, { count: delivered }] =
    await Promise.all([
      supabase
        .from("tshirt_bookings")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("tshirt_bookings")
        .select("*", { count: "exact", head: true })
        .neq("status", "Delivered"),

      supabase
        .from("tshirt_bookings")
        .select("*", { count: "exact", head: true })
        .eq("status", "Delivered"),
    ]);

  const { data: items } = await supabase
    .from("tshirt_booking_items")
    .select("quantity");

  const totalTshirts =
    items?.reduce((sum, item) => sum + Number(item.quantity), 0) ?? 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8">
      <div className="mb-6">
        <Link
          href="/admin/tshirts"
          className="inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2.5 text-sm font-semibold text-orange-700 shadow-sm transition hover:bg-orange-50"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8 flex items-start gap-4">
        <div className="rounded-2xl bg-orange-100 p-3">
          <PackageCheck className="h-8 w-8 text-orange-600" />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-orange-700">
            T-Shirt Distribution
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Search by Booking ID or Phone Number, or scan the QR code to verify
            and distribute T-shirts.
          </p>
        </div>
      </div>

      <DistributionClient
        stats={{
          totalBookings: totalBookings ?? 0,
          pending: pending ?? 0,
          delivered: delivered ?? 0,
          totalTshirts,
        }}
      />
    </div>
  );
}