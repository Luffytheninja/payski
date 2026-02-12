import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Payski",
  description: "Payski personal finance app with dashboard, goals, timeline, and insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
