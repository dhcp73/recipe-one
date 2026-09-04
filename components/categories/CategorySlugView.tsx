import Link from "next/link";
import { RecipeCard } from "@/components/RecipeCard";
import type { Recipe } from "@/data/recipes";
import type { Pillar, TaxonomySlug } from "@/data/taxonomy";
import { JsonLd } from "@/lib/seo/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo/jsonld";

export function CategorySlugView({
  pillar,
  item,
  matched,
}: {
  pillar: Pillar;
  item: TaxonomySlug;
  matched: Recipe[];
}) {
  const path = `${pillar.path}/${item.slug}`;
  const description =
    item.description ||
    `Technique-forward recipes tagged ${item.label}. ${
      matched.length
        ? `Showing ${matched.length} matching plate${matched.length === 1 ? "" : "s"}.`
        : "More recipes for this tag are coming soon — explore the full library meanwhile."
    }`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: pillar.label, path: pillar.path },
    { name: item.label, path },
  ];

  return (
    <main className="wrap">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={collectionPageJsonLd({
          title: `${item.label} recipes`,
          description,
          path,
          items: matched.map((r) => ({
            name: r.title,
            path: `/recipes/${r.slug}`,
          })),
        })}
      />
      <p className="breadcrumb">
        <Link href="/">Home</Link> › <Link href="/categories">Categories</Link> ›{" "}
        <Link href={pillar.path}>{pillar.label}</Link> › {item.label}
      </p>
      <h1>{item.label}</h1>
      <p className="cat-intro">{description}</p>

      {matched.length ? (
        <div className="card-grid">
          {matched.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      ) : (
        <p className="page-sub">
          No seeded recipes for this tag yet.{" "}
          <Link className="text-link" href="/recipes">
            Browse all recipes →
          </Link>
        </p>
      )}

      {item.continent ? (
        <p className="page-sub" style={{ marginTop: 24 }}>
          Continent:{" "}
          <Link href={`/categories/continent/${item.continent}`}>
            {item.continent.replace(/-/g, " ")}
          </Link>
        </p>
      ) : null}
    </main>
  );
}
