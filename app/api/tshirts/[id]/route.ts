import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = getSupabase();

    const { id } = await params;

    const body = await request.json();

    const {
      donor_name,
      phone,
      donation_receipt_no,
      volunteer_name,
      remarks,
      payment_mode,
      items,
    } = body;

    if (!donor_name?.trim()) {
      return NextResponse.json(
        { error: "Donor name is required." },
        { status: 400 }
      );
    }

    if (!phone?.trim()) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          error: "At least one T-shirt is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Check booking exists
    const { data: booking, error: bookingError } = await supabase
      .from("tshirt_bookings")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (bookingError) {
      return NextResponse.json(
        {
          error: bookingError.message,
        },
        {
          status: 500,
        }
      );
    }

    if (!booking) {
      return NextResponse.json(
        {
          error: "Booking not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Prevent editing after delivery
    if (booking.status === "Delivered") {
      return NextResponse.json(
        {
          error: "Delivered bookings cannot be edited.",
        },
        {
          status: 400,
        }
      );
    }

    // Check duplicate phone
    const { data: duplicate } = await supabase
      .from("tshirt_bookings")
      .select("id")
      .eq("phone", phone)
      .neq("id", id)
      .maybeSingle();

    if (duplicate) {
      return NextResponse.json(
        {
          error: "Phone number already exists.",
        },
        {
          status: 400,
        }
      );
    }

    // Update booking details
    const { error: bookingUpdateError } = await supabase
      .from("tshirt_bookings")
      .update({
        donor_name,
        phone,
        donation_receipt_no,
        volunteer_name,
        remarks,
      })
      .eq("id", id);

    if (bookingUpdateError) {
      return NextResponse.json(
        {
          error: bookingUpdateError.message,
        },
        {
          status: 500,
        }
      );
    }

    // Update payment mode
    const { error: paymentError } = await supabase
      .from("booking_payments")
      .update({
        payment_mode,
      })
      .eq("booking_id", id);

    if (paymentError) {
      return NextResponse.json(
        {
          error: paymentError.message,
        },
        {
          status: 500,
        }
      );
    }

    // Existing booking items
    const { data: existingItems, error: itemsError } = await supabase
      .from("tshirt_booking_items")
      .select("*")
      .eq("booking_id", id);

    if (itemsError) {
      return NextResponse.json(
        {
          error: itemsError.message,
        },
        {
          status: 500,
        }
      );
    }

    const existingIds = (existingItems ?? []).map((i) => i.id);
    const incomingIds = items
      .filter((i: any) => existingIds.includes(i.id))
      .map((i: any) => i.id);

    // Delete removed rows
    const deleteIds = existingIds.filter(
      (id) => !incomingIds.includes(id)
    );

    if (deleteIds.length > 0) {
      const { error } = await supabase
        .from("tshirt_booking_items")
        .delete()
        .in("id", deleteIds);

      if (error) {
        return NextResponse.json(
          {
            error: error.message,
          },
          {
            status: 500,
          }
        );
      }
    }

    // Update existing rows
    for (const item of items.filter((i: any) =>
      existingIds.includes(i.id)
    )) {
      const { error } = await supabase
        .from("tshirt_booking_items")
        .update({
          tshirt_size: item.tshirt_size,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.quantity * item.price,
        })
        .eq("id", item.id);

      if (error) {
        return NextResponse.json(
          {
            error: error.message,
          },
          {
            status: 500,
          }
        );
      }
    }

    // Insert new rows
    const newItems = items.filter(
      (i: any) => !i.id || !existingIds.includes(i.id)
    );

    if (newItems.length > 0) {
      const { error } = await supabase
        .from("tshirt_booking_items")
        .insert(
          newItems.map((item: any) => ({
            booking_id: id,
            tshirt_size: item.tshirt_size,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.quantity * item.price,
          }))
        );

      if (error) {
        return NextResponse.json(
          {
            error: error.message,
          },
          {
            status: 500,
          }
        );
      }
    }

    // Update totals
    const totalQuantity = items.reduce(
      (sum: number, item: any) =>
        sum + item.quantity,
      0
    );

    const totalAmount = items.reduce(
      (sum: number, item: any) =>
        sum + item.quantity * item.price,
      0
    );

    const { error: totalsError } = await supabase
      .from("tshirt_bookings")
      .update({
        total_quantity: totalQuantity,
        total_amount: totalAmount,
      })
      .eq("id", id);

    if (totalsError) {
      return NextResponse.json(
        {
          error: totalsError.message,
        },
        {
          status: 500,
        }
      );
    }

    // Activity Log
    const { error: logError } = await supabase
      .from("booking_activity_logs")
      .insert({
        booking_id: id,
        action: "Edited",
        details: "Booking details updated",
      });

    if (logError) {
      return NextResponse.json(
        {
          error: logError.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Unknown Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = getSupabase();

    const { id } = await params;

    const { action } = await request.json();

    if (action !== "deliver") {
      return NextResponse.json(
        {
          error: "Invalid action.",
        },
        {
          status: 400,
        }
      );
    }

    // Check booking

    const { data: booking } = await supabase
      .from("tshirt_bookings")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!booking) {
      return NextResponse.json(
        {
          error: "Booking not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (booking.status === "Delivered") {
      return NextResponse.json(
        {
          error: "Already delivered.",
        },
        {
          status: 400,
        }
      );
    }

    // Update status

    const { error } = await supabase
      .from("tshirt_bookings")
      .update({
        status: "Delivered",
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    // Activity Log
    const { error: logError } = await supabase
      .from("booking_activity_logs")
      .insert({
        booking_id: id,
        action: "Delivered",
        details: "T-Shirt Delivered",
      });

    if (logError) {
      return NextResponse.json(
        {
          error: logError.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Unknown Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = getSupabase();

    const { id } = await params;

    const { data: booking, error } = await supabase
      .from("tshirt_bookings")
      .select("id,status")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found." },
        { status: 404 }
      );
    }

    if (booking.status === "Delivered") {
      return NextResponse.json(
        {
          error: "Delivered bookings cannot be deleted.",
        },
        {
          status: 403,
        }
      );
    }

    await supabase
      .from("booking_activity_logs")
      .delete()
      .eq("booking_id", id);

    await supabase
      .from("booking_payments")
      .delete()
      .eq("booking_id", id);

    await supabase
      .from("tshirt_booking_items")
      .delete()
      .eq("booking_id", id);

    const { error: deleteError } = await supabase
      .from("tshirt_bookings")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return NextResponse.json(
        {
          error: deleteError.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Unknown Error",
      },
      {
        status: 500,
      }
    );
  }
}