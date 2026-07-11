"use client";

export async function receivePayment(
  donationId: string,
  body: {
    amount: number;
    payment_mode: string;
    remarks: string;
  }
) {
  const res = await fetch(`/api/donations/${donationId}`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error);
  }

  return json;
}