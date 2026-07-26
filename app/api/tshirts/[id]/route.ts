import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = getSupabase();

    const { id } = await params;

    const { action } = await request.json();

    if (action !== "deliver") {
      return NextResponse.json(
        {
          error: "Invalid action.",
        },
        {
          status: 400,
        }
      );
    }

    // Check booking

    const { data: booking } = await supabase
      .from("tshirt_bookings")
      .select("*")
      .eq("id", id)
      .maybeSingle();

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

    if (booking.status === "Delivered") {
      return NextResponse.json(
        {
          error: "Already delivered.",
        },
        {
          status: 400,
        }
      );
    }

    // Update status

    const { error } = await supabase
      .from("tshirt_bookings")
      .update({
        status: "Delivered",
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    // Activity Log

    await supabase
      .from("booking_activity_logs")
      .insert({
        booking_id: id,
        action: "Delivered",
        details: "T-Shirt Delivered",
      });

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
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