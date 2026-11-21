import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie policy for Home Calculator Hub.",
  alternates: { canonical: "/cookie-policy" },
  openGraph: { url: "https://homecalchub.online/cookie-policy" },
};

export default function Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cookie Policy" }]} />
      <article className="mt-6 glass-card rounded-3xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-white">Cookie Policy</h1>
        <p className="mt-3 text-white/70 text-sm">Last updated: 20 November 2026</p>

        <h2 className="mt-6 text-xl font-semibold text-white">What are cookies</h2>
        <p className="mt-2 text-white/70">
          Cookies are small text files stored on your device by your browser. They help sites
          remember preferences and measure usage.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-white">How we use cookies</h2>
        <ul className="mt-2 list-disc pl-5 text-white/70 space-y-1">
          <li>Essential cookies required for the site to function.</li>
          <li>Analytics cookies (if enabled) to understand usage.</li>
          <li>
            Advertising cookies used by Google AdSense and other third-party ad networks to serve
            relevant ads based on your browsing activity. Google may use the DoubleClick cookie to
            serve ads on this site.
          </li>
        </ul>
        <h2 className="mt-6 text-xl font-semibold text-white">Google AdSense cookies</h2>
        <p className="mt-2 text-white/70">
          When AdSense is enabled, Google uses cookies (including the DoubleClick cookie) to serve
          ads based on your visits to this site and other sites on the Internet. You can opt out of
          the DoubleClick cookie for interest-based advertising by visiting{" "}
          <a
            href="https://adssettings.google.com"
            className="text-orange-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>
          . You can also opt out via the{" "}
          <a
            href="https://optout.aboutads.info/"
            className="text-orange-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Digital Advertising Alliance opt-out page
          </a>
          .
        </p>

        <h2 className="mt-6 text-xl font-semibold text-white">Your control</h2>
        <p className="mt-2 text-white/70">
          You can block or delete cookies in your browser settings. Some features may not work as
          expected without cookies.
        </p>
      </article>
    </div>
  );
}
