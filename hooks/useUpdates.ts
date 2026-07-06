"use client";

import { useEffect, useState } from "react";
import { getUpdates } from "@/lib/services/updates";
import { UpdateItem } from "@/types/update";

export function useUpdates() {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    console.log("🔄 Refresh Started");

    setLoading(true);

    try {
      const data = await getUpdates();

      console.log("📦 Updates received:", data);

      setUpdates(data);

      console.log("✅ Updates State Updated");
    } catch (error) {
      console.error("❌ Refresh Error:", error);
    } finally {
      setLoading(false);

      console.log("🏁 Refresh Finished");
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return {
    updates,
    loading,
    refresh,
  };
}