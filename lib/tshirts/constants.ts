import {
  BookingStatus,
  TshirtSize,
} from "@/types/tshirt";

/* ======================================
   Mandal
====================================== */

export const MANDAL_NAME =
  "Juliuswadi Cha Raja";

/* ======================================
   Sizes
====================================== */

export const TSHIRT_SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "3XL",
] as const;

/* ======================================
   Statuses
====================================== */

export const BOOKING_STATUSES: BookingStatus[] =
[
  "Booked",
  "Ready for Collection",
  "Delivered",
  "Cancelled",
];

/* ======================================
   Status Badge Colors
====================================== */

export const STATUS_COLORS: Record<
  BookingStatus,
  string
> = {
  Booked:
    "bg-blue-100 text-blue-700 border-blue-200",

  "Ready for Collection":
    "bg-yellow-100 text-yellow-700 border-yellow-200",

  Delivered:
    "bg-green-100 text-green-700 border-green-200",

  Cancelled:
    "bg-red-100 text-red-700 border-red-200",
};

/* ======================================
   Dashboard Card Colors
====================================== */

export const DASHBOARD_CARD_COLORS = {
  bookings:
    "from-orange-500 to-amber-500",

  ready:
    "from-blue-500 to-cyan-500",

  delivered:
    "from-green-500 to-emerald-500",

  remaining:
    "from-red-500 to-rose-500",
};

/* ======================================
   Booking Defaults
====================================== */

export const DEFAULT_BOOKING_STATUS =
  "Booked";

export const DEFAULT_PREFIX =
  "JMCR";

export const CURRENT_YEAR =
  new Date().getFullYear();

/* ======================================
   Receipt
====================================== */

export const RECEIPT_TITLE =
  "Official T-Shirt Booking Receipt";

export const RECEIPT_FOOTER =
  "Thank you for supporting Juliuswadi Cha Raja.";

export const RECEIPT_SIGNATURE =
  "Authorized Signature";

/* ======================================
   Manufacturer
====================================== */

export const MANUFACTURER_FILE_NAME =
  "Manufacturer_Size_Summary";

/* ======================================
   Pagination
====================================== */

export const PAGE_SIZE = 10;

/* ======================================
   Search Placeholder
====================================== */

export const SEARCH_PLACEHOLDER =
  "Search Booking ID, Name, Phone or Receipt No";

/* ======================================
   QR
====================================== */

export const QR_SIZE = 180;

/* ======================================
   Role Names
====================================== */

export const ROLES = {
  VOLUNTEER: "Volunteer",
  ADMIN: "Admin",
  SUPER_ADMIN: "Super Admin",
} as const;

/* ======================================
   Distribution
====================================== */

export const DISTRIBUTION_LABELS = {
  pending: "Pending Collection",

  ready: "Ready",

  delivered: "Delivered",
};

/* ======================================
   Empty States
====================================== */

export const EMPTY_BOOKING_MESSAGE =
  "No bookings found.";

export const EMPTY_REPORT_MESSAGE =
  "No report available.";

export const EMPTY_DISTRIBUTION_MESSAGE =
  "No bookings pending for distribution.";

/* ======================================
   Toast Messages
====================================== */

export const TOAST = {

  BOOKING_CREATED:
    "Booking created successfully.",

  BOOKING_UPDATED:
    "Booking updated successfully.",

  BOOKING_DELETED:
    "Booking deleted successfully.",

  BOOKING_DELIVERED:
    "T-Shirt delivered successfully.",

  SETTINGS_UPDATED:
    "Settings updated successfully.",

};