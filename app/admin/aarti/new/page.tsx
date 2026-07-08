"use client";

import { useRouter } from "next/navigation";

import { addAartiPage } from "@/lib/services/aarti";
import AartiForm from "@/components/admin/aarti/AartiForm";

export default function NewAartiPage() {
  const router = useRouter();

  async function handleSubmit(values: Parameters<typeof addAartiPage>[0]) {
    try {
      await addAartiPage(values);

      alert("Aarti Page created successfully.");

      router.push("/admin/aarti");
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Add New Aarti Page
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new devotional page.
        </p>

      </div>

      <AartiForm onSubmit={handleSubmit} />

    </div>
  );
}