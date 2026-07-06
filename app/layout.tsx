import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Juliuswadi Cha Raja",
  description: "Official Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={2500}
        />
      </body>
    </html>
  );
}