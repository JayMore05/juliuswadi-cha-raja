export function shareWhatsApp(receipt: any) {
  const donor = receipt.donors;

  const payments = receipt.donation_payments ?? [];

  const latest = payments[payments.length - 1];

  const totalPaid = payments.reduce(
    (sum: number, p: any) => sum + Number(p.amount),
    0
  );

  const balance =
    Number(receipt.promised_amount) - totalPaid;

  const message = `🛕 Juliuswadi Cha Raja

🙏 Thank you for your generous donation.

Receipt No: ${receipt.receipt_no}

Donor: ${donor.donor_name}

Mobile: ${donor.phone}

Promised Amount: ₹${receipt.promised_amount}

Received Amount: ₹${latest.amount}

Total Paid: ₹${totalPaid}

Balance: ₹${balance}

Payment Mode: ${latest.payment_mode}

Status: ${receipt.status}

Date: ${new Date(
    latest.payment_date
  ).toLocaleDateString("en-IN")}

Time: ${new Date(
    latest.payment_date
  ).toLocaleTimeString("en-IN")}

Ganpati Bappa Morya 🙏`;

  window.open(
    `https://wa.me/91${donor.phone}?text=${encodeURIComponent(
      message
    )}`,
    "_blank"
  );
}

export function shareSMS(receipt: any) {
  const donor = receipt.donors;

  const payments = receipt.donation_payments ?? [];

  const latest = payments[payments.length - 1];

  const message = `Juliuswadi Cha Raja

Receipt: ${receipt.receipt_no}

Donor: ${donor.donor_name}

Amount: ₹${latest.amount}

Mode: ${latest.payment_mode}

Status: ${receipt.status}

Date: ${new Date(
    latest.payment_date
  ).toLocaleDateString("en-IN")}

Thank you 🙏`;

  window.location.href =
    `sms:+91${donor.phone}?body=${encodeURIComponent(
      message
    )}`;
}