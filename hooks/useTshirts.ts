"use client";

import { useEffect, useState } from "react";

import { TshirtBooking } from "@/types/tshirt";

import {
  getBookings,
} from "@/lib/services/tshirts";

export function useTshirts() {
  const [bookings, setBookings] =
    useState<TshirtBooking[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function refresh() {
    try {
      setLoading(true);

      const data =
        await getBookings();

      setBookings(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return {
    bookings,
    loading,
    refresh,
  };
}
