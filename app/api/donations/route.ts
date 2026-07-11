import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

/* ==========================================
   GET ALL DONATIONS
========================================== */

export async function GET() {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("donations")
      .select(
        `
        *,
        donors(
          id,
          donor_name,
          phone
        ),
        donation_payments(
          id,
          amount,
          payment_mode,
          payment_date
        )
      `
      )
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

    const donations =
      data?.map((donation: any) => {
        const payments =
          donation.donation_payments ?? [];

        const totalPaid = payments.reduce(
          (sum: number, payment: any) =>
            sum + Number(payment.amount),
          0
        );

        return {
          id: donation.id,

          receipt_no: donation.receipt_no,

          promised_amount:
            Number(donation.promised_amount),

          festival_year:
            donation.festival_year,

          status: donation.status,

          remarks: donation.remarks,

          created_at: donation.created_at,

          donor: donation.donors,

          payments,

          totalPaid,

          balance:
            Number(donation.promised_amount) -
            totalPaid,
        };
      }) ?? [];

    return NextResponse.json(donations);
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}

/* ==========================================
   ADD DONATION
========================================== */

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();

    const body = await request.json();

    const {
      donor_name,
      phone,
      promised_amount,
      paid_amount,
      payment_mode,
      remarks,
    } = body;

    /* -----------------------------
       CREATE DONOR
    ------------------------------ */

    const { data: donor, error: donorError } =
      await supabase
        .from("donors")
        .insert({
          donor_name,
          phone,
        })
        .select()
        .single();

    if (donorError) {
      return NextResponse.json(
        {
          error: donorError.message,
        },
        {
          status: 500,
        }
      );
    }

    /* -----------------------------
       RECEIPT NUMBER
    ------------------------------ */
/* -----------------------------
   RECEIPT NUMBER
------------------------------ */

const year = new Date().getFullYear();

const { count, error: countError } = await supabase
  .from("donations")
  .select("*", {
    count: "exact",
    head: true,
  })
  .eq("festival_year", year);

if (countError) {
  return NextResponse.json(
    {
      error: countError.message,
    },
    {
      status: 500,
    }
  );
}

const receiptNo = `JCR-${year}-${String((count ?? 0) + 1).padStart(4, "0")}`;
    

    /* -----------------------------
       CREATE DONATION
    ------------------------------ */

    const { data: donation, error: donationError } =
      await supabase
        .from("donations")
        .insert({
          donor_id: donor.id,

          receipt_no: receiptNo,

          promised_amount,

          festival_year:
            new Date().getFullYear(),

          remarks,

          status:
            Number(paid_amount) >=
            Number(promised_amount)
              ? "Completed"
              : "Pending",
        })
        .select()
        .single();

    if (donationError) {
      return NextResponse.json(
        {
          error: donationError.message,
        },
        {
          status: 500,
        }
      );
    }

    /* -----------------------------
       FIRST PAYMENT
    ------------------------------ */

    const { error: paymentError } =
      await supabase
        .from("donation_payments")
        .insert({
          donation_id: donation.id,

          amount: paid_amount,

          payment_mode,
        });

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

    return NextResponse.json({
      success: true,

      receipt_no: receiptNo,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}