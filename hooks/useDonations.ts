"use client";

import { useEffect, useState } from "react";

import { DonationLedger } from "@/lib/types/donation";

import { getDonations } from "@/lib/services/donations";

export function useDonations() {
  const [donations, setDonations] = useState<
    DonationLedger[]
  >([]);

  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      setLoading(true);

      const data = await getDonations();

      setDonations(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return {
    donations,
    loading,
    refresh,
  };
}