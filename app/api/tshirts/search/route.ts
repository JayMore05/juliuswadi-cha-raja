import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  return createClient(url, key);
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();

    const query =
      request.nextUrl.searchParams
        .get("q")
        ?.trim();

    if (!query) {
      return NextResponse.json(
        {
          error: "Search query is required.",
        },
        {
          status: 400,
        }
      );
    }

    let booking = null;

    // Search by Booking ID

    if (query.toUpperCase().startsWith("JM")) {
      const { data } = await supabase
        .from("tshirt_bookings")
        .select(`
          *,
          items:tshirt_booking_items(*),
          payments:booking_payments(*)
        `)
        .eq("booking_id", query)
        .maybeSingle();

      booking = data;
    }

    // Search by Phone

    if (!booking) {
      const { data } = await supabase
        .from("tshirt_bookings")
        .select(`
          *,
          items:tshirt_booking_items(*),
          payments:booking_payments(*)
        `)
        .eq("phone", query)
        .maybeSingle();

      booking = data;
    }

    if (!booking) {
      return NextResponse.json(
        {
          error: "Booking not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      booking,
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Unknown Error",
      },
      {
        status: 500,
      }
    );
  }
}