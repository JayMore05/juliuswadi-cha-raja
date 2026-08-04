"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Loader2, Plus, Trash2 } from "lucide-react";

const SIZES = [
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
  { value: "CUSTOM", label: "Custom Size" },
];

type Item = {
  tshirt_size: string;
  quantity: number;
  custom_size?: string;
};

export default function PublicTshirtRequestForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [remarks, setRemarks] = useState("");
  const [paymentPreference, setPaymentPreference] =
    useState<"pay_later" | "upi">("pay_later");
  const [paymentReference, setPaymentReference] = useState("");
  const [paymentClaimed, setPaymentClaimed] = useState(false);

  const [price, setPrice] = useState(330);
  const [paymentSettings, setPaymentSettings] = useState({
    upi_id: "",
    gpay_number: "",
    upi_qr_url: "",
    public_payment_enabled: false,
  });
  const [settingsLoading, setSettingsLoading] = useState(true);

  const [items, setItems] = useState<Item[]>([
    {
      tshirt_size: "M",
      quantity: 1,
      custom_size: "",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/tshirts/settings", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.error || "Failed to load T-Shirt settings."
          );
        }

        setPrice(Number(data.tshirt_price) || 330);

        setPaymentSettings({
          upi_id: data.upi_id || "",
          gpay_number: data.gpay_number || "",
          upi_qr_url: data.upi_qr_url || "",
          public_payment_enabled:
            data.public_payment_enabled === true,
        });
      } catch (error) {
        console.error("Public T-Shirt settings:", error);
      } finally {
        setSettingsLoading(false);
      }
    }

    loadSettings();
  }, []);

  useEffect(() => {
    if (
      !settingsLoading &&
      !paymentSettings.public_payment_enabled &&
      paymentPreference === "upi"
    ) {
      setPaymentPreference("pay_later");
      setPaymentReference("");
      setPaymentClaimed(false);
    }
  }, [
    settingsLoading,
    paymentSettings.public_payment_enabled,
    paymentPreference,
  ]);

  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalAmount = totalQuantity * price;

  function addItem() {
    setItems((current) => [
      ...current,
      {
        tshirt_size: "M",
        quantity: 1,
        custom_size: "",
      },
    ]);
  }

  function removeItem(index: number) {
    if (items.length === 1) return;

    setItems((current) =>
      current.filter((_, itemIndex) => itemIndex !== index)
    );
  }

  function updateItem(
    index: number,
    field: keyof Item,
    value: string | number
  ) {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  }

  async function submitRequest(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/tshirt-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          phone,
          remarks,
          items: items.map((item) => ({
            tshirt_size:
              item.tshirt_size === "CUSTOM"
                ? item.custom_size
                : item.tshirt_size,
            quantity: item.quantity,
          })),

          payment_preference: paymentPreference,
          payment_claimed:
            paymentPreference === "upi" ? paymentClaimed : false,
          payment_reference:
            paymentPreference === "upi" ? paymentReference : "",
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Request failed.");
      }

      if (!result.requestId) {
        throw new Error(
          "Request was submitted, but Request ID was not returned."
        );
      }

      setRequestId(result.requestId);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    async function copyRequestId() {
      try {
        await navigator.clipboard.writeText(requestId);
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch {
        // Clipboard may be unavailable on some browsers.
      }
    }

    return (
      <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-green-200 bg-white shadow-xl">
        <div className="bg-green-50 px-6 py-8 text-center sm:px-8">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />

          <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">
            Request Received!
          </h2>

          <p className="mt-3 text-gray-600">
            Your T-Shirt request has been submitted successfully.
          </p>
        </div>

        <div className="space-y-5 p-6 sm:p-8">
          {/* REQUEST ID */}

          <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-5">
            <p className="text-center text-xs font-bold uppercase tracking-wider text-orange-700">
              Your Request ID
            </p>

            <p className="mt-3 break-all text-center font-mono text-lg font-black text-gray-900 sm:text-xl">
              {requestId}
            </p>

            <button
              type="button"
              onClick={copyRequestId}
              className="mt-4 w-full rounded-xl bg-orange-600 px-4 py-3 font-bold text-white transition hover:bg-orange-700"
            >
              {copied ? "✓ Request ID Copied" : "Copy Request ID"}
            </button>
          </div>

          {/* IMPORTANT */}

          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 text-sm leading-6 text-yellow-900">
            <strong>Save this Request ID.</strong>
            <br />
            You will need your{" "}
            <strong>Mobile Number + Request ID</strong> to check the
            status of this T-Shirt request.
          </div>

          {/* STATUS */}

          <div className="rounded-2xl border border-gray-200 p-5 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Current Status
            </p>

            <p className="mt-2 text-lg font-bold text-orange-600">
              🟡 Pending Verification
            </p>
          </div>

          {/* COMMITTEE CONTACT */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h3 className="text-center text-base font-bold text-blue-900">
              Need Help With Your T-Shirt Booking?
            </h3>

            <p className="mt-2 text-center text-sm leading-6 text-blue-800">
              If you do not receive an order confirmation or call from the
              Juliuswadi Cha Raja Committee, please contact any of the
              volunteers below.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a
                href="tel:8369939172"
                className="rounded-xl border border-blue-200 bg-white p-3 text-center transition hover:bg-blue-50"
              >
                <div className="font-bold text-gray-900">
                  Sachin Gupta
                </div>
                <div className="mt-1 text-sm font-semibold text-blue-700">
                  📞 8369939172
                </div>
              </a>

              <a
                href="tel:8591417066"
                className="rounded-xl border border-blue-200 bg-white p-3 text-center transition hover:bg-blue-50"
              >
                <div className="font-bold text-gray-900">
                  Nikhil Patil
                </div>
                <div className="mt-1 text-sm font-semibold text-blue-700">
                  📞 8591417066
                </div>
              </a>

              <a
                href="tel:7039004624"
                className="rounded-xl border border-blue-200 bg-white p-3 text-center transition hover:bg-blue-50"
              >
                <div className="font-bold text-gray-900">
                  Patrik Tawre
                </div>
                <div className="mt-1 text-sm font-semibold text-blue-700">
                  📞 7039004624
                </div>
              </a>

              <a
                href="tel:9137435654"
                className="rounded-xl border border-blue-200 bg-white p-3 text-center transition hover:bg-blue-50"
              >
                <div className="font-bold text-gray-900">
                  Jay More
                </div>
                <div className="mt-1 text-sm font-semibold text-blue-700">
                  📞 9137435654
                </div>
              </a>
            </div>

            <p className="mt-4 text-center text-xs text-blue-700">
              Please keep your Request ID ready when contacting the committee.
            </p>
          </div>

          <p className="text-center text-sm leading-6 text-gray-600">
            This is currently an online request. Your official T-Shirt
            booking will be created after verification by a Mandal
            volunteer.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitRequest}
      className="mx-auto max-w-2xl space-y-6"
    >
      <div className="rounded-3xl border bg-white p-6 shadow-xl">
        <h2 className="mb-5 text-xl font-bold text-orange-600">
          Your Details
        </h2>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Full Name *
            </label>

            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Mobile Number *
            </label>

            <input
              required
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value.replace(/\D/g, "").slice(0, 10)
                )
              }
              placeholder="9876543210"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-orange-600">
              Select T-Shirts
            </h2>

            <p className="text-sm text-gray-500">
              ₹{price} per T-Shirt
            </p>
          </div>

          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-2 rounded-xl bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-2xl bg-orange-50 p-4 sm:grid-cols-[1fr_120px_45px]"
            >
              <div className="flex flex-col gap-3">
                <select
                  value={item.tshirt_size}
                  onChange={(e) =>
                    updateItem(index, "tshirt_size", e.target.value)
                  }
                  className="rounded-xl border bg-white px-4 py-3"
                >
                  {SIZES.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>

                {item.tshirt_size === "CUSTOM" && (
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    required
                    value={item.custom_size || ""}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 2);

                      setItems((current) =>
                        current.map((currentItem, itemIndex) =>
                          itemIndex === index
                            ? {
                                ...currentItem,
                                custom_size: value,
                              }
                            : currentItem
                        )
                      );
                    }}
                    placeholder="Enter custom size e.g. 48"
                    className="rounded-xl border bg-white px-4 py-3 outline-none focus:border-orange-500"
                  />
                )}
              </div>

              <input
                type="number"
                min={1}
                max={20}
                value={item.quantity}
                onChange={(e) =>
                  updateItem(
                    index,
                    "quantity",
                    Math.max(1, Number(e.target.value))
                  )
                }
                className="rounded-xl border bg-white px-4 py-3 h-fit"
              />

              <button
                type="button"
                disabled={items.length === 1}
                onClick={() => removeItem(index)}
                className="flex items-center justify-center rounded-xl text-red-600 disabled:opacity-30 h-fit"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold text-orange-600">
          Request Summary
        </h2>

        <div className="flex justify-between py-2">
          <span>Total T-Shirts</span>
          <strong>{totalQuantity}</strong>
        </div>

        <div className="flex justify-between py-2">
          <span>Price per T-Shirt</span>
          <strong>₹{price}</strong>
        </div>

        <div className="mt-3 flex justify-between rounded-xl bg-green-50 p-4 text-lg">
          <strong>Estimated Total</strong>

          <strong className="text-green-700">
            ₹{totalAmount}
          </strong>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          Final booking will be confirmed by a Mandal volunteer.
        </p>
      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-xl">
        <h2 className="mb-2 text-xl font-bold text-orange-600">
          Payment Mode
        </h2>

        <p className="mb-5 text-sm text-gray-500">
          Choose how you want to pay for your T-Shirt request.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* CASH */}
          <button
            type="button"
            onClick={() => {
              setPaymentPreference("pay_later");
              setPaymentReference("");
              setPaymentClaimed(false);
            }}
            className={`rounded-2xl border-2 p-5 text-left transition ${
              paymentPreference === "pay_later"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-200 bg-white hover:border-orange-200"
            }`}
          >
            <div className="text-lg font-bold">
              💵 Cash
            </div>

            <p className="mt-2 text-sm text-gray-600">
              Pay cash to the Mandal volunteer during booking confirmation.
            </p>
          </button>

          {/* UPI */}
          {paymentSettings.public_payment_enabled && (
            <button
              type="button"
              onClick={() => {
                if (
                  !paymentSettings.upi_id &&
                  !paymentSettings.gpay_number &&
                  !paymentSettings.upi_qr_url
                ) {
                  setError(
                    "UPI payment details are currently unavailable. Please select Cash."
                  );
                  return;
                }

                setError("");
                setPaymentPreference("upi");
              }}
              className={`rounded-2xl border-2 p-5 text-left transition ${
                paymentPreference === "upi"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white hover:border-green-200"
              }`}
            >
              <div className="text-lg font-bold">
                📱 UPI
              </div>

              <p className="mt-2 text-sm text-gray-600">
                Pay now using UPI ID, GPay number or QR code.
              </p>
            </button>
          )}
        </div>

        {paymentPreference === "upi" && (
          <div className="mt-6 space-y-5 rounded-2xl border border-green-200 bg-green-50 p-5">

            <div>
              <p className="text-sm text-gray-600">
                Amount to Pay
              </p>

              <p className="text-3xl font-black text-green-700">
                ₹{totalAmount}
              </p>
            </div>

            <div className="rounded-xl bg-white p-4">
              <p className="text-xs font-semibold uppercase text-gray-500">
                UPI ID
              </p>

              <p className="mt-1 break-all text-lg font-bold text-gray-900">
                {paymentSettings.upi_id || "Not configured"}
              </p>
            </div>

            <div className="rounded-xl bg-white p-4">
              <p className="text-xs font-semibold uppercase text-gray-500">
                GPay / UPI Number
              </p>

              <p className="mt-1 text-lg font-bold text-gray-900">
                {paymentSettings.gpay_number || "Not configured"}
              </p>
            </div>

            <div className="rounded-xl bg-white p-4 text-center">
              <p className="mb-3 text-sm font-semibold">
                Scan QR Code
              </p>

              {paymentSettings.upi_qr_url ? (
                <img
                  src={paymentSettings.upi_qr_url}
                  alt="Mandal UPI QR Code"
                  className="mx-auto h-56 w-56 rounded-xl border bg-white object-contain"
                />
              ) : (
                <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-xl border bg-gray-50 p-4 text-sm text-gray-500">
                  QR code not configured
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                UPI Transaction ID / UTR *
              </label>

              <input
                type="text"
                value={paymentReference}
                onChange={(e) =>
                  setPaymentReference(
                    e.target.value
                      .replace(/[^a-zA-Z0-9]/g, "")
                      .slice(0, 30)
                  )
                }
                placeholder="Enter transaction / UTR number"
                className="w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-green-500"
              />
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-white p-4">
              <input
                type="checkbox"
                checked={paymentClaimed}
                onChange={(e) =>
                  setPaymentClaimed(e.target.checked)
                }
                className="mt-1 h-5 w-5"
              />

              <span className="text-sm font-medium text-gray-700">
                I have completed the UPI payment of{" "}
                <strong>₹{totalAmount}</strong>.
              </span>
            </label>

            <p className="text-xs text-gray-500">
              Your payment will be verified by the Mandal before
              the official booking is created.
            </p>
          </div>
        )}
      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-xl">
        <label className="mb-2 block text-sm font-semibold">
          Remarks
        </label>

        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          rows={3}
          placeholder="Any special request? (Optional)"
          className="w-full rounded-xl border p-4 outline-none focus:border-orange-500"
        />
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <button
        disabled={loading}
        type="submit"
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-orange-600 px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-orange-700 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit T-Shirt Request Form"
        )}
      </button>

      <p className="text-center text-xs text-gray-500">
        Submitting this form does not create an official booking.
      </p>
    </form>
  );
}