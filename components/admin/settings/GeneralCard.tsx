"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useSettingsContext } from "./provider/SettingsProvider";

export default function GeneralCard() {
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
          🛕 General Information
        </h2>

        <p className="text-gray-500">
          Basic information about your Mandal.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Mandal Name"
          value={form.mandal_name ?? ""}
          onChange={(e) =>
            setField("mandal_name", e.target.value)
          }
        />

        <Input
          placeholder="Marathi Name"
          value={form.marathi_name ?? ""}
          onChange={(e) =>
            setField("marathi_name", e.target.value)
          }
        />

        <Input
          placeholder="Years"
          value={form.years ?? ""}
          onChange={(e) =>
            setField("years", e.target.value)
          }
        />
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          type="button"
          loading={saving}
          onClick={save}
        >
          Save General Information
        </Button>
      </div>
    </div>
  );
}