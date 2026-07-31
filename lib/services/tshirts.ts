import { BookingFormValues } from "@/lib/schemas/booking";
import { TshirtBooking } from "@/types/tshirt";

const API = "/api/tshirts";

/* ==========================================
   GET BOOKINGS
========================================== */

export async function getBookings(): Promise<TshirtBooking[]> {
  const res = await fetch(API, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return res.json();
}

/* ==========================================
   CREATE BOOKING
========================================== */

export async function createBooking(
  data: BookingFormValues
) {
  const res = await fetch(API, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error);
  }

  return result;
}

/* ==========================================
   UPDATE BOOKING
========================================== */

export async function updateBooking(
  id: string,
  data: Partial<BookingFormValues>
) {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error);
  }

  return result;
}

/* ==========================================
   DELETE BOOKING
========================================== */

export async function deleteBooking(
  id: string
) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error);
  }

  return result;
}

/* ==========================================
   DELIVER BOOKING
========================================== */

export async function deliverBooking(
  id: string
) {
  const res = await fetch(
    `${API}/${id}`,
    {
      method: "PATCH",
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error);
  }

  return result;
}
