import { uploadImage } from "@/lib/services/upload";
import { BUCKETS } from "@/lib/constants/buckets";

export interface Settings {
  id: string;
  created_at: string;

  // General
  mandal_name: string;
  marathi_name: string;
  years: number;

  // Hero
  hero_title: string;
  hero_marathi_title: string;
  hero_subtitle: string;
  hero_image: string | null;

  // Contact
  phone: string;
  email: string;
  address: string;

  // Donation
  upi: string;
  gpay: string;
  qr_image: string | null;

  // Social
  instagram: string;
  youtube: string;
  twitter: string;
  maps: string;

  // Branding
  logo: string | null;
}

/**
 * GET SETTINGS
 */
export async function getSettings(): Promise<Settings | null> {
  const res = await fetch("/api/settings", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load settings.");
  }

  return await res.json();
}

/**
 * SAVE SETTINGS
 */
export async function saveSettings(
  values: Partial<Settings>
) {
  const res = await fetch("/api/settings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.error || "Failed to save settings."
    );
  }

  return json;
}

/**
 * UPLOAD SETTINGS IMAGE
 */
export async function uploadSettingsImage(
  file: File,
  field: "hero_image" | "qr_image" | "logo"
) {
  const imageUrl = await uploadImage(
    file,
    BUCKETS.SETTINGS
  );

  await saveSettings({
    [field]: imageUrl,
  });

  return imageUrl;
}