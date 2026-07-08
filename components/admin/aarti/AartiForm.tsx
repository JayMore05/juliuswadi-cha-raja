"use client";

import { useEffect, useState } from "react";

import { AartiPage } from "@/lib/types/aarti";

interface Props {
  initialData?: Partial<AartiPage>;
  onSubmit: (
    values: Omit<
      AartiPage,
      "id" | "created_at" | "updated_at"
    >
  ) => Promise<void>;
  saving?: boolean;
}

export default function AartiForm({
  initialData,
  onSubmit,
  saving = false,
}: Props) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const [category, setCategory] =
    useState("Aarti");

  const [language, setLanguage] =
    useState("Marathi");

  const [content, setContent] =
    useState("");

  const [displayOrder, setDisplayOrder] =
    useState(1);

  const [isActive, setIsActive] =
    useState(true);

  useEffect(() => {
    if (!initialData) return;

    setTitle(initialData.title || "");
    setSlug(initialData.slug || "");
    setCategory(
      initialData.category || "Aarti"
    );
    setLanguage(
      initialData.language || "Marathi"
    );
    setContent(initialData.content || "");
    setDisplayOrder(
      initialData.display_order || 1
    );
    setIsActive(
      initialData.is_active ?? true
    );
  }, [initialData]);

  useEffect(() => {
    if (initialData?.slug) return;

    setSlug(
      title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "")
    );
  }, [title, initialData]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await onSubmit({
      title,
      slug,
      category,
      language,
      content,
      display_order: displayOrder,
      is_active: isActive,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border bg-white p-8 shadow"
    >
      {/* Title */}

      <div>

        <label className="mb-2 block font-medium">
          Title
        </label>

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required
          className="w-full rounded-xl border p-3"
        />

      </div>

      {/* Slug */}

      <div>

        <label className="mb-2 block font-medium">
          Slug
        </label>

        <input
          value={slug}
          onChange={(e) =>
            setSlug(e.target.value)
          }
          required
          className="w-full rounded-xl border p-3"
        />

      </div>

      {/* Category + Language */}

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full rounded-xl border p-3"
          >
            <option>Aarti</option>
            <option>Stotra</option>
            <option>Chalisa</option>
            <option>Mantra</option>
            <option>Bhajan</option>
            <option>Prayer</option>
          </select>

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Language
          </label>

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
            className="w-full rounded-xl border p-3"
          >
            <option>Marathi</option>
            <option>Hindi</option>
            <option>English</option>
            <option>Sanskrit</option>
          </select>

        </div>

      </div>

      {/* Order */}

      <div>

        <label className="mb-2 block font-medium">
          Display Order
        </label>

        <input
          type="number"
          value={displayOrder}
          onChange={(e) =>
            setDisplayOrder(
              Number(e.target.value)
            )
          }
          className="w-full rounded-xl border p-3"
        />

      </div>

      {/* Content */}

      <div>

        <label className="mb-2 block font-medium">
          Content
        </label>

        <textarea
          rows={18}
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

      </div>

      {/* Active */}

      <label className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) =>
            setIsActive(
              e.target.checked
            )
          }
        />

        Active Page

      </label>

      {/* Save */}

      <button
        disabled={saving}
        className="
          rounded-xl
          bg-orange-600
          px-8
          py-3
          font-semibold
          text-white
          transition
          hover:bg-orange-700
          disabled:opacity-50
        "
      >
        {saving ? "Saving..." : "Save Page"}
      </button>

    </form>
  );
}