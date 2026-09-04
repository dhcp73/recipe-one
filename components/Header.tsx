"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  countryMegaGroups,
  getPillar,
  getPillarSlugs,
  pillars,
} from "@/data/taxonomy";

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 6-6 8-6s6.5 2 8 6" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 6h15l-1.5 9h-12z" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
      <path d="M6 6L5 2H2" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname() || "/";
  const isShop = pathname.startsWith("/shop");
  const isChef = pathname.startsWith("/chef");
  const isRecipes = pathname.startsWith("/recipes");
  const isAbout = pathname.startsWith("/about");
  const isCats = pathname.startsWith("/categories");
  const [stripOpen, setStripOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);

  useEffect(() => {
    setStripOpen(false);
    setOpenMega(null);
  }, [pathname]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as HTMLElement;
      if (!t.closest(".mega")) setOpenMega(null);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function toggleMega(id: string) {
    setOpenMega((cur) => (cur === id ? null : id));
  }

  const countryPillar = getPillar("country")!;
  const countrySlugs = getPillarSlugs(countryPillar);
  const typeSlugs = getPillarSlugs(getPillar("type")!);
  const dietPillar = getPillar("diet-occasion")!;

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="logo" href="/">
          Uncommon Kitchen
        </Link>
        <nav className="cats" aria-label="Primary">
          <Link href="/recipes" className={isRecipes ? "active" : undefined}>
            Recipes
          </Link>
          <Link href="/shop" className={isShop ? "active" : undefined}>
            Shop
          </Link>
          <Link href="/chef" className={isChef ? "active" : undefined}>
            Chef AI
          </Link>
          <Link href="/about" className={isAbout ? "active" : undefined}>
            About
          </Link>
        </nav>
        <div className="nav-tools">
          <input
            className="nav-search"
            type="search"
            placeholder={isShop ? "Search shop…" : "Search recipes…"}
            aria-label={isShop ? "Search shop" : "Search recipes"}
          />
          <Link
            href="/chef"
            className={isChef ? "icon-btn ai-active" : "icon-btn"}
            aria-label="AI assistant"
            title="Chef AI"
          >
            <StarIcon />
          </Link>
          <button type="button" className="icon-btn" aria-label="Saved recipes" title="Saved">
            <HeartIcon />
          </button>
          {isShop ? (
            <button type="button" className="icon-btn" aria-label="Cart" title="Cart">
              <CartIcon />
              <span className="cart-badge">2</span>
            </button>
          ) : (
            <button type="button" className="icon-btn" aria-label="Account" title="Account">
              <UserIcon />
            </button>
          )}
        </div>
      </div>

      <div
        className={`cat-strip${stripOpen ? " is-open" : ""}${isCats ? " on-categories" : ""}`}
        id="catStrip"
      >
        <div className="cat-strip-inner">
          <button
            type="button"
            className="cat-strip-browse"
            aria-expanded={stripOpen}
            aria-controls="catStripNav"
            onClick={() => setStripOpen((v) => !v)}
          >
            Browse
          </button>
          <nav className="cat-strip-nav" id="catStripNav" aria-label="Browse categories">
            <div
              className={`mega${openMega === "categories" ? " is-open" : ""}`}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => {
                if (typeof window !== "undefined" && window.innerWidth > 720) setOpenMega("categories");
              }}
              onMouseLeave={() => {
                if (typeof window !== "undefined" && window.innerWidth > 720) setOpenMega(null);
              }}
            >
              <button
                type="button"
                className="mega-trigger"
                aria-expanded={openMega === "categories"}
                aria-haspopup="true"
                onClick={() => toggleMega("categories")}
              >
                Categories <span className="caret" aria-hidden="true">▾</span>
              </button>
              <div className="mega-panel mega-panel--pillars" role="region" aria-label="Categories">
                <div className="mega-panel-inner">
                  <div className="mega-blurb">
                    <h3>Browse by pillar</h3>
                    <p>
                      Four shallow ways into the library — region, cuisine, dish
                      form, and how you cook.
                    </p>
                    <Link className="mega-cta" href="/categories">
                      All categories →
                    </Link>
                  </div>
                  <div className="mega-pillar-links">
                    {pillars.map((p) => (
                      <Link key={p.id} href={p.path}>
                        <strong>{p.label}</strong>
                        <span>
                          {p.id === "continent" && "6 world regions"}
                          {p.id === "country" && "16 cuisines"}
                          {p.id === "type" && "12 dish forms"}
                          {p.id === "diet-occasion" && "18 tags"}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`mega${openMega === "continent" ? " is-open" : ""}`}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => {
                if (typeof window !== "undefined" && window.innerWidth > 720) setOpenMega("continent");
              }}
              onMouseLeave={() => {
                if (typeof window !== "undefined" && window.innerWidth > 720) setOpenMega(null);
              }}
            >
              <button
                type="button"
                className="mega-trigger"
                aria-expanded={openMega === "continent"}
                aria-haspopup="true"
                onClick={() => toggleMega("continent")}
              >
                Continent <span className="caret" aria-hidden="true">▾</span>
              </button>
              <div className="mega-panel mega-panel--list" role="region" aria-label="Continent">
                <div className="mega-panel-inner mega-cols mega-cols--2">
                  {getPillarSlugs(getPillar("continent")!).map((s) => (
                    <Link key={s.slug} href={`/categories/continent/${s.slug}`}>
                      {s.label}
                    </Link>
                  ))}
                </div>
                <Link className="mega-see-all" href="/categories/continent">
                  All continents →
                </Link>
              </div>
            </div>

            <div
              className={`mega${openMega === "country" ? " is-open" : ""}`}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => {
                if (typeof window !== "undefined" && window.innerWidth > 720) setOpenMega("country");
              }}
              onMouseLeave={() => {
                if (typeof window !== "undefined" && window.innerWidth > 720) setOpenMega(null);
              }}
            >
              <button
                type="button"
                className="mega-trigger"
                aria-expanded={openMega === "country"}
                aria-haspopup="true"
                onClick={() => toggleMega("country")}
              >
                Country <span className="caret" aria-hidden="true">▾</span>
              </button>
              <div className="mega-panel mega-panel--wide" role="region" aria-label="Country">
                <div className="mega-panel-inner mega-country-grid">
                  {countryMegaGroups.map((g) => (
                    <div className="mega-group" key={g.label}>
                      <h4>{g.label}</h4>
                      {g.slugs.map((slug) => {
                        const item = countrySlugs.find((s) => s.slug === slug)!;
                        return (
                          <Link key={slug} href={`/categories/country/${slug}`}>
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <Link className="mega-see-all" href="/categories/country">
                  All countries →
                </Link>
              </div>
            </div>

            <div
              className={`mega${openMega === "type" ? " is-open" : ""}`}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => {
                if (typeof window !== "undefined" && window.innerWidth > 720) setOpenMega("type");
              }}
              onMouseLeave={() => {
                if (typeof window !== "undefined" && window.innerWidth > 720) setOpenMega(null);
              }}
            >
              <button
                type="button"
                className="mega-trigger"
                aria-expanded={openMega === "type"}
                aria-haspopup="true"
                onClick={() => toggleMega("type")}
              >
                Food type <span className="caret" aria-hidden="true">▾</span>
              </button>
              <div className="mega-panel mega-panel--list" role="region" aria-label="Food type">
                <div className="mega-panel-inner mega-cols mega-cols--3">
                  {typeSlugs.map((s) => (
                    <Link key={s.slug} href={`/categories/type/${s.slug}`}>
                      {s.label}
                    </Link>
                  ))}
                </div>
                <Link className="mega-see-all" href="/categories/type">
                  All food types →
                </Link>
              </div>
            </div>

            <div
              className={`mega${openMega === "diet" ? " is-open" : ""}`}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => {
                if (typeof window !== "undefined" && window.innerWidth > 720) setOpenMega("diet");
              }}
              onMouseLeave={() => {
                if (typeof window !== "undefined" && window.innerWidth > 720) setOpenMega(null);
              }}
            >
              <button
                type="button"
                className="mega-trigger"
                aria-expanded={openMega === "diet"}
                aria-haspopup="true"
                onClick={() => toggleMega("diet")}
              >
                Diet &amp; occasion <span className="caret" aria-hidden="true">▾</span>
              </button>
              <div
                className="mega-panel mega-panel--wide"
                role="region"
                aria-label="Diet and occasion"
              >
                <div className="mega-panel-inner mega-country-grid">
                  {dietPillar.groups!.map((g) => (
                    <div className="mega-group" key={g.id}>
                      <h4>{g.label === "Season & occasion" ? "Season / Occasion" : g.label}</h4>
                      {g.slugs.map((s) => (
                        <Link key={s.slug} href={`/categories/diet-occasion/${s.slug}`}>
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                <Link className="mega-see-all" href="/categories/diet-occasion">
                  All diet &amp; occasion →
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
