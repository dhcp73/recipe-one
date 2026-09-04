import type { Metadata } from "next";
import { PillarHub } from "@/components/categories/PillarHub";
import { getPillar } from "@/data/taxonomy";
import { pillarHubMetadata } from "@/lib/categories";

export const metadata: Metadata = pillarHubMetadata("type");

export default function TypeHubPage() {
  return <PillarHub pillar={getPillar("type")!} />;
}
