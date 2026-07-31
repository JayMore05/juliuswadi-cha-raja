import SettingsForm from "@/components/admin/tshirts/SettingsForm";

export const dynamic = "force-dynamic";

export default function TshirtSettingsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-3xl font-bold text-orange-600">
          ⚙️ T-Shirt Booking Settings
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Control whether new T-shirt bookings can be accepted.
        </p>
      </div>

      <SettingsForm />
    </div>
  );
}
