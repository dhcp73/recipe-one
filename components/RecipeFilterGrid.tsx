"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RecipeCard } from "@/components/RecipeCard";
import { searchRecipes, type Recipe } from "@/data/recipes";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "time", label: "Time" },
  { id: "diet", label: "Diet" },
  { id: "technique", label: "Technique" },
  { id: "ai-video", label: "AI-video available" },
] as const;

export function RecipeFilterGrid({ recipes }: { recipes: Recipe[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [draft, setDraft] = useState(query);

  useEffect(() => {
    setDraft(query);
  }, [query]);

  const visible = useMemo(() => {
    const searched = searchRecipes(recipes, query);
    if (filter === "all") return searched;
    return searched.filter((r) => r.filterTags.includes(filter));
  }, [filter, recipes, query]);

  function applyQuery(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    const trimmed = next.trim();
    if (trimmed) params.set("q", trimmed);
    else params.delete("q");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <>
      <form
        className="recipe-search-bar"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          applyQuery(draft);
        }}
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          alignItems: "center",
          margin: "1rem 0 1.25rem",
        }}
      >
        <label htmlFor="recipe-search-q" className="filter-label">
          Search
        </label>
        <input
          id="recipe-search-q"
          className="nav-search"
          type="search"
          name="q"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Search titles, ingredients, badges…"
          aria-label="Search recipes"
          style={{ flex: "1 1 220px", minWidth: "200px" }}
        />
        <button type="submit" className="filter-chip active">
          Search
        </button>
        {query ? (
          <Link
            href={pathname}
            className="filter-chip"
            onClick={() => setDraft("")}
          >
            Clear “{query}”
          </Link>
        ) : null}
      </form>

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

      <p className="page-sub" aria-live="polite" style={{ marginTop: "0.5rem" }}>
        {query
          ? `${visible.length} result${visible.length === 1 ? "" : "s"} for “${query}”`
          : `${visible.length} recipe${visible.length === 1 ? "" : "s"}`}
      </p>

      {visible.length === 0 ? (
        <div className="empty-search" style={{ padding: "2rem 0" }}>
          <p>No recipes match that search{filter !== "all" ? " and filter" : ""}.</p>
          <p className="page-sub">
            Try fewer words, or{" "}
            <Link href="/recipes" onClick={() => setDraft("")}>
              clear search
            </Link>{" "}
            to browse everything.
          </p>
        </div>
      ) : (
        <div className="card-grid">
          {visible.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      )}
    </>
  );
}
