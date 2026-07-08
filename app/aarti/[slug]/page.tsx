import { notFound } from "next/navigation";

import ReaderLayout from "@/components/aarti/ReaderLayout";

import {
  getAllAarti,
  getAartiBySlug,
} from "@/lib/server/aarti";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AartiReaderPage({
  params,
}: Props) {
  const { slug } = await params;

  const page = await getAartiBySlug(slug);

  if (!page) {
    notFound();
  }

  const pages = await getAllAarti();

  const currentIndex = pages.findIndex(
    (item) => item.slug === slug
  );

  const previous =
    currentIndex > 0
      ? {
          id: pages[currentIndex - 1].slug,
          title: pages[currentIndex - 1].title,
        }
      : undefined;

  const next =
    currentIndex >= 0 &&
    currentIndex < pages.length - 1
      ? {
          id: pages[currentIndex + 1].slug,
          title: pages[currentIndex + 1].title,
        }
      : undefined;

  return (
    <ReaderLayout
      title={page.title}
      category={page.category}
      language={page.language}
      content={page.content}
      previous={previous}
      next={next}
    />
  );
}