import { supabase } from "@/lib/supabase/client";
import { DashboardStats } from "@/types/dashboard";

export async function getDashboardStats(): Promise<DashboardStats> {
  // Gallery
  const { data: galleryData } = await supabase
    .from("gallery")
    .select("*");

  // Updates
  const { data: updatesData } = await supabase
    .from("updates")
    .select("*");

  // Committee
  const { data: committeeData } = await supabase
    .from("committee")
    .select("*");

  // Donations
  const { data: donationsData } = await supabase
    .from("donations")
    .select("*");

  const gallery = galleryData ?? [];
  const updates = updatesData ?? [];
  const committee = committeeData ?? [];
  const donations = donationsData ?? [];

  const donationAmount = donations.reduce(
    (sum: number, item: any) =>
      sum + Number(item.amount ?? 0),
    0
  );

  return {
    totalGallery: gallery.length,
    totalUpdates: updates.length,
    totalCommittee: committee.length,
    totalDonations: donationAmount,

    recentGallery: gallery.slice(0, 5),

    recentUpdates: updates
      .sort(
        (a: any, b: any) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      )
      .slice(0, 5),
  };
}