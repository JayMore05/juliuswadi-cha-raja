"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface Props {
  onScan: (text: string) => void;
  onClose: () => void;
}

export default function QrScanner({
  onScan,
  onClose,
}: Props) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannedRef = useRef(false);
  const startedRef = useRef(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState("");

  useEffect(() => {
    const scannerId = "qr-reader";
    const scanner = new Html5Qrcode(scannerId);
    scannerRef.current = scanner;

    (async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Camera API is not supported in this browser or requires a secure HTTPS/localhost connection.");
        }

        const cameras = await Html5Qrcode.getCameras();
        if (!cameras || cameras.length === 0) {
          throw new Error("No physical camera devices were detected on this machine/device.");
        }

        await scanner.start(
          cameras[0].id,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          async (decodedText) => {
            if (scannedRef.current) return;
            scannedRef.current = true;
            try {
              await scanner.stop();
            } catch {}
            onScan(decodedText);
          },
          () => {}
        );

        startedRef.current = true;
      } catch (error: any) {
        console.error("QR Scanner Error:", error);
        setErrorMessage(error?.message || "Unable to initialize camera scanner.");
      }
    })();

    return () => {
      if (startedRef.current && scanner.isScanning) {
        scanner
          .stop()
          .then(() => {
            try {
              scanner.clear();
            } catch {}
          })
          .catch(() => {});
      }
    };
  }, [onScan]);

  async function handleClose() {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch {}

      try {
        scannerRef.current.clear();
      } catch {}
    }
    onClose();
  }

  return (
    <div className="rounded-2xl border bg-white p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Scan or Enter QR Data</h2>
        <button
          onClick={handleClose}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          ✕ Close Scanner
        </button>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-xl bg-orange-50 p-4 text-sm text-orange-800 border border-orange-200">
          <p className="font-bold">Camera Unavailable on this Device</p>
          <p className="mt-1">
            Since no webcam was detected, you can use the manual lookup box below to test or process collections on your desktop.
          </p>
        </div>
      )}

      {/* Manual Input Fallback */}
      <div className="mb-4 rounded-xl bg-gray-50 p-4 border">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Manual Code / JSON Payload Entry
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            placeholder="Enter Booking ID or paste QR JSON..."
            className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
          />
          <button
            type="button"
            onClick={() => {
              if (!manualInput.trim()) return;
              if (scannedRef.current) return;
              scannedRef.current = true;
              onScan(manualInput.trim());
            }}
            className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
          >
            Verify
          </button>
        </div>
      </div>

      <div
        id="qr-reader"
        className="mx-auto w-full max-w-sm overflow-hidden rounded-xl"
      />
    </div>
  );
}