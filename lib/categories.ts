import type { Metadata } from "next";
import { getRecipesByCategory } from "@/data/recipes";
import {
  getCategorySlug,
  getPillar,
  getPillarSlugs,
  type PillarId,
} from "@/data/taxonomy";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { notFound } from "next/navigation";

export function pillarHubMetadata(pillarId: PillarId): Metadata {
  const pillar = getPillar(pillarId)!;
  return buildPageMetadata({
    title: pillar.label,
    description: pillar.blurb,
    path: pillar.path,
  });
}

export function pillarSlugStaticParams(pillarId: PillarId) {
  const pillar = getPillar(pillarId)!;
  return getPillarSlugs(pillar).map((s) => ({ slug: s.slug }));
}

export async function pillarSlugMetadata(
  pillarId: PillarId,
  slug: string,
): Promise<Metadata> {
  const pillar = getPillar(pillarId)!;
  const item = getCategorySlug(pillarId, slug);
  if (!item) return { title: "Category" };
  return buildPageMetadata({
    title: `${item.label} recipes`,
    description: `Technique-forward ${item.label} recipes from Uncommon Kitchen.`,
    path: `${pillar.path}/${item.slug}`,
  });
}

export function loadCategorySlug(pillarId: PillarId, slug: string) {
  const pillar = getPillar(pillarId)!;
  const item = getCategorySlug(pillarId, slug);
  if (!item) notFound();
  const matched = getRecipesByCategory(pillarId, slug);
  return { pillar, item, matched };
}
