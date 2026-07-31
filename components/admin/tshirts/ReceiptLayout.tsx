"use client";

import { ReactNode } from "react";

interface ReceiptLayoutProps {
  children: ReactNode;
}

export default function ReceiptLayout({
  children,
}: ReceiptLayoutProps) {
  return (
    <div className="min-h-screen bg-orange-50 py-6 md:py-10">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-2xl">

          {/* Orange Header */}
          <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 px-8 py-8 text-center text-white">

            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl shadow-lg">
              🛕
            </div>

            <h1 className="text-3xl font-bold">
              Juliuswadi Cha Raja
            </h1>

            <p className="mt-2 text-orange-100">
              T-Shirt Booking Receipt
            </p>
          </div>

          {/* Receipt Content */}
          <div className="p-6 md:p-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 
