import { supabase } from "./supabase";
import { AartiPage } from "@/lib/types/aarti";

export async function getAllAarti(): Promise<AartiPage[]> {
  const { data, error } = await supabase
    .from("aarti_pages")
    .select("*")
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return (data ?? []) as AartiPage[];
}

export async function getAartiBySlug(
  slug: string
): Promise<AartiPage | null> {
  const { data, error } = await supabase
    .from("aarti_pages")
    .select("*")
    .eq("slug", slug);

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return data[0] as AartiPage;
}

export async function getAartiNavigation(
  currentSlug: string
) {
  const pages = await getAllAarti();

  const currentIndex = pages.findIndex(
    (page) => page.slug === currentSlug
  );

  return {
    previous:
      currentIndex > 0
        ? pages[currentIndex - 1]
        : null,

    next:
      currentIndex >= 0 &&
      currentIndex < pages.length - 1
        ? pages[currentIndex + 1]
        : null,
  };
}