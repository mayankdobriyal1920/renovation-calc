import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Home Calculator Hub home renovation calculators.",
  alternates: { canonical: "/privacy-policy/" },
};

export default function Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <article className="mt-6 glass-card rounded-3xl p-6 sm:p-10 prose prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="mt-3 text-white/70 text-sm">Last updated: 20 November 2026</p>

        <h2 className="mt-6 text-xl font-semibold text-white">Overview</h2>
        <p className="mt-2 text-white/70">
          Home Calculator Hub provides browser-based home-improvement calculators. Calculations run in
          your browser. We do not require accounts and do not store your project data on our servers.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-white">Information we may collect</h2>
        <ul className="mt-2 list-disc pl-5 text-white/70 space-y-1">
          <li>Basic usage analytics (page views, device type, referrer) if analytics is enabled.</li>
          <li>Technical data such as IP address and browser type, collected automatically by hosting.</li>
          <li>Any information you voluntarily send via the contact form.</li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold text-white">Cookies and advertising</h2>
        <p className="mt-2 text-white/70">
          We may use Google AdSense to display advertisements on this site. Google and its partners
          use cookies to serve ads based on your prior visits to this website and other websites on
          the Internet. Google&apos;s use of advertising cookies enables it and its partners to serve
          ads to you based on your visit to this site and/or other sites on the Internet.
        </p>
        <p className="mt-2 text-white/70">
          You may opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            className="text-orange-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>
          . You can also opt out of third-party vendor cookies by visiting the{" "}
          <a
            href="https://optout.networkadvertising.org/"
            className="text-orange-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Network Advertising Initiative opt-out page
          </a>
          .
        </p>
        <p className="mt-2 text-white/70">
          For more information about how Google collects and uses data, please visit{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            className="text-orange-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s Advertising Privacy &amp; Terms
          </a>
          . See our Cookie Policy for additional details.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-white">Browser storage</h2>
        <p className="mt-2 text-white/70">
          Some calculators may store inputs locally in your browser (localStorage) so you can resume
          work. This data stays on your device and is not transmitted to us.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-white">Your choices</h2>
        <p className="mt-2 text-white/70">
          You can disable cookies in your browser, use privacy-focused tools, or contact us with
          questions. We do not sell personal information.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-white">Contact</h2>
        <p className="mt-2 text-white/70">
          Questions about this policy? Use the contact page.
        </p>
      </article>
    </div>
  );
}
