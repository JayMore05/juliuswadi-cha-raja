import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(request: NextRequest) {
  try {
    const phone =
      request.nextUrl.searchParams
        .get("phone")
        ?.trim();

    if (!phone) {
      return NextResponse.json({
        exists: false,
      });
    }

    const supabase = getSupabase();

    const { data } = await supabase
      .from("tshirt_bookings")
      .select("booking_id, donor_name")
      .eq("phone", phone)
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

    return NextResponse.json({
      exists: !!data,
      booking: data ?? null,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
