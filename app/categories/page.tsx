import type { Metadata } from "next";
import Link from "next/link";
import { getPillarSlugs, pillars } from "@/data/taxonomy";
import { JsonLd } from "@/lib/seo/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Categories";
const DESCRIPTION =
  "Browse Uncommon Kitchen by continent, country, food type, and diet & occasion.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/categories",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
];

export default function CategoriesPage() {
  return (
    <main className="wrap">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={collectionPageJsonLd({
          title: TITLE,
          description: DESCRIPTION,
          path: "/categories",
          items: pillars.map((p) => ({ name: p.label, path: p.path })),
        })}
      />
      <p className="breadcrumb">
        <Link href="/">Home</Link> › Categories
      </p>
      <h1>Categories</h1>
      <p className="cat-intro">
        Browse Uncommon Kitchen by four shallow pillars — continent, country,
        food type, and diet &amp; occasion. Combine tags (for example vegan +
        summer or italy + weeknight) to find technique-forward recipes fast.
      </p>
      <div className="cat-meta-chips">
        <span className="cat-chip">52 category pages</span>
        <span className="cat-chip">4 pillars</span>
        <span className="cat-chip">Shallow taxonomy</span>
      </div>
      <div className="cat-pillar-grid">
        {pillars.map((p) => {
          const count = getPillarSlugs(p).length;
          const countLabel =
            p.id === "continent"
              ? `${count} continents`
              : p.id === "country"
                ? `${count} countries`
                : p.id === "type"
                  ? `${count} types`
                  : `${count} tags`;
          return (
            <Link key={p.id} className="cat-pillar-card" href={p.path}>
              <h2>{p.label}</h2>
              <p>{p.blurb}</p>
              <span className="cat-count">{countLabel}</span>
            </Link>
          );
        })}
      </div>
      <p className="cat-filter-note">
        <strong>Tip:</strong> Combine filters — try{" "}
        <em>vegan + summer · italy + weeknight · high-protein + meal-prep</em>{" "}
        when browsing the full library.
      </p>
    </main>
  );
}
