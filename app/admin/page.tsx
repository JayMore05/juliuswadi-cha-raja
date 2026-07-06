import StatCard from "@/components/admin/dashboard/StatCard";
import QuickAction from "@/components/admin/dashboard/QuickAction";

export default function AdminPage() {
  return (
    <div className="space-y-10">

      <div>
        <h1 className="text-4xl font-bold">
          Welcome 👋
        </h1>

        <p className="mt-2 text-gray-500">
          Juliuswadi Cha Raja CMS Dashboard
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Gallery Photos" value="0" />
        <StatCard title="Live Updates" value="0" color="bg-blue-500" />
        <StatCard title="Committee Members" value="0" color="bg-green-500" />
        <StatCard title="Donations" value="ON" color="bg-purple-500" />
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-md border">
        <h2 className="text-2xl font-bold">
          Quick Actions
        </h2>

        <div className="mt-6 flex flex-wrap gap-4">
          <QuickAction
            title="📸 Upload Photos"
            href="/admin/gallery"
          />

          <QuickAction
            title="📰 Add Update"
            href="/admin/updates"
          />

          <QuickAction
            title="🪔 Edit Aarti"
            href="/admin/aarti"
          />

          <QuickAction
            title="⚙ Website Settings"
            href="/admin/settings"
          />
        </div>
      </div>

    </div>
  );
}