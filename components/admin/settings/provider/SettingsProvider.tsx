"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Settings } from "@/lib/services/settings";
import { useSettings } from "@/hooks/useSettings";

interface SettingsContextType {
  form: Partial<Settings>;
  loading: boolean;
  saving: boolean;

  setField: (
    field: keyof Settings,
    value: string
  ) => void;

  save: () => Promise<void>;

  uploadHero: (file: File) => Promise<void>;
  uploadLogo: (file: File) => Promise<void>;
  uploadQR: (file: File) => Promise<void>;
}

const SettingsContext =
  createContext<SettingsContextType | null>(null);

export function SettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const {
    settings,
    loading,
    saving,
    save: saveSettings,
    upload,
  } = useSettings();

  const [form, setForm] =
    useState<Partial<Settings>>({});

  useEffect(() => {
    if (settings) {
      setForm(settings);
    }
  }, [settings]);

  function setField(
    field: keyof Settings,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function save() {
    await saveSettings(form);
  }

  async function uploadHero(file: File) {
    const url = await upload(file, "hero_image");

    if (url) {
      setField("hero_image", url);
    }
  }

  async function uploadLogo(file: File) {
    const url = await upload(file, "logo");

    if (url) {
      setField("logo", url);
    }
  }

  async function uploadQR(file: File) {
    const url = await upload(file, "qr_image");

    if (url) {
      setField("qr_image", url);
    }
  }

  return (
    <SettingsContext.Provider
      value={{
        form,
        loading,
        saving,
        setField,
        save,
        uploadHero,
        uploadLogo,
        uploadQR,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettingsContext must be used inside SettingsProvider"
    );
  }

  return context;
}