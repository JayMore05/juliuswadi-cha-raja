"use client";

import { useEffect, useState } from "react";
import { getUpdates } from "@/lib/services/updates";
import { UpdateItem } from "@/types/update";

export function useUpdates() {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    const data = await getUpdates();

    setUpdates(data);

    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return {
    updates,
    loading,
    refresh: load,
  };
}