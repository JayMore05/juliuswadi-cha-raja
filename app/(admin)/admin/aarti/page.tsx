import AartiGrid from "@/components/admin/aarti/AartiGrid";

export default function AdminAartiPage() {
  return (
    <div className="space-y-8">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Aarti Pages
          </h1>

          <p className="mt-2 text-gray-500">
            Manage Aarti, Stotra, Bhajans and devotional pages.
          </p>

        </div>

      </div>

      <AartiGrid />

    </div>
  );
}