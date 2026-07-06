"use client";

import UpdateForm from "@/components/admin/updates/UpdateForm";
import UpdateGrid from "@/components/admin/updates/UpdateGrid";
import { useUpdates } from "@/hooks/useUpdates";

export default function UpdatesPage() {
  const {
    updates,
    loading,
    refresh,
  } = useUpdates();

  return (
    <div className="space-y-8">
      <UpdateForm
        onSuccess={refresh}
      />

      <div id="updates-grid">
        <UpdateGrid
          updates={updates}
          loading={loading}
          refresh={refresh}
        />
      </div>
    </div>
  );
}