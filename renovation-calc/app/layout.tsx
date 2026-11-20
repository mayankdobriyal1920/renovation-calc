import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnalyticsInit from "@/components/layout/AnalyticsInit";

export const metadata: Metadata = {
  metadataBase: new URL("https://homecalchub.online"),
  title: {
    default: "Home Renovation Calculator Hub",
    template: "%s | RenovationCalc",
  },
  description:
    "Straightforward home-improvement calculators that help you estimate project quantities and plan material purchases.",
  openGraph: {
    title: "Home Renovation Calculator Hub",
    description:
      "Straightforward home-improvement calculators that help you estimate project quantities and plan material purchases.",
    type: "website",
    url: "https://homecalchub.online",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-blobs min-h-screen text-white antialiased">
        <AnalyticsInit />
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
