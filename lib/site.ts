import { SITE_NAME, SITE_URL } from "@/data/taxonomy";

export { SITE_NAME, SITE_URL };

export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const defaultDescription =
  "Unique recipes for home cooks who want to know why they work — beginner-clear steps, exact cues, and technique depth.";
