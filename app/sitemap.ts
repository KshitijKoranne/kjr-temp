import type { MetadataRoute } from "next";
import { brand, projects } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/lab/", "/privacy/", ...projects.map((p) => `/work/${p.slug}/`)].map((u) => ({ url: `${brand.url}${u}` }));
}
