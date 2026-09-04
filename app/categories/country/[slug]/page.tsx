import type { Metadata } from "next";
import { CategorySlugView } from "@/components/categories/CategorySlugView";
import {
  loadCategorySlug,
  pillarSlugMetadata,
  pillarSlugStaticParams,
} from "@/lib/categories";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pillarSlugStaticParams("country");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return pillarSlugMetadata("country", slug);
}

export default async function CountrySlugPage({ params }: Props) {
  const { slug } = await params;
  const { pillar, item, matched } = loadCategorySlug("country", slug);
  return <CategorySlugView pillar={pillar} item={item} matched={matched} />;
}
