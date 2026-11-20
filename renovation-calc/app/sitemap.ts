import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com";
  const paths = [
    "",
    "/calculators/",
    "/calculators/square-footage/",
    "/calculators/concrete-slab/",
    "/calculators/flooring/",
    "/calculators/paint/",
    "/calculators/fence-material/",
    "/calculators/deck-material/",
    "/calculators/roof-area-pitch/",
    "/calculators/renovation-budget/",
    "/guides/",
    "/about/",
    "/contact/",
    "/privacy-policy/",
    "/terms/",
    "/disclaimer/",
    "/cookie-policy/",
  ];
  return paths.map((p) => ({ url: `${base}${p}`, lastModified: new Date() }));
}