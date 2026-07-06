"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useSettingsContext } from "./provider/SettingsProvider";

export default function SocialCard() {
  const {
    form,
    saving,
    setField,
    save,
  } = useSettingsContext();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          🌐 Social Links
        </h2>

        <p className="text-gray-500">
          Manage all social media links.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Instagram URL"
          value={form.instagram ?? ""}
          onChange={(e) =>
            setField("instagram", e.target.value)
          }
        />

        <Input
          placeholder="YouTube URL"
          value={form.youtube ?? ""}
          onChange={(e) =>
            setField("youtube", e.target.value)
          }
        />

        <Input
          placeholder="Google Maps URL"
          value={form.maps ?? ""}
          onChange={(e) =>
            setField("maps", e.target.value)
          }
        />
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          type="button"
          loading={saving}
          onClick={save}
        >
          Save Social Links
        </Button>
      </div>
    </div>
  );
}