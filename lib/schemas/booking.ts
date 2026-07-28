import { z } from "zod";

export const tshirtSizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "3XL",
  
] as const;

export const paymentModes = [
  "Cash",
  "UPI",
] as const;

export const volunteers = [
  "Nikhil Patil",
  "Sachin Gupta",
  "Pratik Tawre",
  "Jay More (Admin)",
] as const;

export const bookingStatuses = [
  "Booked",
  "Ready for Collection",
  "Delivered",
  "Cancelled",
] as const;

/* ===========================================================
   ITEM
=========================================================== */

export const bookingItemSchema = z.object({
  tshirt_size: z.enum(tshirtSizes),

  quantity: z
    .number()
    .int()
    .min(1),

  price: z
    .number()
    .min(1),
});

/* ===========================================================
   BOOKING
=========================================================== */

export const bookingSchema = z.object({
  donor_name: z
    .string()
    .trim()
    .min(2)
    .max(100),

  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .pipe(
      z
        .string()
        .length(10, "Enter valid 10-digit mobile number")
        .regex(/^[6-9]\d{9}$/, "Enter valid mobile number")
    ),

  donation_receipt_no: z
    .string()
    .trim()
    .optional(),

  remarks: z
    .string()
    .trim()
    .max(500)
    .optional(),

  payment_mode: z.enum(paymentModes),

  volunteer_name: z.enum(volunteers),

  total_quantity: z
    .number()
    .int()
    .min(1),

  total_amount: z
    .number()
    .min(1),

  items: z
    .array(bookingItemSchema)
    .min(
      1,
      "Add at least one T-Shirt"
    ),
});

/* ===========================================================
   TYPES
=========================================================== */

export type BookingFormValues =
  z.infer<typeof bookingSchema>;

export type BookingItemValues =
  z.infer<typeof bookingItemSchema>;

export const bookingSearchSchema =
  z.object({
    query: z.string().optional(),

    status: z.string().optional(),

    year: z.number().optional(),
  });

export type BookingSearchValues =
  z.infer<typeof bookingSearchSchema>;