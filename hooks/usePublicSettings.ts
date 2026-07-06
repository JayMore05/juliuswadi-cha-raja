"use client";

import { useEffect, useState } from "react";
import { Settings } from "@/lib/services/settings";

export function usePublicSettings() {
  const [settings, setSettings] =
    useState<Settings | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/settings", {
          cache: "no-store",
        });

        const data = await res.json();

        setSettings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    settings,
    loading,
  };
}