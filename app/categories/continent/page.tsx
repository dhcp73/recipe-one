import type { Metadata } from "next";
import { PillarHub } from "@/components/categories/PillarHub";
import { getPillar } from "@/data/taxonomy";
import { pillarHubMetadata } from "@/lib/categories";

export const metadata: Metadata = pillarHubMetadata("continent");

export default function ContinentHubPage() {
  return <PillarHub pillar={getPillar("continent")!} />;
}
