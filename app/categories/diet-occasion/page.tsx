import type { Metadata } from "next";
import { PillarHub } from "@/components/categories/PillarHub";
import { getPillar } from "@/data/taxonomy";
import { pillarHubMetadata } from "@/lib/categories";

export const metadata: Metadata = pillarHubMetadata("diet-occasion");

export default function DietOccasionHubPage() {
  return <PillarHub pillar={getPillar("diet-occasion")!} />;
}
