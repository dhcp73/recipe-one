import type { Metadata } from "next";
import { CategorySlugView } from "@/components/categories/CategorySlugView";
import {
  loadCategorySlug,
  pillarSlugMetadata,
  pillarSlugStaticParams,
} from "@/lib/categories";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pillarSlugStaticParams("diet-occasion");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return pillarSlugMetadata("diet-occasion", slug);
}

export default async function DietOccasionSlugPage({ params }: Props) {
  const { slug } = await params;
  const { pillar, item, matched } = loadCategorySlug("diet-occasion", slug);
  return <CategorySlugView pillar={pillar} item={item} matched={matched} />;
}
