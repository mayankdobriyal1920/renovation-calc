import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for RenovationCalc home renovation calculators.",
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
          RenovationCalc provides browser-based home-improvement calculators. Calculations run in
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
          If advertising (such as Google AdSense) is enabled, third-party vendors may use cookies to
          serve ads based on prior visits. You can opt out via your browser settings or the
          vendor&apos;s opt-out tools. See our Cookie Policy for details.
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
