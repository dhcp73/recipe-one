import Link from "next/link";
import { getPillarSlugs, type Pillar } from "@/data/taxonomy";
import { JsonLd } from "@/lib/seo/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo/jsonld";

export function PillarHub({ pillar }: { pillar: Pillar }) {
  const slugs = getPillarSlugs(pillar);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: pillar.label, path: pillar.path },
  ];

  return (
    <main className="wrap">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={collectionPageJsonLd({
          title: pillar.label,
          description: pillar.blurb,
          path: pillar.path,
          items: slugs.map((s) => ({
            name: s.label,
            path: `${pillar.path}/${s.slug}`,
          })),
        })}
      />
      <p className="breadcrumb">
        <Link href="/">Home</Link> › <Link href="/categories">Categories</Link> ›{" "}
        {pillar.label}
      </p>
      <h1>{pillar.label}</h1>
      <p className="cat-intro">{pillar.blurb}</p>

      {pillar.groups ? (
        pillar.groups.map((g) => (
          <section key={g.id} className="home-section">
            <h2>{g.label}</h2>
            <div className="cat-browse-grid">
              {g.slugs.map((s) => (
                <Link
                  key={s.slug}
                  className="cat-browse-card"
                  href={`${pillar.path}/${s.slug}`}
                >
                  <span className="cat-browse-band" aria-hidden="true" />
                  <span className="cat-browse-body">
                    <strong>{s.label}</strong>
                    <span>Browse {s.label.toLowerCase()} recipes</span>
                    <span className="cat-browse-arrow">Open →</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="cat-browse-grid">
          {slugs.map((s) => (
            <Link
              key={s.slug}
              className="cat-browse-card"
              href={`${pillar.path}/${s.slug}`}
            >
              <span className="cat-browse-band" aria-hidden="true" />
              <span className="cat-browse-body">
                <strong>{s.label}</strong>
                <span>
                  {s.description ||
                    (s.continent
                      ? `Cuisine from ${s.continent.replace(/-/g, " ")}`
                      : `Browse ${s.label} recipes`)}
                </span>
                <span className="cat-browse-arrow">Open →</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
