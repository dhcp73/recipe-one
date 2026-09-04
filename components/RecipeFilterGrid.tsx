"use client";

import { useMemo, useState } from "react";
import { RecipeCard } from "@/components/RecipeCard";
import type { Recipe } from "@/data/recipes";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "time", label: "Time" },
  { id: "diet", label: "Diet" },
  { id: "technique", label: "Technique" },
  { id: "ai-video", label: "AI-video available" },
] as const;

export function RecipeFilterGrid({ recipes }: { recipes: Recipe[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  const visible = useMemo(() => {
    if (filter === "all") return recipes;
    return recipes.filter((r) => r.filterTags.includes(filter));
  }, [filter, recipes]);

  return (
    <>
      <div className="filter-bar" role="group" aria-label="Recipe filters">
        <span className="filter-label">Filter</span>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`filter-chip${filter === f.id ? " active" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="card-grid">
        {visible.map((r) => (
          <RecipeCard key={r.slug} recipe={r} />
        ))}
      </div>
    </>
  );
}
