import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";

export default function NotFound() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "404" }]} />
      <div className="mt-6 glass-card rounded-3xl p-10 text-center">
        <div className="text-6xl">🔍</div>
        <h1 className="mt-4 text-3xl font-bold text-white">Page not found</h1>
        <p className="mt-2 text-white/70">
          The page you are looking for does not exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
