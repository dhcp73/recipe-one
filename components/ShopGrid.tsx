"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/data/products";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "gear", label: "Gear" },
  { id: "kits", label: "Ingredients kits" },
  { id: "books", label: "Books" },
  { id: "gift", label: "Gift" },
] as const;

export function ShopGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  const visible = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.category === filter);
  }, [filter, products]);

  return (
    <>
      <div className="filter-bar" role="group" aria-label="Shop filters">
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
      <div className="product-grid">
        {visible.map((p) => (
          <article className="product-card" data-cat={p.category} key={p.id}>
            <div className="product-visual">
              <span className="product-cat">{p.categoryLabel}</span>
              {p.emoji}
            </div>
            <div className="product-body">
              <h3>{p.title}</h3>
              <p className="why">{p.why}</p>
              <div className="product-row">
                <span className="product-price">${p.price}</span>
                <span className="product-rating">
                  <span className="stars">★★★★★</span> {p.rating.toFixed(1)}
                </span>
              </div>
              <div className="product-actions">
                <button type="button" className="btn-add">
                  Add to kit
                </button>
                <a
                  className="btn-amazon"
                  href={p.amazonUrl}
                  target="_blank"
                  rel="noopener sponsored"
                >
                  View on Amazon
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
