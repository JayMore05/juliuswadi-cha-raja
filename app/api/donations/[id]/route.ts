import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { amount, payment_mode } =
      await request.json();

    const supabase = getSupabase();

    // Get Donation
    const { data: donation, error } =
      await supabase
        .from("donations")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !donation) {
      return NextResponse.json(
        {
          error: "Donation not found.",
        },
        {
          status: 404,
        }
      );
    }

    const balance = Number(
      donation.balance
    );

    if (amount <= 0) {
      return NextResponse.json(
        {
          error:
            "Amount should be greater than zero.",
        },
        {
          status: 400,
        }
      );
    }

    if (amount > balance) {
      return NextResponse.json(
        {
          error: `Remaining balance is ₹${balance}`,
        },
        {
          status: 400,
        }
      );
    }

    // Insert payment

    const { error: paymentError } =
      await supabase
        .from("donation_payments")
        .insert({
          donation_id: id,
          amount,
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

    // New totals

    const newPaid =
      Number(donation.total_paid) +
      Number(amount);

    const newBalance =
      Number(donation.promised_amount) -
      newPaid;

    let status:
      | "Pending"
      | "Partial"
      | "Completed" = "Pending";

    if (newPaid === 0) {
      status = "Pending";
    } else if (newBalance === 0) {
      status = "Completed";
    } else {
      status = "Partial";
    }

    const { error: updateError } =
      await supabase
        .from("donations")
        .update({
          total_paid: newPaid,
          balance: newBalance,
          status,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", id);

    if (updateError) {
      return NextResponse.json(
        {
          error: updateError.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      total_paid: newPaid,
      balance: newBalance,
      status,
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