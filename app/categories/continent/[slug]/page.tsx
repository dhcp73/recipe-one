import type { Metadata } from "next";
import { CategorySlugView } from "@/components/categories/CategorySlugView";
import {
  loadCategorySlug,
  pillarSlugMetadata,
  pillarSlugStaticParams,
} from "@/lib/categories";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pillarSlugStaticParams("continent");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return pillarSlugMetadata("continent", slug);
}

export default async function ContinentSlugPage({ params }: Props) {
  const { slug } = await params;
  const { pillar, item, matched } = loadCategorySlug("continent", slug);
  return <CategorySlugView pillar={pillar} item={item} matched={matched} />;
}
