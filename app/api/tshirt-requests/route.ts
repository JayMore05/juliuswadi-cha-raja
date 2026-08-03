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

const ALLOWED_SIZES = [
  "26",
  "28",
  "30",
  "32",
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
];

export async function GET() {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("tshirt_online_requests")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("Online Request GET:", error);

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

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    const body = await request.json();

    const fullName = String(body.full_name ?? "").trim();
    const phone = String(body.phone ?? "").replace(/\D/g, "");
    const remarks = String(body.remarks ?? "").trim();

    if (fullName.length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one T-Shirt." },
        { status: 400 }
      );
    }

    const items = body.items.map((item: any) => ({
      tshirt_size: String(item.tshirt_size),
      quantity: Number(item.quantity),
    }));

    for (const item of items) {
      if (!ALLOWED_SIZES.includes(item.tshirt_size)) {
        return NextResponse.json(
          { error: `Invalid T-Shirt size: ${item.tshirt_size}` },
          { status: 400 }
        );
      }

      if (
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 20
      ) {
        return NextResponse.json(
          { error: "Invalid T-Shirt quantity." },
          { status: 400 }
        );
      }
    }

    const totalQuantity = items.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    );

    // Fetch current official price instead of trusting browser
    const { data: activeYear } = await supabase
      .from("booking_years")
      .select("id")
      .eq("is_active", true)
      .maybeSingle();

    if (!activeYear) {
      return NextResponse.json(
        { error: "T-Shirt booking is currently unavailable." },
        { status: 400 }
      );
    }

    const { data: settings } = await supabase
      .from("booking_settings")
      .select("tshirt_price, booking_open")
      .eq("year_id", activeYear.id)
      .maybeSingle();

    if (!settings) {
      return NextResponse.json(
        { error: "T-Shirt booking settings not found." },
        { status: 500 }
      );
    }

    if (!settings.booking_open) {
      return NextResponse.json(
        { error: "T-Shirt requests are currently closed." },
        { status: 400 }
      );
    }

    const price = Number(settings.tshirt_price);
    const estimatedAmount = totalQuantity * price;

    const { data, error } = await supabase
      .from("tshirt_online_requests")
      .insert({
        full_name: fullName,
        phone,
        items,
        total_quantity: totalQuantity,
        estimated_amount: estimatedAmount,
        remarks: remarks || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Online request error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Request submitted successfully.",
      requestId: data.id,
    });
  } catch (error) {
    console.error("Public T-Shirt Request:", error);

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