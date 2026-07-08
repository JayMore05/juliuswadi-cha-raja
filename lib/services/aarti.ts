import { AartiPage } from "@/lib/types/aarti";

/**
 * GET ALL
 */
export async function getAartiPages(): Promise<AartiPage[]> {
  const res = await fetch("/api/aarti", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load Aarti pages.");
  }

  return await res.json();
}

/**
 * GET BY ID
 */
export async function getAartiPage(
  id: string
): Promise<AartiPage | null> {
  const res = await fetch(`/api/aarti?id=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return await res.json();
}

/**
 * GET BY SLUG
 */
export async function getAartiBySlug(
  slug: string
): Promise<AartiPage | null> {
  const res = await fetch(
    `/api/aarti?slug=${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return await res.json();
}

/**
 * ADD
 */
export async function addAartiPage(
  values: Omit<
    AartiPage,
    "id" | "created_at" | "updated_at"
  >
) {
  const res = await fetch("/api/aarti", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.error || "Failed to add page."
    );
  }

  return json;
}

/**
 * UPDATE
 */
export async function updateAartiPage(
  id: string,
  values: Partial<AartiPage>
) {
  const res = await fetch("/api/aarti", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      ...values,
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.error || "Failed to update page."
    );
  }

  return json;
}

/**
 * DELETE
 */
export async function deleteAartiPage(
  id: string
) {
  const res = await fetch("/api/aarti", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      json.error || "Failed to delete page."
    );
  }

  return json;
}