"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { useSettingsContext } from "./provider/SettingsProvider";

export default function BrandingCard() {
  const {
    form,
    saving,
    save,
    uploadLogo,
  } = useSettingsContext();

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    await uploadLogo(file);

    e.target.value = "";
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          🏷 Branding
        </h2>

        <p className="text-gray-500">
          Upload the Mandal logo.
        </p>
      </div>

      <div className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />

        {form.logo && (
          <div className="flex justify-center rounded-xl border p-4">
            <Image
              src={form.logo}
              alt="Logo"
              width={180}
              height={180}
              className="rounded-xl object-contain"
            />
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          type="button"
          loading={saving}
          onClick={save}
        >
          Save Branding
        </Button>
      </div>
    </div>
  );
}