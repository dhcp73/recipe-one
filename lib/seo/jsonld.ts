import type { Recipe } from "@/data/recipes";
import { formatQty } from "@/data/recipes";
import { getCategorySlug, type PillarId } from "@/data/taxonomy";
import { absoluteUrl, defaultDescription, SITE_NAME, SITE_URL } from "@/lib/site";

export type JsonLdObject = Record<string, unknown>;

export type BreadcrumbItem = { name: string; path: string };

export type ListItemInput = { name: string; path: string };

const CONTEXT = "https://schema.org";

function siteBase(): string {
  return SITE_URL.replace(/\/$/, "");
}

export function organizationId(): string {
  return `${siteBase()}/#organization`;
}

export function websiteId(): string {
  return `${siteBase()}/#website`;
}

/** ISO-8601 duration from minutes, e.g. 95 → PT1H35M */
export function iso8601Duration(minutes: number): string {
  const safe = Math.max(0, Math.round(minutes));
  const h = Math.floor(safe / 60);
  const m = safe % 60;
  if (h === 0) return `PT${m}M`;
  if (m === 0) return `PT${h}H`;
  return `PT${h}H${m}M`;
}

function labelsFor(pillar: PillarId, slugs: string[]): string[] {
  return slugs.map((slug) => getCategorySlug(pillar, slug)?.label ?? slug);
}

function unique(values: Array<string | undefined | null>): string[] {
  return [...new Set(values.map((v) => v?.trim()).filter((v): v is string => Boolean(v)))];
}

export function recipeKeywords(recipe: Recipe): string[] {
  return unique([
    ...labelsFor("type", recipe.types),
    ...labelsFor("country", recipe.countries),
    ...labelsFor("continent", recipe.continents),
    ...labelsFor("diet-occasion", recipe.dietOccasion),
    ...recipe.badges,
  ]);
}

export function flattenIngredients(recipe: Recipe): string[] {
  return recipe.ingredientGroups.flatMap((group) =>
    group.items.map((item) => {
      if (item.qty != null) return `${formatQty(item.qty)} ${item.text}`.trim();
      return item.text;
    }),
  );
}

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "Organization",
    "@id": organizationId(),
    name: SITE_NAME,
    url: siteBase(),
    description: defaultDescription,
    publishingPrinciples: absoluteUrl("/about"),
  };
}

export function websiteJsonLd(): JsonLdObject {
  const base = siteBase();
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": websiteId(),
    name: SITE_NAME,
    url: base,
    description: defaultDescription,
    inLanguage: "en",
    publisher: { "@id": organizationId() },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${base}/recipes?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function webPageJsonLd({
  title,
  description,
  path,
  type = "WebPage",
}: {
  title: string;
  description: string;
  path: string;
  type?: string | string[];
}): JsonLdObject {
  const url = absoluteUrl(path);
  return {
    "@context": CONTEXT,
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": websiteId() },
    about: { "@id": organizationId() },
    publisher: { "@id": organizationId() },
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListJsonLd(
  items: ListItemInput[],
  options?: { name?: string; path?: string },
): JsonLdObject {
  const schema: JsonLdObject = {
    "@context": CONTEXT,
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
  if (options?.name) schema.name = options.name;
  if (options?.path) schema.url = absoluteUrl(options.path);
  return schema;
}

export function collectionPageJsonLd({
  title,
  description,
  path,
  items,
}: {
  title: string;
  description: string;
  path: string;
  items?: ListItemInput[];
}): JsonLdObject {
  const url = absoluteUrl(path);
  const schema: JsonLdObject = {
    "@context": CONTEXT,
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": websiteId() },
    about: { "@id": organizationId() },
  };
  if (items?.length) {
    schema.mainEntity = {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    };
  }
  return schema;
}

export function recipeBreadcrumbItems(recipe: Recipe): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: "Home", path: "/" },
    { name: "Recipes", path: "/recipes" },
  ];
  const typeSlug = recipe.types[0];
  if (typeSlug) {
    const type = getCategorySlug("type", typeSlug);
    items.push({
      name: type?.label ?? typeSlug,
      path: `/categories/type/${typeSlug}`,
    });
  }
  items.push({
    name: recipe.shortTitle || recipe.title,
    path: `/recipes/${recipe.slug}`,
  });
  return items;
}

export function recipeJsonLd(recipe: Recipe): JsonLdObject {
  const url = absoluteUrl(`/recipes/${recipe.slug}`);
  const keywords = recipeKeywords(recipe);
  const categories = labelsFor("type", recipe.types);
  const cuisines = labelsFor("country", recipe.countries);
  const authorName = recipe.author || SITE_NAME;
  const author =
    authorName === SITE_NAME
      ? { "@type": "Organization", "@id": organizationId(), name: SITE_NAME }
      : { "@type": "Person", name: authorName };

  const schema: JsonLdObject = {
    "@context": CONTEXT,
    "@type": "Recipe",
    "@id": `${url}#recipe`,
    name: recipe.title,
    description: recipe.excerpt,
    image: recipe.image,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
    author,
    publisher: { "@id": organizationId() },
    datePublished: recipe.publishedAt,
    prepTime: iso8601Duration(recipe.prepMinutes),
    cookTime: iso8601Duration(recipe.cookMinutes),
    totalTime: iso8601Duration(recipe.totalMinutes),
    recipeYield: `${recipe.servings} serving${recipe.servings === 1 ? "" : "s"}`,
    recipeIngredient: flattenIngredients(recipe),
    recipeInstructions: recipe.steps.map((step, index) => {
      const parts = [step.body];
      if (step.visualCue) parts.push(`Look for: ${step.visualCue}`);
      if (step.tip) parts.push(`Tip: ${step.tip}`);
      const text = parts.join(" ");
      const howToStep: Record<string, unknown> = {
        "@type": "HowToStep",
        position: index + 1,
        name: step.title,
        text,
      };
      if (step.image) howToStep.image = step.image;
      return howToStep;
    }),
  };

  if (categories.length) schema.recipeCategory = categories.join(", ");
  if (cuisines.length) schema.recipeCuisine = cuisines.join(", ");
  if (keywords.length) schema.keywords = keywords.join(", ");

  if (recipe.ratingCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: recipe.rating,
      ratingCount: recipe.ratingCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  // Nutrition omitted — no nutrition data on recipes.

  return schema;
}
