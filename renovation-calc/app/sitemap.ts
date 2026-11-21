import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://homecalchub.online";
  const lastModified = new Date();
  const paths = [
    "",
    "/calculators",
    "/calculators/square-footage",
    "/calculators/concrete-slab",
    "/calculators/flooring",
    "/calculators/paint",
    "/calculators/fence-material",
    "/calculators/deck-material",
    "/calculators/roof-area-pitch",
    "/calculators/renovation-budget",
    "/guides",
    "/guides/how-to-measure-a-room",
    "/guides/how-to-calculate-concrete-volume",
    "/guides/how-to-estimate-paint-coverage",
    "/guides/how-to-measure-a-fence",
    "/guides/how-to-estimate-deck-board-quantities",
    "/guides/how-roof-pitch-affects-roof-area",
    "/guides/how-to-create-a-renovation-materials-budget",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
    "/cookie-policy",
  ];
  return paths.map((p) => ({
    url: `${base}${p === "" ? "/" : p}`,
    lastModified,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p === "/calculators" || p === "/guides" ? 0.8 : 0.6,
  }));
}