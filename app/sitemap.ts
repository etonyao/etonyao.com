import type { MetadataRoute } from "next";
import { caseStudies } from "@/app/data/case-studies";
import { products } from "@/app/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://etonyao.com";
  return [
    { url: base },
    { url: `${base}/work` },
    { url: `${base}/interests` },
    ...products.map((p) => ({ url: `${base}/products/${p.slug}` })),
    ...Object.keys(caseStudies).map((slug) => ({ url: `${base}/work/${slug}` })),
    { url: `${base}/headliners` },
    { url: `${base}/pokemonteambuilder` },
  ];
}
