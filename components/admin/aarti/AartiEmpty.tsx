import Link from "next/link";

export default function AartiEmpty() {
  return (
    <div className="rounded-2xl border border-dashed p-12 text-center">

      <h2 className="text-2xl font-bold">
        No Aarti Pages
      </h2>

      <p className="mt-3 text-gray-500">
        Create your first devotional page.
      </p>

      <Link
        href="/admin/aarti/new"
        className="
          mt-8
          inline-flex
          rounded-xl
          bg-orange-600
          px-6
          py-3
          font-semibold
          text-white
        "
      >
        + Add First Page
      </Link>

    </div>
  );
}