import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact RenovationCalc.",
  alternates: { canonical: "/contact/" },
};

export default function Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <article className="mt-6 glass-card rounded-3xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-white">Contact</h1>
        <p className="mt-3 text-white/70">
          Have a question, found an error, or want to suggest a calculator? Reach out via email.
        </p>
        <p className="mt-4 text-white/80">
          Email:{" "}
          <a href="mailto:hello@homecalchub.online" className="text-orange-300 underline">
            hello@homecalchub.online
          </a>
        </p>
        <p className="mt-3 text-sm text-white/60">
          Please do not send personal project details, addresses or sensitive information.
        </p>
      </article>
    </div>
  );
}
