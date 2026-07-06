"use client";

import { useEffect, useState } from "react";
import { DashboardStats } from "@/types/dashboard";
import { getDashboardStats } from "@/lib/services/dashboard/dashboard";

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    try {
      setLoading(true);

      const data = await getDashboardStats();

      setStats(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    stats,
    loading,
    refresh: loadDashboard,
  };
}