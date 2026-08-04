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

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    const body = await request.json();

    const searchValue = String(body.search ?? "").trim();

    if (!searchValue) {
      return NextResponse.json(
        {
          error:
            "Please enter your mobile number or Request ID.",
        },
        { status: 400 }
      );
    }

    const digitsOnly = searchValue.replace(/\D/g, "");

    let query = supabase
      .from("tshirt_online_requests")
      .select(`
        id,
        full_name,
        phone,
        items,
        total_quantity,
        estimated_amount,
        remarks,
        status,
        official_booking_id,
        created_at,
        reviewed_at,
        payment_preference,
        payment_claimed
      `);

    // If exactly 10 digits, search by phone.
    // Otherwise treat the value as a Request ID.
    if (/^[6-9]\d{9}$/.test(digitsOnly)) {
      query = query.eq("phone", digitsOnly);
    } else {
      query = query.eq("id", searchValue);
    }

    const { data, error } = await query
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("T-Shirt status lookup:", error);

      return NextResponse.json(
        {
          error: "Unable to check booking status.",
        },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        {
          error:
            "No T-Shirt booking request was found. Please check the mobile number or Request ID and try again.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      request: data,
    });
  } catch (error) {
    console.error("Public T-Shirt status:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}