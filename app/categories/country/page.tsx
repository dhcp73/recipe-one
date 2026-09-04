import type { Metadata } from "next";
import { PillarHub } from "@/components/categories/PillarHub";
import { getPillar } from "@/data/taxonomy";
import { pillarHubMetadata } from "@/lib/categories";

export const metadata: Metadata = pillarHubMetadata("country");

export default function CountryHubPage() {
  return <PillarHub pillar={getPillar("country")!} />;
}
