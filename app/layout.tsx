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
  metadataBase: new URL("https://juliuswadicharaja.vercel.app"),

  title: {
    default: "Juliuswadi Cha Raja",
    template: "%s | Juliuswadi Cha Raja",
  },

  description:
    "Official website of Juliuswadi Cha Raja Ganpati Mandal. Read Marathi Aartis, festival updates, gallery, committee information, donation details and more.",

  keywords: [
    "Juliuswadi Cha Raja",
    "Ganpati Mandal",
    "Ganesh Festival",
    "Ganpati",
    "Ganesh Chaturthi",
    "Marathi Aarti",
    "Ganpati Aarti",
    "Kolhapur Ganpati",
    "Maharashtra Ganesh Mandal",
    "Ganesh Utsav",
  ],

  authors: [
    {
      name: "Juliuswadi Cha Raja",
    },
  ],

  creator: "Jay More",

  publisher: "Jay More",

  applicationName: "Juliuswadi Cha Raja",

  category: "Religious Organization",

  openGraph: {
    title: "Juliuswadi Cha Raja",
    description:
      "Official website of Juliuswadi Cha Raja Ganpati Mandal.",

    url: "https://juliuswadicharaja.vercel.app",

    siteName: "Juliuswadi Cha Raja",

    locale: "en_IN",

    type: "website",

    images: [
      {
        url: "/logo/logo.png",
        width: 512,
        height: 512,
        alt: "Juliuswadi Cha Raja",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Juliuswadi Cha Raja",

    description:
      "Official website of Juliuswadi Cha Raja Ganpati Mandal.",

    images: ["/logo/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo/logo.png",
  },
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