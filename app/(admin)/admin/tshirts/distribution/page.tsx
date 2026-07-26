import DistributionClient from "@/components/admin/tshirts/DistributionClient";

export default function DistributionPage() {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-2 text-3xl font-bold">
        T-Shirt Distribution
      </h1>

      <p className="mb-8 text-gray-500">
        Search using Booking ID, Phone Number or scan the QR Code.
      </p>

      <DistributionClient />
    </div>
  );
}