import type { Metadata } from "next";
import { ShopGrid } from "@/components/ShopGrid";
import { featuredKit, products } from "@/data/products";
import { JsonLd } from "@/lib/seo/JsonLd";
import { webPageJsonLd } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";

const TITLE = "Shop";
const DESCRIPTION =
  "Bold kits, tested gear, and gifts that make technique easier. Affiliate links may earn a commission.";

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/shop",
});

export default function ShopPage() {
  return (
    <main className="wrap">
      <JsonLd
        data={webPageJsonLd({
          title: TITLE,
          description: DESCRIPTION,
          path: "/shop",
          type: ["WebPage", "Store"],
        })}
      />
      <h1>Shop the kitchen</h1>
      <p className="page-sub">
        Bold kits, tested gear, and gifts that make technique easier. Affiliate
        links may earn a commission.
      </p>

      <div className="kit-banner">
        <div>
          <h2>{featuredKit.title}</h2>
          <p>{featuredKit.blurb}</p>
          <button type="button" className="btn-on-teal">
            Add kit to cart · ${featuredKit.price}
          </button>
        </div>
        <div className="kit-banner-meta">
          <strong>${featuredKit.price}</strong>
          Featured kit · ships with gear list
          <br />
          Pairs with Cook Mode on phone
        </div>
      </div>

      <ShopGrid products={products} />
    </main>
  );
}
