export type TshirtSize =
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "XXL"
  | "3XL";

export type PaymentMode =
  | "Cash"
  | "UPI";

export type BookingStatus =
  | "Booked"
  | "Ready for Collection"
  | "Delivered"
  | "Cancelled";

export interface BookingItem {
  id?: string;

  booking_id?: string;

  tshirt_size: TshirtSize;

  quantity: number;

  price: number;

  subtotal: number;

  created_at?: string;
}

export interface BookingPayment {
  id?: string;

  booking_id?: string;

  payment_mode: PaymentMode;

  amount: number;

  paid_at?: string;

  transaction_id?: string;

  remarks?: string;
}

export interface TshirtBooking {
  id: string;

  booking_id: string;

  booking_serial: number;

  year_id: string;

  donor_name: string;

  phone: string;

  donation_receipt_no?: string;

  remarks?: string;

  volunteer_name?: string;

  payment_mode: PaymentMode;

  total_quantity: number;

  total_amount: number;

  status: BookingStatus;

  delivered: boolean;

  delivered_at?: string;

  delivered_by?: string;

  created_at: string;

  updated_at: string;

  items: BookingItem[];

  payments: BookingPayment[];
}

export interface BookingSettings {
  id: string;

  year_id: string;

  booking_open: boolean;

  booking_close_date: string;

  expected_ready_date: string;

  distribution_start_date: string;

  collection_venue: string;

  collection_time: string;

  important_instructions: string;

  receipt_header: string;

  receipt_footer: string;

  booking_prefix: string;

  tshirt_price: number;

  mandal_logo?: string;
}

export interface BookingYear {
  id: string;

  year: number;

  is_active: boolean;

  is_archived: boolean;
}

export interface ManufacturerSummary {
  XS: number;

  S: number;

  M: number;

  L: number;

  XL: number;

  XXL: number;

  "3XL": number;

  total: number;
}

export interface DashboardStats {
  totalBookings: number;
  todayBookings: number;

  bookingOpen: boolean;
  distributionStarted: boolean;

  totalDelivered: number;
  remainingDistribution: number;

  expectedReadyDate?: string;

  totalPieces: number;
  totalAmount: number;

  sizeWiseCount: {
    XS: number;
    S: number;
    M: number;
    L: number;
    XL: number;
    XXL: number;
    "3XL": number;
  };
}