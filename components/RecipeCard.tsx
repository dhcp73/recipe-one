import Link from "next/link";
import Image from "next/image";
import { formatRecipeMeta, type Recipe } from "@/data/recipes";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link className="recipe-tile" href={`/recipes/${recipe.slug}`}>
      <Image
        src={recipe.image}
        alt={recipe.imageAlt || recipe.title}
        width={900}
        height={600}
        sizes="(max-width: 720px) 100vw, 33vw"
      />
      <h3>{recipe.title}</h3>
      <p className="meta">
        <span className="stars">★★★★★</span> {formatRecipeMeta(recipe)}
      </p>
      {recipe.badges?.length ? (
        <div className="tile-badges">
          {recipe.badges.map((b) => (
            <span key={b} className="tile-badge">
              {b}
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
