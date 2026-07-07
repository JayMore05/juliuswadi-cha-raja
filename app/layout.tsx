import type { Metadata } from "next";
import "./globals.css";

import {
  Inter,
  Cormorant_Garamond,
  Noto_Serif_Devanagari,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Juliuswadi Cha Raja",
  description: "Official Website of Juliuswadi Cha Raja Ganpati Mandal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.variable}
          ${cormorant.variable}
          ${devanagari.variable}
          font-body
          bg-[#FFF8F2]
          text-slate-800
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}