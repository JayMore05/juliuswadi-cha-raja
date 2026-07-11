"use client";

import { useEffect, useRef, useState, use } from "react";
import ReceiptCard from "@/components/receipt/ReceiptCard";
import ReceiptActions from "@/components/receipt/ReceiptActions";

export default function ReceiptPage({
  params,
}: {
  params: Promise<{
    receiptNo: string;
  }>;
}) {
  const { receiptNo } = use(params);
  const [receipt, setReceipt] = useState<any>(null);

  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadReceipt();
  }, []);

  async function loadReceipt() {
    const res = await fetch(
      `/api/receipt/${receiptNo}`
    );

    const data = await res.json();

    setReceipt(data);
  }

  if (!receipt) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-semibold">
        Loading Receipt...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-8">

      <div className="mx-auto max-w-4xl">

        <div ref={receiptRef}>
          <ReceiptCard receipt={receipt} />
        </div>

        <ReceiptActions
          receipt={receipt}
          receiptRef={receiptRef}
        />

      </div>

    </main>
  );
}