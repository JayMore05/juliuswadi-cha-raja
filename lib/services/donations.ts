import { DonationLedger } from "../types/donation";

const API = "/api/donations";

export async function getDonations(): Promise<DonationLedger[]> {
  const res = await fetch(API, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load donations.");
  }

  return await res.json();
}

export async function createDonation(data: {
  donor_name: string;
  phone: string;
  promised_amount: number;
  paid_amount: number;
  payment_mode: string;
  remarks: string;
}) {
  const res = await fetch(API, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error);
  }

  return json;
}