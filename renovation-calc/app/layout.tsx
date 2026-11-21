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
    default: "Home Improvement Calculators | HomeCalcHub",
    template: "%s | HomeCalcHub",
  },
  description:
    "Straightforward home-improvement calculators for square footage, concrete, flooring, paint, fencing and more. Free, no sign-up.",
  openGraph: {
    title: "Home Improvement Calculators | HomeCalcHub",
    description:
      "Straightforward home-improvement calculators for square footage, concrete, flooring, paint, fencing and more. Free, no sign-up.",
    type: "website",
    url: "https://homecalchub.online",
    siteName: "HomeCalcHub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HomeCalcHub - Home Improvement Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Improvement Calculators | HomeCalcHub",
    description:
      "Straightforward home-improvement calculators for square footage, concrete, flooring, paint, fencing and more. Free, no sign-up.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
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
        {/* Google AdSense verification & ad serving */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3366036914417048"
          crossOrigin="anonymous"
        />
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
