import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      receiptNo: string;
    }>;
  }
) {
  const { receiptNo } = await context.params;

  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("donations")
    .select(`
      *,
      donors(
        donor_name,
        phone
      ),
      donation_payments(
        amount,
        payment_mode,
        payment_date
      )
    `)
    .eq("receipt_no", receiptNo)
    .single();

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(data);
}