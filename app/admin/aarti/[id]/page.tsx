"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import AartiForm from "@/components/admin/aarti/AartiForm";

import {
  getAartiPage,
  updateAartiPage,
} from "@/lib/services/aarti";

import { AartiPage } from "@/lib/types/aarti";

export default function EditAartiPage() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const [page, setPage] =
    useState<AartiPage | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAartiPage(id);

        setPage(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  async function handleSubmit(
    values: Partial<AartiPage>
  ) {
    await updateAartiPage(id, values);

    alert("Page updated successfully.");

    router.push("/admin/aarti");
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!page) {
    return <p>Page not found.</p>;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Aarti Page
        </h1>

        <p className="mt-2 text-gray-500">
          Update devotional content.
        </p>

      </div>

      <AartiForm
        initialData={page}
        onSubmit={handleSubmit}
      />

    </div>
  );
}