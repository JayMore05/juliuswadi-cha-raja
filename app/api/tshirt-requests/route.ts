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

const STANDARD_SIZES = [
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

/* ======================================================
   SIZE VALIDATION
====================================================== */

function isValidSize(size: string) {
  const isStandardSize = STANDARD_SIZES.includes(size);
  const isCustomSize =
    /^\d{2}$/.test(size) &&
    Number(size) >= 34 &&
    Number(size) <= 60;

  return isStandardSize || isCustomSize;
}

/* ======================================================
   GET ONLINE REQUESTS
====================================================== */

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

/* ======================================================
   CREATE PUBLIC T-SHIRT REQUEST
====================================================== */

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();

    const body = await request.json();

    const fullName = String(
      body.full_name ?? ""
    ).trim();

    const phone = String(
      body.phone ?? ""
    ).replace(/\D/g, "");

    const remarks = String(
      body.remarks ?? ""
    ).trim();

    const paymentPreference = String(
      body.payment_preference ?? "pay_later"
    );

    const paymentClaimed =
      body.payment_claimed === true;

    const paymentReference = String(
      body.payment_reference ?? ""
    ).trim();

    /* -------------------------------------
       Customer Validation
    ------------------------------------- */

    if (
      fullName.length < 2 ||
      fullName.length > 100
    ) {
      return NextResponse.json(
        {
          error: "Please enter your full name.",
        },
        { status: 400 }
      );
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        {
          error:
            "Please enter a valid 10-digit mobile number.",
        },
        { status: 400 }
      );
    }

    if (remarks.length > 500) {
      return NextResponse.json(
        {
          error:
            "Remarks cannot exceed 500 characters.",
        },
        { status: 400 }
      );
    }

    /* -------------------------------------
       T-Shirt Validation
    ------------------------------------- */

    if (
      !Array.isArray(body.items) ||
      body.items.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Please select at least one T-Shirt.",
        },
        { status: 400 }
      );
    }

    const items = body.items.map(
      (item: any) => ({
        tshirt_size: String(
          item.tshirt_size ?? ""
        ).trim(),

        quantity: Number(
          item.quantity
        ),
      })
    );

    for (const item of items) {
      if (!isValidSize(item.tshirt_size)) {
        return NextResponse.json(
          {
            error: `Invalid T-Shirt size: ${item.tshirt_size}`,
          },
          { status: 400 }
        );
      }

      if (
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 20
      ) {
        return NextResponse.json(
          {
            error:
              "Invalid T-Shirt quantity.",
          },
          { status: 400 }
        );
      }
    }

    const totalQuantity =
      items.reduce(
        (
          sum: number,
          item: {
            tshirt_size: string;
            quantity: number;
          }
        ) => sum + item.quantity,
        0
      );

    /* -------------------------------------
       Active Booking Year
    ------------------------------------- */

    const {
      data: activeYear,
      error: yearError,
    } = await supabase
      .from("booking_years")
      .select("id")
      .eq("is_active", true)
      .maybeSingle();

    if (yearError || !activeYear) {
      return NextResponse.json(
        {
          error:
            "T-Shirt booking is currently unavailable.",
        },
        { status: 400 }
      );
    }

    /* -------------------------------------
       Current Booking Settings
    ------------------------------------- */

    const {
      data: settings,
      error: settingsError,
    } = await supabase
      .from("booking_settings")
      .select(
        `
        tshirt_price,
        booking_open,
        public_payment_enabled
        `
      )
      .eq("year_id", activeYear.id)
      .maybeSingle();

    if (settingsError || !settings) {
      return NextResponse.json(
        {
          error:
            "T-Shirt booking settings not found.",
        },
        { status: 500 }
      );
    }

    if (!settings.booking_open) {
      return NextResponse.json(
        {
          error:
            "T-Shirt requests are currently closed.",
        },
        { status: 400 }
      );
    }

    /* -------------------------------------
       Price - SERVER SIDE ONLY
    ------------------------------------- */

    const price = Number(
      settings.tshirt_price
    );

    if (
      !Number.isFinite(price) ||
      price <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid T-Shirt price configuration.",
        },
        { status: 500 }
      );
    }

    const estimatedAmount =
      totalQuantity * price;

    /* -------------------------------------
       Payment Validation
    ------------------------------------- */

    if (
      paymentPreference !== "upi" &&
      paymentPreference !== "pay_later"
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid payment preference.",
        },
        { status: 400 }
      );
    }

    if (
      paymentPreference === "upi"
    ) {
      if (
        settings.public_payment_enabled ===
        false
      ) {
        return NextResponse.json(
          {
            error:
              "Online UPI payment is currently disabled.",
          },
          { status: 400 }
        );
      }

      if (!paymentClaimed) {
        return NextResponse.json(
          {
            error:
              "Please confirm that you completed the UPI payment.",
          },
          { status: 400 }
        );
      }

      if (
        paymentReference.length < 6 ||
        paymentReference.length > 30
      ) {
        return NextResponse.json(
          {
            error:
              "Please enter a valid UPI transaction / UTR number.",
          },
          { status: 400 }
        );
      }

      if (
        !/^[a-zA-Z0-9]+$/.test(
          paymentReference
        )
      ) {
        return NextResponse.json(
          {
            error:
              "Invalid UPI transaction / UTR number.",
          },
          { status: 400 }
        );
      }
    }

    /* -------------------------------------
       Insert Pending Request
    ------------------------------------- */

    const {
      data,
      error: insertError,
    } = await supabase
      .from("tshirt_online_requests")
      .insert({
        full_name: fullName,
        phone,

        items,

        total_quantity:
          totalQuantity,

        estimated_amount:
          estimatedAmount,

        remarks:
          remarks || null,

        payment_preference:
          paymentPreference,

        payment_claimed:
          paymentPreference === "upi"
            ? paymentClaimed
            : false,

        payment_reference:
          paymentPreference === "upi"
            ? paymentReference
            : null,

        status: "pending",
      })
      .select()
      .single();

    if (insertError) {
      console.error(
        "Online request insert error:",
        insertError
      );

      return NextResponse.json(
        {
          error:
            insertError.message,
        },
        { status: 500 }
      );
    }

    /* -------------------------------------
       Success
    ------------------------------------- */

    return NextResponse.json({
      success: true,

      message:
        "T-Shirt request submitted successfully.",

      requestId: data.id,

      status: "pending",

      totalQuantity,

      estimatedAmount,

      paymentPreference,
    });
  } catch (error) {
    console.error(
      "Public T-Shirt Request:",
      error
    );

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