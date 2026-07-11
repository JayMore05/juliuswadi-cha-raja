"use client";

interface Props {
  receipt: any;
}

export default function ReceiptCard({ receipt }: Props) {
  const donor = receipt.donors;

  const payments = receipt.donation_payments ?? [];

  const latestPayment = payments[payments.length - 1];

  const totalPaid = payments.reduce(
    (sum: number, p: any) => sum + Number(p.amount),
    0
  );

  const balance =
    Number(receipt.promised_amount) - totalPaid;

  return (
    <div className="rounded-3xl border-4 border-orange-500 bg-white p-10 shadow-2xl">

      <div className="text-center border-b pb-6">

        <h1 className="text-5xl font-extrabold text-orange-600">
          🛕 Juliuswadi Cha Raja
        </h1>

        <p className="mt-2 text-xl font-semibold text-gray-600">
          Official Donation Receipt
        </p>

        <p className="mt-1 text-gray-500">
          Ganesh Utsav {receipt.festival_year}
        </p>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-y-4 text-lg">

        <strong>Receipt No</strong>
        <span>{receipt.receipt_no}</span>

        <strong>Donor Name</strong>
        <span>{donor?.donor_name}</span>

        <strong>Mobile</strong>
        <span>{donor?.phone || "-"}</span>

        <strong>Promised Amount</strong>
        <span>₹{receipt.promised_amount}</span>

        <strong>Latest Payment</strong>
        <span>₹{latestPayment.amount}</span>

        <strong>Total Paid</strong>
        <span className="font-bold text-green-600">
          ₹{totalPaid}
        </span>

        <strong>Remaining Balance</strong>
        <span className="font-bold text-red-600">
          ₹{balance}
        </span>

        <strong>Payment Mode</strong>
        <span>{latestPayment.payment_mode}</span>

        <strong>Status</strong>
        <span>{receipt.status}</span>

        <strong>Date</strong>
        <span>
          {new Date(
            latestPayment.payment_date
          ).toLocaleDateString("en-IN")}
        </span>

        <strong>Time</strong>
        <span>
          {new Date(
            latestPayment.payment_date
          ).toLocaleTimeString("en-IN")}
        </span>

      </div>

      <div className="mt-10 rounded-2xl bg-orange-100 p-6 text-center">

        <p className="text-2xl font-bold text-orange-700">
          🙏 Thank You For Your Donation
        </p>

        <p className="mt-2 text-lg">
          Ganpati Bappa Morya
        </p>

      </div>

      <div className="mt-10">

        <h3 className="mb-4 text-xl font-bold">
          Payment History
        </h3>

        <table className="w-full border">

          <thead className="bg-orange-100">

            <tr>

              <th className="border p-2">
                Date
              </th>

              <th className="border p-2">
                Mode
              </th>

              <th className="border p-2">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {payments.map((p: any) => (

              <tr key={p.id ?? `${p.payment_date}-${p.amount}`}>

                <td className="border p-2">
                  {new Date(
                    p.payment_date
                  ).toLocaleString("en-IN")}
                </td>

                <td className="border p-2">
                  {p.payment_mode}
                </td>

                <td className="border p-2 font-bold text-green-700">
                  ₹{p.amount}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}