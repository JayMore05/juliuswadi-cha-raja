import {
  BookingItem,
  BookingStatus,
  ManufacturerSummary,
} from "@/types/tshirt";

/* ==========================================================
   STATUS COLORS
========================================================== */

export function getStatusColor(
  status: BookingStatus
) {
  switch (status) {
    case "Booked":
      return "bg-blue-100 text-blue-700 border-blue-200";

    case "Ready for Collection":
      return "bg-orange-100 text-orange-700 border-orange-200";

    case "Delivered":
      return "bg-green-100 text-green-700 border-green-200";

    case "Cancelled":
      return "bg-red-100 text-red-700 border-red-200";

    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

/* ==========================================================
   TOTAL QUANTITY
========================================================== */

export function getTotalQuantity(
  items: BookingItem[]
) {
  return items.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

/* ==========================================================
   TOTAL AMOUNT
========================================================== */

export function getTotalAmount(
  items: BookingItem[]
) {
  return items.reduce(
    (total, item) =>
      total + item.quantity * item.price,
    0
  );
}

/* ==========================================================
   MANUFACTURER SUMMARY
========================================================== */

export function getManufacturerSummary(
  items: BookingItem[]
): ManufacturerSummary {
  const summary: ManufacturerSummary = {
    "26": 0,
    "28": 0,
    "30": 0,
    "32": 0,

    XS: 0,
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    XXL: 0,
    XXXL: 0,

    total: 0,
  };

  items.forEach((item) => {
    const size = item.tshirt_size;
    const quantity = Number(item.quantity) || 0;

    if (summary[size] === undefined) {
      summary[size] = 0;
    }

    summary[size] += quantity;
    summary.total += quantity;
  });

  return summary;
}

/* ==========================================================
   FORMAT DATE
========================================================== */

export function formatDate(
  date?: string
) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

/* ==========================================================
   FORMAT DATE + TIME
========================================================== */

export function formatDateTime(
  date?: string
) {
  if (!date) return "-";

  return new Date(date).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

/* ==========================================================
   FORMAT PHONE
========================================================== */

export function formatPhone(
  phone: string
) {
  if (phone.length !== 10) return phone;

  return `${phone.slice(0, 5)} ${phone.slice(
    5
  )}`;
}

/* ==========================================================
   SEARCH
========================================================== */

export function matchesSearch(
  booking: any,
  query: string
) {
  if (!query) return true;

  const q = query.toLowerCase();

  return (
    booking.booking_id
      ?.toLowerCase()
      .includes(q) ||
    booking.donor_name
      ?.toLowerCase()
      .includes(q) ||
    booking.phone.includes(q) ||
    booking.donation_receipt_no
      ?.toLowerCase()
      .includes(q)
  );
}

/* ==========================================================
   SORT
========================================================== */

export function newestFirst(
  a: any,
  b: any
) {
  return (
    new Date(b.created_at).getTime() -
    new Date(a.created_at).getTime()
  );
}

export function oldestFirst(
  a: any,
  b: any
) {
  return (
    new Date(a.created_at).getTime() -
    new Date(b.created_at).getTime()
  );
}

/* ==========================================================
   GROUP ITEMS
========================================================== */

export function groupItemsBySize(
  items: BookingItem[]
) {
  const grouped: Record<
    string,
    BookingItem
  > = {};

  items.forEach((item) => {
    if (!grouped[item.tshirt_size]) {
      grouped[item.tshirt_size] = {
        ...item,
      };
    } else {
      grouped[item.tshirt_size].quantity +=
        item.quantity;

      grouped[item.tshirt_size].subtotal +=
        item.subtotal;
    }
  });

  return Object.values(grouped);
}

/* ==========================================================
   GENERATE BOOKING ID
========================================================== */

export function generateBookingId(
  prefix: string,
  year: number,
  serial: number
) {
  return `${prefix}-${year}-${String(serial).padStart(4, "0")}`;
}