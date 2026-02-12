import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://payski.app"),
  title: {
    default: "Payski | Move Money at the Speed of Now",
    template: "%s | Payski",
  },
  description:
    "Payski is a cyber-styled finance experience for instant transfers, smart spending insights, and goal tracking in one fast dashboard.",
  applicationName: "Payski",
  keywords: [
    "Payski",
    "digital wallet",
    "personal finance",
    "instant transfers",
    "money management",
    "financial insights",
  ],
  openGraph: {
    type: "website",
    url: "/",
    title: "Payski | Move Money at the Speed of Now",
    description:
      "Control spending, track goals, and preview instant money movement with Payski's bold fintech demo experience.",
    siteName: "Payski",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payski | Move Money at the Speed of Now",
    description:
      "A high-energy finance demo for instant transfers, live-style activity, and goal-based money control.",
    creator: "@payskiapp",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
