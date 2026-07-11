"use client";

import { useState } from "react";

import DonationStats from "./DonationStats";
import DonationFilters from "./DonationFilters";
import DonationTable from "./DonationTable";
import DonationModal from "./DonationModal";
import DonationSuccessModal from "./DonationSuccessModal";

export default function DonationDashboard() {
  const [openDonationModal, setOpenDonationModal] =
    useState(false);

  const [openSuccessModal, setOpenSuccessModal] =
    useState(false);

  const [receiptNo, setReceiptNo] =
    useState("");

  function handleDonationSaved(
    receipt: string
  ) {
    setReceiptNo(receipt);

    setOpenDonationModal(false);

    setOpenSuccessModal(true);
  }

  return (
    <>
      <main className="space-y-8">

        {/* Header */}

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <h1 className="text-4xl font-bold text-orange-600">
              Donation Management
            </h1>

            <p className="mt-2 text-slate-600">
              Manage offline donations,
              balances, receipts and
              payment history.
            </p>

          </div>

          <button
            onClick={() =>
              setOpenDonationModal(true)
            }
            className="rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-700"
          >
            + New Donation
          </button>

        </div>

        <DonationStats />

        <DonationFilters />

        <DonationTable />

      </main>

      <DonationModal
        open={openDonationModal}
        onClose={() =>
          setOpenDonationModal(false)
        }
        onSuccess={handleDonationSaved}
      />

      <DonationSuccessModal
        open={openSuccessModal}
        receiptNo={receiptNo}
        onClose={() =>
          setOpenSuccessModal(false)
        }
        onNewDonation={() => {
          setOpenSuccessModal(false);
          setOpenDonationModal(true);
        }}
      />
    </>
  );
}