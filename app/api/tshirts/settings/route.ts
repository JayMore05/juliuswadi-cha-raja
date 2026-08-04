import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase environment variables are missing.");
  }

  return createClient(url, key);
}

async function getActiveYearId() {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("booking_years")
    .select("id")
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Active booking year not found.");
  }

  return data.id;
}

/* =====================================================
   GET T-SHIRT SETTINGS
===================================================== */

export async function GET() {
  try {
    const supabase = getSupabase();
    const yearId = await getActiveYearId();

    const { data, error } = await supabase
      .from("booking_settings")
      .select("*")
      .eq("year_id", yearId)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Booking settings not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("T-Shirt Settings GET:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error.",
      },
      { status: 500 }
    );
  }
}

/* =====================================================
   UPDATE T-SHIRT SETTINGS
===================================================== */

export async function PUT(request: Request) {
  try {
    const supabase = getSupabase();
    const yearId = await getActiveYearId();

    const body = await request.json();

    const updates: Record<string, unknown> = {};

    if (typeof body.booking_open === "boolean") {
      updates.booking_open = body.booking_open;
    }

    if (typeof body.upi_id === "string") {
      updates.upi_id = body.upi_id.trim();
    }

    if (typeof body.gpay_number === "string") {
      const number = body.gpay_number.replace(/\D/g, "");

      if (
        number.length > 0 &&
        !/^[6-9]\d{9}$/.test(number)
      ) {
        return NextResponse.json(
          { error: "Enter a valid 10-digit GPay number." },
          { status: 400 }
        );
      }

      updates.gpay_number = number;
    }

    if (typeof body.upi_qr_url === "string") {
      updates.upi_qr_url = body.upi_qr_url.trim();
    }

    if (typeof body.public_payment_enabled === "boolean") {
      updates.public_payment_enabled =
        body.public_payment_enabled;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid settings supplied." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("booking_settings")
      .update(updates)
      .eq("year_id", yearId)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      settings: data,
    });
  } catch (error) {
    console.error("T-Shirt Settings PUT:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error.",
      },
      { status: 500 }
    );
  }
}