"use client";

import { useEffect, useState } from "react";

export default function RecentDonations() {
  const [donations, setDonations] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await fetch("/api/donations");
    const data = await res.json();

    setDonations(data.slice(0, 8));
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-slate-800">
          Recent Donations
        </h2>

        <span className="rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">
          {donations.length} Recent
        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-orange-50">

              <th className="p-3 text-left">Receipt</th>

              <th className="p-3 text-left">Donor</th>

              <th className="p-3 text-left">Mode</th>

              <th className="p-3 text-left">Paid</th>

              <th className="p-3 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {donations.map((d) => (

              <tr
                key={d.id}
                className="border-b hover:bg-orange-50"
              >

                <td className="p-3 font-semibold">
                  {d.receipt_no}
                </td>

                <td className="p-3">
                  {d.donor?.donor_name}
                </td>

                <td className="p-3">
                  {d.payments.at(-1)?.payment_mode}
                </td>

                <td className="p-3 font-bold text-green-600">
                  ₹{d.totalPaid}
                </td>

                <td className="p-3">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      d.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : d.status === "Partial"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {d.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}