import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SIZE_ORDER = [
  { value: "26", label: "Child (26)" },
  { value: "28", label: "Child (28)" },
  { value: "30", label: "Child (30)" },
  { value: "32", label: "Child (32)" },
  
  { value: "XS", label: "XS (34)" },
  { value: "S", label: "S (36)" },
  { value: "M", label: "M (38)" },
  { value: "L", label: "L (40)" },
  { value: "XL", label: "XL (42)" },
  { value: "XXL", label: "XXL (44)" },
  { value: "XXXL", label: "XXXL (46)" },
];

export async function GET() {
  const { data, error } = await supabase
    .from("tshirt_booking_items")
    .select("tshirt_size, quantity");

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  const summary = SIZE_ORDER.map((size) => ({
    size: size.label,
    value: size.value,
    quantity: 0,
  }));

  let totalTshirts = 0;

  data.forEach((item) => {
    const quantity = Number(item.quantity) || 0;

    const row = summary.find(
      (s) => s.value === item.tshirt_size
    );

    if (row) {
      row.quantity += quantity;
    } else if (/^\d{2}$/.test(item.tshirt_size)) {
      const existingCustom = summary.find(
        (s) => s.value === item.tshirt_size
      );

      if (existingCustom) {
        existingCustom.quantity += quantity;
      } else {
        summary.push({
          size: `Custom (${item.tshirt_size})`,
          value: item.tshirt_size,
          quantity,
        });
      }
    }

    totalTshirts += quantity;
  });

  const standardValues = new Set(
    SIZE_ORDER.map((size) => size.value)
  );
  
  const standardSummary = summary.filter((item) =>
    standardValues.has(item.value)
  );
  
  const customSummary = summary
    .filter((item) => !standardValues.has(item.value))
    .sort(
      (a, b) => Number(a.value) - Number(b.value)
    );
    
  const finalSummary = [
    ...standardSummary,
    ...customSummary,
  ];

  const { count } = await supabase
    .from("tshirt_bookings")
    .select("*", {
      count: "exact",
      head: true,
    });

  return NextResponse.json({
    summary: finalSummary,
    totalBookings: count ?? 0,
    totalTshirts,
  });
}