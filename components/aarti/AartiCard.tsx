import Link from "next/link";
import { AartiPage } from "@/lib/types/aarti";

interface Props {
  page: AartiPage;
}

export default function AartiCard({
  page,
}: Props) {
  return (
    <Link
      href={`/aarti/${page.id}`}
      className="
        block
        rounded-2xl
        border
        border-orange-200
        bg-white
        p-6
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-2xl">
          🪔
        </div>

        <div className="flex-1">

          <h2 className="text-xl font-bold text-[#5E120F]">
            {page.title}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {page.language} • {page.category}
          </p>

        </div>

      </div>
    </Link>
  );
}