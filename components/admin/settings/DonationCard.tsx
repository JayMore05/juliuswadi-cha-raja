"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useSettingsContext } from "./provider/SettingsProvider";

export default function DonationCard() {
  const {
    form,
    saving,
    setField,
    save,
    uploadQR,
  } = useSettingsContext();

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    await uploadQR(file);

    e.target.value = "";
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          💰 Donation Settings
        </h2>

        <p className="text-gray-500">
          Donation details and QR Code.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="UPI ID"
          value={form.upi ?? ""}
          onChange={(e) =>
            setField("upi", e.target.value)
          }
        />

        <Input
          placeholder="Google Pay Number"
          value={form.gpay ?? ""}
          onChange={(e) =>
            setField("gpay", e.target.value)
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />

        {form.qr_image && (
          <Image
            src={form.qr_image}
            alt="QR Code"
            width={220}
            height={220}
            className="rounded-xl border"
          />
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          type="button"
          loading={saving}
          onClick={save}
        >
          Save Donation Settings
        </Button>
      </div>
    </div>
  );
}