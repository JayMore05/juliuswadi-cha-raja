import { BookingSettings } from "@/types/tshirt";

/**
 * Generate Booking ID
 * Example:
 * JMCR-2026-0001
 */

export function generateBookingId(
  prefix: string,
  year: number,
  serial: number
): string {
  return `${prefix}-${year}-${serial
    .toString()
    .padStart(4, "0")}`;
}

/**
 * Generate QR Payload
 * QR will only contain booking id.
 */

export function generateBookingQR(
  bookingId: string
) {
  return bookingId;
}

/**
 * Receipt filename
 */

export function generateReceiptFileName(
  bookingId: string
) {
  return `${bookingId}.pdf`;
}

/**
 * Manufacturer PDF filename
 */

export function generateManufacturerFileName(
  year: number
) {
  return `Manufacturer-Summary-${year}.pdf`;
}

/**
 * Format Phone
 */

export function formatPhone(
  phone: string
) {
  return phone.replace(
    /(\d{5})(\d{5})/,
    "$1 $2"
  );
}

/**
 * Format Currency
 */

export function formatCurrency(
  amount: number
) {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(amount);
}

/**
 * Total Quantity
 */

export function calculateTotalQuantity(
  items: {
    quantity: number;
  }[]
) {
  return items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
}

/**
 * Total Amount
 */

export function calculateTotalAmount(
  items: {
    quantity: number;
    price: number;
  }[]
) {
  return items.reduce(
    (sum, item) =>
      sum + item.quantity * item.price,
    0
  );
}

/**
 * Calculate Subtotal
 */

export function calculateSubtotal(
  quantity: number,
  price: number
) {
  return quantity * price;
}

/**
 * Booking Open?
 */

export function isBookingOpen(
  settings: BookingSettings
) {
  return settings.booking_open;
}