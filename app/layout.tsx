import type { Metadata } from "next";
import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import StructuredData from "@/components/seo/StructuredData";

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
  metadataBase: new URL(
    "https://juliuswadi-cha-raja.vercel.app"
  ),

  title: {
    default: "Juliuswadi Cha Raja",
    template: "%s | Juliuswadi Cha Raja",
  },

  description:
    "Official website of Juliuswadi Cha Raja Ganpati Mandal. Read Marathi Aartis, festival updates, gallery, committee information, donation details and more.",

  keywords: [
    "Juliuswadi Cha Raja",
    "Juliuswadi Sarvajanik Ganeshotsav",
    "Ganpati Mandal",
    "Ganesh Festival",
    "Ganesh Chaturthi",
    "Ganpati",
    "Ganesh Utsav",
    "Marathi Aarti",
    "Ganpati Aarti",
    "Mumbai Ganpati",
    "Malad Ganpati",
    "Malwani Ganpati",
    "Maharashtra Ganesh Mandal",
  ],

  authors: [
    {
      name: "Jay More",
    },
  ],

  creator: "Jay More",

  publisher: "Juliuswadi Cha Raja",

  applicationName: "Juliuswadi Cha Raja",

  category: "Religious Organization",

  verification: {
    google: "7unGvg0Sz1wbgDZsxaYvKMUpBzsdOv3NitHBEpOTzew",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Juliuswadi Cha Raja",

    description:
      "Official website of Juliuswadi Cha Raja Ganpati Mandal.",

    url: "https://juliuswadi-cha-raja.vercel.app",

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

  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
  },

  appleWebApp: {
    capable: true,
    title: "Juliuswadi Cha Raja",
    statusBarStyle: "default",
  },

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
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
        <StructuredData />

        {children}
      </body>

      <GoogleAnalytics gaId="G-6VMC2M8XRX" />
    </html>
  );
}