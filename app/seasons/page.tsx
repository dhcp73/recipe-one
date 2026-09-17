import type { Metadata } from "next";
import Link from "next/link";
import { seasons } from "@/data/seasons";
import { getRecipesBySeasonTags } from "@/data/recipes";
import { JsonLd } from "@/lib/seo/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Seasons & festivals";
const DESCRIPTION =
  "Browse Uncommon Kitchen by festive season — Halloween, Bonfire Night, Diwali, Thanksgiving & Friendsgiving, and Christmas.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/seasons",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Seasons", path: "/seasons" },
];

export default function SeasonsHubPage() {
  return (
    <main className="wrap">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={collectionPageJsonLd({
          title: TITLE,
          description: DESCRIPTION,
          path: "/seasons",
          items: seasons.map((s) => ({ name: s.label, path: `/seasons/${s.slug}` })),
        })}
      />
      <p className="breadcrumb">
        <Link href="/">Home</Link> › Seasons
      </p>
      <h1>Seasons &amp; festivals</h1>
      <p className="cat-intro">
        Technique-forward plates for the autumn–winter calendar. Each hub
        gathers recipes tagged for that moment — calm reading, clear cues, no
        filler.
      </p>
      <div className="cat-pillar-grid">
        {seasons.map((season) => {
          const count = getRecipesBySeasonTags(season.tags).length;
          return (
            <Link
              key={season.slug}
              className="cat-pillar-card"
              href={`/seasons/${season.slug}`}
            >
              <h2>{season.label}</h2>
              <p>{season.description}</p>
              <span className="cat-count">
                {count} recipe{count === 1 ? "" : "s"}
              </span>
            </Link>
          );
        })}
      </div>
      <p className="cat-filter-note">
        Prefer the full taxonomy? Season tags also live under{" "}
        <Link className="text-link" href="/categories/diet-occasion">
          Diet &amp; occasion
        </Link>
        .
      </p>
    </main>
  );
}
