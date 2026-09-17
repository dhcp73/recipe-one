import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RecipeCard } from "@/components/RecipeCard";
import {
  getAllSeasonSlugs,
  getSeason,
  seasons,
} from "@/data/seasons";
import { getRecipesBySeasonTags } from "@/data/recipes";
import { JsonLd } from "@/lib/seo/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSeasonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const season = getSeason(slug);
  if (!season) return { title: "Season" };
  return buildPageMetadata({
    title: `${season.label} recipes`,
    description: season.description,
    path: `/seasons/${season.slug}`,
  });
}

export default async function SeasonSlugPage({ params }: Props) {
  const { slug } = await params;
  const season = getSeason(slug);
  if (!season) notFound();

  const matched = getRecipesBySeasonTags(season.tags);
  const path = `/seasons/${season.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Seasons", path: "/seasons" },
    { name: season.label, path },
  ];
  const description = `${season.description} ${
    matched.length
      ? `Showing ${matched.length} matching plate${matched.length === 1 ? "" : "s"}.`
      : "More recipes for this season are coming soon."
  }`;

  return (
    <main className="wrap">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={collectionPageJsonLd({
          title: `${season.label} recipes`,
          description,
          path,
          items: matched.map((r) => ({
            name: r.title,
            path: `/recipes/${r.slug}`,
          })),
        })}
      />
      <p className="breadcrumb">
        <Link href="/">Home</Link> › <Link href="/seasons">Seasons</Link> ›{" "}
        {season.label}
      </p>
      <p className="season-kicker">Season hub</p>
      <h1>{season.label}</h1>
      <p className="cat-intro">{description}</p>

      <div className="season-chip-row" aria-label="Other seasons">
        {seasons.map((s) => (
          <Link
            key={s.slug}
            className={`season-chip${s.slug === season.slug ? " is-active" : ""}`}
            href={`/seasons/${s.slug}`}
          >
            {s.shortLabel}
          </Link>
        ))}
      </div>

      {matched.length ? (
        <div className="card-grid">
          {matched.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      ) : (
        <p className="page-sub">
          No seeded recipes for this season yet.{" "}
          <Link className="text-link" href="/recipes">
            Browse all recipes →
          </Link>
        </p>
      )}
    </main>
  );
}
