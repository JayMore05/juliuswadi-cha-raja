"use client";

interface BookingItem {
  quantity: number;
}

interface Payment {
  payment_mode: string;
}

interface Booking {
  booking_id: string;
  donor_name: string;
  phone: string;
  volunteer_name: string;
  total_amount: number;
  status: string;
  created_at: string;
  items?: BookingItem[];
  payments?: Payment[];
}

interface Props {
  bookings: Booking[];
}

export default function ReportsTable({ bookings }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-orange-100">
            <tr>
              <th className="px-4 py-3 text-left">Booking ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Volunteer</th>
              <th className="px-4 py-3 text-center">Qty</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-center">Payment</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {bookings.map((booking) => {
              const qty =
                booking.items?.reduce(
                  (sum, item) => sum + Number(item.quantity),
                  0
                ) ?? 0;

              return (
                <tr key={booking.booking_id}>
                  <td className="px-4 py-3 font-semibold">
                    {booking.booking_id}
                  </td>

                  <td className="px-4 py-3">
                    {booking.donor_name}
                  </td>

                  <td className="px-4 py-3">
                    {booking.volunteer_name}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {qty}
                  </td>

                  <td className="px-4 py-3 text-right font-semibold">
                    ₹{Number(booking.total_amount).toLocaleString("en-IN")}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {booking.payments?.[0]?.payment_mode ?? "-"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        booking.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {new Date(booking.created_at).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}