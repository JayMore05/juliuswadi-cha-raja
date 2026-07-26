import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET() {
  try {
    const supabase = getSupabase();

    // Get active booking year
    const { data: year, error: yearError } = await supabase
      .from("booking_years")
      .select("id")
      .eq("is_active", true)
      .single();

    if (yearError || !year) {
      return NextResponse.json(
        {
          error: "Active booking year not found",
        },
        {
          status: 500,
        }
      );
    }

    // Get booking settings
    const {
      data,
      error,
    } = await supabase
      .from("booking_settings")
      .select("*")
      .eq("year_id", year.id)
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json(
        {
          error: "Booking settings not found",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(data);
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