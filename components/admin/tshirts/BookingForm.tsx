"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  useForm,
  useFieldArray,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import {
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";

import {
  bookingSchema,
  BookingFormValues,
} from "@/lib/schemas/booking";

const PRICE = 330;

export default function BookingForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      donor_name: "",
      phone: "",
      donation_receipt_no: "",
      remarks: "",
      payment_mode: "Cash",
      volunteer_name: "Jay More (Admin)",
      total_quantity: 1,
      total_amount: PRICE,
      items: [
        {
          tshirt_size: "M",
          quantity: 1,
          price: PRICE,
        },
      ],
    },
  });

  const {
    control,
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "items",
  });

  const items = watch("items");

  const totalQuantity = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }, [items]);

  const totalAmount = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  }, [items]);

  useMemo(() => {
    setValue("total_quantity", totalQuantity);
    setValue("total_amount", totalAmount);
  }, [totalAmount, totalQuantity, setValue]);

  async function onSubmit(data: BookingFormValues) {
    try {
      setLoading(true);

      const res = await fetch("/api/tshirts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("Booking API Response:", result);

      if (!res.ok) {
        toast.error(
          result.error ?? "Booking Failed"
        );
        return;
      }

      toast.success("Booking Created Successfully");
      
      console.log(result);
      router.push(
        `/admin/tshirts/receipt/${result.booking.booking_id}`
      );
      router.refresh();
      
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      {/* ==========================================
          CUSTOMER INFORMATION
      =========================================== */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-orange-600">
          Customer Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Full Name
              <span className="text-red-500"> *</span>
            </label>

            <input
              {...register("donor_name")}
              placeholder="Enter Full Name"
              className="w-full rounded-xl border p-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
            />

            {errors.donor_name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.donor_name.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Mobile Number
              <span className="text-red-500"> *</span>
            </label>

            <input
              {...register("phone")}
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="9876543210"
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
              }}
              className="w-full rounded-xl border p-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Donation Receipt */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Donation Receipt No.
            </label>

            <input
              {...register("donation_receipt_no")}
              placeholder="Optional"
              className="w-full rounded-xl border p-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
            />
          </div>

          {/* Payment */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Payment Mode
            </label>

            <select
              {...register("payment_mode")}
              className="w-full rounded-xl border p-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
            >
              <option value="Cash">💵 Cash</option>
              <option value="UPI">📱 UPI</option>
            </select>
          </div>

          {/* Booking Taken By Radio Group */}
          <div className="md:col-span-2">
            <label className="mb-3 block text-sm font-semibold">
              Booking Taken By
              <span className="text-red-500"> *</span>
            </label>

            <div className="grid gap-3 md:grid-cols-2">
              <label className="flex items-center gap-2 rounded-lg border p-3 cursor-pointer">
                <input
                  type="radio"
                  value="Nikhil Patil"
                  {...register("volunteer_name")}
                />
                Nikhil Patil
              </label>

              <label className="flex items-center gap-2 rounded-lg border p-3 cursor-pointer">
                <input
                  type="radio"
                  value="Sachin Gupta"
                  {...register("volunteer_name")}
                />
                Sachin Gupta
              </label>

              <label className="flex items-center gap-2 rounded-lg border p-3 cursor-pointer">
                <input
                  type="radio"
                  value="Pratik Tawre"
                  {...register("volunteer_name")}
                />
                Pratik Tawre
              </label>

              <label className="flex items-center gap-2 rounded-lg border p-3 cursor-pointer">
                <input
                  type="radio"
                  value="Jay More (Admin)"
                  {...register("volunteer_name")}
                />
                Jay More (Admin)
              </label>
            </div>
          </div>
        </div>

        {/* Remarks */}
        <div className="mt-5">
          <label className="mb-2 block text-sm font-semibold">
            Remarks
          </label>

          <textarea
            {...register("remarks")}
            rows={4}
            placeholder="Optional Remarks"
            className="w-full rounded-xl border p-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
          />
        </div>
      </div>

      {/* ==========================================
          T-SHIRTS
      =========================================== */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-orange-600">
              T-Shirts
            </h2>

            <p className="text-sm text-gray-500">
              ₹330 per T-Shirt
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              append({
                tshirt_size: "M",
                quantity: 1,
                price: PRICE,
              })
            }
            className="flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2 text-white transition hover:bg-orange-700"
          >
            <Plus className="h-4 w-4" />
            Add More
          </button>
        </div>

        <div className="space-y-5">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-xl border bg-orange-50 p-5"
            >
              <div className="grid gap-4 md:grid-cols-4">
                {/* SIZE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Size
                  </label>

                  <select
                    {...register(`items.${index}.tshirt_size`)}
                    className="w-full rounded-xl border p-3"
                  >
                    <option value="XS">XS (34)</option>
                    <option value="S">S (36)</option>
                    <option value="M">M (38)</option>
                    <option value="L">L (40)</option>
                    <option value="XL">XL (42)</option>
                    <option value="XXL">XXL (44)</option>
                    <option value="3XL">XXXL (46)</option>
                  </select>
                </div>

                {/* QUANTITY */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Quantity
                  </label>

                  <input
                    type="number"
                    min={1}
                    {...register(`items.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    className="w-full rounded-xl border p-3"
                  />
                </div>

                {/* PRICE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Price
                  </label>

                  <input
                    readOnly
                    value={PRICE}
                    className="w-full rounded-xl border bg-gray-100 p-3"
                  />
                </div>

                {/* REMOVE */}
                <div className="flex items-end">
                  <button
                    type="button"
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <div className="rounded-lg bg-white px-4 py-2 text-lg font-bold text-green-600">
                  ₹{items[index].quantity * PRICE}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          BOOKING SUMMARY
      =========================================== */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-orange-600">
          Booking Summary
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-orange-50 p-4">
            <span className="font-medium">Total T-Shirts</span>

            <span className="text-xl font-bold">
              {totalQuantity}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">
            <span className="font-medium">Price Per T-Shirt</span>

            <span className="text-xl font-bold text-green-700">
              ₹{PRICE}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-blue-50 p-5">
            <span className="text-lg font-bold">Total Amount</span>

            <span className="text-3xl font-extrabold text-green-600">
              ₹{totalAmount}
            </span>
          </div>
        </div>
      </div>

      {/* ==========================================
          IMPORTANT NOTICE
      =========================================== */}

      <div className="rounded-2xl border-l-4 border-orange-500 bg-orange-50 p-5">
        <h3 className="mb-2 text-lg font-bold text-orange-700">
          Collection Instructions
        </h3>

        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
          <li>
            Please verify the customer's mobile number before saving the booking.
          </li>
          <li>
            Carry the printed booking receipt or QR code during distribution.
          </li>
          <li>Donation Receipt Number is optional.</li>
          <li>Booking ID will be generated automatically.</li>
          <li>
            The volunteer can later scan the QR code to deliver the T-Shirt.
          </li>
        </ul>
      </div>

      {/* ==========================================
          ACTION BUTTONS
      =========================================== */}

      <div className="sticky bottom-0 rounded-2xl border bg-white p-5 shadow-xl">
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            className="rounded-xl border px-8 py-3 font-semibold transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-3 rounded-xl bg-orange-600 px-8 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating Booking...
              </>
            ) : (
              <>
                <Plus className="h-5 w-5" />
                Create Booking
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
