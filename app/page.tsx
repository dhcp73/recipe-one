import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SubscribeForm } from "@/components/SubscribeForm";
import { formatRecipeMeta, getFeaturedRecipes } from "@/data/recipes";
import { pillars, popularChips } from "@/data/taxonomy";
import { JsonLd } from "@/lib/seo/JsonLd";
import { itemListJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { defaultDescription, SITE_NAME } from "@/lib/site";

const featured = getFeaturedRecipes();
const heroRecipe = featured[0];
const featuredRest = featured.slice(1, 5); // 1 lead + 4 side tiles
const homeTitle = `${SITE_NAME} — Unique recipes for home cooks`;

const pillarVisual: Record<
  string,
  { icon: string; tone: string; short: string }
> = {
  continent: {
    icon: "🌍",
    tone: "continent",
    short: "Cook by world region",
  },
  country: {
    icon: "🍽️",
    tone: "country",
    short: "Cuisines with clear roots",
  },
  type: {
    icon: "🥣",
    tone: "type",
    short: "Meal moments & dish forms",
  },
  "diet-occasion": {
    icon: "🌿",
    tone: "diet",
    short: "Diet, people & occasions",
  },
};

export const metadata: Metadata = buildPageMetadata({
  title: homeTitle,
  description: defaultDescription,
  path: "/",
  absoluteTitle: true,
  image: heroRecipe?.image,
  imageAlt: heroRecipe?.imageAlt,
});

export default function HomePage() {
  return (
    <main className="wrap">
      <JsonLd
        data={webPageJsonLd({
          title: homeTitle,
          description: defaultDescription,
          path: "/",
        })}
      />
      <JsonLd
        data={itemListJsonLd(
          featured.map((r) => ({
            name: r.title,
            path: `/recipes/${r.slug}`,
          })),
          { name: "Featured recipes", path: "/" },
        )}
      />

      <section className="home-hero" aria-labelledby="home-hero-heading">
        <div className="home-hero-copy">
          <p className="section-label">Technique-forward cooking</p>
          <h1 id="home-hero-heading">
            Unique recipes for home cooks who want to know why they work.
          </h1>
          <p className="lede">
            Not another clone of the same weeknight chicken. We publish uncommon
            plates with beginner-clear steps, exact cues, and the craft behind
            every method.
          </p>
          <div className="hero-ctas">
            <Link className="btn-primary" href="/recipes">
              Browse recipes
            </Link>
            <Link className="text-link" href="/categories">
              Explore categories →
            </Link>
          </div>
          <p className="home-hero-scroll">
            Scroll to browse by Continent, Country, Food type, Diet.
          </p>
        </div>

        {heroRecipe ? (
          <div className="home-hero-feature">
            <span className="home-hero-accent" aria-hidden="true" />
            <Link
              className="home-hero-feature-card"
              href={`/recipes/${heroRecipe.slug}`}
            >
              <Image
                src={heroRecipe.image}
                alt={heroRecipe.imageAlt || heroRecipe.title}
                width={900}
                height={675}
                sizes="(max-width: 900px) 100vw, 42vw"
                priority
              />
              <div className="home-hero-feature-meta">
                <span className="home-hero-kicker">Featured recipe</span>
                <h2>{heroRecipe.shortTitle || heroRecipe.title}</h2>
                <p>
                  <span className="stars">★★★★★</span>{" "}
                  {formatRecipeMeta(heroRecipe)}
                  {heroRecipe.badges?.[0] ? ` · ${heroRecipe.badges[0]}` : ""}
                </p>
              </div>
            </Link>
          </div>
        ) : null}
      </section>

      <section
        className="home-section"
        id="browse-categories"
        aria-labelledby="browse-categories-heading"
      >
        <div className="home-section-head">
          <div>
            <p className="section-label">Browse by category</p>
            <h2 id="browse-categories-heading">
              Five doors into every recipe
            </h2>
            <p className="page-sub">
              Pick a world region, a cuisine, a dish form, how you cook — or open
              the full category map.
            </p>
          </div>
        </div>
        <div className="cat-browse-grid">
          {pillars.map((p) => {
            const visual = pillarVisual[p.id] || {
              icon: "·",
              tone: "continent",
              short: p.blurb,
            };
            return (
              <Link
                key={p.id}
                className="cat-browse-card"
                href={p.path}
                data-tone={visual.tone}
              >
                <span className="cat-browse-band" aria-hidden="true" />
                <span className="cat-browse-body">
                  <span className="cat-browse-icon" aria-hidden="true">
                    {visual.icon}
                  </span>
                  <strong>{p.label}</strong>
                  <span>{visual.short}</span>
                  <span className="cat-browse-arrow">Browse →</span>
                </span>
              </Link>
            );
          })}
          <Link
            className="cat-browse-card"
            href="/categories"
            data-tone="all"
          >
            <span className="cat-browse-band" aria-hidden="true" />
            <span className="cat-browse-body">
              <span className="cat-browse-icon" aria-hidden="true">
                🗂
              </span>
              <strong>All categories</strong>
              <span>Full map of pillars &amp; tags</span>
              <span className="cat-browse-arrow">Open hub →</span>
            </span>
          </Link>
        </div>
        <p className="popular-label">Popular right now</p>
        <div className="popular-chips">
          {popularChips.map((c) => (
            <Link key={c.href} className="popular-chip" href={c.href}>
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      <section
        className="home-section"
        aria-labelledby="featured-recipes-heading"
      >
        <div className="home-section-head">
          <div>
            <p className="section-label">Featured recipes</p>
            <h2 id="featured-recipes-heading">Start with these plates</h2>
            <p className="page-sub">
              Technique-forward dishes with beginner-clear steps and a clear why
              it works.
            </p>
          </div>
          <Link className="text-link" href="/recipes">
            View all recipes →
          </Link>
        </div>
        <div className="home-featured-grid">
          {heroRecipe ? (
            <div className="home-featured-lead">
              <Link
                className="home-feat-card"
                href={`/recipes/${heroRecipe.slug}`}
              >
                <Image
                  src={heroRecipe.image}
                  alt={heroRecipe.imageAlt || heroRecipe.title}
                  width={1200}
                  height={1500}
                  sizes="(max-width: 1100px) 100vw, 45vw"
                />
                <div className="home-feat-overlay">
                  {heroRecipe.badges?.[0] ? (
                    <span className="home-feat-badge">{heroRecipe.badges[0]}</span>
                  ) : null}
                  <h3>{heroRecipe.title}</h3>
                  <p>{formatRecipeMeta(heroRecipe)}</p>
                </div>
              </Link>
            </div>
          ) : null}
          {featuredRest.map((r) => (
            <Link
              key={r.slug}
              className="home-feat-card"
              href={`/recipes/${r.slug}`}
            >
              <Image
                src={r.image}
                alt={r.imageAlt || r.title}
                width={800}
                height={600}
                sizes="(max-width: 720px) 100vw, 28vw"
              />
              <div className="home-feat-overlay">
                {r.badges?.[0] ? (
                  <span className="home-feat-badge">{r.badges[0]}</span>
                ) : null}
                <h3>{r.shortTitle || r.title}</h3>
                <p>{formatRecipeMeta(r)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section" aria-label="How we work">
        <div className="process-row">
          <article className="process-block">
            <p className="section-label">How we select recipes</p>
            <h2>What earns a place in the library</h2>
            <p>
              We look for plates with a{" "}
              <strong>unique technique or combination</strong> — something you
              will not find cloned on every results page. Each recipe must be{" "}
              <strong>beginner-testable</strong>: a cook with basic tools should
              be able to follow it cold. If we cannot explain a clear{" "}
              <strong>why it works</strong>, it does not ship.
            </p>
            <ul>
              <li>Technique or flavour pairing that stands out</li>
              <li>Tested by someone who is not a professional chef</li>
              <li>Honest difficulty — no fake “easy” labels</li>
              <li>A short “why it works” you can actually use</li>
            </ul>
          </article>
          <article className="process-block">
            <p className="section-label">How we write recipes</p>
            <h2>Built for confusion-free beginners</h2>
            <p>
              Recipes here are written like a patient coach at your elbow. Steps
              are <strong>ultra-detailed</strong>, with a tip under every step.
              We give <strong>exact temperatures and sensory cues</strong> — not
              just “cook until done.” Ingredients are{" "}
              <strong>grouped by use</strong> so mise en place is painless.
            </p>
            <ul>
              <li>Grouped ingredients matched to each step</li>
              <li>Titled steps with tip callouts underneath</li>
              <li>Thermometer targets and pan cues in plain language</li>
              <li>What to do when the pan runs hot or the relish tastes flat</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="home-section about-teaser">
        <div>
          <p className="section-label">About us</p>
          <h2>A solid cooking site, not an app pitch</h2>
          <p>
            Uncommon Kitchen pairs clear recipe structure with the technique
            depth of a cooking school. We publish unique recipes, explain why
            each method works, and keep the writing beginner-friendly — so you
            can cook with confidence at the counter.
          </p>
        </div>
        <Link className="btn-primary" href="/about">
          Read about us
        </Link>
      </section>

      <section className="home-section">
        <div className="subscribe-band">
          <p className="section-label">Stay in the loop</p>
          <h2>Weekly uncommon recipes</h2>
          <p>
            One thoughtful plate a week — technique notes, shopping cues, and
            nothing generic. Mock signup only; nothing is sent.
          </p>
          <SubscribeForm />
        </div>
      </section>
    </main>
  );
}
