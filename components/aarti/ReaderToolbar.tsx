"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Printer,
  Share2,
  Minus,
  Plus,
} from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export default function ReaderToolbar({
  children,
}: Props) {
  const [fontSize, setFontSize] = useState(26);

  function increase() {
    setFontSize((prev) => Math.min(prev + 2, 42));
  }

  function decrease() {
    setFontSize((prev) => Math.max(prev - 2, 18));
  }

  function printPage() {
    window.print();
  }

  async function sharePage() {
    if (navigator.share) {
      await navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(
        window.location.href
      );
      alert("Link copied to clipboard.");
    }
  }

  return (
    <>
 <section
  className="
    border-y
    border-orange-200
    bg-white/95
    backdrop-blur
    print:hidden
  "
>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 px-5 py-3">

          <Link
            href="/aarti"
            className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 hover:bg-orange-200"
          >
            <Home size={18} />
            All Aarti
          </Link>

          <button
            onClick={decrease}
            className="rounded-full bg-orange-100 p-3 hover:bg-orange-200"
          >
            <Minus size={18} />
          </button>

          <button
            onClick={increase}
            className="rounded-full bg-orange-100 p-3 hover:bg-orange-200"
          >
            <Plus size={18} />
          </button>

          <button
            onClick={printPage}
            className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 hover:bg-orange-200"
          >
            <Printer size={18} />
            Print
          </button>

          <button
            onClick={sharePage}
            className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 hover:bg-orange-200"
          >
            <Share2 size={18} />
            Share
          </button>

        </div>

      </section>

      <div
        style={{
          fontSize: `${fontSize}px`,
        }}
      >
        {children}
      </div>
    </>
  );
}