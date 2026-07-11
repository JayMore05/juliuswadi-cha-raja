import { getSupabase } from "./donation.service";

export async function createPayment(
  donationId: string,
  amount: number,
  paymentMode: string
) {
  if (amount <= 0) {
    throw new Error("Payment amount must be greater than zero.");
  }

  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("donation_payments")
    .insert({
      donation_id: donationId,
      amount,
      payment_mode: paymentMode,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function recalculateDonation(
  donationId: string
) {
  const supabase = getSupabase();

  // Get donation
  const { data: donation, error: donationError } =
    await supabase
      .from("donations")
      .select("promised_amount")
      .eq("id", donationId)
      .single();

  if (donationError) {
    throw new Error(donationError.message);
  }

  // Sum all payments
  const { data: payments, error: paymentError } =
    await supabase
      .from("donation_payments")
      .select("amount")
      .eq("donation_id", donationId);

  if (paymentError) {
    throw new Error(paymentError.message);
  }

  const totalPaid = payments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );

  const promised = Number(donation.promised_amount);
  const balance = Math.max(promised - totalPaid, 0);

  let status:
    | "Pending"
    | "Partial"
    | "Completed";

  if (totalPaid === 0) {
    status = "Pending";
  } else if (balance === 0) {
    status = "Completed";
  } else {
    status = "Partial";
  }

  const { error: updateError } =
    await supabase
      .from("donations")
      .update({
        total_paid: totalPaid,
        balance,
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", donationId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return {
    totalPaid,
    balance,
    status,
  };
}