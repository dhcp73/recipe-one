import type { Metadata } from "next";
import { RecipeFilterGrid } from "@/components/RecipeFilterGrid";
import { recipes } from "@/data/recipes";
import { JsonLd } from "@/lib/seo/JsonLd";
import { collectionPageJsonLd } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Recipes";
const DESCRIPTION =
  "Technique-forward dishes with why-it-works notes, Cook Mode, and beginner tips.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/recipes",
});

export default function RecipesPage() {
  return (
    <main className="wrap">
      <JsonLd
        data={collectionPageJsonLd({
          title: TITLE,
          description: DESCRIPTION,
          path: "/recipes",
          items: recipes.map((r) => ({
            name: r.title,
            path: `/recipes/${r.slug}`,
          })),
        })}
      />
      <h1>Recipes</h1>
      <p className="page-sub">{DESCRIPTION}</p>
      <RecipeFilterGrid recipes={recipes} />
    </main>
  );
}
