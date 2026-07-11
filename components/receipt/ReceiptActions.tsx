"use client";

import type { RefObject } from "react";
import {
  Printer,
  Download,
  MessageCircle,
  Smartphone,
  Share2,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Props {
  receipt: any;
  receiptRef: RefObject<HTMLDivElement | null>;
}

export default function ReceiptActions({
  receipt,
  receiptRef,
}: Props) {
  const donor = receipt.donors ?? {};

  const payments = receipt.donation_payments ?? [];

  const latestPayment =
    payments.length > 0
      ? payments[payments.length - 1]
      : null;

  const totalPaid = payments.reduce(
    (sum: number, p: any) => sum + Number(p.amount),
    0
  );

  const balance =
    Number(receipt.promised_amount) - totalPaid;

  function printReceipt() {
    window.print();
  }

  async function downloadPDF() {
    if (!receiptRef.current) return;

    const canvas = await html2canvas(receiptRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();

    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth - 20;

    const imgHeight =
      (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;

    let position = 10;

    pdf.addImage(
      imgData,
      "PNG",
      10,
      position,
      imgWidth,
      imgHeight
    );

    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 10;

      pdf.addPage();

      pdf.addImage(
        imgData,
        "PNG",
        10,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pageHeight;
    }

    pdf.save(`${receipt.receipt_no}.pdf`);
  }

  async function shareReceipt() {
    const receiptLink =
      `${window.location.origin}/receipt/${receipt.receipt_no}`;
  
    const message = `🛕 Juliuswadi Cha Raja
  
Receipt No: ${receipt.receipt_no}
  
Donor: ${donor.donor_name}
  
Amount: ₹${latestPayment?.amount ?? 0}
  
View Receipt:${receiptLink}
  
Ganpati Bappa Morya 🙏`;
  
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Receipt ${receipt.receipt_no}`,
          text: message,
          url: receiptLink,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      await navigator.clipboard.writeText(receiptLink);
      window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }
  }

  function whatsappShare() {
    const phone = String(donor.phone ?? "").replace(/\D/g, "");
  
    const receiptLink =
      `https://juliuswadicharaja.vercel.app/receipt/${receipt.receipt_no}`;
  
    const message = `🛕 *Juliuswadi Cha Raja*
  
🙏 Thank you for your generous donation.
  
━━━━━━━━━━━━━━━━━━
  
🧾 Receipt No${receipt.receipt_no}
  
👤 Donor${donor.donor_name}
  
📞 Mobile${phone}
  
💰 Promised
₹${receipt.promised_amount}
  
✅ Received
₹${latestPayment?.amount ?? 0}
  
💵 Total Paid
₹${totalPaid}
  
🧮 Balance
₹${balance}
  
💳 Payment${latestPayment?.payment_mode}
  
📅 Date${new Date(
    latestPayment?.payment_date
  ).toLocaleDateString("en-IN")}
  
🕒 Time${new Date(
    latestPayment?.payment_date
  ).toLocaleTimeString("en-IN")}
  
━━━━━━━━━━━━━━━━━━
  
📄 View Receipt${receiptLink}
  
🙏 Ganpati Bappa Morya`;
  
    window.open(
      `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  function smsShare() {
    const phone = String(donor.phone ?? "").replace(/\D/g, "");
  
    const receiptLink =
      `https://juliuswadicharaja.vercel.app/receipt/${receipt.receipt_no}`;
  
    const message = `Juliuswadi Cha Raja
  
Receipt : ${receipt.receipt_no}
  
Donor : ${donor.donor_name}
  
Received : ₹${latestPayment?.amount ?? 0}
  
Payment : ${latestPayment?.payment_mode}
  
Date : ${new Date(
    latestPayment?.payment_date
  ).toLocaleDateString("en-IN")}
  
View Receipt${receiptLink}
  
Thank You 🙏`;
  
    window.location.href =
      `sms:+91${phone}?body=${encodeURIComponent(message)}`;
  }

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">

      <button
        onClick={shareReceipt}
        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
        <Share2 size={18} />
        Share
      </button>

      <button
        onClick={printReceipt}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        <Printer size={18} />
        Print
      </button>

      <button
        onClick={downloadPDF}
        className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        <Download size={18} />
        Download PDF
      </button>

      <button
        onClick={whatsappShare}
        className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        <MessageCircle size={18} />
        WhatsApp
      </button>

      <button
        onClick={smsShare}
        className="flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
      >
        <Smartphone size={18} />
        SMS
      </button>

    </div>
  );
}