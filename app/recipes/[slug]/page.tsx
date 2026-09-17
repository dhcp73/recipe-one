import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatClock,
  formatQty,
  getAllRecipeSlugs,
  getRecipe,
} from "@/data/recipes";
import { getRecipeSeasonTags } from "@/data/seasons";
import { JsonLd } from "@/lib/seo/JsonLd";
import {
  breadcrumbJsonLd,
  recipeBreadcrumbItems,
  recipeJsonLd,
  recipeKeywords,
  webPageJsonLd,
} from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { SITE_NAME } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllRecipeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) return { title: "Recipe not found" };
  return buildPageMetadata({
    title: recipe.title,
    description: recipe.excerpt,
    path: `/recipes/${recipe.slug}`,
    image: recipe.image,
    imageAlt: recipe.imageAlt,
    keywords: recipeKeywords(recipe),
    ogType: "article",
  });
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  const published = new Date(recipe.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Europe/London",
  });

  const crumbs = recipeBreadcrumbItems(recipe);
  const seasonTags = getRecipeSeasonTags(recipe.dietOccasion);

  return (
    <main className="wrap recipe-page">
      <JsonLd
        data={webPageJsonLd({
          title: recipe.title,
          description: recipe.excerpt,
          path: `/recipes/${recipe.slug}`,
        })}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={recipeJsonLd(recipe)} />

      <p className="breadcrumb">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <span key={crumb.path}>
              {i > 0 ? " › " : null}
              {isLast ? (
                crumb.name
              ) : (
                <Link href={crumb.path}>{crumb.name}</Link>
              )}
            </span>
          );
        })}
      </p>

      {seasonTags.length ? (
        <div className="season-badge-row" aria-label="Seasons">
          {seasonTags.map((season) => (
            <Link
              key={season.slug}
              className="season-badge"
              href={`/seasons/${season.slug}`}
            >
              {season.shortLabel}
            </Link>
          ))}
        </div>
      ) : null}

      <h1>{recipe.title}</h1>
      <div className="byline-row">
        <span>
          By <Link href="/about">{recipe.author || SITE_NAME}</Link> · {published}
        </span>
        <span className="rating-quiet">
          <span className="stars">★★★★★</span> {recipe.rating.toFixed(1)} ·{" "}
          {recipe.ratingCount} ratings
        </span>
      </div>

      <div className="recipe-tools">
        <a className="util-btn jump-inline" href="#recipe">
          Jump to recipe
        </a>
        <button type="button" className="util-btn cook-mode">
          Cook Mode
        </button>
        <button type="button" className="util-btn">
          Print
        </button>
        <Link className="util-btn" href="/chef">
          Ask Chef AI
        </Link>
      </div>

      <a className="jump-btn" href="#recipe">
        Jump to Recipe
      </a>

      <section className="why" aria-label="Why this recipe works">
        <h2>Why this recipe works</h2>
        <ul>
          {recipe.whyItWorks.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <Image
        className="recipe-hero-img hero"
        src={recipe.image}
        alt={recipe.imageAlt}
        width={1400}
        height={900}
        priority
      />
      {recipe.caption ? <p className="caption">{recipe.caption}</p> : null}
      <p className="intro">{recipe.excerpt}</p>

      <section className="recipe-card" id="recipe">
        <h2 className="recipe-card-title">{recipe.title}</h2>
        <div className="meta-box">
          <div className="meta-item">
            <span className="meta-label">Prep</span>
            <span className="meta-value">{formatClock(recipe.prepMinutes)}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Cook</span>
            <span className="meta-value">{formatClock(recipe.cookMinutes)}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Total</span>
            <span className="meta-value">{formatClock(recipe.totalMinutes)}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Servings</span>
            <span className="meta-value">{recipe.servings}</span>
          </div>
        </div>

        <div className="pantry-check">
          <strong>Pantry check:</strong> Tick ingredients you have. Gaps can go
          to your shopping list or Chef AI for swaps.
        </div>
        <div className="card-actions">
          <Link href="/shop">Shop kit</Link>
          <Link href="/chef">Ask Chef AI</Link>
        </div>

        <div className="recipe-split">
          <aside className="recipe-ingredients-col">
            <div className="ingredients-sticky">
              <h3>Ingredients</h3>
              {recipe.ingredientGroups.map((group) => (
                <div key={group.label}>
                  <p className="group-label">{group.label}</p>
                  <ul className="ingredients">
                    {group.items.map((item) => (
                      <li key={item.id}>
                        <input type="checkbox" id={item.id} />
                        <label htmlFor={item.id}>
                          {item.qty != null ? (
                            <span className="qty">{formatQty(item.qty)} </span>
                          ) : null}
                          {item.text}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          <div className="recipe-directions-col">
            <h3 className="directions-h">Directions</h3>
            <ol className="steps">
              {recipe.steps.map((step, i) => {
                const mediaVideo = step.videoUrl;
                const mediaGif = !mediaVideo ? step.gifUrl : undefined;
                const mediaImage =
                  !mediaVideo && !mediaGif ? step.image : undefined;
                const hasMedia = Boolean(mediaVideo || mediaGif || mediaImage);

                return (
                  <li key={step.title}>
                    <span className="step-n" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div className="step-body">
                      <h4>
                        <span className="sr-only">Step {i + 1}. </span>
                        {step.title}
                      </h4>
                      {hasMedia ? (
                        <div className="step-media">
                          {mediaVideo ? (
                            <video
                              className="step-media-el"
                              src={mediaVideo}
                              muted
                              playsInline
                              loop
                              autoPlay
                              preload={i === 0 ? "metadata" : "none"}
                              aria-label={
                                step.imageAlt ?? `${step.title} demonstration`
                              }
                            />
                          ) : null}
                          {mediaGif ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              className="step-media-el"
                              src={mediaGif}
                              alt={
                                step.imageAlt ?? `${step.title} demonstration`
                              }
                              loading={i === 0 ? "eager" : "lazy"}
                            />
                          ) : null}
                          {mediaImage ? (
                            <Image
                              className="step-media-el"
                              src={mediaImage}
                              alt={step.imageAlt ?? step.title}
                              width={800}
                              height={600}
                              sizes="(max-width: 720px) 100vw, 640px"
                              loading={i === 0 ? "eager" : "lazy"}
                            />
                          ) : null}
                        </div>
                      ) : null}
                      <p>{step.body}</p>
                      {step.visualCue ? (
                        <p className="visual-cue">
                          <strong>Look for:</strong> {step.visualCue}
                        </p>
                      ) : null}
                      {step.tip ? (
                        <p className="tip">
                          <strong>Tip:</strong> {step.tip}
                        </p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>

            {recipe.equipment.length ? (
              <div className="equipment">
                <h3>Special equipment</h3>
                <p className="equipment-intro">Useful, not mandatory.</p>
                <ul>
                  {recipe.equipment.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {recipe.shopGear.length ? (
        <section>
          <h2>Shop the gear</h2>
          <p className="page-sub" style={{ marginBottom: 16 }}>
            Links may earn a small commission. Or grab the{" "}
            <Link href="/shop">full recipe kit</Link>.
          </p>
          <div className="shop-rows">
            {recipe.shopGear.map((g) => (
              <div className="shop-row" key={g.title}>
                <div>
                  <h4>{g.title}</h4>
                  <p>{g.blurb}</p>
                </div>
                <a href={g.href} target="_blank" rel="noopener sponsored">
                  View on Amazon →
                </a>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
