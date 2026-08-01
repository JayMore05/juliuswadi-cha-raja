"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Printer, FileSpreadsheet, FileText, ArrowLeft } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface SizeSummary {
  size: string;
  value: string;
  quantity: number;
}

interface SummaryData {
  summary: SizeSummary[];
  totalBookings: number;
  totalTshirts: number;
}

export default function ManufacturerReport() {
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const reportRef = useRef<HTMLDivElement>(null);

  const reportDate = new Date().toLocaleString("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
  });

  useEffect(() => {
    fetchSummary();
  }, []);

  async function fetchSummary() {
    try {
      const res = await fetch("/api/tshirts/manufacturer");

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const json = await res.json();

      setData(json);
    } catch (err) {
      console.error("Manufacturer Summary Error:", err);
    } finally {
      setLoading(false);
    }
  }

  function exportExcel() {
    if (!data) return;

    const rows: {
      "Sr. No.": number | string;
      Size: string;
      Quantity: number;
    }[] = data.summary.map((row, index) => ({
      "Sr. No.": index + 1,
      Size: row.size,
      Quantity: row.quantity,
    }));

    rows.push({
      "Sr. No.": "",
      Size: "TOTAL",
      Quantity: data.totalTshirts,
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        ["Juliuswadi Cha Raja"],
        ["Official Merchandise Manufacturer Report"],
        [""],
        ["Generated On", reportDate],
        [""],
      ],
      {
        origin: "A1",
      }
    );

    worksheet["!cols"] = [{ wch: 10 }, { wch: 20 }, { wch: 15 }];

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Manufacturer Report"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    const date = new Date().toISOString().split("T")[0];

    saveAs(file, `Manufacturer_Report_${date}.xlsx`);
  }

  async function exportPDF() {
    if (!reportRef.current) return;

    const canvas = await html2canvas(reportRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      0,
      0,
      imgWidth,
      Math.min(imgHeight, pageHeight)
    );

    pdf.save(
      `Manufacturer_Report_${new Date().toISOString().split("T")[0]}.pdf`
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center p-12 text-gray-500">
        Loading report...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }

          .print\\:hidden {
            display: none !important;
          }

          @page {
            size: A4 portrait;
            margin: 15mm;
          }

          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      {/* Back Button */}
      <Link
        href="/admin/tshirts"
        className="inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-2.5 text-sm font-semibold text-orange-700 shadow-sm transition hover:bg-orange-50 print:hidden"
      >
        <ArrowLeft size={18} />
        Back
      </Link>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <h1 className="text-3xl font-bold">Manufacturer Summary</h1>
          <p className="text-gray-500">
            Total T-Shirt breakdown for manufacturing and printing.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={exportExcel}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            <FileSpreadsheet size={18} />
            Export Excel
          </button>

          <button
            onClick={() => {
              alert("PDF button clicked");
              exportPDF();
            }}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            <FileText size={18} />
            Export PDF
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-700"
          >
            <Printer size={18} />
            Print Report
          </button>
        </div>
      </div>

      <div ref={reportRef} className="rounded-2xl bg-white p-6">
        <div className="space-y-6">
          {/* Printable Report Header */}
          <div className="hidden border-b-2 border-orange-600 pb-4 print:block">
            <div className="flex items-center gap-4">
              <Image
                src="/logo/logo.png"
                alt="Mandal Logo"
                width={80}
                height={80}
                priority
              />

              <div>
                <h1 className="text-3xl font-bold">Juliuswadi Cha Raja</h1>

                <p className="text-lg font-semibold text-orange-700">
                  Official Merchandise Manufacturer Report
                </p>

                <p className="text-sm text-gray-600">
                  Generated on: {reportDate}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Total Bookings
              </p>
              <p className="mt-2 text-3xl font-bold text-orange-600">
                {data?.totalBookings}
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Total T-Shirts Required
              </p>
              <p className="mt-2 text-3xl font-bold text-green-600">
                {data?.totalTshirts}
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <table className="w-full border-collapse text-left">
              <thead className="bg-orange-100 text-orange-900">
                <tr>
                  <th className="px-6 py-4 text-center">Sr.</th>
                  <th className="px-6 py-4 text-left">Size</th>
                  <th className="px-6 py-4 text-right">Quantity</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {data?.summary.map((row, index) => (
                  <tr key={row.value} className="border-t">
                    <td className="px-6 py-4 text-center">{index + 1}</td>
                    <td className="px-6 py-4 font-semibold">{row.size}</td>
                    <td className="px-6 py-4 text-right text-lg font-bold">
                      {row.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot className="bg-orange-600 text-white">
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-lg font-bold">
                    TOTAL
                  </td>
                  <td className="px-6 py-4 text-right text-2xl font-extrabold">
                    {data?.totalTshirts}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-10 hidden justify-between text-sm text-gray-600 print:flex">
            <div>
              Prepared By:
              <br />
              Juliuswadi Cha Raja Admin
            </div>

            <div className="text-right">
              Generated via
              <br />
              Merchandise Management System
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}