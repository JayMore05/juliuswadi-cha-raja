"use client";

import { useEffect, useState } from "react";
import { getAartiPages } from "@/lib/services/aarti";
import { AartiPage } from "@/lib/types/aarti";

export function useAarti() {
  const [pages, setPages] = useState<AartiPage[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);

    try {
      const data = await getAartiPages();
      setPages(data);
    } catch (err) {
      console.error(err);
      setPages([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return {
    pages,
    loading,
    refresh,
  };
}