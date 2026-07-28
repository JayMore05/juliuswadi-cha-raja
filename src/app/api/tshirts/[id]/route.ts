import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

/* ======================================
   UPDATE BOOKING
====================================== */

export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const supabase = getSupabase();

    /* -----------------------------
       Update Booking
    ------------------------------ */

    const { error: bookingError } = await supabase
      .from("tshirt_bookings")
      .update({
        donor_name: body.donor_name,
        phone: body.phone,
        donation_receipt_no:
          body.donation_receipt_no || null,
        volunteer_name: body.volunteer_name,
        remarks: body.remarks || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (bookingError) {
      return NextResponse.json(
        {
          error: bookingError.message,
        },
        {
          status: 500,
        }
      );
    }

    /* -----------------------------
       Update Payment Mode
    ------------------------------ */

    const { error: paymentError } = await supabase
      .from("booking_payments")
      .update({
        payment_mode: body.payment_mode,
      })
      .eq("booking_id", id);

    if (paymentError) {
      return NextResponse.json(
        {
          error: paymentError.message,
        },
        {
          status: 500,
        }
      );
    }

    /* -----------------------------
       Activity Log
    ------------------------------ */

    await supabase
      .from("booking_activity_logs")
      .insert({
        booking_id: id,
        action: "Booking Updated",
        details: "Booking details edited",
      });

    return NextResponse.json({
      success: true,
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        error: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}