"use client";

interface Props {
  donorName: string;
  setDonorName: (value: string) => void;

  phone: string;
  setPhone: (value: string) => void;

  receiptNo: string;
  setReceiptNo: (value: string) => void;

  remarks: string;
  setRemarks: (value: string) => void;
}

export default function BookingCustomer({
  donorName,
  setDonorName,
  phone,
  setPhone,
  receiptNo,
  setReceiptNo,
  remarks,
  setRemarks,
}: Props) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold text-orange-600">
        👤 Customer Information
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Customer Name */}

        <div>
          <label className="mb-2 block font-medium">
            Customer Name *
          </label>

          <input
            value={donorName}
            onChange={(e) =>
              setDonorName(e.target.value)
            }
            placeholder="Enter customer name"
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-orange-500 focus:outline-none"
          />
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 block font-medium">
            Phone Number *
          </label>

          <input
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="9876543210"
            maxLength={10}
            inputMode="numeric"
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-orange-500 focus:outline-none"
          />
        </div>

        {/* Donation Receipt */}

        <div>
          <label className="mb-2 block font-medium">
            Donation Receipt No
            <span className="ml-2 text-xs text-gray-400">
              (Optional)
            </span>
          </label>

          <input
            value={receiptNo}
            onChange={(e) =>
              setReceiptNo(e.target.value)
            }
            placeholder="JCR-2026-0001"
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-orange-500 focus:outline-none"
          />
        </div>

        {/* Remarks */}

        <div>
          <label className="mb-2 block font-medium">
            Remarks
          </label>

          <input
            value={remarks}
            onChange={(e) =>
              setRemarks(e.target.value)
            }
            placeholder="Optional remarks"
            className="w-full rounded-xl border border-gray-300 p-3 focus:border-orange-500 focus:outline-none"
          />
        </div>

      </div>

    </div>
  );
}