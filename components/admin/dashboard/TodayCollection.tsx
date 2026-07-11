"use client";

import { useEffect, useState } from "react";

export default function TodayCollection() {
  const [today, setToday] = useState({
    collection: 0,
    cash: 0,
    upi: 0,
    receipts: 0,
  });

  useEffect(() => {
    loadToday();
  }, []);

  async function loadToday() {
    const res = await fetch("/api/donations");
    const data = await res.json();

    const todayDate = new Date().toDateString();

    let collection = 0;
    let cash = 0;
    let upi = 0;
    let receipts = 0;

    data.forEach((donation: any) => {
      donation.payments.forEach((payment: any) => {
        if (
          new Date(payment.payment_date).toDateString() ===
          todayDate
        ) {
          receipts++;

          collection += Number(payment.amount);

          if (payment.payment_mode === "Cash")
            cash += Number(payment.amount);

          if (payment.payment_mode === "UPI")
            upi += Number(payment.amount);
        }
      });
    });

    setToday({
      collection,
      cash,
      upi,
      receipts,
    });
  }

  return (
    <div className="rounded-3xl bg-gradient-to-r from-orange-600 to-amber-500 p-8 text-white shadow-2xl">

      <h2 className="text-3xl font-bold">
        Today's Collection
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-4">

        <div>
          <p className="text-orange-100">
            Collection
          </p>

          <h3 className="mt-2 text-4xl font-bold">
            ₹{today.collection}
          </h3>
        </div>

        <div>
          <p className="text-orange-100">
            Cash
          </p>

          <h3 className="mt-2 text-4xl font-bold">
            ₹{today.cash}
          </h3>
        </div>

        <div>
          <p className="text-orange-100">
            UPI
          </p>

          <h3 className="mt-2 text-4xl font-bold">
            ₹{today.upi}
          </h3>
        </div>

        <div>
          <p className="text-orange-100">
            Receipts
          </p>

          <h3 className="mt-2 text-4xl font-bold">
            {today.receipts}
          </h3>
        </div>

      </div>

    </div>
  );
}