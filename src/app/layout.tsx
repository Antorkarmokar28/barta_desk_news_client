import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barta Desk",
  description:
    "Barta Desk - Get the latest Bengali news on politics, entertainment, sports, technology, and more. Stay updated with reliable and fast news coverage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.className} antialiased`}
        >
          <Toaster richColors position="top-center" />
          <div className="min-h-screen">{children}</div>
        </body>
      </html>
    </Providers>
  );
}
