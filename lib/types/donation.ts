export type PaymentMode =
  | "Cash"
  | "UPI"
  | "Bank"
  | "Cheque";

export type DonationStatus =
  | "Pending"
  | "Partial"
  | "Completed";

export interface Donor {
  id: string;
  donor_name: string;
  phone: string | null;
  address: string | null;
  created_at: string;
}

export interface Donation {
  id: string;

  donor_id: string;

  receipt_no: string;

  promised_amount: number;

  festival_year: number;

  status: DonationStatus;

  remarks: string | null;

  created_at: string;
}

export interface DonationPayment {
  id: string;

  donation_id: string;

  amount: number;

  payment_mode: PaymentMode;

  payment_date: string;
}

export interface DonationLedger {
  donor: Donor;

  donation: Donation;

  payments: DonationPayment[];

  totalPaid: number;

  balance: number;
} 