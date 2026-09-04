import type { MetadataRoute } from "next";
import { recipes } from "@/data/recipes";
import { getPillarSlugs, pillars, SITE_URL } from "@/data/taxonomy";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/recipes",
    "/shop",
    "/chef",
    "/about",
    "/categories",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const recipeRoutes: MetadataRoute.Sitemap = recipes.map((r) => ({
    url: `${base}/recipes/${r.slug}`,
    lastModified: new Date(r.publishedAt),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = [];
  for (const pillar of pillars) {
    categoryRoutes.push({
      url: `${base}${pillar.path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
    for (const slug of getPillarSlugs(pillar)) {
      categoryRoutes.push({
        url: `${base}${pillar.path}/${slug.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return [...staticRoutes, ...recipeRoutes, ...categoryRoutes];
}
