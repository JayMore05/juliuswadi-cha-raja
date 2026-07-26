import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { bookingSchema } from "@/lib/schemas/booking";
import { generateBookingId } from "@/lib/tshirts/helpers";

export const dynamic = "force-dynamic";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing");
  }

  if (!key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing");
  }

  return createClient(url, key);
}

/* ======================================================
   GET BOOKINGS
====================================================== */

export async function GET() {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("tshirt_bookings")
      .select(`
        *,
        items:tshirt_booking_items(*),
        payments:booking_payments(*)
      `)
      .order("created_at", {
        ascending: false,
      });

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

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("T-Shirt API Error:", err);

    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Unknown Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

/* ======================================================
   CREATE BOOKING
====================================================== */

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();

    const body = await request.json();

    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0].message,
        },
        {
          status: 400,
        }
      );
    }

    const booking = parsed.data;

    /* -------------------------------------
       Duplicate Phone
    ------------------------------------- */

    const { data: duplicate } = await supabase
      .from("tshirt_bookings")
      .select("id, donor_name, booking_id")
      .eq("phone", booking.phone)
      .limit(1);

    const duplicateWarning = (duplicate?.length ?? 0) > 0;

    /* -------------------------------------
       Active Year
    ------------------------------------- */

    const {
      data: activeYear,
      error: activeYearError,
    } = await supabase
      .from("booking_years")
      .select("*")
      .eq("is_active", true)
      .maybeSingle();

    if (activeYearError || !activeYear) {
      return NextResponse.json(
        {
          error: "Active year not found.",
        },
        {
          status: 500,
        }
      );
    }

    /* -------------------------------------
       Settings
    ------------------------------------- */

    const {
      data: settings,
      error: settingsError,
    } = await supabase
      .from("booking_settings")
      .select("*")
      .eq("year_id", activeYear.id)
      .limit(1)
      .maybeSingle();

    if (settingsError || !settings) {
      return NextResponse.json(
        {
          error: "Booking settings not found.",
        },
        {
          status: 500,
        }
      );
    }

    /* -------------------------------------
       Booking Open Check
    ------------------------------------- */

    if (!settings.booking_open) {
      return NextResponse.json(
        {
          error: "Booking is closed.",
        },
        {
          status: 400,
        }
      );
    }

    /* -------------------------------------
       Calculate Server-Side Totals
    ------------------------------------- */

    const totalQuantity = booking.items.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    );

    const totalAmount = booking.items.reduce(
      (sum: number, item: any) =>
        sum + item.quantity * Number(settings.tshirt_price),
      0
    );

    if (booking.total_quantity !== totalQuantity) {
      return NextResponse.json(
        {
          error: "Invalid total quantity.",
        },
        {
          status: 400,
        }
      );
    }
    
    if (booking.total_amount !== totalAmount) {
      return NextResponse.json(
        {
          error: "Invalid total amount.",
        },
        {
          status: 400,
        }
      );
    }

    /* -------------------------------------
       Create Booking
    ------------------------------------- */

    const { data: insertedBooking, error: bookingError } = await supabase
      .from("tshirt_bookings")
      .insert({
        year_id: activeYear.id,
        donor_name: booking.donor_name,
        phone: booking.phone,
        donation_receipt_no: booking.donation_receipt_no || null,
        remarks: booking.remarks || null,
        total_quantity: totalQuantity,
        total_amount: totalAmount,
        
        status: "Booked",
      })
      .select()
      .single();

    if (bookingError || !insertedBooking) {
      return NextResponse.json(
        {
          error: bookingError?.message ?? "Booking creation failed",
        },
        {
          status: 500,
        }
      );
    }

    /* -------------------------------------
       Booking Number
    ------------------------------------- */

    const bookingId = generateBookingId(
      settings.booking_prefix,
      activeYear.year,
      insertedBooking.booking_serial
    );

    const { error: bookingIdError } = await supabase
      .from("tshirt_bookings")
      .update({
        booking_id: bookingId,
      })
      .eq("id", insertedBooking.id);

    if (bookingIdError) {
      await supabase
        .from("tshirt_bookings")
        .delete()
        .eq("id", insertedBooking.id);

      return NextResponse.json(
        {
          error: bookingIdError.message,
        },
        {
          status: 500,
        }
      );
    }

    /* -------------------------------------
       Insert Items
    ------------------------------------- */

    const itemRows = booking.items.map((item: any) => ({
      booking_id: insertedBooking.id,
      tshirt_size: item.tshirt_size,
      quantity: item.quantity,
      price: Number(settings.tshirt_price),
      subtotal: item.quantity * Number(settings.tshirt_price),
    }));

    const { error: itemsError } = await supabase
      .from("tshirt_booking_items")
      .insert(itemRows);

    if (itemsError) {
      // Rollback Booking
      await supabase
        .from("tshirt_bookings")
        .delete()
        .eq("id", insertedBooking.id);

      return NextResponse.json(
        {
          error: itemsError.message,
        },
        {
          status: 500,
        }
      );
    }

    /* -------------------------------------
       Payment
    ------------------------------------- */

    const { error: paymentError } = await supabase
      .from("booking_payments")
      .insert({
        booking_id: insertedBooking.id,
        payment_mode: booking.payment_mode,
        amount: totalAmount,
      });

    if (paymentError) {
      // Rollback Items and Booking
      await supabase
        .from("tshirt_booking_items")
        .delete()
        .eq("booking_id", insertedBooking.id);
      await supabase
        .from("tshirt_bookings")
        .delete()
        .eq("id", insertedBooking.id);

      return NextResponse.json(
        {
          error: paymentError.message,
        },
        {
          status: 500,
        }
      );
    }

    /* -------------------------------------
       Activity
    ------------------------------------- */

    const { error: logError } = await supabase
      .from("booking_activity_logs")
      .insert({
        booking_id: insertedBooking.id,
        action: "Booking Created",
        details: bookingId,
      });
      
    if (logError) {
      console.error("Activity log failed:", logError);
    }

    /* -------------------------------------
       Fetch Full Booking Data
    ------------------------------------- */

    const {
      data: fullBooking,
      error: fetchBookingError,
    } = await supabase
      .from("tshirt_bookings")
      .select(`
        *,
        items:tshirt_booking_items(*),
        payments:booking_payments(*)
      `)
      .eq("id", insertedBooking.id)
      .single();

    if (fetchBookingError || !fullBooking) {
      return NextResponse.json(
        {
          error:
            fetchBookingError?.message ??
            "Failed to fetch booking",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      duplicateWarning,
      bookingId,
      booking: fullBooking,
    });
  } catch (err) {
    console.error("T-Shirt API Error:", err);

    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Unknown Server Error",
      },
      {
        status: 500,
      }
    );
  }
}