"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Users,
  Shirt,
  IndianRupee,
  UserCheck,
  CreditCard,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface BookingItem {
  quantity: number;
  tshirt_size: string;
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
  items: BookingItem[];
  payments: Payment[];
}

const cardStyle =
  "rounded-2xl border bg-white p-5 shadow-sm";

export default function ReportsDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [volunteerFilter, setVolunteerFilter] = useState("All Volunteers");
  const [paymentFilter, setPaymentFilter] = useState("All Payments");
  const [dateFilter, setDateFilter] = useState("");

  function exportExcel() {
    const rows = filteredBookings.map((booking) => ({
      "Booking ID": booking.booking_id,
      Name: booking.donor_name,
      Phone: booking.phone,
      Volunteer: booking.volunteer_name,
      Quantity: booking.items.reduce(
        (sum, item) => sum + Number(item.quantity),
        0
      ),
      Amount: booking.total_amount,
      Payment: booking.payments?.[0]?.payment_mode ?? "-",
      Status: booking.status,
      Date: new Date(
        booking.created_at
      ).toLocaleDateString("en-IN"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);

    worksheet["!cols"] = [
      { wch: 18 },
      { wch: 22 },
      { wch: 16 },
      { wch: 20 },
      { wch: 10 },
      { wch: 12 },
      { wch: 12 },
      { wch: 18 },
    ];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "T-Shirt Report"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(
      new Blob([excelBuffer]),
      `TShirt_Report_${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx`
    );
  }

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/tshirts");
        const data = await res.json();

        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.booking_id.toLowerCase().includes(search.toLowerCase()) ||
        booking.donor_name.toLowerCase().includes(search.toLowerCase()) ||
        booking.phone.includes(search);

      const matchesVolunteer =
        volunteerFilter === "All Volunteers" ||
        booking.volunteer_name === volunteerFilter;

      const matchesPayment =
        paymentFilter === "All Payments" ||
        booking.payments?.[0]?.payment_mode === paymentFilter;

      const matchesDate =
        !dateFilter ||
        booking.created_at.startsWith(dateFilter);

      return (
        matchesSearch &&
        matchesVolunteer &&
        matchesPayment &&
        matchesDate
      );
    });
  }, [
    bookings,
    search,
    volunteerFilter,
    paymentFilter,
    dateFilter,
  ]);

  const stats = useMemo(() => {
    let revenue = 0;
    let tshirts = 0;
    let delivered = 0;
    let cash = 0;
    let upi = 0;

    filteredBookings.forEach((booking) => {
      revenue += Number(booking.total_amount);

      if (booking.status === "Delivered") {
        delivered++;
      }

      if (
        booking.payments?.[0]?.payment_mode === "Cash"
      ) {
        cash += Number(booking.total_amount);
      } else {
        upi += Number(booking.total_amount);
      }

      booking.items.forEach((item) => {
        tshirts += Number(item.quantity);
      });
    });

    return {
      bookings: filteredBookings.length,
      revenue,
      tshirts,
      delivered,
      pending: filteredBookings.length - delivered,
      cash,
      upi,
    };
  }, [filteredBookings]);

  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }

          .print\\:hidden {
            display: none !important;
          }

          @page {
            size: A4 portrait;
            margin: 10mm;
          }

          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <button
              onClick={() => history.back()}
              className="print:hidden mb-3 rounded-lg border px-4 py-2 text-sm font-semibold transition hover:bg-orange-50"
            >
              ← Back
            </button>

            <h1 className="text-3xl font-bold print:text-center">
              Merchandise Reports
            </h1>

            <p className="text-gray-500 print:text-center">
              Complete merchandise analytics dashboard.
            </p>
          </div>

        </div>

        <div className="print:hidden grid gap-3 rounded-2xl border bg-white p-4 shadow-sm md:grid-cols-4">

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search Booking / Name / Phone"
            className="h-11 rounded-xl border px-4 outline-none focus:border-orange-500"
          />

          <select
            value={volunteerFilter}
            onChange={(e) => setVolunteerFilter(e.target.value)}
            className="h-11 rounded-xl border px-4 outline-none focus:border-orange-500"
          >
            <option>All Volunteers</option>
            <option>Nikhil Patil</option>
            <option>Sachin Gupta</option>
            <option>Pratik Tawre</option>
            <option>Jay More (Admin)</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="h-11 rounded-xl border px-4 outline-none focus:border-orange-500"
          >
            <option>All Payments</option>
            <option>Cash</option>
            <option>UPI</option>
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="h-11 rounded-xl border px-4 outline-none focus:border-orange-500"
          />

        </div>

        <div className="print:hidden flex flex-wrap gap-3">

          <button
            onClick={() => window.print()}
            className="rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-700"
          >
            🖨 Print Report
          </button>

          <button
            onClick={exportExcel}
            className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            📥 Export Excel
          </button>

        </div>

        {loading ? (
          <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
            Loading reports...
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

              <div className={cardStyle}>
                <p className="text-sm text-gray-500">Total Bookings</p>
                <h2 className="mt-2 text-3xl font-bold text-orange-600">
                  {stats.bookings}
                </h2>
              </div>

              <div className={cardStyle}>
                <p className="text-sm text-gray-500">Revenue</p>
                <h2 className="mt-2 text-3xl font-bold text-green-600">
                  ₹{stats.revenue.toLocaleString("en-IN")}
                </h2>
              </div>

              <div className={cardStyle}>
                <p className="text-sm text-gray-500">Total T-Shirts</p>
                <h2 className="mt-2 text-3xl font-bold text-blue-600">
                  {stats.tshirts}
                </h2>
              </div>

              <div className={cardStyle}>
                <p className="text-sm text-gray-500">Delivered</p>
                <h2 className="mt-2 text-3xl font-bold text-emerald-600">
                  {stats.delivered}
                </h2>
                <p className="mt-1 text-sm text-red-500">
                  Pending: {stats.pending}
                </p>
              </div>

            </div>

            <div className="grid gap-4 lg:grid-cols-2">

              <div className={cardStyle}>
                <h3 className="mb-4 text-lg font-bold">
                  Payment Summary
                </h3>

                <div className="space-y-3">

                  <div className="flex justify-between">
                    <span>Cash Collection</span>
                    <span className="font-bold text-green-600">
                      ₹{stats.cash.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>UPI Collection</span>
                    <span className="font-bold text-blue-600">
                      ₹{stats.upi.toLocaleString("en-IN")}
                    </span>
                  </div>

                </div>
              </div>

              <div className={cardStyle}>
                <h3 className="mb-4 text-lg font-bold">
                  Collection Summary
                </h3>

                <div className="space-y-3">

                  <div className="flex justify-between">
                    <span>Delivered</span>
                    <span className="font-bold text-emerald-600">
                      {stats.delivered}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Pending</span>
                    <span className="font-bold text-red-600">
                      {stats.pending}
                    </span>
                  </div>

                </div>
              </div>

            </div>

            <div className={cardStyle}>
              <h3 className="mb-4 text-lg font-bold">
                Recent Bookings
              </h3>

              <div className="hidden overflow-x-auto lg:block">
                <table className="min-w-full text-sm">
                  <thead className="bg-orange-100">
                    <tr>
                      <th className="px-4 py-3 text-left">Booking ID</th>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-center">Qty</th>
                      <th className="px-4 py-3 text-right">Amount</th>
                      <th className="px-4 py-3 text-center">Payment</th>
                      <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {filteredBookings.slice(0, 10).map((booking) => {
                      const qty = booking.items.reduce(
                        (sum, item) => sum + Number(item.quantity),
                        0
                      );

                      return (
                        <tr key={booking.booking_id}>
                          <td className="px-4 py-3 font-semibold">
                            {booking.booking_id}
                          </td>

                          <td className="px-4 py-3">
                            {booking.donor_name}
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
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="space-y-4 lg:hidden">
                {filteredBookings.slice(0, 10).map((booking) => {
                  const qty = booking.items.reduce(
                    (sum, item) => sum + Number(item.quantity),
                    0
                  );

                  return (
                    <div
                      key={booking.booking_id}
                      className="rounded-2xl border bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-orange-600">
                          {booking.booking_id}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            booking.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="mt-3 space-y-2 text-sm">

                        <div className="flex justify-between">
                          <span>Name</span>
                          <strong>{booking.donor_name}</strong>
                        </div>

                        <div className="flex justify-between">
                          <span>Phone</span>
                          <strong>{booking.phone}</strong>
                        </div>

                        <div className="flex justify-between">
                          <span>Volunteer</span>
                          <strong>{booking.volunteer_name}</strong>
                        </div>

                        <div className="flex justify-between">
                          <span>Payment</span>
                          <strong>
                            {booking.payments?.[0]?.payment_mode ?? "-"}
                          </strong>
                        </div>

                        <div className="flex justify-between">
                          <span>T-Shirts</span>
                          <strong>{qty}</strong>
                        </div>

                        <div className="flex justify-between">
                          <span>Amount</span>
                          <strong className="text-green-600">
                            ₹{Number(booking.total_amount).toLocaleString("en-IN")}
                          </strong>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">

              <div className={cardStyle}>
                <h2 className="mb-4 text-xl font-bold">
                  👕 Size-wise T-Shirt Summary
                </h2>

                {(() => {
                  const standardSizes = [
                    { value: "26", label: "Child (26)" },
                    { value: "28", label: "Child (28)" },
                    { value: "30", label: "Child (30)" },
                    { value: "32", label: "Child (32)" },

                    { value: "XS", label: "XS (34)" },
                    { value: "S", label: "S (36)" },
                    { value: "M", label: "M (38)" },
                    { value: "L", label: "L (40)" },
                    { value: "XL", label: "XL (42)" },
                    { value: "XXL", label: "XXL (44)" },
                    { value: "XXXL", label: "XXXL (46)" },
                  ];

                  const standardValues = new Set(
                    standardSizes.map((size) => size.value)
                  );

                  const customSizes = Array.from(
                    new Set(
                      filteredBookings.flatMap((booking) =>
                        booking.items
                          .map((item) => item.tshirt_size)
                          .filter(
                            (size) =>
                              /^\d{2}$/.test(size) &&
                              !standardValues.has(size)
                          )
                      )
                    )
                  ).sort((a, b) => Number(a) - Number(b));

                  const allSizes = [
                    ...standardSizes,
                    ...customSizes.map((size) => ({
                      value: size,
                      label: `Custom (${size})`,
                    })),
                  ];

                  return allSizes.map((size) => {
                    const qty = filteredBookings.reduce(
                      (sum, booking) => {
                        return (
                          sum +
                          booking.items
                            .filter(
                              (item) =>
                                item.tshirt_size === size.value
                            )
                            .reduce(
                              (a, b) =>
                                a + Number(b.quantity),
                              0
                            )
                        );
                      },
                      0
                    );

                    return (
                      <div
                        key={size.value}
                        className="mb-3 flex items-center justify-between rounded-xl border p-3"
                      >
                        <span className="font-semibold">
                          {size.label}
                        </span>

                        <span className="rounded-lg bg-orange-100 px-3 py-1 font-bold text-orange-700">
                          {qty}
                        </span>
                      </div>
                    );
                  });
                })()}
              </div>

              <div className={cardStyle}>
                <h2 className="mb-4 text-xl font-bold">
                  👨 Volunteer Performance
                </h2>

                {[
                  "Nikhil Patil",
                  "Sachin Gupta",
                  "Pratik Tawre",
                  "Jay More (Admin)",
                ].map((volunteer) => {
                  const count = filteredBookings.filter(
                    (b) => b.volunteer_name === volunteer
                  ).length;

                  return (
                    <div
                      key={volunteer}
                      className="mb-3 flex items-center justify-between rounded-xl border p-3"
                    >
                      <span className="font-semibold">
                        {volunteer}
                      </span>

                      <span className="rounded-lg bg-green-100 px-3 py-1 font-bold text-green-700">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>

            <div className={cardStyle}>
              <h2 className="mb-4 text-xl font-bold">
                📅 Daily Collection
              </h2>

              {Object.entries(
                filteredBookings.reduce((acc, booking) => {
                  const date = new Date(
                    booking.created_at
                  ).toLocaleDateString("en-IN");

                  if (!acc[date]) {
                    acc[date] = {
                      bookings: 0,
                      amount: 0,
                    };
                  }

                  acc[date].bookings++;

                  acc[date].amount += Number(
                    booking.total_amount
                  );

                  return acc;
                }, {} as Record<
                  string,
                  {
                    bookings: number;
                    amount: number;
                  }
                >)
              )
                .sort(
                  (a, b) =>
                    new Date(b[0]).getTime() -
                    new Date(a[0]).getTime()
                )
                .slice(0, 7)
                .map(([date, value]) => (
                  <div
                    key={date}
                    className="mb-3 flex items-center justify-between rounded-xl border p-3"
                  >
                    <div>
                      <p className="font-semibold">
                        {date}
                      </p>

                      <p className="text-sm text-gray-500">
                        {value.bookings} Bookings
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        ₹{value.amount.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

          </>
        )}
      </div>
    </>
  );
}