import UpdateForm from "@/components/admin/updates/UpdateForm";
import UpdateGrid from "@/components/admin/updates/UpdateGrid";

export default function UpdatesPage() {
  return (
    <div className="space-y-8">
      <UpdateForm />
      <UpdateGrid />
    </div>
  );
}