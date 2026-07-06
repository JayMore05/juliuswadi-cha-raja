"use client";

import { useEffect, useState } from "react";
import {
  getSettings,
  saveSettings,
  uploadSettingsImage,
  Settings,
} from "@/lib/services/settings";

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function refresh() {
    setLoading(true);

    try {
      const data = await getSettings();
      setSettings(data);
    } finally {
      setLoading(false);
    }
  }

  async function save(values: Partial<Settings>) {
    setSaving(true);

    try {
      await saveSettings(values);
      await refresh();
    } finally {
      setSaving(false);
    }
  }

  async function upload(
    file: File,
    field: "hero_image" | "qr_image" | "logo"
  ) {
    setSaving(true);

    try {
      const url = await uploadSettingsImage(
        file,
        field
      );

      await refresh();

      return url;
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return {
    settings,
    loading,
    saving,
    refresh,
    save,
    upload,
  };
}