"use client";

import ReaderHero from "./ReaderHero";
import ReaderToolbar from "./ReaderToolbar";
import ReaderContent from "./ReaderContent";
import ReaderNavigation from "./ReaderNavigation";

interface NavigationItem {
  id: string;
  title: string;
}

interface Props {
  title: string;
  category: string;
  language: string;
  content: string;

  previous?: NavigationItem;
  next?: NavigationItem;
}

export default function ReaderLayout({
  title,
  category,
  language,
  content,
  previous,
  next,
}: Props) {
  return (
    <main className="min-h-screen bg-[#FFF9F3]">

      {/* Hero */}

      <ReaderHero
        title={title}
        category={category}
        language={language}
      />

      {/* Toolbar + Reader */}

     <ReaderToolbar>
  <ReaderContent content={content} />
</ReaderToolbar>      {/* Previous / Next */}

      <ReaderNavigation
        previous={previous}
        next={next}
      />

    </main>
  );
}