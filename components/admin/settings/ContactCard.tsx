"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { useSettingsContext } from "./provider/SettingsProvider";

export default function ContactCard() {
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
          ☎ Contact Information
        </h2>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Phone Number"
          value={form.phone ?? ""}
          onChange={(e) =>
            setField("phone", e.target.value)
          }
        />

        <Input
          type="email"
          placeholder="Email Address"
          value={form.email ?? ""}
          onChange={(e) =>
            setField("email", e.target.value)
          }
        />

        <Textarea
          rows={4}
          placeholder="Address"
          value={form.address ?? ""}
          onChange={(e) =>
            setField("address", e.target.value)
          }
        />
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          type="button"
          loading={saving}
          onClick={save}
        >
          Save Contact Information
        </Button>
      </div>
    </div>
  );
}