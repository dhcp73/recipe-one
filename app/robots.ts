import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/taxonomy";

const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Google-Extended",
] as const;

export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL.replace(/\/$/, "");
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" as const })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
