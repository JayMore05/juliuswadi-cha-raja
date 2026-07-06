"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { useSettingsContext } from "./provider/SettingsProvider";

export default function HeroCard() {
  const {
    form,
    saving,
    setField,
    save,
    uploadHero,
  } = useSettingsContext();

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    await uploadHero(file);

    e.target.value = "";
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          🎉 Hero Section
        </h2>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Hero Title"
          value={form.hero_title ?? ""}
          onChange={(e) =>
            setField("hero_title", e.target.value)
          }
        />

        <Textarea
          rows={4}
          placeholder="Hero Subtitle"
          value={form.hero_subtitle ?? ""}
          onChange={(e) =>
            setField(
              "hero_subtitle",
              e.target.value
            )
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />

        {form.hero_image && (
          <Image
            src={form.hero_image}
            alt="Hero"
            width={1200}
            height={500}
            className="rounded-xl"
          />
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          type="button"
          loading={saving}
          onClick={save}
        >
          Save Hero Section
        </Button>
      </div>
    </div>
  );
}