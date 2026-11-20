import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnalyticsInit from "@/components/layout/AnalyticsInit";
import StructuredData from "@/components/seo/StructuredData";
import CookieConsent from "@/components/layout/CookieConsent";

export const metadata: Metadata = {
  metadataBase: new URL("https://homecalchub.online"),
  title: {
    default: "Home Calculator Hub",
    template: "%s | Home Calculator Hub",
  },
  description:
    "Straightforward home-improvement calculators that help you estimate project quantities and plan material purchases.",
  openGraph: {
    title: "Home Calculator Hub",
    description:
      "Straightforward home-improvement calculators that help you estimate project quantities and plan material purchases.",
    type: "website",
    url: "https://homecalchub.online",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      <head>
        {gtmId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());`,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-blobs min-h-screen text-white antialiased">
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <StructuredData />
        <AnalyticsInit />
        <CookieConsent />
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
